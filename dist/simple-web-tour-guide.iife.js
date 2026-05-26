var SimpleTourGuide=(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});var t=globalThis,n=t.ShadowRoot&&(t.ShadyCSS===void 0||t.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,r=Symbol(),i=new WeakMap,a=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(n&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=i.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&i.set(t,e))}return e}toString(){return this.cssText}},o=e=>new a(typeof e==`string`?e:e+``,void 0,r),s=(e,...t)=>new a(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,r),c=(e,r)=>{if(n)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of r){let r=document.createElement(`style`),i=t.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=n.cssText,e.appendChild(r)}},l=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return o(t)})(e):e,{is:u,defineProperty:d,getOwnPropertyDescriptor:ee,getOwnPropertyNames:te,getOwnPropertySymbols:ne,getPrototypeOf:re}=Object,f=globalThis,p=f.trustedTypes,ie=p?p.emptyScript:``,ae=f.reactiveElementPolyfillSupport,m=(e,t)=>e,h={toAttribute(e,t){switch(t){case Boolean:e=e?ie:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},g=(e,t)=>!u(e,t),_={attribute:!0,type:String,converter:h,reflect:!1,useDefault:!1,hasChanged:g};Symbol.metadata??=Symbol(`metadata`),f.litPropertyMetadata??=new WeakMap;var v=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&d(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=ee(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_}static _$Ei(){if(this.hasOwnProperty(m(`elementProperties`)))return;let e=re(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(m(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m(`properties`))){let e=this.properties,t=[...te(e),...ne(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(l(e))}else e!==void 0&&t.push(l(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return c(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?h:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?h:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??g)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};v.elementStyles=[],v.shadowRootOptions={mode:`open`},v[m(`elementProperties`)]=new Map,v[m(`finalized`)]=new Map,ae?.({ReactiveElement:v}),(f.reactiveElementVersions??=[]).push(`2.1.2`);var y=globalThis,oe=e=>e,b=y.trustedTypes,se=b?b.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,x=`$lit$`,S=`lit$${Math.random().toFixed(9).slice(2)}$`,C=`?`+S,ce=`<${C}>`,w=document,T=()=>w.createComment(``),E=e=>e===null||typeof e!=`object`&&typeof e!=`function`,D=Array.isArray,le=e=>D(e)||typeof e?.[Symbol.iterator]==`function`,O=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,A=/-->/g,ue=/>/g,j=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),de=/'/g,fe=/"/g,pe=/^(?:script|style|textarea|title)$/i,M=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),N=Symbol.for(`lit-noChange`),P=Symbol.for(`lit-nothing`),me=new WeakMap,F=w.createTreeWalker(w,129);function I(e,t){if(!D(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return se===void 0?t:se.createHTML(t)}var he=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=k;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===k?c[1]===`!--`?o=A:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=j):(pe.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=j):o=ue:o===j?c[0]===`>`?(o=i??k,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?j:c[3]===`"`?fe:de):o===fe||o===de?o=j:o===A||o===ue?o=k:(o=j,i=void 0);let d=o===j&&e[t+1].startsWith(`/>`)?` `:``;a+=o===k?n+ce:l>=0?(r.push(s),n.slice(0,l)+x+n.slice(l)+S+d):n+S+(l===-2?t:d)}return[I(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},L=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=he(t,n);if(this.el=e.createElement(l,r),F.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=F.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(x)){let t=u[o++],n=i.getAttribute(e).split(S),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?_e:r[1]===`?`?ve:r[1]===`@`?ye:B}),i.removeAttribute(e)}else e.startsWith(S)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(pe.test(i.tagName)){let e=i.textContent.split(S),t=e.length-1;if(t>0){i.textContent=b?b.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],T()),F.nextNode(),c.push({type:2,index:++a});i.append(e[t],T())}}}else if(i.nodeType===8)if(i.data===C)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(S,e+1))!==-1;)c.push({type:7,index:a}),e+=S.length-1}a++}}static createElement(e,t){let n=w.createElement(`template`);return n.innerHTML=e,n}};function R(e,t,n=e,r){if(t===N)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=E(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=R(e,i._$AS(e,t.values),i,r)),t}var ge=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??w).importNode(t,!0);F.currentNode=r;let i=F.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new z(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new be(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=F.nextNode(),a++)}return F.currentNode=w,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},z=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=P,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=R(this,e,t),E(e)?e===P||e==null||e===``?(this._$AH!==P&&this._$AR(),this._$AH=P):e!==this._$AH&&e!==N&&this._(e):e._$litType$===void 0?e.nodeType===void 0?le(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==P&&E(this._$AH)?this._$AA.nextSibling.data=e:this.T(w.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=L.createElement(I(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new ge(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=me.get(e.strings);return t===void 0&&me.set(e.strings,t=new L(e)),t}k(t){D(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(T()),this.O(T()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=oe(e).nextSibling;oe(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},B=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=P,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=P}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=R(this,e,t,0),a=!E(e)||e!==this._$AH&&e!==N,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=R(this,r[n+o],t,o),s===N&&(s=this._$AH[o]),a||=!E(s)||s!==this._$AH[o],s===P?e=P:e!==P&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===P?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},_e=class extends B{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===P?void 0:e}},ve=class extends B{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==P)}},ye=class extends B{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=R(this,e,t,0)??P)===N)return;let n=this._$AH,r=e===P&&n!==P||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==P&&(n===P||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},be=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){R(this,e)}},xe=y.litHtmlPolyfillSupport;xe?.(L,z),(y.litHtmlVersions??=[]).push(`3.3.3`);var Se=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new z(t.insertBefore(T(),e),e,void 0,n??{})}return i._$AI(e),i},V=globalThis,H=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Se(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return N}};H._$litElement$=!0,H.finalized=!0,V.litElementHydrateSupport?.({LitElement:H});var Ce=V.litElementPolyfillSupport;Ce?.({LitElement:H}),(V.litElementVersions??=[]).push(`4.2.2`);var we=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},Te={attribute:!0,type:String,converter:h,reflect:!1,hasChanged:g},Ee=(e=Te,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function U(e){return(t,n)=>typeof n==`object`?Ee(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function W(e){return U({...e,state:!0,attribute:!1})}var G=(e,t,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof t!=`object`&&Object.defineProperty(e,t,n),n);function K(e,t){return(n,r,i)=>{let a=t=>t.renderRoot?.querySelector(e)??null;if(t){let{get:e,set:t}=typeof r==`object`?n:i??(()=>{let e=Symbol();return{get(){return this[e]},set(t){this[e]=t}}})();return G(n,r,{get(){let n=e.call(this);return n===void 0&&(n=a(this),(n!==null||this.hasUpdated)&&t.call(this,n)),n}})}return G(n,r,{get(){return a(this)}})}}function De(e){return(t,n)=>{let{slot:r,selector:i}=e??{},a=`slot`+(r?`[name=${r}]`:`:not([name])`);return G(t,n,{get(){let t=(this.renderRoot?.querySelector(a))?.assignedElements(e)??[];return i===void 0?t:t.filter(e=>e.matches(i))}})}}var Oe=`close-button`,q=`step-back-button`,J=`step-next-button`,ke=`tour-guides-overlay`,Y=`root-container`,Ae=`170px`,je=`288px`,Me=`rgba(0,0,0,0.3)`,X={IS_ENABLED:`is-enabled`,DISABLE_CLOSE_ON_OUTSIDE_CLICK:`disable-close-on-outside-click`,STEP_CONTENT_HEIGHT:`step-content-height`,STEP_CONTENT_WIDTH:`step-content-width`,HIDE_HEADER:`hide-header`,ALLOW_OUTSIDE_INTERACTION:`allow-outside-interaction`,DONE_LABEL:`done-label`,OVERLAY_FILL_COLOR:`overlay-fill-color`,DONT_HIDE_BACK_BUTTON_ON_FIRST_STEP:`dont-hide-back-button-on-first-step`,HIDE_BULLETS:`hide-bullets`},Z={ON_CLOSE:`simple-tour-guide:on-close`,ON_DONE:`simple-tour-guide:on-done`,ON_STEP_CHANGE:`simple-tour-guide:on-step-change`};function Q(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var $=class extends H{constructor(){super(),this._internals=this.attachInternals(),this.isEnabled=!1,this.disableCloseOnOutsideClick=!1,this.stepContentHeight=Ae,this.stepContentWidth=je,this.hideHeader=!1,this.allowOutsideInteraction=!1,this.doneLabel=`Done`,this.overlayFillColor=Me,this.dontHideBackButtonOnFirstStep=!1,this.hideBullets=!1,this._tourGuideActiveStepIndex=-1,this._stepHeading=``,this._activeStepAnchorElem=null,this._queuedElemForMoveHighlightMask=null,this._isClosing=!1,this._handleOverlayClick=this._handleOverlayClick.bind(this),this._onScrollEnd=this._onScrollEnd.bind(this),this._handleScroll=this._handleScroll.bind(this),this._handleKeydown=this._handleKeydown.bind(this),this._handleWindowResize=this._handleWindowResize.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener(`resize`,this._handleWindowResize),window.addEventListener(`scroll`,this._handleScroll),window.addEventListener(`scrollend`,this._onScrollEnd),window.addEventListener(`keydown`,this._handleKeydown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(`resize`,this._handleWindowResize),window.removeEventListener(`scroll`,this._handleScroll),window.removeEventListener(`scrollend`,this._onScrollEnd),window.removeEventListener(`keydown`,this._handleKeydown)}async attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),X.IS_ENABLED,X.DISABLE_CLOSE_ON_OUTSIDE_CLICK,X.ALLOW_OUTSIDE_INTERACTION}willUpdate(e){let t=e.has(`stepContentWidth`),n=e.has(`stepContentHeight`),r=e.has(`overlayFillColor`);t&&this.stepContentWidth==null&&(this.stepContentWidth=je),n&&this.stepContentHeight==null&&(this.stepContentHeight=Ae),r&&this.overlayFillColor==null&&(this.overlayFillColor=Me)}updated(e){(()=>{if(!e.has(`_tourGuideActiveStepIndex`))return;let t=this._tourGuideActiveStepIndex===0,n=this._tourGuideActiveStepIndex===this._stepContentElements?.length-1;this._emitCustomEvent({name:Z.ON_STEP_CHANGE,detail:{isFirstStep:t,isLastStep:n,stepIndex:this._tourGuideActiveStepIndex}}),n?this._internals.states.add(`on-last-step`):this._internals.states.delete(`on-last-step`),t?this._internals.states.add(`on-first-step`):this._internals.states.delete(`on-first-step`),this._stepContentElements?.forEach((e,t)=>{e.hidden=t!==this._tourGuideActiveStepIndex});let r=this._stepContentElements?.[this._tourGuideActiveStepIndex];if(!r)return;let i=r.dataset.anchorElement,a=document.querySelector(i);if(!a){this._emitCloseTourGuideEvent();return}this._activeStepAnchorElem=a;let o=r.dataset.stepHeading||``;this._stepHeading=o,this._moveHighlightMaskToElement(a);let s=`--tour-guide-anchor-${this._tourGuideActiveStepIndex}`;a.style.anchorName=s,this.style.width=`auto`,this.style.height=`auto`,this.style.position=`absolute`,this.style.positionAnchor=s,this.style.top=`calc(anchor(end) + 0.125rem)`,this.style.left=`anchor(left)`,this.style.positionTryFallbacks=`flip-block, flip-inline`,this.style.transition=`all 0.2s ease`})(),e.has(`isEnabled`)&&(this.isEnabled?(this._isClosing=!1,this._setupUI()):this._isClosing=!0),(()=>{if(!e.has(`_isClosing`)||!this._isClosing)return;let t=this._rootContainerElem;if(!t){this._closeTourGuide(),this._isClosing=!1;return}t.addEventListener(`animationend`,e=>{e.animationName===`tour-guide-exit`&&(this._closeTourGuide(),this._isClosing=!1)},{once:!0})})(),e.has(`disableCloseOnOutsideClick`)&&this._overlayElem&&(this.disableCloseOnOutsideClick?this._overlayElem.removeEventListener(`click`,this._handleOverlayClick):(this._overlayElem.removeEventListener(`click`,this._handleOverlayClick),this._overlayElem.addEventListener(`click`,this._handleOverlayClick))),e.has(`allowOutsideInteraction`)&&this._overlayElem&&(this.allowOutsideInteraction?this._overlayElem.style.pointerEvents=`none`:this._overlayElem.style.pointerEvents=`initial`),(()=>{let e=this.shadowRoot?.querySelectorAll(`[data-slot-target="step-bullet"]`)||[],t=this._stepBulletSlottedElements?.[0];t&&e?.forEach(e=>{e.classList.remove(`step-bullet`),e.innerHTML=``,e.appendChild(t.cloneNode(!0))})})()}_emitCustomEvent({name:e,detail:t}){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:t}))}_emitCloseTourGuideEvent(){this._emitCustomEvent({name:Z.ON_CLOSE})}_setupUI(){if(!this._stepContentElements?.length){this._emitCloseTourGuideEvent();return}this._tourGuideActiveStepIndex=0,this._stepHeading=`Step Heading`,this._insertOverlayInMainDocument(),this?._rootContainerElem?.focus?.()}_closeTourGuide(){this._overlayElem&&(this._overlayElem.removeEventListener(`click`,this._handleOverlayClick),this._overlayElem?.parentNode?.removeChild?.(this._overlayElem)),this._tourGuideActiveStepIndex=-1,this._activeStepAnchorElem=null,this._queuedElemForMoveHighlightMask=null}_handleNextButtonClick(){if(this._tourGuideActiveStepIndex===this._stepContentElements?.length-1){this._emitCustomEvent({name:Z.ON_DONE});return}this._tourGuideActiveStepIndex=Math.min(this._tourGuideActiveStepIndex+1,this._stepContentElements?.length-1)}_handleBackButtonClick(){this._tourGuideActiveStepIndex=Math.max(this._tourGuideActiveStepIndex-1,0)}_handleCloseButtonClick(){this._emitCloseTourGuideEvent()}_handleOverlayClick(){this._emitCloseTourGuideEvent()}_insertOverlayInMainDocument(){let e=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);this._overlayElem=e,e.id=ke,e.style.position=`fixed`,e.style.inset=`0px`,e.style.width=`100%`,e.style.height=`100%`,e.style.zIndex=`9999999`,this.allowOutsideInteraction&&(e.style.pointerEvents=`none`);let t=this._stepContentElements?.[this._tourGuideActiveStepIndex];if(!t)return;let n=t.dataset.anchorElement,r=document.querySelector(n);if(!r){this._emitCloseTourGuideEvent();return}this._activeStepAnchorElem=r,this._moveHighlightMaskToElement(r),this.disableCloseOnOutsideClick?e.removeEventListener(`click`,this._handleOverlayClick):(e.removeEventListener(`click`,this._handleOverlayClick),e.addEventListener(`click`,this._handleOverlayClick));let i=document.body;i.insertBefore(e,i.firstChild)}_moveHighlightMaskToElement(e){let t=e?.offsetTop<window.scrollY||e?.offsetTop>window.innerHeight+window.scrollY;typeof e.scrollIntoView==`function`&&(e.scrollIntoView({behavior:`smooth`,block:`center`}),t&&(this._queuedElemForMoveHighlightMask=e)),this._insertHighlightMaskElementOnPage(e)}_insertHighlightMaskElementOnPage(e){if(!this._overlayElem)return;let t=e.getBoundingClientRect(),n=Math.max(0,t.top);this._overlayElem.innerHTML=`
          <defs>
            <mask id="cutout">
              <rect width="100%" height="100%" fill="white"/>
              <rect 
                x="${t.left}" y="${n}" 
                width="${t.width}" height="${t.height}" 
                rx="6"
                fill="black"/>
            </mask>
          </defs>
          <rect 
            width="100%" height="100%" 
            fill=${this.overlayFillColor} 
            mask="url(#cutout)"/>
        `}_handleKeydown(e){e?.key===`Escape`&&this._emitCloseTourGuideEvent()}_handleBulletClick({stepElementIndex:e}){this._tourGuideActiveStepIndex=e}_onScrollEnd(){this._queuedElemForMoveHighlightMask&&=(this._moveHighlightMaskToElement(this._queuedElemForMoveHighlightMask),null)}_handleScroll(){(()=>{if(this._activeStepAnchorElem)if(this._activeStepAnchorElem?.clientHeight+this._activeStepAnchorElem?.offsetTop<window.scrollY||this._activeStepAnchorElem?.offsetTop>window.innerHeight+window.scrollY){let e=`
              <defs>
                <mask id="cutout">
                  <rect width="100%" height="100%" fill="white"/>
                </mask>
              </defs>
              <rect 
                width="100%" height="100%" 
                fill=${this.overlayFillColor}
                mask="url(#cutout)"/>
            `;this._overlayElem&&(this._overlayElem.innerHTML=e)}else this._insertHighlightMaskElementOnPage(this._activeStepAnchorElem)})()}_handleWindowResize(){this._activeStepAnchorElem&&this._moveHighlightMaskToElement(this._activeStepAnchorElem)}render(){if(!this.isEnabled&&!this._isClosing)return null;let e=+(this._tourGuideActiveStepIndex===0),t=this._tourGuideActiveStepIndex===0,n=this._tourGuideActiveStepIndex===this._stepContentElements?.length-1;return M`
      <style>
        ::slotted([slot="step-content"]) {
          overflow-y: auto;
          height: ${o(this.stepContentHeight)};
          max-height: ${o(this.stepContentHeight)};
          width: ${o(this.stepContentWidth)};
        }

        #tour-guide-step-heading {
          font-weight: 700;
          font-size: 1.125rem;
          max-width: calc(${o(this.stepContentWidth)} - 3rem);
          color: #000000;
        }
      </style>

      <div
        id=${Y}
        class=${this._isClosing?`closing`:``}
        tabindex="0"
        part=${Y}
      >
        <slot name="header">
          ${this.hideHeader?``:M`
                <header part="header">
                  <p id="tour-guide-step-heading" part="step-heading">
                    ${this._stepHeading}
                  </p>
                </header>
              `}
        </slot>

        <slot name="close-button">
          <button
            id="close-button"
            part="close-button"
            @click=${this._handleCloseButtonClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
              />
            </svg>
          </button>
        </slot>

        <main id="tour-guide-main" part="content-main">
          <slot name="step-content"></slot>

          ${this.hideBullets?null:M`
                <div id="step-bullets-container">
                  ${this._stepContentElements?.map((t,n)=>{let r=n===this._tourGuideActiveStepIndex;return r?M`
                        <slot
                          name="step-bullet-active"
                          @click=${()=>{this._handleBulletClick({stepElementIndex:n})}}
                        >
                          <button
                            class="step-bullet step-bullet--active step-bullet-${n}"
                          ></button>
                        </slot>
                      `:n===e?M`
                        <slot
                          name="step-bullet"
                          @click=${()=>{this._handleBulletClick({stepElementIndex:n})}}
                        >
                          <button
                            class="step-bullet step-bullet-${n}${r?` step-bullet--active`:``}"
                          ></button>
                        </slot>
                      `:M`
                      <div
                        data-slot-target="step-bullet"
                        class="step-bullet step-bullet-${n}"
                        @click=${()=>{this._handleBulletClick({stepElementIndex:n})}}
                      ></div>
                    `})}
                </div>
              `}
        </main>

        <footer part="footer">
          <slot
            name=${q}
            @click=${this._handleBackButtonClick}
          >
            ${t&&!this.dontHideBackButtonOnFirstStep?null:M`
                  <button id=${q} part=${q}>
                    Back
                  </button>
                `}
          </slot>
          <slot
            name=${J}
            @click=${this._handleNextButtonClick}
          >
            <button id=${J} part=${J}>
              ${n?this.doneLabel||`Done`:`Next`}
            </button>
          </slot>
        </footer>
      </div>
    `}static{this.styles=s`
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :host {
      --step-buttons-bg-color: #f4f4f4;
      --step-buttons-color: #000000;
      display: flex;
      z-index: 99999999;
      height: 0px;
      width: 0px;
    }

    slot[name="step-description"] {
      font-size: 1.125rem;
      font-family: sans-serif;
    }

    @keyframes tour-guide-enter {
      from {
        opacity: 0;
        transform: translateY(-6px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes tour-guide-exit {
      from {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      to {
        opacity: 0;
        transform: translateY(-6px) scale(0.97);
      }
    }

    #root-container {
      border: 1px solid silver !important;
      border-radius: 0.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #ffffff;
      border: none;
      position: relative;
      height: max-content;
      animation: tour-guide-enter 0.5s ease forwards;
    }
    #root-container.closing {
      animation: tour-guide-exit 0.2s ease forwards;
    }
    #root-container::before {
      position: absolute;
      content: "";
    }

    header {
      border-bottom: 1px solid silver;
      padding: 0px 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      height: 3.125rem;
    }

    #close-button {
      background: transparent;
      border-radius: 100%;
      height: 2rem;
      width: 2rem;
      cursor: pointer;
      border: none;
      transition: all 0.15s ease;
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      z-index: 999999;
      font-weight: 700;
      padding: 4px;
    }
    #close-button:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    #tour-guide-main {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    #step-bullets-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.25rem;
      margin-top: auto;
      padding-block: 12px 20px;
    }

    .step-bullet {
      background: #ccc;
      border: none;
      border-radius: 10px;
      padding: 0px;
      height: 6px;
      width: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .step-bullet--active,
    .step-bullet:hover {
      width: 15px;
      background: #999;
    }

    footer {
      border-top: 1px solid silver;
      padding: 12px 8px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }

    #step-back-button,
    #step-next-button {
      display: flex;
      justify-content: center;
      padding: 8px 16px;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: all 0.15s ease;
      border: none;
      font-size: 1rem;
      font-weight: 400;
      font-family: sans-serif;
      color: var(--step-buttons-color);
      background: var(--step-buttons-bg-color);
      border: 1px solid #bdbdbd;
    }

    #step-back-button {
    }
    #step-back-button:hover {
      background: hsl(from var(--step-buttons-bg-color) h s calc(l - 5));
    }

    #step-next-button {
      margin-left: auto;
    }
    #step-next-button:hover {
      background: hsl(from var(--step-buttons-bg-color) h s calc(l - 5));
    }
  `}};return Q([U({type:Boolean,attribute:X.IS_ENABLED})],$.prototype,`isEnabled`,void 0),Q([U({type:Boolean,attribute:X.DISABLE_CLOSE_ON_OUTSIDE_CLICK})],$.prototype,`disableCloseOnOutsideClick`,void 0),Q([U({type:String,attribute:X.STEP_CONTENT_HEIGHT})],$.prototype,`stepContentHeight`,void 0),Q([U({type:String,attribute:X.STEP_CONTENT_WIDTH})],$.prototype,`stepContentWidth`,void 0),Q([U({type:Boolean,attribute:X.HIDE_HEADER})],$.prototype,`hideHeader`,void 0),Q([U({type:Boolean,attribute:X.ALLOW_OUTSIDE_INTERACTION})],$.prototype,`allowOutsideInteraction`,void 0),Q([U({type:String,attribute:X.DONE_LABEL})],$.prototype,`doneLabel`,void 0),Q([U({type:String,attribute:X.OVERLAY_FILL_COLOR})],$.prototype,`overlayFillColor`,void 0),Q([U({type:Boolean,attribute:X.DONT_HIDE_BACK_BUTTON_ON_FIRST_STEP})],$.prototype,`dontHideBackButtonOnFirstStep`,void 0),Q([U({type:Boolean,attribute:X.HIDE_BULLETS})],$.prototype,`hideBullets`,void 0),Q([W()],$.prototype,`_tourGuideActiveStepIndex`,void 0),Q([W()],$.prototype,`_stepHeading`,void 0),Q([De({slot:`step-content`})],$.prototype,`_stepContentElements`,void 0),Q([De({slot:`step-bullet`})],$.prototype,`_stepBulletSlottedElements`,void 0),Q([K(`#${Y}`)],$.prototype,`_rootContainerElem`,void 0),Q([K(`slot[name="${Oe}"]`)],$.prototype,`_closeButtonElem`,void 0),Q([K(`slot[name="${J}"]`)],$.prototype,`_stepNextButtonElem`,void 0),Q([K(`slot[name="${q}"]`)],$.prototype,`_stepBackButtonElem`,void 0),Q([W()],$.prototype,`_overlayElem`,void 0),Q([W()],$.prototype,`_activeStepAnchorElem`,void 0),Q([W()],$.prototype,`_queuedElemForMoveHighlightMask`,void 0),Q([W()],$.prototype,`_isClosing`,void 0),$=Q([we(`simple-tour-guide`)],$),Object.defineProperty(e,"SimpleTourGuide",{enumerable:!0,get:function(){return $}}),e})({});