var ft=Object.defineProperty;var pt=(e,t,i)=>t in e?ft(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var D=(e,t,i)=>(pt(e,typeof t!="symbol"?t+"":t,i),i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function i(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=i(r);fetch(r.href,n)}})();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.17.0
 * @author George Michael Brower
 * @license MIT
 */class O{constructor(t,i,s,r,n="div"){this.parent=t,this.object=i,this.property=s,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(r),this.$name=document.createElement("div"),this.$name.classList.add("name"),O.nextNameID=O.nextNameID||0,this.$name.id=`lil-gui-name-${++O.nextNameID}`,this.$widget=document.createElement(n),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(s)}name(t){return this._name=t,this.$name.innerHTML=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const i=this.parent.add(this.object,this.property,t);return i.name(this._name),this.destroy(),i}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.object[this.property]=t,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class gt extends O{constructor(t,i,s){super(t,i,s,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Y(e){let t,i;return(t=e.match(/(#|0x)?([a-f0-9]{6})/i))?i=t[2]:(t=e.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=e.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),i?"#"+i:!1}const mt={isPrimitive:!0,match:e=>typeof e=="string",fromHexString:Y,toHexString:Y},T={isPrimitive:!0,match:e=>typeof e=="number",fromHexString:e=>parseInt(e.substring(1),16),toHexString:e=>"#"+e.toString(16).padStart(6,0)},bt={isPrimitive:!1,match:Array.isArray,fromHexString(e,t,i=1){const s=T.fromHexString(e);t[0]=(s>>16&255)/255*i,t[1]=(s>>8&255)/255*i,t[2]=(s&255)/255*i},toHexString([e,t,i],s=1){s=255/s;const r=e*s<<16^t*s<<8^i*s<<0;return T.toHexString(r)}},xt={isPrimitive:!1,match:e=>Object(e)===e,fromHexString(e,t,i=1){const s=T.fromHexString(e);t.r=(s>>16&255)/255*i,t.g=(s>>8&255)/255*i,t.b=(s&255)/255*i},toHexString({r:e,g:t,b:i},s=1){s=255/s;const r=e*s<<16^t*s<<8^i*s<<0;return T.toHexString(r)}},At=[mt,T,bt,xt];function yt(e){return At.find(t=>t.match(e))}class wt extends O{constructor(t,i,s,r){super(t,i,s,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=yt(this.initialValue),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const n=Y(this.$text.value);n&&this._setValueFromHexString(n)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const i=this._format.fromHexString(t);this.setValue(i)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class R extends O{constructor(t,i,s){super(t,i,s,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",r=>{r.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class vt extends O{constructor(t,i,s,r,n,l){super(t,i,s,"number"),this._initInput(),this.min(r),this.max(n);const h=l!==void 0;this.step(h?l:this._getImplicitStep(),h),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,i=!0){return this._step=t,this._stepExplicit=i,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let i=(t-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let d=parseFloat(this.$input.value);isNaN(d)||(this._stepExplicit&&(d=this._snap(d)),this.setValue(this._clamp(d)))},i=d=>{const x=parseFloat(this.$input.value);isNaN(x)||(this._snapClampSetValue(x+d),this.$input.value=this.getValue())},s=d=>{d.code==="Enter"&&this.$input.blur(),d.code==="ArrowUp"&&(d.preventDefault(),i(this._step*this._arrowKeyMultiplier(d))),d.code==="ArrowDown"&&(d.preventDefault(),i(this._step*this._arrowKeyMultiplier(d)*-1))},r=d=>{this._inputFocused&&(d.preventDefault(),i(this._step*this._normalizeMouseWheel(d)))};let n=!1,l,h,a,o,c;const f=5,u=d=>{l=d.clientX,h=a=d.clientY,n=!0,o=this.getValue(),c=0,window.addEventListener("mousemove",p),window.addEventListener("mouseup",g)},p=d=>{if(n){const x=d.clientX-l,A=d.clientY-h;Math.abs(A)>f?(d.preventDefault(),this.$input.blur(),n=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(x)>f&&g()}if(!n){const x=d.clientY-a;c-=x*this._step*this._arrowKeyMultiplier(d),o+c>this._max?c=this._max-o:o+c<this._min&&(c=this._min-o),this._snapClampSetValue(o+c)}a=d.clientY},g=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",p),window.removeEventListener("mouseup",g)},b=()=>{this._inputFocused=!0},m=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",s),this.$input.addEventListener("wheel",r,{passive:!1}),this.$input.addEventListener("mousedown",u),this.$input.addEventListener("focus",b),this.$input.addEventListener("blur",m)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=(d,x,A,y,w)=>(d-x)/(A-x)*(w-y)+y,i=d=>{const x=this.$slider.getBoundingClientRect();let A=t(d,x.left,x.right,this._min,this._max);this._snapClampSetValue(A)},s=d=>{this._setDraggingStyle(!0),i(d.clientX),window.addEventListener("mousemove",r),window.addEventListener("mouseup",n)},r=d=>{i(d.clientX)},n=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",n)};let l=!1,h,a;const o=d=>{d.preventDefault(),this._setDraggingStyle(!0),i(d.touches[0].clientX),l=!1},c=d=>{d.touches.length>1||(this._hasScrollBar?(h=d.touches[0].clientX,a=d.touches[0].clientY,l=!0):o(d),window.addEventListener("touchmove",f,{passive:!1}),window.addEventListener("touchend",u))},f=d=>{if(l){const x=d.touches[0].clientX-h,A=d.touches[0].clientY-a;Math.abs(x)>Math.abs(A)?o(d):(window.removeEventListener("touchmove",f),window.removeEventListener("touchend",u))}else d.preventDefault(),i(d.touches[0].clientX)},u=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",f),window.removeEventListener("touchend",u)},p=this._callOnFinishChange.bind(this),g=400;let b;const m=d=>{if(Math.abs(d.deltaX)<Math.abs(d.deltaY)&&this._hasScrollBar)return;d.preventDefault();const A=this._normalizeMouseWheel(d)*this._step;this._snapClampSetValue(this.getValue()+A),this.$input.value=this.getValue(),clearTimeout(b),b=setTimeout(p,g)};this.$slider.addEventListener("mousedown",s),this.$slider.addEventListener("touchstart",c,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(t,i="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle(`lil-gui-${i}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:i,deltaY:s}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(i=0,s=-t.wheelDelta/120,s*=this._stepExplicit?1:10),i+-s}_arrowKeyMultiplier(t){let i=this._stepExplicit?1:10;return t.shiftKey?i*=10:t.altKey&&(i/=10),i}_snap(t){const i=Math.round(t/this._step)*this._step;return parseFloat(i.toPrecision(15))}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Et extends O{constructor(t,i,s,r){super(t,i,s,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(r)?r:Object.values(r),this._names=Array.isArray(r)?r:Object.keys(r),this._names.forEach(n=>{const l=document.createElement("option");l.innerHTML=n,this.$select.appendChild(l)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const t=this.getValue(),i=this._values.indexOf(t);return this.$select.selectedIndex=i,this.$display.innerHTML=i===-1?t:this._names[i],this}}class _t extends O{constructor(t,i,s){super(t,i,s,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",r=>{r.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const Mt=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  background-color: var(--background-color);
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean .widget {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background-color: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background-color: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background-color: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  height: var(--title-height);
  line-height: calc(var(--title-height) - 4px);
  font-weight: 600;
  padding: 0 var(--padding);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  outline: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui input {
  -webkit-tap-highlight-color: transparent;
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input::-webkit-outer-spin-button,
.lil-gui input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.lil-gui input[type=number] {
  -moz-appearance: textfield;
}
.lil-gui input[type=checkbox] {
  appearance: none;
  -webkit-appearance: none;
  height: var(--checkbox-size);
  width: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  -webkit-tap-highlight-color: transparent;
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  border: 1px solid var(--widget-color);
  text-align: center;
  line-height: calc(var(--widget-height) - 4px);
}
@media (hover: hover) {
  .lil-gui button:hover {
    background: var(--hover-color);
    border-color: var(--hover-color);
  }
  .lil-gui button:focus {
    border-color: var(--focus-color);
  }
}
.lil-gui button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function Ct(e){const t=document.createElement("style");t.innerHTML=e;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(t,i):document.head.appendChild(t)}let U=!1;class X{constructor({parent:t,autoPlace:i=t===void 0,container:s,width:r,title:n="Controls",injectStyles:l=!0,touchStyles:h=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",a=>{(a.code==="Enter"||a.code==="Space")&&(a.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(n),h&&this.domElement.classList.add("allow-touch-styles"),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),!U&&l&&(Ct(Mt),U=!0),s?s.appendChild(this.domElement):i&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty("--width",r+"px"),this.domElement.addEventListener("keydown",a=>a.stopPropagation()),this.domElement.addEventListener("keyup",a=>a.stopPropagation())}add(t,i,s,r,n){if(Object(s)===s)return new Et(this,t,i,s);const l=t[i];switch(typeof l){case"number":return new vt(this,t,i,s,r,n);case"boolean":return new gt(this,t,i);case"string":return new _t(this,t,i);case"function":return new R(this,t,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,t,`
	value:`,l)}addColor(t,i,s=1){return new wt(this,t,i,s)}addFolder(t){return new X({parent:this,title:t})}load(t,i=!0){return t.controllers&&this.controllers.forEach(s=>{s instanceof R||s._name in t.controllers&&s.load(t.controllers[s._name])}),i&&t.folders&&this.folders.forEach(s=>{s._title in t.folders&&s.load(t.folders[s._title])}),this}save(t=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(s=>{if(!(s instanceof R)){if(s._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${s._name}"`);i.controllers[s._name]=s.save()}}),t&&this.folders.forEach(s=>{if(s._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${s._title}"`);i.folders[s._title]=s.save()}),i}open(t=!0){return this._closed=!t,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._closed=!t,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("transition");const s=n=>{n.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",s))};this.$children.addEventListener("transitionend",s);const r=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=r+"px"})}),this}title(t){return this._title=t,this.$title.innerHTML=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(s=>s.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(i=>{t=t.concat(i.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(i=>{t=t.concat(i.foldersRecursive())}),t}}function q(e){let t=e[0],i=e[1],s=e[2];return Math.sqrt(t*t+i*i+s*s)}function G(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e}function $t(e,t,i,s){return e[0]=t,e[1]=i,e[2]=s,e}function W(e,t,i){return e[0]=t[0]+i[0],e[1]=t[1]+i[1],e[2]=t[2]+i[2],e}function j(e,t,i){return e[0]=t[0]-i[0],e[1]=t[1]-i[1],e[2]=t[2]-i[2],e}function St(e,t,i){return e[0]=t[0]*i[0],e[1]=t[1]*i[1],e[2]=t[2]*i[2],e}function Ft(e,t,i){return e[0]=t[0]/i[0],e[1]=t[1]/i[1],e[2]=t[2]/i[2],e}function B(e,t,i){return e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e}function Lt(e,t){let i=t[0]-e[0],s=t[1]-e[1],r=t[2]-e[2];return Math.sqrt(i*i+s*s+r*r)}function zt(e,t){let i=t[0]-e[0],s=t[1]-e[1],r=t[2]-e[2];return i*i+s*s+r*r}function Z(e){let t=e[0],i=e[1],s=e[2];return t*t+i*i+s*s}function Ot(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e}function Dt(e,t){return e[0]=1/t[0],e[1]=1/t[1],e[2]=1/t[2],e}function H(e,t){let i=t[0],s=t[1],r=t[2],n=i*i+s*s+r*r;return n>0&&(n=1/Math.sqrt(n)),e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e}function ct(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function K(e,t,i){let s=t[0],r=t[1],n=t[2],l=i[0],h=i[1],a=i[2];return e[0]=r*a-n*h,e[1]=n*l-s*a,e[2]=s*h-r*l,e}function kt(e,t,i,s){let r=t[0],n=t[1],l=t[2];return e[0]=r+s*(i[0]-r),e[1]=n+s*(i[1]-n),e[2]=l+s*(i[2]-l),e}function Tt(e,t,i){let s=t[0],r=t[1],n=t[2],l=i[3]*s+i[7]*r+i[11]*n+i[15];return l=l||1,e[0]=(i[0]*s+i[4]*r+i[8]*n+i[12])/l,e[1]=(i[1]*s+i[5]*r+i[9]*n+i[13])/l,e[2]=(i[2]*s+i[6]*r+i[10]*n+i[14])/l,e}function It(e,t,i){let s=t[0],r=t[1],n=t[2],l=i[3]*s+i[7]*r+i[11]*n+i[15];return l=l||1,e[0]=(i[0]*s+i[4]*r+i[8]*n)/l,e[1]=(i[1]*s+i[5]*r+i[9]*n)/l,e[2]=(i[2]*s+i[6]*r+i[10]*n)/l,e}function Rt(e,t,i){let s=t[0],r=t[1],n=t[2];return e[0]=s*i[0]+r*i[3]+n*i[6],e[1]=s*i[1]+r*i[4]+n*i[7],e[2]=s*i[2]+r*i[5]+n*i[8],e}function Bt(e,t,i){let s=t[0],r=t[1],n=t[2],l=i[0],h=i[1],a=i[2],o=i[3],c=h*n-a*r,f=a*s-l*n,u=l*r-h*s,p=h*u-a*f,g=a*c-l*u,b=l*f-h*c,m=o*2;return c*=m,f*=m,u*=m,p*=2,g*=2,b*=2,e[0]=s+c+p,e[1]=r+f+g,e[2]=n+u+b,e}const Vt=function(){const e=[0,0,0],t=[0,0,0];return function(i,s){G(e,i),G(t,s),H(e,e),H(t,t);let r=ct(e,t);return r>1?0:r<-1?Math.PI:Math.acos(r)}}();function Pt(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]}class z extends Array{constructor(t=0,i=t,s=t){return super(t,i,s),this}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}set x(t){this[0]=t}set y(t){this[1]=t}set z(t){this[2]=t}set(t,i=t,s=t){return t.length?this.copy(t):($t(this,t,i,s),this)}copy(t){return G(this,t),this}add(t,i){return i?W(this,t,i):W(this,this,t),this}sub(t,i){return i?j(this,t,i):j(this,this,t),this}multiply(t){return t.length?St(this,this,t):B(this,this,t),this}divide(t){return t.length?Ft(this,this,t):B(this,this,1/t),this}inverse(t=this){return Dt(this,t),this}len(){return q(this)}distance(t){return t?Lt(this,t):q(this)}squaredLen(){return Z(this)}squaredDistance(t){return t?zt(this,t):Z(this)}negate(t=this){return Ot(this,t),this}cross(t,i){return i?K(this,t,i):K(this,this,t),this}scale(t){return B(this,this,t),this}normalize(){return H(this,this),this}dot(t){return ct(this,t)}equals(t){return Pt(this,t)}applyMatrix3(t){return Rt(this,this,t),this}applyMatrix4(t){return Tt(this,this,t),this}scaleRotateMatrix4(t){return It(this,this,t),this}applyQuaternion(t){return Bt(this,this,t),this}angle(t){return Vt(this,t)}lerp(t,i){return kt(this,this,t,i),this}clone(){return new z(this[0],this[1],this[2])}fromArray(t,i=0){return this[0]=t[i],this[1]=t[i+1],this[2]=t[i+2],this}toArray(t=[],i=0){return t[i]=this[0],t[i+1]=this[1],t[i+2]=this[2],t}transformDirection(t){const i=this[0],s=this[1],r=this[2];return this[0]=t[0]*i+t[4]*s+t[8]*r,this[1]=t[1]*i+t[5]*s+t[9]*r,this[2]=t[2]*i+t[6]*s+t[10]*r,this.normalize()}}const J=new z;let Nt=1,Yt=1,Q=!1;class Gt{constructor(t,i={}){t.canvas||console.error("gl not passed as first argument to Geometry"),this.gl=t,this.attributes=i,this.id=Nt++,this.VAOs={},this.drawRange={start:0,count:0},this.instancedCount=0,this.gl.renderer.bindVertexArray(null),this.gl.renderer.currentGeometry=null,this.glState=this.gl.renderer.state;for(let s in i)this.addAttribute(s,i[s])}addAttribute(t,i){if(this.attributes[t]=i,i.id=Yt++,i.size=i.size||1,i.type=i.type||(i.data.constructor===Float32Array?this.gl.FLOAT:i.data.constructor===Uint16Array?this.gl.UNSIGNED_SHORT:this.gl.UNSIGNED_INT),i.target=t==="index"?this.gl.ELEMENT_ARRAY_BUFFER:this.gl.ARRAY_BUFFER,i.normalized=i.normalized||!1,i.stride=i.stride||0,i.offset=i.offset||0,i.count=i.count||(i.stride?i.data.byteLength/i.stride:i.data.length/i.size),i.divisor=i.instanced||0,i.needsUpdate=!1,i.usage=i.usage||this.gl.STATIC_DRAW,i.buffer||this.updateAttribute(i),i.divisor){if(this.isInstanced=!0,this.instancedCount&&this.instancedCount!==i.count*i.divisor)return console.warn("geometry has multiple instanced buffers of different length"),this.instancedCount=Math.min(this.instancedCount,i.count*i.divisor);this.instancedCount=i.count*i.divisor}else t==="index"?this.drawRange.count=i.count:this.attributes.index||(this.drawRange.count=Math.max(this.drawRange.count,i.count))}updateAttribute(t){const i=!t.buffer;i&&(t.buffer=this.gl.createBuffer()),this.glState.boundBuffer!==t.buffer&&(this.gl.bindBuffer(t.target,t.buffer),this.glState.boundBuffer=t.buffer),i?this.gl.bufferData(t.target,t.data,t.usage):this.gl.bufferSubData(t.target,0,t.data),t.needsUpdate=!1}setIndex(t){this.addAttribute("index",t)}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}setInstancedCount(t){this.instancedCount=t}createVAO(t){this.VAOs[t.attributeOrder]=this.gl.renderer.createVertexArray(),this.gl.renderer.bindVertexArray(this.VAOs[t.attributeOrder]),this.bindAttributes(t)}bindAttributes(t){t.attributeLocations.forEach((i,{name:s,type:r})=>{if(!this.attributes[s]){console.warn(`active attribute ${s} not being supplied`);return}const n=this.attributes[s];this.gl.bindBuffer(n.target,n.buffer),this.glState.boundBuffer=n.buffer;let l=1;r===35674&&(l=2),r===35675&&(l=3),r===35676&&(l=4);const h=n.size/l,a=l===1?0:l*l*l,o=l===1?0:l*l;for(let c=0;c<l;c++)this.gl.vertexAttribPointer(i+c,h,n.type,n.normalized,n.stride+a,n.offset+c*o),this.gl.enableVertexAttribArray(i+c),this.gl.renderer.vertexAttribDivisor(i+c,n.divisor)}),this.attributes.index&&this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.attributes.index.buffer)}draw({program:t,mode:i=this.gl.TRIANGLES}){this.gl.renderer.currentGeometry!==`${this.id}_${t.attributeOrder}`&&(this.VAOs[t.attributeOrder]||this.createVAO(t),this.gl.renderer.bindVertexArray(this.VAOs[t.attributeOrder]),this.gl.renderer.currentGeometry=`${this.id}_${t.attributeOrder}`),t.attributeLocations.forEach((s,{name:r})=>{const n=this.attributes[r];n.needsUpdate&&this.updateAttribute(n)}),this.isInstanced?this.attributes.index?this.gl.renderer.drawElementsInstanced(i,this.drawRange.count,this.attributes.index.type,this.attributes.index.offset+this.drawRange.start*2,this.instancedCount):this.gl.renderer.drawArraysInstanced(i,this.drawRange.start,this.drawRange.count,this.instancedCount):this.attributes.index?this.gl.drawElements(i,this.drawRange.count,this.attributes.index.type,this.attributes.index.offset+this.drawRange.start*2):this.gl.drawArrays(i,this.drawRange.start,this.drawRange.count)}getPosition(){const t=this.attributes.position;if(t.data)return t;if(!Q)return console.warn("No position buffer data found to compute bounds"),Q=!0}computeBoundingBox(t){t||(t=this.getPosition());const i=t.data,s=t.stride?t.stride/i.BYTES_PER_ELEMENT:t.size;this.bounds||(this.bounds={min:new z,max:new z,center:new z,scale:new z,radius:1/0});const r=this.bounds.min,n=this.bounds.max,l=this.bounds.center,h=this.bounds.scale;r.set(1/0),n.set(-1/0);for(let a=0,o=i.length;a<o;a+=s){const c=i[a],f=i[a+1],u=i[a+2];r.x=Math.min(c,r.x),r.y=Math.min(f,r.y),r.z=Math.min(u,r.z),n.x=Math.max(c,n.x),n.y=Math.max(f,n.y),n.z=Math.max(u,n.z)}h.sub(n,r),l.add(r,n).divide(2)}computeBoundingSphere(t){t||(t=this.getPosition());const i=t.data,s=t.stride?t.stride/i.BYTES_PER_ELEMENT:t.size;this.bounds||this.computeBoundingBox(t);let r=0;for(let n=0,l=i.length;n<l;n+=s)J.fromArray(i,n),r=Math.max(r,this.bounds.center.squaredDistance(J));this.bounds.radius=Math.sqrt(r)}remove(){for(let t in this.VAOs)this.gl.renderer.deleteVertexArray(this.VAOs[t]),delete this.VAOs[t];for(let t in this.attributes)this.gl.deleteBuffer(this.attributes[t].buffer),delete this.attributes[t]}}let Ht=1;const tt={};class Xt{constructor(t,{vertex:i,fragment:s,uniforms:r={},transparent:n=!1,cullFace:l=t.BACK,frontFace:h=t.CCW,depthTest:a=!0,depthWrite:o=!0,depthFunc:c=t.LESS}={}){t.canvas||console.error("gl not passed as first argument to Program"),this.gl=t,this.uniforms=r,this.id=Ht++,i||console.warn("vertex shader not supplied"),s||console.warn("fragment shader not supplied"),this.transparent=n,this.cullFace=l,this.frontFace=h,this.depthTest=a,this.depthWrite=o,this.depthFunc=c,this.blendFunc={},this.blendEquation={},this.transparent&&!this.blendFunc.src&&(this.gl.renderer.premultipliedAlpha?this.setBlendFunc(this.gl.ONE,this.gl.ONE_MINUS_SRC_ALPHA):this.setBlendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA));const f=t.createShader(t.VERTEX_SHADER);t.shaderSource(f,i),t.compileShader(f),t.getShaderInfoLog(f)!==""&&console.warn(`${t.getShaderInfoLog(f)}
Vertex Shader
${et(i)}`);const u=t.createShader(t.FRAGMENT_SHADER);if(t.shaderSource(u,s),t.compileShader(u),t.getShaderInfoLog(u)!==""&&console.warn(`${t.getShaderInfoLog(u)}
Fragment Shader
${et(s)}`),this.program=t.createProgram(),t.attachShader(this.program,f),t.attachShader(this.program,u),t.linkProgram(this.program),!t.getProgramParameter(this.program,t.LINK_STATUS))return console.warn(t.getProgramInfoLog(this.program));t.deleteShader(f),t.deleteShader(u),this.uniformLocations=new Map;let p=t.getProgramParameter(this.program,t.ACTIVE_UNIFORMS);for(let m=0;m<p;m++){let d=t.getActiveUniform(this.program,m);this.uniformLocations.set(d,t.getUniformLocation(this.program,d.name));const x=d.name.match(/(\w+)/g);d.uniformName=x[0],x.length===3?(d.isStructArray=!0,d.structIndex=Number(x[1]),d.structProperty=x[2]):x.length===2&&isNaN(Number(x[1]))&&(d.isStruct=!0,d.structProperty=x[1])}this.attributeLocations=new Map;const g=[],b=t.getProgramParameter(this.program,t.ACTIVE_ATTRIBUTES);for(let m=0;m<b;m++){const d=t.getActiveAttrib(this.program,m),x=t.getAttribLocation(this.program,d.name);x!==-1&&(g[x]=d.name,this.attributeLocations.set(d,x))}this.attributeOrder=g.join("")}setBlendFunc(t,i,s,r){this.blendFunc.src=t,this.blendFunc.dst=i,this.blendFunc.srcAlpha=s,this.blendFunc.dstAlpha=r,t&&(this.transparent=!0)}setBlendEquation(t,i){this.blendEquation.modeRGB=t,this.blendEquation.modeAlpha=i}applyState(){this.depthTest?this.gl.renderer.enable(this.gl.DEPTH_TEST):this.gl.renderer.disable(this.gl.DEPTH_TEST),this.cullFace?this.gl.renderer.enable(this.gl.CULL_FACE):this.gl.renderer.disable(this.gl.CULL_FACE),this.blendFunc.src?this.gl.renderer.enable(this.gl.BLEND):this.gl.renderer.disable(this.gl.BLEND),this.cullFace&&this.gl.renderer.setCullFace(this.cullFace),this.gl.renderer.setFrontFace(this.frontFace),this.gl.renderer.setDepthMask(this.depthWrite),this.gl.renderer.setDepthFunc(this.depthFunc),this.blendFunc.src&&this.gl.renderer.setBlendFunc(this.blendFunc.src,this.blendFunc.dst,this.blendFunc.srcAlpha,this.blendFunc.dstAlpha),this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB,this.blendEquation.modeAlpha)}use({flipFaces:t=!1}={}){let i=-1;this.gl.renderer.state.currentProgram===this.id||(this.gl.useProgram(this.program),this.gl.renderer.state.currentProgram=this.id),this.uniformLocations.forEach((r,n)=>{let l=n.uniformName,h=this.uniforms[l];if(n.isStruct&&(h=h[n.structProperty],l+=`.${n.structProperty}`),n.isStructArray&&(h=h[n.structIndex][n.structProperty],l+=`[${n.structIndex}].${n.structProperty}`),!h)return it(`Active uniform ${l} has not been supplied`);if(h&&h.value===void 0)return it(`${l} uniform is missing a value parameter`);if(h.value.texture)return i=i+1,h.value.update(i),V(this.gl,n.type,r,i);if(h.value.length&&h.value[0].texture){const a=[];return h.value.forEach(o=>{i=i+1,o.update(i),a.push(i)}),V(this.gl,n.type,r,a)}V(this.gl,n.type,r,h.value)}),this.applyState(),t&&this.gl.renderer.setFrontFace(this.frontFace===this.gl.CCW?this.gl.CW:this.gl.CCW)}remove(){this.gl.deleteProgram(this.program)}}function V(e,t,i,s){s=s.length?Ut(s):s;const r=e.renderer.state.uniformLocations.get(i);if(s.length)if(r===void 0||r.length!==s.length)e.renderer.state.uniformLocations.set(i,s.slice(0));else{if(qt(r,s))return;r.set?r.set(s):Wt(r,s),e.renderer.state.uniformLocations.set(i,r)}else{if(r===s)return;e.renderer.state.uniformLocations.set(i,s)}switch(t){case 5126:return s.length?e.uniform1fv(i,s):e.uniform1f(i,s);case 35664:return e.uniform2fv(i,s);case 35665:return e.uniform3fv(i,s);case 35666:return e.uniform4fv(i,s);case 35670:case 5124:case 35678:case 35680:return s.length?e.uniform1iv(i,s):e.uniform1i(i,s);case 35671:case 35667:return e.uniform2iv(i,s);case 35672:case 35668:return e.uniform3iv(i,s);case 35673:case 35669:return e.uniform4iv(i,s);case 35674:return e.uniformMatrix2fv(i,!1,s);case 35675:return e.uniformMatrix3fv(i,!1,s);case 35676:return e.uniformMatrix4fv(i,!1,s)}}function et(e){let t=e.split(`
`);for(let i=0;i<t.length;i++)t[i]=i+1+": "+t[i];return t.join(`
`)}function Ut(e){const t=e.length,i=e[0].length;if(i===void 0)return e;const s=t*i;let r=tt[s];r||(tt[s]=r=new Float32Array(s));for(let n=0;n<t;n++)r.set(e[n],n*i);return r}function qt(e,t){if(e.length!==t.length)return!1;for(let i=0,s=e.length;i<s;i++)if(e[i]!==t[i])return!1;return!0}function Wt(e,t){for(let i=0,s=e.length;i<s;i++)e[i]=t[i]}let P=0;function it(e){P>100||(console.warn(e),P++,P>100&&console.warn("More than 100 program warnings - stopping logs."))}const N=new z;let jt=1;class Zt{constructor({canvas:t=document.createElement("canvas"),width:i=300,height:s=150,dpr:r=1,alpha:n=!1,depth:l=!0,stencil:h=!1,antialias:a=!1,premultipliedAlpha:o=!1,preserveDrawingBuffer:c=!1,powerPreference:f="default",autoClear:u=!0,webgl:p=2}={}){const g={alpha:n,depth:l,stencil:h,antialias:a,premultipliedAlpha:o,preserveDrawingBuffer:c,powerPreference:f};this.dpr=r,this.alpha=n,this.color=!0,this.depth=l,this.stencil=h,this.premultipliedAlpha=o,this.autoClear=u,this.id=jt++,p===2&&(this.gl=t.getContext("webgl2",g)),this.isWebgl2=!!this.gl,this.gl||(this.gl=t.getContext("webgl",g)),this.gl||console.error("unable to create webgl context"),this.gl.renderer=this,this.setSize(i,s),this.state={},this.state.blendFunc={src:this.gl.ONE,dst:this.gl.ZERO},this.state.blendEquation={modeRGB:this.gl.FUNC_ADD},this.state.cullFace=null,this.state.frontFace=this.gl.CCW,this.state.depthMask=!0,this.state.depthFunc=this.gl.LESS,this.state.premultiplyAlpha=!1,this.state.flipY=!1,this.state.unpackAlignment=4,this.state.framebuffer=null,this.state.viewport={x:0,y:0,width:null,height:null},this.state.textureUnits=[],this.state.activeTextureUnit=0,this.state.boundBuffer=null,this.state.uniformLocations=new Map,this.state.currentProgram=null,this.extensions={},this.isWebgl2?(this.getExtension("EXT_color_buffer_float"),this.getExtension("OES_texture_float_linear")):(this.getExtension("OES_texture_float"),this.getExtension("OES_texture_float_linear"),this.getExtension("OES_texture_half_float"),this.getExtension("OES_texture_half_float_linear"),this.getExtension("OES_element_index_uint"),this.getExtension("OES_standard_derivatives"),this.getExtension("EXT_sRGB"),this.getExtension("WEBGL_depth_texture"),this.getExtension("WEBGL_draw_buffers")),this.getExtension("WEBGL_compressed_texture_astc"),this.getExtension("EXT_texture_compression_bptc"),this.getExtension("WEBGL_compressed_texture_s3tc"),this.getExtension("WEBGL_compressed_texture_etc1"),this.getExtension("WEBGL_compressed_texture_pvrtc"),this.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),this.vertexAttribDivisor=this.getExtension("ANGLE_instanced_arrays","vertexAttribDivisor","vertexAttribDivisorANGLE"),this.drawArraysInstanced=this.getExtension("ANGLE_instanced_arrays","drawArraysInstanced","drawArraysInstancedANGLE"),this.drawElementsInstanced=this.getExtension("ANGLE_instanced_arrays","drawElementsInstanced","drawElementsInstancedANGLE"),this.createVertexArray=this.getExtension("OES_vertex_array_object","createVertexArray","createVertexArrayOES"),this.bindVertexArray=this.getExtension("OES_vertex_array_object","bindVertexArray","bindVertexArrayOES"),this.deleteVertexArray=this.getExtension("OES_vertex_array_object","deleteVertexArray","deleteVertexArrayOES"),this.drawBuffers=this.getExtension("WEBGL_draw_buffers","drawBuffers","drawBuffersWEBGL"),this.parameters={},this.parameters.maxTextureUnits=this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),this.parameters.maxAnisotropy=this.getExtension("EXT_texture_filter_anisotropic")?this.gl.getParameter(this.getExtension("EXT_texture_filter_anisotropic").MAX_TEXTURE_MAX_ANISOTROPY_EXT):0}setSize(t,i){this.width=t,this.height=i,this.gl.canvas.width=t*this.dpr,this.gl.canvas.height=i*this.dpr,Object.assign(this.gl.canvas.style,{width:t+"px",height:i+"px"})}setViewport(t,i,s=0,r=0){this.state.viewport.width===t&&this.state.viewport.height===i||(this.state.viewport.width=t,this.state.viewport.height=i,this.state.viewport.x=s,this.state.viewport.y=r,this.gl.viewport(s,r,t,i))}setScissor(t,i,s=0,r=0){this.gl.scissor(s,r,t,i)}enable(t){this.state[t]!==!0&&(this.gl.enable(t),this.state[t]=!0)}disable(t){this.state[t]!==!1&&(this.gl.disable(t),this.state[t]=!1)}setBlendFunc(t,i,s,r){this.state.blendFunc.src===t&&this.state.blendFunc.dst===i&&this.state.blendFunc.srcAlpha===s&&this.state.blendFunc.dstAlpha===r||(this.state.blendFunc.src=t,this.state.blendFunc.dst=i,this.state.blendFunc.srcAlpha=s,this.state.blendFunc.dstAlpha=r,s!==void 0?this.gl.blendFuncSeparate(t,i,s,r):this.gl.blendFunc(t,i))}setBlendEquation(t,i){t=t||this.gl.FUNC_ADD,!(this.state.blendEquation.modeRGB===t&&this.state.blendEquation.modeAlpha===i)&&(this.state.blendEquation.modeRGB=t,this.state.blendEquation.modeAlpha=i,i!==void 0?this.gl.blendEquationSeparate(t,i):this.gl.blendEquation(t))}setCullFace(t){this.state.cullFace!==t&&(this.state.cullFace=t,this.gl.cullFace(t))}setFrontFace(t){this.state.frontFace!==t&&(this.state.frontFace=t,this.gl.frontFace(t))}setDepthMask(t){this.state.depthMask!==t&&(this.state.depthMask=t,this.gl.depthMask(t))}setDepthFunc(t){this.state.depthFunc!==t&&(this.state.depthFunc=t,this.gl.depthFunc(t))}activeTexture(t){this.state.activeTextureUnit!==t&&(this.state.activeTextureUnit=t,this.gl.activeTexture(this.gl.TEXTURE0+t))}bindFramebuffer({target:t=this.gl.FRAMEBUFFER,buffer:i=null}={}){this.state.framebuffer!==i&&(this.state.framebuffer=i,this.gl.bindFramebuffer(t,i))}getExtension(t,i,s){return i&&this.gl[i]?this.gl[i].bind(this.gl):(this.extensions[t]||(this.extensions[t]=this.gl.getExtension(t)),i?this.extensions[t]?this.extensions[t][s].bind(this.extensions[t]):null:this.extensions[t])}sortOpaque(t,i){return t.renderOrder!==i.renderOrder?t.renderOrder-i.renderOrder:t.program.id!==i.program.id?t.program.id-i.program.id:t.zDepth!==i.zDepth?t.zDepth-i.zDepth:i.id-t.id}sortTransparent(t,i){return t.renderOrder!==i.renderOrder?t.renderOrder-i.renderOrder:t.zDepth!==i.zDepth?i.zDepth-t.zDepth:i.id-t.id}sortUI(t,i){return t.renderOrder!==i.renderOrder?t.renderOrder-i.renderOrder:t.program.id!==i.program.id?t.program.id-i.program.id:i.id-t.id}getRenderList({scene:t,camera:i,frustumCull:s,sort:r}){let n=[];if(i&&s&&i.updateFrustum(),t.traverse(l=>{if(!l.visible)return!0;l.draw&&(s&&l.frustumCulled&&i&&!i.frustumIntersectsMesh(l)||n.push(l))}),r){const l=[],h=[],a=[];n.forEach(o=>{o.program.transparent?o.program.depthTest?h.push(o):a.push(o):l.push(o),o.zDepth=0,!(o.renderOrder!==0||!o.program.depthTest||!i)&&(o.worldMatrix.getTranslation(N),N.applyMatrix4(i.projectionViewMatrix),o.zDepth=N.z)}),l.sort(this.sortOpaque),h.sort(this.sortTransparent),a.sort(this.sortUI),n=l.concat(h,a)}return n}render({scene:t,camera:i,target:s=null,update:r=!0,sort:n=!0,frustumCull:l=!0,clear:h}){s===null?(this.bindFramebuffer(),this.setViewport(this.width*this.dpr,this.height*this.dpr)):(this.bindFramebuffer(s),this.setViewport(s.width,s.height)),(h||this.autoClear&&h!==!1)&&(this.depth&&(!s||s.depth)&&(this.enable(this.gl.DEPTH_TEST),this.setDepthMask(!0)),this.gl.clear((this.color?this.gl.COLOR_BUFFER_BIT:0)|(this.depth?this.gl.DEPTH_BUFFER_BIT:0)|(this.stencil?this.gl.STENCIL_BUFFER_BIT:0))),r&&t.updateMatrixWorld(),i&&i.updateMatrixWorld(),this.getRenderList({scene:t,camera:i,frustumCull:l,sort:n}).forEach(o=>{o.draw({camera:i})})}}function Kt(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e}function Jt(e,t,i,s,r){return e[0]=t,e[1]=i,e[2]=s,e[3]=r,e}function Qt(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],l=i*i+s*s+r*r+n*n;return l>0&&(l=1/Math.sqrt(l)),e[0]=i*l,e[1]=s*l,e[2]=r*l,e[3]=n*l,e}function te(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3]}function ee(e){return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e}function ie(e,t,i){i=i*.5;let s=Math.sin(i);return e[0]=s*t[0],e[1]=s*t[1],e[2]=s*t[2],e[3]=Math.cos(i),e}function st(e,t,i){let s=t[0],r=t[1],n=t[2],l=t[3],h=i[0],a=i[1],o=i[2],c=i[3];return e[0]=s*c+l*h+r*o-n*a,e[1]=r*c+l*a+n*h-s*o,e[2]=n*c+l*o+s*a-r*h,e[3]=l*c-s*h-r*a-n*o,e}function se(e,t,i){i*=.5;let s=t[0],r=t[1],n=t[2],l=t[3],h=Math.sin(i),a=Math.cos(i);return e[0]=s*a+l*h,e[1]=r*a+n*h,e[2]=n*a-r*h,e[3]=l*a-s*h,e}function re(e,t,i){i*=.5;let s=t[0],r=t[1],n=t[2],l=t[3],h=Math.sin(i),a=Math.cos(i);return e[0]=s*a-n*h,e[1]=r*a+l*h,e[2]=n*a+s*h,e[3]=l*a-r*h,e}function ne(e,t,i){i*=.5;let s=t[0],r=t[1],n=t[2],l=t[3],h=Math.sin(i),a=Math.cos(i);return e[0]=s*a+r*h,e[1]=r*a-s*h,e[2]=n*a+l*h,e[3]=l*a-n*h,e}function le(e,t,i,s){let r=t[0],n=t[1],l=t[2],h=t[3],a=i[0],o=i[1],c=i[2],f=i[3],u,p,g,b,m;return p=r*a+n*o+l*c+h*f,p<0&&(p=-p,a=-a,o=-o,c=-c,f=-f),1-p>1e-6?(u=Math.acos(p),g=Math.sin(u),b=Math.sin((1-s)*u)/g,m=Math.sin(s*u)/g):(b=1-s,m=s),e[0]=b*r+m*a,e[1]=b*n+m*o,e[2]=b*l+m*c,e[3]=b*h+m*f,e}function he(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],l=i*i+s*s+r*r+n*n,h=l?1/l:0;return e[0]=-i*h,e[1]=-s*h,e[2]=-r*h,e[3]=n*h,e}function ae(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=t[3],e}function oe(e,t){let i=t[0]+t[4]+t[8],s;if(i>0)s=Math.sqrt(i+1),e[3]=.5*s,s=.5/s,e[0]=(t[5]-t[7])*s,e[1]=(t[6]-t[2])*s,e[2]=(t[1]-t[3])*s;else{let r=0;t[4]>t[0]&&(r=1),t[8]>t[r*3+r]&&(r=2);let n=(r+1)%3,l=(r+2)%3;s=Math.sqrt(t[r*3+r]-t[n*3+n]-t[l*3+l]+1),e[r]=.5*s,s=.5/s,e[3]=(t[n*3+l]-t[l*3+n])*s,e[n]=(t[n*3+r]+t[r*3+n])*s,e[l]=(t[l*3+r]+t[r*3+l])*s}return e}function de(e,t,i="YXZ"){let s=Math.sin(t[0]*.5),r=Math.cos(t[0]*.5),n=Math.sin(t[1]*.5),l=Math.cos(t[1]*.5),h=Math.sin(t[2]*.5),a=Math.cos(t[2]*.5);return i==="XYZ"?(e[0]=s*l*a+r*n*h,e[1]=r*n*a-s*l*h,e[2]=r*l*h+s*n*a,e[3]=r*l*a-s*n*h):i==="YXZ"?(e[0]=s*l*a+r*n*h,e[1]=r*n*a-s*l*h,e[2]=r*l*h-s*n*a,e[3]=r*l*a+s*n*h):i==="ZXY"?(e[0]=s*l*a-r*n*h,e[1]=r*n*a+s*l*h,e[2]=r*l*h+s*n*a,e[3]=r*l*a-s*n*h):i==="ZYX"?(e[0]=s*l*a-r*n*h,e[1]=r*n*a+s*l*h,e[2]=r*l*h-s*n*a,e[3]=r*l*a+s*n*h):i==="YZX"?(e[0]=s*l*a+r*n*h,e[1]=r*n*a+s*l*h,e[2]=r*l*h-s*n*a,e[3]=r*l*a-s*n*h):i==="XZY"&&(e[0]=s*l*a-r*n*h,e[1]=r*n*a-s*l*h,e[2]=r*l*h+s*n*a,e[3]=r*l*a+s*n*h),e}const ce=Kt,ue=Jt,fe=te,pe=Qt;class ge extends Array{constructor(t=0,i=0,s=0,r=1){return super(t,i,s,r),this.onChange=()=>{},this}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}get w(){return this[3]}set x(t){this[0]=t,this.onChange()}set y(t){this[1]=t,this.onChange()}set z(t){this[2]=t,this.onChange()}set w(t){this[3]=t,this.onChange()}identity(){return ee(this),this.onChange(),this}set(t,i,s,r){return t.length?this.copy(t):(ue(this,t,i,s,r),this.onChange(),this)}rotateX(t){return se(this,this,t),this.onChange(),this}rotateY(t){return re(this,this,t),this.onChange(),this}rotateZ(t){return ne(this,this,t),this.onChange(),this}inverse(t=this){return he(this,t),this.onChange(),this}conjugate(t=this){return ae(this,t),this.onChange(),this}copy(t){return ce(this,t),this.onChange(),this}normalize(t=this){return pe(this,t),this.onChange(),this}multiply(t,i){return i?st(this,t,i):st(this,this,t),this.onChange(),this}dot(t){return fe(this,t)}fromMatrix3(t){return oe(this,t),this.onChange(),this}fromEuler(t){return de(this,t,t.order),this}fromAxisAngle(t,i){return ie(this,t,i),this.onChange(),this}slerp(t,i){return le(this,this,t,i),this.onChange(),this}fromArray(t,i=0){return this[0]=t[i],this[1]=t[i+1],this[2]=t[i+2],this[3]=t[i+3],this.onChange(),this}toArray(t=[],i=0){return t[i]=this[0],t[i+1]=this[1],t[i+2]=this[2],t[i+3]=this[3],t}}const me=1e-6;function be(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function xe(e,t,i,s,r,n,l,h,a,o,c,f,u,p,g,b,m){return e[0]=t,e[1]=i,e[2]=s,e[3]=r,e[4]=n,e[5]=l,e[6]=h,e[7]=a,e[8]=o,e[9]=c,e[10]=f,e[11]=u,e[12]=p,e[13]=g,e[14]=b,e[15]=m,e}function Ae(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function ye(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],l=t[4],h=t[5],a=t[6],o=t[7],c=t[8],f=t[9],u=t[10],p=t[11],g=t[12],b=t[13],m=t[14],d=t[15],x=i*h-s*l,A=i*a-r*l,y=i*o-n*l,w=s*a-r*h,v=s*o-n*h,C=r*o-n*a,$=c*b-f*g,S=c*m-u*g,_=c*d-p*g,F=f*m-u*b,M=f*d-p*b,L=u*d-p*m,E=x*L-A*M+y*F+w*_-v*S+C*$;return E?(E=1/E,e[0]=(h*L-a*M+o*F)*E,e[1]=(r*M-s*L-n*F)*E,e[2]=(b*C-m*v+d*w)*E,e[3]=(u*v-f*C-p*w)*E,e[4]=(a*_-l*L-o*S)*E,e[5]=(i*L-r*_+n*S)*E,e[6]=(m*y-g*C-d*A)*E,e[7]=(c*C-u*y+p*A)*E,e[8]=(l*M-h*_+o*$)*E,e[9]=(s*_-i*M-n*$)*E,e[10]=(g*v-b*y+d*x)*E,e[11]=(f*y-c*v-p*x)*E,e[12]=(h*S-l*F-a*$)*E,e[13]=(i*F-s*S+r*$)*E,e[14]=(b*A-g*w-m*x)*E,e[15]=(c*w-f*A+u*x)*E,e):null}function we(e){let t=e[0],i=e[1],s=e[2],r=e[3],n=e[4],l=e[5],h=e[6],a=e[7],o=e[8],c=e[9],f=e[10],u=e[11],p=e[12],g=e[13],b=e[14],m=e[15],d=t*l-i*n,x=t*h-s*n,A=t*a-r*n,y=i*h-s*l,w=i*a-r*l,v=s*a-r*h,C=o*g-c*p,$=o*b-f*p,S=o*m-u*p,_=c*b-f*g,F=c*m-u*g,M=f*m-u*b;return d*M-x*F+A*_+y*S-w*$+v*C}function rt(e,t,i){let s=t[0],r=t[1],n=t[2],l=t[3],h=t[4],a=t[5],o=t[6],c=t[7],f=t[8],u=t[9],p=t[10],g=t[11],b=t[12],m=t[13],d=t[14],x=t[15],A=i[0],y=i[1],w=i[2],v=i[3];return e[0]=A*s+y*h+w*f+v*b,e[1]=A*r+y*a+w*u+v*m,e[2]=A*n+y*o+w*p+v*d,e[3]=A*l+y*c+w*g+v*x,A=i[4],y=i[5],w=i[6],v=i[7],e[4]=A*s+y*h+w*f+v*b,e[5]=A*r+y*a+w*u+v*m,e[6]=A*n+y*o+w*p+v*d,e[7]=A*l+y*c+w*g+v*x,A=i[8],y=i[9],w=i[10],v=i[11],e[8]=A*s+y*h+w*f+v*b,e[9]=A*r+y*a+w*u+v*m,e[10]=A*n+y*o+w*p+v*d,e[11]=A*l+y*c+w*g+v*x,A=i[12],y=i[13],w=i[14],v=i[15],e[12]=A*s+y*h+w*f+v*b,e[13]=A*r+y*a+w*u+v*m,e[14]=A*n+y*o+w*p+v*d,e[15]=A*l+y*c+w*g+v*x,e}function ve(e,t,i){let s=i[0],r=i[1],n=i[2],l,h,a,o,c,f,u,p,g,b,m,d;return t===e?(e[12]=t[0]*s+t[4]*r+t[8]*n+t[12],e[13]=t[1]*s+t[5]*r+t[9]*n+t[13],e[14]=t[2]*s+t[6]*r+t[10]*n+t[14],e[15]=t[3]*s+t[7]*r+t[11]*n+t[15]):(l=t[0],h=t[1],a=t[2],o=t[3],c=t[4],f=t[5],u=t[6],p=t[7],g=t[8],b=t[9],m=t[10],d=t[11],e[0]=l,e[1]=h,e[2]=a,e[3]=o,e[4]=c,e[5]=f,e[6]=u,e[7]=p,e[8]=g,e[9]=b,e[10]=m,e[11]=d,e[12]=l*s+c*r+g*n+t[12],e[13]=h*s+f*r+b*n+t[13],e[14]=a*s+u*r+m*n+t[14],e[15]=o*s+p*r+d*n+t[15]),e}function Ee(e,t,i){let s=i[0],r=i[1],n=i[2];return e[0]=t[0]*s,e[1]=t[1]*s,e[2]=t[2]*s,e[3]=t[3]*s,e[4]=t[4]*r,e[5]=t[5]*r,e[6]=t[6]*r,e[7]=t[7]*r,e[8]=t[8]*n,e[9]=t[9]*n,e[10]=t[10]*n,e[11]=t[11]*n,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function _e(e,t,i,s){let r=s[0],n=s[1],l=s[2],h=Math.hypot(r,n,l),a,o,c,f,u,p,g,b,m,d,x,A,y,w,v,C,$,S,_,F,M,L,E,k;return Math.abs(h)<me?null:(h=1/h,r*=h,n*=h,l*=h,a=Math.sin(i),o=Math.cos(i),c=1-o,f=t[0],u=t[1],p=t[2],g=t[3],b=t[4],m=t[5],d=t[6],x=t[7],A=t[8],y=t[9],w=t[10],v=t[11],C=r*r*c+o,$=n*r*c+l*a,S=l*r*c-n*a,_=r*n*c-l*a,F=n*n*c+o,M=l*n*c+r*a,L=r*l*c+n*a,E=n*l*c-r*a,k=l*l*c+o,e[0]=f*C+b*$+A*S,e[1]=u*C+m*$+y*S,e[2]=p*C+d*$+w*S,e[3]=g*C+x*$+v*S,e[4]=f*_+b*F+A*M,e[5]=u*_+m*F+y*M,e[6]=p*_+d*F+w*M,e[7]=g*_+x*F+v*M,e[8]=f*L+b*E+A*k,e[9]=u*L+m*E+y*k,e[10]=p*L+d*E+w*k,e[11]=g*L+x*E+v*k,t!==e&&(e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e)}function Me(e,t){return e[0]=t[12],e[1]=t[13],e[2]=t[14],e}function ut(e,t){let i=t[0],s=t[1],r=t[2],n=t[4],l=t[5],h=t[6],a=t[8],o=t[9],c=t[10];return e[0]=Math.hypot(i,s,r),e[1]=Math.hypot(n,l,h),e[2]=Math.hypot(a,o,c),e}function Ce(e){let t=e[0],i=e[1],s=e[2],r=e[4],n=e[5],l=e[6],h=e[8],a=e[9],o=e[10];const c=t*t+i*i+s*s,f=r*r+n*n+l*l,u=h*h+a*a+o*o;return Math.sqrt(Math.max(c,f,u))}const $e=function(){const e=[0,0,0];return function(t,i){let s=e;ut(s,i);let r=1/s[0],n=1/s[1],l=1/s[2],h=i[0]*r,a=i[1]*n,o=i[2]*l,c=i[4]*r,f=i[5]*n,u=i[6]*l,p=i[8]*r,g=i[9]*n,b=i[10]*l,m=h+f+b,d=0;return m>0?(d=Math.sqrt(m+1)*2,t[3]=.25*d,t[0]=(u-g)/d,t[1]=(p-o)/d,t[2]=(a-c)/d):h>f&&h>b?(d=Math.sqrt(1+h-f-b)*2,t[3]=(u-g)/d,t[0]=.25*d,t[1]=(a+c)/d,t[2]=(p+o)/d):f>b?(d=Math.sqrt(1+f-h-b)*2,t[3]=(p-o)/d,t[0]=(a+c)/d,t[1]=.25*d,t[2]=(u+g)/d):(d=Math.sqrt(1+b-h-f)*2,t[3]=(a-c)/d,t[0]=(p+o)/d,t[1]=(u+g)/d,t[2]=.25*d),t}}();function Se(e,t,i,s){let r=t[0],n=t[1],l=t[2],h=t[3],a=r+r,o=n+n,c=l+l,f=r*a,u=r*o,p=r*c,g=n*o,b=n*c,m=l*c,d=h*a,x=h*o,A=h*c,y=s[0],w=s[1],v=s[2];return e[0]=(1-(g+m))*y,e[1]=(u+A)*y,e[2]=(p-x)*y,e[3]=0,e[4]=(u-A)*w,e[5]=(1-(f+m))*w,e[6]=(b+d)*w,e[7]=0,e[8]=(p+x)*v,e[9]=(b-d)*v,e[10]=(1-(f+g))*v,e[11]=0,e[12]=i[0],e[13]=i[1],e[14]=i[2],e[15]=1,e}function Fe(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],l=i+i,h=s+s,a=r+r,o=i*l,c=s*l,f=s*h,u=r*l,p=r*h,g=r*a,b=n*l,m=n*h,d=n*a;return e[0]=1-f-g,e[1]=c+d,e[2]=u-m,e[3]=0,e[4]=c-d,e[5]=1-o-g,e[6]=p+b,e[7]=0,e[8]=u+m,e[9]=p-b,e[10]=1-o-f,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function Le(e,t,i,s,r){let n=1/Math.tan(t/2),l=1/(s-r);return e[0]=n/i,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=n,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=(r+s)*l,e[11]=-1,e[12]=0,e[13]=0,e[14]=2*r*s*l,e[15]=0,e}function ze(e,t,i,s,r,n,l){let h=1/(t-i),a=1/(s-r),o=1/(n-l);return e[0]=-2*h,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=-2*a,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=2*o,e[11]=0,e[12]=(t+i)*h,e[13]=(r+s)*a,e[14]=(l+n)*o,e[15]=1,e}function Oe(e,t,i,s){let r=t[0],n=t[1],l=t[2],h=s[0],a=s[1],o=s[2],c=r-i[0],f=n-i[1],u=l-i[2],p=c*c+f*f+u*u;p===0?u=1:(p=1/Math.sqrt(p),c*=p,f*=p,u*=p);let g=a*u-o*f,b=o*c-h*u,m=h*f-a*c;return p=g*g+b*b+m*m,p===0&&(o?h+=1e-6:a?o+=1e-6:a+=1e-6,g=a*u-o*f,b=o*c-h*u,m=h*f-a*c,p=g*g+b*b+m*m),p=1/Math.sqrt(p),g*=p,b*=p,m*=p,e[0]=g,e[1]=b,e[2]=m,e[3]=0,e[4]=f*m-u*b,e[5]=u*g-c*m,e[6]=c*b-f*g,e[7]=0,e[8]=c,e[9]=f,e[10]=u,e[11]=0,e[12]=r,e[13]=n,e[14]=l,e[15]=1,e}class I extends Array{constructor(t=1,i=0,s=0,r=0,n=0,l=1,h=0,a=0,o=0,c=0,f=1,u=0,p=0,g=0,b=0,m=1){return super(t,i,s,r,n,l,h,a,o,c,f,u,p,g,b,m),this}get x(){return this[12]}get y(){return this[13]}get z(){return this[14]}get w(){return this[15]}set x(t){this[12]=t}set y(t){this[13]=t}set z(t){this[14]=t}set w(t){this[15]=t}set(t,i,s,r,n,l,h,a,o,c,f,u,p,g,b,m){return t.length?this.copy(t):(xe(this,t,i,s,r,n,l,h,a,o,c,f,u,p,g,b,m),this)}translate(t,i=this){return ve(this,i,t),this}rotate(t,i,s=this){return _e(this,s,t,i),this}scale(t,i=this){return Ee(this,i,typeof t=="number"?[t,t,t]:t),this}multiply(t,i){return i?rt(this,t,i):rt(this,this,t),this}identity(){return Ae(this),this}copy(t){return be(this,t),this}fromPerspective({fov:t,aspect:i,near:s,far:r}={}){return Le(this,t,i,s,r),this}fromOrthogonal({left:t,right:i,bottom:s,top:r,near:n,far:l}){return ze(this,t,i,s,r,n,l),this}fromQuaternion(t){return Fe(this,t),this}setPosition(t){return this.x=t[0],this.y=t[1],this.z=t[2],this}inverse(t=this){return ye(this,t),this}compose(t,i,s){return Se(this,t,i,s),this}getRotation(t){return $e(t,this),this}getTranslation(t){return Me(t,this),this}getScaling(t){return ut(t,this),this}getMaxScaleOnAxis(){return Ce(this)}lookAt(t,i,s){return Oe(this,t,i,s),this}determinant(){return we(this)}fromArray(t,i=0){return this[0]=t[i],this[1]=t[i+1],this[2]=t[i+2],this[3]=t[i+3],this[4]=t[i+4],this[5]=t[i+5],this[6]=t[i+6],this[7]=t[i+7],this[8]=t[i+8],this[9]=t[i+9],this[10]=t[i+10],this[11]=t[i+11],this[12]=t[i+12],this[13]=t[i+13],this[14]=t[i+14],this[15]=t[i+15],this}toArray(t=[],i=0){return t[i]=this[0],t[i+1]=this[1],t[i+2]=this[2],t[i+3]=this[3],t[i+4]=this[4],t[i+5]=this[5],t[i+6]=this[6],t[i+7]=this[7],t[i+8]=this[8],t[i+9]=this[9],t[i+10]=this[10],t[i+11]=this[11],t[i+12]=this[12],t[i+13]=this[13],t[i+14]=this[14],t[i+15]=this[15],t}}function De(e,t,i="YXZ"){return i==="XYZ"?(e[1]=Math.asin(Math.min(Math.max(t[8],-1),1)),Math.abs(t[8])<.99999?(e[0]=Math.atan2(-t[9],t[10]),e[2]=Math.atan2(-t[4],t[0])):(e[0]=Math.atan2(t[6],t[5]),e[2]=0)):i==="YXZ"?(e[0]=Math.asin(-Math.min(Math.max(t[9],-1),1)),Math.abs(t[9])<.99999?(e[1]=Math.atan2(t[8],t[10]),e[2]=Math.atan2(t[1],t[5])):(e[1]=Math.atan2(-t[2],t[0]),e[2]=0)):i==="ZXY"?(e[0]=Math.asin(Math.min(Math.max(t[6],-1),1)),Math.abs(t[6])<.99999?(e[1]=Math.atan2(-t[2],t[10]),e[2]=Math.atan2(-t[4],t[5])):(e[1]=0,e[2]=Math.atan2(t[1],t[0]))):i==="ZYX"?(e[1]=Math.asin(-Math.min(Math.max(t[2],-1),1)),Math.abs(t[2])<.99999?(e[0]=Math.atan2(t[6],t[10]),e[2]=Math.atan2(t[1],t[0])):(e[0]=0,e[2]=Math.atan2(-t[4],t[5]))):i==="YZX"?(e[2]=Math.asin(Math.min(Math.max(t[1],-1),1)),Math.abs(t[1])<.99999?(e[0]=Math.atan2(-t[9],t[5]),e[1]=Math.atan2(-t[2],t[0])):(e[0]=0,e[1]=Math.atan2(t[8],t[10]))):i==="XZY"&&(e[2]=Math.asin(-Math.min(Math.max(t[4],-1),1)),Math.abs(t[4])<.99999?(e[0]=Math.atan2(t[6],t[5]),e[1]=Math.atan2(t[8],t[0])):(e[0]=Math.atan2(-t[9],t[10]),e[1]=0)),e}const nt=new I;class ke extends Array{constructor(t=0,i=t,s=t,r="YXZ"){return super(t,i,s),this.order=r,this.onChange=()=>{},this}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}set x(t){this[0]=t,this.onChange()}set y(t){this[1]=t,this.onChange()}set z(t){this[2]=t,this.onChange()}set(t,i=t,s=t){return t.length?this.copy(t):(this[0]=t,this[1]=i,this[2]=s,this.onChange(),this)}copy(t){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this.onChange(),this}reorder(t){return this.order=t,this.onChange(),this}fromRotationMatrix(t,i=this.order){return De(this,t,i),this.onChange(),this}fromQuaternion(t,i=this.order){return nt.fromQuaternion(t),this.fromRotationMatrix(nt,i)}toArray(t=[],i=0){return t[i]=this[0],t[i+1]=this[1],t[i+2]=this[2],t}}class Te{constructor(){this.parent=null,this.children=[],this.visible=!0,this.matrix=new I,this.worldMatrix=new I,this.matrixAutoUpdate=!0,this.position=new z,this.quaternion=new ge,this.scale=new z(1),this.rotation=new ke,this.up=new z(0,1,0),this.rotation.onChange=()=>this.quaternion.fromEuler(this.rotation),this.quaternion.onChange=()=>this.rotation.fromQuaternion(this.quaternion)}setParent(t,i=!0){this.parent&&t!==this.parent&&this.parent.removeChild(this,!1),this.parent=t,i&&t&&t.addChild(this,!1)}addChild(t,i=!0){~this.children.indexOf(t)||this.children.push(t),i&&t.setParent(this,!1)}removeChild(t,i=!0){~this.children.indexOf(t)&&this.children.splice(this.children.indexOf(t),1),i&&t.setParent(null,!1)}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.worldMatrixNeedsUpdate||t)&&(this.parent===null?this.worldMatrix.copy(this.matrix):this.worldMatrix.multiply(this.parent.worldMatrix,this.matrix),this.worldMatrixNeedsUpdate=!1,t=!0);for(let i=0,s=this.children.length;i<s;i++)this.children[i].updateMatrixWorld(t)}updateMatrix(){this.matrix.compose(this.quaternion,this.position,this.scale),this.worldMatrixNeedsUpdate=!0}traverse(t){if(!t(this))for(let i=0,s=this.children.length;i<s;i++)this.children[i].traverse(t)}decompose(){this.matrix.getTranslation(this.position),this.matrix.getRotation(this.quaternion),this.matrix.getScaling(this.scale),this.rotation.fromQuaternion(this.quaternion)}lookAt(t,i=!1){i?this.matrix.lookAt(this.position,t,this.up):this.matrix.lookAt(t,this.position,this.up),this.matrix.getRotation(this.quaternion),this.rotation.fromQuaternion(this.quaternion)}}function Ie(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[4],e[4]=t[5],e[5]=t[6],e[6]=t[8],e[7]=t[9],e[8]=t[10],e}function Re(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],l=i+i,h=s+s,a=r+r,o=i*l,c=s*l,f=s*h,u=r*l,p=r*h,g=r*a,b=n*l,m=n*h,d=n*a;return e[0]=1-f-g,e[3]=c-d,e[6]=u+m,e[1]=c+d,e[4]=1-o-g,e[7]=p-b,e[2]=u-m,e[5]=p+b,e[8]=1-o-f,e}function Be(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e}function Ve(e,t,i,s,r,n,l,h,a,o){return e[0]=t,e[1]=i,e[2]=s,e[3]=r,e[4]=n,e[5]=l,e[6]=h,e[7]=a,e[8]=o,e}function Pe(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1,e}function Ne(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],l=t[4],h=t[5],a=t[6],o=t[7],c=t[8],f=c*l-h*o,u=-c*n+h*a,p=o*n-l*a,g=i*f+s*u+r*p;return g?(g=1/g,e[0]=f*g,e[1]=(-c*s+r*o)*g,e[2]=(h*s-r*l)*g,e[3]=u*g,e[4]=(c*i-r*a)*g,e[5]=(-h*i+r*n)*g,e[6]=p*g,e[7]=(-o*i+s*a)*g,e[8]=(l*i-s*n)*g,e):null}function lt(e,t,i){let s=t[0],r=t[1],n=t[2],l=t[3],h=t[4],a=t[5],o=t[6],c=t[7],f=t[8],u=i[0],p=i[1],g=i[2],b=i[3],m=i[4],d=i[5],x=i[6],A=i[7],y=i[8];return e[0]=u*s+p*l+g*o,e[1]=u*r+p*h+g*c,e[2]=u*n+p*a+g*f,e[3]=b*s+m*l+d*o,e[4]=b*r+m*h+d*c,e[5]=b*n+m*a+d*f,e[6]=x*s+A*l+y*o,e[7]=x*r+A*h+y*c,e[8]=x*n+A*a+y*f,e}function Ye(e,t,i){let s=t[0],r=t[1],n=t[2],l=t[3],h=t[4],a=t[5],o=t[6],c=t[7],f=t[8],u=i[0],p=i[1];return e[0]=s,e[1]=r,e[2]=n,e[3]=l,e[4]=h,e[5]=a,e[6]=u*s+p*l+o,e[7]=u*r+p*h+c,e[8]=u*n+p*a+f,e}function Ge(e,t,i){let s=t[0],r=t[1],n=t[2],l=t[3],h=t[4],a=t[5],o=t[6],c=t[7],f=t[8],u=Math.sin(i),p=Math.cos(i);return e[0]=p*s+u*l,e[1]=p*r+u*h,e[2]=p*n+u*a,e[3]=p*l-u*s,e[4]=p*h-u*r,e[5]=p*a-u*n,e[6]=o,e[7]=c,e[8]=f,e}function He(e,t,i){let s=i[0],r=i[1];return e[0]=s*t[0],e[1]=s*t[1],e[2]=s*t[2],e[3]=r*t[3],e[4]=r*t[4],e[5]=r*t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e}function Xe(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],l=t[4],h=t[5],a=t[6],o=t[7],c=t[8],f=t[9],u=t[10],p=t[11],g=t[12],b=t[13],m=t[14],d=t[15],x=i*h-s*l,A=i*a-r*l,y=i*o-n*l,w=s*a-r*h,v=s*o-n*h,C=r*o-n*a,$=c*b-f*g,S=c*m-u*g,_=c*d-p*g,F=f*m-u*b,M=f*d-p*b,L=u*d-p*m,E=x*L-A*M+y*F+w*_-v*S+C*$;return E?(E=1/E,e[0]=(h*L-a*M+o*F)*E,e[1]=(a*_-l*L-o*S)*E,e[2]=(l*M-h*_+o*$)*E,e[3]=(r*M-s*L-n*F)*E,e[4]=(i*L-r*_+n*S)*E,e[5]=(s*_-i*M-n*$)*E,e[6]=(b*C-m*v+d*w)*E,e[7]=(m*y-g*C-d*A)*E,e[8]=(g*v-b*y+d*x)*E,e):null}class Ue extends Array{constructor(t=1,i=0,s=0,r=0,n=1,l=0,h=0,a=0,o=1){return super(t,i,s,r,n,l,h,a,o),this}set(t,i,s,r,n,l,h,a,o){return t.length?this.copy(t):(Ve(this,t,i,s,r,n,l,h,a,o),this)}translate(t,i=this){return Ye(this,i,t),this}rotate(t,i=this){return Ge(this,i,t),this}scale(t,i=this){return He(this,i,t),this}multiply(t,i){return i?lt(this,t,i):lt(this,this,t),this}identity(){return Pe(this),this}copy(t){return Be(this,t),this}fromMatrix4(t){return Ie(this,t),this}fromQuaternion(t){return Re(this,t),this}fromBasis(t,i,s){return this.set(t[0],t[1],t[2],i[0],i[1],i[2],s[0],s[1],s[2]),this}inverse(t=this){return Ne(this,t),this}getNormalMatrix(t){return Xe(this,t),this}}let qe=0;class We extends Te{constructor(t,{geometry:i,program:s,mode:r=t.TRIANGLES,frustumCulled:n=!0,renderOrder:l=0}={}){super(),t.canvas||console.error("gl not passed as first argument to Mesh"),this.gl=t,this.id=qe++,this.geometry=i,this.program=s,this.mode=r,this.frustumCulled=n,this.renderOrder=l,this.modelViewMatrix=new I,this.normalMatrix=new Ue,this.beforeRenderCallbacks=[],this.afterRenderCallbacks=[]}onBeforeRender(t){return this.beforeRenderCallbacks.push(t),this}onAfterRender(t){return this.afterRenderCallbacks.push(t),this}draw({camera:t}={}){this.beforeRenderCallbacks.forEach(s=>s&&s({mesh:this,camera:t})),t&&(this.program.uniforms.modelMatrix||Object.assign(this.program.uniforms,{modelMatrix:{value:null},viewMatrix:{value:null},modelViewMatrix:{value:null},normalMatrix:{value:null},projectionMatrix:{value:null},cameraPosition:{value:null}}),this.program.uniforms.projectionMatrix.value=t.projectionMatrix,this.program.uniforms.cameraPosition.value=t.worldPosition,this.program.uniforms.viewMatrix.value=t.viewMatrix,this.modelViewMatrix.multiply(t.viewMatrix,this.worldMatrix),this.normalMatrix.getNormalMatrix(this.modelViewMatrix),this.program.uniforms.modelMatrix.value=this.worldMatrix,this.program.uniforms.modelViewMatrix.value=this.modelViewMatrix,this.program.uniforms.normalMatrix.value=this.normalMatrix);let i=this.program.cullFace&&this.worldMatrix.determinant()<0;this.program.use({flipFaces:i}),this.geometry.draw({mode:this.mode,program:this.program}),this.afterRenderCallbacks.forEach(s=>s&&s({mesh:this,camera:t}))}}const ht={black:"#000000",white:"#ffffff",red:"#ff0000",green:"#00ff00",blue:"#0000ff",fuchsia:"#ff00ff",cyan:"#00ffff",yellow:"#ffff00",orange:"#ff8000"};function at(e){e.length===4&&(e=e[0]+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]);const t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t||console.warn(`Unable to convert hex string ${e} to rgb values`),[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]}function je(e){return e=parseInt(e),[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255]}function ot(e){return e===void 0?[0,0,0]:arguments.length===3?arguments:isNaN(e)?e[0]==="#"?at(e):ht[e.toLowerCase()]?at(ht[e.toLowerCase()]):(console.warn("Color format not recognised"),[0,0,0]):je(e)}class Ze extends Array{constructor(t){return Array.isArray(t)?super(...t):super(...ot(...arguments))}get r(){return this[0]}get g(){return this[1]}get b(){return this[2]}set r(t){this[0]=t}set g(t){this[1]=t}set b(t){this[2]=t}set(t){return Array.isArray(t)?this.copy(t):this.copy(ot(...arguments))}copy(t){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this}}class Ke extends Gt{constructor(t,{attributes:i={}}={}){Object.assign(i,{position:{size:2,data:new Float32Array([-1,-1,3,-1,-1,3])},uv:{size:2,data:new Float32Array([0,0,2,0,0,2])}}),super(t,i)}}var Je=`attribute vec2 uv;\r
attribute vec2 position;\r
varying vec2 vUv;

void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0, 1);\r
}`,Qe=`precision highp float;\r
uniform float uTime;\r
uniform vec3 uColor;\r
uniform float uOffset;\r
varying vec2 vUv;

void main() {\r
  gl_FragColor.rgb = 0.5 + 0.3 * cos(vUv.xyx * uOffset + uTime) + uColor;\r
  gl_FragColor.a = 1.0;\r
}`,dt=function(e){typeof e=="string"&&(e=[e]);for(var t=[].slice.call(arguments,1),i=[],s=0;s<e.length-1;s++)i.push(e[s],t[s]||"");return i.push(e[s]),i.join("")};class ti{constructor(){D(this,"renderer");D(this,"mesh");D(this,"program");D(this,"guiObj",{offset:1});D(this,"handleResize",()=>{this.renderer.setSize(window.innerWidth,window.innerHeight)});D(this,"handleRAF",t=>{requestAnimationFrame(this.handleRAF),this.program.uniforms.uTime.value=t*.001,this.renderer.render({scene:this.mesh})});D(this,"guiChange",t=>{this.program.uniforms.uOffset.value=t});this.setGUI(),this.setScene(),this.events()}setGUI(){new X().add(this.guiObj,"offset",.5,4).onChange(this.guiChange)}setScene(){const t=document.querySelector(".scene");this.renderer=new Zt({dpr:Math.min(window.devicePixelRatio,2),canvas:t});const i=this.renderer.gl;i.clearColor(1,1,1,1),this.handleResize();const s=new Ke(i);this.program=new Xt(i,{vertex:dt(Je),fragment:dt(Qe),uniforms:{uTime:{value:0},uColor:{value:new Ze(.3,.2,.5)},uOffset:{value:this.guiObj.offset}}}),this.mesh=new We(i,{geometry:s,program:this.program})}events(){window.addEventListener("resize",this.handleResize,!1),requestAnimationFrame(this.handleRAF)}}new ti;
