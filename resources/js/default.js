!function(e){var n={};function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)t.d(r,a,function(n){return e[n]}.bind(null,a));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=11)}([function(e,n){n.quote=function(e){return e.map(function(e){return e&&"object"==typeof e?e.op.replace(/(.)/g,"\\$1"):/["\s]/.test(e)&&!/'/.test(e)?"'"+e.replace(/(['\\])/g,"\\$1")+"'":/["'\s]/.test(e)?'"'+e.replace(/(["\\$`!])/g,"\\$1")+'"':e=(e=String(e).replace(/([A-z]:)?([#!"$&'()*,:;<=>?@\[\\\]^`{|}])/g,"$1\\$2")).replace(/\\\\/g,"\\")}).join(" ")};for(var t="(?:"+["\\|\\|","\\&\\&",";;","\\|\\&","\\<\\(",">>",">\\&","[&;()|<>]"].join("|")+")",r="(\\\\['\"|&;()<> \\t]|[^\\s'\"|&;()<> \\t])+",a='"((\\\\"|[^"])*?)"',s="'((\\\\'|[^'])*?)'",i="",o=0;o<4;o++)i+=(Math.pow(16,8)*Math.random()).toString(16);n.parse=function(e,n,o){var c=function(e,n,o){var c=new RegExp(["("+t+")","("+r+"|"+a+"|"+s+")*"].join("|"),"g"),l=e.match(c).filter(Boolean),u=!1;if(!l)return[];n||(n={});o||(o={});return l.map(function(e,r){if(!u){if(RegExp("^"+t+"$").test(e))return{op:e};for(var a=o.escape||"\\",s=!1,c=!1,d="",g=!1,f=0,p=e.length;f<p;f++){var h=e.charAt(f);if(g=g||!s&&("*"===h||"?"===h),c)d+=h,c=!1;else if(s)h===s?s=!1:"'"==s?d+=h:h===a?(f+=1,d+='"'===(h=e.charAt(f))||h===a||"$"===h?h:a+h):d+="$"===h?b():h;else if('"'===h||"'"===h)s=h;else{if(RegExp("^"+t+"$").test(h))return{op:e};if(RegExp("^#$").test(h))return u=!0,d.length?[d,{comment:e.slice(f+1)+l.slice(r+1).join(" ")}]:[{comment:e.slice(f+1)+l.slice(r+1).join(" ")}];h===a?c=!0:d+="$"===h?b():h}}return g?{op:"glob",pattern:d}:d}function b(){var t,r;if(f+=1,"{"===e.charAt(f)){if(f+=1,"}"===e.charAt(f))throw new Error("Bad substitution: "+e.substr(f-2,3));if((t=e.indexOf("}",f))<0)throw new Error("Bad substitution: "+e.substr(f));r=e.substr(f,t-f),f=t}else/[*@#?$!_\-]/.test(e.charAt(f))?(r=e.charAt(f),f+=1):(t=e.substr(f).match(/[^\w\d_]/))?(r=e.substr(f,t.index),f+=t.index-1):(r=e.substr(f),f=e.length);return function(e,t,r){var a="function"==typeof n?n(r):n[r];void 0===a&&""!=r?a="":void 0===a&&(a="$");return"object"==typeof a?t+i+JSON.stringify(a)+i:t+a}(0,"",r)}}).reduce(function(e,n){return void 0===n?e:e.concat(n)},[])}(e,n,o);return"function"!=typeof n?c:c.reduce(function(e,n){if("object"==typeof n)return e.concat(n);var t=n.split(RegExp("("+i+".*?"+i+")","g"));return 1===t.length?e.concat(t[0]):e.concat(t.filter(Boolean).map(function(e){return RegExp("^"+i).test(e)?JSON.parse(e.split(i)[1]):e}))},[])}},function(e,n,t){"use strict";t.r(n);t(2);var r=t(0);function a(e){var n='require "http/client"\nrequire "uri"\n',t="\n# response.status_code.not_nil!\n# response.body.not_nil!\n",a={DELETE:"delete",GET:"get",HEAD:"head",OPTIONS:"options",PATCH:"patch",POST:"post",PUT:"put"},s=/^([^\s]+=[^\s]+)(&[^\s]+=[^\s]+)*$/;if(e.trim()){var i=function(e,n){void 0===n&&(n={}),e=(e=e.replace(/\\\n/g,"")).trim();var t=Object(r.parse)(e),a={_:[]};function s(e,n){a[e]||(a[e]=[]),a[e].push(n)}for(;t.length;){var i=t.shift();if("glob"==i.op&&(i=i.pattern),"-"==i[0]){if("-"==(i=i.substring(1,i.length))[0])if(o(i=i.substring(1,i.length)))a[i]=!0;else if(i.indexOf("=")>0)s(i.substring(0,i.indexOf("=")),i.substring(i.indexOf("=")+1,i.length));else s(i,t.shift());else o(i)?a[i]=!0:i.length>1?s(i[0],i.substring(1,i.length)):s(i[0],t.shift());o(i)&&(a[i]=!0)}else s("_",i)}return a;function o(e){if(Array.isArray(n.boolFlags))for(var t=0;t<n.boolFlags.length;t++)if(n.boolFlags[t]==e)return!0;return!1}}(e,{boolFlags:["#","progress-bar","-","next","0","http1.0","http1.1","http2","no-npn","no-alpn","1","tlsv1","2","sslv2","3","sslv3","4","ipv4","6","ipv6","a","append","anyauth","B","use-ascii","basic","compressed","create-dirs","crlf","digest","disable-eprt","disable-epsv","environment","cert-status","false-start","f","fail","ftp-create-dirs","ftp-pasv","ftp-skip-pasv-ip","ftp-pret","ftp-ssl-ccc","ftp-ssl-control","g","globoff","G","get","ignore-content-length","i","include","I","head","j","junk-session-cookies","J","remote-header-name","k","insecure","l","list-only","L","location","location-trusted","metalink","n","netrc","N","no-buffer","netrc-file","netrc-optional","negotiate","no-keepalive","no-sessionid","ntlm","O","remote-name","oauth2-bearer","p","proxy-tunnel","path-as-is","post301","post302","post303","proxy-anyauth","proxy-basic","proxy-digest","proxy-negotiate","proxy-ntlm","q","raw","remote-name-all","s","silent","sasl-ir","S","show-error","ssl","ssl-reqd","ssl-allow-beast","ssl-no-revoke","socks5-gssapi-nec","tcp-nodelay","tlsv1.0","tlsv1.1","tlsv1.2","tr-encoding","trace-time","v","verbose","xattr","h","help","M","manual","V","version"]});if("curl"!=i._[0])throw"Not a curl command";var o=function(e){var n={url:"",method:"",headers:[],data:{}};e.url&&e.url.length>0?n.url=e.url[0]:e._.length>1&&(n.url=e._[1]);n.url=function(e){return e&&!new RegExp("^https?://","i").test(e)?"http://"+e:e}(n.url),e.H&&(n.headers=n.headers.concat(e.H));e.header&&(n.headers=n.headers.concat(e.header));(e.I||e.head)&&(n.method="HEAD");e.request&&e.request.length>0?n.method=e.request[e.request.length-1].toUpperCase():e.X&&e.X.length>0&&(n.method=e.X[e.X.length-1].toUpperCase());var t=[],r=[],a=function(e){n.method||(n.method="POST");for(var a=0;a<e.length;a++)e[a].length>0&&"@"==e[a][0]?r.push(e[a].substr(1)):t.push(e[a])};e.d&&a(e.d);e.data&&a(e.data);e["data-binary"]&&a(e["data-binary"]);t.length>0&&(n.data.ascii=t.join("&"));r.length>0&&(n.data.files=r);var s="";e.user&&e.user.length>0?s=e.user[e.user.length-1]:e.u&&e.u.length>0&&(s=e.u[e.u.length-1]);var i=s.indexOf(":");i>-1?n.basicauth={user:s.substr(0,i),pass:s.substr(i+1)}:n.basicAuth={user:s,pass:"<PASSWORD>"};(e.k||e.insecure)&&(n.insecure=!0);n.method||(n.method="GET");return n}(i);return 0!=o.headers.length||"GET"!=o.method||o.data.ascii||o.data.files||o.basicauth||o.insecure?function(e){for(var r={},i=0;i<e.headers.length;i++){var o=e.headers[i].indexOf(":");if(-1!=o){var l=e.headers[i].substr(0,o).trim(),u=e.headers[i].substr(o+1).trim();r[(d=l,d.replace(/\w*/g,function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()}))]=u}}var d;delete r["Accept-Encoding"];var g="";g+="headers = HTTP::Headers.new\n",g+='uri = URI.parse("'+c(e.url)+'")\n',g+="client = HTTP::Client.new(uri.host.not_nil!)\n",e.basicauth&&(g+='client.basic_auth("'+c(e.basicauth.user)+'", "'+c(e.basicauth.pass)+'")\n');for(var l in r)g+='headers["'+c(l)+'"] = "'+c(r[l])+'"\n';if(e.data.ascii)if(function(e){try{return JSON.parse(e),!0}catch(e){return!1}}(e.data.ascii)){var f=JSON.parse(e.data.ascii);g+='body = "'+JSON.stringify(f).replace(/"/g,'\\"')+'"\n';var p=!0}else if(s.test(e.data.ascii)){g+='form = "'+c(e.data.ascii)+'"\n';var h=!0}else{g+='body = "'+c(e.data.ascii)+'"\n';p=!0}if(e.data.files&&e.data.files.length>0){e.data.ascii||(g+='body = ""\n');for(i=0;i<e.data.files.length;i++)g+='body += File.read("'+c(e.data.files[i])+'").delete("\\r\\n")\n';p=!0}g+="\n",a[e.method]?g+=void 0!==h?"response = client."+a[e.method]+"(uri.request_target, headers: headers, form: form)\n":void 0!==p?"response = client."+a[e.method]+"(uri.request_target, headers: headers, body: body)\n":"response = client."+a[e.method]+"(uri.request_target, headers: headers)\n":g+="# http/client does not support the method。available methods: delete,get,head,options,patch,post,put";return n+"\n"+g+t}(o):function(e){var r="";return r+='uri = URI.parse("'+c(e.url)+'")\n',r+="client = HTTP::Client.new(uri.host.not_nil!)\n",n+"\n"+(r+="response = client.get(uri.request_target)\n")+t}(o)}function c(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}}t.d(n,"default",function(){return a})},function(e,n,t){"use strict";const r=t(3),a=t(4),s=t(5);function i(e,n){return n.encode?n.strict?r(e):encodeURIComponent(e):e}function o(e,n){return n.decode?a(e):e}function c(e){const n=e.indexOf("#");return-1!==n&&(e=e.slice(0,n)),e}function l(e){const n=(e=c(e)).indexOf("?");return-1===n?"":e.slice(n+1)}function u(e,n){const t=function(e){let n;switch(e.arrayFormat){case"index":return(e,t,r)=>{n=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),n?(void 0===r[e]&&(r[e]={}),r[e][n[1]]=t):r[e]=t};case"bracket":return(e,t,r)=>{n=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),n?void 0!==r[e]?r[e]=[].concat(r[e],t):r[e]=[t]:r[e]=t};case"comma":return(e,n,t)=>{const r="string"==typeof n&&n.split("").indexOf(",")>-1?n.split(","):n;t[e]=r};default:return(e,n,t)=>{void 0!==t[e]?t[e]=[].concat(t[e],n):t[e]=n}}}(n=Object.assign({decode:!0,sort:!0,arrayFormat:"none",parseNumbers:!1,parseBooleans:!1},n)),r=Object.create(null);if("string"!=typeof e)return r;if(!(e=e.trim().replace(/^[?#&]/,"")))return r;for(const a of e.split("&")){let[e,i]=s(a.replace(/\+/g," "),"=");i=void 0===i?null:o(i,n),n.parseNumbers&&!Number.isNaN(Number(i))&&"string"==typeof i&&""!==i.trim()?i=Number(i):!n.parseBooleans||null===i||"true"!==i.toLowerCase()&&"false"!==i.toLowerCase()||(i="true"===i.toLowerCase()),t(o(e,n),i,r)}return!1===n.sort?r:(!0===n.sort?Object.keys(r).sort():Object.keys(r).sort(n.sort)).reduce((e,n)=>{const t=r[n];return Boolean(t)&&"object"==typeof t&&!Array.isArray(t)?e[n]=function e(n){return Array.isArray(n)?n.sort():"object"==typeof n?e(Object.keys(n)).sort((e,n)=>Number(e)-Number(n)).map(e=>n[e]):n}(t):e[n]=t,e},Object.create(null))}n.extract=l,n.parse=u,n.stringify=(e,n)=>{if(!e)return"";const t=function(e){switch(e.arrayFormat){case"index":return n=>(t,r)=>{const a=t.length;return void 0===r?t:null===r?[...t,[i(n,e),"[",a,"]"].join("")]:[...t,[i(n,e),"[",i(a,e),"]=",i(r,e)].join("")]};case"bracket":return n=>(t,r)=>void 0===r?t:null===r?[...t,[i(n,e),"[]"].join("")]:[...t,[i(n,e),"[]=",i(r,e)].join("")];case"comma":return n=>(t,r,a)=>null==r||0===r.length?t:0===a?[[i(n,e),"=",i(r,e)].join("")]:[[t,i(r,e)].join(",")];default:return n=>(t,r)=>void 0===r?t:null===r?[...t,i(n,e)]:[...t,[i(n,e),"=",i(r,e)].join("")]}}(n=Object.assign({encode:!0,strict:!0,arrayFormat:"none"},n)),r=Object.keys(e);return!1!==n.sort&&r.sort(n.sort),r.map(r=>{const a=e[r];return void 0===a?"":null===a?i(r,n):Array.isArray(a)?a.reduce(t(r),[]).join("&"):i(r,n)+"="+i(a,n)}).filter(e=>e.length>0).join("&")},n.parseUrl=(e,n)=>({url:c(e).split("?")[0]||"",query:u(l(e),n)})},function(e,n,t){"use strict";e.exports=e=>encodeURIComponent(e).replace(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`)},function(e,n,t){"use strict";var r=new RegExp("%[a-f0-9]{2}","gi"),a=new RegExp("(%[a-f0-9]{2})+","gi");function s(e,n){try{return decodeURIComponent(e.join(""))}catch(e){}if(1===e.length)return e;n=n||1;var t=e.slice(0,n),r=e.slice(n);return Array.prototype.concat.call([],s(t),s(r))}function i(e){try{return decodeURIComponent(e)}catch(a){for(var n=e.match(r),t=1;t<n.length;t++)n=(e=s(n,t).join("")).match(r);return e}}e.exports=function(e){if("string"!=typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(n){return function(e){for(var n={"%FE%FF":"��","%FF%FE":"��"},t=a.exec(e);t;){try{n[t[0]]=decodeURIComponent(t[0])}catch(e){var r=i(t[0]);r!==t[0]&&(n[t[0]]=r)}t=a.exec(e)}n["%C2"]="�";for(var s=Object.keys(n),o=0;o<s.length;o++){var c=s[o];e=e.replace(new RegExp(c,"g"),n[c])}return e}(e)}}},function(e,n,t){"use strict";e.exports=(e,n)=>{if("string"!=typeof e||"string"!=typeof n)throw new TypeError("Expected the arguments to be of type `string`");if(""===n)return[e];const t=e.indexOf(n);return-1===t?[e]:[e.slice(0,t),e.slice(t+n.length)]}},function(e,n,t){var r,a,s;a=function(e){var n,t=[],r=Object.keys,a={},s={},i=/^(no-?highlight|plain|text)$/i,o=/\blang(?:uage)?-([\w-]+)\b/i,c=/((^(<[^>]+>|\t|)+|(?:\n)))/gm,l="</span>",u={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0};function d(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function g(e){return e.nodeName.toLowerCase()}function f(e,n){var t=e&&e.exec(n);return t&&0===t.index}function p(e){return i.test(e)}function h(e){var n,t={},r=Array.prototype.slice.call(arguments,1);for(n in e)t[n]=e[n];return r.forEach(function(e){for(n in e)t[n]=e[n]}),t}function b(e){var n=[];return function e(t,r){for(var a=t.firstChild;a;a=a.nextSibling)3===a.nodeType?r+=a.nodeValue.length:1===a.nodeType&&(n.push({event:"start",offset:r,node:a}),r=e(a,r),g(a).match(/br|hr|img|input/)||n.push({event:"stop",offset:r,node:a}));return r}(e,0),n}function m(e){if(n&&!e.langApiRestored){for(var t in e.langApiRestored=!0,n)e[t]&&(e[n[t]]=e[t]);(e.contains||[]).concat(e.variants||[]).forEach(m)}}function v(e){function n(e){return e&&e.source||e}function t(t,r){return new RegExp(n(t),"m"+(e.case_insensitive?"i":"")+(r?"g":""))}!function a(s,i){if(!s.compiled){if(s.compiled=!0,s.keywords=s.keywords||s.beginKeywords,s.keywords){var o={},c=function(n,t){e.case_insensitive&&(t=t.toLowerCase()),t.split(" ").forEach(function(e){var t=e.split("|");o[t[0]]=[n,t[1]?Number(t[1]):1]})};"string"==typeof s.keywords?c("keyword",s.keywords):r(s.keywords).forEach(function(e){c(e,s.keywords[e])}),s.keywords=o}s.lexemesRe=t(s.lexemes||/\w+/,!0),i&&(s.beginKeywords&&(s.begin="\\b("+s.beginKeywords.split(" ").join("|")+")\\b"),s.begin||(s.begin=/\B|\b/),s.beginRe=t(s.begin),s.endSameAsBegin&&(s.end=s.begin),s.end||s.endsWithParent||(s.end=/\B|\b/),s.end&&(s.endRe=t(s.end)),s.terminator_end=n(s.end)||"",s.endsWithParent&&i.terminator_end&&(s.terminator_end+=(s.end?"|":"")+i.terminator_end)),s.illegal&&(s.illegalRe=t(s.illegal)),null==s.relevance&&(s.relevance=1),s.contains||(s.contains=[]),s.contains=Array.prototype.concat.apply([],s.contains.map(function(e){return function(e){return e.variants&&!e.cached_variants&&(e.cached_variants=e.variants.map(function(n){return h(e,{variants:null},n)})),e.cached_variants||e.endsWithParent&&[h(e)]||[e]}("self"===e?s:e)})),s.contains.forEach(function(e){a(e,s)}),s.starts&&a(s.starts,i);var l=s.contains.map(function(e){return e.beginKeywords?"\\.?(?:"+e.begin+")\\.?":e.begin}).concat([s.terminator_end,s.illegal]).map(n).filter(Boolean);s.terminators=l.length?t(function(e,t){for(var r=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./,a=0,s="",i=0;i<e.length;i++){var o=a,c=n(e[i]);for(i>0&&(s+=t);c.length>0;){var l=r.exec(c);if(null==l){s+=c;break}s+=c.substring(0,l.index),c=c.substring(l.index+l[0].length),"\\"==l[0][0]&&l[1]?s+="\\"+String(Number(l[1])+o):(s+=l[0],"("==l[0]&&a++)}}return s}(l,"|"),!0):{exec:function(){return null}}}}(e)}function E(e,n,t,r){function s(e){return new RegExp(e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"m")}function i(e,n){var t=h.case_insensitive?n[0].toLowerCase():n[0];return e.keywords.hasOwnProperty(t)&&e.keywords[t]}function o(e,n,t,r){var a='<span class="'+(r?"":u.classPrefix);return e?(a+=e+'">')+n+(t?"":l):n}function c(){w+=null!=m.subLanguage?function(){var e="string"==typeof m.subLanguage;if(e&&!a[m.subLanguage])return d(x);var n=e?E(m.subLanguage,x,!0,_[m.subLanguage]):y(x,m.subLanguage.length?m.subLanguage:void 0);return m.relevance>0&&(N+=n.relevance),e&&(_[m.subLanguage]=n.top),o(n.language,n.value,!1,!0)}():function(){var e,n,t,r;if(!m.keywords)return d(x);for(r="",n=0,m.lexemesRe.lastIndex=0,t=m.lexemesRe.exec(x);t;)r+=d(x.substring(n,t.index)),(e=i(m,t))?(N+=e[1],r+=o(e[0],d(t[0]))):r+=d(t[0]),n=m.lexemesRe.lastIndex,t=m.lexemesRe.exec(x);return r+d(x.substr(n))}(),x=""}function g(e){w+=e.className?o(e.className,"",!0):"",m=Object.create(e,{parent:{value:m}})}function p(e,n){if(x+=e,null==n)return c(),0;var r=function(e,n){var t,r;for(t=0,r=n.contains.length;t<r;t++)if(f(n.contains[t].beginRe,e))return n.contains[t].endSameAsBegin&&(n.contains[t].endRe=s(n.contains[t].beginRe.exec(e)[0])),n.contains[t]}(n,m);if(r)return r.skip?x+=n:(r.excludeBegin&&(x+=n),c(),r.returnBegin||r.excludeBegin||(x=n)),g(r),r.returnBegin?0:n.length;var a=function e(n,t){if(f(n.endRe,t)){for(;n.endsParent&&n.parent;)n=n.parent;return n}if(n.endsWithParent)return e(n.parent,t)}(m,n);if(a){var i=m;i.skip?x+=n:(i.returnEnd||i.excludeEnd||(x+=n),c(),i.excludeEnd&&(x=n));do{m.className&&(w+=l),m.skip||m.subLanguage||(N+=m.relevance),m=m.parent}while(m!==a.parent);return a.starts&&(a.endSameAsBegin&&(a.starts.endRe=a.endRe),g(a.starts)),i.returnEnd?0:n.length}if(function(e,n){return!t&&f(n.illegalRe,e)}(n,m))throw new Error('Illegal lexeme "'+n+'" for mode "'+(m.className||"<unnamed>")+'"');return x+=n,n.length||1}var h=R(e);if(!h)throw new Error('Unknown language: "'+e+'"');v(h);var b,m=r||h,_={},w="";for(b=m;b!==h;b=b.parent)b.className&&(w=o(b.className,"",!0)+w);var x="",N=0;try{for(var O,A,S=0;m.terminators.lastIndex=S,O=m.terminators.exec(n);)A=p(n.substring(S,O.index),O[0]),S=O.index+A;for(p(n.substr(S)),b=m;b.parent;b=b.parent)b.className&&(w+=l);return{relevance:N,value:w,language:e,top:m}}catch(e){if(e.message&&-1!==e.message.indexOf("Illegal"))return{relevance:0,value:d(n)};throw e}}function y(e,n){n=n||u.languages||r(a);var t={relevance:0,value:d(e)},s=t;return n.filter(R).filter(N).forEach(function(n){var r=E(n,e,!1);r.language=n,r.relevance>s.relevance&&(s=r),r.relevance>t.relevance&&(s=t,t=r)}),s.language&&(t.second_best=s),t}function _(e){return u.tabReplace||u.useBR?e.replace(c,function(e,n){return u.useBR&&"\n"===e?"<br>":u.tabReplace?n.replace(/\t/g,u.tabReplace):""}):e}function w(e){var n,r,a,i,c,l=function(e){var n,t,r,a,s=e.className+" ";if(s+=e.parentNode?e.parentNode.className:"",t=o.exec(s))return R(t[1])?t[1]:"no-highlight";for(n=0,r=(s=s.split(/\s+/)).length;n<r;n++)if(p(a=s[n])||R(a))return a}(e);p(l)||(u.useBR?(n=document.createElementNS("http://www.w3.org/1999/xhtml","div")).innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n"):n=e,c=n.textContent,a=l?E(l,c,!0):y(c),(r=b(n)).length&&((i=document.createElementNS("http://www.w3.org/1999/xhtml","div")).innerHTML=a.value,a.value=function(e,n,r){var a=0,s="",i=[];function o(){return e.length&&n.length?e[0].offset!==n[0].offset?e[0].offset<n[0].offset?e:n:"start"===n[0].event?e:n:e.length?e:n}function c(e){s+="<"+g(e)+t.map.call(e.attributes,function(e){return" "+e.nodeName+'="'+d(e.value).replace('"',"&quot;")+'"'}).join("")+">"}function l(e){s+="</"+g(e)+">"}function u(e){("start"===e.event?c:l)(e.node)}for(;e.length||n.length;){var f=o();if(s+=d(r.substring(a,f[0].offset)),a=f[0].offset,f===e){i.reverse().forEach(l);do{u(f.splice(0,1)[0]),f=o()}while(f===e&&f.length&&f[0].offset===a);i.reverse().forEach(c)}else"start"===f[0].event?i.push(f[0].node):i.pop(),u(f.splice(0,1)[0])}return s+d(r.substr(a))}(r,b(i),c)),a.value=_(a.value),e.innerHTML=a.value,e.className=function(e,n,t){var r=n?s[n]:t,a=[e.trim()];return e.match(/\bhljs\b/)||a.push("hljs"),-1===e.indexOf(r)&&a.push(r),a.join(" ").trim()}(e.className,l,a.language),e.result={language:a.language,re:a.relevance},a.second_best&&(e.second_best={language:a.second_best.language,re:a.second_best.relevance}))}function x(){if(!x.called){x.called=!0;var e=document.querySelectorAll("pre code");t.forEach.call(e,w)}}function R(e){return e=(e||"").toLowerCase(),a[e]||a[s[e]]}function N(e){var n=R(e);return n&&!n.disableAutodetect}return e.highlight=E,e.highlightAuto=y,e.fixMarkup=_,e.highlightBlock=w,e.configure=function(e){u=h(u,e)},e.initHighlighting=x,e.initHighlightingOnLoad=function(){addEventListener("DOMContentLoaded",x,!1),addEventListener("load",x,!1)},e.registerLanguage=function(n,t){var r=a[n]=t(e);m(r),r.aliases&&r.aliases.forEach(function(e){s[e]=n})},e.listLanguages=function(){return r(a)},e.getLanguage=R,e.autoDetection=N,e.inherit=h,e.IDENT_RE="[a-zA-Z]\\w*",e.UNDERSCORE_IDENT_RE="[a-zA-Z_]\\w*",e.NUMBER_RE="\\b\\d+(\\.\\d+)?",e.C_NUMBER_RE="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",e.BINARY_NUMBER_RE="\\b(0b[01]+)",e.RE_STARTERS_RE="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",e.BACKSLASH_ESCAPE={begin:"\\\\[\\s\\S]",relevance:0},e.APOS_STRING_MODE={className:"string",begin:"'",end:"'",illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},e.QUOTE_STRING_MODE={className:"string",begin:'"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},e.PHRASAL_WORDS_MODE={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},e.COMMENT=function(n,t,r){var a=e.inherit({className:"comment",begin:n,end:t,contains:[]},r||{});return a.contains.push(e.PHRASAL_WORDS_MODE),a.contains.push({className:"doctag",begin:"(?:TODO|FIXME|NOTE|BUG|XXX):",relevance:0}),a},e.C_LINE_COMMENT_MODE=e.COMMENT("//","$"),e.C_BLOCK_COMMENT_MODE=e.COMMENT("/\\*","\\*/"),e.HASH_COMMENT_MODE=e.COMMENT("#","$"),e.NUMBER_MODE={className:"number",begin:e.NUMBER_RE,relevance:0},e.C_NUMBER_MODE={className:"number",begin:e.C_NUMBER_RE,relevance:0},e.BINARY_NUMBER_MODE={className:"number",begin:e.BINARY_NUMBER_RE,relevance:0},e.CSS_NUMBER_MODE={className:"number",begin:e.NUMBER_RE+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},e.REGEXP_MODE={className:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[e.BACKSLASH_ESCAPE,{begin:/\[/,end:/\]/,relevance:0,contains:[e.BACKSLASH_ESCAPE]}]},e.TITLE_MODE={className:"title",begin:e.IDENT_RE,relevance:0},e.UNDERSCORE_TITLE_MODE={className:"title",begin:e.UNDERSCORE_IDENT_RE,relevance:0},e.METHOD_GUARD={begin:"\\.\\s*"+e.UNDERSCORE_IDENT_RE,relevance:0},e},s="object"==typeof window&&window||"object"==typeof self&&self,n.nodeType?s&&(s.hljs=a({}),void 0===(r=function(){return s.hljs}.apply(n,[]))||(e.exports=r)):a(n)},function(e,n){e.exports=function(e){var n="[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",t={keyword:"and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",literal:"true false nil"},r={className:"doctag",begin:"@[A-Za-z]+"},a={begin:"#<",end:">"},s=[e.COMMENT("#","$",{contains:[r]}),e.COMMENT("^\\=begin","^\\=end",{contains:[r],relevance:10}),e.COMMENT("^__END__","\\n$")],i={className:"subst",begin:"#\\{",end:"}",keywords:t},o={className:"string",contains:[e.BACKSLASH_ESCAPE,i],variants:[{begin:/'/,end:/'/},{begin:/"/,end:/"/},{begin:/`/,end:/`/},{begin:"%[qQwWx]?\\(",end:"\\)"},{begin:"%[qQwWx]?\\[",end:"\\]"},{begin:"%[qQwWx]?{",end:"}"},{begin:"%[qQwWx]?<",end:">"},{begin:"%[qQwWx]?/",end:"/"},{begin:"%[qQwWx]?%",end:"%"},{begin:"%[qQwWx]?-",end:"-"},{begin:"%[qQwWx]?\\|",end:"\\|"},{begin:/\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/},{begin:/<<(-?)\w+$/,end:/^\s*\w+$/}]},c={className:"params",begin:"\\(",end:"\\)",endsParent:!0,keywords:t},l=[o,a,{className:"class",beginKeywords:"class module",end:"$|;",illegal:/=/,contains:[e.inherit(e.TITLE_MODE,{begin:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"}),{begin:"<\\s*",contains:[{begin:"("+e.IDENT_RE+"::)?"+e.IDENT_RE}]}].concat(s)},{className:"function",beginKeywords:"def",end:"$|;",contains:[e.inherit(e.TITLE_MODE,{begin:n}),c].concat(s)},{begin:e.IDENT_RE+"::"},{className:"symbol",begin:e.UNDERSCORE_IDENT_RE+"(\\!|\\?)?:",relevance:0},{className:"symbol",begin:":(?!\\s)",contains:[o,{begin:n}],relevance:0},{className:"number",begin:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",relevance:0},{begin:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},{className:"params",begin:/\|/,end:/\|/,keywords:t},{begin:"("+e.RE_STARTERS_RE+"|unless)\\s*",keywords:"unless",contains:[a,{className:"regexp",contains:[e.BACKSLASH_ESCAPE,i],illegal:/\n/,variants:[{begin:"/",end:"/[a-z]*"},{begin:"%r{",end:"}[a-z]*"},{begin:"%r\\(",end:"\\)[a-z]*"},{begin:"%r!",end:"![a-z]*"},{begin:"%r\\[",end:"\\][a-z]*"}]}].concat(s),relevance:0}].concat(s);i.contains=l,c.contains=l;var u=[{begin:/^\s*=>/,starts:{end:"$",contains:l}},{className:"meta",begin:"^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+>|(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>)",starts:{end:"$",contains:l}}];return{aliases:["rb","gemspec","podspec","thor","irb"],keywords:t,illegal:/\/\*/,contains:s.concat(u).concat(l)}}},,,,function(e,n,t){"use strict";t.r(n);var r=t(1),a=t(6),s=t.n(a),i=t(7),o=t.n(i);s.a.registerLanguage("ruby",o.a);var c=s.a;function l(){var e='<span style="color: #777;">Crystal code will appear here</span>';function n(){var n=document.getElementById("input").value;document.getElementById("output").innerHTML=function(n){if(!n)return e;try{var t=Object(r.default)(n);if(t)return c.highlight("ruby",t).value}catch(e){return console.log(e),'<span class="clr-red">'+e+"</span>"}}(n)}["focus","blur","keyup"].forEach(function(e){document.getElementById("input").addEventListener(e,n)}),n(),document.getElementById("output").addEventListener("click",function(){if(document.selection){var e=document.body.createTextRange();e.moveToElementText(this),e.select()}else if(window.getSelection){var n=document.createRange();n.selectNode(this),window.getSelection().addRange(n)}}),window.useExample=function(e){var t=document.getElementById(e).innerHTML.trim();document.getElementById("input").value=t,n()}}"loading"!=document.readyState?l():document.addEventListener("DOMContentLoaded",l)}]);