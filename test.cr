require "spec"
require "http/server"
require "duktape/runtime"

REQUESTS = [] of Request
JS_CONTEXT = Duktape::Runtime.new do |sbx|
  js = File.read("resources/js/curl-to-crystal.js")
  sbx.eval! <<-JS
    #{js}
  JS
end

# server thread
spawn do
  server = HTTP::Server.new([TestHandler.new]){}
  puts "Listening on http://127.0.0.1:4000"
  server.listen(4000)
end

# test thread
spawn do
  sleep 3
  assert_curl_eq "/"
  assert_curl_eq "/foo.txt"
  assert_curl_eq "/", "-X POST -d 'foo'"
  assert_curl_eq "/", "-X POST -d 'foobar'"
  assert_curl_eq "/", "-XPOST -H MyCrazyHeader:foo -d 'foo'"
  assert_curl_eq "/", "-u banana:coconuts"
  assert_curl_eq "/", <<-CURL
     -X POST \
     -u API_KEY: \
     -d 'shipment[to_address][id]=adr_HrBKVA85' \
     -d 'shipment[from_address][id]=adr_VtuTOj7o' \
     -d 'shipment[parcel][id]=prcl_WDv2VzHp' \
     -d 'shipment[is_return]=true' \
     -d 'shipment[customs_info][id]=cstinfo_bl5sE20Y'
     CURL
  assert_curl_eq "/", "-d foo=bar"
  assert_curl_eq "/", "-d @README.md"
  assert_curl_eq "/curl-to-crystal/?foo=bar", "-d @README.md"
end
sleep 50

def assert_curl_eq(path, curl_args="")
  system "curl -s -o /dev/null http://127.0.0.1:4000#{path} #{curl_args}"
  crystal_code = curl_to_crystal("curl http://127.0.0.1:4000#{path} #{curl_args}").to_s
  crystal_code= crystal_code.gsub("HTTP::Client.new(uri.host.not_nil!)", "HTTP::Client.new(uri.host.not_nil!, port: 4000)" )
  system "crystal eval '#{crystal_code}'"
  curl_req = REQUESTS.shift
  crystal_req = REQUESTS.shift
  it "method" { curl_req.method.should eq crystal_req.method }
  it "path" { curl_req.path.should eq crystal_req.path }
  if curl_req.body == ""
    it "body should be blank" { crystal_req.body.should eq "" }
  else
    it "body" { curl_req.body.should eq crystal_req.body }
  end
  it "headers" { curl_req.headers.should eq crystal_req.headers }
end

def curl_to_crystal(cmd)
  JS_CONTEXT.call("curlToCrystal.default", cmd)
end

struct Request
  property method, path, headers, body

  def initialize(@method : String, @path : String, @headers : HTTP::Headers, @body : String)
  end
end
  
class TestHandler
  include HTTP::Handler

  def call(context)
    request = (normalize_request context.request)
    REQUESTS.push(request)
  end

  private def normalize_request(original)
    headers = original.headers.dup
    headers.delete("accept-encoding")
    headers.delete("user-agent")
    headers.delete("host")
    headers.delete("expect")
    headers.delete("connection")
    headers["accept"] = ("*/*") unless headers.has_key?("accept") # curl set */* as default, but crystal's http/client doesn't do so.
    body = original.body.to_s
    if body != ""
      body =  original.body.not_nil!.gets_to_end
      if headers["content-type"] == ["application/x-www-form-urlencoded"]
        # May encode slightly differently
        begin
          body = URI.decode_www_form(string: body)#.sort
          headers.delete("content-length")
        rescue ArgumentError
        end
      end
    end
    Request.new(
      method:  original.method,
      path:    original.path,
      headers: headers,
      body:    body
    )
  end
end
