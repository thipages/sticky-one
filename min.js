var jscrudapi=function(e){"use strict";var t,n="sticky_"+(""+Math.random()).replace(".",""),r=1,o=function(){return n+"".concat(++r)},i=!1,u=o(),a=new CustomEvent(u,{}),c=function(e){t||(t=e,document.addEventListener(u,(function(){return i=!0})),l())};function l(){i&&(t(),i=!1),requestAnimationFrame(l)}function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e,t,n){return t&&p(e.prototype,t),n&&p(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function y(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&h(e,t)}function v(e){return v=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},v(e)}function h(e,t){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},h(e,t)}function b(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function m(e,t,n){return m=b()?Reflect.construct.bind():function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&h(o,n.prototype),o},m.apply(null,arguments)}function g(e){var t="function"==typeof Map?new Map:void 0;return g=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return m(e,arguments,v(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),h(r,e)},g(e)}function w(e,t){if(t&&("object"==typeof t||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function O(e){var t=b();return function(){var n,r=v(e);if(t){var o=v(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return w(this,n)}}function A(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=v(e)););return e}function j(){return j="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=A(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},j.apply(this,arguments)}function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,o,i=[],u=!0,a=!1;try{for(n=n.call(e);!(u=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);u=!0);}catch(e){a=!0,o=e}finally{try{u||null==n.return||n.return()}finally{if(a)throw o}}return i}(e,t)||S(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(e){return function(e){if(Array.isArray(e))return C(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||S(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(e,t){if(e){if("string"==typeof e)return C(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?C(e,t):void 0}}function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function N(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=S(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,a=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return u=e.done,e},e:function(e){a=!0,i=e},f:function(){try{u||null==n.return||n.return()}finally{if(a)throw i}}}}var k,T=function(e){y(n,e);var t=O(n);function n(){return s(this,n),t.apply(this,arguments)}return d(n,[{key:"set",value:function(e,t){return j(v(n.prototype),"set",this).call(this,e,t),t}}]),n}(g(Map)),P=function(e){y(n,e);var t=O(n);function n(){return s(this,n),t.apply(this,arguments)}return d(n,[{key:"set",value:function(e,t){return j(v(n.prototype),"set",this).call(this,e,t),t}}]),n}(g(WeakMap)),R=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,_=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/?)>/g,M=/([^\s\\>"'=]+)\s*=\s*(['"]?)\x01/g,L=/[\x01\x02]/g,I=function(e,t){return 111===e.nodeType?1/t<0?t?(r=(n=e).firstChild,o=n.lastChild,(i=document.createRange()).setStartAfter(r),i.setEndAfter(o),i.deleteContents(),r):e.lastChild:t?e.valueOf():e.firstChild:e;var n,r,o,i},z=Array.isArray,B=function(e){return null==e?e:e.valueOf()},D=function(e,t){var n,r,o=t.slice(2);return!(t in e)&&(r=t.toLowerCase())in e&&(o=r.slice(2)),function(t){var r=z(t)?t:[t,!1];n!==r[0]&&(n&&e.removeEventListener(o,n,r[1]),(n=r[0])&&e.addEventListener(o,n,r[1]))}},V=Array.isArray,$=Array.prototype.indexOf,F=new Proxy(document,{get:function(e,t){return e[t].bind(e)}}),U=F.createDocumentFragment,H=F.createElement,W=F.createElementNS,q=F.createTextNode,G=F.createTreeWalker,J=F.importNode,K=function(e,t){return t?function(e){k||(k=W("http://www.w3.org/2000/svg","svg")),k.innerHTML=e;var t=U();return t.append.apply(t,E(k.childNodes)),t}(e):function(e){var t=H("template");return t.innerHTML=e,t.content}(e)},Q=function(e,t){return e.childNodes[t]},X=function(e,t,n){return function(e,t,n,r,o){for(var i=n.length,u=t.length,a=i,c=0,l=0,f=null;c<u||l<a;)if(u===c)for(var s=a<i?l?r(n[l-1],-0).nextSibling:r(n[a-l],0):o;l<a;)e.insertBefore(r(n[l++],1),s);else if(a===l)for(;c<u;)f&&f.has(t[c])||e.removeChild(r(t[c],-1)),c++;else if(t[c]===n[l])c++,l++;else if(t[u-1]===n[a-1])u--,a--;else if(t[c]===n[a-1]&&n[l]===t[u-1]){var p=r(t[--u],-1).nextSibling;e.insertBefore(r(n[l++],1),r(t[c++],-1).nextSibling),e.insertBefore(r(n[--a],1),p),t[u]=n[a]}else{if(!f){f=new Map;for(var d=l;d<a;)f.set(n[d],d++)}if(f.has(t[c])){var y=f.get(t[c]);if(l<y&&y<a){for(var v=c,h=1;++v<u&&v<a&&f.get(t[v])===y+h;)h++;if(h>y-l)for(var b=r(t[c],0);l<y;)e.insertBefore(r(n[l++],1),b);else e.replaceChild(r(n[l++],1),r(t[c++],-1))}else c++}else e.removeChild(r(t[c++],-1))}return n}(e.parentNode,t,n,I,e)},Y=function(e,t){switch(t[0]){case"?":return function(e,t,n){return function(r){var o=!!B(r);n!==o&&((n=o)?e.setAttribute(t,""):e.removeAttribute(t))}}(e,t.slice(1),!1);case".":return function(e,t){return"dataset"===t?(n=e.dataset,function(e){for(var t in e){var r=e[t];null==r?delete n[t]:n[t]=r}}):function(n){e[t]=n};var n}(e,t.slice(1));case"@":return D(e,"on"+t.slice(1));case"o":if("n"===t[1])return D(e,t)}switch(t){case"ref":return function(e){var t;return function(n){t!==n&&(t=n,"function"==typeof n?n(e):n.current=e)}}(e);case"aria":return function(e){return function(t){for(var n in t){var r="role"===n?n:"aria-".concat(n),o=t[n];null==o?e.removeAttribute(r):e.setAttribute(r,o)}}}(e)}return function(e,t){var n,r=!0,o=document.createAttributeNS(null,t);return function(t){var i=B(t);n!==i&&(null==(n=i)?r||(e.removeAttributeNode(o),r=!0):(o.value=i,r&&(e.setAttributeNodeNS(o),r=!1)))}}(e,t)};function Z(e){var t=e.type,n=e.path.reduceRight(Q,this);return"node"===t?function(e){var t,n,r=[];return function o(i){switch(f(i)){case"string":case"number":case"boolean":t!==i&&(t=i,n||(n=q("")),n.data=i,r=X(e,r,[n]));break;case"object":case"undefined":if(null==i){t!=i&&(t=i,r=X(e,r,[]));break}if(V(i)){t=i,0===i.length?r=X(e,r,[]):"object"===f(i[0])?r=X(e,r,i):o(String(i));break}if(t!==i)if("ELEMENT_NODE"in i)t=i,r=X(e,r,11===i.nodeType?E(i.childNodes):[i]);else{var u=i.valueOf();u!==i&&o(u)}break;case"function":o(i(e))}}}(n):"attr"===t?Y(n,e.name):function(e){var t;return function(n){var r=B(n);t!=r&&(t=r,e.textContent=null==r?"":r)}}(n)}var ee,te=function(e){for(var t=[],n=e.parentNode;n;){t.push($.call(n.childNodes,e)),n=(e=n).parentNode}return t},ne="isµ",re=new P,oe=/^(?:textarea|script|style|title|plaintext|xmp)$/,ie=function(e,t){for(var n="svg"===e,r=function(e,t,n){var r=0;return e.join("").trim().replace(_,(function(e,t,r,o){var i=t+r.replace(M,"=$2$1").trimEnd();return o.length&&(i+=n||R.test(t)?" /":"></"+t),"<"+i+">"})).replace(L,(function(e){return""===e?"\x3c!--"+t+r+++"--\x3e":t+r++}))}(t,ne,n),o=K(r,n),i=G(o,129),u=[],a=t.length-1,c=0,l="".concat(ne).concat(c);c<a;){var f=i.nextNode();if(!f)throw"bad template: ".concat(r);if(8===f.nodeType)f.data===l&&(u.push({type:"node",path:te(f)}),l="".concat(ne).concat(++c));else{for(;f.hasAttribute(l);)u.push({type:"attr",path:te(f),name:f.getAttribute(l)}),f.removeAttribute(l),l="".concat(ne).concat(++c);oe.test(f.localName)&&f.textContent.trim()==="\x3c!--".concat(l,"--\x3e")&&(f.textContent="",u.push({type:"text",path:te(f)}),l="".concat(ne).concat(++c))}}return{content:o,nodes:u}},ue=function(e,t){var n=re.get(t)||re.set(t,ie(e,t)),r=n.content,o=n.nodes,i=J(r,!0);return{content:i,updates:o.map(Z,i)}},ae=function(e,t){var n=t.type,r=t.template,o=t.values,i=ce(e,o),u=e.entry;u&&u.template===r&&u.type===n||(e.entry=u=function(e,t){var n=ue(e,t);return{type:e,template:t,content:n.content,updates:n.updates,wire:null}}(n,r));for(var a=u,c=a.content,l=a.updates,f=a.wire,s=0;s<i;s++)l[s](o[s]);return f||(u.wire=function(e){var t=e.firstChild,n=e.lastChild;if(t===n)return n||e;var r=e.childNodes,o=E(r);return{ELEMENT_NODE:1,nodeType:111,firstChild:t,lastChild:n,valueOf:function(){return r.length!==o.length&&e.append.apply(e,E(o)),e}}}(c))},ce=function e(t,n){for(var r=t.stack,o=n.length,i=0;i<o;i++){var u=n[i];u instanceof le?n[i]=ae(r[i]||(r[i]={stack:[],entry:null,wire:null}),u):V(u)?e(r[i]||(r[i]={stack:[],entry:null,wire:null}),u):r[i]=null}return o<r.length&&r.splice(o),o},le=d((function e(t,n,r){s(this,e),this.type=t,this.template=n,this.values=r})),fe=function(e){var t=new P;return Object.assign((function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new le(e,t,r)}),{for:function(n,r){var o=t.get(n)||t.set(n,new T);return o.get(r)||o.set(r,function(t){return function(n){for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return ae(t,{type:e,template:n,values:o})}}({stack:[],entry:null,wire:null}))},node:function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return ae({stack:[],entry:null,wire:null},new le(e,t,r)).valueOf()}})},se=new P,pe=function(e,t){var n="function"==typeof t?t():t,r=se.get(e)||se.set(e,{stack:[],entry:null,wire:null}),o=n instanceof le?ae(r,n):n;return o!==r.wire&&(r.wire=o,e.replaceChildren(o.valueOf())),e},de=fe("html"),ye=fe("svg"),ve=!1;function he(e){for(var t="string"==typeof e?[e]:[e[0]],n=1,r=arguments.length;n<r;n++)t.push(arguments[n],e[n]);var o=document.createElement("style");return o.type="text/css",o.appendChild(document.createTextNode(t.join(""))),document.head.appendChild(o)}function be(e,t){e&&(e.value=t,function(e,t){document.documentElement.style.setProperty("--"+e,t)}(e.uid,e.value))}var me=/--([a-z]+[a-z0-9-]*)\s*(,\s*.+)*\)/gi,ge=function(e){return(null==e?void 0:e.replace(/\s|,/g,""))||""};function we(){}return e.R=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.map((function(e){return e.render()}))},e.html=de,e.startApp=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body;if(!ve){if(!e)throw"Controller needs at least a view definition";ve=!0;var n=function(){return pe(t,e.render)};c(n),n()}},e.sticky=function(e){return function(e){var t=e.view,n=e.model,r=void 0===n?{}:n,i=e.handleEvent,u=void 0===i?we:i,c=e.style,l=void 0===c?we:c;if(!t)throw"View property is missing!";var f=function(e){var t,n,r={},i={};if(e)for(var u=0,a=Object.entries(e);u<a.length;u++){var c=x(a[u],2),l=c[0],f=c[1];r[l]=o();var s,p=f,d=N(E(f.matchAll(me)).map((function(e){return{name:e[1],defaultValue:ge(e[2]),uid:o()}})));try{for(d.s();!(s=d.n()).done;){var y=s.value,v=y.name,h=y.defaultValue,b=y.uid;i[v]={value:h,uid:b};var m=new RegExp("--"+v);p=p.replace(m,"--"+b),be(i[v],h)}}catch(e){d.e(e)}finally{d.f()}he(ee||(t=["\n                ."," {\n                    ","\n                }\n            "],(n=void 0)||(n=t.slice(0)),ee=Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(n)}}))),r[l],p)}return{classNameToUid:r,setCssVariable:function(e,t){var n=i[e];n&&be(n,t)}}}(l);r.broadcast=function(e){var t,n=!1,r=N(s);try{for(r.s();!(t=r.n()).done;){(0,t.value)(e)&&(n=!0)}}catch(e){r.e(e)}finally{r.f()}n&&document.dispatchEvent(a)},r.handleEvent=u,r.style=l?f.classNameToUid:{};var s=[],p={model:r,render:function(){return t(r,r.style,p)},style:function(e,t){if(e){"string"==typeof e&&(e=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({},e,t));for(var n=0,r=Object.entries(e);n<r.length;n++){var o=x(r[n],2),i=o[0],u=o[1];f.setCssVariable(i,u)}}return p},bind:function(e){return"function"==typeof e&&s.push(e),p}};return p}("function"==typeof e?e():e)},e.svg=ye,Object.defineProperty(e,"__esModule",{value:!0}),e}({});
