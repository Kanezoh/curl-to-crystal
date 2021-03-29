require 'minitest'
require 'minitest/autorun'
require 'execjs'
require 'webrick'
require 'pry'

class TestCurlToCrytal < Minitest::Test
  JS_CONTEXT = ExecJS.compile(File.read("resources/js/curl-to-crystal.js"))

  def test_simple_get
    assert_curl_eq "/"
    assert_curl_eq "/foo.txt"
  end

  def test_post
    assert_curl_eq "/", '-X POST -d "foo"'
    assert_curl_eq "/", '-X POST -d "foobar"'
  end

  def test_headers
    assert_curl_eq "/", '-XPOST -H MyCrazyHeader:foo -d "foo"'
  end

  def test_basic_auth
    assert_curl_eq "/", "-u banana:coconuts"
  end

  def test_complex_post
    assert_curl_eq "/", <<-CURL
     -X POST \
     -u API_KEY: \
     -d 'shipment[to_address][id]=adr_HrBKVA85' \
     -d 'shipment[from_address][id]=adr_VtuTOj7o' \
     -d 'shipment[parcel][id]=prcl_WDv2VzHp' \
     -d 'shipment[is_return]=true' \
     -d 'shipment[customs_info][id]=cstinfo_bl5sE20Y'
     CURL
  end

  def test_simple_data
    assert_curl_eq "/", "-d foo=bar"
  end

  def test_data_file_reference
    assert_curl_eq "/", "-d @README.md"
  end

  def test_query_string
    assert_curl_eq "/curl-to-crystal/?foo=bar", "-d @README.md"
  end

  private

  def assert_curl_eq(path, curl_args="")
    curl_req = normalize_request capture_http { |url|
      system "curl -s -o /dev/null #{url}#{path} #{curl_args}"
    }

    crystal_req = normalize_request capture_http { |url|
      crystal = curl_to_crystal("curl #{url}#{path} #{curl_args}")
      crystal_eval(crystal)
    }
    assert_equal curl_req.verb, crystal_req.verb
    assert_equal curl_req.path, crystal_req.path
    if curl_req.body.nil?
      assert_nil crystal_req.body
    else
      assert_equal curl_req.body, crystal_req.body
    end
    assert_equal curl_req.headers, crystal_req.headers
  end

  Request = Struct.new(:verb, :path, :headers, :body)

  def curl_to_crystal(cmd)
    JS_CONTEXT.call("curlToCrystal.default", cmd)
  end

  def normalize_request(original)
    headers = original.headers.dup
    headers.delete("accept-encoding")
    headers.delete("user-agent")
    headers.delete("host")
    headers.delete("expect")
    headers.delete("connection")
    headers["accept"] = ["*/*"] if headers["accept"].empty? # curl set this as default, but crystal's http/client doesn't do so.

    if original.body
      body = original.body
      if headers['content-type'] == ['application/x-www-form-urlencoded']
        # May encode slightly differently
        begin
          body = URI.decode_www_form(body).sort
          headers.delete("content-length")
        rescue ArgumentError
        end
      end
    end

    Request.new(
      original.verb,
      original.path,
      headers,
      body
    )
  end

  def capture_http
    server = WEBrick::HTTPServer.new(
      Port: 3000,
      Logger: WEBrick::Log.new("/dev/null"),
      AccessLog: []
    )
    port = server[:Port]
    request = nil

    thread = Thread.new do
      server.mount_proc('/') do |req, res|
        request = Request.new(
          req.request_method,
          req.path,
          req.header,
          req.body
        )
        res.body = "hello, world"
        server.shutdown
      end

      server.start

      request
    end

    url = "http://127.0.0.1:#{port}"
    yield url, port

    thread.join
    thread.value
  end

  def crystal_eval(crystal)
    # use port 3000 for test
    crystal.gsub!("HTTP::Client.new(uri.host.not_nil!)", "HTTP::Client.new(uri.host.not_nil!, port: 3000)" )
    `crystal eval '#{crystal}'`
  end
end
