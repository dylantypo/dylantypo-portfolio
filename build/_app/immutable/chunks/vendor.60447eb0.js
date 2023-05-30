function wi(){}function e_(r,e){for(const t in e)r[t]=e[t];return r}function Dd(r){return r()}function ih(){return Object.create(null)}function Ba(r){r.forEach(Dd)}function Ud(r){return typeof r=="function"}function _u(r,e){return r!=r?e==e:r!==e||r&&typeof r=="object"||typeof r=="function"}function t_(r){return Object.keys(r).length===0}function n_(r,...e){if(r==null)return wi;const t=r.subscribe(...e);return t.unsubscribe?()=>t.unsubscribe():t}function i_(r,e,t){r.$$.on_destroy.push(n_(e,t))}function r_(r,e,t,n){if(r){const i=Id(r,e,t,n);return r[0](i)}}function Id(r,e,t,n){return r[1]&&n?e_(t.ctx.slice(),r[1](n(e))):t.ctx}function s_(r,e,t,n){if(r[2]&&n){const i=r[2](n(t));if(e.dirty===void 0)return i;if(typeof i=="object"){const s=[],o=Math.max(e.dirty.length,i.length);for(let a=0;a<o;a+=1)s[a]=e.dirty[a]|i[a];return s}return e.dirty|i}return e.dirty}function a_(r,e,t,n,i,s){if(i){const o=Id(e,t,n,s);r.p(o,i)}}function o_(r){if(r.ctx.length>32){const e=[],t=r.ctx.length/32;for(let n=0;n<t;n++)e[n]=-1;return e}return-1}const l_=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;"WeakMap"in l_;let ll=!1;function c_(){ll=!0}function u_(){ll=!1}function h_(r,e,t,n){for(;r<e;){const i=r+(e-r>>1);t(i)<=n?r=i+1:e=i}return r}function f_(r){if(r.hydrate_init)return;r.hydrate_init=!0;let e=r.childNodes;if(r.nodeName==="HEAD"){const l=[];for(let c=0;c<e.length;c++){const u=e[c];u.claim_order!==void 0&&l.push(u)}e=l}const t=new Int32Array(e.length+1),n=new Int32Array(e.length);t[0]=-1;let i=0;for(let l=0;l<e.length;l++){const c=e[l].claim_order,u=(i>0&&e[t[i]].claim_order<=c?i+1:h_(1,i,f=>e[t[f]].claim_order,c))-1;n[l]=t[u]+1;const h=u+1;t[h]=l,i=Math.max(h,i)}const s=[],o=[];let a=e.length-1;for(let l=t[i]+1;l!=0;l=n[l-1]){for(s.push(e[l-1]);a>=l;a--)o.push(e[a]);a--}for(;a>=0;a--)o.push(e[a]);s.reverse(),o.sort((l,c)=>l.claim_order-c.claim_order);for(let l=0,c=0;l<o.length;l++){for(;c<s.length&&o[l].claim_order>=s[c].claim_order;)c++;const u=c<s.length?s[c]:null;r.insertBefore(o[l],u)}}function Rc(r,e){if(ll){for(f_(r),(r.actual_end_child===void 0||r.actual_end_child!==null&&r.actual_end_child.parentNode!==r)&&(r.actual_end_child=r.firstChild);r.actual_end_child!==null&&r.actual_end_child.claim_order===void 0;)r.actual_end_child=r.actual_end_child.nextSibling;e!==r.actual_end_child?(e.claim_order!==void 0||e.parentNode!==r)&&r.insertBefore(e,r.actual_end_child):r.actual_end_child=e.nextSibling}else(e.parentNode!==r||e.nextSibling!==null)&&r.appendChild(e)}function Ml(r,e,t){ll&&!t?Rc(r,e):(e.parentNode!==r||e.nextSibling!=t)&&r.insertBefore(e,t||null)}function is(r){r.parentNode&&r.parentNode.removeChild(r)}function Cc(r){return document.createElement(r)}function Ea(r){return document.createTextNode(r)}function d_(){return Ea(" ")}function Ob(){return Ea("")}function Fb(r,e,t,n){return r.addEventListener(e,t,n),()=>r.removeEventListener(e,t,n)}function Bb(r,e,t){t==null?r.removeAttribute(e):r.getAttribute(e)!==t&&r.setAttribute(e,t)}function Pc(r){return Array.from(r.childNodes)}function p_(r){r.claim_info===void 0&&(r.claim_info={last_index:0,total_claimed:0})}function Nd(r,e,t,n,i=!1){p_(r);const s=(()=>{for(let o=r.claim_info.last_index;o<r.length;o++){const a=r[o];if(e(a)){const l=t(a);return l===void 0?r.splice(o,1):r[o]=l,i||(r.claim_info.last_index=o),a}}for(let o=r.claim_info.last_index-1;o>=0;o--){const a=r[o];if(e(a)){const l=t(a);return l===void 0?r.splice(o,1):r[o]=l,i?l===void 0&&r.claim_info.last_index--:r.claim_info.last_index=o,a}}return n()})();return s.claim_order=r.claim_info.total_claimed,r.claim_info.total_claimed+=1,s}function m_(r,e,t,n){return Nd(r,i=>i.nodeName===e,i=>{const s=[];for(let o=0;o<i.attributes.length;o++){const a=i.attributes[o];t[a.name]||s.push(a.name)}s.forEach(o=>i.removeAttribute(o))},()=>n(e))}function rh(r,e,t){return m_(r,e,t,Cc)}function Lc(r,e){return Nd(r,t=>t.nodeType===3,t=>{const n=""+e;if(t.data.startsWith(n)){if(t.data.length!==n.length)return t.splitText(n.length)}else t.data=n},()=>Ea(e),!0)}function __(r){return Lc(r," ")}function sh(r,e){e=""+e,r.data!==e&&(r.data=e)}function zb(r,e,t,n){t==null?r.style.removeProperty(e):r.style.setProperty(e,t,n?"important":"")}function kb(r,e){return new r(e)}let ba;function oa(r){ba=r}function gu(){if(!ba)throw new Error("Function called outside component initialization");return ba}function ah(r){gu().$$.on_mount.push(r)}function Gb(r){gu().$$.after_update.push(r)}function Hb(r){gu().$$.on_destroy.push(r)}const rs=[],oh=[];let ps=[];const lh=[],Od=Promise.resolve();let Dc=!1;function Fd(){Dc||(Dc=!0,Od.then(Bd))}function Sl(){return Fd(),Od}function Uc(r){ps.push(r)}const El=new Set;let Nr=0;function Bd(){if(Nr!==0)return;const r=ba;do{try{for(;Nr<rs.length;){const e=rs[Nr];Nr++,oa(e),g_(e.$$)}}catch(e){throw rs.length=0,Nr=0,e}for(oa(null),rs.length=0,Nr=0;oh.length;)oh.pop()();for(let e=0;e<ps.length;e+=1){const t=ps[e];El.has(t)||(El.add(t),t())}ps.length=0}while(rs.length);for(;lh.length;)lh.pop()();Dc=!1,El.clear(),oa(r)}function g_(r){if(r.fragment!==null){r.update(),Ba(r.before_update);const e=r.dirty;r.dirty=[-1],r.fragment&&r.fragment.p(r.ctx,e),r.after_update.forEach(Uc)}}function v_(r){const e=[],t=[];ps.forEach(n=>r.indexOf(n)===-1?e.push(n):t.push(n)),t.forEach(n=>n()),ps=e}const Do=new Set;let fr;function Vb(){fr={r:0,c:[],p:fr}}function Wb(){fr.r||Ba(fr.c),fr=fr.p}function zd(r,e){r&&r.i&&(Do.delete(r),r.i(e))}function x_(r,e,t,n){if(r&&r.o){if(Do.has(r))return;Do.add(r),fr.c.push(()=>{Do.delete(r),n&&(t&&r.d(1),n())}),r.o(e)}else n&&n()}const y_=["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"];[...y_];function Xb(r){r&&r.c()}function qb(r,e){r&&r.l(e)}function M_(r,e,t,n){const{fragment:i,after_update:s}=r.$$;i&&i.m(e,t),n||Uc(()=>{const o=r.$$.on_mount.map(Dd).filter(Ud);r.$$.on_destroy?r.$$.on_destroy.push(...o):Ba(o),r.$$.on_mount=[]}),s.forEach(Uc)}function S_(r,e){const t=r.$$;t.fragment!==null&&(v_(t.after_update),Ba(t.on_destroy),t.fragment&&t.fragment.d(e),t.on_destroy=t.fragment=null,t.ctx=[])}function E_(r,e){r.$$.dirty[0]===-1&&(rs.push(r),Fd(),r.$$.dirty.fill(0)),r.$$.dirty[e/31|0]|=1<<e%31}function kd(r,e,t,n,i,s,o,a=[-1]){const l=ba;oa(r);const c=r.$$={fragment:null,ctx:[],props:s,update:wi,not_equal:i,bound:ih(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:ih(),dirty:a,skip_bound:!1,root:e.target||l.$$.root};o&&o(c.root);let u=!1;if(c.ctx=t?t(r,e.props||{},(h,f,...d)=>{const _=d.length?d[0]:f;return c.ctx&&i(c.ctx[h],c.ctx[h]=_)&&(!c.skip_bound&&c.bound[h]&&c.bound[h](_),u&&E_(r,h)),f}):[],c.update(),u=!0,Ba(c.before_update),c.fragment=n?n(c.ctx):!1,e.target){if(e.hydrate){c_();const h=Pc(e.target);c.fragment&&c.fragment.l(h),h.forEach(is)}else c.fragment&&c.fragment.c();e.intro&&zd(r.$$.fragment),M_(r,e.target,e.anchor,e.customElement),u_(),Bd()}oa(l)}class Gd{$destroy(){S_(this,1),this.$destroy=wi}$on(e,t){if(!Ud(t))return wi;const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const i=n.indexOf(t);i!==-1&&n.splice(i,1)}}$set(e){this.$$set&&!t_(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function b_(r,e){return r==="/"||e==="ignore"?r:e==="never"?r.endsWith("/")?r.slice(0,-1):r:e==="always"&&!r.endsWith("/")?r+"/":r}function T_(r){return r.split("%25").map(decodeURI).join("%25")}function w_(r){for(const e in r)r[e]=decodeURIComponent(r[e]);return r}const A_=["href","pathname","search","searchParams","toString","toJSON"];function R_(r,e){const t=new URL(r);for(const n of A_)Object.defineProperty(t,n,{get(){return e(),r[n]},enumerable:!0,configurable:!0});return C_(t),t}function C_(r){Object.defineProperty(r,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const P_="/__data.json";function L_(r){return r.replace(/\/$/,"")+P_}const Or=[];function vu(r,e=wi){let t;const n=new Set;function i(a){if(_u(r,a)&&(r=a,t)){const l=!Or.length;for(const c of n)c[1](),Or.push(c,r);if(l){for(let c=0;c<Or.length;c+=2)Or[c][0](Or[c+1]);Or.length=0}}}function s(a){i(a(r))}function o(a,l=wi){const c=[a,l];return n.add(c),n.size===1&&(t=e(i)||wi),a(r),()=>{n.delete(c),n.size===0&&t&&(t(),t=null)}}return{set:i,update:s,subscribe:o}}var Pd;const Fi=((Pd=globalThis.__sveltekit_3mz8qd)==null?void 0:Pd.base)??"";var Ld;const D_=((Ld=globalThis.__sveltekit_3mz8qd)==null?void 0:Ld.assets)??Fi,U_="1685456970388",Hd="sveltekit:snapshot",Vd="sveltekit:scroll",Kn="sveltekit:index",Yo={tap:1,hover:2,viewport:3,eager:4,off:-1};function ch(r){let e=r.baseURI;if(!e){const t=r.getElementsByTagName("base");e=t.length?t[0].href:r.URL}return e}function Zs(){return{x:pageXOffset,y:pageYOffset}}function Fr(r,e){return r.getAttribute(`data-sveltekit-${e}`)}const uh={...Yo,"":Yo.hover};function Wd(r){let e=r.assignedSlot??r.parentNode;return(e==null?void 0:e.nodeType)===11&&(e=e.host),e}function hh(r,e){for(;r&&r!==e;){if(r.nodeName.toUpperCase()==="A"&&r.hasAttribute("href"))return r;r=Wd(r)}}function bl(r,e){let t;try{t=new URL(r instanceof SVGAElement?r.href.baseVal:r.href,document.baseURI)}catch{}const n=r instanceof SVGAElement?r.target.baseVal:r.target,i=!t||!!n||Uo(t,e)||(r.getAttribute("rel")||"").split(/\s+/).includes("external"),s=(t==null?void 0:t.origin)===location.origin&&r.hasAttribute("download");return{url:t,external:i,target:n,download:s}}function Wa(r){let e=null,t=null,n=null,i=null,s=null,o=null,a=r;for(;a&&a!==document.documentElement;)n===null&&(n=Fr(a,"preload-code")),i===null&&(i=Fr(a,"preload-data")),e===null&&(e=Fr(a,"keepfocus")),t===null&&(t=Fr(a,"noscroll")),s===null&&(s=Fr(a,"reload")),o===null&&(o=Fr(a,"replacestate")),a=Wd(a);return{preload_code:uh[n??"off"],preload_data:uh[i??"off"],keep_focus:e==="off"?!1:e===""?!0:null,noscroll:t==="off"?!1:t===""?!0:null,reload:s==="off"?!1:s===""?!0:null,replace_state:o==="off"?!1:o===""?!0:null}}function fh(r){const e=vu(r);let t=!0;function n(){t=!0,e.update(o=>o)}function i(o){t=!1,e.set(o)}function s(o){let a;return e.subscribe(l=>{(a===void 0||t&&l!==a)&&o(a=l)})}return{notify:n,set:i,subscribe:s}}function I_(){const{set:r,subscribe:e}=vu(!1);let t;async function n(){clearTimeout(t);try{const i=await fetch(`${D_}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!i.ok)return!1;const o=(await i.json()).version!==U_;return o&&(r(!0),clearTimeout(t)),o}catch{return!1}}return{subscribe:e,check:n}}function Uo(r,e){return r.origin!==location.origin||!r.pathname.startsWith(e)}function Xd(r){try{return JSON.parse(sessionStorage[r])}catch{}}function dh(r,e){const t=JSON.stringify(e);try{sessionStorage[r]=t}catch{}}function N_(...r){let e=5381;for(const t of r)if(typeof t=="string"){let n=t.length;for(;n;)e=e*33^t.charCodeAt(--n)}else if(ArrayBuffer.isView(t)){const n=new Uint8Array(t.buffer,t.byteOffset,t.byteLength);let i=n.length;for(;i;)e=e*33^n[--i]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}const cl=window.fetch;window.fetch=(r,e)=>((r instanceof Request?r.method:(e==null?void 0:e.method)||"GET")!=="GET"&&la.delete(xu(r)),cl(r,e));const la=new Map;function O_(r,e){const t=xu(r,e),n=document.querySelector(t);if(n!=null&&n.textContent){const{body:i,...s}=JSON.parse(n.textContent),o=n.getAttribute("data-ttl");return o&&la.set(t,{body:i,init:s,ttl:1e3*Number(o)}),Promise.resolve(new Response(i,s))}return cl(r,e)}function F_(r,e,t){if(la.size>0){const n=xu(r,t),i=la.get(n);if(i){if(performance.now()<i.ttl&&["default","force-cache","only-if-cached",void 0].includes(t==null?void 0:t.cache))return new Response(i.body,i.init);la.delete(n)}}return cl(e,t)}function xu(r,e){let n=`script[data-sveltekit-fetched][data-url=${JSON.stringify(r instanceof Request?r.url:r)}]`;if(e!=null&&e.headers||e!=null&&e.body){const i=[];e.headers&&i.push([...new Headers(e.headers)].join(",")),e.body&&(typeof e.body=="string"||ArrayBuffer.isView(e.body))&&i.push(e.body),n+=`[data-hash="${N_(...i)}"]`}return n}const B_=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function z_(r){const e=[];return{pattern:r==="/"?/^\/$/:new RegExp(`^${G_(r).map(n=>{const i=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(n);if(i)return e.push({name:i[1],matcher:i[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const s=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(n);if(s)return e.push({name:s[1],matcher:s[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!n)return;const o=n.split(/\[(.+?)\](?!\])/);return"/"+o.map((l,c)=>{if(c%2){if(l.startsWith("x+"))return Tl(String.fromCharCode(parseInt(l.slice(2),16)));if(l.startsWith("u+"))return Tl(String.fromCharCode(...l.slice(2).split("-").map(m=>parseInt(m,16))));const u=B_.exec(l);if(!u)throw new Error(`Invalid param: ${l}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,h,f,d,_]=u;return e.push({name:d,matcher:_,optional:!!h,rest:!!f,chained:f?c===1&&o[0]==="":!1}),f?"(.*?)":h?"([^/]*)?":"([^/]+?)"}return Tl(l)}).join("")}).join("")}/?$`),params:e}}function k_(r){return!/^\([^)]+\)$/.test(r)}function G_(r){return r.slice(1).split("/").filter(k_)}function H_(r,e,t){const n={},i=r.slice(1);let s=0;for(let o=0;o<e.length;o+=1){const a=e[o],l=i[o-s];if(a.chained&&a.rest&&s){n[a.name]=i.slice(o-s,o+1).filter(c=>c).join("/"),s=0;continue}if(l===void 0){a.rest&&(n[a.name]="");continue}if(!a.matcher||t[a.matcher](l)){n[a.name]=l;const c=e[o+1],u=i[o+1];c&&!c.rest&&c.optional&&u&&(s=0);continue}if(a.optional&&a.chained){s++;continue}return}if(!s)return n}function Tl(r){return r.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function V_({nodes:r,server_loads:e,dictionary:t,matchers:n}){const i=new Set(e);return Object.entries(t).map(([a,[l,c,u]])=>{const{pattern:h,params:f}=z_(a),d={id:a,exec:_=>{const m=h.exec(_);if(m)return H_(m,f,n)},errors:[1,...u||[]].map(_=>r[_]),layouts:[0,...c||[]].map(o),leaf:s(l)};return d.errors.length=d.layouts.length=Math.max(d.errors.length,d.layouts.length),d});function s(a){const l=a<0;return l&&(a=~a),[l,r[a]]}function o(a){return a===void 0?a:[i.has(a),r[a]]}}let Js=class{constructor(e,t){this.status=e,typeof t=="string"?this.body={message:t}:t?this.body=t:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}},ph=class{constructor(e,t){this.status=e,this.location=t}};function W_(r){r.client}const xi={url:fh({}),page:fh({}),navigating:vu(null),updated:I_()};async function X_(r){var e;for(const t in r)if(typeof((e=r[t])==null?void 0:e.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(r).map(async([n,i])=>[n,await i])));return r}const q_=-1,Y_=-2,$_=-3,j_=-4,Z_=-5,J_=-6;function K_(r,e){if(typeof r=="number")return i(r,!0);if(!Array.isArray(r)||r.length===0)throw new Error("Invalid input");const t=r,n=Array(t.length);function i(s,o=!1){if(s===q_)return;if(s===$_)return NaN;if(s===j_)return 1/0;if(s===Z_)return-1/0;if(s===J_)return-0;if(o)throw new Error("Invalid input");if(s in n)return n[s];const a=t[s];if(!a||typeof a!="object")n[s]=a;else if(Array.isArray(a))if(typeof a[0]=="string"){const l=a[0],c=e==null?void 0:e[l];if(c)return n[s]=c(i(a[1]));switch(l){case"Date":n[s]=new Date(a[1]);break;case"Set":const u=new Set;n[s]=u;for(let d=1;d<a.length;d+=1)u.add(i(a[d]));break;case"Map":const h=new Map;n[s]=h;for(let d=1;d<a.length;d+=2)h.set(i(a[d]),i(a[d+1]));break;case"RegExp":n[s]=new RegExp(a[1],a[2]);break;case"Object":n[s]=Object(a[1]);break;case"BigInt":n[s]=BigInt(a[1]);break;case"null":const f=Object.create(null);n[s]=f;for(let d=1;d<a.length;d+=2)f[a[d]]=i(a[d+1]);break;default:throw new Error(`Unknown type ${l}`)}}else{const l=new Array(a.length);n[s]=l;for(let c=0;c<a.length;c+=1){const u=a[c];u!==Y_&&(l[c]=i(u))}}else{const l={};n[s]=l;for(const c in a){const u=a[c];l[c]=i(u)}}return n[s]}return i(0)}const qd=new Set(["load","prerender","csr","ssr","trailingSlash","config"]);[...qd];const Q_=new Set([...qd,"actions"]);[...Q_];function eg(r){return r.filter(e=>e!=null)}const tg="x-sveltekit-invalidated",ar=Xd(Vd)??{},Gs=Xd(Hd)??{};function wl(r){ar[r]=Zs()}function ng(r,e){var we;const t=V_(r),n=r.nodes[0],i=r.nodes[1];n(),i();const s=document.documentElement,o=[],a=[];let l=null;const c={before_navigate:[],after_navigate:[]};let u={branch:[],error:null,url:null},h=!1,f=!1,d=!0,_=!1,m=!1,g=!1,p=!1,y,v=(we=history.state)==null?void 0:we[Kn];v||(v=Date.now(),history.replaceState({...history.state,[Kn]:v},"",location.href));const M=ar[v];M&&(history.scrollRestoration="manual",scrollTo(M.x,M.y));let S,b,w;async function U(){w=w||Promise.resolve(),await w,w=null;const C=new URL(location.href),L=Q(C,!0);l=null;const N=b={},G=L&&await P(L);if(N===b&&G){if(G.type==="redirect")return q(new URL(G.location,C).href,{},[C.pathname],N);G.props.page!==void 0&&(S=G.props.page),y.$set(G.props)}}function x(C){a.some(L=>L==null?void 0:L.snapshot)&&(Gs[C]=a.map(L=>{var N;return(N=L==null?void 0:L.snapshot)==null?void 0:N.capture()}))}function T(C){var L;(L=Gs[C])==null||L.forEach((N,G)=>{var j,D;(D=(j=a[G])==null?void 0:j.snapshot)==null||D.restore(N)})}function H(){wl(v),dh(Vd,ar),x(v),dh(Hd,Gs)}async function q(C,{noScroll:L=!1,replaceState:N=!1,keepFocus:G=!1,state:j={},invalidateAll:D=!1},he,ae){return typeof C=="string"&&(C=new URL(C,ch(document))),ue({url:C,scroll:L?Zs():null,keepfocus:G,redirect_chain:he,details:{state:j,replaceState:N},nav_token:ae,accepted:()=>{D&&(p=!0)},blocked:()=>{},type:"goto"})}async function B(C){return l={id:C.id,promise:P(C).then(L=>(L.type==="loaded"&&L.state.error&&(l=null),L))},l.promise}async function k(...C){const N=t.filter(G=>C.some(j=>G.exec(j))).map(G=>Promise.all([...G.layouts,G.leaf].map(j=>j==null?void 0:j[1]())));await Promise.all(N)}function W(C){var G;u=C.state;const L=document.querySelector("style[data-sveltekit]");L&&L.remove(),S=C.props.page,y=new r.root({target:e,props:{...C.props,stores:xi,components:a},hydrate:!0}),T(v);const N={from:null,to:{params:u.params,route:{id:((G=u.route)==null?void 0:G.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter"};c.after_navigate.forEach(j=>j(N)),f=!0}async function te({url:C,params:L,branch:N,status:G,error:j,route:D,form:he}){let ae="never";for(const K of N)(K==null?void 0:K.slash)!==void 0&&(ae=K.slash);C.pathname=b_(C.pathname,ae),C.search=C.search;const Me={type:"loaded",state:{url:C,params:L,branch:N,error:j,route:D},props:{constructors:eg(N).map(K=>K.node.component)}};he!==void 0&&(Me.props.form=he);let ge={},R=!S,E=0;for(let K=0;K<Math.max(N.length,u.branch.length);K+=1){const Z=N[K],oe=u.branch[K];(Z==null?void 0:Z.data)!==(oe==null?void 0:oe.data)&&(R=!0),Z&&(ge={...ge,...Z.data},R&&(Me.props[`data_${E}`]=ge),E+=1)}return(!u.url||C.href!==u.url.href||u.error!==j||he!==void 0&&he!==S.form||R)&&(Me.props.page={error:j,params:L,route:{id:(D==null?void 0:D.id)??null},status:G,url:new URL(C),form:he??null,data:R?ge:S.data}),Me}async function $({loader:C,parent:L,url:N,params:G,route:j,server_data_node:D}){var ge,R,E;let he=null;const ae={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},Me=await C();if((ge=Me.universal)!=null&&ge.load){let Y=function(...Z){for(const oe of Z){const{href:ve}=new URL(oe,N);ae.dependencies.add(ve)}};const K={route:{get id(){return ae.route=!0,j.id}},params:new Proxy(G,{get:(Z,oe)=>(ae.params.add(oe),Z[oe])}),data:(D==null?void 0:D.data)??null,url:R_(N,()=>{ae.url=!0}),async fetch(Z,oe){let ve;Z instanceof Request?(ve=Z.url,oe={body:Z.method==="GET"||Z.method==="HEAD"?void 0:await Z.blob(),cache:Z.cache,credentials:Z.credentials,headers:Z.headers,integrity:Z.integrity,keepalive:Z.keepalive,method:Z.method,mode:Z.mode,redirect:Z.redirect,referrer:Z.referrer,referrerPolicy:Z.referrerPolicy,signal:Z.signal,...oe}):ve=Z;const xe=new URL(ve,N);return Y(xe.href),xe.origin===N.origin&&(ve=xe.href.slice(N.origin.length)),f?F_(ve,xe.href,oe):O_(ve,oe)},setHeaders:()=>{},depends:Y,parent(){return ae.parent=!0,L()}};he=await Me.universal.load.call(null,K)??null,he=he?await X_(he):null}return{node:Me,loader:C,server:D,universal:(R=Me.universal)!=null&&R.load?{type:"data",data:he,uses:ae}:null,data:he??(D==null?void 0:D.data)??null,slash:((E=Me.universal)==null?void 0:E.trailingSlash)??(D==null?void 0:D.slash)}}function J(C,L,N,G,j){if(p)return!0;if(!G)return!1;if(G.parent&&C||G.route&&L||G.url&&N)return!0;for(const D of G.params)if(j[D]!==u.params[D])return!0;for(const D of G.dependencies)if(o.some(he=>he(new URL(D))))return!0;return!1}function ne(C,L){return(C==null?void 0:C.type)==="data"?C:(C==null?void 0:C.type)==="skip"?L??null:null}async function P({id:C,invalidating:L,url:N,params:G,route:j}){if((l==null?void 0:l.id)===C)return l.promise;const{errors:D,layouts:he,leaf:ae}=j,Me=[...he,ae];D.forEach(V=>V==null?void 0:V().catch(()=>{})),Me.forEach(V=>V==null?void 0:V[1]().catch(()=>{}));let ge=null;const R=u.url?C!==u.url.pathname+u.url.search:!1,E=u.route?j.id!==u.route.id:!1;let Y=!1;const K=Me.map((V,me)=>{var Ee;const ye=u.branch[me],Te=!!(V!=null&&V[0])&&((ye==null?void 0:ye.loader)!==V[1]||J(Y,E,R,(Ee=ye.server)==null?void 0:Ee.uses,G));return Te&&(Y=!0),Te});if(K.some(Boolean)){try{ge=await mh(N,K)}catch(V){return _e({status:V instanceof Js?V.status:500,error:await ce(V,{url:N,params:G,route:{id:j.id}}),url:N,route:j})}if(ge.type==="redirect")return ge}const Z=ge==null?void 0:ge.nodes;let oe=!1;const ve=Me.map(async(V,me)=>{var Ue;if(!V)return;const ye=u.branch[me],Te=Z==null?void 0:Z[me];if((!Te||Te.type==="skip")&&V[1]===(ye==null?void 0:ye.loader)&&!J(oe,E,R,(Ue=ye.universal)==null?void 0:Ue.uses,G))return ye;if(oe=!0,(Te==null?void 0:Te.type)==="error")throw Te;return $({loader:V[1],url:N,params:G,route:j,parent:async()=>{var Pe;const We={};for(let nt=0;nt<me;nt+=1)Object.assign(We,(Pe=await ve[nt])==null?void 0:Pe.data);return We},server_data_node:ne(Te===void 0&&V[0]?{type:"skip"}:Te??null,V[0]?ye==null?void 0:ye.server:void 0)})});for(const V of ve)V.catch(()=>{});const xe=[];for(let V=0;V<Me.length;V+=1)if(Me[V])try{xe.push(await ve[V])}catch(me){if(me instanceof ph)return{type:"redirect",location:me.location};let ye=500,Te;if(Z!=null&&Z.includes(me))ye=me.status??ye,Te=me.error;else if(me instanceof Js)ye=me.status,Te=me.body;else{if(await xi.updated.check())return await Ce(N);Te=await ce(me,{params:G,url:N,route:{id:j.id}})}const Ee=await pe(V,xe,D);return Ee?await te({url:N,params:G,branch:xe.slice(0,Ee.idx).concat(Ee.node),status:ye,error:Te,route:j}):await I(N,{id:j.id},Te,ye)}else xe.push(void 0);return await te({url:N,params:G,branch:xe,status:200,error:null,route:j,form:L?void 0:null})}async function pe(C,L,N){for(;C--;)if(N[C]){let G=C;for(;!L[G];)G-=1;try{return{idx:G+1,node:{node:await N[C](),loader:N[C],data:{},server:null,universal:null}}}catch{continue}}}async function _e({status:C,error:L,url:N,route:G}){const j={};let D=null;if(r.server_loads[0]===0)try{const ge=await mh(N,[!0]);if(ge.type!=="data"||ge.nodes[0]&&ge.nodes[0].type!=="data")throw 0;D=ge.nodes[0]??null}catch{(N.origin!==location.origin||N.pathname!==location.pathname||h)&&await Ce(N)}const ae=await $({loader:n,url:N,params:j,route:G,parent:()=>Promise.resolve({}),server_data_node:ne(D)}),Me={node:await i(),loader:i,universal:null,server:null,data:null};return await te({url:N,params:j,branch:[ae,Me],status:C,error:L,route:null})}function Q(C,L){if(Uo(C,Fi))return;const N=re(C);for(const G of t){const j=G.exec(N);if(j)return{id:C.pathname+C.search,invalidating:L,route:G,params:w_(j),url:C}}}function re(C){return T_(C.pathname.slice(Fi.length)||"/")}function de({url:C,type:L,intent:N,delta:G}){var ae,Me;let j=!1;const D={from:{params:u.params,route:{id:((ae=u.route)==null?void 0:ae.id)??null},url:u.url},to:{params:(N==null?void 0:N.params)??null,route:{id:((Me=N==null?void 0:N.route)==null?void 0:Me.id)??null},url:C},willUnload:!N,type:L};G!==void 0&&(D.delta=G);const he={...D,cancel:()=>{j=!0}};return m||c.before_navigate.forEach(ge=>ge(he)),j?null:D}async function ue({url:C,scroll:L,keepfocus:N,redirect_chain:G,details:j,type:D,delta:he,nav_token:ae={},accepted:Me,blocked:ge}){var ve,xe,V;const R=Q(C,!1),E=de({url:C,type:D,delta:he,intent:R});if(!E){ge();return}const Y=v;Me(),m=!0,f&&xi.navigating.set(E),b=ae;let K=R&&await P(R);if(!K){if(Uo(C,Fi))return await Ce(C);K=await I(C,{id:null},await ce(new Error(`Not found: ${C.pathname}`),{url:C,params:{},route:{id:null}}),404)}if(C=(R==null?void 0:R.url)||C,b!==ae)return!1;if(K.type==="redirect")if(G.length>10||G.includes(C.pathname))K=await _e({status:500,error:await ce(new Error("Redirect loop"),{url:C,params:{},route:{id:null}}),url:C,route:{id:null}});else return q(new URL(K.location,C).href,{},[...G,C.pathname],ae),!1;else((ve=K.props.page)==null?void 0:ve.status)>=400&&await xi.updated.check()&&await Ce(C);if(o.length=0,p=!1,_=!0,wl(Y),x(Y),(xe=K.props.page)!=null&&xe.url&&K.props.page.url.pathname!==C.pathname&&(C.pathname=(V=K.props.page)==null?void 0:V.url.pathname),j){const me=j.replaceState?0:1;if(j.state[Kn]=v+=me,history[j.replaceState?"replaceState":"pushState"](j.state,"",C),!j.replaceState){let ye=v+1;for(;Gs[ye]||ar[ye];)delete Gs[ye],delete ar[ye],ye+=1}}l=null,f?(u=K.state,K.props.page&&(K.props.page.url=C),y.$set(K.props)):W(K);const{activeElement:Z}=document;if(await Sl(),d){const me=C.hash&&document.getElementById(decodeURIComponent(C.hash.slice(1)));L?scrollTo(L.x,L.y):me?me.scrollIntoView():scrollTo(0,0)}const oe=document.activeElement!==Z&&document.activeElement!==document.body;!N&&!oe&&Al(),d=!0,K.props.page&&(S=K.props.page),m=!1,D==="popstate"&&T(v),c.after_navigate.forEach(me=>me(E)),xi.navigating.set(null),_=!1}async function I(C,L,N,G){return C.origin===location.origin&&C.pathname===location.pathname&&!h?await _e({status:G,error:N,url:C,route:L}):await Ce(C)}function Ce(C){return location.href=C.href,new Promise(()=>{})}function ke(){let C;s.addEventListener("mousemove",D=>{const he=D.target;clearTimeout(C),C=setTimeout(()=>{G(he,2)},20)});function L(D){G(D.composedPath()[0],1)}s.addEventListener("mousedown",L),s.addEventListener("touchstart",L,{passive:!0});const N=new IntersectionObserver(D=>{for(const he of D)he.isIntersecting&&(k(re(new URL(he.target.href))),N.unobserve(he.target))},{threshold:0});function G(D,he){const ae=hh(D,s);if(!ae)return;const{url:Me,external:ge,download:R}=bl(ae,Fi);if(ge||R)return;const E=Wa(ae);if(!E.reload)if(he<=E.preload_data){const Y=Q(Me,!1);Y&&B(Y)}else he<=E.preload_code&&k(re(Me))}function j(){N.disconnect();for(const D of s.querySelectorAll("a")){const{url:he,external:ae,download:Me}=bl(D,Fi);if(ae||Me)continue;const ge=Wa(D);ge.reload||(ge.preload_code===Yo.viewport&&N.observe(D),ge.preload_code===Yo.eager&&k(re(he)))}}c.after_navigate.push(j),j()}function ce(C,L){return C instanceof Js?C.body:r.hooks.handleError({error:C,event:L})??{message:L.route.id!=null?"Internal Error":"Not Found"}}return{after_navigate:C=>{ah(()=>(c.after_navigate.push(C),()=>{const L=c.after_navigate.indexOf(C);c.after_navigate.splice(L,1)}))},before_navigate:C=>{ah(()=>(c.before_navigate.push(C),()=>{const L=c.before_navigate.indexOf(C);c.before_navigate.splice(L,1)}))},disable_scroll_handling:()=>{(_||!f)&&(d=!1)},goto:(C,L={})=>q(C,L,[]),invalidate:C=>{if(typeof C=="function")o.push(C);else{const{href:L}=new URL(C,location.href);o.push(N=>N.href===L)}return U()},invalidate_all:()=>(p=!0,U()),preload_data:async C=>{const L=new URL(C,ch(document)),N=Q(L,!1);if(!N)throw new Error(`Attempted to preload a URL that does not belong to this app: ${L}`);await B(N)},preload_code:k,apply_action:async C=>{if(C.type==="error"){const L=new URL(location.href),{branch:N,route:G}=u;if(!G)return;const j=await pe(u.branch.length,N,G.errors);if(j){const D=await te({url:L,params:u.params,branch:N.slice(0,j.idx).concat(j.node),status:C.status??500,error:C.error,route:G});u=D.state,y.$set(D.props),Sl().then(Al)}}else C.type==="redirect"?q(C.location,{invalidateAll:!0},[]):(y.$set({form:null,page:{...S,form:C.data,status:C.status}}),await Sl(),y.$set({form:C.data}),C.type==="success"&&Al())},_start_router:()=>{var C;history.scrollRestoration="manual",addEventListener("beforeunload",L=>{var G;let N=!1;if(H(),!m){const j={from:{params:u.params,route:{id:((G=u.route)==null?void 0:G.id)??null},url:u.url},to:null,willUnload:!0,type:"leave",cancel:()=>N=!0};c.before_navigate.forEach(D=>D(j))}N?(L.preventDefault(),L.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&H()}),(C=navigator.connection)!=null&&C.saveData||ke(),s.addEventListener("click",L=>{if(L.button||L.which!==1||L.metaKey||L.ctrlKey||L.shiftKey||L.altKey||L.defaultPrevented)return;const N=hh(L.composedPath()[0],s);if(!N)return;const{url:G,external:j,target:D,download:he}=bl(N,Fi);if(!G)return;if(D==="_parent"||D==="_top"){if(window.parent!==window)return}else if(D&&D!=="_self")return;const ae=Wa(N);if(!(N instanceof SVGAElement)&&G.protocol!==location.protocol&&!(G.protocol==="https:"||G.protocol==="http:")||he)return;if(j||ae.reload){de({url:G,type:"link"})?m=!0:L.preventDefault();return}const[ge,R]=G.href.split("#");if(R!==void 0&&ge===location.href.split("#")[0]){if(g=!0,wl(v),u.url=G,xi.page.set({...S,url:G}),xi.page.notify(),!ae.replace_state)return;g=!1,L.preventDefault()}ue({url:G,scroll:ae.noscroll?Zs():null,keepfocus:ae.keep_focus??!1,redirect_chain:[],details:{state:{},replaceState:ae.replace_state??G.href===location.href},accepted:()=>L.preventDefault(),blocked:()=>L.preventDefault(),type:"link"})}),s.addEventListener("submit",L=>{if(L.defaultPrevented)return;const N=HTMLFormElement.prototype.cloneNode.call(L.target),G=L.submitter;if(((G==null?void 0:G.formMethod)||N.method)!=="get")return;const D=new URL((G==null?void 0:G.hasAttribute("formaction"))&&(G==null?void 0:G.formAction)||N.action);if(Uo(D,Fi))return;const he=L.target,{keep_focus:ae,noscroll:Me,reload:ge,replace_state:R}=Wa(he);if(ge)return;L.preventDefault(),L.stopPropagation();const E=new FormData(he),Y=G==null?void 0:G.getAttribute("name");Y&&E.append(Y,(G==null?void 0:G.getAttribute("value"))??""),D.search=new URLSearchParams(E).toString(),ue({url:D,scroll:Me?Zs():null,keepfocus:ae??!1,redirect_chain:[],details:{state:{},replaceState:R??D.href===location.href},nav_token:{},accepted:()=>{},blocked:()=>{},type:"form"})}),addEventListener("popstate",async L=>{var N;if((N=L.state)!=null&&N[Kn]){if(L.state[Kn]===v)return;const G=ar[L.state[Kn]];if(u.url.href.split("#")[0]===location.href.split("#")[0]){ar[v]=Zs(),v=L.state[Kn],scrollTo(G.x,G.y);return}const j=L.state[Kn]-v;await ue({url:new URL(location.href),scroll:G,keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{v=L.state[Kn]},blocked:()=>{history.go(-j)},type:"popstate",delta:j})}}),addEventListener("hashchange",()=>{g&&(g=!1,history.replaceState({...history.state,[Kn]:++v},"",location.href))});for(const L of document.querySelectorAll("link"))L.rel==="icon"&&(L.href=L.href);addEventListener("pageshow",L=>{L.persisted&&xi.navigating.set(null)})},_hydrate:async({status:C=200,error:L,node_ids:N,params:G,route:j,data:D,form:he})=>{h=!0;const ae=new URL(location.href);({params:G={},route:j={id:null}}=Q(ae,!1)||{});let Me;try{const ge=N.map(async(Y,K)=>{const Z=D[K];return Z!=null&&Z.uses&&(Z.uses=Yd(Z.uses)),$({loader:r.nodes[Y],url:ae,params:G,route:j,parent:async()=>{const oe={};for(let ve=0;ve<K;ve+=1)Object.assign(oe,(await ge[ve]).data);return oe},server_data_node:ne(Z)})}),R=await Promise.all(ge),E=t.find(({id:Y})=>Y===j.id);if(E){const Y=E.layouts;for(let K=0;K<Y.length;K++)Y[K]||R.splice(K,0,void 0)}Me=await te({url:ae,params:G,branch:R,status:C,error:L,form:he,route:E??null})}catch(ge){if(ge instanceof ph){await Ce(new URL(ge.location,location.href));return}Me=await _e({status:ge instanceof Js?ge.status:500,error:await ce(ge,{url:ae,params:G,route:j}),url:ae,route:j})}W(Me)}}}async function mh(r,e){const t=new URL(r);t.pathname=L_(r.pathname),t.searchParams.append(tg,e.map(i=>i?"1":"0").join(""));const n=await cl(t.href);if(!n.ok)throw new Js(n.status,await n.json());return new Promise(async i=>{var u;const s=new Map,o=n.body.getReader(),a=new TextDecoder;function l(h){return K_(h,{Promise:f=>new Promise((d,_)=>{s.set(f,{fulfil:d,reject:_})})})}let c="";for(;;){const{done:h,value:f}=await o.read();if(h&&!c)break;for(c+=!f&&c?`
`:a.decode(f);;){const d=c.indexOf(`
`);if(d===-1)break;const _=JSON.parse(c.slice(0,d));if(c=c.slice(d+1),_.type==="redirect")return i(_);if(_.type==="data")(u=_.nodes)==null||u.forEach(m=>{(m==null?void 0:m.type)==="data"&&(m.uses=Yd(m.uses),m.data=l(m.data))}),i(_);else if(_.type==="chunk"){const{id:m,data:g,error:p}=_,y=s.get(m);s.delete(m),p?y.reject(l(p)):y.fulfil(l(g))}}}})}function Yd(r){return{dependencies:new Set((r==null?void 0:r.dependencies)??[]),params:new Set((r==null?void 0:r.params)??[]),parent:!!(r!=null&&r.parent),route:!!(r!=null&&r.route),url:!!(r!=null&&r.url)}}function Al(){const r=document.querySelector("[autofocus]");if(r)r.focus();else{const e=document.body,t=e.getAttribute("tabindex");e.tabIndex=-1,e.focus({preventScroll:!0,focusVisible:!1}),t!==null?e.setAttribute("tabindex",t):e.removeAttribute("tabindex");const n=getSelection();if(n&&n.type!=="None"){const i=[];for(let s=0;s<n.rangeCount;s+=1)i.push(n.getRangeAt(s));setTimeout(()=>{if(n.rangeCount===i.length){for(let s=0;s<n.rangeCount;s+=1){const o=i[s],a=n.getRangeAt(s);if(o.commonAncestorContainer!==a.commonAncestorContainer||o.startContainer!==a.startContainer||o.endContainer!==a.endContainer||o.startOffset!==a.startOffset||o.endOffset!==a.endOffset)return}n.removeAllRanges()}})}}}async function jb(r,e,t){const n=ng(r,e);W_({client:n}),t?await n._hydrate(t):n.goto(location.href,{replaceState:!0}),n._start_router()}function ig(r){let e;const t=r[1].default,n=r_(t,r,r[0],null);return{c(){n&&n.c()},l(i){n&&n.l(i)},m(i,s){n&&n.m(i,s),e=!0},p(i,[s]){n&&n.p&&(!e||s&1)&&a_(n,t,i,i[0],e?s_(t,i[0],s,null):o_(i[0]),null)},i(i){e||(zd(n,i),e=!0)},o(i){x_(n,i),e=!1},d(i){n&&n.d(i)}}}function rg(r,e,t){let{$$slots:n={},$$scope:i}=e;return r.$$set=s=>{"$$scope"in s&&t(0,i=s.$$scope)},[i,n]}class Zb extends Gd{constructor(e){super(),kd(this,e,rg,ig,_u,{})}}const sg=()=>{const r=xi;return{page:{subscribe:r.page.subscribe},navigating:{subscribe:r.navigating.subscribe},updated:r.updated}},ag={subscribe(r){return sg().page.subscribe(r)}};function og(r){var l;let e,t=r[0].status+"",n,i,s,o=((l=r[0].error)==null?void 0:l.message)+"",a;return{c(){e=Cc("h1"),n=Ea(t),i=d_(),s=Cc("p"),a=Ea(o)},l(c){e=rh(c,"H1",{});var u=Pc(e);n=Lc(u,t),u.forEach(is),i=__(c),s=rh(c,"P",{});var h=Pc(s);a=Lc(h,o),h.forEach(is)},m(c,u){Ml(c,e,u),Rc(e,n),Ml(c,i,u),Ml(c,s,u),Rc(s,a)},p(c,[u]){var h;u&1&&t!==(t=c[0].status+"")&&sh(n,t),u&1&&o!==(o=((h=c[0].error)==null?void 0:h.message)+"")&&sh(a,o)},i:wi,o:wi,d(c){c&&is(e),c&&is(i),c&&is(s)}}}function lg(r,e,t){let n;return i_(r,ag,i=>t(0,n=i)),[n]}let Jb=class extends Gd{constructor(e){super(),kd(this,e,lg,og,_u,{})}};/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const yu="152",cg=0,_h=1,ug=2,$d=1,hg=2,yi=3,Ci=0,ln=1,Ei=2,Xi=0,ms=1,gh=2,vh=3,xh=4,fg=5,ss=100,dg=101,pg=102,yh=103,Mh=104,mg=200,_g=201,gg=202,vg=203,jd=204,Zd=205,xg=206,yg=207,Mg=208,Sg=209,Eg=210,bg=0,Tg=1,wg=2,Ic=3,Ag=4,Rg=5,Cg=6,Pg=7,Mu=0,Lg=1,Dg=2,Ai=0,Ug=1,Ig=2,Ng=3,Og=4,Fg=5,Jd=300,bs=301,Ts=302,Nc=303,Oc=304,ul=306,$o=1e3,Yn=1001,Fc=1002,en=1003,Sh=1004,Rl=1005,Pn=1006,Bg=1007,Ta=1008,wr=1009,zg=1010,kg=1011,Kd=1012,Gg=1013,dr=1014,pr=1015,wa=1016,Hg=1017,Vg=1018,_s=1020,Wg=1021,$n=1023,Xg=1024,qg=1025,gr=1026,ws=1027,Yg=1028,$g=1029,jg=1030,Zg=1031,Jg=1033,Cl=33776,Pl=33777,Ll=33778,Dl=33779,Eh=35840,bh=35841,Th=35842,wh=35843,Kg=36196,Ah=37492,Rh=37496,Ch=37808,Ph=37809,Lh=37810,Dh=37811,Uh=37812,Ih=37813,Nh=37814,Oh=37815,Fh=37816,Bh=37817,zh=37818,kh=37819,Gh=37820,Hh=37821,Ul=36492,Qg=36283,Vh=36284,Wh=36285,Xh=36286,Qd=3e3,vr=3001,e0=3200,t0=3201,ep=0,n0=1,xr="",je="srgb",li="srgb-linear",tp="display-p3",Il=7680,i0=519,qh=35044,Yh="300 es",Bc=1035;class Os{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const Ht=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Nl=Math.PI/180,zc=180/Math.PI;function Fs(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ht[r&255]+Ht[r>>8&255]+Ht[r>>16&255]+Ht[r>>24&255]+"-"+Ht[e&255]+Ht[e>>8&255]+"-"+Ht[e>>16&15|64]+Ht[e>>24&255]+"-"+Ht[t&63|128]+Ht[t>>8&255]+"-"+Ht[t>>16&255]+Ht[t>>24&255]+Ht[n&255]+Ht[n>>8&255]+Ht[n>>16&255]+Ht[n>>24&255]).toLowerCase()}function Xt(r,e,t){return Math.max(e,Math.min(t,r))}function r0(r,e){return(r%e+e)%e}function Ol(r,e,t){return(1-t)*r+t*e}function $h(r){return(r&r-1)===0&&r!==0}function s0(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Xa(r,e){switch(e.constructor){case Float32Array:return r;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function mn(r,e){switch(e.constructor){case Float32Array:return r;case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class Ae{constructor(e=0,t=0){Ae.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class it{constructor(){it.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],d=n[5],_=n[8],m=i[0],g=i[3],p=i[6],y=i[1],v=i[4],M=i[7],S=i[2],b=i[5],w=i[8];return s[0]=o*m+a*y+l*S,s[3]=o*g+a*v+l*b,s[6]=o*p+a*M+l*w,s[1]=c*m+u*y+h*S,s[4]=c*g+u*v+h*b,s[7]=c*p+u*M+h*w,s[2]=f*m+d*y+_*S,s[5]=f*g+d*v+_*b,s[8]=f*p+d*M+_*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,f=a*l-u*s,d=c*s-o*l,_=t*h+n*f+i*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const m=1/_;return e[0]=h*m,e[1]=(i*c-u*n)*m,e[2]=(a*n-i*o)*m,e[3]=f*m,e[4]=(u*t-i*l)*m,e[5]=(i*s-a*t)*m,e[6]=d*m,e[7]=(n*l-c*t)*m,e[8]=(o*t-n*s)*m,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Fl.makeScale(e,t)),this}rotate(e){return this.premultiply(Fl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Fl.makeTranslation(e,t)),this}makeTranslation(e,t){return this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Fl=new it;function np(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Aa(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}const jh={};function ca(r){r in jh||(jh[r]=!0,console.warn(r))}function gs(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Bl(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const a0=new it().fromArray([.8224621,.0331941,.0170827,.177538,.9668058,.0723974,-1e-7,1e-7,.9105199]),o0=new it().fromArray([1.2249401,-.0420569,-.0196376,-.2249404,1.0420571,-.0786361,1e-7,0,1.0982735]);function l0(r){return r.convertSRGBToLinear().applyMatrix3(o0)}function c0(r){return r.applyMatrix3(a0).convertLinearToSRGB()}const u0={[li]:r=>r,[je]:r=>r.convertSRGBToLinear(),[tp]:l0},h0={[li]:r=>r,[je]:r=>r.convertLinearToSRGB(),[tp]:c0},zn={enabled:!0,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(r){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!r},get workingColorSpace(){return li},set workingColorSpace(r){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=u0[e],i=h0[t];if(n===void 0||i===void 0)throw new Error(`Unsupported color space conversion, "${e}" to "${t}".`);return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this.workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this.workingColorSpace)}};let Br;class ip{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Br===void 0&&(Br=Aa("canvas")),Br.width=e.width,Br.height=e.height;const n=Br.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Br}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Aa("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=gs(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(gs(t[n]/255)*255):t[n]=gs(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}class rp{constructor(e=null){this.isSource=!0,this.uuid=Fs(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(zl(i[o].image)):s.push(zl(i[o]))}else s=zl(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function zl(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?ip.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let f0=0;class cn extends Os{constructor(e=cn.DEFAULT_IMAGE,t=cn.DEFAULT_MAPPING,n=Yn,i=Yn,s=Pn,o=Ta,a=$n,l=wr,c=cn.DEFAULT_ANISOTROPY,u=xr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:f0++}),this.uuid=Fs(),this.name="",this.source=new rp(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ae(0,0),this.repeat=new Ae(1,1),this.center=new Ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new it,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(ca("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===vr?je:xr),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Jd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case $o:e.x=e.x-Math.floor(e.x);break;case Yn:e.x=e.x<0?0:1;break;case Fc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case $o:e.y=e.y-Math.floor(e.y);break;case Yn:e.y=e.y<0?0:1;break;case Fc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ca("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===je?vr:Qd}set encoding(e){ca("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===vr?je:xr}}cn.DEFAULT_IMAGE=null;cn.DEFAULT_MAPPING=Jd;cn.DEFAULT_ANISOTROPY=1;class pt{constructor(e=0,t=0,n=0,i=1){pt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],_=l[9],m=l[2],g=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-m)<.01&&Math.abs(_-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+m)<.1&&Math.abs(_+g)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,M=(d+1)/2,S=(p+1)/2,b=(u+f)/4,w=(h+m)/4,U=(_+g)/4;return v>M&&v>S?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=b/n,s=w/n):M>S?M<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(M),n=b/i,s=U/i):S<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(S),n=w/s,i=U/s),this.set(n,i,s,t),this}let y=Math.sqrt((g-_)*(g-_)+(h-m)*(h-m)+(f-u)*(f-u));return Math.abs(y)<.001&&(y=1),this.x=(g-_)/y,this.y=(h-m)/y,this.z=(f-u)/y,this.w=Math.acos((c+d+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ar extends Os{constructor(e=1,t=1,n={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t);const i={width:e,height:t,depth:1};n.encoding!==void 0&&(ca("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===vr?je:xr),this.texture=new cn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Pn,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new rp(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class sp extends cn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=en,this.minFilter=en,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class d0 extends cn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=en,this.minFilter=en,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class za{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3];const f=s[o+0],d=s[o+1],_=s[o+2],m=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=_,e[t+3]=m;return}if(h!==m||l!==f||c!==d||u!==_){let g=1-a;const p=l*f+c*d+u*_+h*m,y=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const S=Math.sqrt(v),b=Math.atan2(S,p*y);g=Math.sin(g*b)/S,a=Math.sin(a*b)/S}const M=a*y;if(l=l*g+f*M,c=c*g+d*M,u=u*g+_*M,h=h*g+m*M,g===1-a){const S=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=S,c*=S,u*=S,h*=S}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=s[o],f=s[o+1],d=s[o+2],_=s[o+3];return e[t]=a*_+u*h+l*d-c*f,e[t+1]=l*_+u*f+c*h-a*d,e[t+2]=c*_+u*d+a*f-l*h,e[t+3]=u*_-a*h-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),h=a(s/2),f=l(n/2),d=l(i/2),_=l(s/2);switch(o){case"XYZ":this._x=f*u*h+c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h-f*d*_;break;case"YXZ":this._x=f*u*h+c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h+f*d*_;break;case"ZXY":this._x=f*u*h-c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h-f*d*_;break;case"ZYX":this._x=f*u*h-c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h+f*d*_;break;case"YZX":this._x=f*u*h+c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h-f*d*_;break;case"XZY":this._x=f*u*h-c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h+f*d*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-i)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(s+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(s-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-i)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*s+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,t=0,n=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Zh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Zh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=l*t+o*i-a*n,u=l*n+a*t-s*i,h=l*i+s*n-o*t,f=-s*t-o*n-a*i;return this.x=c*l+f*-s+u*-a-h*-o,this.y=u*l+f*-o+h*-s-c*-a,this.z=h*l+f*-a+c*-o-u*-s,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return kl.copy(this).projectOnVector(e),this.sub(kl)}reflect(e){return this.sub(kl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const kl=new F,Zh=new za;class ka{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(di.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(di.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=di.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){if(e.updateWorldMatrix(!1,!1),e.boundingBox!==void 0)e.boundingBox===null&&e.computeBoundingBox(),zr.copy(e.boundingBox),zr.applyMatrix4(e.matrixWorld),this.union(zr);else{const i=e.geometry;if(i!==void 0)if(t&&i.attributes!==void 0&&i.attributes.position!==void 0){const s=i.attributes.position;for(let o=0,a=s.count;o<a;o++)di.fromBufferAttribute(s,o).applyMatrix4(e.matrixWorld),this.expandByPoint(di)}else i.boundingBox===null&&i.computeBoundingBox(),zr.copy(i.boundingBox),zr.applyMatrix4(e.matrixWorld),this.union(zr)}const n=e.children;for(let i=0,s=n.length;i<s;i++)this.expandByObject(n[i],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,di),di.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hs),qa.subVectors(this.max,Hs),kr.subVectors(e.a,Hs),Gr.subVectors(e.b,Hs),Hr.subVectors(e.c,Hs),Ui.subVectors(Gr,kr),Ii.subVectors(Hr,Gr),tr.subVectors(kr,Hr);let t=[0,-Ui.z,Ui.y,0,-Ii.z,Ii.y,0,-tr.z,tr.y,Ui.z,0,-Ui.x,Ii.z,0,-Ii.x,tr.z,0,-tr.x,-Ui.y,Ui.x,0,-Ii.y,Ii.x,0,-tr.y,tr.x,0];return!Gl(t,kr,Gr,Hr,qa)||(t=[1,0,0,0,1,0,0,0,1],!Gl(t,kr,Gr,Hr,qa))?!1:(Ya.crossVectors(Ui,Ii),t=[Ya.x,Ya.y,Ya.z],Gl(t,kr,Gr,Hr,qa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,di).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(di).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const fi=[new F,new F,new F,new F,new F,new F,new F,new F],di=new F,zr=new ka,kr=new F,Gr=new F,Hr=new F,Ui=new F,Ii=new F,tr=new F,Hs=new F,qa=new F,Ya=new F,nr=new F;function Gl(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){nr.fromArray(r,s);const a=i.x*Math.abs(nr.x)+i.y*Math.abs(nr.y)+i.z*Math.abs(nr.z),l=e.dot(nr),c=t.dot(nr),u=n.dot(nr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const p0=new ka,Vs=new F,Hl=new F;class Ga{constructor(e=new F,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):p0.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Vs.subVectors(e,this.center);const t=Vs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Vs,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Hl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Vs.copy(e.center).add(Hl)),this.expandByPoint(Vs.copy(e.center).sub(Hl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const pi=new F,Vl=new F,$a=new F,Ni=new F,Wl=new F,ja=new F,Xl=new F;class Su{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(pi.copy(this.origin).addScaledVector(this.direction,t),pi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Vl.copy(e).add(t).multiplyScalar(.5),$a.copy(t).sub(e).normalize(),Ni.copy(this.origin).sub(Vl);const s=e.distanceTo(t)*.5,o=-this.direction.dot($a),a=Ni.dot(this.direction),l=-Ni.dot($a),c=Ni.lengthSq(),u=Math.abs(1-o*o);let h,f,d,_;if(u>0)if(h=o*l-a,f=o*a-l,_=s*u,h>=0)if(f>=-_)if(f<=_){const m=1/u;h*=m,f*=m,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-_?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c):f<=_?(h=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Vl).addScaledVector($a,f),d}intersectSphere(e,t){pi.subVectors(e.center,this.origin);const n=pi.dot(this.direction),i=pi.dot(pi)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,pi)!==null}intersectTriangle(e,t,n,i,s){Wl.subVectors(t,e),ja.subVectors(n,e),Xl.crossVectors(Wl,ja);let o=this.direction.dot(Xl),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ni.subVectors(this.origin,e);const l=a*this.direction.dot(ja.crossVectors(Ni,ja));if(l<0)return null;const c=a*this.direction.dot(Wl.cross(Ni));if(c<0||l+c>o)return null;const u=-a*Ni.dot(Xl);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vt{constructor(){vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,t,n,i,s,o,a,l,c,u,h,f,d,_,m,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=_,p[11]=m,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Vr.setFromMatrixColumn(e,0).length(),s=1/Vr.setFromMatrixColumn(e,1).length(),o=1/Vr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=o*u,d=o*h,_=a*u,m=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=d+_*c,t[5]=f-m*c,t[9]=-a*l,t[2]=m-f*c,t[6]=_+d*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,d=l*h,_=c*u,m=c*h;t[0]=f+m*a,t[4]=_*a-d,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-_,t[6]=m+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,d=l*h,_=c*u,m=c*h;t[0]=f-m*a,t[4]=-o*h,t[8]=_+d*a,t[1]=d+_*a,t[5]=o*u,t[9]=m-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,d=o*h,_=a*u,m=a*h;t[0]=l*u,t[4]=_*c-d,t[8]=f*c+m,t[1]=l*h,t[5]=m*c+f,t[9]=d*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,d=o*c,_=a*l,m=a*c;t[0]=l*u,t[4]=m-f*h,t[8]=_*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*h+_,t[10]=f-m*h}else if(e.order==="XZY"){const f=o*l,d=o*c,_=a*l,m=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+m,t[5]=o*u,t[9]=d*h-_,t[2]=_*h-d,t[6]=a*u,t[10]=m*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(m0,e,_0)}lookAt(e,t,n){const i=this.elements;return _n.subVectors(e,t),_n.lengthSq()===0&&(_n.z=1),_n.normalize(),Oi.crossVectors(n,_n),Oi.lengthSq()===0&&(Math.abs(n.z)===1?_n.x+=1e-4:_n.z+=1e-4,_n.normalize(),Oi.crossVectors(n,_n)),Oi.normalize(),Za.crossVectors(_n,Oi),i[0]=Oi.x,i[4]=Za.x,i[8]=_n.x,i[1]=Oi.y,i[5]=Za.y,i[9]=_n.y,i[2]=Oi.z,i[6]=Za.z,i[10]=_n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],d=n[13],_=n[2],m=n[6],g=n[10],p=n[14],y=n[3],v=n[7],M=n[11],S=n[15],b=i[0],w=i[4],U=i[8],x=i[12],T=i[1],H=i[5],q=i[9],B=i[13],k=i[2],W=i[6],te=i[10],$=i[14],J=i[3],ne=i[7],P=i[11],pe=i[15];return s[0]=o*b+a*T+l*k+c*J,s[4]=o*w+a*H+l*W+c*ne,s[8]=o*U+a*q+l*te+c*P,s[12]=o*x+a*B+l*$+c*pe,s[1]=u*b+h*T+f*k+d*J,s[5]=u*w+h*H+f*W+d*ne,s[9]=u*U+h*q+f*te+d*P,s[13]=u*x+h*B+f*$+d*pe,s[2]=_*b+m*T+g*k+p*J,s[6]=_*w+m*H+g*W+p*ne,s[10]=_*U+m*q+g*te+p*P,s[14]=_*x+m*B+g*$+p*pe,s[3]=y*b+v*T+M*k+S*J,s[7]=y*w+v*H+M*W+S*ne,s[11]=y*U+v*q+M*te+S*P,s[15]=y*x+v*B+M*$+S*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],d=e[14],_=e[3],m=e[7],g=e[11],p=e[15];return _*(+s*l*h-i*c*h-s*a*f+n*c*f+i*a*d-n*l*d)+m*(+t*l*d-t*c*f+s*o*f-i*o*d+i*c*u-s*l*u)+g*(+t*c*h-t*a*d-s*o*h+n*o*d+s*a*u-n*c*u)+p*(-i*a*u-t*l*h+t*a*f+i*o*h-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],d=e[11],_=e[12],m=e[13],g=e[14],p=e[15],y=h*g*c-m*f*c+m*l*d-a*g*d-h*l*p+a*f*p,v=_*f*c-u*g*c-_*l*d+o*g*d+u*l*p-o*f*p,M=u*m*c-_*h*c+_*a*d-o*m*d-u*a*p+o*h*p,S=_*h*l-u*m*l-_*a*f+o*m*f+u*a*g-o*h*g,b=t*y+n*v+i*M+s*S;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/b;return e[0]=y*w,e[1]=(m*f*s-h*g*s-m*i*d+n*g*d+h*i*p-n*f*p)*w,e[2]=(a*g*s-m*l*s+m*i*c-n*g*c-a*i*p+n*l*p)*w,e[3]=(h*l*s-a*f*s-h*i*c+n*f*c+a*i*d-n*l*d)*w,e[4]=v*w,e[5]=(u*g*s-_*f*s+_*i*d-t*g*d-u*i*p+t*f*p)*w,e[6]=(_*l*s-o*g*s-_*i*c+t*g*c+o*i*p-t*l*p)*w,e[7]=(o*f*s-u*l*s+u*i*c-t*f*c-o*i*d+t*l*d)*w,e[8]=M*w,e[9]=(_*h*s-u*m*s-_*n*d+t*m*d+u*n*p-t*h*p)*w,e[10]=(o*m*s-_*a*s+_*n*c-t*m*c-o*n*p+t*a*p)*w,e[11]=(u*a*s-o*h*s-u*n*c+t*h*c+o*n*d-t*a*d)*w,e[12]=S*w,e[13]=(u*m*i-_*h*i+_*n*f-t*m*f-u*n*g+t*h*g)*w,e[14]=(_*a*i-o*m*i-_*n*l+t*m*l+o*n*g-t*a*g)*w,e[15]=(o*h*i-u*a*i+u*n*l-t*h*l-o*n*f+t*a*f)*w,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,h=a+a,f=s*c,d=s*u,_=s*h,m=o*u,g=o*h,p=a*h,y=l*c,v=l*u,M=l*h,S=n.x,b=n.y,w=n.z;return i[0]=(1-(m+p))*S,i[1]=(d+M)*S,i[2]=(_-v)*S,i[3]=0,i[4]=(d-M)*b,i[5]=(1-(f+p))*b,i[6]=(g+y)*b,i[7]=0,i[8]=(_+v)*w,i[9]=(g-y)*w,i[10]=(1-(f+m))*w,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Vr.set(i[0],i[1],i[2]).length();const o=Vr.set(i[4],i[5],i[6]).length(),a=Vr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],kn.copy(this);const c=1/s,u=1/o,h=1/a;return kn.elements[0]*=c,kn.elements[1]*=c,kn.elements[2]*=c,kn.elements[4]*=u,kn.elements[5]*=u,kn.elements[6]*=u,kn.elements[8]*=h,kn.elements[9]*=h,kn.elements[10]*=h,t.setFromRotationMatrix(kn),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o){const a=this.elements,l=2*s/(t-e),c=2*s/(n-i),u=(t+e)/(t-e),h=(n+i)/(n-i),f=-(o+s)/(o-s),d=-2*o*s/(o-s);return a[0]=l,a[4]=0,a[8]=u,a[12]=0,a[1]=0,a[5]=c,a[9]=h,a[13]=0,a[2]=0,a[6]=0,a[10]=f,a[14]=d,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(e,t,n,i,s,o){const a=this.elements,l=1/(t-e),c=1/(n-i),u=1/(o-s),h=(t+e)*l,f=(n+i)*c,d=(o+s)*u;return a[0]=2*l,a[4]=0,a[8]=0,a[12]=-h,a[1]=0,a[5]=2*c,a[9]=0,a[13]=-f,a[2]=0,a[6]=0,a[10]=-2*u,a[14]=-d,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Vr=new F,kn=new vt,m0=new F(0,0,0),_0=new F(1,1,1),Oi=new F,Za=new F,_n=new F,Jh=new vt,Kh=new za;class hl{constructor(e=0,t=0,n=0,i=hl.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Xt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Jh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Jh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Kh.setFromEuler(this),this.setFromQuaternion(Kh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hl.DEFAULT_ORDER="XYZ";class ap{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let g0=0;const Qh=new F,Wr=new za,mi=new vt,Ja=new F,Ws=new F,v0=new F,x0=new za,ef=new F(1,0,0),tf=new F(0,1,0),nf=new F(0,0,1),y0={type:"added"},rf={type:"removed"};class Ot extends Os{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:g0++}),this.uuid=Fs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ot.DEFAULT_UP.clone();const e=new F,t=new hl,n=new za,i=new F(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new vt},normalMatrix:{value:new it}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=Ot.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new ap,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Wr.setFromAxisAngle(e,t),this.quaternion.multiply(Wr),this}rotateOnWorldAxis(e,t){return Wr.setFromAxisAngle(e,t),this.quaternion.premultiply(Wr),this}rotateX(e){return this.rotateOnAxis(ef,e)}rotateY(e){return this.rotateOnAxis(tf,e)}rotateZ(e){return this.rotateOnAxis(nf,e)}translateOnAxis(e,t){return Qh.copy(e).applyQuaternion(this.quaternion),this.position.add(Qh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ef,e)}translateY(e){return this.translateOnAxis(tf,e)}translateZ(e){return this.translateOnAxis(nf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ja.copy(e):Ja.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mi.lookAt(Ws,Ja,this.up):mi.lookAt(Ja,Ws,this.up),this.quaternion.setFromRotationMatrix(mi),i&&(mi.extractRotation(i.matrixWorld),Wr.setFromRotationMatrix(mi),this.quaternion.premultiply(Wr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(y0)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(rf)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(rf)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),mi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mi.multiply(e.parent.matrixWorld)),e.applyMatrix4(mi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t){let n=[];this[e]===t&&n.push(this);for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectsByProperty(e,t);o.length>0&&(n=n.concat(o))}return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,e,v0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,x0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Ot.DEFAULT_UP=new F(0,1,0);Ot.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Gn=new F,_i=new F,ql=new F,gi=new F,Xr=new F,qr=new F,sf=new F,Yl=new F,$l=new F,jl=new F;let Ka=!1;class Xn{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Gn.subVectors(e,t),i.cross(Gn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Gn.subVectors(i,t),_i.subVectors(n,t),ql.subVectors(e,t);const o=Gn.dot(Gn),a=Gn.dot(_i),l=Gn.dot(ql),c=_i.dot(_i),u=_i.dot(ql),h=o*c-a*a;if(h===0)return s.set(-2,-1,-1);const f=1/h,d=(c*l-a*u)*f,_=(o*u-a*l)*f;return s.set(1-d-_,_,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,gi),gi.x>=0&&gi.y>=0&&gi.x+gi.y<=1}static getUV(e,t,n,i,s,o,a,l){return Ka===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ka=!0),this.getInterpolation(e,t,n,i,s,o,a,l)}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,gi),l.setScalar(0),l.addScaledVector(s,gi.x),l.addScaledVector(o,gi.y),l.addScaledVector(a,gi.z),l}static isFrontFacing(e,t,n,i){return Gn.subVectors(n,t),_i.subVectors(e,t),Gn.cross(_i).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gn.subVectors(this.c,this.b),_i.subVectors(this.a,this.b),Gn.cross(_i).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Xn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Xn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return Ka===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ka=!0),Xn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}getInterpolation(e,t,n,i,s){return Xn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Xn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Xn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Xr.subVectors(i,n),qr.subVectors(s,n),Yl.subVectors(e,n);const l=Xr.dot(Yl),c=qr.dot(Yl);if(l<=0&&c<=0)return t.copy(n);$l.subVectors(e,i);const u=Xr.dot($l),h=qr.dot($l);if(u>=0&&h<=u)return t.copy(i);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Xr,o);jl.subVectors(e,s);const d=Xr.dot(jl),_=qr.dot(jl);if(_>=0&&d<=_)return t.copy(s);const m=d*c-l*_;if(m<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(n).addScaledVector(qr,a);const g=u*_-d*h;if(g<=0&&h-u>=0&&d-_>=0)return sf.subVectors(s,i),a=(h-u)/(h-u+(d-_)),t.copy(i).addScaledVector(sf,a);const p=1/(g+m+f);return o=m*p,a=f*p,t.copy(n).addScaledVector(Xr,o).addScaledVector(qr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let M0=0;class Pi extends Os{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:M0++}),this.uuid=Fs(),this.name="",this.type="Material",this.blending=ms,this.side=Ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=jd,this.blendDst=Zd,this.blendEquation=ss,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Ic,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=i0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Il,this.stencilZFail=Il,this.stencilZPass=Il,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ms&&(n.blending=this.blending),this.side!==Ci&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(n.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const op={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hn={h:0,s:0,l:0},Qa={h:0,s:0,l:0};function Zl(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class rt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,t===void 0&&n===void 0?this.set(e):this.setRGB(e,t,n)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=je){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,zn.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=zn.workingColorSpace){return this.r=e,this.g=t,this.b=n,zn.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=zn.workingColorSpace){if(e=r0(e,1),t=Xt(t,0,1),n=Xt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Zl(o,s,e+1/3),this.g=Zl(o,s,e),this.b=Zl(o,s,e-1/3)}return zn.toWorkingColorSpace(this,i),this}setStyle(e,t=je){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=je){const n=op[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=gs(e.r),this.g=gs(e.g),this.b=gs(e.b),this}copyLinearToSRGB(e){return this.r=Bl(e.r),this.g=Bl(e.g),this.b=Bl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=je){return zn.fromWorkingColorSpace(Vt.copy(this),e),Math.round(Xt(Vt.r*255,0,255))*65536+Math.round(Xt(Vt.g*255,0,255))*256+Math.round(Xt(Vt.b*255,0,255))}getHexString(e=je){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=zn.workingColorSpace){zn.fromWorkingColorSpace(Vt.copy(this),t);const n=Vt.r,i=Vt.g,s=Vt.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-n)/h+2;break;case s:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=zn.workingColorSpace){return zn.fromWorkingColorSpace(Vt.copy(this),t),e.r=Vt.r,e.g=Vt.g,e.b=Vt.b,e}getStyle(e=je){zn.fromWorkingColorSpace(Vt.copy(this),e);const t=Vt.r,n=Vt.g,i=Vt.b;return e!==je?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Hn),Hn.h+=e,Hn.s+=t,Hn.l+=n,this.setHSL(Hn.h,Hn.s,Hn.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Hn),e.getHSL(Qa);const n=Ol(Hn.h,Qa.h,t),i=Ol(Hn.s,Qa.s,t),s=Ol(Hn.l,Qa.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vt=new rt;rt.NAMES=op;class lp extends Pi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Mu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Tt=new F,eo=new Ae;class si{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=qh,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)eo.fromBufferAttribute(this,t),eo.applyMatrix3(e),this.setXY(t,eo.x,eo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix3(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Xa(t,this.array)),t}setX(e,t){return this.normalized&&(t=mn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Xa(t,this.array)),t}setY(e,t){return this.normalized&&(t=mn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Xa(t,this.array)),t}setZ(e,t){return this.normalized&&(t=mn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Xa(t,this.array)),t}setW(e,t){return this.normalized&&(t=mn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=mn(t,this.array),n=mn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=mn(t,this.array),n=mn(n,this.array),i=mn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=mn(t,this.array),n=mn(n,this.array),i=mn(i,this.array),s=mn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==qh&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class cp extends si{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class up extends si{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class zt extends si{constructor(e,t,n){super(new Float32Array(e),t,n)}}let S0=0;const wn=new vt,Jl=new Ot,Yr=new F,gn=new ka,Xs=new ka,Ut=new F;class Fn extends Os{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:S0++}),this.uuid=Fs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(np(e)?up:cp)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new it().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return wn.makeRotationFromQuaternion(e),this.applyMatrix4(wn),this}rotateX(e){return wn.makeRotationX(e),this.applyMatrix4(wn),this}rotateY(e){return wn.makeRotationY(e),this.applyMatrix4(wn),this}rotateZ(e){return wn.makeRotationZ(e),this.applyMatrix4(wn),this}translate(e,t,n){return wn.makeTranslation(e,t,n),this.applyMatrix4(wn),this}scale(e,t,n){return wn.makeScale(e,t,n),this.applyMatrix4(wn),this}lookAt(e){return Jl.lookAt(e),Jl.updateMatrix(),this.applyMatrix4(Jl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yr).negate(),this.translate(Yr.x,Yr.y,Yr.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new zt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ka);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];gn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ga);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new F,1/0);return}if(e){const n=this.boundingSphere.center;if(gn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Xs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ut.addVectors(gn.min,Xs.min),gn.expandByPoint(Ut),Ut.addVectors(gn.max,Xs.max),gn.expandByPoint(Ut)):(gn.expandByPoint(Xs.min),gn.expandByPoint(Xs.max))}gn.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Ut.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Ut));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ut.fromBufferAttribute(a,c),l&&(Yr.fromBufferAttribute(e,c),Ut.add(Yr)),i=Math.max(i,n.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,s=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new si(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let T=0;T<a;T++)c[T]=new F,u[T]=new F;const h=new F,f=new F,d=new F,_=new Ae,m=new Ae,g=new Ae,p=new F,y=new F;function v(T,H,q){h.fromArray(i,T*3),f.fromArray(i,H*3),d.fromArray(i,q*3),_.fromArray(o,T*2),m.fromArray(o,H*2),g.fromArray(o,q*2),f.sub(h),d.sub(h),m.sub(_),g.sub(_);const B=1/(m.x*g.y-g.x*m.y);isFinite(B)&&(p.copy(f).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(B),y.copy(d).multiplyScalar(m.x).addScaledVector(f,-g.x).multiplyScalar(B),c[T].add(p),c[H].add(p),c[q].add(p),u[T].add(y),u[H].add(y),u[q].add(y))}let M=this.groups;M.length===0&&(M=[{start:0,count:n.length}]);for(let T=0,H=M.length;T<H;++T){const q=M[T],B=q.start,k=q.count;for(let W=B,te=B+k;W<te;W+=3)v(n[W+0],n[W+1],n[W+2])}const S=new F,b=new F,w=new F,U=new F;function x(T){w.fromArray(s,T*3),U.copy(w);const H=c[T];S.copy(H),S.sub(w.multiplyScalar(w.dot(H))).normalize(),b.crossVectors(U,H);const B=b.dot(u[T])<0?-1:1;l[T*4]=S.x,l[T*4+1]=S.y,l[T*4+2]=S.z,l[T*4+3]=B}for(let T=0,H=M.length;T<H;++T){const q=M[T],B=q.start,k=q.count;for(let W=B,te=B+k;W<te;W+=3)x(n[W+0]),x(n[W+1]),x(n[W+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new si(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new F,s=new F,o=new F,a=new F,l=new F,c=new F,u=new F,h=new F;if(e)for(let f=0,d=e.count;f<d;f+=3){const _=e.getX(f+0),m=e.getX(f+1),g=e.getX(f+2);i.fromBufferAttribute(t,_),s.fromBufferAttribute(t,m),o.fromBufferAttribute(t,g),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),c.fromBufferAttribute(n,g),a.add(u),l.add(u),c.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(m,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeGeometries() instead."),this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,_=0;for(let m=0,g=l.length;m<g;m++){a.isInterleavedBufferAttribute?d=l[m]*a.data.stride+a.offset:d=l[m]*u;for(let p=0;p<u;p++)f[_++]=c[d++]}return new si(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Fn,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=e(f,n);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const af=new vt,Qn=new Su,to=new Ga,of=new F,$r=new F,jr=new F,Zr=new F,Kl=new F,no=new F,io=new Ae,ro=new Ae,so=new Ae,lf=new F,cf=new F,uf=new F,ao=new F,oo=new F;class ii extends Ot{constructor(e=new Fn,t=new lp){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){no.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(Kl.fromBufferAttribute(h,e),o?no.addScaledVector(Kl,u):no.addScaledVector(Kl.sub(t),u))}t.add(no)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),to.copy(n.boundingSphere),to.applyMatrix4(s),Qn.copy(e.ray).recast(e.near),!(to.containsPoint(Qn.origin)===!1&&(Qn.intersectSphere(to,of)===null||Qn.origin.distanceToSquared(of)>(e.far-e.near)**2))&&(af.copy(s).invert(),Qn.copy(e.ray).applyMatrix4(af),!(n.boundingBox!==null&&Qn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t)))}_computeIntersections(e,t){let n;const i=this.geometry,s=this.material,o=i.index,a=i.attributes.position,l=i.attributes.uv,c=i.attributes.uv1,u=i.attributes.normal,h=i.groups,f=i.drawRange;if(o!==null)if(Array.isArray(s))for(let d=0,_=h.length;d<_;d++){const m=h[d],g=s[m.materialIndex],p=Math.max(m.start,f.start),y=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let v=p,M=y;v<M;v+=3){const S=o.getX(v),b=o.getX(v+1),w=o.getX(v+2);n=lo(this,g,e,Qn,l,c,u,S,b,w),n&&(n.faceIndex=Math.floor(v/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const d=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=d,g=_;m<g;m+=3){const p=o.getX(m),y=o.getX(m+1),v=o.getX(m+2);n=lo(this,s,e,Qn,l,c,u,p,y,v),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}else if(a!==void 0)if(Array.isArray(s))for(let d=0,_=h.length;d<_;d++){const m=h[d],g=s[m.materialIndex],p=Math.max(m.start,f.start),y=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let v=p,M=y;v<M;v+=3){const S=v,b=v+1,w=v+2;n=lo(this,g,e,Qn,l,c,u,S,b,w),n&&(n.faceIndex=Math.floor(v/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const d=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=d,g=_;m<g;m+=3){const p=m,y=m+1,v=m+2;n=lo(this,s,e,Qn,l,c,u,p,y,v),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}}}function E0(r,e,t,n,i,s,o,a){let l;if(e.side===ln?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===Ci,a),l===null)return null;oo.copy(a),oo.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(oo);return c<t.near||c>t.far?null:{distance:c,point:oo.clone(),object:r}}function lo(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,$r),r.getVertexPosition(l,jr),r.getVertexPosition(c,Zr);const u=E0(r,e,t,n,$r,jr,Zr,ao);if(u){i&&(io.fromBufferAttribute(i,a),ro.fromBufferAttribute(i,l),so.fromBufferAttribute(i,c),u.uv=Xn.getInterpolation(ao,$r,jr,Zr,io,ro,so,new Ae)),s&&(io.fromBufferAttribute(s,a),ro.fromBufferAttribute(s,l),so.fromBufferAttribute(s,c),u.uv1=Xn.getInterpolation(ao,$r,jr,Zr,io,ro,so,new Ae),u.uv2=u.uv1),o&&(lf.fromBufferAttribute(o,a),cf.fromBufferAttribute(o,l),uf.fromBufferAttribute(o,c),u.normal=Xn.getInterpolation(ao,$r,jr,Zr,lf,cf,uf,new F),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new F,materialIndex:0};Xn.getNormal($r,jr,Zr,h.normal),u.face=h}return u}class Ha extends Fn{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;_("z","y","x",-1,-1,n,t,e,o,s,0),_("z","y","x",1,-1,n,t,-e,o,s,1),_("x","z","y",1,1,e,n,t,i,o,2),_("x","z","y",1,-1,e,n,-t,i,o,3),_("x","y","z",1,-1,e,t,n,i,s,4),_("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new zt(c,3)),this.setAttribute("normal",new zt(u,3)),this.setAttribute("uv",new zt(h,2));function _(m,g,p,y,v,M,S,b,w,U,x){const T=M/w,H=S/U,q=M/2,B=S/2,k=b/2,W=w+1,te=U+1;let $=0,J=0;const ne=new F;for(let P=0;P<te;P++){const pe=P*H-B;for(let _e=0;_e<W;_e++){const Q=_e*T-q;ne[m]=Q*y,ne[g]=pe*v,ne[p]=k,c.push(ne.x,ne.y,ne.z),ne[m]=0,ne[g]=0,ne[p]=b>0?1:-1,u.push(ne.x,ne.y,ne.z),h.push(_e/w),h.push(1-P/U),$+=1}}for(let P=0;P<U;P++)for(let pe=0;pe<w;pe++){const _e=f+pe+W*P,Q=f+pe+W*(P+1),re=f+(pe+1)+W*(P+1),de=f+(pe+1)+W*P;l.push(_e,Q,de),l.push(Q,re,de),J+=6}a.addGroup(d,J,x),d+=J,f+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ha(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function As(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Kt(r){const e={};for(let t=0;t<r.length;t++){const n=As(r[t]);for(const i in n)e[i]=n[i]}return e}function b0(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function hp(r){return r.getRenderTarget()===null?r.outputColorSpace:li}const T0={clone:As,merge:Kt};var w0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,A0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Rr extends Pi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=w0,this.fragmentShader=A0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=As(e.uniforms),this.uniformsGroups=b0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class fp extends Ot{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Ln extends fp{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=zc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Nl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zc*2*Math.atan(Math.tan(Nl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Nl*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Jr=-90,Kr=1;class R0 extends Ot{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n;const i=new Ln(Jr,Kr,e,t);i.layers=this.layers,i.up.set(0,1,0),i.lookAt(1,0,0),this.add(i);const s=new Ln(Jr,Kr,e,t);s.layers=this.layers,s.up.set(0,1,0),s.lookAt(-1,0,0),this.add(s);const o=new Ln(Jr,Kr,e,t);o.layers=this.layers,o.up.set(0,0,-1),o.lookAt(0,1,0),this.add(o);const a=new Ln(Jr,Kr,e,t);a.layers=this.layers,a.up.set(0,0,1),a.lookAt(0,-1,0),this.add(a);const l=new Ln(Jr,Kr,e,t);l.layers=this.layers,l.up.set(0,1,0),l.lookAt(0,0,1),this.add(l);const c=new Ln(Jr,Kr,e,t);c.layers=this.layers,c.up.set(0,1,0),c.lookAt(0,0,-1),this.add(c)}update(e,t){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[i,s,o,a,l,c]=this.children,u=e.getRenderTarget(),h=e.toneMapping,f=e.xr.enabled;e.toneMapping=Ai,e.xr.enabled=!1;const d=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0),e.render(t,i),e.setRenderTarget(n,1),e.render(t,s),e.setRenderTarget(n,2),e.render(t,o),e.setRenderTarget(n,3),e.render(t,a),e.setRenderTarget(n,4),e.render(t,l),n.texture.generateMipmaps=d,e.setRenderTarget(n,5),e.render(t,c),e.setRenderTarget(u),e.toneMapping=h,e.xr.enabled=f,n.texture.needsPMREMUpdate=!0}}class dp extends cn{constructor(e,t,n,i,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:bs,super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class C0 extends Ar{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(ca("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===vr?je:xr),this.texture=new dp(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Pn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Ha(5,5,5),s=new Rr({name:"CubemapFromEquirect",uniforms:As(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ln,blending:Xi});s.uniforms.tEquirect.value=t;const o=new ii(i,s),a=t.minFilter;return t.minFilter===Ta&&(t.minFilter=Pn),new R0(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}const Ql=new F,P0=new F,L0=new it;class or{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Ql.subVectors(n,t).cross(P0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ql),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||L0.getNormalMatrix(e),i=this.coplanarPoint(Ql).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ir=new Ga,co=new F;class Eu{constructor(e=new or,t=new or,n=new or,i=new or,s=new or,o=new or){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e){const t=this.planes,n=e.elements,i=n[0],s=n[1],o=n[2],a=n[3],l=n[4],c=n[5],u=n[6],h=n[7],f=n[8],d=n[9],_=n[10],m=n[11],g=n[12],p=n[13],y=n[14],v=n[15];return t[0].setComponents(a-i,h-l,m-f,v-g).normalize(),t[1].setComponents(a+i,h+l,m+f,v+g).normalize(),t[2].setComponents(a+s,h+c,m+d,v+p).normalize(),t[3].setComponents(a-s,h-c,m-d,v-p).normalize(),t[4].setComponents(a-o,h-u,m-_,v-y).normalize(),t[5].setComponents(a+o,h+u,m+_,v+y).normalize(),this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ir.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ir.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ir)}intersectsSprite(e){return ir.center.set(0,0,0),ir.radius=.7071067811865476,ir.applyMatrix4(e.matrixWorld),this.intersectsSphere(ir)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(co.x=i.normal.x>0?e.max.x:e.min.x,co.y=i.normal.y>0?e.max.y:e.min.y,co.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(co)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function pp(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function D0(r,e){const t=e.isWebGL2,n=new WeakMap;function i(c,u){const h=c.array,f=c.usage,d=r.createBuffer();r.bindBuffer(u,d),r.bufferData(u,h,f),c.onUploadCallback();let _;if(h instanceof Float32Array)_=r.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=r.UNSIGNED_SHORT;else if(h instanceof Int16Array)_=r.SHORT;else if(h instanceof Uint32Array)_=r.UNSIGNED_INT;else if(h instanceof Int32Array)_=r.INT;else if(h instanceof Int8Array)_=r.BYTE;else if(h instanceof Uint8Array)_=r.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)_=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:d,type:_,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version}}function s(c,u,h){const f=u.array,d=u.updateRange;r.bindBuffer(h,c),d.count===-1?r.bufferSubData(h,0,f):(t?r.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):r.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u&&(r.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h===void 0?n.set(c,i(c,u)):h.version<c.version&&(s(h.buffer,c,u),h.version=c.version)}return{get:o,remove:a,update:l}}class bu extends Fn{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,h=e/a,f=t/l,d=[],_=[],m=[],g=[];for(let p=0;p<u;p++){const y=p*f-o;for(let v=0;v<c;v++){const M=v*h-s;_.push(M,-y,0),m.push(0,0,1),g.push(v/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){const v=y+c*p,M=y+c*(p+1),S=y+1+c*(p+1),b=y+1+c*p;d.push(v,M,b),d.push(M,S,b)}this.setIndex(d),this.setAttribute("position",new zt(_,3)),this.setAttribute("normal",new zt(m,3)),this.setAttribute("uv",new zt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bu(e.width,e.height,e.widthSegments,e.heightSegments)}}var U0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,I0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,N0=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,O0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,F0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,B0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,z0="vec3 transformed = vec3( position );",k0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,G0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,H0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,V0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,W0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,X0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,q0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Y0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,j0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Z0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,J0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,K0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Q0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ev=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,tv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,nv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,iv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sv="gl_FragColor = linearToOutputTexel( gl_FragColor );",av=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ov=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,lv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,cv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,uv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_v=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,gv=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,vv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Mv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Sv=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,Ev=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Tv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,wv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Av=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif`,Rv=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Cv=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Pv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Lv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,Dv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Uv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Iv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Nv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Ov=`#ifdef USE_MAP
	diffuseColor *= texture2D( map, vMapUv );
#endif`,Fv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,zv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Gv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hv=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Wv=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Xv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,qv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#ifdef USE_NORMALMAP_TANGENTSPACE
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal, vNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 geometryNormal = normal;`,Yv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,$v=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Jv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Kv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,Qv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ex=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,tx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,nx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ix=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,rx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ax=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ox=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ux=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,hx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,fx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,dx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,px=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,_x=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,gx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,vx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Mx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Sx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,Ex=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,bx=`#ifdef USE_UV
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Tx=`#ifdef USE_UV
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wx=`#ifdef USE_UV
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ax=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Rx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Px=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Dx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ux=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Ix=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Nx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Ox=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Fx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Bx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,kx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Gx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hx=`#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Vx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Yx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$x=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,jx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Zx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Qx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ey=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ty=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ny=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,iy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ry=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sy=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,ay=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,oy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Ze={alphamap_fragment:U0,alphamap_pars_fragment:I0,alphatest_fragment:N0,alphatest_pars_fragment:O0,aomap_fragment:F0,aomap_pars_fragment:B0,begin_vertex:z0,beginnormal_vertex:k0,bsdfs:G0,iridescence_fragment:H0,bumpmap_pars_fragment:V0,clipping_planes_fragment:W0,clipping_planes_pars_fragment:X0,clipping_planes_pars_vertex:q0,clipping_planes_vertex:Y0,color_fragment:$0,color_pars_fragment:j0,color_pars_vertex:Z0,color_vertex:J0,common:K0,cube_uv_reflection_fragment:Q0,defaultnormal_vertex:ev,displacementmap_pars_vertex:tv,displacementmap_vertex:nv,emissivemap_fragment:iv,emissivemap_pars_fragment:rv,encodings_fragment:sv,encodings_pars_fragment:av,envmap_fragment:ov,envmap_common_pars_fragment:lv,envmap_pars_fragment:cv,envmap_pars_vertex:uv,envmap_physical_pars_fragment:Sv,envmap_vertex:hv,fog_vertex:fv,fog_pars_vertex:dv,fog_fragment:pv,fog_pars_fragment:mv,gradientmap_pars_fragment:_v,lightmap_fragment:gv,lightmap_pars_fragment:vv,lights_lambert_fragment:xv,lights_lambert_pars_fragment:yv,lights_pars_begin:Mv,lights_toon_fragment:Ev,lights_toon_pars_fragment:bv,lights_phong_fragment:Tv,lights_phong_pars_fragment:wv,lights_physical_fragment:Av,lights_physical_pars_fragment:Rv,lights_fragment_begin:Cv,lights_fragment_maps:Pv,lights_fragment_end:Lv,logdepthbuf_fragment:Dv,logdepthbuf_pars_fragment:Uv,logdepthbuf_pars_vertex:Iv,logdepthbuf_vertex:Nv,map_fragment:Ov,map_pars_fragment:Fv,map_particle_fragment:Bv,map_particle_pars_fragment:zv,metalnessmap_fragment:kv,metalnessmap_pars_fragment:Gv,morphcolor_vertex:Hv,morphnormal_vertex:Vv,morphtarget_pars_vertex:Wv,morphtarget_vertex:Xv,normal_fragment_begin:qv,normal_fragment_maps:Yv,normal_pars_fragment:$v,normal_pars_vertex:jv,normal_vertex:Zv,normalmap_pars_fragment:Jv,clearcoat_normal_fragment_begin:Kv,clearcoat_normal_fragment_maps:Qv,clearcoat_pars_fragment:ex,iridescence_pars_fragment:tx,output_fragment:nx,packing:ix,premultiplied_alpha_fragment:rx,project_vertex:sx,dithering_fragment:ax,dithering_pars_fragment:ox,roughnessmap_fragment:lx,roughnessmap_pars_fragment:cx,shadowmap_pars_fragment:ux,shadowmap_pars_vertex:hx,shadowmap_vertex:fx,shadowmask_pars_fragment:dx,skinbase_vertex:px,skinning_pars_vertex:mx,skinning_vertex:_x,skinnormal_vertex:gx,specularmap_fragment:vx,specularmap_pars_fragment:xx,tonemapping_fragment:yx,tonemapping_pars_fragment:Mx,transmission_fragment:Sx,transmission_pars_fragment:Ex,uv_pars_fragment:bx,uv_pars_vertex:Tx,uv_vertex:wx,worldpos_vertex:Ax,background_vert:Rx,background_frag:Cx,backgroundCube_vert:Px,backgroundCube_frag:Lx,cube_vert:Dx,cube_frag:Ux,depth_vert:Ix,depth_frag:Nx,distanceRGBA_vert:Ox,distanceRGBA_frag:Fx,equirect_vert:Bx,equirect_frag:zx,linedashed_vert:kx,linedashed_frag:Gx,meshbasic_vert:Hx,meshbasic_frag:Vx,meshlambert_vert:Wx,meshlambert_frag:Xx,meshmatcap_vert:qx,meshmatcap_frag:Yx,meshnormal_vert:$x,meshnormal_frag:jx,meshphong_vert:Zx,meshphong_frag:Jx,meshphysical_vert:Kx,meshphysical_frag:Qx,meshtoon_vert:ey,meshtoon_frag:ty,points_vert:ny,points_frag:iy,shadow_vert:ry,shadow_frag:sy,sprite_vert:ay,sprite_frag:oy},be={common:{diffuse:{value:new rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new it}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new it}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new it}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new it},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new it},normalScale:{value:new Ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new it},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new it}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new it}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new it}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new it}},sprite:{diffuse:{value:new rt(16777215)},opacity:{value:1},center:{value:new Ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaTest:{value:0}}},ti={basic:{uniforms:Kt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Kt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new rt(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Kt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new rt(0)},specular:{value:new rt(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Kt([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Kt([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new rt(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Kt([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Kt([be.points,be.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Kt([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Kt([be.common,be.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Kt([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Kt([be.sprite,be.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new it},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:Kt([be.common,be.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:Kt([be.lights,be.fog,{color:{value:new rt(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};ti.physical={uniforms:Kt([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new it},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new it},clearcoatNormalScale:{value:new Ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new it},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new it},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new it},sheen:{value:0},sheenColor:{value:new rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new it},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new it},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new it},transmissionSamplerSize:{value:new Ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new it},attenuationDistance:{value:0},attenuationColor:{value:new rt(0)},specularColor:{value:new rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new it},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new it}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const uo={r:0,b:0,g:0};function ly(r,e,t,n,i,s,o){const a=new rt(0);let l=s===!0?0:1,c,u,h=null,f=0,d=null;function _(g,p){let y=!1,v=p.isScene===!0?p.background:null;switch(v&&v.isTexture&&(v=(p.backgroundBlurriness>0?t:e).get(v)),v===null?m(a,l):v&&v.isColor&&(m(v,1),y=!0),r.xr.getEnvironmentBlendMode()){case"opaque":y=!0;break;case"additive":n.buffers.color.setClear(0,0,0,1,o),y=!0;break;case"alpha-blend":n.buffers.color.setClear(0,0,0,0,o),y=!0;break}(r.autoClear||y)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),v&&(v.isCubeTexture||v.mapping===ul)?(u===void 0&&(u=new ii(new Ha(1,1,1),new Rr({name:"BackgroundCubeMaterial",uniforms:As(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(b,w,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=v.colorSpace!==je,(h!==v||f!==v.version||d!==r.toneMapping)&&(u.material.needsUpdate=!0,h=v,f=v.version,d=r.toneMapping),u.layers.enableAll(),g.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new ii(new bu(2,2),new Rr({name:"BackgroundMaterial",uniforms:As(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:Ci,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=v.colorSpace!==je,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||f!==v.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,h=v,f=v.version,d=r.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null))}function m(g,p){g.getRGB(uo,hp(r)),n.buffers.color.setClear(uo.r,uo.g,uo.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(g,p=1){a.set(g),l=p,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(g){l=g,m(a,l)},render:_}}function cy(r,e,t,n){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=g(null);let c=l,u=!1;function h(k,W,te,$,J){let ne=!1;if(o){const P=m($,te,W);c!==P&&(c=P,d(c.object)),ne=p(k,$,te,J),ne&&y(k,$,te,J)}else{const P=W.wireframe===!0;(c.geometry!==$.id||c.program!==te.id||c.wireframe!==P)&&(c.geometry=$.id,c.program=te.id,c.wireframe=P,ne=!0)}J!==null&&t.update(J,r.ELEMENT_ARRAY_BUFFER),(ne||u)&&(u=!1,U(k,W,te,$),J!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(J).buffer))}function f(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function d(k){return n.isWebGL2?r.bindVertexArray(k):s.bindVertexArrayOES(k)}function _(k){return n.isWebGL2?r.deleteVertexArray(k):s.deleteVertexArrayOES(k)}function m(k,W,te){const $=te.wireframe===!0;let J=a[k.id];J===void 0&&(J={},a[k.id]=J);let ne=J[W.id];ne===void 0&&(ne={},J[W.id]=ne);let P=ne[$];return P===void 0&&(P=g(f()),ne[$]=P),P}function g(k){const W=[],te=[],$=[];for(let J=0;J<i;J++)W[J]=0,te[J]=0,$[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:te,attributeDivisors:$,object:k,attributes:{},index:null}}function p(k,W,te,$){const J=c.attributes,ne=W.attributes;let P=0;const pe=te.getAttributes();for(const _e in pe)if(pe[_e].location>=0){const re=J[_e];let de=ne[_e];if(de===void 0&&(_e==="instanceMatrix"&&k.instanceMatrix&&(de=k.instanceMatrix),_e==="instanceColor"&&k.instanceColor&&(de=k.instanceColor)),re===void 0||re.attribute!==de||de&&re.data!==de.data)return!0;P++}return c.attributesNum!==P||c.index!==$}function y(k,W,te,$){const J={},ne=W.attributes;let P=0;const pe=te.getAttributes();for(const _e in pe)if(pe[_e].location>=0){let re=ne[_e];re===void 0&&(_e==="instanceMatrix"&&k.instanceMatrix&&(re=k.instanceMatrix),_e==="instanceColor"&&k.instanceColor&&(re=k.instanceColor));const de={};de.attribute=re,re&&re.data&&(de.data=re.data),J[_e]=de,P++}c.attributes=J,c.attributesNum=P,c.index=$}function v(){const k=c.newAttributes;for(let W=0,te=k.length;W<te;W++)k[W]=0}function M(k){S(k,0)}function S(k,W){const te=c.newAttributes,$=c.enabledAttributes,J=c.attributeDivisors;te[k]=1,$[k]===0&&(r.enableVertexAttribArray(k),$[k]=1),J[k]!==W&&((n.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](k,W),J[k]=W)}function b(){const k=c.newAttributes,W=c.enabledAttributes;for(let te=0,$=W.length;te<$;te++)W[te]!==k[te]&&(r.disableVertexAttribArray(te),W[te]=0)}function w(k,W,te,$,J,ne){n.isWebGL2===!0&&(te===r.INT||te===r.UNSIGNED_INT)?r.vertexAttribIPointer(k,W,te,J,ne):r.vertexAttribPointer(k,W,te,$,J,ne)}function U(k,W,te,$){if(n.isWebGL2===!1&&(k.isInstancedMesh||$.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const J=$.attributes,ne=te.getAttributes(),P=W.defaultAttributeValues;for(const pe in ne){const _e=ne[pe];if(_e.location>=0){let Q=J[pe];if(Q===void 0&&(pe==="instanceMatrix"&&k.instanceMatrix&&(Q=k.instanceMatrix),pe==="instanceColor"&&k.instanceColor&&(Q=k.instanceColor)),Q!==void 0){const re=Q.normalized,de=Q.itemSize,ue=t.get(Q);if(ue===void 0)continue;const I=ue.buffer,Ce=ue.type,ke=ue.bytesPerElement;if(Q.isInterleavedBufferAttribute){const ce=Q.data,we=ce.stride,C=Q.offset;if(ce.isInstancedInterleavedBuffer){for(let L=0;L<_e.locationSize;L++)S(_e.location+L,ce.meshPerAttribute);k.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let L=0;L<_e.locationSize;L++)M(_e.location+L);r.bindBuffer(r.ARRAY_BUFFER,I);for(let L=0;L<_e.locationSize;L++)w(_e.location+L,de/_e.locationSize,Ce,re,we*ke,(C+de/_e.locationSize*L)*ke)}else{if(Q.isInstancedBufferAttribute){for(let ce=0;ce<_e.locationSize;ce++)S(_e.location+ce,Q.meshPerAttribute);k.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ce=0;ce<_e.locationSize;ce++)M(_e.location+ce);r.bindBuffer(r.ARRAY_BUFFER,I);for(let ce=0;ce<_e.locationSize;ce++)w(_e.location+ce,de/_e.locationSize,Ce,re,de*ke,de/_e.locationSize*ce*ke)}}else if(P!==void 0){const re=P[pe];if(re!==void 0)switch(re.length){case 2:r.vertexAttrib2fv(_e.location,re);break;case 3:r.vertexAttrib3fv(_e.location,re);break;case 4:r.vertexAttrib4fv(_e.location,re);break;default:r.vertexAttrib1fv(_e.location,re)}}}}b()}function x(){q();for(const k in a){const W=a[k];for(const te in W){const $=W[te];for(const J in $)_($[J].object),delete $[J];delete W[te]}delete a[k]}}function T(k){if(a[k.id]===void 0)return;const W=a[k.id];for(const te in W){const $=W[te];for(const J in $)_($[J].object),delete $[J];delete W[te]}delete a[k.id]}function H(k){for(const W in a){const te=a[W];if(te[k.id]===void 0)continue;const $=te[k.id];for(const J in $)_($[J].object),delete $[J];delete te[k.id]}}function q(){B(),u=!0,c!==l&&(c=l,d(c.object))}function B(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:q,resetDefaultState:B,dispose:x,releaseStatesOfGeometry:T,releaseStatesOfProgram:H,initAttributes:v,enableAttribute:M,disableUnusedAttributes:b}}function uy(r,e,t,n){const i=n.isWebGL2;let s;function o(c){s=c}function a(c,u){r.drawArrays(s,c,u),t.update(u,s,1)}function l(c,u,h){if(h===0)return;let f,d;if(i)f=r,d="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),d="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[d](s,c,u,h),t.update(u,s,h)}this.setMode=o,this.render=a,this.renderInstances=l}function hy(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(w){if(w==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=r.getParameter(r.MAX_TEXTURE_SIZE),_=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),g=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),p=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,M=o||e.has("OES_texture_float"),S=v&&M,b=o?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:g,maxVaryings:p,maxFragmentUniforms:y,vertexTextures:v,floatFragmentTextures:M,floatVertexTextures:S,maxSamples:b}}function fy(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new or,a=new it,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const _=h.clippingPlanes,m=h.clipIntersection,g=h.clipShadows,p=r.get(h);if(!i||_===null||_.length===0||s&&!g)s?u(null):c();else{const y=s?0:n,v=y*4;let M=p.clippingState||null;l.value=M,M=u(_,f,v,d);for(let S=0;S!==v;++S)M[S]=t[S];p.clippingState=M,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,_){const m=h!==null?h.length:0;let g=null;if(m!==0){if(g=l.value,_!==!0||g===null){const p=d+m*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let v=0,M=d;v!==m;++v,M+=4)o.copy(h[v]).applyMatrix4(y,a),o.normal.toArray(g,M),g[M+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,g}}function dy(r){let e=new WeakMap;function t(o,a){return a===Nc?o.mapping=bs:a===Oc&&(o.mapping=Ts),o}function n(o){if(o&&o.isTexture&&o.isRenderTargetTexture===!1){const a=o.mapping;if(a===Nc||a===Oc)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new C0(l.height/2);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class mp extends fp{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ls=4,hf=[.125,.215,.35,.446,.526,.582],hr=20,ec=new mp,ff=new rt;let tc=null;const lr=(1+Math.sqrt(5))/2,Qr=1/lr,df=[new F(1,1,1),new F(-1,1,1),new F(1,1,-1),new F(-1,1,-1),new F(0,lr,Qr),new F(0,lr,-Qr),new F(Qr,0,lr),new F(-Qr,0,lr),new F(lr,Qr,0),new F(-lr,Qr,0)];class pf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){tc=this._renderer.getRenderTarget(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_f(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(tc),e.scissorTest=!1,ho(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===bs||e.mapping===Ts?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),tc=this._renderer.getRenderTarget();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Pn,minFilter:Pn,generateMipmaps:!1,type:wa,format:$n,colorSpace:li,depthBuffer:!1},i=mf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=mf(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=py(s)),this._blurMaterial=my(s,e,t)}return i}_compileMaterial(e){const t=new ii(this._lodPlanes[0],e);this._renderer.compile(t,ec)}_sceneToCubeUV(e,t,n,i){const a=new Ln(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(ff),u.toneMapping=Ai,u.autoClear=!1;const d=new lp({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1}),_=new ii(new Ha,d);let m=!1;const g=e.background;g?g.isColor&&(d.color.copy(g),e.background=null,m=!0):(d.color.copy(ff),m=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):y===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const v=this._cubeSize;ho(i,y*v,p>2?v:0,v,v),u.setRenderTarget(i),m&&u.render(_,a),u.render(e,a)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===bs||e.mapping===Ts;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=gf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_f());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new ii(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;ho(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,ec)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=df[(i-1)%df.length];this._blur(e,i-1,i,s,o)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new ii(this._lodPlanes[i],c),f=c.uniforms,d=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*hr-1),m=s/_,g=isFinite(s)?1+Math.floor(u*m):hr;g>hr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${hr}`);const p=[];let y=0;for(let w=0;w<hr;++w){const U=w/m,x=Math.exp(-U*U/2);p.push(x),w===0?y+=x:w<g&&(y+=2*x)}for(let w=0;w<p.length;w++)p[w]=p[w]/y;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=_,f.mipInt.value=v-n;const M=this._sizeLods[i],S=3*M*(i>v-ls?i-v+ls:0),b=4*(this._cubeSize-M);ho(t,S,b,3*M,2*M),l.setRenderTarget(t),l.render(h,ec)}}function py(r){const e=[],t=[],n=[];let i=r;const s=r-ls+1+hf.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-ls?l=hf[o-r+ls-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,_=6,m=3,g=2,p=1,y=new Float32Array(m*_*d),v=new Float32Array(g*_*d),M=new Float32Array(p*_*d);for(let b=0;b<d;b++){const w=b%3*2/3-1,U=b>2?0:-1,x=[w,U,0,w+2/3,U,0,w+2/3,U+1,0,w,U,0,w+2/3,U+1,0,w,U+1,0];y.set(x,m*_*b),v.set(f,g*_*b);const T=[b,b,b,b,b,b];M.set(T,p*_*b)}const S=new Fn;S.setAttribute("position",new si(y,m)),S.setAttribute("uv",new si(v,g)),S.setAttribute("faceIndex",new si(M,p)),e.push(S),i>ls&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function mf(r,e,t){const n=new Ar(r,e,t);return n.texture.mapping=ul,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ho(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function my(r,e,t){const n=new Float32Array(hr),i=new F(0,1,0);return new Rr({name:"SphericalGaussianBlur",defines:{n:hr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Tu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function _f(){return new Rr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function gf(){return new Rr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function Tu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function _y(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Nc||l===Oc,u=l===bs||l===Ts;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=e.get(a);return t===null&&(t=new pf(r)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),e.set(a,h),h.texture}else{if(e.has(a))return e.get(a).texture;{const h=a.image;if(c&&h&&h.height>0||u&&h&&i(h)){t===null&&(t=new pf(r));const f=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",s),f.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function gy(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function vy(r,e,t,n){const i={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",o),delete i[f.id];const d=s.get(f);d&&(e.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const _ in f)e.update(f[_],r.ARRAY_BUFFER);const d=h.morphAttributes;for(const _ in d){const m=d[_];for(let g=0,p=m.length;g<p;g++)e.update(m[g],r.ARRAY_BUFFER)}}function c(h){const f=[],d=h.index,_=h.attributes.position;let m=0;if(d!==null){const y=d.array;m=d.version;for(let v=0,M=y.length;v<M;v+=3){const S=y[v+0],b=y[v+1],w=y[v+2];f.push(S,b,b,w,w,S)}}else{const y=_.array;m=_.version;for(let v=0,M=y.length/3-1;v<M;v+=3){const S=v+0,b=v+1,w=v+2;f.push(S,b,b,w,w,S)}}const g=new(np(f)?up:cp)(f,1);g.version=m;const p=s.get(h);p&&e.remove(p),s.set(h,g)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function xy(r,e,t,n){const i=n.isWebGL2;let s;function o(f){s=f}let a,l;function c(f){a=f.type,l=f.bytesPerElement}function u(f,d){r.drawElements(s,d,a,f*l),t.update(d,s,1)}function h(f,d,_){if(_===0)return;let m,g;if(i)m=r,g="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),g="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[g](s,d,a,f*l,_),t.update(d,s,_)}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=h}function yy(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function My(r,e){return r[0]-e[0]}function Sy(r,e){return Math.abs(e[1])-Math.abs(r[1])}function Ey(r,e,t){const n={},i=new Float32Array(8),s=new WeakMap,o=new pt,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,h){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const d=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,_=d!==void 0?d.length:0;let m=s.get(u);if(m===void 0||m.count!==_){let k=function(){q.dispose(),s.delete(u),u.removeEventListener("dispose",k)};m!==void 0&&m.texture.dispose();const y=u.morphAttributes.position!==void 0,v=u.morphAttributes.normal!==void 0,M=u.morphAttributes.color!==void 0,S=u.morphAttributes.position||[],b=u.morphAttributes.normal||[],w=u.morphAttributes.color||[];let U=0;y===!0&&(U=1),v===!0&&(U=2),M===!0&&(U=3);let x=u.attributes.position.count*U,T=1;x>e.maxTextureSize&&(T=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const H=new Float32Array(x*T*4*_),q=new sp(H,x,T,_);q.type=pr,q.needsUpdate=!0;const B=U*4;for(let W=0;W<_;W++){const te=S[W],$=b[W],J=w[W],ne=x*T*4*W;for(let P=0;P<te.count;P++){const pe=P*B;y===!0&&(o.fromBufferAttribute(te,P),H[ne+pe+0]=o.x,H[ne+pe+1]=o.y,H[ne+pe+2]=o.z,H[ne+pe+3]=0),v===!0&&(o.fromBufferAttribute($,P),H[ne+pe+4]=o.x,H[ne+pe+5]=o.y,H[ne+pe+6]=o.z,H[ne+pe+7]=0),M===!0&&(o.fromBufferAttribute(J,P),H[ne+pe+8]=o.x,H[ne+pe+9]=o.y,H[ne+pe+10]=o.z,H[ne+pe+11]=J.itemSize===4?o.w:1)}}m={count:_,texture:q,size:new Ae(x,T)},s.set(u,m),u.addEventListener("dispose",k)}let g=0;for(let y=0;y<f.length;y++)g+=f[y];const p=u.morphTargetsRelative?1:1-g;h.getUniforms().setValue(r,"morphTargetBaseInfluence",p),h.getUniforms().setValue(r,"morphTargetInfluences",f),h.getUniforms().setValue(r,"morphTargetsTexture",m.texture,t),h.getUniforms().setValue(r,"morphTargetsTextureSize",m.size)}else{const d=f===void 0?0:f.length;let _=n[u.id];if(_===void 0||_.length!==d){_=[];for(let v=0;v<d;v++)_[v]=[v,0];n[u.id]=_}for(let v=0;v<d;v++){const M=_[v];M[0]=v,M[1]=f[v]}_.sort(Sy);for(let v=0;v<8;v++)v<d&&_[v][1]?(a[v][0]=_[v][0],a[v][1]=_[v][1]):(a[v][0]=Number.MAX_SAFE_INTEGER,a[v][1]=0);a.sort(My);const m=u.morphAttributes.position,g=u.morphAttributes.normal;let p=0;for(let v=0;v<8;v++){const M=a[v],S=M[0],b=M[1];S!==Number.MAX_SAFE_INTEGER&&b?(m&&u.getAttribute("morphTarget"+v)!==m[S]&&u.setAttribute("morphTarget"+v,m[S]),g&&u.getAttribute("morphNormal"+v)!==g[S]&&u.setAttribute("morphNormal"+v,g[S]),i[v]=b,p+=b):(m&&u.hasAttribute("morphTarget"+v)===!0&&u.deleteAttribute("morphTarget"+v),g&&u.hasAttribute("morphNormal"+v)===!0&&u.deleteAttribute("morphNormal"+v),i[v]=0)}const y=u.morphTargetsRelative?1:1-p;h.getUniforms().setValue(r,"morphTargetBaseInfluence",y),h.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function by(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);return i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER)),h}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const _p=new cn,gp=new sp,vp=new d0,xp=new dp,vf=[],xf=[],yf=new Float32Array(16),Mf=new Float32Array(9),Sf=new Float32Array(4);function Bs(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=vf[i];if(s===void 0&&(s=new Float32Array(i),vf[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function Pt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Lt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function fl(r,e){let t=xf[e];t===void 0&&(t=new Int32Array(e),xf[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Ty(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function wy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;r.uniform2fv(this.addr,e),Lt(t,e)}}function Ay(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pt(t,e))return;r.uniform3fv(this.addr,e),Lt(t,e)}}function Ry(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;r.uniform4fv(this.addr,e),Lt(t,e)}}function Cy(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,n))return;Sf.set(n),r.uniformMatrix2fv(this.addr,!1,Sf),Lt(t,n)}}function Py(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,n))return;Mf.set(n),r.uniformMatrix3fv(this.addr,!1,Mf),Lt(t,n)}}function Ly(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,n))return;yf.set(n),r.uniformMatrix4fv(this.addr,!1,yf),Lt(t,n)}}function Dy(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Uy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;r.uniform2iv(this.addr,e),Lt(t,e)}}function Iy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;r.uniform3iv(this.addr,e),Lt(t,e)}}function Ny(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;r.uniform4iv(this.addr,e),Lt(t,e)}}function Oy(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Fy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;r.uniform2uiv(this.addr,e),Lt(t,e)}}function By(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;r.uniform3uiv(this.addr,e),Lt(t,e)}}function zy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;r.uniform4uiv(this.addr,e),Lt(t,e)}}function ky(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2D(e||_p,i)}function Gy(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||vp,i)}function Hy(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||xp,i)}function Vy(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||gp,i)}function Wy(r){switch(r){case 5126:return Ty;case 35664:return wy;case 35665:return Ay;case 35666:return Ry;case 35674:return Cy;case 35675:return Py;case 35676:return Ly;case 5124:case 35670:return Dy;case 35667:case 35671:return Uy;case 35668:case 35672:return Iy;case 35669:case 35673:return Ny;case 5125:return Oy;case 36294:return Fy;case 36295:return By;case 36296:return zy;case 35678:case 36198:case 36298:case 36306:case 35682:return ky;case 35679:case 36299:case 36307:return Gy;case 35680:case 36300:case 36308:case 36293:return Hy;case 36289:case 36303:case 36311:case 36292:return Vy}}function Xy(r,e){r.uniform1fv(this.addr,e)}function qy(r,e){const t=Bs(e,this.size,2);r.uniform2fv(this.addr,t)}function Yy(r,e){const t=Bs(e,this.size,3);r.uniform3fv(this.addr,t)}function $y(r,e){const t=Bs(e,this.size,4);r.uniform4fv(this.addr,t)}function jy(r,e){const t=Bs(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Zy(r,e){const t=Bs(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Jy(r,e){const t=Bs(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Ky(r,e){r.uniform1iv(this.addr,e)}function Qy(r,e){r.uniform2iv(this.addr,e)}function eM(r,e){r.uniform3iv(this.addr,e)}function tM(r,e){r.uniform4iv(this.addr,e)}function nM(r,e){r.uniform1uiv(this.addr,e)}function iM(r,e){r.uniform2uiv(this.addr,e)}function rM(r,e){r.uniform3uiv(this.addr,e)}function sM(r,e){r.uniform4uiv(this.addr,e)}function aM(r,e,t){const n=this.cache,i=e.length,s=fl(t,i);Pt(n,s)||(r.uniform1iv(this.addr,s),Lt(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||_p,s[o])}function oM(r,e,t){const n=this.cache,i=e.length,s=fl(t,i);Pt(n,s)||(r.uniform1iv(this.addr,s),Lt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||vp,s[o])}function lM(r,e,t){const n=this.cache,i=e.length,s=fl(t,i);Pt(n,s)||(r.uniform1iv(this.addr,s),Lt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||xp,s[o])}function cM(r,e,t){const n=this.cache,i=e.length,s=fl(t,i);Pt(n,s)||(r.uniform1iv(this.addr,s),Lt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||gp,s[o])}function uM(r){switch(r){case 5126:return Xy;case 35664:return qy;case 35665:return Yy;case 35666:return $y;case 35674:return jy;case 35675:return Zy;case 35676:return Jy;case 5124:case 35670:return Ky;case 35667:case 35671:return Qy;case 35668:case 35672:return eM;case 35669:case 35673:return tM;case 5125:return nM;case 36294:return iM;case 36295:return rM;case 36296:return sM;case 35678:case 36198:case 36298:case 36306:case 35682:return aM;case 35679:case 36299:case 36307:return oM;case 35680:case 36300:case 36308:case 36293:return lM;case 36289:case 36303:case 36311:case 36292:return cM}}class hM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.setValue=Wy(t.type)}}class fM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.size=t.size,this.setValue=uM(t.type)}}class dM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const nc=/(\w+)(\])?(\[|\.)?/g;function Ef(r,e){r.seq.push(e),r.map[e.id]=e}function pM(r,e,t){const n=r.name,i=n.length;for(nc.lastIndex=0;;){const s=nc.exec(n),o=nc.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Ef(t,c===void 0?new hM(a,r,e):new fM(a,r,e));break}else{let h=t.map[a];h===void 0&&(h=new dM(a),Ef(t,h)),t=h}}}class Io{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);pM(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function bf(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}let mM=0;function _M(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function gM(r){switch(r){case li:return["Linear","( value )"];case je:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),["Linear","( value )"]}}function Tf(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+_M(r.getShaderSource(e),o)}else return i}function vM(r,e){const t=gM(e);return"vec4 "+r+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function xM(r,e){let t;switch(e){case Ug:t="Linear";break;case Ig:t="Reinhard";break;case Ng:t="OptimizedCineon";break;case Og:t="ACESFilmic";break;case Fg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function yM(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ks).join(`
`)}function MM(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function SM(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function Ks(r){return r!==""}function wf(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Af(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const EM=/^[ \t]*#include +<([\w\d./]+)>/gm;function kc(r){return r.replace(EM,bM)}function bM(r,e){const t=Ze[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return kc(t)}const TM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rf(r){return r.replace(TM,wM)}function wM(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Cf(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function AM(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===$d?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===hg?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===yi&&(e="SHADOWMAP_TYPE_VSM"),e}function RM(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case bs:case Ts:e="ENVMAP_TYPE_CUBE";break;case ul:e="ENVMAP_TYPE_CUBE_UV";break}return e}function CM(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Ts:e="ENVMAP_MODE_REFRACTION";break}return e}function PM(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Mu:e="ENVMAP_BLENDING_MULTIPLY";break;case Lg:e="ENVMAP_BLENDING_MIX";break;case Dg:e="ENVMAP_BLENDING_ADD";break}return e}function LM(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function DM(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=AM(t),c=RM(t),u=CM(t),h=PM(t),f=LM(t),d=t.isWebGL2?"":yM(t),_=MM(s),m=i.createProgram();let g,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=[_].filter(Ks).join(`
`),g.length>0&&(g+=`
`),p=[d,_].filter(Ks).join(`
`),p.length>0&&(p+=`
`)):(g=[Cf(t),"#define SHADER_NAME "+t.shaderName,_,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ks).join(`
`),p=[d,Cf(t),"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ai?"#define TONE_MAPPING":"",t.toneMapping!==Ai?Ze.tonemapping_pars_fragment:"",t.toneMapping!==Ai?xM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.encodings_pars_fragment,vM("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ks).join(`
`)),o=kc(o),o=wf(o,t),o=Af(o,t),a=kc(a),a=wf(a,t),a=Af(a,t),o=Rf(o),a=Rf(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Yh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Yh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=y+g+o,M=y+p+a,S=bf(i,i.VERTEX_SHADER,v),b=bf(i,i.FRAGMENT_SHADER,M);if(i.attachShader(m,S),i.attachShader(m,b),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m),r.debug.checkShaderErrors){const x=i.getProgramInfoLog(m).trim(),T=i.getShaderInfoLog(S).trim(),H=i.getShaderInfoLog(b).trim();let q=!0,B=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,m,S,b);else{const k=Tf(i,S,"vertex"),W=Tf(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+x+`
`+k+`
`+W)}else x!==""?console.warn("THREE.WebGLProgram: Program Info Log:",x):(T===""||H==="")&&(B=!1);B&&(this.diagnostics={runnable:q,programLog:x,vertexShader:{log:T,prefix:g},fragmentShader:{log:H,prefix:p}})}i.deleteShader(S),i.deleteShader(b);let w;this.getUniforms=function(){return w===void 0&&(w=new Io(i,m)),w};let U;return this.getAttributes=function(){return U===void 0&&(U=SM(i,m)),U},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.name=t.shaderName,this.id=mM++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=S,this.fragmentShader=b,this}let UM=0;class IM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new NM(e),t.set(e,n)),n}}class NM{constructor(e){this.id=UM++,this.code=e,this.usedTimes=0}}function OM(r,e,t,n,i,s,o){const a=new ap,l=new IM,c=[],u=i.isWebGL2,h=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return x===1?"uv1":x===2?"uv2":x===3?"uv3":"uv"}function g(x,T,H,q,B){const k=q.fog,W=B.geometry,te=x.isMeshStandardMaterial?q.environment:null,$=(x.isMeshStandardMaterial?t:e).get(x.envMap||te),J=$&&$.mapping===ul?$.image.height:null,ne=_[x.type];x.precision!==null&&(d=i.getMaxPrecision(x.precision),d!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const P=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,pe=P!==void 0?P.length:0;let _e=0;W.morphAttributes.position!==void 0&&(_e=1),W.morphAttributes.normal!==void 0&&(_e=2),W.morphAttributes.color!==void 0&&(_e=3);let Q,re,de,ue;if(ne){const at=ti[ne];Q=at.vertexShader,re=at.fragmentShader}else Q=x.vertexShader,re=x.fragmentShader,l.update(x),de=l.getVertexShaderID(x),ue=l.getFragmentShaderID(x);const I=r.getRenderTarget(),Ce=B.isInstancedMesh===!0,ke=!!x.map,ce=!!x.matcap,we=!!$,C=!!x.aoMap,L=!!x.lightMap,N=!!x.bumpMap,G=!!x.normalMap,j=!!x.displacementMap,D=!!x.emissiveMap,he=!!x.metalnessMap,ae=!!x.roughnessMap,Me=x.clearcoat>0,ge=x.iridescence>0,R=x.sheen>0,E=x.transmission>0,Y=Me&&!!x.clearcoatMap,K=Me&&!!x.clearcoatNormalMap,Z=Me&&!!x.clearcoatRoughnessMap,oe=ge&&!!x.iridescenceMap,ve=ge&&!!x.iridescenceThicknessMap,xe=R&&!!x.sheenColorMap,V=R&&!!x.sheenRoughnessMap,me=!!x.specularMap,ye=!!x.specularColorMap,Te=!!x.specularIntensityMap,Ee=E&&!!x.transmissionMap,Ue=E&&!!x.thicknessMap,We=!!x.gradientMap,Pe=!!x.alphaMap,nt=x.alphaTest>0,O=!!x.extensions,ie=!!W.attributes.uv1,le=!!W.attributes.uv2,Se=!!W.attributes.uv3;return{isWebGL2:u,shaderID:ne,shaderName:x.type,vertexShader:Q,fragmentShader:re,defines:x.defines,customVertexShaderID:de,customFragmentShaderID:ue,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,instancing:Ce,instancingColor:Ce&&B.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:I===null?r.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:li,map:ke,matcap:ce,envMap:we,envMapMode:we&&$.mapping,envMapCubeUVHeight:J,aoMap:C,lightMap:L,bumpMap:N,normalMap:G,displacementMap:f&&j,emissiveMap:D,normalMapObjectSpace:G&&x.normalMapType===n0,normalMapTangentSpace:G&&x.normalMapType===ep,metalnessMap:he,roughnessMap:ae,clearcoat:Me,clearcoatMap:Y,clearcoatNormalMap:K,clearcoatRoughnessMap:Z,iridescence:ge,iridescenceMap:oe,iridescenceThicknessMap:ve,sheen:R,sheenColorMap:xe,sheenRoughnessMap:V,specularMap:me,specularColorMap:ye,specularIntensityMap:Te,transmission:E,transmissionMap:Ee,thicknessMap:Ue,gradientMap:We,opaque:x.transparent===!1&&x.blending===ms,alphaMap:Pe,alphaTest:nt,combine:x.combine,mapUv:ke&&m(x.map.channel),aoMapUv:C&&m(x.aoMap.channel),lightMapUv:L&&m(x.lightMap.channel),bumpMapUv:N&&m(x.bumpMap.channel),normalMapUv:G&&m(x.normalMap.channel),displacementMapUv:j&&m(x.displacementMap.channel),emissiveMapUv:D&&m(x.emissiveMap.channel),metalnessMapUv:he&&m(x.metalnessMap.channel),roughnessMapUv:ae&&m(x.roughnessMap.channel),clearcoatMapUv:Y&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:K&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:ve&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:V&&m(x.sheenRoughnessMap.channel),specularMapUv:me&&m(x.specularMap.channel),specularColorMapUv:ye&&m(x.specularColorMap.channel),specularIntensityMapUv:Te&&m(x.specularIntensityMap.channel),transmissionMapUv:Ee&&m(x.transmissionMap.channel),thicknessMapUv:Ue&&m(x.thicknessMap.channel),alphaMapUv:Pe&&m(x.alphaMap.channel),vertexTangents:G&&!!W.attributes.tangent,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,vertexUv1s:ie,vertexUv2s:le,vertexUv3s:Se,pointsUvs:B.isPoints===!0&&!!W.attributes.uv&&(ke||Pe),fog:!!k,useFog:x.fog===!0,fogExp2:k&&k.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:B.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:_e,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:r.shadowMap.enabled&&H.length>0,shadowMapType:r.shadowMap.type,toneMapping:x.toneMapped?r.toneMapping:Ai,useLegacyLights:r.useLegacyLights,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Ei,flipSided:x.side===ln,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionDerivatives:O&&x.extensions.derivatives===!0,extensionFragDepth:O&&x.extensions.fragDepth===!0,extensionDrawBuffers:O&&x.extensions.drawBuffers===!0,extensionShaderTextureLOD:O&&x.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),customProgramCacheKey:x.customProgramCacheKey()}}function p(x){const T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(const H in x.defines)T.push(H),T.push(x.defines[H]);return x.isRawShaderMaterial===!1&&(y(T,x),v(T,x),T.push(r.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function y(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function v(x,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),x.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),x.push(a.mask)}function M(x){const T=_[x.type];let H;if(T){const q=ti[T];H=T0.clone(q.uniforms)}else H=x.uniforms;return H}function S(x,T){let H;for(let q=0,B=c.length;q<B;q++){const k=c[q];if(k.cacheKey===T){H=k,++H.usedTimes;break}}return H===void 0&&(H=new DM(r,T,x,s),c.push(H)),H}function b(x){if(--x.usedTimes===0){const T=c.indexOf(x);c[T]=c[c.length-1],c.pop(),x.destroy()}}function w(x){l.remove(x)}function U(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:M,acquireProgram:S,releaseProgram:b,releaseShaderCache:w,programs:c,dispose:U}}function FM(){let r=new WeakMap;function e(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function t(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function BM(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Pf(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Lf(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(h,f,d,_,m,g){let p=r[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:_,renderOrder:h.renderOrder,z:m,group:g},r[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=_,p.renderOrder=h.renderOrder,p.z=m,p.group=g),e++,p}function a(h,f,d,_,m,g){const p=o(h,f,d,_,m,g);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):t.push(p)}function l(h,f,d,_,m,g){const p=o(h,f,d,_,m,g);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):t.unshift(p)}function c(h,f){t.length>1&&t.sort(h||BM),n.length>1&&n.sort(f||Pf),i.length>1&&i.sort(f||Pf)}function u(){for(let h=e,f=r.length;h<f;h++){const d=r[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function zM(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Lf,r.set(n,[o])):i>=s.length?(o=new Lf,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function kM(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new rt};break;case"SpotLight":t={position:new F,direction:new F,color:new rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new rt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new rt,groundColor:new rt};break;case"RectAreaLight":t={color:new rt,position:new F,halfWidth:new F,halfHeight:new F};break}return r[e.id]=t,t}}}function GM(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let HM=0;function VM(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function WM(r,e){const t=new kM,n=GM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let u=0;u<9;u++)i.probe.push(new F);const s=new F,o=new vt,a=new vt;function l(u,h){let f=0,d=0,_=0;for(let H=0;H<9;H++)i.probe[H].set(0,0,0);let m=0,g=0,p=0,y=0,v=0,M=0,S=0,b=0,w=0,U=0;u.sort(VM);const x=h===!0?Math.PI:1;for(let H=0,q=u.length;H<q;H++){const B=u[H],k=B.color,W=B.intensity,te=B.distance,$=B.shadow&&B.shadow.map?B.shadow.map.texture:null;if(B.isAmbientLight)f+=k.r*W*x,d+=k.g*W*x,_+=k.b*W*x;else if(B.isLightProbe)for(let J=0;J<9;J++)i.probe[J].addScaledVector(B.sh.coefficients[J],W);else if(B.isDirectionalLight){const J=t.get(B);if(J.color.copy(B.color).multiplyScalar(B.intensity*x),B.castShadow){const ne=B.shadow,P=n.get(B);P.shadowBias=ne.bias,P.shadowNormalBias=ne.normalBias,P.shadowRadius=ne.radius,P.shadowMapSize=ne.mapSize,i.directionalShadow[m]=P,i.directionalShadowMap[m]=$,i.directionalShadowMatrix[m]=B.shadow.matrix,M++}i.directional[m]=J,m++}else if(B.isSpotLight){const J=t.get(B);J.position.setFromMatrixPosition(B.matrixWorld),J.color.copy(k).multiplyScalar(W*x),J.distance=te,J.coneCos=Math.cos(B.angle),J.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),J.decay=B.decay,i.spot[p]=J;const ne=B.shadow;if(B.map&&(i.spotLightMap[w]=B.map,w++,ne.updateMatrices(B),B.castShadow&&U++),i.spotLightMatrix[p]=ne.matrix,B.castShadow){const P=n.get(B);P.shadowBias=ne.bias,P.shadowNormalBias=ne.normalBias,P.shadowRadius=ne.radius,P.shadowMapSize=ne.mapSize,i.spotShadow[p]=P,i.spotShadowMap[p]=$,b++}p++}else if(B.isRectAreaLight){const J=t.get(B);J.color.copy(k).multiplyScalar(W),J.halfWidth.set(B.width*.5,0,0),J.halfHeight.set(0,B.height*.5,0),i.rectArea[y]=J,y++}else if(B.isPointLight){const J=t.get(B);if(J.color.copy(B.color).multiplyScalar(B.intensity*x),J.distance=B.distance,J.decay=B.decay,B.castShadow){const ne=B.shadow,P=n.get(B);P.shadowBias=ne.bias,P.shadowNormalBias=ne.normalBias,P.shadowRadius=ne.radius,P.shadowMapSize=ne.mapSize,P.shadowCameraNear=ne.camera.near,P.shadowCameraFar=ne.camera.far,i.pointShadow[g]=P,i.pointShadowMap[g]=$,i.pointShadowMatrix[g]=B.shadow.matrix,S++}i.point[g]=J,g++}else if(B.isHemisphereLight){const J=t.get(B);J.skyColor.copy(B.color).multiplyScalar(W*x),J.groundColor.copy(B.groundColor).multiplyScalar(W*x),i.hemi[v]=J,v++}}y>0&&(e.isWebGL2||r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=be.LTC_FLOAT_1,i.rectAreaLTC2=be.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=be.LTC_HALF_1,i.rectAreaLTC2=be.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=_;const T=i.hash;(T.directionalLength!==m||T.pointLength!==g||T.spotLength!==p||T.rectAreaLength!==y||T.hemiLength!==v||T.numDirectionalShadows!==M||T.numPointShadows!==S||T.numSpotShadows!==b||T.numSpotMaps!==w)&&(i.directional.length=m,i.spot.length=p,i.rectArea.length=y,i.point.length=g,i.hemi.length=v,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=b+w-U,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=U,T.directionalLength=m,T.pointLength=g,T.spotLength=p,T.rectAreaLength=y,T.hemiLength=v,T.numDirectionalShadows=M,T.numPointShadows=S,T.numSpotShadows=b,T.numSpotMaps=w,i.version=HM++)}function c(u,h){let f=0,d=0,_=0,m=0,g=0;const p=h.matrixWorldInverse;for(let y=0,v=u.length;y<v;y++){const M=u[y];if(M.isDirectionalLight){const S=i.directional[f];S.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),f++}else if(M.isSpotLight){const S=i.spot[_];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),_++}else if(M.isRectAreaLight){const S=i.rectArea[m];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(p),a.identity(),o.copy(M.matrixWorld),o.premultiply(p),a.extractRotation(o),S.halfWidth.set(M.width*.5,0,0),S.halfHeight.set(0,M.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),m++}else if(M.isPointLight){const S=i.point[d];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(p),d++}else if(M.isHemisphereLight){const S=i.hemi[g];S.direction.setFromMatrixPosition(M.matrixWorld),S.direction.transformDirection(p),g++}}}return{setup:l,setupView:c,state:i}}function Df(r,e){const t=new WM(r,e),n=[],i=[];function s(){n.length=0,i.length=0}function o(h){n.push(h)}function a(h){i.push(h)}function l(h){t.setup(n,h)}function c(h){t.setupView(n,h)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function XM(r,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new Df(r,e),t.set(s,[l])):o>=a.length?(l=new Df(r,e),a.push(l)):l=a[o],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class qM extends Pi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=e0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class YM extends Pi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const $M=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function ZM(r,e,t){let n=new Eu;const i=new Ae,s=new Ae,o=new pt,a=new qM({depthPacking:t0}),l=new YM,c={},u=t.maxTextureSize,h={[Ci]:ln,[ln]:Ci,[Ei]:Ei},f=new Rr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ae},radius:{value:4}},vertexShader:$M,fragmentShader:jM}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const _=new Fn;_.setAttribute("position",new si(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const m=new ii(_,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$d;let p=this.type;this.render=function(S,b,w){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;const U=r.getRenderTarget(),x=r.getActiveCubeFace(),T=r.getActiveMipmapLevel(),H=r.state;H.setBlending(Xi),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const q=p!==yi&&this.type===yi,B=p===yi&&this.type!==yi;for(let k=0,W=S.length;k<W;k++){const te=S[k],$=te.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;i.copy($.mapSize);const J=$.getFrameExtents();if(i.multiply(J),s.copy($.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/J.x),i.x=s.x*J.x,$.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/J.y),i.y=s.y*J.y,$.mapSize.y=s.y)),$.map===null||q===!0||B===!0){const P=this.type!==yi?{minFilter:en,magFilter:en}:{};$.map!==null&&$.map.dispose(),$.map=new Ar(i.x,i.y,P),$.map.texture.name=te.name+".shadowMap",$.camera.updateProjectionMatrix()}r.setRenderTarget($.map),r.clear();const ne=$.getViewportCount();for(let P=0;P<ne;P++){const pe=$.getViewport(P);o.set(s.x*pe.x,s.y*pe.y,s.x*pe.z,s.y*pe.w),H.viewport(o),$.updateMatrices(te,P),n=$.getFrustum(),M(b,w,$.camera,te,this.type)}$.isPointLightShadow!==!0&&this.type===yi&&y($,w),$.needsUpdate=!1}p=this.type,g.needsUpdate=!1,r.setRenderTarget(U,x,T)};function y(S,b){const w=e.update(m);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Ar(i.x,i.y)),f.uniforms.shadow_pass.value=S.map.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,r.setRenderTarget(S.mapPass),r.clear(),r.renderBufferDirect(b,null,w,f,m,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,r.setRenderTarget(S.map),r.clear(),r.renderBufferDirect(b,null,w,d,m,null)}function v(S,b,w,U){let x=null;const T=w.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(T!==void 0)x=T;else if(x=w.isPointLight===!0?l:a,r.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const H=x.uuid,q=b.uuid;let B=c[H];B===void 0&&(B={},c[H]=B);let k=B[q];k===void 0&&(k=x.clone(),B[q]=k),x=k}if(x.visible=b.visible,x.wireframe=b.wireframe,U===yi?x.side=b.shadowSide!==null?b.shadowSide:b.side:x.side=b.shadowSide!==null?b.shadowSide:h[b.side],x.alphaMap=b.alphaMap,x.alphaTest=b.alphaTest,x.map=b.map,x.clipShadows=b.clipShadows,x.clippingPlanes=b.clippingPlanes,x.clipIntersection=b.clipIntersection,x.displacementMap=b.displacementMap,x.displacementScale=b.displacementScale,x.displacementBias=b.displacementBias,x.wireframeLinewidth=b.wireframeLinewidth,x.linewidth=b.linewidth,w.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const H=r.properties.get(x);H.light=w}return x}function M(S,b,w,U,x){if(S.visible===!1)return;if(S.layers.test(b.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&x===yi)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,S.matrixWorld);const q=e.update(S),B=S.material;if(Array.isArray(B)){const k=q.groups;for(let W=0,te=k.length;W<te;W++){const $=k[W],J=B[$.materialIndex];if(J&&J.visible){const ne=v(S,J,U,x);r.renderBufferDirect(w,null,q,ne,S,$)}}}else if(B.visible){const k=v(S,B,U,x);r.renderBufferDirect(w,null,q,k,S,null)}}const H=S.children;for(let q=0,B=H.length;q<B;q++)M(H[q],b,w,U,x)}}function JM(r,e,t){const n=t.isWebGL2;function i(){let O=!1;const ie=new pt;let le=null;const Se=new pt(0,0,0,0);return{setMask:function(Ne){le!==Ne&&!O&&(r.colorMask(Ne,Ne,Ne,Ne),le=Ne)},setLocked:function(Ne){O=Ne},setClear:function(Ne,at,Ke,xt,He){He===!0&&(Ne*=xt,at*=xt,Ke*=xt),ie.set(Ne,at,Ke,xt),Se.equals(ie)===!1&&(r.clearColor(Ne,at,Ke,xt),Se.copy(ie))},reset:function(){O=!1,le=null,Se.set(-1,0,0,0)}}}function s(){let O=!1,ie=null,le=null,Se=null;return{setTest:function(Ne){Ne?I(r.DEPTH_TEST):Ce(r.DEPTH_TEST)},setMask:function(Ne){ie!==Ne&&!O&&(r.depthMask(Ne),ie=Ne)},setFunc:function(Ne){if(le!==Ne){switch(Ne){case bg:r.depthFunc(r.NEVER);break;case Tg:r.depthFunc(r.ALWAYS);break;case wg:r.depthFunc(r.LESS);break;case Ic:r.depthFunc(r.LEQUAL);break;case Ag:r.depthFunc(r.EQUAL);break;case Rg:r.depthFunc(r.GEQUAL);break;case Cg:r.depthFunc(r.GREATER);break;case Pg:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}le=Ne}},setLocked:function(Ne){O=Ne},setClear:function(Ne){Se!==Ne&&(r.clearDepth(Ne),Se=Ne)},reset:function(){O=!1,ie=null,le=null,Se=null}}}function o(){let O=!1,ie=null,le=null,Se=null,Ne=null,at=null,Ke=null,xt=null,He=null;return{setTest:function(Re){O||(Re?I(r.STENCIL_TEST):Ce(r.STENCIL_TEST))},setMask:function(Re){ie!==Re&&!O&&(r.stencilMask(Re),ie=Re)},setFunc:function(Re,fe,Oe){(le!==Re||Se!==fe||Ne!==Oe)&&(r.stencilFunc(Re,fe,Oe),le=Re,Se=fe,Ne=Oe)},setOp:function(Re,fe,Oe){(at!==Re||Ke!==fe||xt!==Oe)&&(r.stencilOp(Re,fe,Oe),at=Re,Ke=fe,xt=Oe)},setLocked:function(Re){O=Re},setClear:function(Re){He!==Re&&(r.clearStencil(Re),He=Re)},reset:function(){O=!1,ie=null,le=null,Se=null,Ne=null,at=null,Ke=null,xt=null,He=null}}}const a=new i,l=new s,c=new o,u=new WeakMap,h=new WeakMap;let f={},d={},_=new WeakMap,m=[],g=null,p=!1,y=null,v=null,M=null,S=null,b=null,w=null,U=null,x=!1,T=null,H=null,q=null,B=null,k=null;const W=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let te=!1,$=0;const J=r.getParameter(r.VERSION);J.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(J)[1]),te=$>=1):J.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),te=$>=2);let ne=null,P={};const pe=r.getParameter(r.SCISSOR_BOX),_e=r.getParameter(r.VIEWPORT),Q=new pt().fromArray(pe),re=new pt().fromArray(_e);function de(O,ie,le,Se){const Ne=new Uint8Array(4),at=r.createTexture();r.bindTexture(O,at),r.texParameteri(O,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(O,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ke=0;Ke<le;Ke++)n&&(O===r.TEXTURE_3D||O===r.TEXTURE_2D_ARRAY)?r.texImage3D(ie,0,r.RGBA,1,1,Se,0,r.RGBA,r.UNSIGNED_BYTE,Ne):r.texImage2D(ie+Ke,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ne);return at}const ue={};ue[r.TEXTURE_2D]=de(r.TEXTURE_2D,r.TEXTURE_2D,1),ue[r.TEXTURE_CUBE_MAP]=de(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(ue[r.TEXTURE_2D_ARRAY]=de(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ue[r.TEXTURE_3D]=de(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),I(r.DEPTH_TEST),l.setFunc(Ic),j(!1),D(_h),I(r.CULL_FACE),N(Xi);function I(O){f[O]!==!0&&(r.enable(O),f[O]=!0)}function Ce(O){f[O]!==!1&&(r.disable(O),f[O]=!1)}function ke(O,ie){return d[O]!==ie?(r.bindFramebuffer(O,ie),d[O]=ie,n&&(O===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=ie),O===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=ie)),!0):!1}function ce(O,ie){let le=m,Se=!1;if(O)if(le=_.get(ie),le===void 0&&(le=[],_.set(ie,le)),O.isWebGLMultipleRenderTargets){const Ne=O.texture;if(le.length!==Ne.length||le[0]!==r.COLOR_ATTACHMENT0){for(let at=0,Ke=Ne.length;at<Ke;at++)le[at]=r.COLOR_ATTACHMENT0+at;le.length=Ne.length,Se=!0}}else le[0]!==r.COLOR_ATTACHMENT0&&(le[0]=r.COLOR_ATTACHMENT0,Se=!0);else le[0]!==r.BACK&&(le[0]=r.BACK,Se=!0);Se&&(t.isWebGL2?r.drawBuffers(le):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(le))}function we(O){return g!==O?(r.useProgram(O),g=O,!0):!1}const C={[ss]:r.FUNC_ADD,[dg]:r.FUNC_SUBTRACT,[pg]:r.FUNC_REVERSE_SUBTRACT};if(n)C[yh]=r.MIN,C[Mh]=r.MAX;else{const O=e.get("EXT_blend_minmax");O!==null&&(C[yh]=O.MIN_EXT,C[Mh]=O.MAX_EXT)}const L={[mg]:r.ZERO,[_g]:r.ONE,[gg]:r.SRC_COLOR,[jd]:r.SRC_ALPHA,[Eg]:r.SRC_ALPHA_SATURATE,[Mg]:r.DST_COLOR,[xg]:r.DST_ALPHA,[vg]:r.ONE_MINUS_SRC_COLOR,[Zd]:r.ONE_MINUS_SRC_ALPHA,[Sg]:r.ONE_MINUS_DST_COLOR,[yg]:r.ONE_MINUS_DST_ALPHA};function N(O,ie,le,Se,Ne,at,Ke,xt){if(O===Xi){p===!0&&(Ce(r.BLEND),p=!1);return}if(p===!1&&(I(r.BLEND),p=!0),O!==fg){if(O!==y||xt!==x){if((v!==ss||b!==ss)&&(r.blendEquation(r.FUNC_ADD),v=ss,b=ss),xt)switch(O){case ms:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case gh:r.blendFunc(r.ONE,r.ONE);break;case vh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case xh:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case ms:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case gh:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case vh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case xh:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}M=null,S=null,w=null,U=null,y=O,x=xt}return}Ne=Ne||ie,at=at||le,Ke=Ke||Se,(ie!==v||Ne!==b)&&(r.blendEquationSeparate(C[ie],C[Ne]),v=ie,b=Ne),(le!==M||Se!==S||at!==w||Ke!==U)&&(r.blendFuncSeparate(L[le],L[Se],L[at],L[Ke]),M=le,S=Se,w=at,U=Ke),y=O,x=!1}function G(O,ie){O.side===Ei?Ce(r.CULL_FACE):I(r.CULL_FACE);let le=O.side===ln;ie&&(le=!le),j(le),O.blending===ms&&O.transparent===!1?N(Xi):N(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.premultipliedAlpha),l.setFunc(O.depthFunc),l.setTest(O.depthTest),l.setMask(O.depthWrite),a.setMask(O.colorWrite);const Se=O.stencilWrite;c.setTest(Se),Se&&(c.setMask(O.stencilWriteMask),c.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),c.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),ae(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?I(r.SAMPLE_ALPHA_TO_COVERAGE):Ce(r.SAMPLE_ALPHA_TO_COVERAGE)}function j(O){T!==O&&(O?r.frontFace(r.CW):r.frontFace(r.CCW),T=O)}function D(O){O!==cg?(I(r.CULL_FACE),O!==H&&(O===_h?r.cullFace(r.BACK):O===ug?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ce(r.CULL_FACE),H=O}function he(O){O!==q&&(te&&r.lineWidth(O),q=O)}function ae(O,ie,le){O?(I(r.POLYGON_OFFSET_FILL),(B!==ie||k!==le)&&(r.polygonOffset(ie,le),B=ie,k=le)):Ce(r.POLYGON_OFFSET_FILL)}function Me(O){O?I(r.SCISSOR_TEST):Ce(r.SCISSOR_TEST)}function ge(O){O===void 0&&(O=r.TEXTURE0+W-1),ne!==O&&(r.activeTexture(O),ne=O)}function R(O,ie,le){le===void 0&&(ne===null?le=r.TEXTURE0+W-1:le=ne);let Se=P[le];Se===void 0&&(Se={type:void 0,texture:void 0},P[le]=Se),(Se.type!==O||Se.texture!==ie)&&(ne!==le&&(r.activeTexture(le),ne=le),r.bindTexture(O,ie||ue[O]),Se.type=O,Se.texture=ie)}function E(){const O=P[ne];O!==void 0&&O.type!==void 0&&(r.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function Y(){try{r.compressedTexImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function K(){try{r.compressedTexImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Z(){try{r.texSubImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function oe(){try{r.texSubImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ve(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function xe(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function V(){try{r.texStorage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function me(){try{r.texStorage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ye(){try{r.texImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Te(){try{r.texImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ee(O){Q.equals(O)===!1&&(r.scissor(O.x,O.y,O.z,O.w),Q.copy(O))}function Ue(O){re.equals(O)===!1&&(r.viewport(O.x,O.y,O.z,O.w),re.copy(O))}function We(O,ie){let le=h.get(ie);le===void 0&&(le=new WeakMap,h.set(ie,le));let Se=le.get(O);Se===void 0&&(Se=r.getUniformBlockIndex(ie,O.name),le.set(O,Se))}function Pe(O,ie){const Se=h.get(ie).get(O);u.get(ie)!==Se&&(r.uniformBlockBinding(ie,Se,O.__bindingPointIndex),u.set(ie,Se))}function nt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),n===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),f={},ne=null,P={},d={},_=new WeakMap,m=[],g=null,p=!1,y=null,v=null,M=null,S=null,b=null,w=null,U=null,x=!1,T=null,H=null,q=null,B=null,k=null,Q.set(0,0,r.canvas.width,r.canvas.height),re.set(0,0,r.canvas.width,r.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:I,disable:Ce,bindFramebuffer:ke,drawBuffers:ce,useProgram:we,setBlending:N,setMaterial:G,setFlipSided:j,setCullFace:D,setLineWidth:he,setPolygonOffset:ae,setScissorTest:Me,activeTexture:ge,bindTexture:R,unbindTexture:E,compressedTexImage2D:Y,compressedTexImage3D:K,texImage2D:ye,texImage3D:Te,updateUBOMapping:We,uniformBlockBinding:Pe,texStorage2D:V,texStorage3D:me,texSubImage2D:Z,texSubImage3D:oe,compressedTexSubImage2D:ve,compressedTexSubImage3D:xe,scissor:Ee,viewport:Ue,reset:nt}}function KM(r,e,t,n,i,s,o){const a=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,u=i.maxTextureSize,h=i.maxSamples,f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,d=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),_=new WeakMap;let m;const g=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(R,E){return p?new OffscreenCanvas(R,E):Aa("canvas")}function v(R,E,Y,K){let Z=1;if((R.width>K||R.height>K)&&(Z=K/Math.max(R.width,R.height)),Z<1||E===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const oe=E?s0:Math.floor,ve=oe(Z*R.width),xe=oe(Z*R.height);m===void 0&&(m=y(ve,xe));const V=Y?y(ve,xe):m;return V.width=ve,V.height=xe,V.getContext("2d").drawImage(R,0,0,ve,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+ve+"x"+xe+")."),V}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function M(R){return $h(R.width)&&$h(R.height)}function S(R){return a?!1:R.wrapS!==Yn||R.wrapT!==Yn||R.minFilter!==en&&R.minFilter!==Pn}function b(R,E){return R.generateMipmaps&&E&&R.minFilter!==en&&R.minFilter!==Pn}function w(R){r.generateMipmap(R)}function U(R,E,Y,K,Z=!1){if(a===!1)return E;if(R!==null){if(r[R]!==void 0)return r[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let oe=E;return E===r.RED&&(Y===r.FLOAT&&(oe=r.R32F),Y===r.HALF_FLOAT&&(oe=r.R16F),Y===r.UNSIGNED_BYTE&&(oe=r.R8)),E===r.RG&&(Y===r.FLOAT&&(oe=r.RG32F),Y===r.HALF_FLOAT&&(oe=r.RG16F),Y===r.UNSIGNED_BYTE&&(oe=r.RG8)),E===r.RGBA&&(Y===r.FLOAT&&(oe=r.RGBA32F),Y===r.HALF_FLOAT&&(oe=r.RGBA16F),Y===r.UNSIGNED_BYTE&&(oe=K===je&&Z===!1?r.SRGB8_ALPHA8:r.RGBA8),Y===r.UNSIGNED_SHORT_4_4_4_4&&(oe=r.RGBA4),Y===r.UNSIGNED_SHORT_5_5_5_1&&(oe=r.RGB5_A1)),(oe===r.R16F||oe===r.R32F||oe===r.RG16F||oe===r.RG32F||oe===r.RGBA16F||oe===r.RGBA32F)&&e.get("EXT_color_buffer_float"),oe}function x(R,E,Y){return b(R,Y)===!0||R.isFramebufferTexture&&R.minFilter!==en&&R.minFilter!==Pn?Math.log2(Math.max(E.width,E.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?E.mipmaps.length:1}function T(R){return R===en||R===Sh||R===Rl?r.NEAREST:r.LINEAR}function H(R){const E=R.target;E.removeEventListener("dispose",H),B(E),E.isVideoTexture&&_.delete(E)}function q(R){const E=R.target;E.removeEventListener("dispose",q),W(E)}function B(R){const E=n.get(R);if(E.__webglInit===void 0)return;const Y=R.source,K=g.get(Y);if(K){const Z=K[E.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&k(R),Object.keys(K).length===0&&g.delete(Y)}n.remove(R)}function k(R){const E=n.get(R);r.deleteTexture(E.__webglTexture);const Y=R.source,K=g.get(Y);delete K[E.__cacheKey],o.memory.textures--}function W(R){const E=R.texture,Y=n.get(R),K=n.get(E);if(K.__webglTexture!==void 0&&(r.deleteTexture(K.__webglTexture),o.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++)r.deleteFramebuffer(Y.__webglFramebuffer[Z]),Y.__webglDepthbuffer&&r.deleteRenderbuffer(Y.__webglDepthbuffer[Z]);else{if(r.deleteFramebuffer(Y.__webglFramebuffer),Y.__webglDepthbuffer&&r.deleteRenderbuffer(Y.__webglDepthbuffer),Y.__webglMultisampledFramebuffer&&r.deleteFramebuffer(Y.__webglMultisampledFramebuffer),Y.__webglColorRenderbuffer)for(let Z=0;Z<Y.__webglColorRenderbuffer.length;Z++)Y.__webglColorRenderbuffer[Z]&&r.deleteRenderbuffer(Y.__webglColorRenderbuffer[Z]);Y.__webglDepthRenderbuffer&&r.deleteRenderbuffer(Y.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let Z=0,oe=E.length;Z<oe;Z++){const ve=n.get(E[Z]);ve.__webglTexture&&(r.deleteTexture(ve.__webglTexture),o.memory.textures--),n.remove(E[Z])}n.remove(E),n.remove(R)}let te=0;function $(){te=0}function J(){const R=te;return R>=l&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+l),te+=1,R}function ne(R){const E=[];return E.push(R.wrapS),E.push(R.wrapT),E.push(R.wrapR||0),E.push(R.magFilter),E.push(R.minFilter),E.push(R.anisotropy),E.push(R.internalFormat),E.push(R.format),E.push(R.type),E.push(R.generateMipmaps),E.push(R.premultiplyAlpha),E.push(R.flipY),E.push(R.unpackAlignment),E.push(R.colorSpace),E.join()}function P(R,E){const Y=n.get(R);if(R.isVideoTexture&&Me(R),R.isRenderTargetTexture===!1&&R.version>0&&Y.__version!==R.version){const K=R.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(Y,R,E);return}}t.bindTexture(r.TEXTURE_2D,Y.__webglTexture,r.TEXTURE0+E)}function pe(R,E){const Y=n.get(R);if(R.version>0&&Y.__version!==R.version){Ce(Y,R,E);return}t.bindTexture(r.TEXTURE_2D_ARRAY,Y.__webglTexture,r.TEXTURE0+E)}function _e(R,E){const Y=n.get(R);if(R.version>0&&Y.__version!==R.version){Ce(Y,R,E);return}t.bindTexture(r.TEXTURE_3D,Y.__webglTexture,r.TEXTURE0+E)}function Q(R,E){const Y=n.get(R);if(R.version>0&&Y.__version!==R.version){ke(Y,R,E);return}t.bindTexture(r.TEXTURE_CUBE_MAP,Y.__webglTexture,r.TEXTURE0+E)}const re={[$o]:r.REPEAT,[Yn]:r.CLAMP_TO_EDGE,[Fc]:r.MIRRORED_REPEAT},de={[en]:r.NEAREST,[Sh]:r.NEAREST_MIPMAP_NEAREST,[Rl]:r.NEAREST_MIPMAP_LINEAR,[Pn]:r.LINEAR,[Bg]:r.LINEAR_MIPMAP_NEAREST,[Ta]:r.LINEAR_MIPMAP_LINEAR};function ue(R,E,Y){if(Y?(r.texParameteri(R,r.TEXTURE_WRAP_S,re[E.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,re[E.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,re[E.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,de[E.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,de[E.minFilter])):(r.texParameteri(R,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(R,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(E.wrapS!==Yn||E.wrapT!==Yn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(R,r.TEXTURE_MAG_FILTER,T(E.magFilter)),r.texParameteri(R,r.TEXTURE_MIN_FILTER,T(E.minFilter)),E.minFilter!==en&&E.minFilter!==Pn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const K=e.get("EXT_texture_filter_anisotropic");if(E.magFilter===en||E.minFilter!==Rl&&E.minFilter!==Ta||E.type===pr&&e.has("OES_texture_float_linear")===!1||a===!1&&E.type===wa&&e.has("OES_texture_half_float_linear")===!1)return;(E.anisotropy>1||n.get(E).__currentAnisotropy)&&(r.texParameterf(R,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy)}}function I(R,E){let Y=!1;R.__webglInit===void 0&&(R.__webglInit=!0,E.addEventListener("dispose",H));const K=E.source;let Z=g.get(K);Z===void 0&&(Z={},g.set(K,Z));const oe=ne(E);if(oe!==R.__cacheKey){Z[oe]===void 0&&(Z[oe]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,Y=!0),Z[oe].usedTimes++;const ve=Z[R.__cacheKey];ve!==void 0&&(Z[R.__cacheKey].usedTimes--,ve.usedTimes===0&&k(E)),R.__cacheKey=oe,R.__webglTexture=Z[oe].texture}return Y}function Ce(R,E,Y){let K=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(K=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(K=r.TEXTURE_3D);const Z=I(R,E),oe=E.source;t.bindTexture(K,R.__webglTexture,r.TEXTURE0+Y);const ve=n.get(oe);if(oe.version!==ve.__version||Z===!0){t.activeTexture(r.TEXTURE0+Y),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.NONE);const xe=S(E)&&M(E.image)===!1;let V=v(E.image,xe,!1,u);V=ge(E,V);const me=M(V)||a,ye=s.convert(E.format,E.colorSpace);let Te=s.convert(E.type),Ee=U(E.internalFormat,ye,Te,E.colorSpace);ue(K,E,me);let Ue;const We=E.mipmaps,Pe=a&&E.isVideoTexture!==!0,nt=ve.__version===void 0||Z===!0,O=x(E,V,me);if(E.isDepthTexture)Ee=r.DEPTH_COMPONENT,a?E.type===pr?Ee=r.DEPTH_COMPONENT32F:E.type===dr?Ee=r.DEPTH_COMPONENT24:E.type===_s?Ee=r.DEPTH24_STENCIL8:Ee=r.DEPTH_COMPONENT16:E.type===pr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),E.format===gr&&Ee===r.DEPTH_COMPONENT&&E.type!==Kd&&E.type!==dr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),E.type=dr,Te=s.convert(E.type)),E.format===ws&&Ee===r.DEPTH_COMPONENT&&(Ee=r.DEPTH_STENCIL,E.type!==_s&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),E.type=_s,Te=s.convert(E.type))),nt&&(Pe?t.texStorage2D(r.TEXTURE_2D,1,Ee,V.width,V.height):t.texImage2D(r.TEXTURE_2D,0,Ee,V.width,V.height,0,ye,Te,null));else if(E.isDataTexture)if(We.length>0&&me){Pe&&nt&&t.texStorage2D(r.TEXTURE_2D,O,Ee,We[0].width,We[0].height);for(let ie=0,le=We.length;ie<le;ie++)Ue=We[ie],Pe?t.texSubImage2D(r.TEXTURE_2D,ie,0,0,Ue.width,Ue.height,ye,Te,Ue.data):t.texImage2D(r.TEXTURE_2D,ie,Ee,Ue.width,Ue.height,0,ye,Te,Ue.data);E.generateMipmaps=!1}else Pe?(nt&&t.texStorage2D(r.TEXTURE_2D,O,Ee,V.width,V.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,V.width,V.height,ye,Te,V.data)):t.texImage2D(r.TEXTURE_2D,0,Ee,V.width,V.height,0,ye,Te,V.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Pe&&nt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,O,Ee,We[0].width,We[0].height,V.depth);for(let ie=0,le=We.length;ie<le;ie++)Ue=We[ie],E.format!==$n?ye!==null?Pe?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ie,0,0,0,Ue.width,Ue.height,V.depth,ye,Ue.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ie,Ee,Ue.width,Ue.height,V.depth,0,Ue.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pe?t.texSubImage3D(r.TEXTURE_2D_ARRAY,ie,0,0,0,Ue.width,Ue.height,V.depth,ye,Te,Ue.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ie,Ee,Ue.width,Ue.height,V.depth,0,ye,Te,Ue.data)}else{Pe&&nt&&t.texStorage2D(r.TEXTURE_2D,O,Ee,We[0].width,We[0].height);for(let ie=0,le=We.length;ie<le;ie++)Ue=We[ie],E.format!==$n?ye!==null?Pe?t.compressedTexSubImage2D(r.TEXTURE_2D,ie,0,0,Ue.width,Ue.height,ye,Ue.data):t.compressedTexImage2D(r.TEXTURE_2D,ie,Ee,Ue.width,Ue.height,0,Ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pe?t.texSubImage2D(r.TEXTURE_2D,ie,0,0,Ue.width,Ue.height,ye,Te,Ue.data):t.texImage2D(r.TEXTURE_2D,ie,Ee,Ue.width,Ue.height,0,ye,Te,Ue.data)}else if(E.isDataArrayTexture)Pe?(nt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,O,Ee,V.width,V.height,V.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,V.width,V.height,V.depth,ye,Te,V.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ee,V.width,V.height,V.depth,0,ye,Te,V.data);else if(E.isData3DTexture)Pe?(nt&&t.texStorage3D(r.TEXTURE_3D,O,Ee,V.width,V.height,V.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,V.width,V.height,V.depth,ye,Te,V.data)):t.texImage3D(r.TEXTURE_3D,0,Ee,V.width,V.height,V.depth,0,ye,Te,V.data);else if(E.isFramebufferTexture){if(nt)if(Pe)t.texStorage2D(r.TEXTURE_2D,O,Ee,V.width,V.height);else{let ie=V.width,le=V.height;for(let Se=0;Se<O;Se++)t.texImage2D(r.TEXTURE_2D,Se,Ee,ie,le,0,ye,Te,null),ie>>=1,le>>=1}}else if(We.length>0&&me){Pe&&nt&&t.texStorage2D(r.TEXTURE_2D,O,Ee,We[0].width,We[0].height);for(let ie=0,le=We.length;ie<le;ie++)Ue=We[ie],Pe?t.texSubImage2D(r.TEXTURE_2D,ie,0,0,ye,Te,Ue):t.texImage2D(r.TEXTURE_2D,ie,Ee,ye,Te,Ue);E.generateMipmaps=!1}else Pe?(nt&&t.texStorage2D(r.TEXTURE_2D,O,Ee,V.width,V.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,ye,Te,V)):t.texImage2D(r.TEXTURE_2D,0,Ee,ye,Te,V);b(E,me)&&w(K),ve.__version=oe.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function ke(R,E,Y){if(E.image.length!==6)return;const K=I(R,E),Z=E.source;t.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+Y);const oe=n.get(Z);if(Z.version!==oe.__version||K===!0){t.activeTexture(r.TEXTURE0+Y),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.NONE);const ve=E.isCompressedTexture||E.image[0].isCompressedTexture,xe=E.image[0]&&E.image[0].isDataTexture,V=[];for(let ie=0;ie<6;ie++)!ve&&!xe?V[ie]=v(E.image[ie],!1,!0,c):V[ie]=xe?E.image[ie].image:E.image[ie],V[ie]=ge(E,V[ie]);const me=V[0],ye=M(me)||a,Te=s.convert(E.format,E.colorSpace),Ee=s.convert(E.type),Ue=U(E.internalFormat,Te,Ee,E.colorSpace),We=a&&E.isVideoTexture!==!0,Pe=oe.__version===void 0||K===!0;let nt=x(E,me,ye);ue(r.TEXTURE_CUBE_MAP,E,ye);let O;if(ve){We&&Pe&&t.texStorage2D(r.TEXTURE_CUBE_MAP,nt,Ue,me.width,me.height);for(let ie=0;ie<6;ie++){O=V[ie].mipmaps;for(let le=0;le<O.length;le++){const Se=O[le];E.format!==$n?Te!==null?We?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,le,0,0,Se.width,Se.height,Te,Se.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,le,Ue,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):We?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,le,0,0,Se.width,Se.height,Te,Ee,Se.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,le,Ue,Se.width,Se.height,0,Te,Ee,Se.data)}}}else{O=E.mipmaps,We&&Pe&&(O.length>0&&nt++,t.texStorage2D(r.TEXTURE_CUBE_MAP,nt,Ue,V[0].width,V[0].height));for(let ie=0;ie<6;ie++)if(xe){We?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,V[ie].width,V[ie].height,Te,Ee,V[ie].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Ue,V[ie].width,V[ie].height,0,Te,Ee,V[ie].data);for(let le=0;le<O.length;le++){const Ne=O[le].image[ie].image;We?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,le+1,0,0,Ne.width,Ne.height,Te,Ee,Ne.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,le+1,Ue,Ne.width,Ne.height,0,Te,Ee,Ne.data)}}else{We?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Te,Ee,V[ie]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Ue,Te,Ee,V[ie]);for(let le=0;le<O.length;le++){const Se=O[le];We?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,le+1,0,0,Te,Ee,Se.image[ie]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,le+1,Ue,Te,Ee,Se.image[ie])}}}b(E,ye)&&w(r.TEXTURE_CUBE_MAP),oe.__version=Z.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function ce(R,E,Y,K,Z){const oe=s.convert(Y.format,Y.colorSpace),ve=s.convert(Y.type),xe=U(Y.internalFormat,oe,ve,Y.colorSpace);n.get(E).__hasExternalTextures||(Z===r.TEXTURE_3D||Z===r.TEXTURE_2D_ARRAY?t.texImage3D(Z,0,xe,E.width,E.height,E.depth,0,oe,ve,null):t.texImage2D(Z,0,xe,E.width,E.height,0,oe,ve,null)),t.bindFramebuffer(r.FRAMEBUFFER,R),ae(E)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,K,Z,n.get(Y).__webglTexture,0,he(E)):(Z===r.TEXTURE_2D||Z>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,K,Z,n.get(Y).__webglTexture,0),t.bindFramebuffer(r.FRAMEBUFFER,null)}function we(R,E,Y){if(r.bindRenderbuffer(r.RENDERBUFFER,R),E.depthBuffer&&!E.stencilBuffer){let K=r.DEPTH_COMPONENT16;if(Y||ae(E)){const Z=E.depthTexture;Z&&Z.isDepthTexture&&(Z.type===pr?K=r.DEPTH_COMPONENT32F:Z.type===dr&&(K=r.DEPTH_COMPONENT24));const oe=he(E);ae(E)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,oe,K,E.width,E.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,oe,K,E.width,E.height)}else r.renderbufferStorage(r.RENDERBUFFER,K,E.width,E.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,R)}else if(E.depthBuffer&&E.stencilBuffer){const K=he(E);Y&&ae(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,K,r.DEPTH24_STENCIL8,E.width,E.height):ae(E)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,K,r.DEPTH24_STENCIL8,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,R)}else{const K=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let Z=0;Z<K.length;Z++){const oe=K[Z],ve=s.convert(oe.format,oe.colorSpace),xe=s.convert(oe.type),V=U(oe.internalFormat,ve,xe,oe.colorSpace),me=he(E);Y&&ae(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,me,V,E.width,E.height):ae(E)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,me,V,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,V,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function C(R,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,R),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),P(E.depthTexture,0);const K=n.get(E.depthTexture).__webglTexture,Z=he(E);if(E.depthTexture.format===gr)ae(E)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,K,0,Z):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,K,0);else if(E.depthTexture.format===ws)ae(E)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,K,0,Z):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function L(R){const E=n.get(R),Y=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!E.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");C(E.__webglFramebuffer,R)}else if(Y){E.__webglDepthbuffer=[];for(let K=0;K<6;K++)t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[K]),E.__webglDepthbuffer[K]=r.createRenderbuffer(),we(E.__webglDepthbuffer[K],R,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer=r.createRenderbuffer(),we(E.__webglDepthbuffer,R,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function N(R,E,Y){const K=n.get(R);E!==void 0&&ce(K.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D),Y!==void 0&&L(R)}function G(R){const E=R.texture,Y=n.get(R),K=n.get(E);R.addEventListener("dispose",q),R.isWebGLMultipleRenderTargets!==!0&&(K.__webglTexture===void 0&&(K.__webglTexture=r.createTexture()),K.__version=E.version,o.memory.textures++);const Z=R.isWebGLCubeRenderTarget===!0,oe=R.isWebGLMultipleRenderTargets===!0,ve=M(R)||a;if(Z){Y.__webglFramebuffer=[];for(let xe=0;xe<6;xe++)Y.__webglFramebuffer[xe]=r.createFramebuffer()}else{if(Y.__webglFramebuffer=r.createFramebuffer(),oe)if(i.drawBuffers){const xe=R.texture;for(let V=0,me=xe.length;V<me;V++){const ye=n.get(xe[V]);ye.__webglTexture===void 0&&(ye.__webglTexture=r.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&R.samples>0&&ae(R)===!1){const xe=oe?E:[E];Y.__webglMultisampledFramebuffer=r.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let V=0;V<xe.length;V++){const me=xe[V];Y.__webglColorRenderbuffer[V]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,Y.__webglColorRenderbuffer[V]);const ye=s.convert(me.format,me.colorSpace),Te=s.convert(me.type),Ee=U(me.internalFormat,ye,Te,me.colorSpace,R.isXRRenderTarget===!0),Ue=he(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ue,Ee,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+V,r.RENDERBUFFER,Y.__webglColorRenderbuffer[V])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(Y.__webglDepthRenderbuffer=r.createRenderbuffer(),we(Y.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Z){t.bindTexture(r.TEXTURE_CUBE_MAP,K.__webglTexture),ue(r.TEXTURE_CUBE_MAP,E,ve);for(let xe=0;xe<6;xe++)ce(Y.__webglFramebuffer[xe],R,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+xe);b(E,ve)&&w(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){const xe=R.texture;for(let V=0,me=xe.length;V<me;V++){const ye=xe[V],Te=n.get(ye);t.bindTexture(r.TEXTURE_2D,Te.__webglTexture),ue(r.TEXTURE_2D,ye,ve),ce(Y.__webglFramebuffer,R,ye,r.COLOR_ATTACHMENT0+V,r.TEXTURE_2D),b(ye,ve)&&w(r.TEXTURE_2D)}t.unbindTexture()}else{let xe=r.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(a?xe=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(xe,K.__webglTexture),ue(xe,E,ve),ce(Y.__webglFramebuffer,R,E,r.COLOR_ATTACHMENT0,xe),b(E,ve)&&w(xe),t.unbindTexture()}R.depthBuffer&&L(R)}function j(R){const E=M(R)||a,Y=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let K=0,Z=Y.length;K<Z;K++){const oe=Y[K];if(b(oe,E)){const ve=R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,xe=n.get(oe).__webglTexture;t.bindTexture(ve,xe),w(ve),t.unbindTexture()}}}function D(R){if(a&&R.samples>0&&ae(R)===!1){const E=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],Y=R.width,K=R.height;let Z=r.COLOR_BUFFER_BIT;const oe=[],ve=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,xe=n.get(R),V=R.isWebGLMultipleRenderTargets===!0;if(V)for(let me=0;me<E.length;me++)t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let me=0;me<E.length;me++){oe.push(r.COLOR_ATTACHMENT0+me),R.depthBuffer&&oe.push(ve);const ye=xe.__ignoreDepthValues!==void 0?xe.__ignoreDepthValues:!1;if(ye===!1&&(R.depthBuffer&&(Z|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&(Z|=r.STENCIL_BUFFER_BIT)),V&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,xe.__webglColorRenderbuffer[me]),ye===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[ve]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[ve])),V){const Te=n.get(E[me]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Te,0)}r.blitFramebuffer(0,0,Y,K,0,0,Y,K,Z,r.NEAREST),d&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,oe)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),V)for(let me=0;me<E.length;me++){t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,xe.__webglColorRenderbuffer[me]);const ye=n.get(E[me]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.TEXTURE_2D,ye,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}}function he(R){return Math.min(h,R.samples)}function ae(R){const E=n.get(R);return a&&R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Me(R){const E=o.render.frame;_.get(R)!==E&&(_.set(R,E),R.update())}function ge(R,E){const Y=R.colorSpace,K=R.format,Z=R.type;return R.isCompressedTexture===!0||R.format===Bc||Y!==li&&Y!==xr&&(Y===je?a===!1?e.has("EXT_sRGB")===!0&&K===$n?(R.format=Bc,R.minFilter=Pn,R.generateMipmaps=!1):E=ip.sRGBToLinear(E):(K!==$n||Z!==wr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),E}this.allocateTextureUnit=J,this.resetTextureUnits=$,this.setTexture2D=P,this.setTexture2DArray=pe,this.setTexture3D=_e,this.setTextureCube=Q,this.rebindTextures=N,this.setupRenderTarget=G,this.updateRenderTargetMipmap=j,this.updateMultisampleRenderTarget=D,this.setupDepthRenderbuffer=L,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=ae}function QM(r,e,t){const n=t.isWebGL2;function i(s,o=xr){let a;if(s===wr)return r.UNSIGNED_BYTE;if(s===Hg)return r.UNSIGNED_SHORT_4_4_4_4;if(s===Vg)return r.UNSIGNED_SHORT_5_5_5_1;if(s===zg)return r.BYTE;if(s===kg)return r.SHORT;if(s===Kd)return r.UNSIGNED_SHORT;if(s===Gg)return r.INT;if(s===dr)return r.UNSIGNED_INT;if(s===pr)return r.FLOAT;if(s===wa)return n?r.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===Wg)return r.ALPHA;if(s===$n)return r.RGBA;if(s===Xg)return r.LUMINANCE;if(s===qg)return r.LUMINANCE_ALPHA;if(s===gr)return r.DEPTH_COMPONENT;if(s===ws)return r.DEPTH_STENCIL;if(s===Bc)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Yg)return r.RED;if(s===$g)return r.RED_INTEGER;if(s===jg)return r.RG;if(s===Zg)return r.RG_INTEGER;if(s===Jg)return r.RGBA_INTEGER;if(s===Cl||s===Pl||s===Ll||s===Dl)if(o===je)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Cl)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Pl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Ll)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Dl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Cl)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Pl)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Ll)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Dl)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Eh||s===bh||s===Th||s===wh)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Eh)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===bh)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Th)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===wh)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Kg)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Ah||s===Rh)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Ah)return o===je?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Rh)return o===je?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Ch||s===Ph||s===Lh||s===Dh||s===Uh||s===Ih||s===Nh||s===Oh||s===Fh||s===Bh||s===zh||s===kh||s===Gh||s===Hh)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Ch)return o===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Ph)return o===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Lh)return o===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Dh)return o===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Uh)return o===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Ih)return o===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Nh)return o===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Oh)return o===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Fh)return o===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Bh)return o===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===zh)return o===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===kh)return o===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Gh)return o===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Hh)return o===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Ul)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===Ul)return o===je?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;if(s===Qg||s===Vh||s===Wh||s===Xh)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===Ul)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Vh)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Wh)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Xh)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===_s?n?r.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class eS extends Ln{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Qs extends Ot{constructor(){super(),this.isGroup=!0,this.type="Group"}}const tS={type:"move"};class ic{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const m of e.hand.values()){const g=t.getJointPose(m,n),p=this._getHandJoint(c,m);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,_=.005;c.inputState.pinching&&f>d+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(tS)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Qs;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class nS extends cn{constructor(e,t,n,i,s,o,a,l,c,u){if(u=u!==void 0?u:gr,u!==gr&&u!==ws)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===gr&&(n=dr),n===void 0&&u===ws&&(n=_s),super(null,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:en,this.minFilter=l!==void 0?l:en,this.flipY=!1,this.generateMipmaps=!1}}class iS extends Os{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,_=null;const m=t.getContextAttributes();let g=null,p=null;const y=[],v=[],M=new Set,S=new Map,b=new Ln;b.layers.enable(1),b.viewport=new pt;const w=new Ln;w.layers.enable(2),w.viewport=new pt;const U=[b,w],x=new eS;x.layers.enable(1),x.layers.enable(2);let T=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let re=y[Q];return re===void 0&&(re=new ic,y[Q]=re),re.getTargetRaySpace()},this.getControllerGrip=function(Q){let re=y[Q];return re===void 0&&(re=new ic,y[Q]=re),re.getGripSpace()},this.getHand=function(Q){let re=y[Q];return re===void 0&&(re=new ic,y[Q]=re),re.getHandSpace()};function q(Q){const re=v.indexOf(Q.inputSource);if(re===-1)return;const de=y[re];de!==void 0&&(de.update(Q.inputSource,Q.frame,c||o),de.dispatchEvent({type:Q.type,data:Q.inputSource}))}function B(){i.removeEventListener("select",q),i.removeEventListener("selectstart",q),i.removeEventListener("selectend",q),i.removeEventListener("squeeze",q),i.removeEventListener("squeezestart",q),i.removeEventListener("squeezeend",q),i.removeEventListener("end",B),i.removeEventListener("inputsourceschange",k);for(let Q=0;Q<y.length;Q++){const re=v[Q];re!==null&&(v[Q]=null,y[Q].disconnect(re))}T=null,H=null,e.setRenderTarget(g),d=null,f=null,h=null,i=null,p=null,_e.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(Q){if(i=Q,i!==null){if(g=e.getRenderTarget(),i.addEventListener("select",q),i.addEventListener("selectstart",q),i.addEventListener("selectend",q),i.addEventListener("squeeze",q),i.addEventListener("squeezestart",q),i.addEventListener("squeezeend",q),i.addEventListener("end",B),i.addEventListener("inputsourceschange",k),m.xrCompatible!==!0&&await t.makeXRCompatible(),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const re={antialias:i.renderState.layers===void 0?m.antialias:!0,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,t,re),i.updateRenderState({baseLayer:d}),p=new Ar(d.framebufferWidth,d.framebufferHeight,{format:$n,type:wr,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let re=null,de=null,ue=null;m.depth&&(ue=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=m.stencil?ws:gr,de=m.stencil?_s:dr);const I={colorFormat:t.RGBA8,depthFormat:ue,scaleFactor:s};h=new XRWebGLBinding(i,t),f=h.createProjectionLayer(I),i.updateRenderState({layers:[f]}),p=new Ar(f.textureWidth,f.textureHeight,{format:$n,type:wr,depthTexture:new nS(f.textureWidth,f.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0});const Ce=e.properties.get(p);Ce.__ignoreDepthValues=f.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),_e.setContext(i),_e.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function k(Q){for(let re=0;re<Q.removed.length;re++){const de=Q.removed[re],ue=v.indexOf(de);ue>=0&&(v[ue]=null,y[ue].disconnect(de))}for(let re=0;re<Q.added.length;re++){const de=Q.added[re];let ue=v.indexOf(de);if(ue===-1){for(let Ce=0;Ce<y.length;Ce++)if(Ce>=v.length){v.push(de),ue=Ce;break}else if(v[Ce]===null){v[Ce]=de,ue=Ce;break}if(ue===-1)break}const I=y[ue];I&&I.connect(de)}}const W=new F,te=new F;function $(Q,re,de){W.setFromMatrixPosition(re.matrixWorld),te.setFromMatrixPosition(de.matrixWorld);const ue=W.distanceTo(te),I=re.projectionMatrix.elements,Ce=de.projectionMatrix.elements,ke=I[14]/(I[10]-1),ce=I[14]/(I[10]+1),we=(I[9]+1)/I[5],C=(I[9]-1)/I[5],L=(I[8]-1)/I[0],N=(Ce[8]+1)/Ce[0],G=ke*L,j=ke*N,D=ue/(-L+N),he=D*-L;re.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(he),Q.translateZ(D),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert();const ae=ke+D,Me=ce+D,ge=G-he,R=j+(ue-he),E=we*ce/Me*ae,Y=C*ce/Me*ae;Q.projectionMatrix.makePerspective(ge,R,E,Y,ae,Me),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}function J(Q,re){re===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(re.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(i===null)return;x.near=w.near=b.near=Q.near,x.far=w.far=b.far=Q.far,(T!==x.near||H!==x.far)&&(i.updateRenderState({depthNear:x.near,depthFar:x.far}),T=x.near,H=x.far);const re=Q.parent,de=x.cameras;J(x,re);for(let ue=0;ue<de.length;ue++)J(de[ue],re);de.length===2?$(x,b,w):x.projectionMatrix.copy(b.projectionMatrix),ne(Q,x,re)};function ne(Q,re,de){de===null?Q.matrix.copy(re.matrixWorld):(Q.matrix.copy(de.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(re.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0);const ue=Q.children;for(let I=0,Ce=ue.length;I<Ce;I++)ue[I].updateMatrixWorld(!0);Q.projectionMatrix.copy(re.projectionMatrix),Q.projectionMatrixInverse.copy(re.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=zc*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(Q){l=Q,f!==null&&(f.fixedFoveation=Q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Q)},this.getPlanes=function(){return M};let P=null;function pe(Q,re){if(u=re.getViewerPose(c||o),_=re,u!==null){const de=u.views;d!==null&&(e.setRenderTargetFramebuffer(p,d.framebuffer),e.setRenderTarget(p));let ue=!1;de.length!==x.cameras.length&&(x.cameras.length=0,ue=!0);for(let I=0;I<de.length;I++){const Ce=de[I];let ke=null;if(d!==null)ke=d.getViewport(Ce);else{const we=h.getViewSubImage(f,Ce);ke=we.viewport,I===0&&(e.setRenderTargetTextures(p,we.colorTexture,f.ignoreDepthValues?void 0:we.depthStencilTexture),e.setRenderTarget(p))}let ce=U[I];ce===void 0&&(ce=new Ln,ce.layers.enable(I),ce.viewport=new pt,U[I]=ce),ce.matrix.fromArray(Ce.transform.matrix),ce.matrix.decompose(ce.position,ce.quaternion,ce.scale),ce.projectionMatrix.fromArray(Ce.projectionMatrix),ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert(),ce.viewport.set(ke.x,ke.y,ke.width,ke.height),I===0&&(x.matrix.copy(ce.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ue===!0&&x.cameras.push(ce)}}for(let de=0;de<y.length;de++){const ue=v[de],I=y[de];ue!==null&&I!==void 0&&I.update(ue,re,c||o)}if(P&&P(Q,re),re.detectedPlanes){n.dispatchEvent({type:"planesdetected",data:re.detectedPlanes});let de=null;for(const ue of M)re.detectedPlanes.has(ue)||(de===null&&(de=[]),de.push(ue));if(de!==null)for(const ue of de)M.delete(ue),S.delete(ue),n.dispatchEvent({type:"planeremoved",data:ue});for(const ue of re.detectedPlanes)if(!M.has(ue))M.add(ue),S.set(ue,re.lastChangedTime),n.dispatchEvent({type:"planeadded",data:ue});else{const I=S.get(ue);ue.lastChangedTime>I&&(S.set(ue,ue.lastChangedTime),n.dispatchEvent({type:"planechanged",data:ue}))}}_=null}const _e=new pp;_e.setAnimationLoop(pe),this.setAnimationLoop=function(Q){P=Q},this.dispose=function(){}}}function rS(r,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,hp(r)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,y,v,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),h(g,p)):p.isMeshPhongMaterial?(s(g,p),u(g,p)):p.isMeshStandardMaterial?(s(g,p),f(g,p),p.isMeshPhysicalMaterial&&d(g,p,M)):p.isMeshMatcapMaterial?(s(g,p),_(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),m(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,y,v):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===ln&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===ln&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const y=e.get(p).envMap;if(y&&(g.envMap.value=y,g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap){g.lightMap.value=p.lightMap;const v=r.useLegacyLights===!0?Math.PI:1;g.lightMapIntensity.value=p.lightMapIntensity*v,t(p.lightMap,g.lightMapTransform)}p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,y,v){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=v*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),e.get(p).envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ln&&g.clearcoatNormalScale.value.negate())),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,p){p.matcap&&(g.matcap.value=p.matcap)}function m(g,p){const y=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function sS(r,e,t,n){let i={},s={},o=[];const a=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(y,v){const M=v.program;n.uniformBlockBinding(y,M)}function c(y,v){let M=i[y.id];M===void 0&&(_(y),M=u(y),i[y.id]=M,y.addEventListener("dispose",g));const S=v.program;n.updateUBOMapping(y,S);const b=e.render.frame;s[y.id]!==b&&(f(y),s[y.id]=b)}function u(y){const v=h();y.__bindingPointIndex=v;const M=r.createBuffer(),S=y.__size,b=y.usage;return r.bindBuffer(r.UNIFORM_BUFFER,M),r.bufferData(r.UNIFORM_BUFFER,S,b),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,M),M}function h(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const v=i[y.id],M=y.uniforms,S=y.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let b=0,w=M.length;b<w;b++){const U=M[b];if(d(U,b,S)===!0){const x=U.__offset,T=Array.isArray(U.value)?U.value:[U.value];let H=0;for(let q=0;q<T.length;q++){const B=T[q],k=m(B);typeof B=="number"?(U.__data[0]=B,r.bufferSubData(r.UNIFORM_BUFFER,x+H,U.__data)):B.isMatrix3?(U.__data[0]=B.elements[0],U.__data[1]=B.elements[1],U.__data[2]=B.elements[2],U.__data[3]=B.elements[0],U.__data[4]=B.elements[3],U.__data[5]=B.elements[4],U.__data[6]=B.elements[5],U.__data[7]=B.elements[0],U.__data[8]=B.elements[6],U.__data[9]=B.elements[7],U.__data[10]=B.elements[8],U.__data[11]=B.elements[0]):(B.toArray(U.__data,H),H+=k.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,x,U.__data)}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(y,v,M){const S=y.value;if(M[v]===void 0){if(typeof S=="number")M[v]=S;else{const b=Array.isArray(S)?S:[S],w=[];for(let U=0;U<b.length;U++)w.push(b[U].clone());M[v]=w}return!0}else if(typeof S=="number"){if(M[v]!==S)return M[v]=S,!0}else{const b=Array.isArray(M[v])?M[v]:[M[v]],w=Array.isArray(S)?S:[S];for(let U=0;U<b.length;U++){const x=b[U];if(x.equals(w[U])===!1)return x.copy(w[U]),!0}}return!1}function _(y){const v=y.uniforms;let M=0;const S=16;let b=0;for(let w=0,U=v.length;w<U;w++){const x=v[w],T={boundary:0,storage:0},H=Array.isArray(x.value)?x.value:[x.value];for(let q=0,B=H.length;q<B;q++){const k=H[q],W=m(k);T.boundary+=W.boundary,T.storage+=W.storage}if(x.__data=new Float32Array(T.storage/Float32Array.BYTES_PER_ELEMENT),x.__offset=M,w>0){b=M%S;const q=S-b;b!==0&&q-T.boundary<0&&(M+=S-b,x.__offset=M)}M+=T.storage}return b=M%S,b>0&&(M+=S-b),y.__size=M,y.__cache={},this}function m(y){const v={boundary:0,storage:0};return typeof y=="number"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function g(y){const v=y.target;v.removeEventListener("dispose",g);const M=o.indexOf(v.__bindingPointIndex);o.splice(M,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function p(){for(const y in i)r.deleteBuffer(i[y]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}function aS(){const r=Aa("canvas");return r.style.display="block",r}class oS{constructor(e={}){const{canvas:t=aS(),context:n=null,depth:i=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=o;let d=null,_=null;const m=[],g=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputColorSpace=je,this.useLegacyLights=!0,this.toneMapping=Ai,this.toneMappingExposure=1;const p=this;let y=!1,v=0,M=0,S=null,b=-1,w=null;const U=new pt,x=new pt;let T=null,H=t.width,q=t.height,B=1,k=null,W=null;const te=new pt(0,0,H,q),$=new pt(0,0,H,q);let J=!1;const ne=new Eu;let P=!1,pe=!1,_e=null;const Q=new vt,re=new F,de={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ue(){return S===null?B:1}let I=n;function Ce(A,X){for(let ee=0;ee<A.length;ee++){const z=A[ee],se=t.getContext(z,X);if(se!==null)return se}return null}try{const A={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${yu}`),t.addEventListener("webglcontextlost",Ue,!1),t.addEventListener("webglcontextrestored",We,!1),t.addEventListener("webglcontextcreationerror",Pe,!1),I===null){const X=["webgl2","webgl","experimental-webgl"];if(p.isWebGL1Renderer===!0&&X.shift(),I=Ce(X,A),I===null)throw Ce(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}I.getShaderPrecisionFormat===void 0&&(I.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let ke,ce,we,C,L,N,G,j,D,he,ae,Me,ge,R,E,Y,K,Z,oe,ve,xe,V,me,ye;function Te(){ke=new gy(I),ce=new hy(I,ke,e),ke.init(ce),V=new QM(I,ke,ce),we=new JM(I,ke,ce),C=new yy(I),L=new FM,N=new KM(I,ke,we,L,ce,V,C),G=new dy(p),j=new _y(p),D=new D0(I,ce),me=new cy(I,ke,D,ce),he=new vy(I,D,C,me),ae=new by(I,he,D,C),oe=new Ey(I,ce,N),Y=new fy(L),Me=new OM(p,G,j,ke,ce,me,Y),ge=new rS(p,L),R=new zM,E=new XM(ke,ce),Z=new ly(p,G,j,we,ae,f,l),K=new ZM(p,ae,ce),ye=new sS(I,C,ce,we),ve=new uy(I,ke,C,ce),xe=new xy(I,ke,C,ce),C.programs=Me.programs,p.capabilities=ce,p.extensions=ke,p.properties=L,p.renderLists=R,p.shadowMap=K,p.state=we,p.info=C}Te();const Ee=new iS(p,I);this.xr=Ee,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const A=ke.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=ke.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(A){A!==void 0&&(B=A,this.setSize(H,q,!1))},this.getSize=function(A){return A.set(H,q)},this.setSize=function(A,X,ee=!0){if(Ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=A,q=X,t.width=Math.floor(A*B),t.height=Math.floor(X*B),ee===!0&&(t.style.width=A+"px",t.style.height=X+"px"),this.setViewport(0,0,A,X)},this.getDrawingBufferSize=function(A){return A.set(H*B,q*B).floor()},this.setDrawingBufferSize=function(A,X,ee){H=A,q=X,B=ee,t.width=Math.floor(A*ee),t.height=Math.floor(X*ee),this.setViewport(0,0,A,X)},this.getCurrentViewport=function(A){return A.copy(U)},this.getViewport=function(A){return A.copy(te)},this.setViewport=function(A,X,ee,z){A.isVector4?te.set(A.x,A.y,A.z,A.w):te.set(A,X,ee,z),we.viewport(U.copy(te).multiplyScalar(B).floor())},this.getScissor=function(A){return A.copy($)},this.setScissor=function(A,X,ee,z){A.isVector4?$.set(A.x,A.y,A.z,A.w):$.set(A,X,ee,z),we.scissor(x.copy($).multiplyScalar(B).floor())},this.getScissorTest=function(){return J},this.setScissorTest=function(A){we.setScissorTest(J=A)},this.setOpaqueSort=function(A){k=A},this.setTransparentSort=function(A){W=A},this.getClearColor=function(A){return A.copy(Z.getClearColor())},this.setClearColor=function(){Z.setClearColor.apply(Z,arguments)},this.getClearAlpha=function(){return Z.getClearAlpha()},this.setClearAlpha=function(){Z.setClearAlpha.apply(Z,arguments)},this.clear=function(A=!0,X=!0,ee=!0){let z=0;A&&(z|=I.COLOR_BUFFER_BIT),X&&(z|=I.DEPTH_BUFFER_BIT),ee&&(z|=I.STENCIL_BUFFER_BIT),I.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ue,!1),t.removeEventListener("webglcontextrestored",We,!1),t.removeEventListener("webglcontextcreationerror",Pe,!1),R.dispose(),E.dispose(),L.dispose(),G.dispose(),j.dispose(),ae.dispose(),me.dispose(),ye.dispose(),Me.dispose(),Ee.dispose(),Ee.removeEventListener("sessionstart",Ne),Ee.removeEventListener("sessionend",at),_e&&(_e.dispose(),_e=null),Ke.stop()};function Ue(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function We(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const A=C.autoReset,X=K.enabled,ee=K.autoUpdate,z=K.needsUpdate,se=K.type;Te(),C.autoReset=A,K.enabled=X,K.autoUpdate=ee,K.needsUpdate=z,K.type=se}function Pe(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function nt(A){const X=A.target;X.removeEventListener("dispose",nt),O(X)}function O(A){ie(A),L.remove(A)}function ie(A){const X=L.get(A).programs;X!==void 0&&(X.forEach(function(ee){Me.releaseProgram(ee)}),A.isShaderMaterial&&Me.releaseShaderCache(A))}this.renderBufferDirect=function(A,X,ee,z,se,Le){X===null&&(X=de);const De=se.isMesh&&se.matrixWorld.determinant()<0,Ie=bt(A,X,ee,z,se);we.setMaterial(z,De);let ze=ee.index,Ye=1;z.wireframe===!0&&(ze=he.getWireframeAttribute(ee),Ye=2);const Xe=ee.drawRange,Be=ee.attributes.position;let Ve=Xe.start*Ye,ut=(Xe.start+Xe.count)*Ye;Le!==null&&(Ve=Math.max(Ve,Le.start*Ye),ut=Math.min(ut,(Le.start+Le.count)*Ye)),ze!==null?(Ve=Math.max(Ve,0),ut=Math.min(ut,ze.count)):Be!=null&&(Ve=Math.max(Ve,0),ut=Math.min(ut,Be.count));const jt=ut-Ve;if(jt<0||jt===1/0)return;me.setup(se,z,Ie,ee,ze);let Jn,ht=ve;if(ze!==null&&(Jn=D.get(ze),ht=xe,ht.setIndex(Jn)),se.isMesh)z.wireframe===!0?(we.setLineWidth(z.wireframeLinewidth*ue()),ht.setMode(I.LINES)):ht.setMode(I.TRIANGLES);else if(se.isLine){let qe=z.linewidth;qe===void 0&&(qe=1),we.setLineWidth(qe*ue()),se.isLineSegments?ht.setMode(I.LINES):se.isLineLoop?ht.setMode(I.LINE_LOOP):ht.setMode(I.LINE_STRIP)}else se.isPoints?ht.setMode(I.POINTS):se.isSprite&&ht.setMode(I.TRIANGLES);if(se.isInstancedMesh)ht.renderInstances(Ve,jt,se.count);else if(ee.isInstancedBufferGeometry){const qe=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,hi=Math.min(ee.instanceCount,qe);ht.renderInstances(Ve,jt,hi)}else ht.render(Ve,jt)},this.compile=function(A,X){function ee(z,se,Le){z.transparent===!0&&z.side===Ei&&z.forceSinglePass===!1?(z.side=ln,z.needsUpdate=!0,Ge(z,se,Le),z.side=Ci,z.needsUpdate=!0,Ge(z,se,Le),z.side=Ei):Ge(z,se,Le)}_=E.get(A),_.init(),g.push(_),A.traverseVisible(function(z){z.isLight&&z.layers.test(X.layers)&&(_.pushLight(z),z.castShadow&&_.pushShadow(z))}),_.setupLights(p.useLegacyLights),A.traverse(function(z){const se=z.material;if(se)if(Array.isArray(se))for(let Le=0;Le<se.length;Le++){const De=se[Le];ee(De,A,z)}else ee(se,A,z)}),g.pop(),_=null};let le=null;function Se(A){le&&le(A)}function Ne(){Ke.stop()}function at(){Ke.start()}const Ke=new pp;Ke.setAnimationLoop(Se),typeof self<"u"&&Ke.setContext(self),this.setAnimationLoop=function(A){le=A,Ee.setAnimationLoop(A),A===null?Ke.stop():Ke.start()},Ee.addEventListener("sessionstart",Ne),Ee.addEventListener("sessionend",at),this.render=function(A,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Ee.enabled===!0&&Ee.isPresenting===!0&&(Ee.cameraAutoUpdate===!0&&Ee.updateCamera(X),X=Ee.getCamera()),A.isScene===!0&&A.onBeforeRender(p,A,X,S),_=E.get(A,g.length),_.init(),g.push(_),Q.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),ne.setFromProjectionMatrix(Q),pe=this.localClippingEnabled,P=Y.init(this.clippingPlanes,pe),d=R.get(A,m.length),d.init(),m.push(d),xt(A,X,0,p.sortObjects),d.finish(),p.sortObjects===!0&&d.sort(k,W),P===!0&&Y.beginShadows();const ee=_.state.shadowsArray;if(K.render(ee,A,X),P===!0&&Y.endShadows(),this.info.autoReset===!0&&this.info.reset(),Z.render(d,A),_.setupLights(p.useLegacyLights),X.isArrayCamera){const z=X.cameras;for(let se=0,Le=z.length;se<Le;se++){const De=z[se];He(d,A,De,De.viewport)}}else He(d,A,X);S!==null&&(N.updateMultisampleRenderTarget(S),N.updateRenderTargetMipmap(S)),A.isScene===!0&&A.onAfterRender(p,A,X),me.resetDefaultState(),b=-1,w=null,g.pop(),g.length>0?_=g[g.length-1]:_=null,m.pop(),m.length>0?d=m[m.length-1]:d=null};function xt(A,X,ee,z){if(A.visible===!1)return;if(A.layers.test(X.layers)){if(A.isGroup)ee=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(X);else if(A.isLight)_.pushLight(A),A.castShadow&&_.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||ne.intersectsSprite(A)){z&&re.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Q);const De=ae.update(A),Ie=A.material;Ie.visible&&d.push(A,De,Ie,ee,re.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||ne.intersectsObject(A))){A.isSkinnedMesh&&A.skeleton.frame!==C.render.frame&&(A.skeleton.update(),A.skeleton.frame=C.render.frame);const De=ae.update(A),Ie=A.material;if(z&&(De.boundingSphere===null&&De.computeBoundingSphere(),re.copy(De.boundingSphere.center).applyMatrix4(A.matrixWorld).applyMatrix4(Q)),Array.isArray(Ie)){const ze=De.groups;for(let Ye=0,Xe=ze.length;Ye<Xe;Ye++){const Be=ze[Ye],Ve=Ie[Be.materialIndex];Ve&&Ve.visible&&d.push(A,De,Ve,ee,re.z,Be)}}else Ie.visible&&d.push(A,De,Ie,ee,re.z,null)}}const Le=A.children;for(let De=0,Ie=Le.length;De<Ie;De++)xt(Le[De],X,ee,z)}function He(A,X,ee,z){const se=A.opaque,Le=A.transmissive,De=A.transparent;_.setupLightsView(ee),P===!0&&Y.setGlobalState(p.clippingPlanes,ee),Le.length>0&&Re(se,Le,X,ee),z&&we.viewport(U.copy(z)),se.length>0&&fe(se,X,ee),Le.length>0&&fe(Le,X,ee),De.length>0&&fe(De,X,ee),we.buffers.depth.setTest(!0),we.buffers.depth.setMask(!0),we.buffers.color.setMask(!0),we.setPolygonOffset(!1)}function Re(A,X,ee,z){if(_e===null){const Ie=ce.isWebGL2;_e=new Ar(1024,1024,{generateMipmaps:!0,type:ke.has("EXT_color_buffer_half_float")?wa:wr,minFilter:Ta,samples:Ie&&a===!0?4:0})}const se=p.getRenderTarget();p.setRenderTarget(_e),p.clear();const Le=p.toneMapping;p.toneMapping=Ai,fe(A,ee,z),N.updateMultisampleRenderTarget(_e),N.updateRenderTargetMipmap(_e);let De=!1;for(let Ie=0,ze=X.length;Ie<ze;Ie++){const Ye=X[Ie],Xe=Ye.object,Be=Ye.geometry,Ve=Ye.material,ut=Ye.group;if(Ve.side===Ei&&Xe.layers.test(z.layers)){const jt=Ve.side;Ve.side=ln,Ve.needsUpdate=!0,Oe(Xe,ee,z,Be,Ve,ut),Ve.side=jt,Ve.needsUpdate=!0,De=!0}}De===!0&&(N.updateMultisampleRenderTarget(_e),N.updateRenderTargetMipmap(_e)),p.setRenderTarget(se),p.toneMapping=Le}function fe(A,X,ee){const z=X.isScene===!0?X.overrideMaterial:null;for(let se=0,Le=A.length;se<Le;se++){const De=A[se],Ie=De.object,ze=De.geometry,Ye=z===null?De.material:z,Xe=De.group;Ie.layers.test(ee.layers)&&Oe(Ie,X,ee,ze,Ye,Xe)}}function Oe(A,X,ee,z,se,Le){A.onBeforeRender(p,X,ee,z,se,Le),A.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),se.onBeforeRender(p,X,ee,z,A,Le),se.transparent===!0&&se.side===Ei&&se.forceSinglePass===!1?(se.side=ln,se.needsUpdate=!0,p.renderBufferDirect(ee,X,z,se,A,Le),se.side=Ci,se.needsUpdate=!0,p.renderBufferDirect(ee,X,z,se,A,Le),se.side=Ei):p.renderBufferDirect(ee,X,z,se,A,Le),A.onAfterRender(p,X,ee,z,se,Le)}function Ge(A,X,ee){X.isScene!==!0&&(X=de);const z=L.get(A),se=_.state.lights,Le=_.state.shadowsArray,De=se.state.version,Ie=Me.getParameters(A,se.state,Le,X,ee),ze=Me.getProgramCacheKey(Ie);let Ye=z.programs;z.environment=A.isMeshStandardMaterial?X.environment:null,z.fog=X.fog,z.envMap=(A.isMeshStandardMaterial?j:G).get(A.envMap||z.environment),Ye===void 0&&(A.addEventListener("dispose",nt),Ye=new Map,z.programs=Ye);let Xe=Ye.get(ze);if(Xe!==void 0){if(z.currentProgram===Xe&&z.lightsStateVersion===De)return $e(A,Ie),Xe}else Ie.uniforms=Me.getUniforms(A),A.onBuild(ee,Ie,p),A.onBeforeCompile(Ie,p),Xe=Me.acquireProgram(Ie,ze),Ye.set(ze,Xe),z.uniforms=Ie.uniforms;const Be=z.uniforms;(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Be.clippingPlanes=Y.uniform),$e(A,Ie),z.needsLights=ft(A),z.lightsStateVersion=De,z.needsLights&&(Be.ambientLightColor.value=se.state.ambient,Be.lightProbe.value=se.state.probe,Be.directionalLights.value=se.state.directional,Be.directionalLightShadows.value=se.state.directionalShadow,Be.spotLights.value=se.state.spot,Be.spotLightShadows.value=se.state.spotShadow,Be.rectAreaLights.value=se.state.rectArea,Be.ltc_1.value=se.state.rectAreaLTC1,Be.ltc_2.value=se.state.rectAreaLTC2,Be.pointLights.value=se.state.point,Be.pointLightShadows.value=se.state.pointShadow,Be.hemisphereLights.value=se.state.hemi,Be.directionalShadowMap.value=se.state.directionalShadowMap,Be.directionalShadowMatrix.value=se.state.directionalShadowMatrix,Be.spotShadowMap.value=se.state.spotShadowMap,Be.spotLightMatrix.value=se.state.spotLightMatrix,Be.spotLightMap.value=se.state.spotLightMap,Be.pointShadowMap.value=se.state.pointShadowMap,Be.pointShadowMatrix.value=se.state.pointShadowMatrix);const Ve=Xe.getUniforms(),ut=Io.seqWithValue(Ve.seq,Be);return z.currentProgram=Xe,z.uniformsList=ut,Xe}function $e(A,X){const ee=L.get(A);ee.outputColorSpace=X.outputColorSpace,ee.instancing=X.instancing,ee.skinning=X.skinning,ee.morphTargets=X.morphTargets,ee.morphNormals=X.morphNormals,ee.morphColors=X.morphColors,ee.morphTargetsCount=X.morphTargetsCount,ee.numClippingPlanes=X.numClippingPlanes,ee.numIntersection=X.numClipIntersection,ee.vertexAlphas=X.vertexAlphas,ee.vertexTangents=X.vertexTangents,ee.toneMapping=X.toneMapping}function bt(A,X,ee,z,se){X.isScene!==!0&&(X=de),N.resetTextureUnits();const Le=X.fog,De=z.isMeshStandardMaterial?X.environment:null,Ie=S===null?p.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:li,ze=(z.isMeshStandardMaterial?j:G).get(z.envMap||De),Ye=z.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,Xe=!!z.normalMap&&!!ee.attributes.tangent,Be=!!ee.morphAttributes.position,Ve=!!ee.morphAttributes.normal,ut=!!ee.morphAttributes.color,jt=z.toneMapped?p.toneMapping:Ai,Jn=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,ht=Jn!==void 0?Jn.length:0,qe=L.get(z),hi=_.state.lights;if(P===!0&&(pe===!0||A!==w)){const pn=A===w&&z.id===b;Y.setState(z,A,pn)}let Dt=!1;z.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==hi.state.version||qe.outputColorSpace!==Ie||se.isInstancedMesh&&qe.instancing===!1||!se.isInstancedMesh&&qe.instancing===!0||se.isSkinnedMesh&&qe.skinning===!1||!se.isSkinnedMesh&&qe.skinning===!0||qe.envMap!==ze||z.fog===!0&&qe.fog!==Le||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==Y.numPlanes||qe.numIntersection!==Y.numIntersection)||qe.vertexAlphas!==Ye||qe.vertexTangents!==Xe||qe.morphTargets!==Be||qe.morphNormals!==Ve||qe.morphColors!==ut||qe.toneMapping!==jt||ce.isWebGL2===!0&&qe.morphTargetsCount!==ht)&&(Dt=!0):(Dt=!0,qe.__version=z.version);let Qi=qe.currentProgram;Dt===!0&&(Qi=Ge(z,X,se));let th=!1,ks=!1,vl=!1;const Zt=Qi.getUniforms(),er=qe.uniforms;if(we.useProgram(Qi.program)&&(th=!0,ks=!0,vl=!0),z.id!==b&&(b=z.id,ks=!0),th||w!==A){if(Zt.setValue(I,"projectionMatrix",A.projectionMatrix),ce.logarithmicDepthBuffer&&Zt.setValue(I,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),w!==A&&(w=A,ks=!0,vl=!0),z.isShaderMaterial||z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshStandardMaterial||z.envMap){const pn=Zt.map.cameraPosition;pn!==void 0&&pn.setValue(I,re.setFromMatrixPosition(A.matrixWorld))}(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&Zt.setValue(I,"isOrthographic",A.isOrthographicCamera===!0),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial||z.isShadowMaterial||se.isSkinnedMesh)&&Zt.setValue(I,"viewMatrix",A.matrixWorldInverse)}if(se.isSkinnedMesh){Zt.setOptional(I,se,"bindMatrix"),Zt.setOptional(I,se,"bindMatrixInverse");const pn=se.skeleton;pn&&(ce.floatVertexTextures?(pn.boneTexture===null&&pn.computeBoneTexture(),Zt.setValue(I,"boneTexture",pn.boneTexture,N),Zt.setValue(I,"boneTextureSize",pn.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const xl=ee.morphAttributes;if((xl.position!==void 0||xl.normal!==void 0||xl.color!==void 0&&ce.isWebGL2===!0)&&oe.update(se,ee,Qi),(ks||qe.receiveShadow!==se.receiveShadow)&&(qe.receiveShadow=se.receiveShadow,Zt.setValue(I,"receiveShadow",se.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(er.envMap.value=ze,er.flipEnvMap.value=ze.isCubeTexture&&ze.isRenderTargetTexture===!1?-1:1),ks&&(Zt.setValue(I,"toneMappingExposure",p.toneMappingExposure),qe.needsLights&&ot(er,vl),Le&&z.fog===!0&&ge.refreshFogUniforms(er,Le),ge.refreshMaterialUniforms(er,z,B,q,_e),Io.upload(I,qe.uniformsList,er,N)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Io.upload(I,qe.uniformsList,er,N),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&Zt.setValue(I,"center",se.center),Zt.setValue(I,"modelViewMatrix",se.modelViewMatrix),Zt.setValue(I,"normalMatrix",se.normalMatrix),Zt.setValue(I,"modelMatrix",se.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const pn=z.uniformsGroups;for(let yl=0,Qm=pn.length;yl<Qm;yl++)if(ce.isWebGL2){const nh=pn[yl];ye.update(nh,Qi),ye.bind(nh,Qi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Qi}function ot(A,X){A.ambientLightColor.needsUpdate=X,A.lightProbe.needsUpdate=X,A.directionalLights.needsUpdate=X,A.directionalLightShadows.needsUpdate=X,A.pointLights.needsUpdate=X,A.pointLightShadows.needsUpdate=X,A.spotLights.needsUpdate=X,A.spotLightShadows.needsUpdate=X,A.rectAreaLights.needsUpdate=X,A.hemisphereLights.needsUpdate=X}function ft(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return v},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(A,X,ee){L.get(A.texture).__webglTexture=X,L.get(A.depthTexture).__webglTexture=ee;const z=L.get(A);z.__hasExternalTextures=!0,z.__hasExternalTextures&&(z.__autoAllocateDepthBuffer=ee===void 0,z.__autoAllocateDepthBuffer||ke.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(A,X){const ee=L.get(A);ee.__webglFramebuffer=X,ee.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(A,X=0,ee=0){S=A,v=X,M=ee;let z=!0,se=null,Le=!1,De=!1;if(A){const ze=L.get(A);ze.__useDefaultFramebuffer!==void 0?(we.bindFramebuffer(I.FRAMEBUFFER,null),z=!1):ze.__webglFramebuffer===void 0?N.setupRenderTarget(A):ze.__hasExternalTextures&&N.rebindTextures(A,L.get(A.texture).__webglTexture,L.get(A.depthTexture).__webglTexture);const Ye=A.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(De=!0);const Xe=L.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(se=Xe[X],Le=!0):ce.isWebGL2&&A.samples>0&&N.useMultisampledRTT(A)===!1?se=L.get(A).__webglMultisampledFramebuffer:se=Xe,U.copy(A.viewport),x.copy(A.scissor),T=A.scissorTest}else U.copy(te).multiplyScalar(B).floor(),x.copy($).multiplyScalar(B).floor(),T=J;if(we.bindFramebuffer(I.FRAMEBUFFER,se)&&ce.drawBuffers&&z&&we.drawBuffers(A,se),we.viewport(U),we.scissor(x),we.setScissorTest(T),Le){const ze=L.get(A.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+X,ze.__webglTexture,ee)}else if(De){const ze=L.get(A.texture),Ye=X||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,ze.__webglTexture,ee||0,Ye)}b=-1},this.readRenderTargetPixels=function(A,X,ee,z,se,Le,De){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=L.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&De!==void 0&&(Ie=Ie[De]),Ie){we.bindFramebuffer(I.FRAMEBUFFER,Ie);try{const ze=A.texture,Ye=ze.format,Xe=ze.type;if(Ye!==$n&&V.convert(Ye)!==I.getParameter(I.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Be=Xe===wa&&(ke.has("EXT_color_buffer_half_float")||ce.isWebGL2&&ke.has("EXT_color_buffer_float"));if(Xe!==wr&&V.convert(Xe)!==I.getParameter(I.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Xe===pr&&(ce.isWebGL2||ke.has("OES_texture_float")||ke.has("WEBGL_color_buffer_float")))&&!Be){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=A.width-z&&ee>=0&&ee<=A.height-se&&I.readPixels(X,ee,z,se,V.convert(Ye),V.convert(Xe),Le)}finally{const ze=S!==null?L.get(S).__webglFramebuffer:null;we.bindFramebuffer(I.FRAMEBUFFER,ze)}}},this.copyFramebufferToTexture=function(A,X,ee=0){const z=Math.pow(2,-ee),se=Math.floor(X.image.width*z),Le=Math.floor(X.image.height*z);N.setTexture2D(X,0),I.copyTexSubImage2D(I.TEXTURE_2D,ee,0,0,A.x,A.y,se,Le),we.unbindTexture()},this.copyTextureToTexture=function(A,X,ee,z=0){const se=X.image.width,Le=X.image.height,De=V.convert(ee.format),Ie=V.convert(ee.type);N.setTexture2D(ee,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,ee.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ee.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,ee.unpackAlignment),X.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,z,A.x,A.y,se,Le,De,Ie,X.image.data):X.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,z,A.x,A.y,X.mipmaps[0].width,X.mipmaps[0].height,De,X.mipmaps[0].data):I.texSubImage2D(I.TEXTURE_2D,z,A.x,A.y,De,Ie,X.image),z===0&&ee.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),we.unbindTexture()},this.copyTextureToTexture3D=function(A,X,ee,z,se=0){if(p.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Le=A.max.x-A.min.x+1,De=A.max.y-A.min.y+1,Ie=A.max.z-A.min.z+1,ze=V.convert(z.format),Ye=V.convert(z.type);let Xe;if(z.isData3DTexture)N.setTexture3D(z,0),Xe=I.TEXTURE_3D;else if(z.isDataArrayTexture)N.setTexture2DArray(z,0),Xe=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,z.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,z.unpackAlignment);const Be=I.getParameter(I.UNPACK_ROW_LENGTH),Ve=I.getParameter(I.UNPACK_IMAGE_HEIGHT),ut=I.getParameter(I.UNPACK_SKIP_PIXELS),jt=I.getParameter(I.UNPACK_SKIP_ROWS),Jn=I.getParameter(I.UNPACK_SKIP_IMAGES),ht=ee.isCompressedTexture?ee.mipmaps[0]:ee.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,ht.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ht.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,A.min.x),I.pixelStorei(I.UNPACK_SKIP_ROWS,A.min.y),I.pixelStorei(I.UNPACK_SKIP_IMAGES,A.min.z),ee.isDataTexture||ee.isData3DTexture?I.texSubImage3D(Xe,se,X.x,X.y,X.z,Le,De,Ie,ze,Ye,ht.data):ee.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),I.compressedTexSubImage3D(Xe,se,X.x,X.y,X.z,Le,De,Ie,ze,ht.data)):I.texSubImage3D(Xe,se,X.x,X.y,X.z,Le,De,Ie,ze,Ye,ht),I.pixelStorei(I.UNPACK_ROW_LENGTH,Be),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ve),I.pixelStorei(I.UNPACK_SKIP_PIXELS,ut),I.pixelStorei(I.UNPACK_SKIP_ROWS,jt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Jn),se===0&&z.generateMipmaps&&I.generateMipmap(Xe),we.unbindTexture()},this.initTexture=function(A){A.isCubeTexture?N.setTextureCube(A,0):A.isData3DTexture?N.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?N.setTexture2DArray(A,0):N.setTexture2D(A,0),we.unbindTexture()},this.resetState=function(){v=0,M=0,S=null,we.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===je?vr:Qd}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===vr?je:li}}class lS extends oS{}lS.prototype.isWebGL1Renderer=!0;class Qb extends Ot{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}}class No extends Pi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new rt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Uf=new F,If=new F,Nf=new vt,rc=new Su,fo=new Ga;class cS extends Ot{constructor(e=new Fn,t=new No){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Uf.fromBufferAttribute(t,i-1),If.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Uf.distanceTo(If);e.setAttribute("lineDistance",new zt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fo.copy(n.boundingSphere),fo.applyMatrix4(i),fo.radius+=s,e.ray.intersectsSphere(fo)===!1)return;Nf.copy(i).invert(),rc.copy(e.ray).applyMatrix4(Nf);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new F,u=new F,h=new F,f=new F,d=this.isLineSegments?2:1,_=n.index,g=n.attributes.position;if(_!==null){const p=Math.max(0,o.start),y=Math.min(_.count,o.start+o.count);for(let v=p,M=y-1;v<M;v+=d){const S=_.getX(v),b=_.getX(v+1);if(c.fromBufferAttribute(g,S),u.fromBufferAttribute(g,b),rc.distanceSqToSegment(c,u,f,h)>l)continue;f.applyMatrix4(this.matrixWorld);const U=e.ray.origin.distanceTo(f);U<e.near||U>e.far||t.push({distance:U,point:h.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,o.start),y=Math.min(g.count,o.start+o.count);for(let v=p,M=y-1;v<M;v+=d){if(c.fromBufferAttribute(g,v),u.fromBufferAttribute(g,v+1),rc.distanceSqToSegment(c,u,f,h)>l)continue;f.applyMatrix4(this.matrixWorld);const b=e.ray.origin.distanceTo(f);b<e.near||b>e.far||t.push({distance:b,point:h.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const Of=new F,Ff=new F;class Bf extends cS{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Of.fromBufferAttribute(t,i),Ff.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Of.distanceTo(Ff);e.setAttribute("lineDistance",new zt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ea extends Pi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new rt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const zf=new vt,Gc=new Su,po=new Ga,mo=new F;class sc extends Ot{constructor(e=new Fn,t=new ea){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),po.copy(n.boundingSphere),po.applyMatrix4(i),po.radius+=s,e.ray.intersectsSphere(po)===!1)return;zf.copy(i).invert(),Gc.copy(e.ray).applyMatrix4(zf);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let _=f,m=d;_<m;_++){const g=c.getX(_);mo.fromBufferAttribute(h,g),kf(mo,g,l,i,e,t,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let _=f,m=d;_<m;_++)mo.fromBufferAttribute(h,_),kf(mo,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function kf(r,e,t,n,i,s,o){const a=Gc.distanceSqToPoint(r);if(a<t){const l=new F;Gc.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class ui{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);const u=n[i],f=n[i+1]-u,d=(o-u)/f;return(i+d)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),l=t||(o.isVector2?new Ae:new F);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new F,i=[],s=[],o=[],a=new F,l=new vt;for(let d=0;d<=e;d++){const _=d/e;i[d]=this.getTangentAt(_,new F)}s[0]=new F,o[0]=new F;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();const _=Math.acos(Xt(i[d-1].dot(i[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(a,_))}o[d].crossVectors(i[d],s[d])}if(t===!0){let d=Math.acos(Xt(s[0].dot(s[e]),-1,1));d/=e,i[0].dot(a.crossVectors(s[0],s[e]))>0&&(d=-d);for(let _=1;_<=e;_++)s[_].applyMatrix4(l.makeRotationAxis(i[_],d*_)),o[_].crossVectors(i[_],s[_])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.5,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class wu extends ui{constructor(e=0,t=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t){const n=t||new Ae,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class uS extends wu{constructor(e,t,n,i,s,o){super(e,t,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Au(){let r=0,e=0,t=0,n=0;function i(s,o,a,l){r=s,e=a,t=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){i(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,h){let f=(o-s)/c-(a-s)/(c+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+h)+(l-a)/h;f*=u,d*=u,i(o,a,f,d)},calc:function(s){const o=s*s,a=o*s;return r+e*s+t*o+n*a}}}const _o=new F,ac=new Au,oc=new Au,lc=new Au;class hS extends ui{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new F){const n=t,i=this.points,s=i.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=i[(a-1)%s]:(_o.subVectors(i[0],i[1]).add(i[0]),c=_o);const h=i[a%s],f=i[(a+1)%s];if(this.closed||a+2<s?u=i[(a+2)%s]:(_o.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=_o),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let _=Math.pow(c.distanceToSquared(h),d),m=Math.pow(h.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(u),d);m<1e-4&&(m=1),_<1e-4&&(_=m),g<1e-4&&(g=m),ac.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,_,m,g),oc.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,_,m,g),lc.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,_,m,g)}else this.curveType==="catmullrom"&&(ac.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),oc.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),lc.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return n.set(ac.calc(l),oc.calc(l),lc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new F().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Gf(r,e,t,n,i){const s=(n-e)*.5,o=(i-t)*.5,a=r*r,l=r*a;return(2*t-2*n+s+o)*l+(-3*t+3*n-2*s-o)*a+s*r+t}function fS(r,e){const t=1-r;return t*t*e}function dS(r,e){return 2*(1-r)*r*e}function pS(r,e){return r*r*e}function ua(r,e,t,n){return fS(r,e)+dS(r,t)+pS(r,n)}function mS(r,e){const t=1-r;return t*t*t*e}function _S(r,e){const t=1-r;return 3*t*t*r*e}function gS(r,e){return 3*(1-r)*r*r*e}function vS(r,e){return r*r*r*e}function ha(r,e,t,n,i){return mS(r,e)+_S(r,t)+gS(r,n)+vS(r,i)}class yp extends ui{constructor(e=new Ae,t=new Ae,n=new Ae,i=new Ae){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new Ae){const n=t,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(ha(e,i.x,s.x,o.x,a.x),ha(e,i.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class xS extends ui{constructor(e=new F,t=new F,n=new F,i=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new F){const n=t,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(ha(e,i.x,s.x,o.x,a.x),ha(e,i.y,s.y,o.y,a.y),ha(e,i.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ru extends ui{constructor(e=new Ae,t=new Ae){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ae){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ae){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class yS extends ui{constructor(e=new F,t=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new F){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new F){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Mp extends ui{constructor(e=new Ae,t=new Ae,n=new Ae){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Ae){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(ua(e,i.x,s.x,o.x),ua(e,i.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class MS extends ui{constructor(e=new F,t=new F,n=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new F){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(ua(e,i.x,s.x,o.x),ua(e,i.y,s.y,o.y),ua(e,i.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Sp extends ui{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ae){const n=t,i=this.points,s=(i.length-1)*e,o=Math.floor(s),a=s-o,l=i[o===0?o:o-1],c=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(Gf(a,l.x,c.x,u.x,h.x),Gf(a,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new Ae().fromArray(i))}return this}}var Ep=Object.freeze({__proto__:null,ArcCurve:uS,CatmullRomCurve3:hS,CubicBezierCurve:yp,CubicBezierCurve3:xS,EllipseCurve:wu,LineCurve:Ru,LineCurve3:yS,QuadraticBezierCurve:Mp,QuadraticBezierCurve3:MS,SplineCurve:Sp});class SS extends ui{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);e.equals(t)||this.curves.push(new Ru(t,e))}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Ep[i.type]().fromJSON(i))}return this}}class Hc extends SS{constructor(e){super(),this.type="Path",this.currentPoint=new Ae,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Ru(this.currentPoint.clone(),new Ae(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new Mp(this.currentPoint.clone(),new Ae(e,t),new Ae(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,o){const a=new yp(this.currentPoint.clone(),new Ae(e,t),new Ae(n,i),new Ae(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Sp(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,s,o),this}absarc(e,t,n,i,s,o){return this.absellipse(e,t,n,n,i,s,o),this}ellipse(e,t,n,i,s,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,i,s,o,a,l),this}absellipse(e,t,n,i,s,o,a,l){const c=new wu(e,t,n,i,s,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Oo extends Hc{constructor(e){super(e),this.uuid=Fs(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new Hc().fromJSON(i))}return this}}const ES={triangulate:function(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=bp(r,0,i,t,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,u,h,f,d;if(n&&(s=RS(r,e,s,t)),r.length>80*t){a=c=r[0],l=u=r[1];for(let _=t;_<i;_+=t)h=r[_],f=r[_+1],h<a&&(a=h),f<l&&(l=f),h>c&&(c=h),f>u&&(u=f);d=Math.max(c-a,u-l),d=d!==0?32767/d:0}return Ra(s,o,t,a,l,d,0),o}};function bp(r,e,t,n,i){let s,o;if(i===zS(r,e,t,n)>0)for(s=e;s<t;s+=n)o=Hf(s,r[s],r[s+1],o);else for(s=t-n;s>=e;s-=n)o=Hf(s,r[s],r[s+1],o);return o&&dl(o,o.next)&&(Pa(o),o=o.next),o}function Cr(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(dl(t,t.next)||_t(t.prev,t,t.next)===0)){if(Pa(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Ra(r,e,t,n,i,s,o){if(!r)return;!o&&s&&US(r,n,i,s);let a=r,l,c;for(;r.prev!==r.next;){if(l=r.prev,c=r.next,s?TS(r,n,i,s):bS(r)){e.push(l.i/t|0),e.push(r.i/t|0),e.push(c.i/t|0),Pa(r),r=c.next,a=c.next;continue}if(r=c,r===a){o?o===1?(r=wS(Cr(r),e,t),Ra(r,e,t,n,i,s,2)):o===2&&AS(r,e,t,n,i,s):Ra(Cr(r),e,t,n,i,s,1);break}}}function bS(r){const e=r.prev,t=r,n=r.next;if(_t(e,t,n)>=0)return!1;const i=e.x,s=t.x,o=n.x,a=e.y,l=t.y,c=n.y,u=i<s?i<o?i:o:s<o?s:o,h=a<l?a<c?a:c:l<c?l:c,f=i>s?i>o?i:o:s>o?s:o,d=a>l?a>c?a:c:l>c?l:c;let _=n.next;for(;_!==e;){if(_.x>=u&&_.x<=f&&_.y>=h&&_.y<=d&&cs(i,a,s,l,o,c,_.x,_.y)&&_t(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function TS(r,e,t,n){const i=r.prev,s=r,o=r.next;if(_t(i,s,o)>=0)return!1;const a=i.x,l=s.x,c=o.x,u=i.y,h=s.y,f=o.y,d=a<l?a<c?a:c:l<c?l:c,_=u<h?u<f?u:f:h<f?h:f,m=a>l?a>c?a:c:l>c?l:c,g=u>h?u>f?u:f:h>f?h:f,p=Vc(d,_,e,t,n),y=Vc(m,g,e,t,n);let v=r.prevZ,M=r.nextZ;for(;v&&v.z>=p&&M&&M.z<=y;){if(v.x>=d&&v.x<=m&&v.y>=_&&v.y<=g&&v!==i&&v!==o&&cs(a,u,l,h,c,f,v.x,v.y)&&_t(v.prev,v,v.next)>=0||(v=v.prevZ,M.x>=d&&M.x<=m&&M.y>=_&&M.y<=g&&M!==i&&M!==o&&cs(a,u,l,h,c,f,M.x,M.y)&&_t(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;v&&v.z>=p;){if(v.x>=d&&v.x<=m&&v.y>=_&&v.y<=g&&v!==i&&v!==o&&cs(a,u,l,h,c,f,v.x,v.y)&&_t(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;M&&M.z<=y;){if(M.x>=d&&M.x<=m&&M.y>=_&&M.y<=g&&M!==i&&M!==o&&cs(a,u,l,h,c,f,M.x,M.y)&&_t(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function wS(r,e,t){let n=r;do{const i=n.prev,s=n.next.next;!dl(i,s)&&Tp(i,n,n.next,s)&&Ca(i,s)&&Ca(s,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),Pa(n),Pa(n.next),n=r=s),n=n.next}while(n!==r);return Cr(n)}function AS(r,e,t,n,i,s){let o=r;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&OS(o,a)){let l=wp(o,a);o=Cr(o,o.next),l=Cr(l,l.next),Ra(o,e,t,n,i,s,0),Ra(l,e,t,n,i,s,0);return}a=a.next}o=o.next}while(o!==r)}function RS(r,e,t,n){const i=[];let s,o,a,l,c;for(s=0,o=e.length;s<o;s++)a=e[s]*n,l=s<o-1?e[s+1]*n:r.length,c=bp(r,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(NS(c));for(i.sort(CS),s=0;s<i.length;s++)t=PS(i[s],t);return t}function CS(r,e){return r.x-e.x}function PS(r,e){const t=LS(r,e);if(!t)return e;const n=wp(t,r);return Cr(n,n.next),Cr(t,t.next)}function LS(r,e){let t=e,n=-1/0,i;const s=r.x,o=r.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const f=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=s&&f>n&&(n=f,i=t.x<t.next.x?t:t.next,f===s))return i}t=t.next}while(t!==e);if(!i)return null;const a=i,l=i.x,c=i.y;let u=1/0,h;t=i;do s>=t.x&&t.x>=l&&s!==t.x&&cs(o<c?s:n,o,l,c,o<c?n:s,o,t.x,t.y)&&(h=Math.abs(o-t.y)/(s-t.x),Ca(t,r)&&(h<u||h===u&&(t.x>i.x||t.x===i.x&&DS(i,t)))&&(i=t,u=h)),t=t.next;while(t!==a);return i}function DS(r,e){return _t(r.prev,r,e.prev)<0&&_t(e.next,r,r.next)<0}function US(r,e,t,n){let i=r;do i.z===0&&(i.z=Vc(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,IS(i)}function IS(r){let e,t,n,i,s,o,a,l,c=1;do{for(t=r,r=null,s=null,o=0;t;){for(o++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;t=n}s.nextZ=null,c*=2}while(o>1);return r}function Vc(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function NS(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function cs(r,e,t,n,i,s,o,a){return(i-o)*(e-a)>=(r-o)*(s-a)&&(r-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(i-o)*(n-a)}function OS(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!FS(r,e)&&(Ca(r,e)&&Ca(e,r)&&BS(r,e)&&(_t(r.prev,r,e.prev)||_t(r,e.prev,e))||dl(r,e)&&_t(r.prev,r,r.next)>0&&_t(e.prev,e,e.next)>0)}function _t(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function dl(r,e){return r.x===e.x&&r.y===e.y}function Tp(r,e,t,n){const i=vo(_t(r,e,t)),s=vo(_t(r,e,n)),o=vo(_t(t,n,r)),a=vo(_t(t,n,e));return!!(i!==s&&o!==a||i===0&&go(r,t,e)||s===0&&go(r,n,e)||o===0&&go(t,r,n)||a===0&&go(t,e,n))}function go(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function vo(r){return r>0?1:r<0?-1:0}function FS(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&Tp(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function Ca(r,e){return _t(r.prev,r,r.next)<0?_t(r,e,r.next)>=0&&_t(r,r.prev,e)>=0:_t(r,e,r.prev)<0||_t(r,r.next,e)<0}function BS(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function wp(r,e){const t=new Wc(r.i,r.x,r.y),n=new Wc(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Hf(r,e,t,n){const i=new Wc(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Pa(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Wc(r,e,t){this.i=r,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function zS(r,e,t,n){let i=0;for(let s=e,o=t-n;s<t;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class vs{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return vs.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];Vf(e),Wf(n,e);let o=e.length;t.forEach(Vf);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,Wf(n,t[l]);const a=ES.triangulate(n,i);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Vf(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function Wf(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class Cu extends Fn{constructor(e=new Oo([new Ae(.5,.5),new Ae(-.5,.5),new Ae(-.5,-.5),new Ae(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new zt(i,3)),this.setAttribute("uv",new zt(s,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,_=t.bevelSize!==void 0?t.bevelSize:d-.1,m=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:kS;let v,M=!1,S,b,w,U;p&&(v=p.getSpacedPoints(u),M=!0,f=!1,S=p.computeFrenetFrames(u,!1),b=new F,w=new F,U=new F),f||(g=0,d=0,_=0,m=0);const x=a.extractPoints(c);let T=x.shape;const H=x.holes;if(!vs.isClockWise(T)){T=T.reverse();for(let C=0,L=H.length;C<L;C++){const N=H[C];vs.isClockWise(N)&&(H[C]=N.reverse())}}const B=vs.triangulateShape(T,H),k=T;for(let C=0,L=H.length;C<L;C++){const N=H[C];T=T.concat(N)}function W(C,L,N){return L||console.error("THREE.ExtrudeGeometry: vec does not exist"),C.clone().addScaledVector(L,N)}const te=T.length,$=B.length;function J(C,L,N){let G,j,D;const he=C.x-L.x,ae=C.y-L.y,Me=N.x-C.x,ge=N.y-C.y,R=he*he+ae*ae,E=he*ge-ae*Me;if(Math.abs(E)>Number.EPSILON){const Y=Math.sqrt(R),K=Math.sqrt(Me*Me+ge*ge),Z=L.x-ae/Y,oe=L.y+he/Y,ve=N.x-ge/K,xe=N.y+Me/K,V=((ve-Z)*ge-(xe-oe)*Me)/(he*ge-ae*Me);G=Z+he*V-C.x,j=oe+ae*V-C.y;const me=G*G+j*j;if(me<=2)return new Ae(G,j);D=Math.sqrt(me/2)}else{let Y=!1;he>Number.EPSILON?Me>Number.EPSILON&&(Y=!0):he<-Number.EPSILON?Me<-Number.EPSILON&&(Y=!0):Math.sign(ae)===Math.sign(ge)&&(Y=!0),Y?(G=-ae,j=he,D=Math.sqrt(R)):(G=he,j=ae,D=Math.sqrt(R/2))}return new Ae(G/D,j/D)}const ne=[];for(let C=0,L=k.length,N=L-1,G=C+1;C<L;C++,N++,G++)N===L&&(N=0),G===L&&(G=0),ne[C]=J(k[C],k[N],k[G]);const P=[];let pe,_e=ne.concat();for(let C=0,L=H.length;C<L;C++){const N=H[C];pe=[];for(let G=0,j=N.length,D=j-1,he=G+1;G<j;G++,D++,he++)D===j&&(D=0),he===j&&(he=0),pe[G]=J(N[G],N[D],N[he]);P.push(pe),_e=_e.concat(pe)}for(let C=0;C<g;C++){const L=C/g,N=d*Math.cos(L*Math.PI/2),G=_*Math.sin(L*Math.PI/2)+m;for(let j=0,D=k.length;j<D;j++){const he=W(k[j],ne[j],G);I(he.x,he.y,-N)}for(let j=0,D=H.length;j<D;j++){const he=H[j];pe=P[j];for(let ae=0,Me=he.length;ae<Me;ae++){const ge=W(he[ae],pe[ae],G);I(ge.x,ge.y,-N)}}}const Q=_+m;for(let C=0;C<te;C++){const L=f?W(T[C],_e[C],Q):T[C];M?(w.copy(S.normals[0]).multiplyScalar(L.x),b.copy(S.binormals[0]).multiplyScalar(L.y),U.copy(v[0]).add(w).add(b),I(U.x,U.y,U.z)):I(L.x,L.y,0)}for(let C=1;C<=u;C++)for(let L=0;L<te;L++){const N=f?W(T[L],_e[L],Q):T[L];M?(w.copy(S.normals[C]).multiplyScalar(N.x),b.copy(S.binormals[C]).multiplyScalar(N.y),U.copy(v[C]).add(w).add(b),I(U.x,U.y,U.z)):I(N.x,N.y,h/u*C)}for(let C=g-1;C>=0;C--){const L=C/g,N=d*Math.cos(L*Math.PI/2),G=_*Math.sin(L*Math.PI/2)+m;for(let j=0,D=k.length;j<D;j++){const he=W(k[j],ne[j],G);I(he.x,he.y,h+N)}for(let j=0,D=H.length;j<D;j++){const he=H[j];pe=P[j];for(let ae=0,Me=he.length;ae<Me;ae++){const ge=W(he[ae],pe[ae],G);M?I(ge.x,ge.y+v[u-1].y,v[u-1].x+N):I(ge.x,ge.y,h+N)}}}re(),de();function re(){const C=i.length/3;if(f){let L=0,N=te*L;for(let G=0;G<$;G++){const j=B[G];Ce(j[2]+N,j[1]+N,j[0]+N)}L=u+g*2,N=te*L;for(let G=0;G<$;G++){const j=B[G];Ce(j[0]+N,j[1]+N,j[2]+N)}}else{for(let L=0;L<$;L++){const N=B[L];Ce(N[2],N[1],N[0])}for(let L=0;L<$;L++){const N=B[L];Ce(N[0]+te*u,N[1]+te*u,N[2]+te*u)}}n.addGroup(C,i.length/3-C,0)}function de(){const C=i.length/3;let L=0;ue(k,L),L+=k.length;for(let N=0,G=H.length;N<G;N++){const j=H[N];ue(j,L),L+=j.length}n.addGroup(C,i.length/3-C,1)}function ue(C,L){let N=C.length;for(;--N>=0;){const G=N;let j=N-1;j<0&&(j=C.length-1);for(let D=0,he=u+g*2;D<he;D++){const ae=te*D,Me=te*(D+1),ge=L+G+ae,R=L+j+ae,E=L+j+Me,Y=L+G+Me;ke(ge,R,E,Y)}}}function I(C,L,N){l.push(C),l.push(L),l.push(N)}function Ce(C,L,N){ce(C),ce(L),ce(N);const G=i.length/3,j=y.generateTopUV(n,i,G-3,G-2,G-1);we(j[0]),we(j[1]),we(j[2])}function ke(C,L,N,G){ce(C),ce(L),ce(G),ce(L),ce(N),ce(G);const j=i.length/3,D=y.generateSideWallUV(n,i,j-6,j-3,j-2,j-1);we(D[0]),we(D[1]),we(D[3]),we(D[1]),we(D[2]),we(D[3])}function ce(C){i.push(l[C*3+0]),i.push(l[C*3+1]),i.push(l[C*3+2])}function we(C){s.push(C.x),s.push(C.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return GS(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,o=e.shapes.length;s<o;s++){const a=t[e.shapes[s]];n.push(a)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Ep[i.type]().fromJSON(i)),new Cu(n,e.options)}}const kS={generateTopUV:function(r,e,t,n,i){const s=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[i*3],u=e[i*3+1];return[new Ae(s,o),new Ae(a,l),new Ae(c,u)]},generateSideWallUV:function(r,e,t,n,i,s){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],h=e[n*3+2],f=e[i*3],d=e[i*3+1],_=e[i*3+2],m=e[s*3],g=e[s*3+1],p=e[s*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new Ae(o,1-l),new Ae(c,1-h),new Ae(f,1-_),new Ae(m,1-p)]:[new Ae(a,1-l),new Ae(u,1-h),new Ae(d,1-_),new Ae(g,1-p)]}};function GS(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];t.shapes.push(s.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Ap extends Pi{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new rt(16777215),this.specular=new rt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ep,this.normalScale=new Ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Mu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const jo={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class HS{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){const d=c[h],_=c[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return _}return null}}}const Rp=new HS;class zs{constructor(e){this.manager=e!==void 0?e:Rp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}const vi={};class VS extends Error{constructor(e,t){super(e),this.response=t}}class Pu extends zs{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=jo.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(vi[e]!==void 0){vi[e].push({onLoad:t,onProgress:n,onError:i});return}vi[e]=[],vi[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=vi[e],h=c.body.getReader(),f=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),d=f?parseInt(f):0,_=d!==0;let m=0;const g=new ReadableStream({start(p){y();function y(){h.read().then(({done:v,value:M})=>{if(v)p.close();else{m+=M.byteLength;const S=new ProgressEvent("progress",{lengthComputable:_,loaded:m,total:d});for(let b=0,w=u.length;b<w;b++){const U=u[b];U.onProgress&&U.onProgress(S)}p.enqueue(M),y()}})}}});return new Response(g)}else throw new VS(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return c.arrayBuffer().then(_=>d.decode(_))}}}).then(c=>{jo.add(e,c);const u=vi[e];delete vi[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onLoad&&d.onLoad(c)}}).catch(c=>{const u=vi[e];if(u===void 0)throw this.manager.itemError(e),c;delete vi[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onError&&d.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class WS extends zs{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=jo.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=Aa("img");function l(){u(),jo.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(h){u(),i&&i(h),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class XS extends zs{constructor(e){super(e)}load(e,t,n,i){const s=new cn,o=new WS(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Lu extends Ot{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new rt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const cc=new vt,Xf=new F,qf=new F;class Cp{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ae(512,512),this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Eu,this._frameExtents=new Ae(1,1),this._viewportCount=1,this._viewports=[new pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Xf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Xf),qf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(qf),t.updateMatrixWorld(),cc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(cc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(cc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Yf=new vt,qs=new F,uc=new F;class qS extends Cp{constructor(){super(new Ln(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ae(4,2),this._viewportCount=6,this._viewports=[new pt(2,1,1,1),new pt(0,1,1,1),new pt(3,1,1,1),new pt(1,1,1,1),new pt(3,0,1,1),new pt(1,0,1,1)],this._cubeDirections=[new F(1,0,0),new F(-1,0,0),new F(0,0,1),new F(0,0,-1),new F(0,1,0),new F(0,-1,0)],this._cubeUps=[new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,0,1),new F(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),qs.setFromMatrixPosition(e.matrixWorld),n.position.copy(qs),uc.copy(n.position),uc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(uc),n.updateMatrixWorld(),i.makeTranslation(-qs.x,-qs.y,-qs.z),Yf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Yf)}}class eT extends Lu{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new qS}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class YS extends Cp{constructor(){super(new mp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class tT extends Lu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ot.DEFAULT_UP),this.updateMatrix(),this.target=new Ot,this.shadow=new YS}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class nT extends Lu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class $S{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class jS{constructor(){this.type="ShapePath",this.color=new rt,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new Hc,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,s,o){return this.currentPath.bezierCurveTo(e,t,n,i,s,o),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(p){const y=[];for(let v=0,M=p.length;v<M;v++){const S=p[v],b=new Oo;b.curves=S.curves,y.push(b)}return y}function n(p,y){const v=y.length;let M=!1;for(let S=v-1,b=0;b<v;S=b++){let w=y[S],U=y[b],x=U.x-w.x,T=U.y-w.y;if(Math.abs(T)>Number.EPSILON){if(T<0&&(w=y[b],x=-x,U=y[S],T=-T),p.y<w.y||p.y>U.y)continue;if(p.y===w.y){if(p.x===w.x)return!0}else{const H=T*(p.x-w.x)-x*(p.y-w.y);if(H===0)return!0;if(H<0)continue;M=!M}}else{if(p.y!==w.y)continue;if(U.x<=p.x&&p.x<=w.x||w.x<=p.x&&p.x<=U.x)return!0}}return M}const i=vs.isClockWise,s=this.subPaths;if(s.length===0)return[];let o,a,l;const c=[];if(s.length===1)return a=s[0],l=new Oo,l.curves=a.curves,c.push(l),c;let u=!i(s[0].getPoints());u=e?!u:u;const h=[],f=[];let d=[],_=0,m;f[_]=void 0,d[_]=[];for(let p=0,y=s.length;p<y;p++)a=s[p],m=a.getPoints(),o=i(m),o=e?!o:o,o?(!u&&f[_]&&_++,f[_]={s:new Oo,p:m},f[_].s.curves=a.curves,u&&_++,d[_]=[]):d[_].push({h:a,p:m[0]});if(!f[0])return t(s);if(f.length>1){let p=!1,y=0;for(let v=0,M=f.length;v<M;v++)h[v]=[];for(let v=0,M=f.length;v<M;v++){const S=d[v];for(let b=0;b<S.length;b++){const w=S[b];let U=!0;for(let x=0;x<f.length;x++)n(w.p,f[x].p)&&(v!==x&&y++,U?(U=!1,h[x].push(w)):p=!0);U&&h[v].push(w)}}y>0&&p===!1&&(d=h)}let g;for(let p=0,y=f.length;p<y;p++){l=f[p].s,c.push(l),g=d[p];for(let v=0,M=g.length;v<M;v++)l.holes.push(g[v].h)}return c}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:yu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=yu);class iT extends Cu{constructor(e,t={}){const n=t.font;if(n===void 0)super();else{const i=n.generateShapes(e,t.size);t.depth=t.height!==void 0?t.height:50,t.bevelThickness===void 0&&(t.bevelThickness=10),t.bevelSize===void 0&&(t.bevelSize=8),t.bevelEnabled===void 0&&(t.bevelEnabled=!1),super(i,t)}this.type="TextGeometry"}}class rT extends zs{constructor(e){super(e)}load(e,t,n,i){const s=this,o=new Pu(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){const l=s.parse(JSON.parse(a));t&&t(l)},n,i)}parse(e){return new ZS(e)}}class ZS{constructor(e){this.isFont=!0,this.type="Font",this.data=e}generateShapes(e,t=100){const n=[],i=JS(e,t,this.data);for(let s=0,o=i.length;s<o;s++)n.push(...i[s].toShapes());return n}}function JS(r,e,t){const n=Array.from(r),i=e/t.resolution,s=(t.boundingBox.yMax-t.boundingBox.yMin+t.underlineThickness)*i,o=[];let a=0,l=0;for(let c=0;c<n.length;c++){const u=n[c];if(u===`
`)a=0,l-=s;else{const h=KS(u,i,a,l,t);a+=h.offsetX,o.push(h.path)}}return o}function KS(r,e,t,n,i){const s=i.glyphs[r]||i.glyphs["?"];if(!s){console.error('THREE.Font: character "'+r+'" does not exists in font family '+i.familyName+".");return}const o=new jS;let a,l,c,u,h,f,d,_;if(s.o){const m=s._cachedOutline||(s._cachedOutline=s.o.split(" "));for(let g=0,p=m.length;g<p;)switch(m[g++]){case"m":a=m[g++]*e+t,l=m[g++]*e+n,o.moveTo(a,l);break;case"l":a=m[g++]*e+t,l=m[g++]*e+n,o.lineTo(a,l);break;case"q":c=m[g++]*e+t,u=m[g++]*e+n,h=m[g++]*e+t,f=m[g++]*e+n,o.quadraticCurveTo(h,f,c,u);break;case"b":c=m[g++]*e+t,u=m[g++]*e+n,h=m[g++]*e+t,f=m[g++]*e+n,d=m[g++]*e+t,_=m[g++]*e+n,o.bezierCurveTo(h,f,d,_,c,u);break}}return{offsetX:s.ha*e,path:o}}const QS=/^[og]\s*(.+)?/,eE=/^mtllib /,tE=/^usemtl /,nE=/^usemap /,$f=/\s+/,jf=new F,hc=new F,Zf=new F,Jf=new F,An=new F,xo=new rt;function iE(){const r={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,t){if(this.object&&this.object.fromDeclaration===!1){this.object.name=e,this.object.fromDeclaration=t!==!1;return}const n=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:t!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(i,s){const o=this._finalize(!1);o&&(o.inherited||o.groupCount<=0)&&this.materials.splice(o.index,1);const a={index:this.materials.length,name:i||"",mtllib:Array.isArray(s)&&s.length>0?s[s.length-1]:"",smooth:o!==void 0?o.smooth:this.smooth,groupStart:o!==void 0?o.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(l){const c={index:typeof l=="number"?l:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return c.clone=this.clone.bind(c),c}};return this.materials.push(a),a},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(i){const s=this.currentMaterial();if(s&&s.groupEnd===-1&&(s.groupEnd=this.geometry.vertices.length/3,s.groupCount=s.groupEnd-s.groupStart,s.inherited=!1),i&&this.materials.length>1)for(let o=this.materials.length-1;o>=0;o--)this.materials[o].groupCount<=0&&this.materials.splice(o,1);return i&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),s}},n&&n.name&&typeof n.clone=="function"){const i=n.clone(0);i.inherited=!0,this.object.materials.push(i)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseNormalIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseUVIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/2)*2},addVertex:function(e,t,n){const i=this.vertices,s=this.object.geometry.vertices;s.push(i[e+0],i[e+1],i[e+2]),s.push(i[t+0],i[t+1],i[t+2]),s.push(i[n+0],i[n+1],i[n+2])},addVertexPoint:function(e){const t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addVertexLine:function(e){const t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addNormal:function(e,t,n){const i=this.normals,s=this.object.geometry.normals;s.push(i[e+0],i[e+1],i[e+2]),s.push(i[t+0],i[t+1],i[t+2]),s.push(i[n+0],i[n+1],i[n+2])},addFaceNormal:function(e,t,n){const i=this.vertices,s=this.object.geometry.normals;jf.fromArray(i,e),hc.fromArray(i,t),Zf.fromArray(i,n),An.subVectors(Zf,hc),Jf.subVectors(jf,hc),An.cross(Jf),An.normalize(),s.push(An.x,An.y,An.z),s.push(An.x,An.y,An.z),s.push(An.x,An.y,An.z)},addColor:function(e,t,n){const i=this.colors,s=this.object.geometry.colors;i[e]!==void 0&&s.push(i[e+0],i[e+1],i[e+2]),i[t]!==void 0&&s.push(i[t+0],i[t+1],i[t+2]),i[n]!==void 0&&s.push(i[n+0],i[n+1],i[n+2])},addUV:function(e,t,n){const i=this.uvs,s=this.object.geometry.uvs;s.push(i[e+0],i[e+1]),s.push(i[t+0],i[t+1]),s.push(i[n+0],i[n+1])},addDefaultUV:function(){const e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){const t=this.uvs;this.object.geometry.uvs.push(t[e+0],t[e+1])},addFace:function(e,t,n,i,s,o,a,l,c){const u=this.vertices.length;let h=this.parseVertexIndex(e,u),f=this.parseVertexIndex(t,u),d=this.parseVertexIndex(n,u);if(this.addVertex(h,f,d),this.addColor(h,f,d),a!==void 0&&a!==""){const _=this.normals.length;h=this.parseNormalIndex(a,_),f=this.parseNormalIndex(l,_),d=this.parseNormalIndex(c,_),this.addNormal(h,f,d)}else this.addFaceNormal(h,f,d);if(i!==void 0&&i!==""){const _=this.uvs.length;h=this.parseUVIndex(i,_),f=this.parseUVIndex(s,_),d=this.parseUVIndex(o,_),this.addUV(h,f,d),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";const t=this.vertices.length;for(let n=0,i=e.length;n<i;n++){const s=this.parseVertexIndex(e[n],t);this.addVertexPoint(s),this.addColor(s)}},addLineGeometry:function(e,t){this.object.geometry.type="Line";const n=this.vertices.length,i=this.uvs.length;for(let s=0,o=e.length;s<o;s++)this.addVertexLine(this.parseVertexIndex(e[s],n));for(let s=0,o=t.length;s<o;s++)this.addUVLine(this.parseUVIndex(t[s],i))}};return r.startObject("",!1),r}class sT extends zs{constructor(e){super(e),this.materials=null}load(e,t,n,i){const s=this,o=new Pu(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{t(s.parse(a))}catch(l){i?i(l):console.error(l),s.manager.itemError(e)}},n,i)}setMaterials(e){return this.materials=e,this}parse(e){const t=new iE;e.indexOf(`\r
`)!==-1&&(e=e.replace(/\r\n/g,`
`)),e.indexOf(`\\
`)!==-1&&(e=e.replace(/\\\n/g,""));const n=e.split(`
`);let i=[];for(let a=0,l=n.length;a<l;a++){const c=n[a].trimStart();if(c.length===0)continue;const u=c.charAt(0);if(u!=="#")if(u==="v"){const h=c.split($f);switch(h[0]){case"v":t.vertices.push(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3])),h.length>=7?(xo.setRGB(parseFloat(h[4]),parseFloat(h[5]),parseFloat(h[6])).convertSRGBToLinear(),t.colors.push(xo.r,xo.g,xo.b)):t.colors.push(void 0,void 0,void 0);break;case"vn":t.normals.push(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3]));break;case"vt":t.uvs.push(parseFloat(h[1]),parseFloat(h[2]));break}}else if(u==="f"){const f=c.slice(1).trim().split($f),d=[];for(let m=0,g=f.length;m<g;m++){const p=f[m];if(p.length>0){const y=p.split("/");d.push(y)}}const _=d[0];for(let m=1,g=d.length-1;m<g;m++){const p=d[m],y=d[m+1];t.addFace(_[0],p[0],y[0],_[1],p[1],y[1],_[2],p[2],y[2])}}else if(u==="l"){const h=c.substring(1).trim().split(" ");let f=[];const d=[];if(c.indexOf("/")===-1)f=h;else for(let _=0,m=h.length;_<m;_++){const g=h[_].split("/");g[0]!==""&&f.push(g[0]),g[1]!==""&&d.push(g[1])}t.addLineGeometry(f,d)}else if(u==="p"){const f=c.slice(1).trim().split(" ");t.addPointGeometry(f)}else if((i=QS.exec(c))!==null){const h=(" "+i[0].slice(1).trim()).slice(1);t.startObject(h)}else if(tE.test(c))t.object.startMaterial(c.substring(7).trim(),t.materialLibraries);else if(eE.test(c))t.materialLibraries.push(c.substring(7).trim());else if(nE.test(c))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(u==="s"){if(i=c.split(" "),i.length>1){const f=i[1].trim().toLowerCase();t.object.smooth=f!=="0"&&f!=="off"}else t.object.smooth=!0;const h=t.object.currentMaterial();h&&(h.smooth=t.object.smooth)}else{if(c==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+c+'"')}}t.finalize();const s=new Qs;if(s.materialLibraries=[].concat(t.materialLibraries),!(t.objects.length===1&&t.objects[0].geometry.vertices.length===0)===!0)for(let a=0,l=t.objects.length;a<l;a++){const c=t.objects[a],u=c.geometry,h=c.materials,f=u.type==="Line",d=u.type==="Points";let _=!1;if(u.vertices.length===0)continue;const m=new Fn;m.setAttribute("position",new zt(u.vertices,3)),u.normals.length>0&&m.setAttribute("normal",new zt(u.normals,3)),u.colors.length>0&&(_=!0,m.setAttribute("color",new zt(u.colors,3))),u.hasUVIndices===!0&&m.setAttribute("uv",new zt(u.uvs,2));const g=[];for(let y=0,v=h.length;y<v;y++){const M=h[y],S=M.name+"_"+M.smooth+"_"+_;let b=t.materials[S];if(this.materials!==null){if(b=this.materials.create(M.name),f&&b&&!(b instanceof No)){const w=new No;Pi.prototype.copy.call(w,b),w.color.copy(b.color),b=w}else if(d&&b&&!(b instanceof ea)){const w=new ea({size:10,sizeAttenuation:!1});Pi.prototype.copy.call(w,b),w.color.copy(b.color),w.map=b.map,b=w}}b===void 0&&(f?b=new No:d?b=new ea({size:1,sizeAttenuation:!1}):b=new Ap,b.name=M.name,b.flatShading=!M.smooth,b.vertexColors=_,t.materials[S]=b),g.push(b)}let p;if(g.length>1){for(let y=0,v=h.length;y<v;y++){const M=h[y];m.addGroup(M.groupStart,M.groupCount,y)}f?p=new Bf(m,g):d?p=new sc(m,g):p=new ii(m,g)}else f?p=new Bf(m,g[0]):d?p=new sc(m,g[0]):p=new ii(m,g[0]);p.name=c.name,s.add(p)}else if(t.vertices.length>0){const a=new ea({size:1,sizeAttenuation:!1}),l=new Fn;l.setAttribute("position",new zt(t.vertices,3)),t.colors.length>0&&t.colors[0]!==void 0&&(l.setAttribute("color",new zt(t.colors,3)),a.vertexColors=!0);const c=new sc(l,a);s.add(c)}return s}}class aT extends zs{constructor(e){super(e)}load(e,t,n,i){const s=this,o=this.path===""?$S.extractUrlBase(e):this.path,a=new Pu(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){try{t(s.parse(l,o))}catch(c){i?i(c):console.error(c),s.manager.itemError(e)}},n,i)}setMaterialOptions(e){return this.materialOptions=e,this}parse(e,t){const n=e.split(`
`);let i={};const s=/\s+/,o={};for(let l=0;l<n.length;l++){let c=n[l];if(c=c.trim(),c.length===0||c.charAt(0)==="#")continue;const u=c.indexOf(" ");let h=u>=0?c.substring(0,u):c;h=h.toLowerCase();let f=u>=0?c.substring(u+1):"";if(f=f.trim(),h==="newmtl")i={name:f},o[f]=i;else if(h==="ka"||h==="kd"||h==="ks"||h==="ke"){const d=f.split(s,3);i[h]=[parseFloat(d[0]),parseFloat(d[1]),parseFloat(d[2])]}else i[h]=f}const a=new rE(this.resourcePath||t,this.materialOptions);return a.setCrossOrigin(this.crossOrigin),a.setManager(this.manager),a.setMaterials(o),a}}class rE{constructor(e="",t={}){this.baseUrl=e,this.options=t,this.materialsInfo={},this.materials={},this.materialsArray=[],this.nameLookup={},this.crossOrigin="anonymous",this.side=this.options.side!==void 0?this.options.side:Ci,this.wrap=this.options.wrap!==void 0?this.options.wrap:$o}setCrossOrigin(e){return this.crossOrigin=e,this}setManager(e){this.manager=e}setMaterials(e){this.materialsInfo=this.convert(e),this.materials={},this.materialsArray=[],this.nameLookup={}}convert(e){if(!this.options)return e;const t={};for(const n in e){const i=e[n],s={};t[n]=s;for(const o in i){let a=!0,l=i[o];const c=o.toLowerCase();switch(c){case"kd":case"ka":case"ks":this.options&&this.options.normalizeRGB&&(l=[l[0]/255,l[1]/255,l[2]/255]),this.options&&this.options.ignoreZeroRGBs&&l[0]===0&&l[1]===0&&l[2]===0&&(a=!1);break}a&&(s[c]=l)}}return t}preload(){for(const e in this.materialsInfo)this.create(e)}getIndex(e){return this.nameLookup[e]}getAsArray(){let e=0;for(const t in this.materialsInfo)this.materialsArray[e]=this.create(t),this.nameLookup[t]=e,e++;return this.materialsArray}create(e){return this.materials[e]===void 0&&this.createMaterial_(e),this.materials[e]}createMaterial_(e){const t=this,n=this.materialsInfo[e],i={name:e,side:this.side};function s(a,l){return typeof l!="string"||l===""?"":/^https?:\/\//i.test(l)?l:a+l}function o(a,l){if(i[a])return;const c=t.getTextureParams(l,i),u=t.loadTexture(s(t.baseUrl,c.url));u.repeat.copy(c.scale),u.offset.copy(c.offset),u.wrapS=t.wrap,u.wrapT=t.wrap,(a==="map"||a==="emissiveMap")&&(u.colorSpace=je),i[a]=u}for(const a in n){const l=n[a];let c;if(l!=="")switch(a.toLowerCase()){case"kd":i.color=new rt().fromArray(l).convertSRGBToLinear();break;case"ks":i.specular=new rt().fromArray(l).convertSRGBToLinear();break;case"ke":i.emissive=new rt().fromArray(l).convertSRGBToLinear();break;case"map_kd":o("map",l);break;case"map_ks":o("specularMap",l);break;case"map_ke":o("emissiveMap",l);break;case"norm":o("normalMap",l);break;case"map_bump":case"bump":o("bumpMap",l);break;case"map_d":o("alphaMap",l),i.transparent=!0;break;case"ns":i.shininess=parseFloat(l);break;case"d":c=parseFloat(l),c<1&&(i.opacity=c,i.transparent=!0);break;case"tr":c=parseFloat(l),this.options&&this.options.invertTrProperty&&(c=1-c),c>0&&(i.opacity=1-c,i.transparent=!0);break}}return this.materials[e]=new Ap(i),this.materials[e]}getTextureParams(e,t){const n={scale:new Ae(1,1),offset:new Ae(0,0)},i=e.split(/\s+/);let s;return s=i.indexOf("-bm"),s>=0&&(t.bumpScale=parseFloat(i[s+1]),i.splice(s,2)),s=i.indexOf("-s"),s>=0&&(n.scale.set(parseFloat(i[s+1]),parseFloat(i[s+2])),i.splice(s,4)),s=i.indexOf("-o"),s>=0&&(n.offset.set(parseFloat(i[s+1]),parseFloat(i[s+2])),i.splice(s,4)),n.url=i.join(" ").trim(),n}loadTexture(e,t,n,i,s){const o=this.manager!==void 0?this.manager:Rp;let a=o.getHandler(e);a===null&&(a=new XS(o)),a.setCrossOrigin&&a.setCrossOrigin(this.crossOrigin);const l=a.load(e,n,i,s);return t!==void 0&&(l.mapping=t),l}}function Mi(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Pp(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var bn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Rs={duration:.5,overwrite:!1,delay:0},Du,Yt,wt,Un=1e8,ct=1/Un,Xc=Math.PI*2,sE=Xc/4,aE=0,Lp=Math.sqrt,oE=Math.cos,lE=Math.sin,Ft=function(e){return typeof e=="string"},Mt=function(e){return typeof e=="function"},Li=function(e){return typeof e=="number"},Uu=function(e){return typeof e>"u"},ci=function(e){return typeof e=="object"},un=function(e){return e!==!1},Iu=function(){return typeof window<"u"},yo=function(e){return Mt(e)||Ft(e)},Dp=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},$t=Array.isArray,qc=/(?:-?\.?\d|\.)+/gi,Up=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,us=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,fc=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Ip=/[+-]=-?[.\d]+/,Np=/[^,'"\[\]\s]+/gi,cE=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,mt,Cn,Yc,Nu,Tn={},Zo={},Op,Fp=function(e){return(Zo=Pr(e,Tn))&&dn},Ou=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Jo=function(e,t){return!t&&console.warn(e)},Bp=function(e,t){return e&&(Tn[e]=t)&&Zo&&(Zo[e]=t)||Tn},La=function(){return 0},uE={suppressEvents:!0,isStart:!0,kill:!1},Fo={suppressEvents:!0,kill:!1},hE={suppressEvents:!0},Fu={},qi=[],$c={},zp,yn={},dc={},Kf=30,Bo=[],Bu="",zu=function(e){var t=e[0],n,i;if(ci(t)||Mt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=Bo.length;i--&&!Bo[i].targetTest(t););n=Bo[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new cm(e[i],n)))||e.splice(i,1);return e},yr=function(e){return e._gsap||zu(In(e))[0]._gsap},kp=function(e,t,n){return(n=e[t])&&Mt(n)?e[t]():Uu(n)&&e.getAttribute&&e.getAttribute(t)||n},hn=function(e,t){return(e=e.split(",")).forEach(t)||e},Et=function(e){return Math.round(e*1e5)/1e5||0},kt=function(e){return Math.round(e*1e7)/1e7||0},xs=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},fE=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Ko=function(){var e=qi.length,t=qi.slice(0),n,i;for($c={},qi.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Gp=function(e,t,n,i){qi.length&&!Yt&&Ko(),e.render(t,n,i||Yt&&t<0&&(e._initted||e._startAt)),qi.length&&!Yt&&Ko()},Hp=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Np).length<2?t:Ft(e)?e.trim():e},Vp=function(e){return e},Bn=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},dE=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},Pr=function(e,t){for(var n in t)e[n]=t[n];return e},Qf=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=ci(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Qo=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},fa=function(e){var t=e.parent||mt,n=e.keyframes?dE($t(e.keyframes)):Bn;if(un(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},pE=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},Wp=function(e,t,n,i,s){n===void 0&&(n="_first"),i===void 0&&(i="_last");var o=e[i],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=o,t.parent=t._dp=e,t},pl=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},ji=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove(e),e._act=0},Mr=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},mE=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},jc=function(e,t,n,i){return e._startAt&&(Yt?e._startAt.revert(Fo):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},_E=function r(e){return!e||e._ts&&r(e.parent)},ed=function(e){return e._repeat?Cs(e._tTime,e=e.duration()+e._rDelay)*e:0},Cs=function(e,t){var n=Math.floor(e/=t);return e&&n===e?n-1:n},el=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},ml=function(e){return e._end=kt(e._start+(e._tDur/Math.abs(e._ts||e._rts||ct)||0))},_l=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=kt(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),ml(e),n._dirty||Mr(n,e)),e},Xp=function(e,t){var n;if((t._time||t._initted&&!t._dur)&&(n=el(e.rawTime(),t),(!t._dur||Va(0,t.totalDuration(),n)-t._tTime>ct)&&t.render(n,!0)),Mr(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-ct}},ni=function(e,t,n,i){return t.parent&&ji(t),t._start=kt((Li(n)?n:n||e!==mt?Rn(e,n,t):e._time)+t._delay),t._end=kt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Wp(e,t,"_first","_last",e._sort?"_start":0),Zc(t)||(e._recent=t),i||Xp(e,t),e._ts<0&&_l(e,e._tTime),e},qp=function(e,t){return(Tn.ScrollTrigger||Ou("scrollTrigger",t))&&Tn.ScrollTrigger.create(t,e)},Yp=function(e,t,n,i,s){if(Gu(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!Yt&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&zp!==Sn.frame)return qi.push(e),e._lazy=[s,i],1},gE=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},Zc=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},vE=function(e,t,n,i){var s=e.ratio,o=t<0||!t&&(!e._start&&gE(e)&&!(!e._initted&&Zc(e))||(e._ts<0||e._dp._ts<0)&&!Zc(e))?0:1,a=e._rDelay,l=0,c,u,h;if(a&&e._repeat&&(l=Va(0,e._tDur,t),u=Cs(l,a),e._yoyo&&u&1&&(o=1-o),u!==Cs(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||Yt||i||e._zTime===ct||!t&&e._zTime){if(!e._initted&&Yp(e,t,i,n,l))return;for(h=e._zTime,e._zTime=t||(n?ct:0),n||(n=t&&!h),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&jc(e,t,n,!0),e._onUpdate&&!n&&Nn(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&Nn(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&ji(e,1),!n&&!Yt&&(Nn(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},xE=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Ps=function(e,t,n,i){var s=e._repeat,o=kt(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:kt(o*(s+1)+e._rDelay*s):o,a>0&&!i&&_l(e,e._tTime=e._tDur*a),e.parent&&ml(e),n||Mr(e.parent,e),e},td=function(e){return e instanceof on?Mr(e):Ps(e,e._dur)},yE={_start:0,endTime:La,totalDuration:La},Rn=function r(e,t,n){var i=e.labels,s=e._recent||yE,o=e.duration()>=Un?s.endTime(!1):e._dur,a,l,c;return Ft(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=o),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*($t(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},da=function(e,t,n){var i=Li(t[1]),s=(i?2:1)+(e<2?0:1),o=t[s],a,l;if(i&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=un(l.vars.inherit)&&l.parent;o.immediateRender=un(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new Rt(t[0],o,t[s+1])},Ki=function(e,t){return e||e===0?t(e):t},Va=function(e,t,n){return n<e?e:n>t?t:n},qt=function(e,t){return!Ft(e)||!(t=cE.exec(e))?"":t[1]},ME=function(e,t,n){return Ki(n,function(i){return Va(e,t,i)})},Jc=[].slice,$p=function(e,t){return e&&ci(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&ci(e[0]))&&!e.nodeType&&e!==Cn},SE=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return Ft(i)&&!t||$p(i,1)?(s=n).push.apply(s,In(i)):n.push(i)})||n},In=function(e,t,n){return wt&&!t&&wt.selector?wt.selector(e):Ft(e)&&!n&&(Yc||!Ls())?Jc.call((t||Nu).querySelectorAll(e),0):$t(e)?SE(e,n):$p(e)?Jc.call(e,0):e?[e]:[]},Kc=function(e){return e=In(e)[0]||Jo("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return In(t,n.querySelectorAll?n:n===e?Jo("Invalid scope")||Nu.createElement("div"):e)}},jp=function(e){return e.sort(function(){return .5-Math.random()})},Zp=function(e){if(Mt(e))return e;var t=ci(e)?e:{each:e},n=Sr(t.ease),i=t.from||0,s=parseFloat(t.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,h=i;return Ft(i)?u=h={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],h=i[1]),function(f,d,_){var m=(_||t).length,g=o[m],p,y,v,M,S,b,w,U,x;if(!g){if(x=t.grid==="auto"?0:(t.grid||[1,Un])[1],!x){for(w=-Un;w<(w=_[x++].getBoundingClientRect().left)&&x<m;);x--}for(g=o[m]=[],p=l?Math.min(x,m)*u-.5:i%x,y=x===Un?0:l?m*h/x-.5:i/x|0,w=0,U=Un,b=0;b<m;b++)v=b%x-p,M=y-(b/x|0),g[b]=S=c?Math.abs(c==="y"?M:v):Lp(v*v+M*M),S>w&&(w=S),S<U&&(U=S);i==="random"&&jp(g),g.max=w-U,g.min=U,g.v=m=(parseFloat(t.amount)||parseFloat(t.each)*(x>m?m-1:c?c==="y"?m/x:x:Math.max(x,m/x))||0)*(i==="edges"?-1:1),g.b=m<0?s-m:s,g.u=qt(t.amount||t.each)||0,n=n&&m<0?am(n):n}return m=(g[f]-g.min)/g.max||0,kt(g.b+(n?n(m):m)*g.v)+g.u}},Qc=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=kt(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(Li(n)?0:qt(n))}},Jp=function(e,t){var n=$t(e),i,s;return!n&&ci(e)&&(i=n=e.radius||Un,e.values?(e=In(e.values),(s=!Li(e[0]))&&(i*=i)):e=Qc(e.increment)),Ki(t,n?Mt(e)?function(o){return s=e(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Un,u=0,h=e.length,f,d;h--;)s?(f=e[h].x-a,d=e[h].y-l,f=f*f+d*d):f=Math.abs(e[h]-a),f<c&&(c=f,u=h);return u=!i||c<=i?e[u]:o,s||u===o||Li(o)?u:u+qt(o)}:Qc(e))},Kp=function(e,t,n,i){return Ki($t(e)?!t:n===!0?!!(n=0):!i,function(){return $t(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},EE=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,o){return o(s)},i)}},bE=function(e,t){return function(n){return e(parseFloat(n))+(t||qt(n))}},TE=function(e,t,n){return em(e,t,0,1,n)},Qp=function(e,t,n){return Ki(n,function(i){return e[~~t(i)]})},wE=function r(e,t,n){var i=t-e;return $t(e)?Qp(e,r(0,e.length),t):Ki(n,function(s){return(i+(s-e)%i)%i+e})},AE=function r(e,t,n){var i=t-e,s=i*2;return $t(e)?Qp(e,r(0,e.length-1),t):Ki(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>i?s-o:o)})},Da=function(e){for(var t=0,n="",i,s,o,a;~(i=e.indexOf("random(",t));)o=e.indexOf(")",i),a=e.charAt(i+7)==="[",s=e.substr(i+7,o-i-7).match(a?Np:qc),n+=e.substr(t,i-t)+Kp(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},em=function(e,t,n,i,s){var o=t-e,a=i-n;return Ki(s,function(l){return n+((l-e)/o*a||0)})},RE=function r(e,t,n,i){var s=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!s){var o=Ft(e),a={},l,c,u,h,f;if(n===!0&&(i=1)&&(n=null),o)e={p:e},t={p:t};else if($t(e)&&!$t(t)){for(u=[],h=e.length,f=h-2,c=1;c<h;c++)u.push(r(e[c-1],e[c]));h--,s=function(_){_*=h;var m=Math.min(f,~~_);return u[m](_-m)},n=t}else i||(e=Pr($t(e)?[]:{},e));if(!u){for(l in t)ku.call(a,e,l,"get",t[l]);s=function(_){return Wu(_,a)||(o?e.p:e)}}}return Ki(n,s)},nd=function(e,t,n){var i=e.labels,s=Un,o,a,l;for(o in i)a=i[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},Nn=function(e,t,n){var i=e.vars,s=i[t],o=wt,a=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&qi.length&&Ko(),a&&(wt=a),u=l?s.apply(c,l):s.call(c),wt=o,u},ta=function(e){return ji(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Yt),e.progress()<1&&Nn(e,"onInterrupt"),e},hs,tm=[],nm=function(e){if(!Iu()){tm.push(e);return}e=!e.name&&e.default||e;var t=e.name,n=Mt(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:La,render:Wu,add:ku,kill:WE,modifier:VE,rawVars:0},o={targetTest:0,get:0,getSetter:Vu,aliases:{},register:0};if(Ls(),e!==i){if(yn[t])return;Bn(i,Bn(Qo(e,s),o)),Pr(i.prototype,Pr(s,Qo(e,o))),yn[i.prop=t]=i,e.targetTest&&(Bo.push(i),Fu[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Bp(t,i),e.register&&e.register(dn,i,fn)},lt=255,na={aqua:[0,lt,lt],lime:[0,lt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,lt],navy:[0,0,128],white:[lt,lt,lt],olive:[128,128,0],yellow:[lt,lt,0],orange:[lt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[lt,0,0],pink:[lt,192,203],cyan:[0,lt,lt],transparent:[lt,lt,lt,0]},pc=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*lt+.5|0},im=function(e,t,n){var i=e?Li(e)?[e>>16,e>>8&lt,e&lt]:0:na.black,s,o,a,l,c,u,h,f,d,_;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),na[e])i=na[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&lt,i&lt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&lt,e&lt]}else if(e.substr(0,3)==="hsl"){if(i=_=e.match(qc),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=pc(l+1/3,s,o),i[1]=pc(l,s,o),i[2]=pc(l-1/3,s,o);else if(~e.indexOf("="))return i=e.match(Up),n&&i.length<4&&(i[3]=1),i}else i=e.match(qc)||na.transparent;i=i.map(Number)}return t&&!_&&(s=i[0]/lt,o=i[1]/lt,a=i[2]/lt,h=Math.max(s,o,a),f=Math.min(s,o,a),u=(h+f)/2,h===f?l=c=0:(d=h-f,c=u>.5?d/(2-h-f):d/(h+f),l=h===s?(o-a)/d+(o<a?6:0):h===o?(a-s)/d+2:(s-o)/d+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},rm=function(e){var t=[],n=[],i=-1;return e.split(Yi).forEach(function(s){var o=s.match(us)||[];t.push.apply(t,o),n.push(i+=o.length+1)}),t.c=n,t},id=function(e,t,n){var i="",s=(e+i).match(Yi),o=t?"hsla(":"rgba(",a=0,l,c,u,h;if(!s)return e;if(s=s.map(function(f){return(f=im(f,t,1))&&o+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=rm(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(Yi,"1").split(us),h=c.length-1;a<h;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(Yi),h=c.length-1;a<h;a++)i+=c[a]+s[a];return i+c[h]},Yi=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in na)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),CE=/hsl[a]?\(/,sm=function(e){var t=e.join(" "),n;if(Yi.lastIndex=0,Yi.test(t))return n=CE.test(t),e[1]=id(e[1],n),e[0]=id(e[0],n,rm(e[1])),!0},Ua,Sn=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,h,f,d,_=function m(g){var p=r()-i,y=g===!0,v,M,S,b;if(p>e&&(n+=p-t),i+=p,S=i-n,v=S-o,(v>0||y)&&(b=++h.frame,f=S-h.time*1e3,h.time=S=S/1e3,o+=v+(v>=s?4:s-v),M=1),y||(l=c(m)),M)for(d=0;d<a.length;d++)a[d](S,f,b,g)};return h={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(g){return f/(1e3/(g||60))},wake:function(){Op&&(!Yc&&Iu()&&(Cn=Yc=window,Nu=Cn.document||{},Tn.gsap=dn,(Cn.gsapVersions||(Cn.gsapVersions=[])).push(dn.version),Fp(Zo||Cn.GreenSockGlobals||!Cn.gsap&&Cn||{}),u=Cn.requestAnimationFrame,tm.forEach(nm)),l&&h.sleep(),c=u||function(g){return setTimeout(g,o-h.time*1e3+1|0)},Ua=1,_(2))},sleep:function(){(u?Cn.cancelAnimationFrame:clearTimeout)(l),Ua=0,c=La},lagSmoothing:function(g,p){e=g||1/0,t=Math.min(p||33,e)},fps:function(g){s=1e3/(g||240),o=h.time*1e3+s},add:function(g,p,y){var v=p?function(M,S,b,w){g(M,S,b,w),h.remove(v)}:g;return h.remove(g),a[y?"unshift":"push"](v),Ls(),v},remove:function(g,p){~(p=a.indexOf(g))&&a.splice(p,1)&&d>=p&&d--},_listeners:a},h}(),Ls=function(){return!Ua&&Sn.wake()},st={},PE=/^[\d.\-M][\d.\-,\s]/,LE=/["']/g,DE=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(LE,"").trim():+c,i=l.substr(a+1).trim();return t},UE=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},IE=function(e){var t=(e+"").split("("),n=st[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[DE(t[1])]:UE(e).split(",").map(Hp)):st._CE&&PE.test(e)?st._CE("",e):n},am=function(e){return function(t){return 1-e(1-t)}},om=function r(e,t){for(var n=e._first,i;n;)n instanceof on?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},Sr=function(e,t){return e&&(Mt(e)?e:st[e]||IE(e))||t},Ir=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},o;return hn(e,function(a){st[a]=Tn[a]=s,st[o=a.toLowerCase()]=n;for(var l in s)st[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=st[a+"."+l]=s[l]}),s},lm=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},mc=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/Xc*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*lE((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:lm(a);return s=Xc/s,l.config=function(c,u){return r(e,c,u)},l},_c=function r(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:lm(n);return i.config=function(s){return r(e,s)},i};hn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;Ir(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});st.Linear.easeNone=st.none=st.Linear.easeIn;Ir("Elastic",mc("in"),mc("out"),mc());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};Ir("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Ir("Expo",function(r){return r?Math.pow(2,10*(r-1)):0});Ir("Circ",function(r){return-(Lp(1-r*r)-1)});Ir("Sine",function(r){return r===1?1:-oE(r*sE)+1});Ir("Back",_c("in"),_c("out"),_c());st.SteppedEase=st.steps=Tn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,o=1-ct;return function(a){return((i*Va(0,o,a)|0)+s)*n}}};Rs.ease=st["quad.out"];hn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return Bu+=r+","+r+"Params,"});var cm=function(e,t){this.id=aE++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:kp,this.set=t?t.getSetter:Vu},Ds=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Ps(this,+t.duration,1,1),this.data=t.data,wt&&(this._ctx=wt,wt.data.push(this)),Ua||Sn.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Ps(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Ls(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(_l(this,n),!s._dp||s.parent||Xp(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&ni(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===ct||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Gp(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+ed(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.ratio},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+ed(this),i):this.duration()?Math.min(1,this._time/this._dur):this.ratio},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Cs(this._tTime,s)+1:1},e.timeScale=function(n){if(!arguments.length)return this._rts===-ct?0:this._rts;if(this._rts===n)return this;var i=this.parent&&this._ts?el(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-ct?0:this._rts,this.totalTime(Va(-Math.abs(this._delay),this._tDur,i),!0),ml(this),mE(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ls(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==ct&&(this._tTime-=ct)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&ni(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(un(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?el(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=hE);var i=Yt;return Yt=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Yt=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(i._ts||1),i=i._dp;return!this.parent&&this._sat?this._sat.vars.immediateRender?-1:this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,td(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,td(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(Rn(this,n),un(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,un(i))},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-ct:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-ct,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-ct)},e.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},e.then=function(n){var i=this;return new Promise(function(s){var o=Mt(n)?n:Vp,a=function(){var c=i.then;i.then=null,Mt(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),s(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){ta(this)},r}();Bn(Ds.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-ct,_prom:0,_ps:!1,_rts:1});var on=function(r){Pp(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=un(n.sortChildren),mt&&ni(n.parent||mt,Mi(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&qp(Mi(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,o){return da(0,arguments,this),this},t.from=function(i,s,o){return da(1,arguments,this),this},t.fromTo=function(i,s,o,a){return da(2,arguments,this),this},t.set=function(i,s,o){return s.duration=0,s.parent=this,fa(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Rt(i,s,Rn(this,o),1),this},t.call=function(i,s,o){return ni(this,Rt.delayedCall(0,i,s),o)},t.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new Rt(i,o,Rn(this,l)),this},t.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,fa(o).immediateRender=un(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},t.staggerFromTo=function(i,s,o,a,l,c,u,h){return a.startAt=o,fa(a).immediateRender=un(a.immediateRender),this.staggerTo(i,s,a,l,c,u,h)},t.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:kt(i),h=this._zTime<0!=i<0&&(this._initted||!c),f,d,_,m,g,p,y,v,M,S,b,w;if(this!==mt&&u>l&&i>=0&&(u=l),u!==this._tTime||o||h){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,M=this._start,v=this._ts,p=!v,h&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(b=this._yoyo,g=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(g*100+i,s,o);if(f=kt(u%g),u===l?(m=this._repeat,f=c):(m=~~(u/g),m&&m===u/g&&(f=c,m--),f>c&&(f=c)),S=Cs(this._tTime,g),!a&&this._tTime&&S!==m&&this._tTime-S*g-this._dur<=0&&(S=m),b&&m&1&&(f=c-f,w=1),m!==S&&!this._lock){var U=b&&S&1,x=U===(b&&m&1);if(m<S&&(U=!U),a=U?0:c,this._lock=1,this.render(a||(w?0:kt(m*g)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&Nn(this,"onRepeat"),this.vars.repeatRefresh&&!w&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,x&&(this._lock=2,a=U?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!w&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;om(this,w)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=xE(this,kt(a),kt(f)),y&&(u-=f-(f=y._start))),this._tTime=u,this._time=f,this._act=!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&f&&!s&&!m&&(Nn(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(d=this._first;d;){if(_=d._next,(d._act||f>=d._start)&&d._ts&&y!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,s,o),f!==this._time||!this._ts&&!p){y=0,_&&(u+=this._zTime=-ct);break}}d=_}else{d=this._last;for(var T=i<0?i:f;d;){if(_=d._prev,(d._act||T<=d._end)&&d._ts&&y!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(T-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(T-d._start)*d._ts,s,o||Yt&&(d._initted||d._startAt)),f!==this._time||!this._ts&&!p){y=0,_&&(u+=this._zTime=T?-ct:ct);break}}d=_}}if(y&&!s&&(this.pause(),y.render(f>=a?0:-ct)._zTime=f>=a?1:-1,this._ts))return this._start=M,ml(this),this.render(i,s,o);this._onUpdate&&!s&&Nn(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(M===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&ji(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(Nn(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var o=this;if(Li(s)||(s=Rn(this,s,i)),!(i instanceof Ds)){if($t(i))return i.forEach(function(a){return o.add(a,s)}),this;if(Ft(i))return this.addLabel(i,s);if(Mt(i))i=Rt.delayedCall(0,i);else return this}return this!==i?ni(this,i,s):this},t.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Un);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Rt?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},t.remove=function(i){return Ft(i)?this.removeLabel(i):Mt(i)?this.killTweensOf(i):(pl(this,i),i===this._recent&&(this._recent=this._last),Mr(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=kt(Sn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=Rn(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,o){var a=Rt.delayedCall(0,s||La,o);return a.data="isPause",this._hasPause=1,ni(this,a,Rn(this,i))},t.removePause=function(i){var s=this._first;for(i=Rn(this,i);s;)s._start===i&&s.data==="isPause"&&ji(s),s=s._next},t.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)zi!==a[l]&&a[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var o=[],a=In(i),l=this._first,c=Li(s),u;l;)l instanceof Rt?fE(l._targets,a)&&(c?(!zi||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(i,s){s=s||{};var o=this,a=Rn(o,i),l=s,c=l.startAt,u=l.onStart,h=l.onStartParams,f=l.immediateRender,d,_=Rt.to(o,Bn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||ct,onStart:function(){if(o.pause(),!d){var g=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());_._dur!==g&&Ps(_,g,0,1).render(_._time,!0,!0),d=1}u&&u.apply(_,h||[])}},s));return f?_.render(0):_},t.tweenFromTo=function(i,s,o){return this.tweenTo(s,Bn({startAt:{time:Rn(this,i)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),nd(this,Rn(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),nd(this,Rn(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+ct)},t.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return Mr(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Mr(this)},t.totalDuration=function(i){var s=0,o=this,a=o._last,l=Un,c,u,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(h=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,ni(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;Ps(o,o===mt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(i){if(mt._ts&&(Gp(mt,el(i,mt)),zp=Sn.frame),Sn.frame>=Kf){Kf+=bn.autoSleep||120;var s=mt._first;if((!s||!s._ts)&&bn.autoSleep&&Sn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Sn.sleep()}}},e}(Ds);Bn(on.prototype,{_lock:0,_hasPause:0,_forcing:0});var NE=function(e,t,n,i,s,o,a){var l=new fn(this._pt,e,t,0,1,mm,null,s),c=0,u=0,h,f,d,_,m,g,p,y;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=Da(i)),o&&(y=[n,i],o(y,e,t),n=y[0],i=y[1]),f=n.match(fc)||[];h=fc.exec(i);)_=h[0],m=i.substring(c,h.index),d?d=(d+1)%5:m.substr(-5)==="rgba("&&(d=1),_!==f[u++]&&(g=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:m||u===1?m:",",s:g,c:_.charAt(1)==="="?xs(g,_)-g:parseFloat(_)-g,m:d&&d<4?Math.round:0},c=fc.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(Ip.test(i)||p)&&(l.e=0),this._pt=l,l},ku=function(e,t,n,i,s,o,a,l,c,u){Mt(i)&&(i=i(s||0,e,o));var h=e[t],f=n!=="get"?n:Mt(h)?c?e[t.indexOf("set")||!Mt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():h,d=Mt(h)?c?kE:dm:Hu,_;if(Ft(i)&&(~i.indexOf("random(")&&(i=Da(i)),i.charAt(1)==="="&&(_=xs(f,i)+(qt(f)||0),(_||_===0)&&(i=_))),!u||f!==i||eu)return!isNaN(f*i)&&i!==""?(_=new fn(this._pt,e,t,+f||0,i-(f||0),typeof h=="boolean"?HE:pm,0,d),c&&(_.fp=c),a&&_.modifier(a,this,e),this._pt=_):(!h&&!(t in e)&&Ou(t,i),NE.call(this,e,t,f,i,d,l||bn.stringFilter,c))},OE=function(e,t,n,i,s){if(Mt(e)&&(e=pa(e,s,t,n,i)),!ci(e)||e.style&&e.nodeType||$t(e)||Dp(e))return Ft(e)?pa(e,s,t,n,i):e;var o={},a;for(a in e)o[a]=pa(e[a],s,t,n,i);return o},um=function(e,t,n,i,s,o){var a,l,c,u;if(yn[e]&&(a=new yn[e]).init(s,a.rawVars?t[e]:OE(t[e],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new fn(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==hs))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},zi,eu,Gu=function r(e,t,n){var i=e.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.onUpdateParams,h=i.callbackScope,f=i.runBackwards,d=i.yoyoEase,_=i.keyframes,m=i.autoRevert,g=e._dur,p=e._startAt,y=e._targets,v=e.parent,M=v&&v.data==="nested"?v.vars.targets:y,S=e._overwrite==="auto"&&!Du,b=e.timeline,w,U,x,T,H,q,B,k,W,te,$,J,ne;if(b&&(!_||!s)&&(s="none"),e._ease=Sr(s,Rs.ease),e._yEase=d?am(Sr(d===!0?s:d,Rs.ease)):0,d&&e._yoyo&&!e._repeat&&(d=e._yEase,e._yEase=e._ease,e._ease=d),e._from=!b&&!!i.runBackwards,!b||_&&!i.stagger){if(k=y[0]?yr(y[0]).harness:0,J=k&&i[k.prop],w=Qo(i,Fu),p&&(p._zTime<0&&p.progress(1),t<0&&f&&a&&!m?p.render(-1,!0):p.revert(f&&g?Fo:uE),p._lazy=0),o){if(ji(e._startAt=Rt.set(y,Bn({data:"isStart",overwrite:!1,parent:v,immediateRender:!0,lazy:!p&&un(l),startAt:null,delay:0,onUpdate:c,onUpdateParams:u,callbackScope:h,stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Yt||!a&&!m)&&e._startAt.revert(Fo),a&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(f&&g&&!p){if(t&&(a=!1),x=Bn({overwrite:!1,data:"isFromStart",lazy:a&&!p&&un(l),immediateRender:a,stagger:0,parent:v},w),J&&(x[k.prop]=J),ji(e._startAt=Rt.set(y,x)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Yt?e._startAt.revert(Fo):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,ct,ct);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&un(l)||l&&!g,U=0;U<y.length;U++){if(H=y[U],B=H._gsap||zu(y)[U]._gsap,e._ptLookup[U]=te={},$c[B.id]&&qi.length&&Ko(),$=M===y?U:M.indexOf(H),k&&(W=new k).init(H,J||w,e,$,M)!==!1&&(e._pt=T=new fn(e._pt,H,W.name,0,1,W.render,W,0,W.priority),W._props.forEach(function(P){te[P]=T}),W.priority&&(q=1)),!k||J)for(x in w)yn[x]&&(W=um(x,w,e,$,H,M))?W.priority&&(q=1):te[x]=T=ku.call(e,H,x,"get",w[x],$,M,0,i.stringFilter);e._op&&e._op[U]&&e.kill(H,e._op[U]),S&&e._pt&&(zi=e,mt.killTweensOf(H,te,e.globalTime(t)),ne=!e.parent,zi=0),e._pt&&l&&($c[B.id]=1)}q&&_m(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!ne,_&&t<=0&&b.render(Un,!0,!0)},FE=function(e,t,n,i,s,o,a){var l=(e._pt&&e._ptCache||(e._ptCache={}))[t],c,u,h,f;if(!l)for(l=e._ptCache[t]=[],h=e._ptLookup,f=e._targets.length;f--;){if(c=h[f][t],c&&c.d&&c.d._pt)for(c=c.d._pt;c&&c.p!==t&&c.fp!==t;)c=c._next;if(!c)return eu=1,e.vars[t]="+=0",Gu(e,a),eu=0,1;l.push(c)}for(f=l.length;f--;)u=l[f],c=u._pt||u,c.s=(i||i===0)&&!s?i:c.s+(i||0)+o*c.c,c.c=n-c.s,u.e&&(u.e=Et(n)+qt(u.e)),u.b&&(u.b=c.s+qt(u.b))},BE=function(e,t){var n=e[0]?yr(e[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return t;s=Pr({},t);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},zE=function(e,t,n,i){var s=t.ease||i||"power1.inOut",o,a;if($t(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},pa=function(e,t,n,i,s){return Mt(e)?e.call(t,n,i,s):Ft(e)&&~e.indexOf("random(")?Da(e):e},hm=Bu+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",fm={};hn(hm+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return fm[r]=1});var Rt=function(r){Pp(e,r);function e(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:fa(i))||this;var l=a.vars,c=l.duration,u=l.delay,h=l.immediateRender,f=l.stagger,d=l.overwrite,_=l.keyframes,m=l.defaults,g=l.scrollTrigger,p=l.yoyoEase,y=i.parent||mt,v=($t(n)||Dp(n)?Li(n[0]):"length"in i)?[n]:In(n),M,S,b,w,U,x,T,H;if(a._targets=v.length?zu(v):Jo("GSAP target "+n+" not found. https://greensock.com",!bn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,_||f||yo(c)||yo(u)){if(i=a.vars,M=a.timeline=new on({data:"nested",defaults:m||{},targets:y&&y.data==="nested"?y.vars.targets:v}),M.kill(),M.parent=M._dp=Mi(a),M._start=0,f||yo(c)||yo(u)){if(w=v.length,T=f&&Zp(f),ci(f))for(U in f)~hm.indexOf(U)&&(H||(H={}),H[U]=f[U]);for(S=0;S<w;S++)b=Qo(i,fm),b.stagger=0,p&&(b.yoyoEase=p),H&&Pr(b,H),x=v[S],b.duration=+pa(c,Mi(a),S,x,v),b.delay=(+pa(u,Mi(a),S,x,v)||0)-a._delay,!f&&w===1&&b.delay&&(a._delay=u=b.delay,a._start+=u,b.delay=0),M.to(x,b,T?T(S,x,v):0),M._ease=st.none;M.duration()?c=u=0:a.timeline=0}else if(_){fa(Bn(M.vars.defaults,{ease:"none"})),M._ease=Sr(_.ease||i.ease||"none");var q=0,B,k,W;if($t(_))_.forEach(function(te){return M.to(v,te,">")}),M.duration();else{b={};for(U in _)U==="ease"||U==="easeEach"||zE(U,_[U],b,_.easeEach);for(U in b)for(B=b[U].sort(function(te,$){return te.t-$.t}),q=0,S=0;S<B.length;S++)k=B[S],W={ease:k.e,duration:(k.t-(S?B[S-1].t:0))/100*c},W[U]=k.v,M.to(v,W,q),q+=W.duration;M.duration()<c&&M.to({},{duration:c-M.duration()})}}c||a.duration(c=M.duration())}else a.timeline=0;return d===!0&&!Du&&(zi=Mi(a),mt.killTweensOf(v),zi=0),ni(y,Mi(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(h||!c&&!_&&a._start===kt(y._time)&&un(h)&&_E(Mi(a))&&y.data!=="nested")&&(a._tTime=-ct,a.render(Math.max(0,-u)||0)),g&&qp(Mi(a),g),a}var t=e.prototype;return t.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,h=i>l-ct&&!u?l:i<ct?0:i,f,d,_,m,g,p,y,v,M;if(!c)vE(this,i,s,o);else if(h!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u){if(f=h,v=this.timeline,this._repeat){if(m=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(m*100+i,s,o);if(f=kt(h%m),h===l?(_=this._repeat,f=c):(_=~~(h/m),_&&_===h/m&&(f=c,_--),f>c&&(f=c)),p=this._yoyo&&_&1,p&&(M=this._yEase,f=c-f),g=Cs(this._tTime,m),f===a&&!o&&this._initted)return this._tTime=h,this;_!==g&&(v&&this._yEase&&om(v,p),this.vars.repeatRefresh&&!p&&!this._lock&&(this._lock=o=1,this.render(kt(m*_),!0).invalidate()._lock=0))}if(!this._initted){if(Yp(this,u?i:f,o,s,h))return this._tTime=0,this;if(a!==this._time)return this;if(c!==this._dur)return this.render(i,s,o)}if(this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=y=(M||this._ease)(f/c),this._from&&(this.ratio=y=1-y),f&&!a&&!s&&!_&&(Nn(this,"onStart"),this._tTime!==h))return this;for(d=this._pt;d;)d.r(y,d.d),d=d._next;v&&v.render(i<0?i:!f&&p?-ct:v._dur*v._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&jc(this,i,s,o),Nn(this,"onUpdate")),this._repeat&&_!==g&&this.vars.onRepeat&&!s&&this.parent&&Nn(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&jc(this,i,!0,!0),(i||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&ji(this,1),!s&&!(u&&!a)&&(h||a||p)&&(Nn(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,o,a){Ua||Sn.wake(),this._ts||this.play();var l=Math.min(this._dur,(this._dp._time-this._start)*this._ts),c;return this._initted||Gu(this,l),c=this._ease(l/this._dur),FE(this,i,s,o,a,c,l)?this.resetTo(i,s,o,a):(_l(this,0),this.parent||Wp(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?ta(this):this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,zi&&zi.vars.overwrite!==!0)._first||ta(this),this.parent&&o!==this.timeline.totalDuration()&&Ps(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?In(i):a,c=this._ptLookup,u=this._pt,h,f,d,_,m,g,p;if((!s||s==="all")&&pE(a,l))return s==="all"&&(this._pt=0),ta(this);for(h=this._op=this._op||[],s!=="all"&&(Ft(s)&&(m={},hn(s,function(y){return m[y]=1}),s=m),s=BE(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){f=c[p],s==="all"?(h[p]=s,_=f,d={}):(d=h[p]=h[p]||{},_=s);for(m in _)g=f&&f[m],g&&((!("kill"in g.d)||g.d.kill(m)===!0)&&pl(this,g,"_pt"),delete f[m]),d!=="all"&&(d[m]=1)}return this._initted&&!this._pt&&u&&ta(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return da(1,arguments)},e.delayedCall=function(i,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(i,s,o){return da(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,o){return mt.killTweensOf(i,s,o)},e}(Ds);Bn(Rt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});hn("staggerTo,staggerFrom,staggerFromTo",function(r){Rt[r]=function(){var e=new on,t=Jc.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var Hu=function(e,t,n){return e[t]=n},dm=function(e,t,n){return e[t](n)},kE=function(e,t,n,i){return e[t](i.fp,n)},GE=function(e,t,n){return e.setAttribute(t,n)},Vu=function(e,t){return Mt(e[t])?dm:Uu(e[t])&&e.setAttribute?GE:Hu},pm=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},HE=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},mm=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},Wu=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},VE=function(e,t,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(e,t,n),s=o},WE=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?pl(this,t,"_pt"):t.dep||(n=1),t=i;return!n},XE=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},_m=function(e){for(var t=e._pt,n,i,s,o;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:o)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:o=t,t=n}e._pt=s},fn=function(){function r(t,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||pm,this.d=l||this,this.set=c||Hu,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=XE,this.m=n,this.mt=s,this.tween=i},r}();hn(Bu+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return Fu[r]=1});Tn.TweenMax=Tn.TweenLite=Rt;Tn.TimelineLite=Tn.TimelineMax=on;mt=new on({sortChildren:!1,defaults:Rs,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});bn.stringFilter=sm;var Us=[],zo={},qE=[],rd=0,gc=function(e){return(zo[e]||qE).map(function(t){return t()})},tu=function(){var e=Date.now(),t=[];e-rd>2&&(gc("matchMediaInit"),Us.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=Cn.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),gc("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n)}),rd=e,gc("matchMedia"))},gm=function(){function r(t,n){this.selector=n&&Kc(n),this.data=[],this._r=[],this.isReverted=!1,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){Mt(n)&&(s=i,i=n,n=Mt);var o=this,a=function(){var c=wt,u=o.selector,h;return c&&c!==o&&c.data.push(o),s&&(o.selector=Kc(s)),wt=o,h=i.apply(o,arguments),Mt(h)&&o._r.push(h),wt=c,o.selector=u,o.isReverted=!1,h};return o.last=a,n===Mt?a(o):n?o[n]=a:a},e.ignore=function(n){var i=wt;wt=null,n(this),wt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Rt&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n){var o=this.getTweens();this.data.forEach(function(l){l.data==="isFlip"&&(l.revert(),l.getChildren(!0,!0,!1).forEach(function(c){return o.splice(o.indexOf(c),1)}))}),o.map(function(l){return{g:l.globalTime(0),t:l}}).sort(function(l,c){return c.g-l.g||-1}).forEach(function(l){return l.t.revert(n)}),this.data.forEach(function(l){return!(l instanceof Ds)&&l.revert&&l.revert(n)}),this._r.forEach(function(l){return l(n,s)}),this.isReverted=!0}else this.data.forEach(function(l){return l.kill&&l.kill()});if(this.clear(),i){var a=Us.indexOf(this);~a&&Us.splice(a,1)}},e.revert=function(n){this.kill(n||{})},r}(),YE=function(){function r(t){this.contexts=[],this.scope=t}var e=r.prototype;return e.add=function(n,i,s){ci(n)||(n={matches:n});var o=new gm(0,s||this.scope),a=o.conditions={},l,c,u;this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=Cn.matchMedia(n[c]),l&&(Us.indexOf(o)<0&&Us.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(tu):l.addEventListener("change",tu)));return u&&i(o),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),tl={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return nm(i)})},timeline:function(e){return new on(e)},getTweensOf:function(e,t){return mt.getTweensOf(e,t)},getProperty:function(e,t,n,i){Ft(e)&&(e=In(e)[0]);var s=yr(e||{}).get,o=n?Vp:Hp;return n==="native"&&(n=""),e&&(t?o((yn[t]&&yn[t].get||s)(e,t,n,i)):function(a,l,c){return o((yn[a]&&yn[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=In(e),e.length>1){var i=e.map(function(u){return dn.quickSetter(u,t,n)}),s=i.length;return function(u){for(var h=s;h--;)i[h](u)}}e=e[0]||{};var o=yn[t],a=yr(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var h=new o;hs._pt=0,h.init(e,n?u+n:u,hs,0,[e]),h.render(1,h),hs._pt&&Wu(1,hs)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,s=dn.to(e,Pr((i={},i[t]="+=0.1",i.paused=!0,i),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return mt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Sr(e.ease,Rs.ease)),Qf(Rs,e||{})},config:function(e){return Qf(bn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,o=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!yn[a]&&!Tn[a]&&Jo(t+" effect requires "+a+" plugin.")}),dc[t]=function(a,l,c){return n(In(a),Bn(l||{},s),c)},o&&(on.prototype[t]=function(a,l,c){return this.add(dc[t](a,ci(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){st[e]=Sr(t)},parseEase:function(e,t){return arguments.length?Sr(e,t):st},getById:function(e){return mt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new on(e),i,s;for(n.smoothChildTiming=un(e.smoothChildTiming),mt.remove(n),n._dp=0,n._time=n._tTime=mt._time,i=mt._first;i;)s=i._next,(t||!(!i._dur&&i instanceof Rt&&i.vars.onComplete===i._targets[0]))&&ni(n,i,i._start-i._delay),i=s;return ni(mt,n,0),n},context:function(e,t){return e?new gm(e,t):wt},matchMedia:function(e){return new YE(e)},matchMediaRefresh:function(){return Us.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||tu()},addEventListener:function(e,t){var n=zo[e]||(zo[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=zo[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:wE,wrapYoyo:AE,distribute:Zp,random:Kp,snap:Jp,normalize:TE,getUnit:qt,clamp:ME,splitColor:im,toArray:In,selector:Kc,mapRange:em,pipe:EE,unitize:bE,interpolate:RE,shuffle:jp},install:Fp,effects:dc,ticker:Sn,updateRoot:on.updateRoot,plugins:yn,globalTimeline:mt,core:{PropTween:fn,globals:Bp,Tween:Rt,Timeline:on,Animation:Ds,getCache:yr,_removeLinkedListItem:pl,reverting:function(){return Yt},context:function(e){return e&&wt&&(wt.data.push(e),e._ctx=wt),wt},suppressOverwrites:function(e){return Du=e}}};hn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return tl[r]=Rt[r]});Sn.add(on.updateRoot);hs=tl.to({},{duration:0});var $E=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},jE=function(e,t){var n=e._targets,i,s,o;for(i in t)for(s=n.length;s--;)o=e._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=$E(o,i)),o&&o.modifier&&o.modifier(t[i],e,n[s],i))},vc=function(e,t){return{name:e,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(Ft(s)&&(l={},hn(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}jE(a,s)}}}},dn=tl.registerPlugin({name:"attr",init:function(e,t,n,i,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)Yt?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},vc("roundProps",Qc),vc("modifiers"),vc("snap",Jp))||tl;Rt.version=on.version=dn.version="3.11.5";Op=1;Iu()&&Ls();st.Power0;st.Power1;st.Power2;st.Power3;st.Power4;st.Linear;st.Quad;st.Cubic;st.Quart;st.Quint;st.Strong;st.Elastic;st.Back;st.SteppedEase;st.Bounce;st.Sine;st.Expo;st.Circ;/*!
 * CSSPlugin 3.11.5
 * https://greensock.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var sd,ki,ys,Xu,mr,ad,qu,ZE=function(){return typeof window<"u"},Di={},cr=180/Math.PI,Ms=Math.PI/180,es=Math.atan2,od=1e8,Yu=/([A-Z])/g,JE=/(left|right|width|margin|padding|x)/i,KE=/[\s,\(]\S/,ri={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},nu=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},QE=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},eb=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},tb=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},vm=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},xm=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},nb=function(e,t,n){return e.style[t]=n},ib=function(e,t,n){return e.style.setProperty(t,n)},rb=function(e,t,n){return e._gsap[t]=n},sb=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},ab=function(e,t,n,i,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},ob=function(e,t,n,i,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},gt="transform",Zn=gt+"Origin",lb=function r(e,t){var n=this,i=this.target,s=i.style;if(e in Di){if(this.tfm=this.tfm||{},e!=="transform")e=ri[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return n.tfm[o]=Si(i,o)}):this.tfm[e]=i._gsap.x?i._gsap[e]:Si(i,e);else return ri.transform.split(",").forEach(function(o){return r.call(n,o,t)});if(this.props.indexOf(gt)>=0)return;i._gsap.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Zn,t,"")),e=gt}(s||t)&&this.props.push(e,t,s[e])},ym=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},cb=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Yu,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=qu(),(!s||!s.isStart)&&!n[gt]&&(ym(n),i.uncache=1)}},Mm=function(e,t){var n={target:e,props:[],revert:cb,save:lb};return e._gsap||dn.core.getCache(e),t&&t.split(",").forEach(function(i){return n.save(i)}),n},Sm,iu=function(e,t){var n=ki.createElementNS?ki.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):ki.createElement(e);return n.style?n:ki.createElement(e)},ai=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(Yu,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,Is(t)||t,1)||""},ld="O,Moz,ms,Ms,Webkit".split(","),Is=function(e,t,n){var i=t||mr,s=i.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(ld[o]+e in s););return o<0?null:(o===3?"ms":o>=0?ld[o]:"")+e},ru=function(){ZE()&&window.document&&(sd=window,ki=sd.document,ys=ki.documentElement,mr=iu("div")||{style:{}},iu("div"),gt=Is(gt),Zn=gt+"Origin",mr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Sm=!!Is("perspective"),qu=dn.core.reverting,Xu=1)},xc=function r(e){var t=iu("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=this.parentNode,i=this.nextSibling,s=this.style.cssText,o;if(ys.appendChild(t),t.appendChild(this),this.style.display="block",e)try{o=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=r}catch{}else this._gsapBBox&&(o=this._gsapBBox());return n&&(i?n.insertBefore(this,i):n.appendChild(this)),ys.removeChild(t),this.style.cssText=s,o},cd=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Em=function(e){var t;try{t=e.getBBox()}catch{t=xc.call(e,!0)}return t&&(t.width||t.height)||e.getBBox===xc||(t=xc.call(e,!0)),t&&!t.width&&!t.x&&!t.y?{x:+cd(e,["x","cx","x1"])||0,y:+cd(e,["y","cy","y1"])||0,width:0,height:0}:t},bm=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Em(e))},Ia=function(e,t){if(t){var n=e.style;t in Di&&t!==Zn&&(t=gt),n.removeProperty?((t.substr(0,2)==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(t.replace(Yu,"-$1").toLowerCase())):n.removeAttribute(t)}},Gi=function(e,t,n,i,s,o){var a=new fn(e._pt,t,n,0,1,o?xm:vm);return e._pt=a,a.b=i,a.e=s,e._props.push(n),a},ud={deg:1,rad:1,turn:1},ub={grid:1,flex:1},Zi=function r(e,t,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=mr.style,l=JE.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,f=i==="px",d=i==="%",_,m,g,p;return i===o||!s||ud[i]||ud[o]?s:(o!=="px"&&!f&&(s=r(e,t,n,"px")),p=e.getCTM&&bm(e),(d||o==="%")&&(Di[t]||~t.indexOf("adius"))?(_=p?e.getBBox()[l?"width":"height"]:e[u],Et(d?s/_*h:s/100*_)):(a[l?"width":"height"]=h+(f?o:i),m=~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(m=(e.ownerSVGElement||{}).parentNode),(!m||m===ki||!m.appendChild)&&(m=ki.body),g=m._gsap,g&&d&&g.width&&l&&g.time===Sn.time&&!g.uncache?Et(s/g.width*h):((d||o==="%")&&!ub[ai(m,"display")]&&(a.position=ai(e,"position")),m===e&&(a.position="static"),m.appendChild(mr),_=mr[u],m.removeChild(mr),a.position="absolute",l&&d&&(g=yr(m),g.time=Sn.time,g.width=m[u]),Et(f?_*s/h:_&&s?h/_*s:0))))},Si=function(e,t,n,i){var s;return Xu||ru(),t in ri&&t!=="transform"&&(t=ri[t],~t.indexOf(",")&&(t=t.split(",")[0])),Di[t]&&t!=="transform"?(s=Oa(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:il(ai(e,Zn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=nl[t]&&nl[t](e,t,n)||ai(e,t)||kp(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Zi(e,t,s,n)+n:s},hb=function(e,t,n,i){if(!n||n==="none"){var s=Is(t,e,1),o=s&&ai(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=ai(e,"borderTopColor"))}var a=new fn(this._pt,e.style,t,0,1,mm),l=0,c=0,u,h,f,d,_,m,g,p,y,v,M,S;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(e.style[t]=i,i=ai(e,t)||i,e.style[t]=n),u=[n,i],sm(u),n=u[0],i=u[1],f=n.match(us)||[],S=i.match(us)||[],S.length){for(;h=us.exec(i);)g=h[0],y=i.substring(l,h.index),_?_=(_+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(_=1),g!==(m=f[c++]||"")&&(d=parseFloat(m)||0,M=m.substr((d+"").length),g.charAt(1)==="="&&(g=xs(d,g)+M),p=parseFloat(g),v=g.substr((p+"").length),l=us.lastIndex-v.length,v||(v=v||bn.units[t]||M,l===i.length&&(i+=v,a.e+=v)),M!==v&&(d=Zi(e,t,m,v)||0),a._pt={_next:a._pt,p:y||c===1?y:",",s:d,c:p-d,m:_&&_<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?xm:vm;return Ip.test(i)&&(a.e=0),this._pt=a,a},hd={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},fb=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=hd[n]||n,t[1]=hd[i]||i,t.join(" ")},db=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Di[a]&&(l=1,a=a==="transformOrigin"?Zn:gt),Ia(n,a);l&&(Ia(n,gt),o&&(o.svg&&n.removeAttribute("transform"),Oa(n,1),o.uncache=1,ym(i)))}},nl={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var o=e._pt=new fn(e._pt,t,n,0,0,db);return o.u=i,o.pr=-10,o.tween=s,e._props.push(n),1}}},Na=[1,0,0,1,0,0],Tm={},wm=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},fd=function(e){var t=ai(e,gt);return wm(t)?Na:t.substr(7).match(Up).map(Et)},$u=function(e,t){var n=e._gsap||yr(e),i=e.style,s=fd(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Na:s):(s===Na&&!e.offsetParent&&e!==ys&&!n.svg&&(l=i.display,i.display="block",o=e.parentNode,(!o||!e.offsetParent)&&(c=1,a=e.nextElementSibling,ys.appendChild(e)),s=fd(e),l?i.display=l:Ia(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):ys.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},su=function(e,t,n,i,s,o){var a=e._gsap,l=s||$u(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,h=a.xOffset||0,f=a.yOffset||0,d=l[0],_=l[1],m=l[2],g=l[3],p=l[4],y=l[5],v=t.split(" "),M=parseFloat(v[0])||0,S=parseFloat(v[1])||0,b,w,U,x;n?l!==Na&&(w=d*g-_*m)&&(U=M*(g/w)+S*(-m/w)+(m*y-g*p)/w,x=M*(-_/w)+S*(d/w)-(d*y-_*p)/w,M=U,S=x):(b=Em(e),M=b.x+(~v[0].indexOf("%")?M/100*b.width:M),S=b.y+(~(v[1]||v[0]).indexOf("%")?S/100*b.height:S)),i||i!==!1&&a.smooth?(p=M-c,y=S-u,a.xOffset=h+(p*d+y*m)-p,a.yOffset=f+(p*_+y*g)-y):a.xOffset=a.yOffset=0,a.xOrigin=M,a.yOrigin=S,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[Zn]="0px 0px",o&&(Gi(o,a,"xOrigin",c,M),Gi(o,a,"yOrigin",u,S),Gi(o,a,"xOffset",h,a.xOffset),Gi(o,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",M+" "+S)},Oa=function(e,t){var n=e._gsap||new cm(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=ai(e,Zn)||"0",u,h,f,d,_,m,g,p,y,v,M,S,b,w,U,x,T,H,q,B,k,W,te,$,J,ne,P,pe,_e,Q,re,de;return u=h=f=m=g=p=y=v=M=0,d=_=1,n.svg=!!(e.getCTM&&bm(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[gt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[gt]!=="none"?l[gt]:"")),i.scale=i.rotate=i.translate="none"),w=$u(e,n.svg),n.svg&&(n.uncache?(J=e.getBBox(),c=n.xOrigin-J.x+"px "+(n.yOrigin-J.y)+"px",$=""):$=!t&&e.getAttribute("data-svg-origin"),su(e,$||c,!!$||n.originIsAbsolute,n.smooth!==!1,w)),S=n.xOrigin||0,b=n.yOrigin||0,w!==Na&&(H=w[0],q=w[1],B=w[2],k=w[3],u=W=w[4],h=te=w[5],w.length===6?(d=Math.sqrt(H*H+q*q),_=Math.sqrt(k*k+B*B),m=H||q?es(q,H)*cr:0,y=B||k?es(B,k)*cr+m:0,y&&(_*=Math.abs(Math.cos(y*Ms))),n.svg&&(u-=S-(S*H+b*B),h-=b-(S*q+b*k))):(de=w[6],Q=w[7],P=w[8],pe=w[9],_e=w[10],re=w[11],u=w[12],h=w[13],f=w[14],U=es(de,_e),g=U*cr,U&&(x=Math.cos(-U),T=Math.sin(-U),$=W*x+P*T,J=te*x+pe*T,ne=de*x+_e*T,P=W*-T+P*x,pe=te*-T+pe*x,_e=de*-T+_e*x,re=Q*-T+re*x,W=$,te=J,de=ne),U=es(-B,_e),p=U*cr,U&&(x=Math.cos(-U),T=Math.sin(-U),$=H*x-P*T,J=q*x-pe*T,ne=B*x-_e*T,re=k*T+re*x,H=$,q=J,B=ne),U=es(q,H),m=U*cr,U&&(x=Math.cos(U),T=Math.sin(U),$=H*x+q*T,J=W*x+te*T,q=q*x-H*T,te=te*x-W*T,H=$,W=J),g&&Math.abs(g)+Math.abs(m)>359.9&&(g=m=0,p=180-p),d=Et(Math.sqrt(H*H+q*q+B*B)),_=Et(Math.sqrt(te*te+de*de)),U=es(W,te),y=Math.abs(U)>2e-4?U*cr:0,M=re?1/(re<0?-re:re):0),n.svg&&($=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!wm(ai(e,gt)),$&&e.setAttribute("transform",$))),Math.abs(y)>90&&Math.abs(y)<270&&(s?(d*=-1,y+=m<=0?180:-180,m+=m<=0?180:-180):(_*=-1,y+=y<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=h-((n.yPercent=h&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-h)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=Et(d),n.scaleY=Et(_),n.rotation=Et(m)+a,n.rotationX=Et(g)+a,n.rotationY=Et(p)+a,n.skewX=y+a,n.skewY=v+a,n.transformPerspective=M+o,(n.zOrigin=parseFloat(c.split(" ")[2])||0)&&(i[Zn]=il(c)),n.xOffset=n.yOffset=0,n.force3D=bn.force3D,n.renderTransform=n.svg?mb:Sm?Am:pb,n.uncache=0,n},il=function(e){return(e=e.split(" "))[0]+" "+e[1]},yc=function(e,t,n){var i=qt(t);return Et(parseFloat(t)+parseFloat(Zi(e,"x",n+"px",i)))+i},pb=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Am(e,t)},rr="0deg",Ys="0px",sr=") ",Am=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,h=n.rotationX,f=n.skewX,d=n.skewY,_=n.scaleX,m=n.scaleY,g=n.transformPerspective,p=n.force3D,y=n.target,v=n.zOrigin,M="",S=p==="auto"&&e&&e!==1||p===!0;if(v&&(h!==rr||u!==rr)){var b=parseFloat(u)*Ms,w=Math.sin(b),U=Math.cos(b),x;b=parseFloat(h)*Ms,x=Math.cos(b),o=yc(y,o,w*x*-v),a=yc(y,a,-Math.sin(b)*-v),l=yc(y,l,U*x*-v+v)}g!==Ys&&(M+="perspective("+g+sr),(i||s)&&(M+="translate("+i+"%, "+s+"%) "),(S||o!==Ys||a!==Ys||l!==Ys)&&(M+=l!==Ys||S?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+sr),c!==rr&&(M+="rotate("+c+sr),u!==rr&&(M+="rotateY("+u+sr),h!==rr&&(M+="rotateX("+h+sr),(f!==rr||d!==rr)&&(M+="skew("+f+", "+d+sr),(_!==1||m!==1)&&(M+="scale("+_+", "+m+sr),y.style[gt]=M||"translate(0, 0)"},mb=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,h=n.scaleX,f=n.scaleY,d=n.target,_=n.xOrigin,m=n.yOrigin,g=n.xOffset,p=n.yOffset,y=n.forceCSS,v=parseFloat(o),M=parseFloat(a),S,b,w,U,x;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Ms,c*=Ms,S=Math.cos(l)*h,b=Math.sin(l)*h,w=Math.sin(l-c)*-f,U=Math.cos(l-c)*f,c&&(u*=Ms,x=Math.tan(c-u),x=Math.sqrt(1+x*x),w*=x,U*=x,u&&(x=Math.tan(u),x=Math.sqrt(1+x*x),S*=x,b*=x)),S=Et(S),b=Et(b),w=Et(w),U=Et(U)):(S=h,U=f,b=w=0),(v&&!~(o+"").indexOf("px")||M&&!~(a+"").indexOf("px"))&&(v=Zi(d,"x",o,"px"),M=Zi(d,"y",a,"px")),(_||m||g||p)&&(v=Et(v+_-(_*S+m*w)+g),M=Et(M+m-(_*b+m*U)+p)),(i||s)&&(x=d.getBBox(),v=Et(v+i/100*x.width),M=Et(M+s/100*x.height)),x="matrix("+S+","+b+","+w+","+U+","+v+","+M+")",d.setAttribute("transform",x),y&&(d.style[gt]=x)},_b=function(e,t,n,i,s){var o=360,a=Ft(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?cr:1),c=l-i,u=i+c+"deg",h,f;return a&&(h=s.split("_")[1],h==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),h==="cw"&&c<0?c=(c+o*od)%o-~~(c/o)*o:h==="ccw"&&c>0&&(c=(c-o*od)%o-~~(c/o)*o)),e._pt=f=new fn(e._pt,t,n,i,c,QE),f.e=u,f.u="deg",e._props.push(n),f},dd=function(e,t){for(var n in t)e[n]=t[n];return e},gb=function(e,t,n){var i=dd({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,h,f,d,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[gt]=t,a=Oa(n,1),Ia(n,gt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[gt],o[gt]=t,a=Oa(n,1),o[gt]=c);for(l in Di)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(d=qt(c),_=qt(u),h=d!==_?Zi(n,l,c,_):parseFloat(c),f=parseFloat(u),e._pt=new fn(e._pt,a,l,h,f-h,nu),e._pt.u=_||0,e._props.push(l));dd(a,i)};hn("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",o=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(a){return e<2?r+a:"border"+a+r});nl[e>1?"border"+r:r]=function(a,l,c,u,h){var f,d;if(arguments.length<4)return f=o.map(function(_){return Si(a,_,c)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(u+"").split(" "),d={},o.forEach(function(_,m){return d[_]=f[m]=f[m]||f[(m-1)/2|0]}),a.init(l,d,h)}});var Rm={name:"css",register:ru,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,h,f,d,_,m,g,p,y,v,M,S,b,w,U;Xu||ru(),this.styles=this.styles||Mm(e),U=this.styles.props,this.tween=n;for(m in t)if(m!=="autoRound"&&(u=t[m],!(yn[m]&&um(m,t,n,i,e,s)))){if(d=typeof u,_=nl[m],d==="function"&&(u=u.call(n,i,e,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=Da(u)),_)_(this,e,m,u,n)&&(w=1);else if(m.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(m)+"").trim(),u+="",Yi.lastIndex=0,Yi.test(c)||(g=qt(c),p=qt(u)),p?g!==p&&(c=Zi(e,m,c,p)+p):g&&(u+=g),this.add(a,"setProperty",c,u,i,s,0,0,m),o.push(m),U.push(m,0,a[m]);else if(d!=="undefined"){if(l&&m in l?(c=typeof l[m]=="function"?l[m].call(n,i,e,s):l[m],Ft(c)&&~c.indexOf("random(")&&(c=Da(c)),qt(c+"")||(c+=bn.units[m]||qt(Si(e,m))||""),(c+"").charAt(1)==="="&&(c=Si(e,m))):c=Si(e,m),f=parseFloat(c),y=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),y&&(u=u.substr(2)),h=parseFloat(u),m in ri&&(m==="autoAlpha"&&(f===1&&Si(e,"visibility")==="hidden"&&h&&(f=0),U.push("visibility",0,a.visibility),Gi(this,a,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),m!=="scale"&&m!=="transform"&&(m=ri[m],~m.indexOf(",")&&(m=m.split(",")[0]))),v=m in Di,v){if(this.styles.save(m),M||(S=e._gsap,S.renderTransform&&!t.parseTransform||Oa(e,t.parseTransform),b=t.smoothOrigin!==!1&&S.smooth,M=this._pt=new fn(this._pt,a,gt,0,1,S.renderTransform,S,0,-1),M.dep=1),m==="scale")this._pt=new fn(this._pt,S,"scaleY",S.scaleY,(y?xs(S.scaleY,y+h):h)-S.scaleY||0,nu),this._pt.u=0,o.push("scaleY",m),m+="X";else if(m==="transformOrigin"){U.push(Zn,0,a[Zn]),u=fb(u),S.svg?su(e,u,0,b,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==S.zOrigin&&Gi(this,S,"zOrigin",S.zOrigin,p),Gi(this,a,m,il(c),il(u)));continue}else if(m==="svgOrigin"){su(e,u,1,b,0,this);continue}else if(m in Tm){_b(this,S,m,f,y?xs(f,y+u):u);continue}else if(m==="smoothOrigin"){Gi(this,S,"smooth",S.smooth,u);continue}else if(m==="force3D"){S[m]=u;continue}else if(m==="transform"){gb(this,u,e);continue}}else m in a||(m=Is(m)||m);if(v||(h||h===0)&&(f||f===0)&&!KE.test(u)&&m in a)g=(c+"").substr((f+"").length),h||(h=0),p=qt(u)||(m in bn.units?bn.units[m]:g),g!==p&&(f=Zi(e,m,c,p)),this._pt=new fn(this._pt,v?S:a,m,f,(y?xs(f,y+h):h)-f,!v&&(p==="px"||m==="zIndex")&&t.autoRound!==!1?tb:nu),this._pt.u=p||0,g!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=eb);else if(m in a)hb.call(this,e,m,c,y?y+u:u);else if(m in e)this.add(e,m,c||e[m],y?y+u:u,i,s);else if(m!=="parseTransform"){Ou(m,u);continue}v||(m in a?U.push(m,0,a[m]):U.push(m,1,c||e[m])),o.push(m)}}w&&_m(this)},render:function(e,t){if(t.tween._time||!qu())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Si,aliases:ri,getSetter:function(e,t,n){var i=ri[t];return i&&i.indexOf(",")<0&&(t=i),t in Di&&t!==Zn&&(e._gsap.x||Si(e,"x"))?n&&ad===n?t==="scale"?sb:rb:(ad=n||{})&&(t==="scale"?ab:ob):e.style&&!Uu(e.style[t])?nb:~t.indexOf("-")?ib:Vu(e,t)},core:{_removeProperty:Ia,_getMatrix:$u}};dn.utils.checkPrefix=Is;dn.core.getStyleSaver=Mm;(function(r,e,t,n){var i=hn(r+","+e+","+t,function(s){Di[s]=1});hn(e,function(s){bn.units[s]="deg",Tm[s]=1}),ri[i[13]]=r+","+e,hn(n,function(s){var o=s.split(":");ri[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");hn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){bn.units[r]="px"});dn.registerPlugin(Rm);var vb=dn.registerPlugin(Rm)||dn;vb.core.Tween;function pd(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function xb(r,e,t){return e&&pd(r.prototype,e),t&&pd(r,t),r}/*!
 * Observer 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Gt,au,En,Hi,Vi,Ss,Cm,ur,ma,Pm,Ti,Vn,Lm,Dm=function(){return Gt||typeof window<"u"&&(Gt=window.gsap)&&Gt.registerPlugin&&Gt},Um=1,fs=[],Qe=[],oi=[],_a=Date.now,ou=function(e,t){return t},yb=function(){var e=ma.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,Qe),i.push.apply(i,oi),Qe=n,oi=i,ou=function(o,a){return t[o](a)}},$i=function(e,t){return~oi.indexOf(e)&&oi[oi.indexOf(e)+1][t]},ga=function(e){return!!~Pm.indexOf(e)},sn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},Jt=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Mo="scrollLeft",So="scrollTop",lu=function(){return Ti&&Ti.isPressed||Qe.cache++},rl=function(e,t){var n=function i(s){if(s||s===0){Um&&(En.history.scrollRestoration="manual");var o=Ti&&Ti.isPressed;s=i.v=Math.round(s)||(Ti&&Ti.iOS?1:0),e(s),i.cacheID=Qe.cache,o&&ou("ss",s)}else(t||Qe.cache!==i.cacheID||ou("ref"))&&(i.cacheID=Qe.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},nn={s:Mo,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:rl(function(r){return arguments.length?En.scrollTo(r,Ct.sc()):En.pageXOffset||Hi[Mo]||Vi[Mo]||Ss[Mo]||0})},Ct={s:So,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:nn,sc:rl(function(r){return arguments.length?En.scrollTo(nn.sc(),r):En.pageYOffset||Hi[So]||Vi[So]||Ss[So]||0})},an=function(e){return Gt.utils.toArray(e)[0]||(typeof e=="string"&&Gt.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Ji=function(e,t){var n=t.s,i=t.sc;ga(e)&&(e=Hi.scrollingElement||Vi);var s=Qe.indexOf(e),o=i===Ct.sc?1:2;!~s&&(s=Qe.push(e)-1),Qe[s+o]||e.addEventListener("scroll",lu);var a=Qe[s+o],l=a||(Qe[s+o]=rl($i(e,n),!0)||(ga(e)?i:rl(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=Gt.getProperty(e,"scrollBehavior")==="smooth"),l},cu=function(e,t,n){var i=e,s=e,o=_a(),a=o,l=t||50,c=Math.max(500,l*3),u=function(_,m){var g=_a();m||g-o>l?(s=i,i=_,a=o,o=g):n?i+=_:i=s+(_-s)/(g-a)*(o-a)},h=function(){s=i=n?0:i,a=o=0},f=function(_){var m=a,g=s,p=_a();return(_||_===0)&&_!==i&&u(_),o===a||p-a>c?0:(i+(n?g:-g))/((n?p:o)-m)*1e3};return{update:u,reset:h,getVelocity:f}},$s=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},md=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},Im=function(){ma=Gt.core.globals().ScrollTrigger,ma&&ma.core&&yb()},Nm=function(e){return Gt=e||Dm(),Gt&&typeof document<"u"&&document.body&&(En=window,Hi=document,Vi=Hi.documentElement,Ss=Hi.body,Pm=[En,Hi,Vi,Ss],Gt.utils.clamp,Lm=Gt.core.context||function(){},ur="onpointerenter"in Ss?"pointer":"mouse",Cm=At.isTouch=En.matchMedia&&En.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in En||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Vn=At.eventTypes=("ontouchstart"in Vi?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Vi?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Um=0},500),Im(),au=1),au};nn.op=Ct;Qe.cache=0;var At=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){au||Nm(Gt)||console.warn("Please gsap.registerPlugin(Observer)"),ma||Im();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,h=n.onStop,f=n.onStopDelay,d=n.ignore,_=n.wheelSpeed,m=n.event,g=n.onDragStart,p=n.onDragEnd,y=n.onDrag,v=n.onPress,M=n.onRelease,S=n.onRight,b=n.onLeft,w=n.onUp,U=n.onDown,x=n.onChangeX,T=n.onChangeY,H=n.onChange,q=n.onToggleX,B=n.onToggleY,k=n.onHover,W=n.onHoverEnd,te=n.onMove,$=n.ignoreCheck,J=n.isNormalizer,ne=n.onGestureStart,P=n.onGestureEnd,pe=n.onWheel,_e=n.onEnable,Q=n.onDisable,re=n.onClick,de=n.scrollSpeed,ue=n.capture,I=n.allowClicks,Ce=n.lockAxis,ke=n.onLockAxis;this.target=a=an(a)||Vi,this.vars=n,d&&(d=Gt.utils.toArray(d)),i=i||1e-9,s=s||0,_=_||1,de=de||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(En.getComputedStyle(Ss).lineHeight)||22);var ce,we,C,L,N,G,j,D=this,he=0,ae=0,Me=Ji(a,nn),ge=Ji(a,Ct),R=Me(),E=ge(),Y=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Vn[0]==="pointerdown",K=ga(a),Z=a.ownerDocument||Hi,oe=[0,0,0],ve=[0,0,0],xe=0,V=function(){return xe=_a()},me=function(Re,fe){return(D.event=Re)&&d&&~d.indexOf(Re.target)||fe&&Y&&Re.pointerType!=="touch"||$&&$(Re,fe)},ye=function(){D._vx.reset(),D._vy.reset(),we.pause(),h&&h(D)},Te=function(){var Re=D.deltaX=md(oe),fe=D.deltaY=md(ve),Oe=Math.abs(Re)>=i,Ge=Math.abs(fe)>=i;H&&(Oe||Ge)&&H(D,Re,fe,oe,ve),Oe&&(S&&D.deltaX>0&&S(D),b&&D.deltaX<0&&b(D),x&&x(D),q&&D.deltaX<0!=he<0&&q(D),he=D.deltaX,oe[0]=oe[1]=oe[2]=0),Ge&&(U&&D.deltaY>0&&U(D),w&&D.deltaY<0&&w(D),T&&T(D),B&&D.deltaY<0!=ae<0&&B(D),ae=D.deltaY,ve[0]=ve[1]=ve[2]=0),(L||C)&&(te&&te(D),C&&(y(D),C=!1),L=!1),G&&!(G=!1)&&ke&&ke(D),N&&(pe(D),N=!1),ce=0},Ee=function(Re,fe,Oe){oe[Oe]+=Re,ve[Oe]+=fe,D._vx.update(Re),D._vy.update(fe),c?ce||(ce=requestAnimationFrame(Te)):Te()},Ue=function(Re,fe){Ce&&!j&&(D.axis=j=Math.abs(Re)>Math.abs(fe)?"x":"y",G=!0),j!=="y"&&(oe[2]+=Re,D._vx.update(Re,!0)),j!=="x"&&(ve[2]+=fe,D._vy.update(fe,!0)),c?ce||(ce=requestAnimationFrame(Te)):Te()},We=function(Re){if(!me(Re,1)){Re=$s(Re,u);var fe=Re.clientX,Oe=Re.clientY,Ge=fe-D.x,$e=Oe-D.y,bt=D.isDragging;D.x=fe,D.y=Oe,(bt||Math.abs(D.startX-fe)>=s||Math.abs(D.startY-Oe)>=s)&&(y&&(C=!0),bt||(D.isDragging=!0),Ue(Ge,$e),bt||g&&g(D))}},Pe=D.onPress=function(He){me(He,1)||He&&He.button||(D.axis=j=null,we.pause(),D.isPressed=!0,He=$s(He),he=ae=0,D.startX=D.x=He.clientX,D.startY=D.y=He.clientY,D._vx.reset(),D._vy.reset(),sn(J?a:Z,Vn[1],We,u,!0),D.deltaX=D.deltaY=0,v&&v(D))},nt=D.onRelease=function(He){if(!me(He,1)){Jt(J?a:Z,Vn[1],We,!0);var Re=!isNaN(D.y-D.startY),fe=D.isDragging&&(Math.abs(D.x-D.startX)>3||Math.abs(D.y-D.startY)>3),Oe=$s(He);!fe&&Re&&(D._vx.reset(),D._vy.reset(),u&&I&&Gt.delayedCall(.08,function(){if(_a()-xe>300&&!He.defaultPrevented){if(He.target.click)He.target.click();else if(Z.createEvent){var Ge=Z.createEvent("MouseEvents");Ge.initMouseEvent("click",!0,!0,En,1,Oe.screenX,Oe.screenY,Oe.clientX,Oe.clientY,!1,!1,!1,!1,0,null),He.target.dispatchEvent(Ge)}}})),D.isDragging=D.isGesturing=D.isPressed=!1,h&&!J&&we.restart(!0),p&&fe&&p(D),M&&M(D,fe)}},O=function(Re){return Re.touches&&Re.touches.length>1&&(D.isGesturing=!0)&&ne(Re,D.isDragging)},ie=function(){return(D.isGesturing=!1)||P(D)},le=function(Re){if(!me(Re)){var fe=Me(),Oe=ge();Ee((fe-R)*de,(Oe-E)*de,1),R=fe,E=Oe,h&&we.restart(!0)}},Se=function(Re){if(!me(Re)){Re=$s(Re,u),pe&&(N=!0);var fe=(Re.deltaMode===1?l:Re.deltaMode===2?En.innerHeight:1)*_;Ee(Re.deltaX*fe,Re.deltaY*fe,0),h&&!J&&we.restart(!0)}},Ne=function(Re){if(!me(Re)){var fe=Re.clientX,Oe=Re.clientY,Ge=fe-D.x,$e=Oe-D.y;D.x=fe,D.y=Oe,L=!0,(Ge||$e)&&Ue(Ge,$e)}},at=function(Re){D.event=Re,k(D)},Ke=function(Re){D.event=Re,W(D)},xt=function(Re){return me(Re)||$s(Re,u)&&re(D)};we=D._dc=Gt.delayedCall(f||.25,ye).pause(),D.deltaX=D.deltaY=0,D._vx=cu(0,50,!0),D._vy=cu(0,50,!0),D.scrollX=Me,D.scrollY=ge,D.isDragging=D.isGesturing=D.isPressed=!1,Lm(this),D.enable=function(He){return D.isEnabled||(sn(K?Z:a,"scroll",lu),o.indexOf("scroll")>=0&&sn(K?Z:a,"scroll",le,u,ue),o.indexOf("wheel")>=0&&sn(a,"wheel",Se,u,ue),(o.indexOf("touch")>=0&&Cm||o.indexOf("pointer")>=0)&&(sn(a,Vn[0],Pe,u,ue),sn(Z,Vn[2],nt),sn(Z,Vn[3],nt),I&&sn(a,"click",V,!1,!0),re&&sn(a,"click",xt),ne&&sn(Z,"gesturestart",O),P&&sn(Z,"gestureend",ie),k&&sn(a,ur+"enter",at),W&&sn(a,ur+"leave",Ke),te&&sn(a,ur+"move",Ne)),D.isEnabled=!0,He&&He.type&&Pe(He),_e&&_e(D)),D},D.disable=function(){D.isEnabled&&(fs.filter(function(He){return He!==D&&ga(He.target)}).length||Jt(K?Z:a,"scroll",lu),D.isPressed&&(D._vx.reset(),D._vy.reset(),Jt(J?a:Z,Vn[1],We,!0)),Jt(K?Z:a,"scroll",le,ue),Jt(a,"wheel",Se,ue),Jt(a,Vn[0],Pe,ue),Jt(Z,Vn[2],nt),Jt(Z,Vn[3],nt),Jt(a,"click",V,!0),Jt(a,"click",xt),Jt(Z,"gesturestart",O),Jt(Z,"gestureend",ie),Jt(a,ur+"enter",at),Jt(a,ur+"leave",Ke),Jt(a,ur+"move",Ne),D.isEnabled=D.isPressed=D.isDragging=!1,Q&&Q(D))},D.kill=D.revert=function(){D.disable();var He=fs.indexOf(D);He>=0&&fs.splice(He,1),Ti===D&&(Ti=0)},fs.push(D),J&&ga(a)&&(Ti=D),D.enable(m)},xb(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();At.version="3.11.5";At.create=function(r){return new At(r)};At.register=Nm;At.getAll=function(){return fs.slice()};At.getById=function(r){return fs.filter(function(e){return e.vars.id===r})[0]};Dm()&&Gt.registerPlugin(At);/*!
 * ScrollTrigger 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Fe,as,tt,dt,qn,yt,Om,sl,al,ds,ko,Eo,Wt,gl,uu,Qt,_d,gd,os,Fm,Mc,Bm,vn,zm,km,Gm,Bi,hu,ju,Sc,bo=1,tn=Date.now,Ec=tn(),On=0,ia=0,Mb=function r(){return ia&&requestAnimationFrame(r)},vd=function(){return gl=1},xd=function(){return gl=0},ei=function(e){return e},ra=function(e){return Math.round(e*1e5)/1e5||0},Hm=function(){return typeof window<"u"},Vm=function(){return Fe||Hm()&&(Fe=window.gsap)&&Fe.registerPlugin&&Fe},Lr=function(e){return!!~Om.indexOf(e)},Wm=function(e){return $i(e,"getBoundingClientRect")||(Lr(e)?function(){return qo.width=tt.innerWidth,qo.height=tt.innerHeight,qo}:function(){return bi(e)})},Sb=function(e,t,n){var i=n.d,s=n.d2,o=n.a;return(o=$i(e,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(t?tt["inner"+s]:e["client"+s])||0}},Eb=function(e,t){return!t||~oi.indexOf(e)?Wm(e):function(){return qo}},Wi=function(e,t){var n=t.s,i=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+i)&&(o=$i(e,n))?o()-Wm(e)()[s]:Lr(e)?(qn[n]||yt[n])-(tt["inner"+i]||qn["client"+i]||yt["client"+i]):e[n]-e["offset"+i])},To=function(e,t){for(var n=0;n<os.length;n+=3)(!t||~t.indexOf(os[n+1]))&&e(os[n],os[n+1],os[n+2])},Wn=function(e){return typeof e=="string"},rn=function(e){return typeof e=="function"},sa=function(e){return typeof e=="number"},Go=function(e){return typeof e=="object"},js=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},bc=function(e,t){if(e.enabled){var n=t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},ts=Math.abs,Xm="left",qm="top",Zu="right",Ju="bottom",Er="width",br="height",va="Right",xa="Left",ya="Top",Ma="Bottom",St="padding",Dn="margin",Ns="Width",Ku="Height",Bt="px",jn=function(e){return tt.getComputedStyle(e)},bb=function(e){var t=jn(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},yd=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},bi=function(e,t){var n=t&&jn(e)[uu]!=="matrix(1, 0, 0, 1, 0, 0)"&&Fe.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},fu=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},Ym=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},Tb=function(e){return function(t){return Fe.utils.snap(Ym(e),t)}},Qu=function(e){var t=Fe.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return t(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=t(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:t(s<0?i-e:i+e)}},wb=function(e){return function(t,n){return Qu(Ym(e))(t,n.direction)}},wo=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},Nt=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},It=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Ao=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Md={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Ro={toggleActions:"play",anticipatePin:0},ol={top:0,left:0,center:.5,bottom:1,right:1},Ho=function(e,t){if(Wn(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in ol?ol[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Co=function(e,t,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,h=s.fontSize,f=s.indent,d=s.fontWeight,_=dt.createElement("div"),m=Lr(n)||$i(n,"pinType")==="fixed",g=e.indexOf("scroller")!==-1,p=m?yt:n,y=e.indexOf("start")!==-1,v=y?c:u,M="border-color:"+v+";font-size:"+h+";color:"+v+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return M+="position:"+((g||l)&&m?"fixed;":"absolute;"),(g||l||!m)&&(M+=(i===Ct?Zu:Ju)+":"+(o+parseFloat(f))+"px;"),a&&(M+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),_._isStart=y,_.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),_.style.cssText=M,_.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(_,p.children[0]):p.appendChild(_),_._offset=_["offset"+i.op.d2],Vo(_,0,i,y),_},Vo=function(e,t,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+Ns]=1,s["border"+a+Ns]=0,s[n.p]=t+"px",Fe.set(e,s)},Je=[],du={},Fa,Sd=function(){return tn()-On>34&&(Fa||(Fa=requestAnimationFrame(Ri)))},ns=function(){(!vn||!vn.isPressed||vn.startX>yt.clientWidth)&&(Qe.cache++,vn?Fa||(Fa=requestAnimationFrame(Ri)):Ri(),On||Ur("scrollStart"),On=tn())},Tc=function(){Gm=tt.innerWidth,km=tt.innerHeight},aa=function(){Qe.cache++,!Wt&&!Bm&&!dt.fullscreenElement&&!dt.webkitFullscreenElement&&(!zm||Gm!==tt.innerWidth||Math.abs(tt.innerHeight-km)>tt.innerHeight*.25)&&sl.restart(!0)},Dr={},Ab=[],$m=function r(){return It(et,"scrollEnd",r)||_r(!0)},Ur=function(e){return Dr[e]&&Dr[e].map(function(t){return t()})||Ab},xn=[],jm=function(e){for(var t=0;t<xn.length;t+=5)(!e||xn[t+4]&&xn[t+4].query===e)&&(xn[t].style.cssText=xn[t+1],xn[t].getBBox&&xn[t].setAttribute("transform",xn[t+2]||""),xn[t+3].uncache=1)},eh=function(e,t){var n;for(Qt=0;Qt<Je.length;Qt++)n=Je[Qt],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));t&&jm(t),t||Ur("revert")},Zm=function(e,t){Qe.cache++,(t||!Mn)&&Qe.forEach(function(n){return rn(n)&&n.cacheID++&&(n.rec=0)}),Wn(e)&&(tt.history.scrollRestoration=ju=e)},Mn,Tr=0,Ed,Rb=function(){if(Ed!==Tr){var e=Ed=Tr;requestAnimationFrame(function(){return e===Tr&&_r(!0)})}},_r=function(e,t){if(On&&!e){Nt(et,"scrollEnd",$m);return}Mn=et.isRefreshing=!0,Qe.forEach(function(i){return rn(i)&&i.cacheID++&&(i.rec=i())});var n=Ur("refreshInit");Fm&&et.sort(),t||eh(),Qe.forEach(function(i){rn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),Je.slice(0).forEach(function(i){return i.refresh()}),Je.forEach(function(i,s){if(i._subPinOffset&&i.pin){var o=i.vars.horizontal?"offsetWidth":"offsetHeight",a=i.pin[o];i.revert(!0,1),i.adjustPinSpacing(i.pin[o]-a),i.refresh()}}),Je.forEach(function(i){return i.vars.end==="max"&&i.setPositions(i.start,Math.max(i.start+1,Wi(i.scroller,i._dir)))}),n.forEach(function(i){return i&&i.render&&i.render(-1)}),Qe.forEach(function(i){rn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),Zm(ju,1),sl.pause(),Tr++,Mn=2,Ri(2),Je.forEach(function(i){return rn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),Mn=et.isRefreshing=!1,Ur("refresh")},pu=0,Wo=1,Sa,Ri=function(e){if(!Mn||e===2){et.isUpdating=!0,Sa&&Sa.update(0);var t=Je.length,n=tn(),i=n-Ec>=50,s=t&&Je[0].scroll();if(Wo=pu>s?-1:1,Mn||(pu=s),i&&(On&&!gl&&n-On>200&&(On=0,Ur("scrollEnd")),ko=Ec,Ec=n),Wo<0){for(Qt=t;Qt-- >0;)Je[Qt]&&Je[Qt].update(0,i);Wo=1}else for(Qt=0;Qt<t;Qt++)Je[Qt]&&Je[Qt].update(0,i);et.isUpdating=!1}Fa=0},mu=[Xm,qm,Ju,Zu,Dn+Ma,Dn+va,Dn+ya,Dn+xa,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Xo=mu.concat([Er,br,"boxSizing","max"+Ns,"max"+Ku,"position",Dn,St,St+ya,St+va,St+Ma,St+xa]),Cb=function(e,t,n){Es(n);var i=e._gsap;if(i.spacerIsNative)Es(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},wc=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=mu.length,o=t.style,a=e.style,l;s--;)l=mu[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Ju]=a[Zu]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Er]=fu(e,nn)+Bt,o[br]=fu(e,Ct)+Bt,o[St]=a[Dn]=a[qm]=a[Xm]="0",Es(i),a[Er]=a["max"+Ns]=n[Er],a[br]=a["max"+Ku]=n[br],a[St]=n[St],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},Pb=/([A-Z])/g,Es=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,o;for((e.t._gsap||Fe.core.getCache(e.t)).uncache=1;i<n;i+=2)o=e[i+1],s=e[i],o?t[s]=o:t[s]&&t.removeProperty(s.replace(Pb,"-$1").toLowerCase())}},Po=function(e){for(var t=Xo.length,n=e.style,i=[],s=0;s<t;s++)i.push(Xo[s],n[Xo[s]]);return i.t=e,i},Lb=function(e,t,n){for(var i=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],i.push(a,a in t?t[a]:e[o+1]);return i.t=e.t,i},qo={left:0,top:0},bd=function(e,t,n,i,s,o,a,l,c,u,h,f,d){rn(e)&&(e=e(l)),Wn(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?Ho("0"+e.substr(3),n):0));var _=d?d.time():0,m,g,p;if(d&&d.seek(0),sa(e))d&&(e=Fe.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,f,e)),a&&Vo(a,n,i,!0);else{rn(t)&&(t=t(l));var y=(e||"0").split(" "),v,M,S,b;p=an(t)||yt,v=bi(p)||{},(!v||!v.left&&!v.top)&&jn(p).display==="none"&&(b=p.style.display,p.style.display="block",v=bi(p),b?p.style.display=b:p.style.removeProperty("display")),M=Ho(y[0],v[i.d]),S=Ho(y[1]||"0",n),e=v[i.p]-c[i.p]-u+M+s-S,a&&Vo(a,S,i,n-S<20||a._isStart&&S>20),n-=n-S}if(o){var w=e+n,U=o._isStart;m="scroll"+i.d2,Vo(o,w,i,U&&w>20||!U&&(h?Math.max(yt[m],qn[m]):o.parentNode[m])<=w+1),h&&(c=bi(a),h&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+Bt))}return d&&p&&(m=bi(p),d.seek(f),g=bi(p),d._caScrollDist=m[i.p]-g[i.p],e=e/d._caScrollDist*f),d&&d.seek(_),d?e:Math.round(e)},Db=/(webkit|moz|length|cssText|inset)/i,Td=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,o,a;if(t===yt){e._stOrig=s.cssText,a=jn(e);for(o in a)!+o&&!Db.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=e._stOrig;Fe.core.getCache(e).uncache=1,t.appendChild(e)}},Jm=function(e,t,n){var i=t,s=i;return function(o){var a=Math.round(e());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=o,o}},wd=function(e,t){var n=Ji(e,t),i="_scroll"+t.p2,s=function o(a,l,c,u,h){var f=o.tween,d=l.onComplete,_={};c=c||n();var m=Jm(n,c,function(){f.kill(),o.tween=0});return h=u&&h||0,u=u||a-c,f&&f.kill(),l[i]=a,l.modifiers=_,_[i]=function(){return m(c+u*f.ratio+h*f.ratio*f.ratio)},l.onUpdate=function(){Qe.cache++,Ri()},l.onComplete=function(){o.tween=0,d&&d.call(f)},f=o.tween=Fe.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Nt(e,"wheel",n.wheelHandler),et.isTouch&&Nt(e,"touchmove",n.wheelHandler),s},et=function(){function r(t,n){as||r.register(Fe)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!ia){this.update=this.refresh=this.kill=ei;return}n=yd(Wn(n)||sa(n)||n.nodeType?{trigger:n}:n,Ro);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,h=s.scrub,f=s.trigger,d=s.pin,_=s.pinSpacing,m=s.invalidateOnRefresh,g=s.anticipatePin,p=s.onScrubComplete,y=s.onSnapComplete,v=s.once,M=s.snap,S=s.pinReparent,b=s.pinSpacer,w=s.containerAnimation,U=s.fastScrollEnd,x=s.preventOverlaps,T=n.horizontal||n.containerAnimation&&n.horizontal!==!1?nn:Ct,H=!h&&h!==0,q=an(n.scroller||tt),B=Fe.core.getCache(q),k=Lr(q),W=("pinType"in n?n.pinType:$i(q,"pinType")||k&&"fixed")==="fixed",te=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],$=H&&n.toggleActions.split(" "),J="markers"in n?n.markers:Ro.markers,ne=k?0:parseFloat(jn(q)["border"+T.p2+Ns])||0,P=this,pe=n.onRefreshInit&&function(){return n.onRefreshInit(P)},_e=Sb(q,k,T),Q=Eb(q,k),re=0,de=0,ue=Ji(q,T),I,Ce,ke,ce,we,C,L,N,G,j,D,he,ae,Me,ge,R,E,Y,K,Z,oe,ve,xe,V,me,ye,Te,Ee,Ue,We,Pe,nt,O,ie,le,Se,Ne,at,Ke;if(hu(P),P._dir=T,g*=45,P.scroller=q,P.scroll=w?w.time.bind(w):ue,ce=ue(),P.vars=n,i=i||n.animation,"refreshPriority"in n&&(Fm=1,n.refreshPriority===-9999&&(Sa=P)),B.tweenScroll=B.tweenScroll||{top:wd(q,Ct),left:wd(q,nn)},P.tweenTo=I=B.tweenScroll[T.p],P.scrubDuration=function(fe){nt=sa(fe)&&fe,nt?Pe?Pe.duration(fe):Pe=Fe.to(i,{ease:"expo",totalProgress:"+=0.001",duration:nt,paused:!0,onComplete:function(){return p&&p(P)}}):(Pe&&Pe.progress(1).kill(),Pe=0)},i&&(i.vars.lazy=!1,i._initted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),P.animation=i.pause(),i.scrollTrigger=P,P.scrubDuration(h),Pe&&Pe.resetTo&&Pe.resetTo("totalProgress",0),Ue=0,l||(l=i.vars.id)),Je.push(P),M&&((!Go(M)||M.push)&&(M={snapTo:M}),"scrollBehavior"in yt.style&&Fe.set(k?[yt,qn]:q,{scrollBehavior:"auto"}),Qe.forEach(function(fe){return rn(fe)&&fe.target===(k?dt.scrollingElement||qn:q)&&(fe.smooth=!1)}),ke=rn(M.snapTo)?M.snapTo:M.snapTo==="labels"?Tb(i):M.snapTo==="labelsDirectional"?wb(i):M.directional!==!1?function(fe,Oe){return Qu(M.snapTo)(fe,tn()-de<500?0:Oe.direction)}:Fe.utils.snap(M.snapTo),O=M.duration||{min:.1,max:2},O=Go(O)?ds(O.min,O.max):ds(O,O),ie=Fe.delayedCall(M.delay||nt/2||.1,function(){var fe=ue(),Oe=tn()-de<500,Ge=I.tween;if((Oe||Math.abs(P.getVelocity())<10)&&!Ge&&!gl&&re!==fe){var $e=(fe-C)/ae,bt=i&&!H?i.totalProgress():$e,ot=Oe?0:(bt-We)/(tn()-ko)*1e3||0,ft=Fe.utils.clamp(-$e,1-$e,ts(ot/2)*ot/.185),A=$e+(M.inertia===!1?0:ft),X=ds(0,1,ke(A,P)),ee=Math.round(C+X*ae),z=M,se=z.onStart,Le=z.onInterrupt,De=z.onComplete;if(fe<=L&&fe>=C&&ee!==fe){if(Ge&&!Ge._initted&&Ge.data<=ts(ee-fe))return;M.inertia===!1&&(ft=X-$e),I(ee,{duration:O(ts(Math.max(ts(A-bt),ts(X-bt))*.185/ot/.05||0)),ease:M.ease||"power3",data:ts(ee-fe),onInterrupt:function(){return ie.restart(!0)&&Le&&Le(P)},onComplete:function(){P.update(),re=ue(),Ue=We=i&&!H?i.totalProgress():P.progress,y&&y(P),De&&De(P)}},fe,ft*ae,ee-fe-ft*ae),se&&se(P,I.tween)}}else P.isActive&&re!==fe&&ie.restart(!0)}).pause()),l&&(du[l]=P),f=P.trigger=an(f||d),Ke=f&&f._gsap&&f._gsap.stRevert,Ke&&(Ke=Ke(P)),d=d===!0?f:an(d),Wn(a)&&(a={targets:f,className:a}),d&&(_===!1||_===Dn||(_=!_&&d.parentNode&&d.parentNode.style&&jn(d.parentNode).display==="flex"?!1:St),P.pin=d,Ce=Fe.core.getCache(d),Ce.spacer?Me=Ce.pinState:(b&&(b=an(b),b&&!b.nodeType&&(b=b.current||b.nativeElement),Ce.spacerIsNative=!!b,b&&(Ce.spacerState=Po(b))),Ce.spacer=E=b||dt.createElement("div"),E.classList.add("pin-spacer"),l&&E.classList.add("pin-spacer-"+l),Ce.pinState=Me=Po(d)),n.force3D!==!1&&Fe.set(d,{force3D:!0}),P.spacer=E=Ce.spacer,Ee=jn(d),xe=Ee[_+T.os2],K=Fe.getProperty(d),Z=Fe.quickSetter(d,T.a,Bt),wc(d,E,Ee),R=Po(d)),J){he=Go(J)?yd(J,Md):Md,j=Co("scroller-start",l,q,T,he,0),D=Co("scroller-end",l,q,T,he,0,j),Y=j["offset"+T.op.d2];var xt=an($i(q,"content")||q);N=this.markerStart=Co("start",l,xt,T,he,Y,0,w),G=this.markerEnd=Co("end",l,xt,T,he,Y,0,w),w&&(at=Fe.quickSetter([N,G],T.a,Bt)),!W&&!(oi.length&&$i(q,"fixedMarkers")===!0)&&(bb(k?yt:q),Fe.set([j,D],{force3D:!0}),me=Fe.quickSetter(j,T.a,Bt),Te=Fe.quickSetter(D,T.a,Bt))}if(w){var He=w.vars.onUpdate,Re=w.vars.onUpdateParams;w.eventCallback("onUpdate",function(){P.update(0,0,1),He&&He.apply(w,Re||[])})}P.previous=function(){return Je[Je.indexOf(P)-1]},P.next=function(){return Je[Je.indexOf(P)+1]},P.revert=function(fe,Oe){if(!Oe)return P.kill(!0);var Ge=fe!==!1||!P.enabled,$e=Wt;Ge!==P.isReverted&&(Ge&&(Se=Math.max(ue(),P.scroll.rec||0),le=P.progress,Ne=i&&i.progress()),N&&[N,G,j,D].forEach(function(bt){return bt.style.display=Ge?"none":"block"}),Ge&&(Wt=P,P.update(Ge)),d&&(!S||!P.isActive)&&(Ge?Cb(d,E,Me):wc(d,E,jn(d),V)),Ge||P.update(Ge),Wt=$e,P.isReverted=Ge)},P.refresh=function(fe,Oe){if(!((Wt||!P.enabled)&&!Oe)){if(d&&fe&&On){Nt(r,"scrollEnd",$m);return}!Mn&&pe&&pe(P),Wt=P,de=tn(),I.tween&&(I.tween.kill(),I.tween=0),Pe&&Pe.pause(),m&&i&&i.revert({kill:!1}).invalidate(),P.isReverted||P.revert(!0,!0),P._subPinOffset=!1;for(var Ge=_e(),$e=Q(),bt=w?w.duration():Wi(q,T),ot=ae<=.01,ft=0,A=0,X=n.end,ee=n.endTrigger||f,z=n.start||(n.start===0||!f?0:d?"0 0":"0 100%"),se=P.pinnedContainer=n.pinnedContainer&&an(n.pinnedContainer),Le=f&&Math.max(0,Je.indexOf(P))||0,De=Le,Ie,ze,Ye,Xe,Be,Ve,ut,jt,Jn,ht,qe;De--;)Ve=Je[De],Ve.end||Ve.refresh(0,1)||(Wt=P),ut=Ve.pin,ut&&(ut===f||ut===d||ut===se)&&!Ve.isReverted&&(ht||(ht=[]),ht.unshift(Ve),Ve.revert(!0,!0)),Ve!==Je[De]&&(Le--,De--);for(rn(z)&&(z=z(P)),C=bd(z,f,Ge,T,ue(),N,j,P,$e,ne,W,bt,w)||(d?-.001:0),rn(X)&&(X=X(P)),Wn(X)&&!X.indexOf("+=")&&(~X.indexOf(" ")?X=(Wn(z)?z.split(" ")[0]:"")+X:(ft=Ho(X.substr(2),Ge),X=Wn(z)?z:(w?Fe.utils.mapRange(0,w.duration(),w.scrollTrigger.start,w.scrollTrigger.end,C):C)+ft,ee=f)),L=Math.max(C,bd(X||(ee?"100% 0":bt),ee,Ge,T,ue()+ft,G,D,P,$e,ne,W,bt,w))||-.001,ae=L-C||(C-=.01)&&.001,ft=0,De=Le;De--;)Ve=Je[De],ut=Ve.pin,ut&&Ve.start-Ve._pinPush<=C&&!w&&Ve.end>0&&(Ie=Ve.end-Ve.start,(ut===f&&Ve.start-Ve._pinPush<C||ut===se)&&!sa(z)&&(ft+=Ie*(1-Ve.progress)),ut===d&&(A+=Ie));if(C+=ft,L+=ft,ot&&(le=Fe.utils.clamp(0,1,Fe.utils.normalize(C,L,Se))),P._pinPush=A,N&&ft&&(Ie={},Ie[T.a]="+="+ft,se&&(Ie[T.p]="-="+ue()),Fe.set([N,G],Ie)),d)Ie=jn(d),Xe=T===Ct,Ye=ue(),oe=parseFloat(K(T.a))+A,!bt&&L>1&&(qe=(k?dt.scrollingElement||qn:q).style,qe={style:qe,value:qe["overflow"+T.a.toUpperCase()]},qe.style["overflow"+T.a.toUpperCase()]="scroll"),wc(d,E,Ie),R=Po(d),ze=bi(d,!0),jt=W&&Ji(q,Xe?nn:Ct)(),_&&(V=[_+T.os2,ae+A+Bt],V.t=E,De=_===St?fu(d,T)+ae+A:0,De&&V.push(T.d,De+Bt),Es(V),se&&Je.forEach(function(hi){hi.pin===se&&hi.vars.pinSpacing!==!1&&(hi._subPinOffset=!0)}),W&&ue(Se)),W&&(Be={top:ze.top+(Xe?Ye-C:jt)+Bt,left:ze.left+(Xe?jt:Ye-C)+Bt,boxSizing:"border-box",position:"fixed"},Be[Er]=Be["max"+Ns]=Math.ceil(ze.width)+Bt,Be[br]=Be["max"+Ku]=Math.ceil(ze.height)+Bt,Be[Dn]=Be[Dn+ya]=Be[Dn+va]=Be[Dn+Ma]=Be[Dn+xa]="0",Be[St]=Ie[St],Be[St+ya]=Ie[St+ya],Be[St+va]=Ie[St+va],Be[St+Ma]=Ie[St+Ma],Be[St+xa]=Ie[St+xa],ge=Lb(Me,Be,S),Mn&&ue(0)),i?(Jn=i._initted,Mc(1),i.render(i.duration(),!0,!0),ve=K(T.a)-oe+ae+A,ye=Math.abs(ae-ve)>1,W&&ye&&ge.splice(ge.length-2,2),i.render(0,!0,!0),Jn||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Mc(0)):ve=ae,qe&&(qe.value?qe.style["overflow"+T.a.toUpperCase()]=qe.value:qe.style.removeProperty("overflow-"+T.a));else if(f&&ue()&&!w)for(ze=f.parentNode;ze&&ze!==yt;)ze._pinOffset&&(C-=ze._pinOffset,L-=ze._pinOffset),ze=ze.parentNode;ht&&ht.forEach(function(hi){return hi.revert(!1,!0)}),P.start=C,P.end=L,ce=we=Mn?Se:ue(),!w&&!Mn&&(ce<Se&&ue(Se),P.scroll.rec=0),P.revert(!1,!0),ie&&(re=-1,P.isActive&&ue(C+ae*le),ie.restart(!0)),Wt=0,i&&H&&(i._initted||Ne)&&i.progress()!==Ne&&i.progress(Ne,!0).render(i.time(),!0,!0),(ot||le!==P.progress||w)&&(i&&!H&&i.totalProgress(w&&C<-.001&&!le?Fe.utils.normalize(C,L,0):le,!0),P.progress=(ce-C)/ae===le?0:le),d&&_&&(E._pinOffset=Math.round(P.progress*ve)),Pe&&Pe.invalidate(),u&&!Mn&&u(P)}},P.getVelocity=function(){return(ue()-we)/(tn()-ko)*1e3||0},P.endAnimation=function(){js(P.callbackAnimation),i&&(Pe?Pe.progress(1):i.paused()?H||js(i,P.direction<0,1):js(i,i.reversed()))},P.labelToScroll=function(fe){return i&&i.labels&&(C||P.refresh()||C)+i.labels[fe]/i.duration()*ae||0},P.getTrailing=function(fe){var Oe=Je.indexOf(P),Ge=P.direction>0?Je.slice(0,Oe).reverse():Je.slice(Oe+1);return(Wn(fe)?Ge.filter(function($e){return $e.vars.preventOverlaps===fe}):Ge).filter(function($e){return P.direction>0?$e.end<=C:$e.start>=L})},P.update=function(fe,Oe,Ge){if(!(w&&!Ge&&!fe)){var $e=Mn===!0?Se:P.scroll(),bt=fe?0:($e-C)/ae,ot=bt<0?0:bt>1?1:bt||0,ft=P.progress,A,X,ee,z,se,Le,De,Ie;if(Oe&&(we=ce,ce=w?ue():$e,M&&(We=Ue,Ue=i&&!H?i.totalProgress():ot)),g&&!ot&&d&&!Wt&&!bo&&On&&C<$e+($e-we)/(tn()-ko)*g&&(ot=1e-4),ot!==ft&&P.enabled){if(A=P.isActive=!!ot&&ot<1,X=!!ft&&ft<1,Le=A!==X,se=Le||!!ot!=!!ft,P.direction=ot>ft?1:-1,P.progress=ot,se&&!Wt&&(ee=ot&&!ft?0:ot===1?1:ft===1?2:3,H&&(z=!Le&&$[ee+1]!=="none"&&$[ee+1]||$[ee],Ie=i&&(z==="complete"||z==="reset"||z in i))),x&&(Le||Ie)&&(Ie||h||!i)&&(rn(x)?x(P):P.getTrailing(x).forEach(function(Be){return Be.endAnimation()})),H||(Pe&&!Wt&&!bo?(Pe._dp._time-Pe._start!==Pe._time&&Pe.render(Pe._dp._time-Pe._start),Pe.resetTo?Pe.resetTo("totalProgress",ot,i._tTime/i._tDur):(Pe.vars.totalProgress=ot,Pe.invalidate().restart())):i&&i.totalProgress(ot,!!Wt)),d){if(fe&&_&&(E.style[_+T.os2]=xe),!W)Z(ra(oe+ve*ot));else if(se){if(De=!fe&&ot>ft&&L+1>$e&&$e+1>=Wi(q,T),S)if(!fe&&(A||De)){var ze=bi(d,!0),Ye=$e-C;Td(d,yt,ze.top+(T===Ct?Ye:0)+Bt,ze.left+(T===Ct?0:Ye)+Bt)}else Td(d,E);Es(A||De?ge:R),ye&&ot<1&&A||Z(oe+(ot===1&&!De?ve:0))}}M&&!I.tween&&!Wt&&!bo&&ie.restart(!0),a&&(Le||v&&ot&&(ot<1||!Sc))&&al(a.targets).forEach(function(Be){return Be.classList[A||v?"add":"remove"](a.className)}),o&&!H&&!fe&&o(P),se&&!Wt?(H&&(Ie&&(z==="complete"?i.pause().totalProgress(1):z==="reset"?i.restart(!0).pause():z==="restart"?i.restart(!0):i[z]()),o&&o(P)),(Le||!Sc)&&(c&&Le&&bc(P,c),te[ee]&&bc(P,te[ee]),v&&(ot===1?P.kill(!1,1):te[ee]=0),Le||(ee=ot===1?1:3,te[ee]&&bc(P,te[ee]))),U&&!A&&Math.abs(P.getVelocity())>(sa(U)?U:2500)&&(js(P.callbackAnimation),Pe?Pe.progress(1):js(i,z==="reverse"?1:!ot,1))):H&&o&&!Wt&&o(P)}if(Te){var Xe=w?$e/w.duration()*(w._caScrollDist||0):$e;me(Xe+(j._isFlipped?1:0)),Te(Xe)}at&&at(-$e/w.duration()*(w._caScrollDist||0))}},P.enable=function(fe,Oe){P.enabled||(P.enabled=!0,Nt(q,"resize",aa),Nt(k?dt:q,"scroll",ns),pe&&Nt(r,"refreshInit",pe),fe!==!1&&(P.progress=le=0,ce=we=re=ue()),Oe!==!1&&P.refresh())},P.getTween=function(fe){return fe&&I?I.tween:Pe},P.setPositions=function(fe,Oe){d&&(oe+=fe-C,ve+=Oe-fe-ae,_===St&&P.adjustPinSpacing(Oe-fe-ae)),P.start=C=fe,P.end=L=Oe,ae=Oe-fe,P.update()},P.adjustPinSpacing=function(fe){if(V&&fe){var Oe=V.indexOf(T.d)+1;V[Oe]=parseFloat(V[Oe])+fe+Bt,V[1]=parseFloat(V[1])+fe+Bt,Es(V)}},P.disable=function(fe,Oe){if(P.enabled&&(fe!==!1&&P.revert(!0,!0),P.enabled=P.isActive=!1,Oe||Pe&&Pe.pause(),Se=0,Ce&&(Ce.uncache=1),pe&&It(r,"refreshInit",pe),ie&&(ie.pause(),I.tween&&I.tween.kill()&&(I.tween=0)),!k)){for(var Ge=Je.length;Ge--;)if(Je[Ge].scroller===q&&Je[Ge]!==P)return;It(q,"resize",aa),It(q,"scroll",ns)}},P.kill=function(fe,Oe){P.disable(fe,Oe),Pe&&!Oe&&Pe.kill(),l&&delete du[l];var Ge=Je.indexOf(P);Ge>=0&&Je.splice(Ge,1),Ge===Qt&&Wo>0&&Qt--,Ge=0,Je.forEach(function($e){return $e.scroller===P.scroller&&(Ge=1)}),Ge||Mn||(P.scroll.rec=0),i&&(i.scrollTrigger=null,fe&&i.revert({kill:!1}),Oe||i.kill()),N&&[N,G,j,D].forEach(function($e){return $e.parentNode&&$e.parentNode.removeChild($e)}),Sa===P&&(Sa=0),d&&(Ce&&(Ce.uncache=1),Ge=0,Je.forEach(function($e){return $e.pin===d&&Ge++}),Ge||(Ce.spacer=0)),n.onKill&&n.onKill(P)},P.enable(!1,!1),Ke&&Ke(P),!i||!i.add||ae?P.refresh():Fe.delayedCall(.01,function(){return C||L||P.refresh()})&&(ae=.01)&&(C=L=0),d&&Rb()},r.register=function(n){return as||(Fe=n||Vm(),Hm()&&window.document&&r.enable(),as=ia),as},r.defaults=function(n){if(n)for(var i in n)Ro[i]=n[i];return Ro},r.disable=function(n,i){ia=0,Je.forEach(function(o){return o[i?"kill":"disable"](n)}),It(tt,"wheel",ns),It(dt,"scroll",ns),clearInterval(Eo),It(dt,"touchcancel",ei),It(yt,"touchstart",ei),wo(It,dt,"pointerdown,touchstart,mousedown",vd),wo(It,dt,"pointerup,touchend,mouseup",xd),sl.kill(),To(It);for(var s=0;s<Qe.length;s+=3)Ao(It,Qe[s],Qe[s+1]),Ao(It,Qe[s],Qe[s+2])},r.enable=function(){if(tt=window,dt=document,qn=dt.documentElement,yt=dt.body,Fe&&(al=Fe.utils.toArray,ds=Fe.utils.clamp,hu=Fe.core.context||ei,Mc=Fe.core.suppressOverwrites||ei,ju=tt.history.scrollRestoration||"auto",pu=tt.pageYOffset,Fe.core.globals("ScrollTrigger",r),yt)){ia=1,Mb(),At.register(Fe),r.isTouch=At.isTouch,Bi=At.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Nt(tt,"wheel",ns),Om=[tt,dt,qn,yt],Fe.matchMedia?(r.matchMedia=function(l){var c=Fe.matchMedia(),u;for(u in l)c.add(u,l[u]);return c},Fe.addEventListener("matchMediaInit",function(){return eh()}),Fe.addEventListener("matchMediaRevert",function(){return jm()}),Fe.addEventListener("matchMedia",function(){_r(0,1),Ur("matchMedia")}),Fe.matchMedia("(orientation: portrait)",function(){return Tc(),Tc})):console.warn("Requires GSAP 3.11.0 or later"),Tc(),Nt(dt,"scroll",ns);var n=yt.style,i=n.borderTopStyle,s=Fe.core.Animation.prototype,o,a;for(s.revert||Object.defineProperty(s,"revert",{value:function(){return this.time(-.01,!0)}}),n.borderTopStyle="solid",o=bi(yt),Ct.m=Math.round(o.top+Ct.sc())||0,nn.m=Math.round(o.left+nn.sc())||0,i?n.borderTopStyle=i:n.removeProperty("border-top-style"),Eo=setInterval(Sd,250),Fe.delayedCall(.5,function(){return bo=0}),Nt(dt,"touchcancel",ei),Nt(yt,"touchstart",ei),wo(Nt,dt,"pointerdown,touchstart,mousedown",vd),wo(Nt,dt,"pointerup,touchend,mouseup",xd),uu=Fe.utils.checkPrefix("transform"),Xo.push(uu),as=tn(),sl=Fe.delayedCall(.2,_r).pause(),os=[dt,"visibilitychange",function(){var l=tt.innerWidth,c=tt.innerHeight;dt.hidden?(_d=l,gd=c):(_d!==l||gd!==c)&&aa()},dt,"DOMContentLoaded",_r,tt,"load",_r,tt,"resize",aa],To(Nt),Je.forEach(function(l){return l.enable(0,1)}),a=0;a<Qe.length;a+=3)Ao(It,Qe[a],Qe[a+1]),Ao(It,Qe[a],Qe[a+2])}},r.config=function(n){"limitCallbacks"in n&&(Sc=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Eo)||(Eo=i)&&setInterval(Sd,i),"ignoreMobileResize"in n&&(zm=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(To(It)||To(Nt,n.autoRefreshEvents||"none"),Bm=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=an(n),o=Qe.indexOf(s),a=Lr(s);~o&&Qe.splice(o,a?6:2),i&&(a?oi.unshift(tt,i,yt,i,qn,i):oi.unshift(s,i))},r.clearMatchMedia=function(n){Je.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(Wn(n)?an(n):n).getBoundingClientRect(),a=o[s?Er:br]*i||0;return s?o.right-a>0&&o.left+a<tt.innerWidth:o.bottom-a>0&&o.top+a<tt.innerHeight},r.positionInViewport=function(n,i,s){Wn(n)&&(n=an(n));var o=n.getBoundingClientRect(),a=o[s?Er:br],l=i==null?a/2:i in ol?ol[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/tt.innerWidth:(o.top+l)/tt.innerHeight},r.killAll=function(n){if(Je.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Dr.killAll||[];Dr={},i.forEach(function(s){return s()})}},r}();et.version="3.11.5";et.saveStyles=function(r){return r?al(r).forEach(function(e){if(e&&e.style){var t=xn.indexOf(e);t>=0&&xn.splice(t,5),xn.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Fe.core.getCache(e),hu())}}):xn};et.revert=function(r,e){return eh(!r,e)};et.create=function(r,e){return new et(r,e)};et.refresh=function(r){return r?aa():(as||et.register())&&_r(!0)};et.update=function(r){return++Qe.cache&&Ri(r===!0?2:0)};et.clearScrollMemory=Zm;et.maxScroll=function(r,e){return Wi(r,e?nn:Ct)};et.getScrollFunc=function(r,e){return Ji(an(r),e?nn:Ct)};et.getById=function(r){return du[r]};et.getAll=function(){return Je.filter(function(r){return r.vars.id!=="ScrollSmoother"})};et.isScrolling=function(){return!!On};et.snapDirectional=Qu;et.addEventListener=function(r,e){var t=Dr[r]||(Dr[r]=[]);~t.indexOf(e)||t.push(e)};et.removeEventListener=function(r,e){var t=Dr[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};et.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var h=[],f=[],d=Fe.delayedCall(i,function(){u(h,f),h=[],f=[]}).pause();return function(_){h.length||d.restart(!0),h.push(_.trigger),f.push(_),s<=h.length&&d.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&rn(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return rn(s)&&(s=s(),Nt(et,"refresh",function(){return s=e.batchMax()})),al(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(et.create(c))}),t};var Ad=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},Ac=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(At.isTouch?" pinch-zoom":""):"none",e===qn&&r(yt,t)},Lo={auto:1,scroll:1},Ub=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||Fe.core.getCache(s),a=tn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==yt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Lo[(l=jn(s)).overflowY]||Lo[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!Lr(s)&&(Lo[(l=jn(s)).overflowY]||Lo[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},Km=function(e,t,n,i){return At.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&Ub,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&Nt(dt,At.eventTypes[0],Cd,!1,!0)},onDisable:function(){return It(dt,At.eventTypes[0],Cd,!0)}})},Ib=/(input|label|select|textarea)/i,Rd,Cd=function(e){var t=Ib.test(e.target.tagName);(t||Rd)&&(e._gsapAllow=!0,Rd=t)},Nb=function(e){Go(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=an(e.target)||qn,u=Fe.core.globals().ScrollSmoother,h=u&&u.get(),f=Bi&&(e.content&&an(e.content)||h&&e.content!==!1&&!h.smooth()&&h.content()),d=Ji(c,Ct),_=Ji(c,nn),m=1,g=(At.isTouch&&tt.visualViewport?tt.visualViewport.scale*tt.visualViewport.width:tt.outerWidth)/tt.innerWidth,p=0,y=rn(i)?function(){return i(a)}:function(){return i||2.8},v,M,S=Km(c,e.type,!0,s),b=function(){return M=!1},w=ei,U=ei,x=function(){l=Wi(c,Ct),U=ds(Bi?1:0,l),n&&(w=ds(0,Wi(c,nn))),v=Tr},T=function(){f._gsap.y=ra(parseFloat(f._gsap.y)+d.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},H=function(){if(M){requestAnimationFrame(b);var J=ra(a.deltaY/2),ne=U(d.v-J);if(f&&ne!==d.v+d.offset){d.offset=ne-d.v;var P=ra((parseFloat(f&&f._gsap.y)||0)-d.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+P+", 0, 1)",f._gsap.y=P+"px",d.cacheID=Qe.cache,Ri()}return!0}d.offset&&T(),M=!0},q,B,k,W,te=function(){x(),q.isActive()&&q.vars.scrollY>l&&(d()>l?q.progress(1)&&d(l):q.resetTo("scrollY",l))};return f&&Fe.set(f,{y:"+=0"}),e.ignoreCheck=function($){return Bi&&$.type==="touchmove"&&H()||m>1.05&&$.type!=="touchstart"||a.isGesturing||$.touches&&$.touches.length>1},e.onPress=function(){M=!1;var $=m;m=ra((tt.visualViewport&&tt.visualViewport.scale||1)/g),q.pause(),$!==m&&Ac(c,m>1.01?!0:n?!1:"x"),B=_(),k=d(),x(),v=Tr},e.onRelease=e.onGestureStart=function($,J){if(d.offset&&T(),!J)W.restart(!0);else{Qe.cache++;var ne=y(),P,pe;n&&(P=_(),pe=P+ne*.05*-$.velocityX/.227,ne*=Ad(_,P,pe,Wi(c,nn)),q.vars.scrollX=w(pe)),P=d(),pe=P+ne*.05*-$.velocityY/.227,ne*=Ad(d,P,pe,Wi(c,Ct)),q.vars.scrollY=U(pe),q.invalidate().duration(ne).play(.01),(Bi&&q.vars.scrollY>=l||P>=l-1)&&Fe.to({},{onUpdate:te,duration:ne})}o&&o($)},e.onWheel=function(){q._ts&&q.pause(),tn()-p>1e3&&(v=0,p=tn())},e.onChange=function($,J,ne,P,pe){if(Tr!==v&&x(),J&&n&&_(w(P[2]===J?B+($.startX-$.x):_()+J-P[1])),ne){d.offset&&T();var _e=pe[2]===ne,Q=_e?k+$.startY-$.y:d()+ne-pe[1],re=U(Q);_e&&Q!==re&&(k+=re-Q),d(re)}(ne||J)&&Ri()},e.onEnable=function(){Ac(c,n?!1:"x"),et.addEventListener("refresh",te),Nt(tt,"resize",te),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=_.smooth=!1),S.enable()},e.onDisable=function(){Ac(c,!0),It(tt,"resize",te),et.removeEventListener("refresh",te),S.kill()},e.lockAxis=e.lockAxis!==!1,a=new At(e),a.iOS=Bi,Bi&&!d()&&d(1),Bi&&Fe.ticker.add(ei),W=a._dc,q=Fe.to(a,{ease:"power4",paused:!0,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:Jm(d,d(),function(){return q.pause()})},onUpdate:Ri,onComplete:W.vars.onComplete}),a};et.sort=function(r){return Je.sort(r||function(e,t){return(e.vars.refreshPriority||0)*-1e6+e.start-(t.start+(t.vars.refreshPriority||0)*-1e6)})};et.observe=function(r){return new At(r)};et.normalizeScroll=function(r){if(typeof r>"u")return vn;if(r===!0&&vn)return vn.enable();if(r===!1)return vn&&vn.kill();var e=r instanceof At?r:Nb(r);return vn&&vn.target===e.target&&vn.kill(),Lr(e.target)&&(vn=e),e};et.core={_getVelocityProp:cu,_inputObserver:Km,_scrollers:Qe,_proxies:oi,bridge:{ss:function(){On||Ur("scrollStart"),On=tn()},ref:function(){return Wt}}};Vm()&&Fe.registerPlugin(et);const oT=Object.freeze(Object.defineProperty({__proto__:null,ScrollTrigger:et,default:et},Symbol.toStringTag,{value:"Module"}));export{S_ as A,wi as B,Qb as C,rt as D,Jb as E,eT as F,nT as G,tT as H,vb as I,rT as J,Ap as K,Zb as L,aT as M,ii as N,sT as O,Ln as P,Hb as Q,Rc as R,Gd as S,iT as T,Fb as U,Ba as V,oS as W,jb as X,oT as Y,d_ as a,Ml as b,__ as c,Wb as d,Ob as e,zd as f,is as g,Gb as h,kd as i,Cc as j,rh as k,Pc as l,Bb as m,zb as n,ah as o,Ea as p,Lc as q,sh as r,_u as s,x_ as t,Vb as u,oh as v,kb as w,Xb as x,qb as y,M_ as z};
