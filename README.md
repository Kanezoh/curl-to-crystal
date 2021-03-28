curl-to-crystal
============

curl-to-crystal is a tool to instantly convert [curl](http://curl.haxx.se) commands to crystal code using [http/client](https://crystal-lang.org/api/1.0.0/HTTP.htm) in the browser. It does *not* guarantee high-fidelity conversions, but it's good enough for most API docs that have curl samples.

### Try it

**[Check it out!](https://jhawthorn.github.io/curl-to-ruby)** It works inside your browser.


### FAQ

#### Does any curl command work?

Any curl command should work, but only certain flags are understood and converted into crystal code. The rest of the flags will be ignored.

#### Which kinds of curl commands are understood?

Mostly simple HTTP commands (headers, basic auth, body, etc).

#### Will you consider supporting *this-or-that* flag?

curl has like a bajillion options, so don't expect all of them to be implemented; just the most common/important ones to stub out code from API samples and docs, etc. But feel free to open an issue or submit a pull request!



### Credits

Updated to crystal by Shunya Kaneko ([Kanezoh](https://twitter.com/kanezoh_))

Updated to ruby by John Hawthorn ([jhawthorn](https://twitter.com/jhawthorn))

Based on [curl-to-Go](https://github.com/mholt/curl-to-go) by Matt Holt ([mholt6](https://twitter.com/mholt6)).
