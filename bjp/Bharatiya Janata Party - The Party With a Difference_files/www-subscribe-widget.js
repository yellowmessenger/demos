(function(){var h,aa="function"==typeof Object.create?Object.create:function(a){function b(){}
b.prototype=a;return new b},ba;
if("function"==typeof Object.setPrototypeOf)ba=Object.setPrototypeOf;else{var ca;a:{var da={Ra:!0},ea={};try{ea.__proto__=da;ca=ea.Ra;break a}catch(a){}ca=!1}ba=ca?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}
var fa=ba,ha="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},ia="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;
function ja(a){if(a){for(var b=ia,c=["Reflect","construct"],d=0;d<c.length-1;d++){var e=c[d];e in b||(b[e]={});b=b[e]}c=c[c.length-1];d=b[c];a=a(d);a!=d&&null!=a&&ha(b,c,{configurable:!0,writable:!0,value:a})}}
var ka=function(){function a(){function a(){}
Reflect.construct(a,[],function(){});
return new a instanceof a}
if("undefined"!=typeof Reflect&&Reflect.construct){if(a())return Reflect.construct;var b=Reflect.construct;return function(a,d,e){a=b(a,d);e&&Reflect.setPrototypeOf(a,e.prototype);return a}}return function(a,b,e){void 0===e&&(e=a);
e=aa(e.prototype||Object.prototype);return Function.prototype.apply.call(a,e,b)||e}}();
ja(function(){return ka});
var m=this;function p(a){return void 0!==a}
function q(a){return"string"==typeof a}
function la(a){return"number"==typeof a}
function r(a){a=a.split(".");for(var b=m,c=0;c<a.length;c++)if(b=b[a[c]],null==b)return null;return b}
function ma(){}
function na(a){a.U=void 0;a.o=function(){return a.U?a.U:a.U=new a}}
function pa(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}
function qa(a){return"array"==pa(a)}
function ra(a){var b=pa(a);return"array"==b||"object"==b&&"number"==typeof a.length}
function sa(a){return"function"==pa(a)}
function ta(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}
function ua(a){return a[va]||(a[va]=++wa)}
var va="closure_uid_"+(1E9*Math.random()>>>0),wa=0;function xa(a,b,c){return a.call.apply(a.bind,arguments)}
function ya(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}
function t(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?t=xa:t=ya;return t.apply(null,arguments)}
var za=Date.now||function(){return+new Date};
function u(a,b){var c=a.split("."),d=m;c[0]in d||"undefined"==typeof d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)!c.length&&p(b)?d[e]=b:d[e]&&d[e]!==Object.prototype[e]?d=d[e]:d=d[e]={}}
function v(a,b){function c(){}
c.prototype=b.prototype;a.m=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Fb=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}}
;function Aa(a){if(Error.captureStackTrace)Error.captureStackTrace(this,Aa);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}
v(Aa,Error);Aa.prototype.name="CustomError";var Ba;var Ca=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if(q(a))return q(b)&&1==b.length?a.indexOf(b,0):-1;
for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},y=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Da=Array.prototype.filter?function(a,b,c){return Array.prototype.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=q(a)?a.split(""):a,k=0;k<d;k++)if(k in g){var l=g[k];
b.call(c,l,k,a)&&(e[f++]=l)}return e},Ea=Array.prototype.map?function(a,b){return Array.prototype.map.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=Array(c),e=q(a)?a.split(""):a,f=0;f<c;f++)f in e&&(d[f]=b.call(void 0,e[f],f,a));
return d},Fa=Array.prototype.some?function(a,b){return Array.prototype.some.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=q(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a))return!0;
return!1};
function Ga(a,b){a:{var c=a.length;for(var d=q(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){c=e;break a}c=-1}return 0>c?null:q(a)?a.charAt(c):a[c]}
function Ha(a,b){return 0<=Ca(a,b)}
function Ia(a){return Array.prototype.concat.apply([],arguments)}
function Ja(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}
function Ka(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(ra(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}}
function La(a,b,c,d){return Array.prototype.splice.apply(a,Ma(arguments,1))}
function Ma(a,b,c){return 2>=arguments.length?Array.prototype.slice.call(a,b):Array.prototype.slice.call(a,b,c)}
function Na(a){for(var b=[],c=0;c<arguments.length;c++){var d=arguments[c];if(qa(d))for(var e=0;e<d.length;e+=8192)for(var f=Na.apply(null,Ma(d,e,e+8192)),g=0;g<f.length;g++)b.push(f[g]);else b.push(d)}return b}
;var Oa=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]},Pa=String.prototype.repeat?function(a,b){return a.repeat(b)}:function(a,b){return Array(b+1).join(a)};
function Qa(a){a=p(void 0)?a.toFixed(void 0):String(a);var b=a.indexOf(".");-1==b&&(b=a.length);return Pa("0",Math.max(0,2-b))+a}
function Ra(a,b){for(var c=0,d=Oa(String(a)).split("."),e=Oa(String(b)).split("."),f=Math.max(d.length,e.length),g=0;0==c&&g<f;g++){var k=d[g]||"",l=e[g]||"";do{k=/(\d*)(\D*)(.*)/.exec(k)||["","","",""];l=/(\d*)(\D*)(.*)/.exec(l)||["","","",""];if(0==k[0].length&&0==l[0].length)break;c=Sa(0==k[1].length?0:parseInt(k[1],10),0==l[1].length?0:parseInt(l[1],10))||Sa(0==k[2].length,0==l[2].length)||Sa(k[2],l[2]);k=k[3];l=l[3]}while(0==c)}return c}
function Sa(a,b){return a<b?-1:a>b?1:0}
function Ta(a){return String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()})}
function Ua(a){var b=q(void 0)?"undefined".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08"):"\\s";return a.replace(new RegExp("(^"+(b?"|["+b+"]+":"")+")([a-z])","g"),function(a,b,e){return b+e.toUpperCase()})}
;function Va(){this.b=("undefined"==typeof document?null:document)||{cookie:""}}
h=Va.prototype;h.isEnabled=function(){return navigator.cookieEnabled};
h.set=function(a,b,c,d,e,f){if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');p(c)||(c=-1);e=e?";domain="+e:"";d=d?";path="+d:"";f=f?";secure":"";c=0>c?"":0==c?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(za()+1E3*c)).toUTCString();this.b.cookie=a+"="+b+e+d+c+f};
h.get=function(a,b){for(var c=a+"=",d=(this.b.cookie||"").split(";"),e=0,f;e<d.length;e++){f=Oa(d[e]);if(0==f.lastIndexOf(c,0))return f.substr(c.length);if(f==a)return""}return b};
h.remove=function(a,b,c){var d=p(this.get(a));this.set(a,"",0,b,c);return d};
h.isEmpty=function(){return!this.b.cookie};
h.clear=function(){for(var a=(this.b.cookie||"").split(";"),b=[],c=[],d,e,f=0;f<a.length;f++)e=Oa(a[f]),d=e.indexOf("="),-1==d?(b.push(""),c.push(e)):(b.push(e.substring(0,d)),c.push(e.substring(d+1)));for(a=b.length-1;0<=a;a--)this.remove(b[a])};
var Wa=new Va;Wa.f=3950;function Xa(a,b){this.h=a;this.i=b;this.f=0;this.b=null}
Xa.prototype.get=function(){if(0<this.f){this.f--;var a=this.b;this.b=a.next;a.next=null}else a=this.h();return a};
function Ya(a,b){a.i(b);100>a.f&&(a.f++,b.next=a.b,a.b=b)}
;var Za;a:{var $a=m.navigator;if($a){var ab=$a.userAgent;if(ab){Za=ab;break a}}Za=""}function z(a){return-1!=Za.indexOf(a)}
;function bb(a,b,c){for(var d in a)b.call(c,a[d],d,a)}
function cb(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}
function db(a){var b=eb,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
var fb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function gb(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<fb.length;f++)c=fb[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;function hb(){return z("Safari")&&!(ib()||z("Coast")||z("Opera")||z("Edge")||z("Silk")||z("Android"))}
function ib(){return(z("Chrome")||z("CriOS"))&&!z("Edge")}
function jb(){return z("Android")&&!(ib()||z("Firefox")||z("Opera")||z("Silk"))}
;function kb(a){m.setTimeout(function(){throw a;},0)}
var lb;
function mb(){var a=m.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!z("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow;a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host;a=t(function(a){if(("*"==d||a.origin==d)&&a.data==
c)this.port1.onmessage()},this);
b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});
if("undefined"!==typeof a&&!z("Trident")&&!z("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(p(c.next)){c=c.next;var a=c.da;c.da=null;a()}};
return function(a){d.next={da:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?function(a){var b=document.createElement("SCRIPT");
b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};
document.documentElement.appendChild(b)}:function(a){m.setTimeout(a,0)}}
;function nb(){this.f=this.b=null}
var pb=new Xa(function(){return new ob},function(a){a.reset()});
nb.prototype.add=function(a,b){var c=pb.get();c.set(a,b);this.f?this.f.next=c:this.b=c;this.f=c};
nb.prototype.remove=function(){var a=null;this.b&&(a=this.b,this.b=this.b.next,this.b||(this.f=null),a.next=null);return a};
function ob(){this.next=this.scope=this.b=null}
ob.prototype.set=function(a,b){this.b=a;this.scope=b;this.next=null};
ob.prototype.reset=function(){this.next=this.scope=this.b=null};function qb(a,b){rb||sb();tb||(rb(),tb=!0);ub.add(a,b)}
var rb;function sb(){if(m.Promise&&m.Promise.resolve){var a=m.Promise.resolve(void 0);rb=function(){a.then(vb)}}else rb=function(){var a=vb;
!sa(m.setImmediate)||m.Window&&m.Window.prototype&&!z("Edge")&&m.Window.prototype.setImmediate==m.setImmediate?(lb||(lb=mb()),lb(a)):m.setImmediate(a)}}
var tb=!1,ub=new nb;function vb(){for(var a;a=ub.remove();){try{a.b.call(a.scope)}catch(b){kb(b)}Ya(pb,a)}tb=!1}
;function wb(){return z("iPhone")&&!z("iPod")&&!z("iPad")}
function xb(){return wb()||z("iPad")||z("iPod")}
;function yb(a){yb[" "](a);return a}
yb[" "]=ma;function zb(a,b){var c=Ab;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)}
;var Bb=z("Opera"),A=z("Trident")||z("MSIE"),Cb=z("Edge"),Db=Cb||A,Eb=z("Gecko")&&!(-1!=Za.toLowerCase().indexOf("webkit")&&!z("Edge"))&&!(z("Trident")||z("MSIE"))&&!z("Edge"),Fb=-1!=Za.toLowerCase().indexOf("webkit")&&!z("Edge"),Gb=z("Macintosh"),Hb=z("Windows"),Ib=z("Android"),Jb=wb(),Kb=z("iPad"),Lb=z("iPod"),Mb=xb();function Nb(){var a=m.document;return a?a.documentMode:void 0}
var Ob;a:{var Pb="",Qb=function(){var a=Za;if(Eb)return/rv:([^\);]+)(\)|;)/.exec(a);if(Cb)return/Edge\/([\d\.]+)/.exec(a);if(A)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Fb)return/WebKit\/(\S+)/.exec(a);if(Bb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();
Qb&&(Pb=Qb?Qb[1]:"");if(A){var Rb=Nb();if(null!=Rb&&Rb>parseFloat(Pb)){Ob=String(Rb);break a}}Ob=Pb}var Sb=Ob,Ab={};function Tb(a){return zb(a,function(){return 0<=Ra(Sb,a)})}
var Ub;var Vb=m.document;Ub=Vb&&A?Nb()||("CSS1Compat"==Vb.compatMode?parseInt(Sb,10):5):void 0;var Wb=z("Firefox"),Xb=wb()||z("iPod"),Yb=z("iPad"),Zb=jb(),$b=ib(),ac=hb()&&!xb();function bc(a,b,c){la(a)?(this.date=cc(a,b||0,c||1),dc(this,c||1)):ta(a)?(this.date=cc(a.getFullYear(),a.getMonth(),a.getDate()),dc(this,a.getDate())):(this.date=new Date(za()),a=this.date.getDate(),this.date.setHours(0),this.date.setMinutes(0),this.date.setSeconds(0),this.date.setMilliseconds(0),dc(this,a))}
function cc(a,b,c){b=new Date(a,b,c);0<=a&&100>a&&b.setFullYear(b.getFullYear()-1900);return b}
h=bc.prototype;h.getFullYear=function(){return this.date.getFullYear()};
h.getMonth=function(){return this.date.getMonth()};
h.getDate=function(){return this.date.getDate()};
h.getTime=function(){return this.date.getTime()};
h.set=function(a){this.date=new Date(a.getFullYear(),a.getMonth(),a.getDate())};
h.add=function(a){if(a.f||a.b){var b=this.getMonth()+a.b+12*a.f,c=this.getFullYear()+Math.floor(b/12);b%=12;0>b&&(b+=12);a:{switch(b){case 1:var d=0!=c%4||0==c%100&&0!=c%400?28:29;break a;case 5:case 8:case 10:case 3:d=30;break a}d=31}d=Math.min(d,this.getDate());this.date.setDate(1);this.date.setFullYear(c);this.date.setMonth(b);this.date.setDate(d)}a.days&&(a=new Date((new Date(this.getFullYear(),this.getMonth(),this.getDate(),12)).getTime()+864E5*a.days),this.date.setDate(1),this.date.setFullYear(a.getFullYear()),
this.date.setMonth(a.getMonth()),this.date.setDate(a.getDate()),dc(this,a.getDate()))};
h.N=function(a){return[this.getFullYear(),Qa(this.getMonth()+1),Qa(this.getDate())].join(a?"-":"")+""};
h.equals=function(a){return!(!a||this.getFullYear()!=a.getFullYear()||this.getMonth()!=a.getMonth()||this.getDate()!=a.getDate())};
h.toString=function(){return this.N()};
function dc(a,b){a.getDate()!=b&&a.date.setUTCHours(a.date.getUTCHours()+(a.getDate()<b?1:-1))}
h.valueOf=function(){return this.date.valueOf()};
function ec(a,b,c,d,e,f,g){this.date=la(a)?new Date(a,b||0,c||1,d||0,e||0,f||0,g||0):new Date(a&&a.getTime?a.getTime():za())}
v(ec,bc);ec.prototype.add=function(a){bc.prototype.add.call(this,a);a.hours&&this.date.setUTCHours(this.date.getUTCHours()+a.hours);a.minutes&&this.date.setUTCMinutes(this.date.getUTCMinutes()+a.minutes);a.seconds&&this.date.setUTCSeconds(this.date.getUTCSeconds()+a.seconds)};
ec.prototype.N=function(a){var b=bc.prototype.N.call(this,a);return a?b+" "+Qa(this.date.getHours())+":"+Qa(this.date.getMinutes())+":"+Qa(this.date.getSeconds()):b+"T"+Qa(this.date.getHours())+Qa(this.date.getMinutes())+Qa(this.date.getSeconds())};
ec.prototype.equals=function(a){return this.getTime()==a.getTime()};
ec.prototype.toString=function(){return this.N()};function fc(){this.h=this.h;this.i=this.i}
fc.prototype.h=!1;fc.prototype.L=function(){return this.h};
fc.prototype.dispose=function(){this.h||(this.h=!0,this.R())};
fc.prototype.R=function(){if(this.i)for(;this.i.length;)this.i.shift()()};
function gc(a){a&&"function"==typeof a.dispose&&a.dispose()}
;var hc=!Eb&&!A||A&&9<=Number(Ub)||Eb&&Tb("1.9.1"),ic=A&&!Tb("9");function jc(a){if(a.classList)return a.classList;a=a.className;return q(a)&&a.match(/\S+/g)||[]}
function B(a,b){return a.classList?a.classList.contains(b):Ha(jc(a),b)}
function C(a,b){a.classList?a.classList.add(b):B(a,b)||(a.className+=0<a.className.length?" "+b:b)}
function kc(a,b){if(a.classList)y(b,function(b){C(a,b)});
else{var c={};y(jc(a),function(a){c[a]=!0});
y(b,function(a){c[a]=!0});
a.className="";for(var d in c)a.className+=0<a.className.length?" "+d:d}}
function D(a,b){a.classList?a.classList.remove(b):B(a,b)&&(a.className=Da(jc(a),function(a){return a!=b}).join(" "))}
function lc(a,b){a.classList?y(b,function(b){D(a,b)}):a.className=Da(jc(a),function(a){return!Ha(b,a)}).join(" ")}
function E(a,b,c){c?C(a,b):D(a,b)}
function mc(a,b,c){B(a,b)&&(D(a,b),C(a,c))}
function nc(a,b){var c=!B(a,b);E(a,b,c)}
;var oc=!A&&!hb();function pc(a,b){if(/-[a-z]/.test(b))return null;if(oc&&a.dataset){if(jb()&&!(b in a.dataset))return null;var c=a.dataset[b];return void 0===c?null:c}return a.getAttribute("data-"+String(b).replace(/([A-Z])/g,"-$1").toLowerCase())}
;function qc(){this.b="";this.f=rc}
qc.prototype.T=!0;qc.prototype.S=function(){return this.b};
var sc=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,rc={};function tc(a){var b=new qc;b.b=a;return b}
tc("about:blank");function uc(){this.b="";this.f=vc}
uc.prototype.T=!0;uc.prototype.S=function(){return this.b};
function wc(a){if(a instanceof uc&&a.constructor===uc&&a.f===vc)return a.b;pa(a);return"type_error:SafeHtml"}
var vc={};function xc(a){var b=new uc;b.b=a;return b}
xc("<!DOCTYPE html>");xc("");xc("<br>");function G(a,b){this.x=p(a)?a:0;this.y=p(b)?b:0}
G.prototype.equals=function(a){return a instanceof G&&(this==a?!0:this&&a?this.x==a.x&&this.y==a.y:!1)};
function yc(a,b){return new G(a.x-b.x,a.y-b.y)}
G.prototype.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};
G.prototype.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};
G.prototype.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};function zc(a,b){this.width=a;this.height=b}
h=zc.prototype;h.Ta=function(){return this.width*this.height};
h.aspectRatio=function(){return this.width/this.height};
h.isEmpty=function(){return!this.Ta()};
h.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
h.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
h.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function Ac(a){return a?new Bc(Cc(a)):Ba||(Ba=new Bc)}
function H(a){return q(a)?document.getElementById(a):a}
function Dc(a,b){var c=b||document;return c.querySelectorAll&&c.querySelector?c.querySelectorAll("."+a):Ec(document,"*",a,b)}
function I(a,b){var c=b||document;if(c.getElementsByClassName)c=c.getElementsByClassName(a)[0];else{c=document;var d=b||c;c=d.querySelectorAll&&d.querySelector&&a?d.querySelector(a?"."+a:""):Ec(c,"*",a,b)[0]||null}return c||null}
function Ec(a,b,c,d){a=d||a;b=b&&"*"!=b?String(b).toUpperCase():"";if(a.querySelectorAll&&a.querySelector&&(b||c))return a.querySelectorAll(b+(c?"."+c:""));if(c&&a.getElementsByClassName){a=a.getElementsByClassName(c);if(b){d={};for(var e=0,f=0,g;g=a[f];f++)b==g.nodeName&&(d[e++]=g);d.length=e;return d}return a}a=a.getElementsByTagName(b||"*");if(c){d={};for(f=e=0;g=a[f];f++)b=g.className,"function"==typeof b.split&&Ha(b.split(/\s+/),c)&&(d[e++]=g);d.length=e;return d}return a}
function Fc(a,b){bb(b,function(b,d){b&&b.T&&(b=b.S());"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:Gc.hasOwnProperty(d)?a.setAttribute(Gc[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})}
var Gc={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};function Hc(a){a=a.document;a=Ic(a)?a.documentElement:a.body;return new zc(a.clientWidth,a.clientHeight)}
function Jc(a){var b=Kc(a);a=Lc(a);return A&&Tb("10")&&a.pageYOffset!=b.scrollTop?new G(b.scrollLeft,b.scrollTop):new G(a.pageXOffset||b.scrollLeft,a.pageYOffset||b.scrollTop)}
function Kc(a){return a.scrollingElement?a.scrollingElement:!Fb&&Ic(a)?a.documentElement:a.body||a.documentElement}
function Lc(a){return a.parentWindow||a.defaultView}
function Ic(a){return"CSS1Compat"==a.compatMode}
function Mc(a){a&&a.parentNode&&a.parentNode.removeChild(a)}
function Nc(a){return hc&&void 0!=a.children?a.children:Da(a.childNodes,function(a){return 1==a.nodeType})}
function Oc(a){return ta(a)&&1==a.nodeType}
function Pc(a,b){if(!a||!b)return!1;if(a.contains&&1==b.nodeType)return a==b||a.contains(b);if("undefined"!=typeof a.compareDocumentPosition)return a==b||!!(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a}
function Cc(a){return 9==a.nodeType?a:a.ownerDocument||a.document}
function Qc(a,b){if("textContent"in a)a.textContent=b;else if(3==a.nodeType)a.data=String(b);else if(a.firstChild&&3==a.firstChild.nodeType){for(;a.lastChild!=a.firstChild;)a.removeChild(a.lastChild);a.firstChild.data=String(b)}else{for(var c;c=a.firstChild;)a.removeChild(c);a.appendChild(Cc(a).createTextNode(String(b)))}}
function Rc(a,b){var c=[];return Sc(a,b,c,!0)?c[0]:void 0}
function Sc(a,b,c,d){if(null!=a)for(a=a.firstChild;a;){if(b(a)&&(c.push(a),d)||Sc(a,b,c,d))return!0;a=a.nextSibling}return!1}
var Tc={SCRIPT:1,STYLE:1,HEAD:1,IFRAME:1,OBJECT:1},Uc={IMG:" ",BR:"\n"};function Vc(a){var b;if((b="A"==a.tagName||"INPUT"==a.tagName||"TEXTAREA"==a.tagName||"SELECT"==a.tagName||"BUTTON"==a.tagName?!a.disabled&&(!Wc(a)||Xc(a)):Wc(a)&&Xc(a))&&A){var c;!sa(a.getBoundingClientRect)||A&&null==a.parentElement?c={height:a.offsetHeight,width:a.offsetWidth}:c=a.getBoundingClientRect();a=null!=c&&0<c.height&&0<c.width}else a=b;return a}
function Wc(a){return A&&!Tb("9")?(a=a.getAttributeNode("tabindex"),null!=a&&a.specified):a.hasAttribute("tabindex")}
function Xc(a){a=a.tabIndex;return la(a)&&0<=a&&32768>a}
function Yc(a){if(ic&&null!==a&&"innerText"in a)a=a.innerText.replace(/(\r\n|\r|\n)/g,"\n");else{var b=[];Zc(a,b,!0);a=b.join("")}a=a.replace(/ \xAD /g," ").replace(/\xAD/g,"");a=a.replace(/\u200B/g,"");ic||(a=a.replace(/ +/g," "));" "!=a&&(a=a.replace(/^\s*/,""));return a}
function Zc(a,b,c){if(!(a.nodeName in Tc))if(3==a.nodeType)c?b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g,"")):b.push(a.nodeValue);else if(a.nodeName in Uc)b.push(Uc[a.nodeName]);else for(a=a.firstChild;a;)Zc(a,b,c),a=a.nextSibling}
function $c(a,b,c,d){if(!b&&!c)return null;var e=b?String(b).toUpperCase():null;return ad(a,function(a){return(!e||a.nodeName==e)&&(!c||q(a.className)&&Ha(a.className.split(/\s+/),c))},!0,d)}
function J(a,b){return $c(a,null,b,void 0)}
function ad(a,b,c,d){a&&!c&&(a=a.parentNode);for(c=0;a&&(null==d||c<=d);){if(b(a))return a;a=a.parentNode;c++}return null}
function Bc(a){this.b=a||m.document||document}
Bc.prototype.getElementsByTagName=function(a,b){return(b||this.b).getElementsByTagName(String(a))};
Bc.prototype.createElement=function(a){return this.b.createElement(String(a))};
Bc.prototype.appendChild=function(a,b){a.appendChild(b)};
Bc.prototype.isElement=Oc;var bd="StopIteration"in m?m.StopIteration:{message:"StopIteration",stack:""};function cd(){}
cd.prototype.next=function(){throw bd;};
cd.prototype.B=function(){return this};
function dd(a){if(a instanceof cd)return a;if("function"==typeof a.B)return a.B(!1);if(ra(a)){var b=0,c=new cd;c.next=function(){for(;;){if(b>=a.length)throw bd;if(b in a)return a[b++];b++}};
return c}throw Error("Not implemented");}
function ed(a,b){if(ra(a))try{y(a,b,void 0)}catch(c){if(c!==bd)throw c;}else{a=dd(a);try{for(;;)b.call(void 0,a.next(),void 0,a)}catch(c){if(c!==bd)throw c;}}}
function fd(a){if(ra(a))return Ja(a);a=dd(a);var b=[];ed(a,function(a){b.push(a)});
return b}
;function gd(a,b){this.h={};this.b=[];this.D=this.f=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a)if(a instanceof gd)for(c=hd(a),d=0;d<c.length;d++)this.set(c[d],a.get(c[d]));else for(d in a)this.set(d,a[d])}
function hd(a){id(a);return a.b.concat()}
h=gd.prototype;h.equals=function(a,b){if(this===a)return!0;if(this.f!=a.f)return!1;var c=b||jd;id(this);for(var d,e=0;d=this.b[e];e++)if(!c(this.get(d),a.get(d)))return!1;return!0};
function jd(a,b){return a===b}
h.isEmpty=function(){return 0==this.f};
h.clear=function(){this.h={};this.D=this.f=this.b.length=0};
h.remove=function(a){return Object.prototype.hasOwnProperty.call(this.h,a)?(delete this.h[a],this.f--,this.D++,this.b.length>2*this.f&&id(this),!0):!1};
function id(a){if(a.f!=a.b.length){for(var b=0,c=0;b<a.b.length;){var d=a.b[b];Object.prototype.hasOwnProperty.call(a.h,d)&&(a.b[c++]=d);b++}a.b.length=c}if(a.f!=a.b.length){var e={};for(c=b=0;b<a.b.length;)d=a.b[b],Object.prototype.hasOwnProperty.call(e,d)||(a.b[c++]=d,e[d]=1),b++;a.b.length=c}}
h.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.h,a)?this.h[a]:b};
h.set=function(a,b){Object.prototype.hasOwnProperty.call(this.h,a)||(this.f++,this.b.push(a),this.D++);this.h[a]=b};
h.forEach=function(a,b){for(var c=hd(this),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};
h.B=function(a){id(this);var b=0,c=this.D,d=this,e=new cd;e.next=function(){if(c!=d.D)throw Error("The map has changed since the iterator was created");if(b>=d.b.length)throw bd;var e=d.b[b++];return a?e:d.h[e]};
return e};function kd(a){var b=[];ld(new md,a,b);return b.join("")}
function md(){}
function ld(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(qa(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),ld(a,d[f],c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");e="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(f=b[d],"function"!=typeof f&&(c.push(e),nd(d,c),c.push(":"),ld(a,f,c),e=","));c.push("}");return}}switch(typeof b){case "string":nd(b,c);break;case "number":c.push(isFinite(b)&&
!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}}
var od={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},pd=/\uffff/.test("\uffff")?/[\\"\x00-\x1f\x7f-\uffff]/g:/[\\"\x00-\x1f\x7f-\xff]/g;function nd(a,b){b.push('"',a.replace(pd,function(a){var b=od[a];b||(b="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),od[a]=b);return b}),'"')}
;function qd(a,b,c,d){this.top=a;this.right=b;this.bottom=c;this.left=d}
qd.prototype.getHeight=function(){return this.bottom-this.top};
qd.prototype.ceil=function(){this.top=Math.ceil(this.top);this.right=Math.ceil(this.right);this.bottom=Math.ceil(this.bottom);this.left=Math.ceil(this.left);return this};
qd.prototype.floor=function(){this.top=Math.floor(this.top);this.right=Math.floor(this.right);this.bottom=Math.floor(this.bottom);this.left=Math.floor(this.left);return this};
qd.prototype.round=function(){this.top=Math.round(this.top);this.right=Math.round(this.right);this.bottom=Math.round(this.bottom);this.left=Math.round(this.left);return this};function rd(a,b,c,d){this.left=a;this.top=b;this.width=c;this.height=d}
rd.prototype.ceil=function(){this.left=Math.ceil(this.left);this.top=Math.ceil(this.top);this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
rd.prototype.floor=function(){this.left=Math.floor(this.left);this.top=Math.floor(this.top);this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
rd.prototype.round=function(){this.left=Math.round(this.left);this.top=Math.round(this.top);this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function sd(a,b,c){if(q(b))(b=td(a,b))&&(a.style[b]=c);else for(var d in b){c=a;var e=b[d],f=td(c,d);f&&(c.style[f]=e)}}
var ud={};function td(a,b){var c=ud[b];if(!c){var d=Ta(b);c=d;void 0===a.style[d]&&(d=(Fb?"Webkit":Eb?"Moz":A?"ms":Bb?"O":null)+Ua(d),void 0!==a.style[d]&&(c=d));ud[b]=c}return c}
function vd(a,b){var c=Cc(a);return c.defaultView&&c.defaultView.getComputedStyle&&(c=c.defaultView.getComputedStyle(a,null))?c[b]||c.getPropertyValue(b)||"":""}
function wd(a,b){return vd(a,b)||(a.currentStyle?a.currentStyle[b]:null)||a.style&&a.style[b]}
function xd(a){try{var b=a.getBoundingClientRect()}catch(c){return{left:0,top:0,right:0,bottom:0}}A&&a.ownerDocument.body&&(a=a.ownerDocument,b.left-=a.documentElement.clientLeft+a.body.clientLeft,b.top-=a.documentElement.clientTop+a.body.clientTop);return b}
function yd(a){if(A&&!(8<=Number(Ub)))return a.offsetParent;var b=Cc(a),c=wd(a,"position"),d="fixed"==c||"absolute"==c;for(a=a.parentNode;a&&a!=b;a=a.parentNode)if(11==a.nodeType&&a.host&&(a=a.host),c=wd(a,"position"),d=d&&"static"==c&&a!=b.documentElement&&a!=b.body,!d&&(a.scrollWidth>a.clientWidth||a.scrollHeight>a.clientHeight||"fixed"==c||"absolute"==c||"relative"==c))return a;return null}
function zd(a){for(var b=new qd(0,Infinity,Infinity,0),c=Ac(a),d=c.b.body,e=c.b.documentElement,f=Kc(c.b);a=yd(a);)if(!(A&&0==a.clientWidth||Fb&&0==a.clientHeight&&a==d)&&a!=d&&a!=e&&"visible"!=wd(a,"overflow")){var g=Ad(a),k=new G(a.clientLeft,a.clientTop);g.x+=k.x;g.y+=k.y;b.top=Math.max(b.top,g.y);b.right=Math.min(b.right,g.x+a.clientWidth);b.bottom=Math.min(b.bottom,g.y+a.clientHeight);b.left=Math.max(b.left,g.x)}d=f.scrollLeft;f=f.scrollTop;b.left=Math.max(b.left,d);b.top=Math.max(b.top,f);c=
Hc(Lc(c.b)||window);b.right=Math.min(b.right,d+c.width);b.bottom=Math.min(b.bottom,f+c.height);return 0<=b.top&&0<=b.left&&b.bottom>b.top&&b.right>b.left?b:null}
function Ad(a){var b=Cc(a),c=new G(0,0);var d=b?Cc(b):document;d=!A||9<=Number(Ub)||Ic(Ac(d).b)?d.documentElement:d.body;if(a==d)return c;a=xd(a);b=Jc(Ac(b).b);c.x=a.left+b.x;c.y=a.top+b.y;return c}
function Bd(a){a=xd(a);return new G(a.left,a.top)}
function Cd(a,b){"number"==typeof a&&(a=(b?Math.round(a):a)+"px");return a}
function Dd(a){var b=Ed;if("none"!=wd(a,"display"))return b(a);var c=a.style,d=c.display,e=c.visibility,f=c.position;c.visibility="hidden";c.position="absolute";c.display="inline";a=b(a);c.display=d;c.position=f;c.visibility=e;return a}
function Ed(a){var b=a.offsetWidth,c=a.offsetHeight,d=Fb&&!b&&!c;return p(b)&&!d||!a.getBoundingClientRect?new zc(b,c):(a=xd(a),new zc(a.right-a.left,a.bottom-a.top))}
function Fd(a){var b=Ad(a);a=Dd(a);return new rd(b.x,b.y,a.width,a.height)}
function Gd(a){return"rtl"==wd(a,"direction")}
function Hd(a,b){if(/^\d+px?$/.test(b))return parseInt(b,10);var c=a.style.left,d=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;a.style.left=b;var e=a.style.pixelLeft;a.style.left=c;a.runtimeStyle.left=d;return+e}
function Id(a,b){var c=a.currentStyle?a.currentStyle[b]:null;return c?Hd(a,c):0}
var Jd={thin:2,medium:4,thick:6};function Kd(a,b){if("none"==(a.currentStyle?a.currentStyle[b+"Style"]:null))return 0;var c=a.currentStyle?a.currentStyle[b+"Width"]:null;return c in Jd?Jd[c]:Hd(a,c)}
;var Ld=function(){if(Hb){var a=/Windows NT ([0-9.]+)/;return(a=a.exec(Za))?a[1]:"0"}return Gb?(a=/10[_.][0-9_.]+/,(a=a.exec(Za))?a[0].replace(/_/g,"."):"10"):Ib?(a=/Android\s+([^\);]+)(\)|;)/,(a=a.exec(Za))?a[1]:""):Jb||Kb||Lb?(a=/(?:iPhone|CPU)\s+OS\s+(\S+)/,(a=a.exec(Za))?a[1].replace(/_/g,"."):""):""}();function Md(a){return(a=a.exec(Za))?a[1]:""}
var Nd=function(){if(Wb)return Md(/Firefox\/([0-9.]+)/);if(A||Cb||Bb)return Sb;if($b)return xb()?Md(/CriOS\/([0-9.]+)/):Md(/Chrome\/([0-9.]+)/);if(ac&&!xb())return Md(/Version\/([0-9.]+)/);if(Xb||Yb){var a=/Version\/(\S+).*Mobile\/(\S+)/.exec(Za);if(a)return a[1]+"."+a[2]}else if(Zb)return(a=Md(/Android\s+([0-9.]+)/))?a:Md(/Version\/([0-9.]+)/);return""}();function Od(a,b,c,d,e,f,g){var k;if(k=c.offsetParent){var l="HTML"==k.tagName||"BODY"==k.tagName;if(!l||"static"!=wd(k,"position")){var n=Ad(k);if(!l){l=Gd(k);var x;if(x=l){if(x=ac)x=0<=Ra(Nd,10);var F;if(F=Mb)F=0<=Ra(Ld,10);x=Eb||x||F}l=x?-k.scrollLeft:!l||Db&&Tb("8")||"visible"==wd(k,"overflowX")?k.scrollLeft:k.scrollWidth-k.clientWidth-k.scrollLeft;n=yc(n,new G(l,k.scrollTop))}}}k=n||new G;n=Fd(a);if(l=zd(a)){var w=new rd(l.left,l.top,l.right-l.left,l.bottom-l.top);l=Math.max(n.left,w.left);x=
Math.min(n.left+n.width,w.left+w.width);l<=x&&(F=Math.max(n.top,w.top),w=Math.min(n.top+n.height,w.top+w.height),F<=w&&(n.left=l,n.top=F,n.width=x-l,n.height=w-F))}l=Ac(a);F=Ac(c);if(l.b!=F.b){x=l.b.body;F=Lc(F.b);w=new G(0,0);var Q=(Q=Cc(x))?Lc(Q):window;b:{try{yb(Q.parent);var N=!0;break b}catch(Qi){}N=!1}if(N){N=x;do{var bf=Q==F?Ad(N):Bd(N);w.x+=bf.x;w.y+=bf.y}while(Q&&Q!=F&&Q!=Q.parent&&(N=Q.frameElement)&&(Q=Q.parent))}N=yc(w,Ad(x));!A||9<=Number(Ub)||Ic(l.b)||(N=yc(N,Jc(l.b)));n.left+=N.x;n.top+=
N.y}a=Pd(a,b);b=n.left;a&4?b+=n.width:a&2&&(b+=n.width/2);b=new G(b,n.top+(a&1?n.height:0));b=yc(b,k);e&&(b.x+=(a&4?-1:1)*e.x,b.y+=(a&1?-1:1)*e.y);var oa;g&&(oa=zd(c))&&(oa.top-=k.y,oa.right-=k.x,oa.bottom-=k.y,oa.left-=k.x);return Qd(b,c,d,f,oa,g,void 0)}
function Qd(a,b,c,d,e,f,g){a=new G(a.x,a.y);var k=Pd(b,c);c=Dd(b);g=g?new zc(g.width,g.height):new zc(c.width,c.height);a=new G(a.x,a.y);g=new zc(g.width,g.height);var l=0;if(d||0!=k)k&4?a.x-=g.width+(d?d.right:0):k&2?a.x-=g.width/2:d&&(a.x+=d.left),k&1?a.y-=g.height+(d?d.bottom:0):d&&(a.y+=d.top);if(f){if(e){d=a;k=g;l=0;65==(f&65)&&(d.x<e.left||d.x>=e.right)&&(f&=-2);132==(f&132)&&(d.y<e.top||d.y>=e.bottom)&&(f&=-5);d.x<e.left&&f&1&&(d.x=e.left,l|=1);if(f&16){var n=d.x;d.x<e.left&&(d.x=e.left,l|=
4);d.x+k.width>e.right&&(k.width=Math.min(e.right-d.x,n+k.width-e.left),k.width=Math.max(k.width,0),l|=4)}d.x+k.width>e.right&&f&1&&(d.x=Math.max(e.right-k.width,e.left),l|=1);f&2&&(l|=(d.x<e.left?16:0)|(d.x+k.width>e.right?32:0));d.y<e.top&&f&4&&(d.y=e.top,l|=2);f&32&&(n=d.y,d.y<e.top&&(d.y=e.top,l|=8),d.y+k.height>e.bottom&&(k.height=Math.min(e.bottom-d.y,n+k.height-e.top),k.height=Math.max(k.height,0),l|=8));d.y+k.height>e.bottom&&f&4&&(d.y=Math.max(e.bottom-k.height,e.top),l|=2);f&8&&(l|=(d.y<
e.top?64:0)|(d.y+k.height>e.bottom?128:0));e=l}else e=256;l=e}f=new rd(0,0,0,0);f.left=a.x;f.top=a.y;f.width=g.width;f.height=g.height;e=l;if(e&496)return e;g=new G(f.left,f.top);g instanceof G?(a=g.x,g=g.y):(a=g,g=void 0);b.style.left=Cd(a,!1);b.style.top=Cd(g,!1);g=new zc(f.width,f.height);c==g||c&&g&&c.width==g.width&&c.height==g.height||(c=g,g=Ic(Ac(Cc(b)).b),!A||Tb("10")||g&&Tb("8")?(b=b.style,Eb?b.MozBoxSizing="border-box":Fb?b.WebkitBoxSizing="border-box":b.boxSizing="border-box",b.width=Math.max(c.width,
0)+"px",b.height=Math.max(c.height,0)+"px"):(a=b.style,g?(A?(g=Id(b,"paddingLeft"),f=Id(b,"paddingRight"),d=Id(b,"paddingTop"),k=Id(b,"paddingBottom"),g=new qd(d,f,k,g)):(g=vd(b,"paddingLeft"),f=vd(b,"paddingRight"),d=vd(b,"paddingTop"),k=vd(b,"paddingBottom"),g=new qd(parseFloat(d),parseFloat(f),parseFloat(k),parseFloat(g))),!A||9<=Number(Ub)?(f=vd(b,"borderLeftWidth"),d=vd(b,"borderRightWidth"),k=vd(b,"borderTopWidth"),b=vd(b,"borderBottomWidth"),b=new qd(parseFloat(k),parseFloat(d),parseFloat(b),
parseFloat(f))):(f=Kd(b,"borderLeft"),d=Kd(b,"borderRight"),k=Kd(b,"borderTop"),b=Kd(b,"borderBottom"),b=new qd(k,d,b,f)),a.pixelWidth=c.width-b.left-g.left-g.right-b.right,a.pixelHeight=c.height-b.top-g.top-g.bottom-b.bottom):(a.pixelWidth=c.width,a.pixelHeight=c.height)));return e}
function Pd(a,b){return(b&8&&Gd(a)?b^4:b)&-9}
;function Rd(a){this.b=0;this.u=void 0;this.i=this.f=this.h=null;this.j=this.l=!1;if(a!=ma)try{var b=this;a.call(void 0,function(a){Sd(b,2,a)},function(a){Sd(b,3,a)})}catch(c){Sd(this,3,c)}}
function Td(){this.next=this.context=this.onRejected=this.f=this.b=null;this.h=!1}
Td.prototype.reset=function(){this.context=this.onRejected=this.f=this.b=null;this.h=!1};
var Ud=new Xa(function(){return new Td},function(a){a.reset()});
function Vd(a,b,c){var d=Ud.get();d.f=a;d.onRejected=b;d.context=c;return d}
Rd.prototype.then=function(a,b,c){return Wd(this,sa(a)?a:null,sa(b)?b:null,c)};
Rd.prototype.then=Rd.prototype.then;Rd.prototype.$goog_Thenable=!0;Rd.prototype.cancel=function(a){0==this.b&&qb(function(){var b=new Xd(a);Yd(this,b)},this)};
function Yd(a,b){if(0==a.b)if(a.h){var c=a.h;if(c.f){for(var d=0,e=null,f=null,g=c.f;g&&(g.h||(d++,g.b==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(0==c.b&&1==d?Yd(c,b):(f?(d=f,d.next==c.i&&(c.i=d),d.next=d.next.next):Zd(c),$d(c,e,3,b)))}a.h=null}else Sd(a,3,b)}
function ae(a,b){a.f||2!=a.b&&3!=a.b||be(a);a.i?a.i.next=b:a.f=b;a.i=b}
function Wd(a,b,c,d){var e=Vd(null,null,null);e.b=new Rd(function(a,g){e.f=b?function(c){try{var e=b.call(d,c);a(e)}catch(n){g(n)}}:a;
e.onRejected=c?function(b){try{var e=c.call(d,b);!p(e)&&b instanceof Xd?g(b):a(e)}catch(n){g(n)}}:g});
e.b.h=a;ae(a,e);return e.b}
Rd.prototype.C=function(a){this.b=0;Sd(this,2,a)};
Rd.prototype.P=function(a){this.b=0;Sd(this,3,a)};
function Sd(a,b,c){if(0==a.b){a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself"));a.b=1;a:{var d=c,e=a.C,f=a.P;if(d instanceof Rd){ae(d,Vd(e||ma,f||null,a));var g=!0}else{if(d)try{var k=!!d.$goog_Thenable}catch(n){k=!1}else k=!1;if(k)d.then(e,f,a),g=!0;else{if(ta(d))try{var l=d.then;if(sa(l)){ce(d,l,e,f,a);g=!0;break a}}catch(n){f.call(a,n);g=!0;break a}g=!1}}}g||(a.u=c,a.b=b,a.h=null,be(a),3!=b||c instanceof Xd||de(a,c))}}
function ce(a,b,c,d,e){function f(a){k||(k=!0,d.call(e,a))}
function g(a){k||(k=!0,c.call(e,a))}
var k=!1;try{b.call(a,g,f)}catch(l){f(l)}}
function be(a){a.l||(a.l=!0,qb(a.w,a))}
function Zd(a){var b=null;a.f&&(b=a.f,a.f=b.next,b.next=null);a.f||(a.i=null);return b}
Rd.prototype.w=function(){for(var a;a=Zd(this);)$d(this,a,this.b,this.u);this.l=!1};
function $d(a,b,c,d){if(3==c&&b.onRejected&&!b.h)for(;a&&a.j;a=a.h)a.j=!1;if(b.b)b.b.h=null,ee(b,c,d);else try{b.h?b.f.call(b.context):ee(b,c,d)}catch(e){fe.call(null,e)}Ya(Ud,b)}
function ee(a,b,c){2==b?a.f.call(a.context,c):a.onRejected&&a.onRejected.call(a.context,c)}
function de(a,b){a.j=!0;qb(function(){a.j&&fe.call(null,b)})}
var fe=kb;function Xd(a){Aa.call(this,a)}
v(Xd,Aa);Xd.prototype.name="cancel";function K(a){fc.call(this);this.u=1;this.j=[];this.l=0;this.b=[];this.f={};this.w=!!a}
v(K,fc);h=K.prototype;h.subscribe=function(a,b,c){var d=this.f[a];d||(d=this.f[a]=[]);var e=this.u;this.b[e]=a;this.b[e+1]=b;this.b[e+2]=c;this.u=e+3;d.push(e);return e};
function ge(a,b){var c=!1,d=a.subscribe("ROOT_MENU_REMOVED",function(a){c||(c=!0,this.J(d),b.apply(void 0,arguments))},a)}
function he(a,b,c){if(b=a.f[b]){var d=a.b;(b=Ga(b,function(a){return d[a+1]==c&&void 0==d[a+2]}))&&a.J(b)}}
h.J=function(a){var b=this.b[a];if(b){var c=this.f[b];if(0!=this.l)this.j.push(a),this.b[a+1]=ma;else{if(c){var d=Ca(c,a);0<=d&&Array.prototype.splice.call(c,d,1)}delete this.b[a];delete this.b[a+1];delete this.b[a+2]}}return!!b};
h.A=function(a,b){var c=this.f[a];if(c){for(var d=Array(arguments.length-1),e=1,f=arguments.length;e<f;e++)d[e-1]=arguments[e];if(this.w)for(e=0;e<c.length;e++){var g=c[e];ie(this.b[g+1],this.b[g+2],d)}else{this.l++;try{for(e=0,f=c.length;e<f;e++)g=c[e],this.b[g+1].apply(this.b[g+2],d)}finally{if(this.l--,0<this.j.length&&0==this.l)for(;c=this.j.pop();)this.J(c)}}return 0!=e}return!1};
function ie(a,b,c){qb(function(){a.apply(b,c)})}
h.clear=function(a){if(a){var b=this.f[a];b&&(y(b,this.J,this),delete this.f[a])}else this.b.length=0,this.f={}};
function je(a,b){if(b){var c=a.f[b];return c?c.length:0}c=0;for(var d in a.f)c+=je(a,d);return c}
h.R=function(){K.m.R.call(this);this.clear();this.j.length=0};function ke(a){this.b=a}
ke.prototype.set=function(a,b){p(b)?this.b.set(a,kd(b)):this.b.remove(a)};
ke.prototype.get=function(a){try{var b=this.b.get(a)}catch(c){return}if(null!==b)try{return JSON.parse(b)}catch(c){throw"Storage: Invalid value was encountered";}};
ke.prototype.remove=function(a){this.b.remove(a)};function le(a){this.b=a}
v(le,ke);function me(a){this.data=a}
function ne(a){return!p(a)||a instanceof me?a:new me(a)}
le.prototype.set=function(a,b){le.m.set.call(this,a,ne(b))};
le.prototype.f=function(a){a=le.m.get.call(this,a);if(!p(a)||a instanceof Object)return a;throw"Storage: Invalid value was encountered";};
le.prototype.get=function(a){if(a=this.f(a)){if(a=a.data,!p(a))throw"Storage: Invalid value was encountered";}else a=void 0;return a};function oe(a){this.b=a}
v(oe,le);oe.prototype.set=function(a,b,c){if(b=ne(b)){if(c){if(c<za()){oe.prototype.remove.call(this,a);return}b.expiration=c}b.creation=za()}oe.m.set.call(this,a,b)};
oe.prototype.f=function(a){var b=oe.m.f.call(this,a);if(b){var c=b.creation,d=b.expiration;if(d&&d<za()||c&&c>za())oe.prototype.remove.call(this,a);else return b}};function pe(){}
;function qe(){}
v(qe,pe);qe.prototype.clear=function(){var a=fd(this.B(!0)),b=this;y(a,function(a){b.remove(a)})};function re(a){this.b=a}
v(re,qe);h=re.prototype;h.isAvailable=function(){if(!this.b)return!1;try{return this.b.setItem("__sak","1"),this.b.removeItem("__sak"),!0}catch(a){return!1}};
h.set=function(a,b){try{this.b.setItem(a,b)}catch(c){if(0==this.b.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};
h.get=function(a){a=this.b.getItem(a);if(!q(a)&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
h.remove=function(a){this.b.removeItem(a)};
h.B=function(a){var b=0,c=this.b,d=new cd;d.next=function(){if(b>=c.length)throw bd;var d=c.key(b++);if(a)return d;d=c.getItem(d);if(!q(d))throw"Storage mechanism: Invalid value was encountered";return d};
return d};
h.clear=function(){this.b.clear()};
h.key=function(a){return this.b.key(a)};function se(){var a=null;try{a=window.localStorage||null}catch(b){}this.b=a}
v(se,re);function te(a,b){this.f=a;this.b=null;if(A&&!(9<=Number(Ub))){ue||(ue=new gd);this.b=ue.get(a);this.b||(b?this.b=document.getElementById(b):(this.b=document.createElement("userdata"),this.b.addBehavior("#default#userData"),document.body.appendChild(this.b)),ue.set(a,this.b));try{this.b.load(this.f)}catch(c){this.b=null}}}
v(te,qe);var ve={".":".2E","!":".21","~":".7E","*":".2A","'":".27","(":".28",")":".29","%":"."},ue=null;function we(a){return"_"+encodeURIComponent(a).replace(/[.!~*'()%]/g,function(a){return ve[a]})}
h=te.prototype;h.isAvailable=function(){return!!this.b};
h.set=function(a,b){this.b.setAttribute(we(a),b);xe(this)};
h.get=function(a){a=this.b.getAttribute(we(a));if(!q(a)&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
h.remove=function(a){this.b.removeAttribute(we(a));xe(this)};
h.B=function(a){var b=0,c=this.b.XMLDocument.documentElement.attributes,d=new cd;d.next=function(){if(b>=c.length)throw bd;var d=c[b++];if(a)return decodeURIComponent(d.nodeName.replace(/\./g,"%")).substr(1);d=d.nodeValue;if(!q(d))throw"Storage mechanism: Invalid value was encountered";return d};
return d};
h.clear=function(){for(var a=this.b.XMLDocument.documentElement,b=a.attributes.length;0<b;b--)a.removeAttribute(a.attributes[b-1].nodeName);xe(this)};
function xe(a){try{a.b.save(a.f)}catch(b){throw"Storage mechanism: Quota exceeded";}}
;function ye(a,b){this.f=a;this.b=b+"::"}
v(ye,qe);ye.prototype.set=function(a,b){this.f.set(this.b+a,b)};
ye.prototype.get=function(a){return this.f.get(this.b+a)};
ye.prototype.remove=function(a){this.f.remove(this.b+a)};
ye.prototype.B=function(a){var b=this.f.B(!0),c=this,d=new cd;d.next=function(){for(var d=b.next();d.substr(0,c.b.length)!=c.b;)d=b.next();return a?d.substr(c.b.length):c.f.get(d)};
return d};var ze=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function Ae(a){return a?decodeURI(a):a}
function Be(a,b){if(!b)return a;var c=a.indexOf("#");0>c&&(c=a.length);var d=a.indexOf("?");if(0>d||d>c){d=c;var e=""}else e=a.substring(d+1,c);c=[a.substr(0,d),e,a.substr(c)];d=c[1];c[1]=b?d?d+"&"+b:b:d;return c[0]+(c[1]?"?"+c[1]:"")+c[2]}
function Ce(a,b,c){if(qa(b))for(var d=0;d<b.length;d++)Ce(a,String(b[d]),c);else null!=b&&c.push(a+(""===b?"":"="+encodeURIComponent(String(b))))}
function De(a,b){for(var c=[],d=b||0;d<a.length;d+=2)Ce(a[d],a[d+1],c);return c.join("&")}
function Ee(a){var b=[],c;for(c in a)Ce(c,a[c],b);return b.join("&")}
function Fe(a,b){var c=2==arguments.length?De(arguments[1],0):De(arguments,1);return Be(a,c)}
function Ge(a,b){var c=Ee(b);return Be(a,c)}
;var He=window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{};u("yt.config_",He);function Ie(a){var b=arguments;if(1<b.length)He[b[0]]=b[1];else{b=b[0];for(var c in b)He[c]=b[c]}}
function L(a,b){return a in He?He[a]:b}
;function Je(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){Ke(b)}}:a}
function Ke(a){var b=r("yt.logging.errors.log");b?b(a,void 0,void 0,void 0,void 0):(b=L("ERRORS",[]),b.push([a,void 0,void 0,void 0,void 0]),Ie("ERRORS",b))}
;function M(a,b){sa(a)&&(a=Je(a));return window.setTimeout(a,b)}
;var Le=r("ytPubsubPubsubInstance")||new K;K.prototype.subscribe=K.prototype.subscribe;K.prototype.unsubscribeByKey=K.prototype.J;K.prototype.publish=K.prototype.A;K.prototype.clear=K.prototype.clear;u("ytPubsubPubsubInstance",Le);var Me=r("ytPubsubPubsubSubscribedKeys")||{};u("ytPubsubPubsubSubscribedKeys",Me);var Ne=r("ytPubsubPubsubTopicToKeys")||{};u("ytPubsubPubsubTopicToKeys",Ne);var Oe=r("ytPubsubPubsubIsSynchronous")||{};u("ytPubsubPubsubIsSynchronous",Oe);
function Pe(a,b,c){var d=Qe();if(d){var e=d.subscribe(a,function(){var d=arguments;var g=function(){Me[e]&&b.apply(c||window,d)};
try{Oe[a]?g():M(g,0)}catch(k){Ke(k)}},c);
Me[e]=!0;Ne[a]||(Ne[a]=[]);Ne[a].push(e);return e}return 0}
function Re(a){var b=Qe();b&&(la(a)?a=[a]:q(a)&&(a=[parseInt(a,10)]),y(a,function(a){b.unsubscribeByKey(a);delete Me[a]}))}
function O(a,b){var c=Qe();return c?c.publish.apply(c,arguments):!1}
function Se(a,b){Oe[a]=!0;var c=Qe();c&&c.publish.apply(c,arguments);Oe[a]=!1}
function Qe(){return r("ytPubsubPubsubInstance")}
;function Te(a,b,c){a&&(a.dataset?a.dataset[Ue(b)]=String(c):a.setAttribute("data-"+b,c))}
function Ve(a,b){return a?a.dataset?a.dataset[Ue(b)]:a.getAttribute("data-"+b):null}
function We(a,b){a&&(a.dataset?delete a.dataset[Ue(b)]:a.removeAttribute("data-"+b))}
var Xe={};function Ue(a){return Xe[a]||(Xe[a]=String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()}))}
;function P(a,b){this.version=a;this.args=b}
;function R(a,b){this.topic=a;this.b=b}
R.prototype.toString=function(){return this.topic};function Ye(a){var b=void 0;isNaN(b)&&(b=void 0);var c=r("yt.scheduler.instance.addJob");c?c(a,1,b):void 0===b?a():M(a,b||0)}
;function Ze(){}
function $e(){}
Ze.prototype=aa($e.prototype);Ze.prototype.constructor=Ze;if(fa)fa(Ze,$e);else for(var af in $e)if("prototype"!=af)if(Object.defineProperties){var cf=Object.getOwnPropertyDescriptor($e,af);cf&&Object.defineProperty(Ze,af,cf)}else Ze[af]=$e[af];Ze.m=$e.prototype;Ze.prototype.start=function(){var a=r("yt.scheduler.instance.start");a&&a()};
na(Ze);Ze.o();var df=r("ytPubsub2Pubsub2Instance")||new K;K.prototype.subscribe=K.prototype.subscribe;K.prototype.unsubscribeByKey=K.prototype.J;K.prototype.publish=K.prototype.A;K.prototype.clear=K.prototype.clear;u("ytPubsub2Pubsub2Instance",df);var ef=r("ytPubsub2Pubsub2SubscribedKeys")||{};u("ytPubsub2Pubsub2SubscribedKeys",ef);var ff=r("ytPubsub2Pubsub2TopicToKeys")||{};u("ytPubsub2Pubsub2TopicToKeys",ff);var gf=r("ytPubsub2Pubsub2IsAsync")||{};u("ytPubsub2Pubsub2IsAsync",gf);
u("ytPubsub2Pubsub2SkipSubKey",null);function S(a,b){var c=hf();c&&c.publish.call(c,a.toString(),a,b)}
function jf(a,b,c){var d=hf();if(!d)return 0;var e=d.subscribe(a.toString(),function(d,g){var f=r("ytPubsub2Pubsub2SkipSubKey");f&&f==e||(f=function(){if(ef[e])try{if(g&&a instanceof R&&a!=d)try{var f=a.b,k=g;if(!k.args||!k.version)throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");try{if(!f.D){var x=new f;f.D=x.version}var F=f.D}catch(w){}if(!F||k.version!=F)throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");try{g=Reflect.construct(f,Ja(k.args))}catch(w){throw w.message=
"yt.pubsub2.Data.deserialize(): "+w.message,w;}}catch(w){throw w.message="yt.pubsub2.pubsub2 cross-binary conversion error for "+a.toString()+": "+w.message,w;}b.call(c||window,g)}catch(w){Ke(w)}},gf[a.toString()]?r("yt.scheduler.instance")?Ye(f):M(f,0):f())});
ef[e]=!0;ff[a.toString()]||(ff[a.toString()]=[]);ff[a.toString()].push(e);return e}
function kf(a){var b=hf();b&&(la(a)&&(a=[a]),y(a,function(a){b.unsubscribeByKey(a);delete ef[a]}))}
function hf(){return r("ytPubsub2Pubsub2Instance")}
;var lf=0;function mf(a){var b=a.__yt_uid_key;b||(b=nf(),a.__yt_uid_key=b);return b}
function of(a,b){a=H(a);b=H(b);return!!ad(a,function(a){return a===b},!0,void 0)}
function pf(a,b){var c=Ec(document,a,null,b);return c.length?c[0]:null}
function qf(){var a=document,b;Fa(["fullscreenElement","webkitFullscreenElement","mozFullScreenElement","msFullscreenElement"],function(c){b=a[c];return!!b});
return b}
function rf(){E(document.body,"hide-players",!1);y(Dc("preserve-players"),function(a){D(a,"preserve-players")})}
var nf=r("ytDomDomGetNextId")||function(){return++lf};
u("ytDomDomGetNextId",nf);var sf={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,screenX:1,screenY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};
function tf(a){this.type="";this.state=this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.ctrlKey=this.altKey=!1;this.clientY=this.clientX=0;this.changedTouches=this.touches=null;if(a=a||window.event){this.event=a;for(var b in a)b in sf||(this[b]=a[b]);(b=a.target||a.srcElement)&&3==b.nodeType&&(b=b.parentNode);this.target=b;if(b=a.relatedTarget)try{b=b.nodeName?b:null}catch(c){b=null}else"mouseover"==this.type?
b=a.fromElement:"mouseout"==this.type&&(b=a.toElement);this.relatedTarget=b;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey}}
tf.prototype.preventDefault=function(){this.event&&(this.event.returnValue=!1,this.event.preventDefault&&this.event.preventDefault())};
tf.prototype.stopPropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopPropagation&&this.event.stopPropagation())};
tf.prototype.stopImmediatePropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation())};var eb=r("ytEventsEventsListeners")||{};u("ytEventsEventsListeners",eb);var uf=r("ytEventsEventsCounter")||{count:0};u("ytEventsEventsCounter",uf);
function vf(a,b,c,d){d=void 0===d?{}:d;a.addEventListener&&("mouseenter"!=b||"onmouseenter"in document?"mouseleave"!=b||"onmouseenter"in document?"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return db(function(e){var f="boolean"==typeof e[4]&&e[4]==!!d,g;if(g=ta(e[4])&&ta(d))a:{g=e[4];for(var k in g)if(!(k in d)||g[k]!==d[k]){g=!1;break a}for(k in d)if(!(k in g)){g=!1;break a}g=!0}return!!e.length&&e[0]==a&&e[1]==b&&e[2]==
c&&(f||g)})}
function T(a,b,c,d){d=void 0===d?{}:d;if(!a||!a.addEventListener&&!a.attachEvent)return"";var e=vf(a,b,c,d);if(e)return e;e=++uf.count+"";var f=!("mouseenter"!=b&&"mouseleave"!=b||!a.addEventListener||"onmouseenter"in document);var g=f?function(d){d=new tf(d);if(!ad(d.relatedTarget,function(b){return b==a},!0))return d.currentTarget=a,d.type=b,c.call(a,d)}:function(b){b=new tf(b);
b.currentTarget=a;return c.call(a,b)};
g=Je(g);a.addEventListener?("mouseenter"==b&&f?b="mouseover":"mouseleave"==b&&f?b="mouseout":"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"),wf()||"boolean"==typeof d?a.addEventListener(b,g,d):a.addEventListener(b,g,!!d.capture)):a.attachEvent("on"+b,g);eb[e]=[a,b,c,g,d];return e}
function xf(a,b,c){var d=a||document;return T(d,"click",function(a){var e=ad(a.target,function(a){return a===d||c(a)},!0);
e&&e!==d&&!e.disabled&&(a.currentTarget=e,b.call(e,a))})}
function yf(a){a=a||window.event;a=a.target||a.srcElement;3==a.nodeType&&(a=a.parentNode);return a}
var wf=function(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}(function(){var a=!1;
try{var b=Object.defineProperty({},"capture",{get:function(){a=!0}});
window.addEventListener("test",null,b)}catch(c){}return a});
function zf(a,b,c){return xf(a,b,function(a){return B(a,c)})}
function Af(a){if(document.createEvent){var b=document.createEvent("HTMLEvents");b.initEvent("click",!0,!0);a.dispatchEvent(b)}else b=document.createEventObject(),a.fireEvent("onclick",b)}
function U(a){a&&("string"==typeof a&&(a=[a]),y(a,function(a){if(a in eb){var b=eb[a],d=b[0],e=b[1],f=b[3];b=b[4];d.removeEventListener?wf()||"boolean"==typeof b?d.removeEventListener(e,f,b):d.removeEventListener(e,f,!!b.capture):d.detachEvent&&d.detachEvent("on"+e,f);delete eb[a]}}))}
;var Bf={},Cf="ontouchstart"in document;function Df(a,b,c){switch(a){case "mouseover":case "mouseout":var d=3;break;case "mouseenter":case "mouseleave":d=9}return ad(c,function(a){return B(a,b)},!0,d)}
function V(a){var b="mouseover"==a.type&&"mouseenter"in Bf||"mouseout"==a.type&&"mouseleave"in Bf,c=a.type in Bf||b;if("HTML"!=a.target.tagName&&c){if(b){b="mouseover"==a.type?"mouseenter":"mouseleave";c=Bf[b];for(var d in c.f){var e=Df(b,d,a.target);e&&!ad(a.relatedTarget,function(a){return a==e},!0)&&c.A(d,e,b,a)}}if(b=Bf[a.type])for(d in b.f)(e=Df(a.type,d,a.target))&&b.A(d,e,a.type,a)}}
T(document,"blur",V,!0);T(document,"change",V,!0);T(document,"click",V);T(document,"focus",V,!0);T(document,"mouseover",V);T(document,"mouseout",V);T(document,"mousedown",V);T(document,"keydown",V);T(document,"keyup",V);T(document,"keypress",V);T(document,"cut",V);T(document,"paste",V);Cf&&(T(document,"touchstart",V),T(document,"touchend",V),T(document,"touchcancel",V));function W(a){this.j=a;this.u={};this.C=[];this.w=[]}
h=W.prototype;h.v=function(a){return J(a,X(this))};
function X(a,b){return"yt-uix"+(a.j?"-"+a.j:"")+(b?"-"+b:"")}
h.unregister=function(){Re(this.C);this.C.length=0;kf(this.w);this.w.length=0};
h.init=ma;h.dispose=ma;function Ef(a,b,c){a.C.push(Pe(b,c,a))}
function Ff(a,b,c){a.w.push(jf(b,c,a))}
function Y(a,b,c,d){d=X(a,d);var e=t(c,a);b in Bf||(Bf[b]=new K);Bf[b].subscribe(d,e);a.u[c]=e}
function Z(a,b,c,d){if(b in Bf){var e=Bf[b];he(e,X(a,d),a.u[c]);0>=je(e)&&(e.dispose(),delete Bf[b])}delete a.u[c]}
h.I=function(a,b,c){var d=this.g(a,b);if(d&&(d=r(d))){var e=Ma(arguments,2);La(e,0,0,a);d.apply(null,e)}};
h.g=function(a,b){return Ve(a,b)};
function Gf(a,b){Te(a,"tooltip-text",b)}
;var Hf=window.yt&&window.yt.uix&&window.yt.uix.widgets_||{};u("yt.uix.widgets_",Hf);za();var If=p(XMLHttpRequest)?function(){return new XMLHttpRequest}:p(ActiveXObject)?function(){return new ActiveXObject("Microsoft.XMLHTTP")}:null;
function Jf(){if(!If)return null;var a=If();return"open"in a?a:null}
;function Kf(a){"?"==a.charAt(0)&&(a=a.substr(1));a=a.split("&");for(var b={},c=0,d=a.length;c<d;c++){var e=a[c].split("=");if(1==e.length&&e[0]||2==e.length){var f=decodeURIComponent((e[0]||"").replace(/\+/g," "));e=decodeURIComponent((e[1]||"").replace(/\+/g," "));f in b?qa(b[f])?Ka(b[f],e):b[f]=[b[f],e]:b[f]=e}}return b}
;var Lf={"X-Goog-Visitor-Id":"SANDBOXED_VISITOR_ID","X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL","X-YouTube-Page-Label":"PAGE_BUILD_LABEL","X-YouTube-Variants-Checksum":"VARIANTS_CHECKSUM"},Mf=!1;
function Nf(a,b){b=void 0===b?{}:b;if(!c)var c=window.location.href;var d=a.match(ze)[1]||null,e=Ae(a.match(ze)[3]||null);d&&e?(d=c,c=a.match(ze),d=d.match(ze),c=c[3]==d[3]&&c[1]==d[1]&&c[4]==d[4]):c=e?Ae(c.match(ze)[3]||null)==e&&(Number(c.match(ze)[4]||null)||null)==(Number(a.match(ze)[4]||null)||null):!0;for(var f in Lf){if((e=d=L(Lf[f]))&&!(e=c)){e=f;var g=L("CORS_HEADER_WHITELIST")||{},k=Ae(a.match(ze)[3]||null);e=k?(g=g[k])?Ha(g,e):!1:!0}e&&(b[f]=d)}return b}
function Of(a,b){var c=b.format||"JSON";a=Pf(a,b);var d=Qf(a,b),e=!1,f,g=Rf(a,function(a){if(!e){e=!0;f&&window.clearTimeout(f);a:switch(a&&"status"in a?a.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:var d=!0;break a;default:d=!1}var g=null;if(d||400<=a.status&&500>a.status)g=Sf(c,a,b.Gb);if(d)a:if(a&&204==a.status)d=!0;else{switch(c){case "XML":d=0==parseInt(g&&g.return_code,10);break a;case "RAW":d=!0;break a}d=!!g}g=g||{};var k=b.context||m;d?b.onSuccess&&
b.onSuccess.call(k,a,g):b.onError&&b.onError.call(k,a,g);b.V&&b.V.call(k,a,g)}},b.method,d,b.headers,b.responseType,b.withCredentials);
b.nb&&0<b.timeout&&(f=M(function(){e||(e=!0,g.abort(),window.clearTimeout(f),b.nb.call(b.context||m,g))},b.timeout))}
function Pf(a,b){b.Ib&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var c=L("XSRF_FIELD_NAME",void 0),d=b.ya;if(d){d[c]&&delete d[c];d=d||{};var e=a.split("#",2);c=e[0];e=1<e.length?"#"+e[1]:"";var f=c.split("?",2);c=f[0];f=Kf(f[1]||"");for(var g in d)f[g]=d[g];a=Ge(c,f)+e}return a}
function Qf(a,b){var c=L("XSRF_FIELD_NAME",void 0),d=L("XSRF_TOKEN",void 0),e=b.postBody||"",f=b.G,g=L("XSRF_FIELD_NAME",void 0),k;b.headers&&(k=b.headers["Content-Type"]);b.Hb||Ae(a.match(ze)[3]||null)&&!b.withCredentials&&Ae(a.match(ze)[3]||null)!=document.location.hostname||"POST"!=b.method||k&&"application/x-www-form-urlencoded"!=k||b.G&&b.G[g]||(f||(f={}),f[c]=d);f&&q(e)&&(e=Kf(e),gb(e,f),e=b.qb&&"JSON"==b.qb?JSON.stringify(e):Ee(e));if(!(c=e)&&(c=f)){a:{for(var l in f){f=!1;break a}f=!0}c=!f}!Mf&&
c&&"POST"!=b.method&&(Mf=!0,Ke(Error("AJAX request with postData should use POST")));return e}
function Sf(a,b,c){var d=null;switch(a){case "JSON":a=b.responseText;b=b.getResponseHeader("Content-Type")||"";a&&0<=b.indexOf("json")&&(d=JSON.parse(a));break;case "XML":if(b=(b=b.responseXML)?Tf(b):null)d={},y(b.getElementsByTagName("*"),function(a){d[a.tagName]=Uf(a)})}c&&Vf(d);
return d}
function Vf(a){if(ta(a))for(var b in a){var c;(c="html_content"==b)||(c=b.length-5,c=0<=c&&b.indexOf("_html",c)==c);if(c){c=b;var d=xc(a[b]);a[c]=d}else Vf(a[b])}}
function Tf(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&0<a.length?a[0]:null:null}
function Uf(a){var b="";y(a.childNodes,function(a){b+=a.nodeValue});
return b}
function Rf(a,b,c,d,e,f,g){function k(){4==(l&&"readyState"in l?l.readyState:0)&&b&&Je(b)(l)}
c=void 0===c?"GET":c;d=void 0===d?"":d;var l=Jf();if(!l)return null;"onloadend"in l?l.addEventListener("loadend",k,!1):l.onreadystatechange=k;l.open(c,a,!0);f&&(l.responseType=f);g&&(l.withCredentials=!0);c="POST"==c&&(void 0===window.FormData||!(d instanceof FormData));if(e=Nf(a,e))for(var n in e)l.setRequestHeader(n,e[n]),"content-type"==n.toLowerCase()&&(c=!1);c&&l.setRequestHeader("Content-Type","application/x-www-form-urlencoded");l.send(d);return l}
;function Wf(a){P.call(this,1,arguments);this.b=a}
v(Wf,P);function Xf(a){P.call(this,1,arguments);this.b=a}
v(Xf,P);function Yf(a,b,c){P.call(this,3,arguments);this.h=a;this.f=b;this.b=null!=c?!!c:null}
v(Yf,P);function Zf(a,b,c,d,e){P.call(this,2,arguments);this.f=a;this.b=b;this.i=c||null;this.h=d||null;this.source=e||null}
v(Zf,P);function $f(a,b,c){P.call(this,1,arguments);this.b=a;this.f=b}
v($f,P);function ag(a,b,c,d,e,f,g){P.call(this,1,arguments);this.f=a;this.j=b;this.b=c;this.l=d||null;this.i=e||null;this.h=f||null;this.source=g||null}
v(ag,P);
var bg=new R("subscription-batch-subscribe",Wf),cg=new R("subscription-batch-unsubscribe",Wf),dg=new R("subscription-subscribe",Zf),eg=new R("subscription-subscribe-loading",Xf),fg=new R("subscription-subscribe-loaded",Xf),gg=new R("subscription-subscribe-success",$f),hg=new R("subscription-subscribe-external",Zf),ig=new R("subscription-unsubscribe",ag),jg=new R("subscription-unsubscirbe-loading",Xf),kg=new R("subscription-unsubscribe-loaded",Xf),lg=new R("subscription-unsubscribe-success",Xf),mg=
new R("subscription-external-unsubscribe",ag),ng=new R("subscription-enable-ypc",Xf),og=new R("subscription-disable-ypc",Xf),pg=new R("subscription-prefs",Yf),qg=new R("subscription-prefs-success",Yf),rg=new R("subscription-prefs-failure",Yf);function sg(a){P.call(this,1,arguments)}
v(sg,P);function tg(a,b){P.call(this,2,arguments);this.f=a;this.b=b}
v(tg,P);function ug(a,b,c,d){P.call(this,1,arguments);this.b=b;this.f=c||null;this.itemId=d||null}
v(ug,P);function vg(a,b){P.call(this,1,arguments);this.f=a;this.b=b||null}
v(vg,P);function wg(a){P.call(this,1,arguments)}
v(wg,P);var xg=new R("ypc-core-load",sg),yg=new R("ypc-guide-sync-success",tg),zg=new R("ypc-purchase-success",ug),Ag=new R("ypc-subscription-cancel",wg),Bg=new R("ypc-subscription-cancel-success",vg),Cg=new R("ypc-init-subscription",wg);var Dg=!1,Eg=[];function Fg(a){a.b?Dg?S(hg,a):S(xg,new sg(function(){S(Cg,new wg(a.b))})):Gg(a.f,a.i,a.h,a.source)}
function Hg(a){a.b?Dg?S(mg,a):S(xg,new sg(function(){S(Ag,new wg(a.b))})):Ig(a.f,a.j,a.i,a.h,a.source)}
function Jg(a){Kg(Ja(a.b))}
function Lg(a){Mg(Ja(a.b))}
function Ng(a){Og(a.h,a.f,a.b)}
function Pg(a){var b=a.itemId,c=a.b.subscriptionId;b&&c&&S(gg,new $f(b,c,a.b.channelInfo))}
function Qg(a){var b=a.b;bb(a.f,function(a,d){S(gg,new $f(d,a,b[d]))})}
function Rg(a){S(lg,new Xf(a.f.itemId));a.b&&a.b.length&&(Sg(a.b,lg),Sg(a.b,ng))}
function Gg(a,b,c,d){var e=new Xf(a);S(eg,e);var f={};f.c=a;c&&(f.eurl=c);d&&(f.source=d);c={};(d=L("PLAYBACK_ID"))&&(c.plid=d);(d=L("EVENT_ID"))&&(c.ei=d);b&&Tg(b,c);Of("/subscription_ajax?action_create_subscription_to_channel=1",{method:"POST",ya:f,G:c,onSuccess:function(b,c){var d=c.response;S(gg,new $f(a,d.id,d.channel_info));d.show_feed_privacy_dialog&&O("SHOW-FEED-PRIVACY-SUBSCRIBE-DIALOG",a)},
V:function(){S(fg,e)}})}
function Ig(a,b,c,d,e){var f=new Xf(a);S(jg,f);var g={};g.c=a;d&&(g.eurl=d);e&&(g.source=e);d={};d.c=a;d.s=b;(a=L("PLAYBACK_ID"))&&(d.plid=a);(a=L("EVENT_ID"))&&(d.ei=a);c&&Tg(c,d);Of("/subscription_ajax?action_remove_subscriptions=1",{method:"POST",ya:g,G:d,onSuccess:function(){S(lg,f)},
V:function(){S(kg,f)}})}
function Og(a,b,c){if(a){var d={};d.channel_id=a;switch(b){case "receive-all-updates":d.receive_all_updates=!0;break;case "receive-no-updates":d.receive_no_updates=!0;d.receive_post_updates=!1;break;case "receive-highlight-updates":d.receive_all_updates=!1;d.receive_no_updates=!1;break;default:return}null===c||d.receive_no_updates||(d.receive_post_updates=c);var e=new Yf(a,b,c);Of("/subscription_ajax?action_update_subscription_preferences=1",{method:"POST",G:d,onError:function(){S(rg,e)},
onSuccess:function(){S(qg,e)}})}}
function Kg(a){if(a.length){var b=La(a,0,40);S("subscription-batch-subscribe-loading");Sg(b,eg);var c={};c.a=b.join(",");var d=function(){S("subscription-batch-subscribe-loaded");Sg(b,fg)};
Of("/subscription_ajax?action_create_subscription_to_all=1",{method:"POST",G:c,onSuccess:function(c,f){d();var e=f.response,k=e.id;if(qa(k)&&k.length==b.length){var l=e.channel_info_map;y(k,function(a,c){var d=b[c];S(gg,new $f(d,a,l[d]))});
a.length?Kg(a):S("subscription-batch-subscribe-finished")}},
onError:function(){d();S("subscription-batch-subscribe-failure")}})}}
function Mg(a){if(a.length){var b=La(a,0,40);S("subscription-batch-unsubscribe-loading");Sg(b,jg);var c={};c.c=b.join(",");var d=function(){S("subscription-batch-unsubscribe-loaded");Sg(b,kg)};
Of("/subscription_ajax?action_remove_subscriptions=1",{method:"POST",G:c,onSuccess:function(){d();Sg(b,lg);a.length&&Mg(a)},
onError:function(){d()}})}}
function Sg(a,b){y(a,function(a){S(b,new Xf(a))})}
function Tg(a,b){var c=Kf(a),d;for(d in c)b[d]=c[d]}
;function Ug(){var a=qf();return a?a:null}
;function Vg(a,b){(a=H(a))&&a.style&&(a.style.display=b?"":"none",E(a,"hid",!b))}
function Wg(a){return(a=H(a))?"none"!=a.style.display&&!B(a,"hid"):!1}
function Xg(a){y(arguments,function(a){!ra(a)||a instanceof Element?Vg(a,!0):y(a,function(a){Xg(a)})})}
function Yg(a){y(arguments,function(a){!ra(a)||a instanceof Element?Vg(a,!1):y(a,function(a){Yg(a)})})}
;function Zg(){W.call(this,"tooltip");this.b=0;this.f={}}
v(Zg,W);na(Zg);h=Zg.prototype;h.register=function(){Y(this,"mouseover",this.M);Y(this,"mouseout",this.F);Y(this,"focus",this.ha);Y(this,"blur",this.ca);Y(this,"click",this.F);Y(this,"touchstart",this.xa);Y(this,"touchend",this.O);Y(this,"touchcancel",this.O)};
h.unregister=function(){Z(this,"mouseover",this.M);Z(this,"mouseout",this.F);Z(this,"focus",this.ha);Z(this,"blur",this.ca);Z(this,"click",this.F);Z(this,"touchstart",this.xa);Z(this,"touchend",this.O);Z(this,"touchcancel",this.O);this.dispose();Zg.m.unregister.call(this)};
h.dispose=function(){for(var a in this.f)this.F(this.f[a]);this.f={}};
h.M=function(a){if(!(this.b&&1E3>za()-this.b)){var b=parseInt(this.g(a,"tooltip-hide-timer"),10);b&&(We(a,"tooltip-hide-timer"),window.clearTimeout(b));b=t(function(){$g(this,a);We(a,"tooltip-show-timer")},this);
var c=parseInt(this.g(a,"tooltip-show-delay"),10)||0;b=M(b,c);Te(a,"tooltip-show-timer",b.toString());a.title&&(Gf(a,ah(this,a)),a.title="");b=ua(a).toString();this.f[b]=a}};
h.F=function(a){var b=parseInt(this.g(a,"tooltip-show-timer"),10);b&&(window.clearTimeout(b),We(a,"tooltip-show-timer"));b=t(function(){if(a){var b=H(bh(this,a));b&&(ch(b),Mc(b),We(a,"content-id"));b=H(bh(this,a,"arialabel"));Mc(b)}We(a,"tooltip-hide-timer")},this);
b=M(b,50);Te(a,"tooltip-hide-timer",b.toString());if(b=this.g(a,"tooltip-text"))a.title=b;b=ua(a).toString();delete this.f[b]};
h.ha=function(a,b){this.b=0;this.M(a,b)};
h.ca=function(a){this.b=0;this.F(a)};
h.xa=function(a,b,c){c.changedTouches&&(this.b=0,(a=Df(b,X(this),c.changedTouches[0].target))&&this.M(a,b))};
h.O=function(a,b,c){c.changedTouches&&(this.b=za(),(a=Df(b,X(this),c.changedTouches[0].target))&&this.F(a))};
function dh(a,b,c){Gf(b,c);a=a.g(b,"content-id");(a=H(a))&&Qc(a,c)}
function ah(a,b){return a.g(b,"tooltip-text")||b.title}
function $g(a,b){if(b){var c=ah(a,b);if(c){var d=H(bh(a,b));if(!d){d=document.createElement("div");d.id=bh(a,b);d.className=X(a,"tip");var e=document.createElement("div");e.className=X(a,"tip-body");var f=document.createElement("div");f.className=X(a,"tip-arrow");var g=document.createElement("div");g.setAttribute("aria-hidden","true");g.className=X(a,"tip-content");var k=eh(a,b),l=bh(a,b,"content");g.id=l;Te(b,"content-id",l);e.appendChild(g);k&&d.appendChild(k);d.appendChild(e);d.appendChild(f);
var n=Yc(b);l=bh(a,b,"arialabel");f=document.createElement("div");C(f,X(a,"arialabel"));f.id=l;n=b.hasAttribute("aria-label")?b.getAttribute("aria-label"):"rtl"==document.body.getAttribute("dir")?c+" "+n:n+" "+c;Qc(f,n);b.setAttribute("aria-labelledby",l);l=Ug()||document.body;l.appendChild(f);l.appendChild(d);dh(a,b,c);(c=parseInt(a.g(b,"tooltip-max-width"),10))&&e.offsetWidth>c&&(e.style.width=c+"px",C(g,X(a,"normal-wrap")));g=B(b,X(a,"reverse"));fh(a,b,d,e,k,g)||fh(a,b,d,e,k,!g);var x=X(a,"tip-visible");
M(function(){C(d,x)},0)}}}}
function fh(a,b,c,d,e,f){E(c,X(a,"tip-reverse"),f);var g=0;f&&(g=1);var k=Dd(b);f=new G((k.width-10)/2,f?k.height:0);var l=Ad(b);Qd(new G(l.x+f.x,l.y+f.y),c,g);f=Hc(window);if(1==c.nodeType)var n=Bd(c);else c=c.changedTouches?c.changedTouches[0]:c,n=new G(c.clientX,c.clientY);c=Dd(d);var x=Math.floor(c.width/2);g=!!(f.height<n.y+k.height);k=!!(n.y<k.height);l=!!(n.x<x);f=!!(f.width<n.x+x);n=(c.width+3)/-2- -5;a=a.g(b,"force-tooltip-direction");if("left"==a||l)n=-5;else if("right"==a||f)n=20-c.width-
3;a=Math.floor(n)+"px";d.style.left=a;e&&(e.style.left=a,e.style.height=c.height+"px",e.style.width=c.width+"px");return!(g||k)}
function bh(a,b,c){a=X(a)+mf(b);c&&(a+="-"+c);return a}
function eh(a,b){var c=null;Hb&&B(b,X(a,"masked"))&&((c=H("yt-uix-tooltip-shared-mask"))?(c.parentNode.removeChild(c),Xg(c)):(c=document.createElement("IFRAME"),c.src='javascript:""',c.id="yt-uix-tooltip-shared-mask",c.className=X(a,"tip-mask")));return c}
function ch(a){var b=H("yt-uix-tooltip-shared-mask"),c=b&&ad(b,function(b){return b==a},!1,2);
b&&c&&(b.parentNode.removeChild(b),Yg(b),document.body.appendChild(b))}
;function gh(a){var b=hh();if(b=window.open(b,"loginPopup","width=375,height=440,resizable=yes,scrollbars=yes",!0)){var c=Pe("LOGGED_IN",function(b){Re(L("LOGGED_IN_PUBSUB_KEY",void 0));Ie("LOGGED_IN",!0);a(b)});
Ie("LOGGED_IN_PUBSUB_KEY",c);b.moveTo((screen.width-375)/2,(screen.height-440)/2)}}
function hh(){var a=document.location.protocol+"//"+document.domain+"/post_login";a=Fe(a,"mode","subscribe");a=Fe("/signin?context=popup","next",a);return a=Fe(a,"feature","sub_button")}
u("yt.pubsub.publish",O);var ih=Object.create(null);ih.log_event="GENERIC_EVENT_LOGGING";ih.log_interaction="INTERACTION_LOGGING";u("ytLoggingTransportLogPayloadsQueue_",r("ytLoggingTransportLogPayloadsQueue_")||{});u("ytLoggingTransportTokensToCttTargetIds_",r("ytLoggingTransportTokensToCttTargetIds_")||{});u("ytLoggingTransportDispatchedStats_",r("ytLoggingTransportDispatchedStats_")||{});u("ytytLoggingTransportCapturedTime_",r("ytLoggingTransportCapturedTime_")||{});function jh(){var a=new se;(a=a.isAvailable()?new ye(a,"yt.innertube"):null)||(a=new te("yt.innertube"),a=a.isAvailable()?a:null);this.b=a?new oe(a):null;this.f=document.domain||window.location.hostname}
jh.prototype.set=function(a,b,c,d){c=c||31104E3;this.remove(a);if(this.b)try{this.b.set(a,b,za()+1E3*c);return}catch(f){}var e="";if(d)try{e=escape(kd(b))}catch(f){return}else e=escape(b);b=this.f;Wa.set(""+a,e,c,"/",void 0===b?"youtube.com":b,!1)};
jh.prototype.get=function(a,b){var c=void 0,d=!this.b;if(!d)try{c=this.b.get(a)}catch(e){d=!0}if(d&&(c=Wa.get(""+a,void 0))&&(c=unescape(c),b))try{c=JSON.parse(c)}catch(e){this.remove(a),c=void 0}return c};
jh.prototype.remove=function(a){this.b&&this.b.remove(a);var b=this.f;Wa.remove(""+a,"/",void 0===b?"youtube.com":b)};new jh;var kh=za().toString();var lh;a:{if(window.crypto&&window.crypto.getRandomValues)try{var mh=Array(16),nh=new Uint8Array(16);window.crypto.getRandomValues(nh);for(var oh=0;oh<mh.length;oh++)mh[oh]=nh[oh];lh=mh;break a}catch(a){}for(var ph=Array(16),qh=0;16>qh;qh++){for(var rh=za(),sh=0;sh<rh%23;sh++)ph[qh]=Math.random();ph[qh]=Math.floor(256*Math.random())}if(kh)for(var th=1,uh=0;uh<kh.length;uh++)ph[th%16]=ph[th%16]^ph[(th-1)%16]/4^kh.charCodeAt(uh),th++;lh=ph}
for(var vh=lh,wh=[],xh=0;xh<vh.length;xh++)wh.push("ABCDEFGHIJLKMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(vh[xh]&63));function yh(){W.call(this,"button");this.b=null;this.h=[];this.f={}}
v(yh,W);na(yh);h=yh.prototype;h.register=function(){Y(this,"click",this.Aa);Y(this,"keydown",this.la);Y(this,"keypress",this.ma);Ef(this,"page-scroll",this.Za)};
h.unregister=function(){Z(this,"click",this.Aa);Z(this,"keydown",this.la);Z(this,"keypress",this.ma);zh(this);this.f={};yh.m.unregister.call(this)};
h.Aa=function(a){a&&!a.disabled&&(this.toggle(a),this.click(a))};
h.la=function(a,b,c){if(!(c.altKey||c.ctrlKey||c.shiftKey||c.metaKey)&&(b=Ah(this,a))){var d=function(a){var b="";a.tagName&&(b=a.tagName.toLowerCase());return"ul"==b||"table"==b},e;
d(b)?e=b:e=Rc(b,d);if(e){e=e.tagName.toLowerCase();if("ul"==e)var f=this.hb;else"table"==e&&(f=this.gb);f&&Bh(this,a,b,c,t(f,this))}}};
h.Za=function(){var a=this.f,b=0;for(d in a)b++;if(0!=b)for(var c in a){b=a[c];var d=J(b.activeButtonNode||b.parentNode,X(this));if(void 0==d||void 0==b)break;Ch(this,d,b,!0)}};
function Bh(a,b,c,d,e){var f=Wg(c),g=9==d.keyCode;if(g||32==d.keyCode||13==d.keyCode)if(d=Dh(a,c)){if(p(d.firstElementChild))b=d.firstElementChild;else for(b=d.firstChild;b&&1!=b.nodeType;)b=b.nextSibling;if("a"==b.tagName.toLowerCase()){var k=void 0===k?{}:k;var l=void 0===l?"":l;var n=void 0===n?window:n;n=n.location;k=Ge(b.href,k)+l;k instanceof qc||k instanceof qc||(k=k.T?k.S():String(k),sc.test(k)||(k="about:invalid#zClosurez"),k=tc(k));k instanceof qc&&k.constructor===qc&&k.f===rc?k=k.b:(pa(k),
k="type_error:SafeUrl");n.href=k}else Af(b)}else g&&Eh(a,b);else f?27==d.keyCode?(Dh(a,c),Eh(a,b)):e(b,c,d):(k=B(b,X(a,"reverse"))?38:40,d.keyCode==k&&(Af(b),d.preventDefault()))}
h.ma=function(a,b,c){c.altKey||c.ctrlKey||c.shiftKey||c.metaKey||(a=Ah(this,a),Wg(a)&&c.preventDefault())};
function Dh(a,b){var c=X(a,"menu-item-highlight"),d=I(c,b);d&&D(d,c);return d}
function Fh(a,b,c){C(c,X(a,"menu-item-highlight"));var d=c.getAttribute("id");d||(d=X(a,"item-id-"+ua(c)),c.setAttribute("id",d));b.setAttribute("aria-activedescendant",d)}
h.gb=function(a,b,c){var d=Dh(this,b);if(d){var e=pf("table",b);b=Ec(document,"td",null,e);d=Gh(d,b,Ec(document,"td",null,pf("tr",e)).length,c);-1!=d&&(Fh(this,a,b[d]),c.preventDefault())}};
h.hb=function(a,b,c){if(40==c.keyCode||38==c.keyCode){var d=Dh(this,b);d&&(b=Da(Ec(document,"li",null,b),Wg),Fh(this,a,b[Gh(d,b,1,c)]),c.preventDefault())}};
function Gh(a,b,c,d){var e=b.length;a=Ca(b,a);if(-1==a)if(38==d.keyCode)a=e-c;else{if(37==d.keyCode||38==d.keyCode||40==d.keyCode)a=0}else 39==d.keyCode?(a%c==c-1&&(a-=c),a+=1):37==d.keyCode?(0==a%c&&(a+=c),--a):38==d.keyCode?(a<c&&(a+=e),a-=c):40==d.keyCode&&(a>=e-c&&(a-=e),a+=c);return a}
function Hh(a,b){var c=b.iframeMask;c||(c=document.createElement("IFRAME"),c.src='javascript:""',c.className=X(a,"menu-mask"),Yg(c),b.iframeMask=c);return c}
function Ch(a,b,c,d){var e=J(b,X(a,"group")),f=!!a.g(b,"button-menu-ignore-group");e=e&&!f?e:b;f=9;var g=8,k=Fd(b);if(B(b,X(a,"reverse"))){f=8;g=9;k=k.top+"px";try{c.style.maxHeight=k}catch(x){}}B(b,"flip")&&(B(b,X(a,"reverse"))?(f=12,g=13):(f=13,g=12));var l;a.g(b,"button-has-sibling-menu")?l=yd(e):a.g(b,"button-menu-root-container")&&(l=Ih(a,b));A&&!Tb("8")&&(l=null);if(l){var n=Fd(l);n=new qd(-n.top,n.left,n.top,-n.left)}l=new G(0,1);B(b,X(a,"center-menu"))&&(l.x-=Math.round((Dd(c).width-Dd(b).width)/
2));d&&(l.y+=Jc(document).y);if(a=Hh(a,b))b=Dd(c),a.style.width=b.width+"px",a.style.height=b.height+"px",Od(e,f,a,g,l,n,197),d&&sd(a,"position","fixed");Od(e,f,c,g,l,n,197)}
function Ih(a,b){if(a.g(b,"button-menu-root-container")){var c=a.g(b,"button-menu-root-container");return J(b,c)}return document.body}
h.Ca=function(a){if(a){var b=Ah(this,a);if(b){a.setAttribute("aria-pressed","true");a.setAttribute("aria-expanded","true");b.originalParentNode=b.parentNode;b.activeButtonNode=a;b.parentNode.removeChild(b);var c;this.g(a,"button-has-sibling-menu")?c=a.parentNode:c=Ih(this,a);c.appendChild(b);b.style.minWidth=a.offsetWidth-2+"px";var d=Hh(this,a);d&&c.appendChild(d);(c=!!this.g(a,"button-menu-fixed"))&&(this.f[mf(a).toString()]=b);Ch(this,a,b,c);Se("yt-uix-button-menu-before-show",a,b);Xg(b);d&&Xg(d);
this.I(a,"button-menu-action",!0);C(a,X(this,"active"));b=t(this.Ba,this,a,!1);d=t(this.Ba,this,a,!0);c=t(this.sb,this,a,void 0);this.b&&Ah(this,this.b)==Ah(this,a)||zh(this);O("yt-uix-button-menu-show",a);U(this.h);this.h=[T(document,"click",d),T(document,"contextmenu",b),T(window,"resize",c)];this.b=a}}};
function Eh(a,b){if(b){var c=Ah(a,b);if(c){a.b=null;b.setAttribute("aria-pressed","false");b.setAttribute("aria-expanded","false");b.removeAttribute("aria-activedescendant");Yg(c);a.I(b,"button-menu-action",!1);var d=Hh(a,b),e=mf(c).toString();delete a.f[e];M(function(){d&&d.parentNode&&(Yg(d),d.parentNode.removeChild(d));c.originalParentNode&&(c.parentNode.removeChild(c),c.originalParentNode.appendChild(c),c.originalParentNode=null,c.activeButtonNode=null)},1)}e=J(b,X(a,"group"));
var f=[X(a,"active")];e&&f.push(X(a,"group-active"));lc(b,f);O("yt-uix-button-menu-hide",b);U(a.h);a.h.length=0}}
h.sb=function(a,b){var c=Ah(this,a);if(c){b&&(b instanceof uc?c.innerHTML=wc(b):Qc(c,b));var d=!!this.g(a,"button-menu-fixed");Ch(this,a,c,d)}};
h.Ba=function(a,b,c){c=yf(c);var d=J(c,X(this));if(d){d=Ah(this,d);var e=Ah(this,a);if(d==e)return}d=J(c,X(this,"menu"));e=d==Ah(this,a);var f=B(c,X(this,"menu-item")),g=B(c,X(this,"menu-close"));if(!d||e&&(f||g))Eh(this,a),d&&b&&this.g(a,"button-menu-indicate-selected")&&((a=I(X(this,"content"),a))&&Qc(a,Yc(c)),Jh(this,d,c))};
function Jh(a,b,c){var d=X(a,"menu-item-selected");y(Dc(d,b),function(a){D(a,d)});
C(c.parentNode,d)}
function Ah(a,b){if(!b.widgetMenu){var c=a.g(b,"button-menu-id");c=c&&H(c);var d=X(a,"menu");c?kc(c,[d,X(a,"menu-external")]):c=I(d,b);b.widgetMenu=c}return b.widgetMenu}
h.isToggled=function(a){return B(a,X(this,"toggled"))};
h.toggle=function(a){if(this.g(a,"button-toggle")){var b=J(a,X(this,"group")),c=X(this,"toggled"),d=B(a,c);if(b&&this.g(b,"button-toggle-group")){var e=this.g(b,"button-toggle-group");y(Dc(X(this),b),function(b){b!=a||"optional"==e&&d?(D(b,c),b.removeAttribute("aria-pressed")):(C(a,c),b.setAttribute("aria-pressed","true"))})}else d?a.removeAttribute("aria-pressed"):a.setAttribute("aria-pressed","true"),nc(a,c)}};
h.click=function(a){if(Ah(this,a)){var b=Ah(this,a);if(b){var c=J(b.activeButtonNode||b.parentNode,X(this));c&&c!=a?(Eh(this,c),M(t(this.Ca,this,a),1)):Wg(b)?Eh(this,a):this.Ca(a)}a.focus()}this.I(a,"button-action")};
function zh(a){a.b&&Eh(a,a.b)}
;function Kh(a){W.call(this,a);this.h=null}
v(Kh,W);h=Kh.prototype;h.v=function(a){var b=W.prototype.v.call(this,a);return b?b:a};
h.register=function(){Ef(this,"yt-uix-kbd-nav-move-out-done",this.hide)};
h.dispose=function(){Lh(this);Kh.m.dispose.call(this)};
h.g=function(a,b){var c=Kh.m.g.call(this,a,b);return c?c:(c=Kh.m.g.call(this,a,"card-config"))&&(c=r(c))&&c[b]?c[b]:null};
h.show=function(a){var b=this.v(a);if(b){C(b,X(this,"active"));var c=Mh(this,a,b);if(c){c.cardTargetNode=a;c.cardRootNode=b;Nh(this,a,c);var d=X(this,"card-visible"),e=this.g(a,"card-delegate-show")&&this.g(b,"card-action");this.I(b,"card-action",a);this.h=a;Yg(c);M(t(function(){e||(Xg(c),O("yt-uix-card-show",b,a,c));Oh(c);C(c,d);O("yt-uix-kbd-nav-move-in-to",c)},this),10)}}};
function Mh(a,b,c){var d=c||b,e=X(a,"card");c=Ph(a,d);var f=H(X(a,"card")+mf(d));if(f)return a=I(X(a,"card-body"),f),Pc(a,c)||(Mc(c),a.appendChild(c)),f;f=document.createElement("div");f.id=X(a,"card")+mf(d);f.className=e;(d=a.g(d,"card-class"))&&kc(f,d.split(/\s+/));d=document.createElement("div");d.className=X(a,"card-border");b=a.g(b,"orientation")||"horizontal";e=document.createElement("div");e.className="yt-uix-card-border-arrow yt-uix-card-border-arrow-"+b;var g=document.createElement("div");
g.className=X(a,"card-body");a=document.createElement("div");a.className="yt-uix-card-body-arrow yt-uix-card-body-arrow-"+b;Mc(c);g.appendChild(c);d.appendChild(a);d.appendChild(g);f.appendChild(e);f.appendChild(d);document.body.appendChild(f);return f}
function Nh(a,b,c){var d=a.g(b,"orientation")||"horizontal",e=I(X(a,"anchor"),b)||b,f=a.g(b,"position"),g=!!a.g(b,"force-position"),k=a.g(b,"position-fixed");d="horizontal"==d;var l="bottomright"==f||"bottomleft"==f,n="topright"==f||"bottomright"==f;if(n&&l){var x=13;var F=8}else n&&!l?(x=12,F=9):!n&&l?(x=9,F=12):(x=8,F=13);var w=Gd(document.body);f=Gd(b);w!=f&&(x^=4);if(d){f=b.offsetHeight/2-12;var Q=new G(-12,b.offsetHeight+6)}else f=b.offsetWidth/2-6,Q=new G(b.offsetWidth+6,-12);var N=Dd(c);f=
Math.min(f,(d?N.height:N.width)-24-6);6>f&&(f=6,d?Q.y+=12-b.offsetHeight/2:Q.x+=12-b.offsetWidth/2);N=null;g||(N=10);b=X(a,"card-flip");a=X(a,"card-reverse");E(c,b,n);E(c,a,l);N=Od(e,x,c,F,Q,null,N);!g&&N&&(N&48&&(n=!n,x^=4,F^=4),N&192&&(l=!l,x^=1,F^=1),E(c,b,n),E(c,a,l),Od(e,x,c,F,Q));k&&(e=parseInt(c.style.top,10),g=Jc(document).y,sd(c,"position","fixed"),sd(c,"top",e-g+"px"));w&&(c.style.right="",e=Fd(c),e.left=e.left||parseInt(c.style.left,10),g=Hc(window),c.style.left="",c.style.right=g.width-
e.left-e.width+"px");e=I("yt-uix-card-body-arrow",c);g=I("yt-uix-card-border-arrow",c);d=d?l?"top":"bottom":!w&&n||w&&!n?"left":"right";e.setAttribute("style","");g.setAttribute("style","");e.style[d]=f+"px";g.style[d]=f+"px";l=I("yt-uix-card-arrow",c);n=I("yt-uix-card-arrow-background",c);l&&n&&(c="right"==d?Dd(c).width-f-13:f+11,f=c/Math.sqrt(2),l.style.left=c+"px",l.style.marginLeft="1px",n.style.marginLeft=-f+"px",n.style.marginTop=f+"px")}
h.hide=function(a){if(a=this.v(a)){var b=H(X(this,"card")+mf(a));b&&(D(a,X(this,"active")),D(b,X(this,"card-visible")),Yg(b),this.h=null,b.cardTargetNode=null,b.cardRootNode=null,b.cardMask&&(Mc(b.cardMask),b.cardMask=null))}};
function Lh(a){a.h&&a.hide(a.h)}
h.rb=function(a,b){var c=this.v(a);if(c){if(b){var d=Ph(this,c);if(!d)return;b instanceof uc?d.innerHTML=wc(b):Qc(d,b)}B(c,X(this,"active"))&&(c=Mh(this,a,c),Nh(this,a,c),Xg(c),Oh(c))}};
h.isActive=function(a){return(a=this.v(a))?B(a,X(this,"active")):!1};
function Ph(a,b){var c=b.cardContentNode;if(!c){var d=X(a,"content"),e=X(a,"card-content");(c=(c=a.g(b,"card-id"))?H(c):I(d,b))||(c=document.createElement("div"));var f=c;D(f,d);C(f,e);b.cardContentNode=c}return c}
function Oh(a){var b=a.cardMask;b||(b=document.createElement("IFRAME"),b.src='javascript:""',kc(b,["yt-uix-card-iframe-mask"]),a.cardMask=b);b.style.position=a.style.position;b.style.top=a.style.top;b.style.left=a.offsetLeft+"px";b.style.height=a.clientHeight+"px";b.style.width=a.clientWidth+"px";document.body.appendChild(b)}
;function Qh(){W.call(this,"kbd-nav")}
var Rh;v(Qh,W);na(Qh);h=Qh.prototype;h.register=function(){Y(this,"keydown",this.ja);Ef(this,"yt-uix-kbd-nav-move-in",this.ra);Ef(this,"yt-uix-kbd-nav-move-in-to",this.ib);Ef(this,"yt-uix-kbd-move-next",this.sa);Ef(this,"yt-uix-kbd-nav-move-to",this.K)};
h.unregister=function(){Z(this,"keydown",this.ja);U(Rh)};
h.ja=function(a,b,c){var d=c.keyCode;if(a=J(a,X(this)))switch(d){case 13:case 32:this.ra(a);break;case 27:c.preventDefault();c.stopImmediatePropagation();a:{for(c=pc(a,"kbdNavMoveOut");!c;){c=J(a.parentElement,X(this));if(!c)break a;c=pc(c,"kbdNavMoveOut")}c=H(c);this.K(c);O("yt-uix-kbd-nav-move-out-done",c)}break;case 40:case 38:if((b=c.target)&&B(a,X(this,"list")))switch(d){case 40:this.sa(b,a);break;case 38:d=document.activeElement==a,a=Sh(a),b=a.indexOf(b),0>b&&!d||(b=d?a.length-1:(a.length+b-
1)%a.length,a[b].focus(),Th(this,a[b]))}c.preventDefault()}};
h.ra=function(a){var b=pc(a,"kbdNavMoveIn");b=H(b);Uh(this,a,b);this.K(b)};
h.ib=function(a){var b=document;try{var c=b&&b.activeElement;var d=c&&c.nodeName?c:null}catch(e){d=null}Uh(this,d,a);this.K(a)};
h.K=function(a){if(a)if(Vc(a))a.focus();else{var b=Rc(a,function(a){return Oc(a)?Vc(a):!1});
b?b.focus():(a.setAttribute("tabindex","-1"),a.focus())}};
function Uh(a,b,c){if(b&&c)if(C(c,X(a)),a=b.id,a||(a="kbd-nav-"+Math.floor(1E6*Math.random()+1),b.id=a),b=a,oc&&c.dataset)c.dataset.kbdNavMoveOut=b;else{if(/-[a-z]/.test("kbdNavMoveOut"))throw Error("");c.setAttribute("data-"+"kbdNavMoveOut".replace(/([A-Z])/g,"-$1").toLowerCase(),b)}}
h.sa=function(a,b){var c=document.activeElement==b,d=Sh(b),e=d.indexOf(a);0>e&&!c||(c=c?0:(e+1)%d.length,d[c].focus(),Th(this,d[c]))};
function Th(a,b){if(b){var c=$c(b,"LI");c&&(C(c,X(a,"highlight")),Rh=T(b,"blur",t(function(a){D(a,X(this,"highlight"));U(Rh)},a,c)))}}
function Sh(a){if("UL"!=a.tagName.toUpperCase())return[];a=Da(Nc(a),function(a){return"LI"==a.tagName.toUpperCase()});
return Da(Ea(a,function(a){return Wg(a)?Rc(a,function(a){return Oc(a)?Vc(a):!1}):!1}),function(a){return!!a})}
;function Vh(){W.call(this,"menu");this.f=this.b=null;this.h={};this.l={};this.i=null}
v(Vh,W);na(Vh);function Wh(a){var b=Vh.o();if(B(a,X(b)))return a;var c=b.v(a);return c?c:J(a,X(b,"content"))==b.b?b.f:null}
h=Vh.prototype;h.register=function(){Y(this,"click",this.ia);Y(this,"mouseenter",this.Xa);Ef(this,"page-scroll",this.ab);Ef(this,"yt-uix-kbd-nav-move-out-done",function(a){a=this.v(a);Xh(this,a)});
this.i=new K};
h.unregister=function(){Z(this,"click",this.ia);this.f=this.b=null;U(Na(cb(this.h)));this.h={};bb(this.l,function(a){Mc(a)},this);
this.l={};gc(this.i);this.i=null;Vh.m.unregister.call(this)};
h.ia=function(a,b,c){a&&(b=Yh(this,a),!b.disabled&&of(c.target,b)&&Zh(this,a))};
h.Xa=function(a,b,c){a&&B(a,X(this,"hover"))&&of(c.target,Yh(this,a))&&Zh(this,a,!0)};
h.ab=function(){this.b&&this.f&&$h(this,this.f,this.b)};
function $h(a,b,c){var d=ai(a,b);if(d){var e=Dd(c);if(e instanceof zc){var f=e.height;e=e.width}else throw Error("missing height argument");d.style.width=Cd(e,!0);d.style.height=Cd(f,!0)}c==a.b&&(e=9,f=8,B(b,X(a,"reversed"))&&(e^=1,f^=1),B(b,X(a,"flipped"))&&(e^=4,f^=4),a=new G(0,1),d&&Od(b,e,d,f,a,null,197),Od(b,e,c,f,a,null,197))}
function Zh(a,b,c){bi(a,b)&&!c?Xh(a,b):(ci(a,b),!a.b||of(b,a.b)?a.Da(b):ge(a.i,t(a.Da,a,b)))}
h.Da=function(a){if(a){var b=di(this,a);if(b){Se("yt-uix-menu-before-show",a,b);this.b?of(a,this.b)||Xh(this,this.f):(this.f=a,this.b=b,B(a,X(this,"sibling-content"))||(Mc(b),document.body.appendChild(b)),b.style.minWidth=Yh(this,a).offsetWidth-2+"px");var c=ai(this,a);c&&b.parentNode&&b.parentNode.insertBefore(c,b.nextSibling);D(b,X(this,"content-hidden"));$h(this,a,b);kc(Yh(this,a),[X(this,"trigger-selected"),"yt-uix-button-toggled"]);O("yt-uix-menu-show",a);ei(b);fi(this,a);O("yt-uix-kbd-nav-move-in-to",
b);var d=t(this.ub,this,a),e=t(this.eb,this,a);c=ua(a).toString();this.h[c]=[T(b,"click",e),T(document,"click",d)];B(a,X(this,"indicate-selected"))&&(d=t(this.fb,this,a),this.h[c].push(T(b,"click",d)));B(a,X(this,"hover"))&&(a=t(this.Ya,this,a),this.h[c].push(T(document,"mousemove",a)))}}};
h.Ya=function(a,b){var c=yf(b);c&&(of(c,Yh(this,a))||gi(this,c)||hi(this,a))};
h.ub=function(a,b){var c=yf(b);if(c){if(gi(this,c)){var d=J(c,X(this,"content")),e=$c(c,"LI");e&&d&&Pc(d,e)&&Se("yt-uix-menu-item-clicked",c);c=J(c,X(this,"close-on-select"));if(!c)return;d=Wh(c)}Xh(this,d||a)}};
function ci(a,b){if(b){var c=J(b,X(a,"content"));c&&y(Dc(X(a),c),function(a){!of(a,b)&&bi(this,a)&&hi(this,a)},a)}}
function Xh(a,b){if(b){var c=[];c.push(b);var d=di(a,b);d&&(d=Dc(X(a),d),d=Ja(d),c=c.concat(d),y(c,function(a){bi(this,a)&&hi(this,a)},a))}}
function hi(a,b){if(b){var c=di(a,b);lc(Yh(a,b),[X(a,"trigger-selected"),"yt-uix-button-toggled"]);C(c,X(a,"content-hidden"));var d=di(a,b);d&&Fc(d,{"aria-expanded":"false"});(d=ai(a,b))&&d.parentNode&&Mc(d);c&&c==a.b&&(a.f.appendChild(c),a.b=null,a.f=null,a.i&&a.i.A("ROOT_MENU_REMOVED"));O("yt-uix-menu-hide",b);c=ua(b).toString();U(a.h[c]);delete a.h[c]}}
h.eb=function(a,b){var c=yf(b);c&&ii(this,a,c)};
h.fb=function(a,b){var c=yf(b);if(c){var d=Yh(this,a);if(d&&(c=$c(c,"LI")))if(c=Yc(c).trim(),d.hasChildNodes()){var e=yh.o();(d=I(X(e,"content"),d))&&Qc(d,c)}else Qc(d,c)}};
function fi(a,b){var c=di(a,b);if(c){y(c.children,function(a){"LI"==a.tagName&&Fc(a,{role:"menuitem"})});
Fc(c,{"aria-expanded":"true"});var d=c.id;d||(d="aria-menu-id-"+ua(c),c.id=d);(c=Yh(a,b))&&Fc(c,{"aria-controls":d})}}
function ii(a,b,c){var d=di(a,b);d&&B(b,X(a,"checked"))&&(a=$c(c,"LI"))&&(a=I("yt-ui-menu-item-checked-hid",a))&&(y(Dc("yt-ui-menu-item-checked",d),function(a){mc(a,"yt-ui-menu-item-checked","yt-ui-menu-item-checked-hid")}),mc(a,"yt-ui-menu-item-checked-hid","yt-ui-menu-item-checked"))}
function bi(a,b){var c=di(a,b);return c?!B(c,X(a,"content-hidden")):!1}
function ei(a){y(Ec(document,"UL",null,a),function(a){a.tabIndex=0;var b=Qh.o();kc(a,[X(b),X(b,"list")])})}
function di(a,b){var c=Ve(b,"menu-content-id");return c&&(c=H(c))?(kc(c,[X(a,"content"),X(a,"content-external")]),c):b==a.f?a.b:I(X(a,"content"),b)}
function ai(a,b){var c=ua(b).toString(),d=a.l[c];if(!d){d=document.createElement("IFRAME");d.src='javascript:""';var e=[X(a,"mask")];y(jc(b),function(a){e.push(a+"-mask")});
kc(d,e);a.l[c]=d}return d||null}
function Yh(a,b){return I(X(a,"trigger"),b)}
function gi(a,b){return of(b,a.b)||of(b,a.f)}
;function ji(){Kh.call(this,"clickcard");this.b={};this.f={}}
v(ji,Kh);na(ji);h=ji.prototype;h.register=function(){ji.m.register.call(this);Y(this,"click",this.fa,"target");Y(this,"click",this.ea,"close")};
h.unregister=function(){ji.m.unregister.call(this);Z(this,"click",this.fa,"target");Z(this,"click",this.ea,"close");for(var a in this.b)U(this.b[a]);this.b={};for(a in this.f)U(this.f[a]);this.f={}};
h.fa=function(a,b,c){c.preventDefault();b=$c(c.target,"button");if(!b||!b.disabled){if(b=this.g(a,"card-target"))a=document,a=q(b)?a.getElementById(b):b;b=this.v(a);this.g(b,"disabled")||(B(b,X(this,"active"))?(this.hide(a),D(b,X(this,"active"))):(this.show(a),C(b,X(this,"active"))))}};
h.show=function(a){ji.m.show.call(this,a);var b=this.v(a),c=ua(a).toString();if(!Ve(b,"click-outside-persists")){if(this.b[c])return;b=T(document,"click",t(this.ga,this,a));var d=T(window,"blur",t(this.ga,this,a));this.b[c]=[b,d]}a=T(window,"resize",t(this.rb,this,a,void 0));this.f[c]=a};
h.hide=function(a){ji.m.hide.call(this,a);a=ua(a).toString();var b=this.b[a];b&&(U(b),this.b[a]=null);if(b=this.f[a])U(b),delete this.f[a]};
h.ga=function(a,b){var c="yt-uix"+(this.j?"-"+this.j:"")+"-card",d=null;b.target&&(d=J(b.target,c)||J(Wh(b.target),c));(d=d||J(document.activeElement,c)||J(Wh(document.activeElement),c))||this.hide(a)};
h.ea=function(a){(a=J(a,X(this,"card")))&&(a=a.cardTargetNode)&&this.hide(a)};function ki(){Kh.call(this,"hovercard")}
v(ki,Kh);na(ki);h=ki.prototype;h.register=function(){Y(this,"mouseenter",this.na,"target");Y(this,"mouseleave",this.pa,"target");Y(this,"mouseenter",this.oa,"card");Y(this,"mouseleave",this.qa,"card")};
h.unregister=function(){Z(this,"mouseenter",this.na,"target");Z(this,"mouseleave",this.pa,"target");Z(this,"mouseenter",this.oa,"card");Z(this,"mouseleave",this.qa,"card")};
h.na=function(a){if(li!=a){li&&(this.hide(li),li=null);var b=t(this.show,this,a),c=parseInt(this.g(a,"delay-show"),10);b=M(b,-1<c?c:200);Te(a,"card-timer",b.toString());li=a;a.alt&&(Te(a,"card-alt",a.alt),a.alt="");a.title&&(Te(a,"card-title",a.title),a.title="")}};
h.pa=function(a){var b=parseInt(this.g(a,"card-timer"),10);window.clearTimeout(b);this.v(a).isCardHidable=!0;b=parseInt(this.g(a,"delay-hide"),10);b=-1<b?b:200;M(t(this.bb,this,a),b);if(b=this.g(a,"card-alt"))a.alt=b;if(b=this.g(a,"card-title"))a.title=b};
h.bb=function(a){this.v(a).isCardHidable&&(this.hide(a),li=null)};
h.oa=function(a){a&&(a.cardRootNode.isCardHidable=!1)};
h.qa=function(a){a&&this.hide(a.cardTargetNode)};
var li=null;function mi(a,b,c,d,e,f){this.b=a;this.u=null;this.h=I("yt-dialog-fg",this.b)||this.b;if(a=I("yt-dialog-title",this.h)){var g="yt-dialog-title-"+ua(this.h);a.setAttribute("id",g);this.h.setAttribute("aria-labelledby",g)}this.h.setAttribute("tabindex","-1");this.P=I("yt-dialog-focus-trap",this.b);this.za=!1;this.i=new K;this.w=[];this.w.push(zf(this.b,t(this.jb,this),"yt-dialog-dismiss"));this.w.push(T(this.P,"focus",t(this.Wa,this),!0));ni(this);this.tb=b;this.Fa=c;this.Ea=d;this.C=e;this.Ia=f;this.l=
this.j=null}
var oi={LOADING:"loading",xb:"content",Eb:"working"};function pi(a,b){a.L()||a.i.subscribe("post-all",b)}
function ni(a){a=I("yt-dialog-fg-content",a.b);var b=[];bb(oi,function(a){b.push("yt-dialog-show-"+a)});
lc(a,b);C(a,"yt-dialog-show-content")}
h=mi.prototype;
h.show=function(){if(!this.L()){this.u=document.activeElement;if(!this.Ea){this.f||(this.f=H("yt-dialog-bg"),this.f||(this.f=document.createElement("div"),this.f.id="yt-dialog-bg",this.f.className="yt-dialog-bg",document.body.appendChild(this.f)));var a=window,b=a.document;var c=0;if(b){c=b.body;var d=b.documentElement;if(d&&c)if(a=Hc(a).height,Ic(b)&&d.scrollHeight)c=d.scrollHeight!=a?d.scrollHeight:d.offsetHeight;else{b=d.scrollHeight;var e=d.offsetHeight;d.clientHeight!=e&&(b=c.scrollHeight,e=
c.offsetHeight);c=b>a?b>e?b:e:b<e?b:e}else c=0}this.f.style.height=c+"px";Xg(this.f)}this.ka();c=qi(this);ri(c);this.j=T(document,"keydown",t(this.cb,this));c=this.b;d=Pe("player-added",this.ka,this);Te(c,"player-ready-pubsub-key",d);this.Fa&&(this.l=T(document,"click",t(this.pb,this)));Xg(this.b);this.h.setAttribute("tabindex","0");si(this);this.C||C(document.body,"yt-dialog-active");zh(yh.o());Lh(ji.o());Lh(ki.o());O("yt-ui-dialog-show-complete",this)}};
function ti(){return Fa(Dc("yt-dialog"),function(a){return Wg(a)})}
h.ka=function(){if(!this.Ia){var a=this.b;E(document.body,"hide-players",!0);a&&E(a,"preserve-players",!0)}};
function qi(a){var b=Ec(document,"iframe",null,a.b);y(b,function(a){var b=Ve(a,"onload");b&&(b=r(b))&&T(a,"load",b);if(b=Ve(a,"src"))a.src=b},a);
return Ja(b)}
function ri(a){y(document.getElementsByTagName("iframe"),function(b){-1==Ca(a,b)&&C(b,"iframe-hid")})}
function ui(){y(Dc("iframe-hid"),function(a){D(a,"iframe-hid")})}
h.jb=function(a){a=a.currentTarget;a.disabled||(a=Ve(a,"action")||"",this.dismiss(a))};
h.dismiss=function(a){if(!this.L()){this.i.A("pre-all");this.i.A("pre-"+a);Yg(this.b);Lh(ji.o());Lh(ki.o());this.h.setAttribute("tabindex","-1");ti()||(Yg(this.f),this.C||D(document.body,"yt-dialog-active"),rf(),ui());this.j&&(U(this.j),this.j=null);this.l&&(U(this.l),this.l=null);var b=this.b;if(b){var c=Ve(b,"player-ready-pubsub-key");c&&(Re(c),We(b,"player-ready-pubsub-key"))}this.i.A("post-all");O("yt-ui-dialog-hide-complete",this);"cancel"==a&&O("yt-ui-dialog-cancelled",this);this.i&&this.i.A("post-"+
a);this.u&&this.u.focus()}};
h.setTitle=function(a){Qc(I("yt-dialog-title",this.b),a)};
h.cb=function(a){M(t(function(){this.tb||27!=a.keyCode||this.dismiss("cancel")},this),0);
9==a.keyCode&&a.shiftKey&&B(document.activeElement,"yt-dialog-fg")&&a.preventDefault()};
h.pb=function(a){"yt-dialog-base"==a.target.className&&this.dismiss("cancel")};
h.L=function(){return this.za};
h.dispose=function(){Wg(this.b)&&this.dismiss("dispose");U(this.w);this.w.length=0;M(t(function(){this.u=null},this),0);
this.P=this.h=null;this.i.dispose();this.i=null;this.za=!0};
h.Wa=function(a){a.stopPropagation();si(this)};
function si(a){M(t(function(){this.h&&this.h.focus()},a),0)}
u("yt.ui.Dialog",mi);function vi(){W.call(this,"overlay");this.i=this.f=this.h=this.b=null}
v(vi,W);na(vi);h=vi.prototype;h.register=function(){Y(this,"click",this.W,"target");Y(this,"click",this.hide,"close");wi(this)};
h.unregister=function(){vi.m.unregister.call(this);Z(this,"click",this.W,"target");Z(this,"click",this.hide,"close");this.i&&(Re(this.i),this.i=null);this.f&&(U(this.f),this.f=null)};
h.W=function(a){if(!this.b||!Wg(this.b.b)){var b=this.v(a);a=xi(b,a);b||(b=a?a.overlayParentNode:null);if(b&&a){var c=!!this.g(b,"disable-shortcuts")||!1,d=!!this.g(b,"disable-outside-click-dismiss")||!1;this.b=new mi(a,c);this.h=b;var e=I("yt-dialog-fg",a);if(e){var f=this.g(b,"overlay-class")||"",g=this.g(b,"overlay-style")||"default",k=this.g(b,"overlay-shape")||"default";f=f?f.split(" "):[];f.push(X(this,g));f.push(X(this,k));kc(e,f)}this.b.show();O("yt-uix-kbd-nav-move-to",e||a);wi(this);c||
d||(c=t(function(a){B(a.target,"yt-dialog-base")&&yi(this)},this),this.f=T(I("yt-dialog-base",a),"click",c));
this.I(b,"overlay-shown");O("yt-uix-overlay-shown",b)}}};
function wi(a){a.i||(a.i=Pe("yt-uix-overlay-hide",zi));a.b&&pi(a.b,function(){var a=vi.o();a.h=null;a.b.dispose();a.b=null})}
function yi(a){if(a.b){var b=a.h;a.b.dismiss("overlayhide");b&&a.I(b,"overlay-hidden");a.h=null;a.f&&(U(a.f),a.f=null);a.b=null}}
function xi(a,b){var c;if(a)if(c=I("yt-dialog",a)){var d=H("body-container");d&&(d.appendChild(c),a.overlayContentNode=c,c.overlayParentNode=a)}else c=a.overlayContentNode;else b&&(c=J(b,"yt-dialog"));return c}
function Ai(){var a=vi.o();if(a.h)a=I("yt-dialog-fg-content",a.h.overlayContentNode);else a:{if(a=Dc("yt-dialog-fg-content"))for(var b=0;b<a.length;b++){var c=J(a[b],"yt-dialog");if(Wg(c)){a=a[b];break a}}a=null}return a}
h.hide=function(a){a&&a.disabled||O("yt-uix-overlay-hide")};
function zi(){yi(vi.o())}
h.show=function(a){this.W(a)};var Bi={},Ci=[];function Di(a){a=J(a,"yt-uix-button-subscription-container");return I("yt-dialog",I("unsubscribe-confirmation-overlay-container",a))}
function Ei(a,b){U(Ci);Ci.length=0;Bi[b]||(Bi[b]=Di(a));vi.o().show(Bi[b]);var c=Ai();return new Rd(function(a){Ci.push(zf(c,function(){a()},"overlay-confirmation-unsubscribe-button"))})}
;function Fi(){var a=L("PLAYER_CONFIG");return a&&a.args&&void 0!==a.args.authuser?!0:!(!L("SESSION_INDEX")&&!L("LOGGED_IN"))}
;function Gi(){W.call(this,"subscription-button")}
v(Gi,W);na(Gi);Gi.prototype.register=function(){Y(this,"click",this.X);Ff(this,eg,this.ua);Ff(this,fg,this.ta);Ff(this,gg,this.mb);Ff(this,jg,this.ua);Ff(this,kg,this.ta);Ff(this,lg,this.ob);Ff(this,ng,this.lb);Ff(this,og,this.kb)};
Gi.prototype.unregister=function(){Z(this,"click",this.X);Gi.m.unregister.call(this)};
Gi.prototype.isSubscribed=function(a){return!!this.g(a,"is-subscribed")};
var Hi={Y:"hover-enabled",Ga:"yt-uix-button-subscribe",Ha:"yt-uix-button-subscribed",vb:"ypc-enabled",Ja:"yt-uix-button-subscription-container",Ka:"yt-subscription-button-disabled-mask-container"},Ii={wb:"channel-external-id",La:"subscriber-count-show-when-subscribed",Ma:"subscriber-count-tooltip",Na:"subscriber-count-title",yb:"href",zb:"insecure",Z:"is-subscribed",Ab:"parent-url",Bb:"clicktracking",Oa:"show-unsub-confirm-dialog",Cb:"show-unsub-confirm-time-frame",Pa:"style-type",aa:"subscribed-timestamp",
ba:"subscription-id",Db:"target",Qa:"ypc-enabled"};h=Gi.prototype;h.X=function(a){var b=this.g(a,"href"),c=this.g(a,"insecure");if(b)a=this.g(a,"target")||"_self",window.open(b,a);else if(!c)if(Fi()){b=this.g(a,"channel-external-id");c=this.g(a,"clicktracking");var d=Ji(this,a),e=this.g(a,"parent-url");if(this.g(a,"is-subscribed")){var f=this.g(a,"subscription-id"),g=new ag(b,f,d,a,c,e);Ki(this,a)?Ei(a,b).then(function(){S(ig,g)}):S(ig,g)}else S(dg,new Zf(b,d,c,e))}else Li(this,a)};
h.ua=function(a){this.H(a.b,this.va,!0)};
h.ta=function(a){this.H(a.b,this.va,!1)};
h.mb=function(a){this.H(a.b,this.wa,!0,a.f)};
h.ob=function(a){this.H(a.b,this.wa,!1)};
h.lb=function(a){this.H(a.b,this.Va)};
h.kb=function(a){this.H(a.b,this.Ua)};
h.wa=function(a,b,c){b?(Te(a,Ii.Z,"true"),c&&Te(a,Ii.ba,c),this.g(a,Ii.Oa)&&(b=new ec,Te(a,Ii.aa,(b.getTime()/1E3).toString()))):(We(a,Ii.Z),We(a,Ii.aa),We(a,Ii.ba));Mi(this,a)};
function Ji(a,b){if(!a.g(b,"ypc-enabled"))return null;var c=a.g(b,"ypc-item-type"),d=a.g(b,"ypc-item-id");return{itemType:c,itemId:d,subscriptionElement:b}}
h.va=function(a,b){var c=J(a,Hi.Ja);E(c,Hi.Ka,b);a.setAttribute("aria-busy",b?"true":"false");a.disabled=b};
function Mi(a,b){var c=a.g(b,Ii.Pa),d=!!a.g(b,"is-subscribed");c="-"+c;var e=Hi.Ha+c;E(b,Hi.Ga+c,!d);E(b,e,d);a.g(b,Ii.Ma)&&!a.g(b,Ii.La)&&(c=X(Zg.o()),E(b,c,!d),b.title=d?"":a.g(b,Ii.Na));d?M(function(){C(b,Hi.Y)},1E3):D(b,Hi.Y)}
h.Va=function(a){var b=!!this.g(a,"ypc-item-type"),c=!!this.g(a,"ypc-item-id");!this.g(a,"ypc-enabled")&&b&&c&&(C(a,"ypc-enabled"),Te(a,Ii.Qa,"true"))};
h.Ua=function(a){this.g(a,"ypc-enabled")&&(D(a,"ypc-enabled"),We(a,"ypc-enabled"))};
function Ni(a,b){return Da(Dc(X(a)),function(a){return b==this.g(a,"channel-external-id")},a)}
h.Sa=function(a,b,c){var d=Ma(arguments,2);y(a,function(a){b.apply(this,Ia(a,d))},this)};
h.H=function(a,b,c){var d=Ni(this,a);this.Sa.apply(this,Ia([d],Ma(arguments,1)))};
function Li(a,b){var c=t(function(a){a.discoverable_subscriptions&&Ie("SUBSCRIBE_EMBED_DISCOVERABLE_SUBSCRIPTIONS",a.discoverable_subscriptions);this.X(b)},a);
gh(c)}
function Ki(a,b){if(!a.g(b,"show-unsub-confirm-dialog"))return!1;var c=a.g(b,"show-unsub-confirm-time-frame");return"always"==c||"ten_minutes"==c&&(c=parseInt(a.g(b,"subscribed-timestamp"),10),(new ec).getTime()<1E3*(c+600))?!0:!1}
;Dg=!0;Eg.push(jf(dg,Fg),jf(ig,Hg));Dg||Eg.push(jf(hg,Fg),jf(mg,Hg),jf(bg,Jg),jf(cg,Lg),jf(pg,Ng),jf(zg,Pg),jf(Bg,Rg),jf(yg,Qg));var Oi=Gi.o(),Pi=X(Oi);Pi in Hf||(Oi.register(),Ef(Oi,"yt-uix-init-"+Pi,Oi.init),Ef(Oi,"yt-uix-dispose-"+Pi,Oi.dispose),Hf[Pi]=Oi);u("yt.setConfig",Ie);u("yt.config.set",Ie);}).call(this);