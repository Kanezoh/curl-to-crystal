/*
	curl-to-ruby

	A simple utility to convert curl commands into ruby code.

	Based on curl-to-go by Matt Holt
	https://github.com/mholt/curl-to-go
*/

function curlToGo(curl) {

	// List of curl flags that are boolean typed; this helps with parsing
	// a command like `curl -abc value` to know whether 'value' belongs to '-c'
	// or is just a positional argument instead.
	var boolOptions = ['#', 'progress-bar', '-', 'next', '0', 'http1.0', 'http1.1', 'http2',
		'no-npn', 'no-alpn', '1', 'tlsv1', '2', 'sslv2', '3', 'sslv3', '4', 'ipv4', '6', 'ipv6',
		'a', 'append', 'anyauth', 'B', 'use-ascii', 'basic', 'compressed', 'create-dirs',
		'crlf', 'digest', 'disable-eprt', 'disable-epsv', 'environment', 'cert-status',
		'false-start', 'f', 'fail', 'ftp-create-dirs', 'ftp-pasv', 'ftp-skip-pasv-ip',
		'ftp-pret', 'ftp-ssl-ccc', 'ftp-ssl-control', 'g', 'globoff', 'G', 'get',
		'ignore-content-length', 'i', 'include', 'I', 'head', 'j', 'junk-session-cookies',
		'J', 'remote-header-name', 'k', 'insecure', 'l', 'list-only', 'L', 'location',
		'location-trusted', 'metalink', 'n', 'netrc', 'N', 'no-buffer', 'netrc-file',
		'netrc-optional', 'negotiate', 'no-keepalive', 'no-sessionid', 'ntlm', 'O',
		'remote-name', 'oauth2-bearer', 'p', 'proxy-tunnel', 'path-as-is', 'post301', 'post302',
		'post303', 'proxy-anyauth', 'proxy-basic', 'proxy-digest', 'proxy-negotiate',
		'proxy-ntlm', 'q', 'raw', 'remote-name-all', 's', 'silent', 'sasl-ir', 'S', 'show-error',
		'ssl', 'ssl-reqd', 'ssl-allow-beast', 'ssl-no-revoke', 'socks5-gssapi-nec', 'tcp-nodelay',
		'tlsv1.0', 'tlsv1.1', 'tlsv1.2', 'tr-encoding', 'trace-time', 'v', 'verbose', 'xattr',
		'h', 'help', 'M', 'manual', 'V', 'version'];

	if (!curl.trim())
		return;
	var cmd = parseCommand(curl, { boolFlags: boolOptions });

	if (cmd._[0] != "curl")
		throw "Not a curl command";

	var req = extractRelevantPieces(cmd);

	return renderComplex(req);
	//if (req.headers.length == 0 && !req.data.ascii && !req.data.files && !req.basicauth) {
	//	return promo+"\n"+renderSimple(req.method, req.url);
	//} else {
	//	return promo+"\n\n"+renderComplex(req);
	//}


	// renderSimple renders a simple HTTP request using net/http convenience methods
	function renderSimple(method, url) {
		if (method == "GET")
			return 'resp, err := http.Get('+goExpandEnv(url)+')\n'+err+deferClose;
		else if (method == "POST")
			return 'resp, err := http.Post('+goExpandEnv(url)+', "", nil)\n'+err+deferClose;
		else if (method == "HEAD")
			return 'resp, err := http.Head('+goExpandEnv(url)+')\n'+err+deferClose;
		else
			return 'req, err := http.NewRequest('+goExpandEnv(method)+', '+goExpandEnv(url)+', nil)\n'+err+'resp, err := http.DefaultClient.Do(req)\n'+err+deferClose;
	}

	// renderComplex renders Go code that requires making a http.Request.
	function renderComplex(req) {
		// First, figure out the headers
		var headers = {};
		for (var i = 0; i < req.headers.length; i++) {
			var split = req.headers[i].indexOf(":");
			if (split == -1) continue;
			var name = req.headers[i].substr(0, split).trim();
			var value = req.headers[i].substr(split+1).trim();
			headers[toTitleCase(name)] = value;
		}

		var ruby = "";

		ruby += "require 'net/http'\nrequire 'uri'\n\n";
		ruby += 'uri = URI.parse("' + rubyEsc(req.url) + '")\n';
		ruby += 'http = Net::HTTP.new(uri.host, uri.port)\n';
		ruby += 'http.use_ssl = (uri.scheme == "https")\n';

		var method = req.method;
		if (method == "GET")
			ruby += 'request = Net::HTTP::Get.new(uri)\n';
		else if (method == "POST")
			ruby += 'request = Net::HTTP::Post.new(uri)\n';
		else if (method == "PUT")
			ruby += 'request = Net::HTTP::Put.new(uri)\n';
		else if (method == "HEAD")
			ruby += 'request = Net::HTTP::Head.new(uri)\n';
		else
			ruby += "request = Net::HTTPGenericRequest.new('" + rubyEsc(method) + "', nil, nil, uri)"

		// set basic auth
		if (req.basicauth) {
			ruby += 'request.basic_auth("'+rubyEsc(req.basicauth.user)+'", "'+rubyEsc(req.basicauth.pass)+'")\n';
		}

		if (headers["Content-Type"]) {
			ruby += 'request.content_type = "' + rubyEsc(headers["Content-Type"]) + '"\n';
			delete(headers["Content-Type"]);
		}

		// set headers
		for (var name in headers) {
			ruby += 'request["'+rubyEsc(name)+'"] = "'+rubyEsc(headers[name])+'"\n';
		}

		if (req.data.ascii) {
			ruby += 'request.body = "' + rubyEsc(req.data.ascii) + '"\n';
		}

		if (req.data.files && req.data.files.length > 0) {
			if (!req.data.ascii) {
				ruby += 'request.body = ""\n';
			}

			ruby += 'boundary = "---------MultipartUpload"\n';

			var varName = "file";
			for (var i = 0; i < req.data.files.length; i++) {
				var thisVarName = (req.data.files.length > 1 ? varName+(i+1) : varName);
				ruby += thisVarName + ' = "' + rubyEsc(req.data.files[i]) + '"\n'
				ruby += 'request.body << "--#{BOUNDARY}\\r\\n"\n';
				ruby += 'request.body << "Content-Disposition: form-data; name=\\"datafile\\"; filename=\\"#{File.basename('+thisVarName+')}\\"\\r\\n"\n';
				ruby += 'request.body << "\\r\\n"\n';
				ruby += 'request.body << File.read(file)\n';
				ruby += 'request.body << "\\r\\n--#{BOUNDARY}--\\r\\n"\n';
			}
		}

		ruby += "\nresponse = http.request(request)\n"
		ruby += "# response.status\n"
		ruby += "# response.body\n"

		return ruby;
	}

	// extractRelevantPieces returns an object with relevant pieces
	// extracted from cmd, the parsed command. This accounts for
	// multiple flags that do the same thing and return structured
	// data that makes it easy to spit out Go code.
	function extractRelevantPieces(cmd) {
		var relevant = {
			url: "",
			method: "",
			headers: [],
			data: {}
		};

		// prefer --url over unnamed parameter, if it exists; keep first one only
		if (cmd.url && cmd.url.length > 0)
			relevant.url = cmd.url[0];
		else if (cmd._.length > 1)
			relevant.url = cmd._[1]; // position 1 because index 0 is the curl command itself

		// gather the headers together
		if (cmd.H)
			relevant.headers = relevant.headers.concat(cmd.H);
		if (cmd.header)
			relevant.headers = relevant.headers.concat(cmd.header);

		// set method to HEAD?
		if (cmd.I || cmd.head)
			relevant.method = "HEAD";

		// between -X and --request, prefer the long form I guess
		if (cmd.request && cmd.request.length > 0)
			relevant.method = cmd.request[cmd.request.length-1].toUpperCase();
		else if (cmd.X && cmd.X.length > 0)
			relevant.method = cmd.X[cmd.X.length-1].toUpperCase(); // if multiple, use last (according to curl docs)

		// join multiple request body data, if any
		var dataAscii = [];
		var dataFiles = [];
		var loadData = function(d) {
			if (!relevant.method)
				relevant.method = "POST";
			for (var i = 0; i < d.length; i++)
			{
				if (d[i].length > 0 && d[i][0] == "@")
					dataFiles.push(d[i].substr(1));
				else
					dataAscii.push(d[i]);
			}
		};
		if (cmd.d)
			loadData(cmd.d);
		if (cmd.data)
			loadData(cmd.data);
		if (dataAscii.length > 0)
			relevant.data.ascii = dataAscii.join("&");
		if (dataFiles.length > 0)
			relevant.data.files = dataFiles;

		// between -u and --user, choose the long form...
		var basicAuthString = "";
		if (cmd.user && cmd.user.length > 0)
			basicAuthString = cmd.user[cmd.user.length-1];
		else if (cmd.u && cmd.u.length > 0)
			basicAuthString = cmd.u[cmd.u.length-1];
		var basicAuthSplit = basicAuthString.indexOf(":");
		if (basicAuthSplit > -1) {
			relevant.basicauth = {
				user: basicAuthString.substr(0, basicAuthSplit),
				pass: basicAuthString.substr(basicAuthSplit+1)
			};
		} else {
			relevant.basicAuth = { user: basicAuthString, pass: "<PASSWORD>" };
		}

		// default to GET if nothing else specified
		if (!relevant.method)
			relevant.method = "GET";

		return relevant;
	}

	function toTitleCase(str) {
		return str.replace(/\w*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}

	function rubyEsc(s) {
		return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
	}
}


function parseCommand(input, options) {
	if (typeof options === 'undefined') {
		options = {};
	}

	var result = {_: []}, // what we return
	    cursor = 0,       // iterator position
	    token = "";       // current token (word or quoted string) being built

	// trim leading $ or # that may have been left in
	input = input.trim();
	if (input.length > 2 && (input[0] == '$' || input[0] == '#') && whitespace(input[1]))
		input = input.substr(1).trim();

	for (cursor = 0; cursor < input.length; cursor++) {
		skipWhitespace();
		if (input[cursor] == "-") {
			flagSet();
		} else {
			unflagged();
		}
	}

	return result;




	// flagSet handles flags and it assumes the current cursor
	// points to a first dash.
	function flagSet() {
		// long flag form?
		if (cursor < input.length-1 && input[cursor+1] == "-") {
			return longFlag();
		}

		// if not, parse short flag form
		cursor++; // skip leading dash
		while (cursor < input.length && !whitespace(input[cursor]))
		{
			var flagName = input[cursor];
			if (typeof result[flagName] == 'undefined') {
				result[flagName] = [];
			}
			cursor++; // skip the flag name
			if (boolFlag(flagName))
				result[flagName] = true;
			else if (Array.isArray(result[flagName]))
				result[flagName].push(nextString());
		}
	}

	// longFlag consumes a "--long-flag" sequence and
	// stores it in result.
	function longFlag() {
		cursor += 2; // skip leading dashes
		var flagName = nextString("=");
		if (boolFlag(flagName))
			result[flagName] = true;
		else {
			if (typeof result[flagName] == 'undefined') {
				result[flagName] = [];
			}
			if (Array.isArray(result[flagName])) {
				result[flagName].push(nextString());
			}
		}
	}

	// unflagged consumes the next string as an unflagged value,
	// storing it in the result.
	function unflagged() {
		result._.push(nextString());
	}

	// boolFlag returns whether a flag is known to be boolean type
	function boolFlag(flag) {
		if (Array.isArray(options.boolFlags)) {
			for (var i = 0; i < options.boolFlags.length; i++) {
				if (options.boolFlags[i] == flag)
					return true;
			}
		}
		return false;
	}

	// nextString skips any leading whitespace and consumes the next
	// space-delimited string value and returns it. If endChar is set,
	// it will be used to determine the end of the string. Normally just
	// unescaped whitespace is the end of the string, but endChar can
	// be used to specify another end-of-string. This function honors \
	// as an escape character and does not include it in the value, except
	// in the special case of the \$ sequence, the backslash is retained
	// so other code can decide whether to treat as an env var or not.
	function nextString(endChar) {
		skipWhitespace();

		var str = "";

		var quoted = false,
			quoteCh = "",
			escaped = false;

		for (; cursor < input.length; cursor++) {
			if (quoted) {
				if (input[cursor] == quoteCh && !escaped) {
					quoted = false;
					continue;
				}
			}
			if (!quoted) {
				if (!escaped) {
					if (whitespace(input[cursor])) {
						return str;
					}
					if (input[cursor] == '"' || input[cursor] == "'") {
						quoted = true;
						quoteCh = input[cursor];
						cursor++;
					}
					if (endChar && input[cursor] == endChar) {
						cursor++; // skip the endChar
						return str;
					}
				}
			}
			if (!escaped && input[cursor] == "\\") {
				escaped = true;
				// skip the backslash unless the next character is $
				if (!(cursor < input.length-1 && input[cursor+1] == '$'))
					continue;
			}
			
			str += input[cursor];
			escaped = false;
		}

		return str;
	}

	// skipWhitespace skips whitespace between tokens, taking into account escaped whitespace.
	function skipWhitespace() {
		for (; cursor < input.length; cursor++) {
			while (input[cursor] == "\\" && (cursor < input.length-1 && whitespace(input[cursor+1])))
				cursor++;
			if (!whitespace(input[cursor]))
				break;
		}
	}

	// whitespace returns true if ch is a whitespace character.
	function whitespace(ch) {
		return ch == " " || ch == "\t" || ch == "\n" || ch == "\r";
	}
}
