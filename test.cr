require "spec"
require "http/server"
require "duktape/runtime"

JS_CONTEXT = Duktape::Runtime.new do |sbx|
  js = File.read("resources/js/curl-to-crystal.js")
  sbx.eval! <<-JS
    #{js}
  JS
end
#cmd = "curl http://example.com"
#JS_CONTEXT.call("curlToCrystal", cmd)
puts JS_CONTEXT.eval("1 + 1")

#capture_http
#
#assert_curl_eq "/"


def capture_http
  server = HTTP::Server.new([TestHandler.new]){}
  puts "Listening on http://127.0.0.1:4000"
  server.listen(4000)
end

def assert_curl_eq(path, curl_args="")
  curl_req = system "curl -s -o /dev/null http://127.0.0.1:4000#{path} #{curl_args}"

  crystal_req = crystal = curl_to_crystal("curl http://127.0.0.1:4000#{path} #{curl_args}")
  #assert_equal curl_req.verb, crystal_req.
  #assert_equal curl_req.path, crystal_req.path
  #if curl_req.body.nil?
  #  assert_nil crystal_req.body
  #else
  #  assert_equal curl_req.body, crystal_req.body
  #end
  #assert_equal curl_req.headers, crystal_req.headers
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
      puts (normalize_request context.request)
    end

    private def normalize_request(original)
      headers = original.headers.dup
      headers.delete("accept-encoding")
      headers.delete("user-agent")
      headers.delete("host")
      headers.delete("expect")
      headers.delete("connection")
      headers["accept"] = ["*/*"] if headers["accept"].empty? # curl set this as default, but crystal's http/client doesn't do so.
      body = original.body.to_s
      if body
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
