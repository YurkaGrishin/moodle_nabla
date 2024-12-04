function Cropper(t){this.options=t,this.container=t.container;const e=t=>e=>{e.preventDefault(),e.stopPropagation(),window.onpointerup=void 0,window.onpointermove=void 0,this.toggleHandles(!0,t)},i=i=>{if(!this.handles[i])return;const s=i.split("_"),o=(e,i,s,o)=>{let r,h;const a=this.canvas.parentElement.getBoundingClientRect();if(e){const t=this.selector.offsetTop+this.selector.offsetHeight;let e=Math.round(event.pageY)-a.top;e<0&&(e=0),e>this.pointerOffset.ySpan&&(e=this.pointerOffset.ySpan),h=t-e,this.selector.style.top=e+"px"}if(i){const t=this.selector.offsetLeft+this.selector.offsetWidth;let e=Math.round(event.pageX)-a.left;e<0&&(e=0),e>this.pointerOffset.xSpan&&(e=this.pointerOffset.xSpan),r=t-e,this.selector.style.left=e+"px"}if(s){const t=this.canvas.offsetHeight-this.selector.offsetTop;h=Math.round(event.pageY)-a.top-this.selector.offsetTop,h<0&&(h=0),this.selector.offsetTop+h>this.canvas.offsetHeight&&(h=t)}if(o){const t=this.canvas.offsetWidth-this.selector.offsetLeft;r=Math.round(event.pageX)-a.left-this.selector.offsetLeft,r<0&&(r=0),this.selector.offsetLeft+r>this.canvas.offsetWidth&&(r=t)}r&&(r<t.selector.min.width&&(r=t.selector.min.width),this.selector.style.width=r+"px"),h&&(h<t.selector.min.height&&(h=t.selector.min.height),this.selector.style.height=h+"px")},r=e=>{e.preventDefault(),e.stopPropagation();const i={top:!1,left:!1,bottom:!1,right:!1};for(let t of s)i[t]=!0;o(i.top,i.left,i.bottom,i.right),t.selector.mask&&this.updateMask()};this.handles[i].onpointerdown=s=>{s.preventDefault(),s.stopPropagation(),this.pointerOffset.xSpan=this.selector.offsetLeft+this.selector.offsetWidth-t.selector.min.width,this.pointerOffset.ySpan=this.selector.offsetTop+this.selector.offsetHeight-t.selector.min.height,this.toggleHandles(!1,i),window.onpointerup=e(i),window.onpointermove=r}};this.toggleMask=t=>{for(let e in this.masks)this.masks[e].style.display=t?"block":"none"},this.updateMask=()=>{let t;this.masks.top&&(t=this.masks.top.style,t.width=this.selector.offsetWidth+"px",t.height=this.selector.offsetTop+"px",t.top=0,t.left=this.selector.offsetLeft+"px"),this.masks.right&&(t=this.masks.right.style,t.width=this.canvas.width-(this.selector.offsetLeft+this.selector.offsetWidth)+"px",t.height=this.canvas.height+"px",t.right=0,t.top=0),this.masks.bottom&&(t=this.masks.bottom.style,t.width=this.selector.offsetWidth+"px",t.height=this.canvas.height-(this.selector.offsetTop+this.selector.offsetHeight)+"px",t.bottom=0,t.left=this.selector.offsetLeft+"px"),this.masks.left&&(t=this.masks.left.style,t.width=this.selector.offsetLeft+"px",t.height=this.canvas.height+"px",t.left=0,t.top=0)},this.toggleHandles=(t,e)=>{for(let i in this.handles)i!==e&&(this.handles[i].style.opacity=t?1:0)},this.toggleSelector=e=>{this.selector.style.display=e?"block":"none",t.selector.mask&&(this.updateMask(),this.toggleMask(e)),this.resetSelector()},this.toggleSection=t=>{for(let e in this.sections)this.sections[e].style.display=t===e?"inline-block":"none"},this.fit=(t,e)=>{let i,s;return e||(e=this.canvas),t.width>=t.height?(i=e.width,s=t.height/t.width*i,s>e.height&&(s=e.height,i=t.width/t.height*s)):(s=e.height,i=t.width/t.height*s,i>e.width&&(i=e.width,s=t.height/t.width*i)),{width:i,height:s}};const s=t=>e=>{const i=URL.createObjectURL(e);this.image=new Image,this.image.onload=()=>{URL.revokeObjectURL(i),this.loadImage(),t&&t()},this.image.src=i};this.loadImage=()=>{const{width:e,height:i}=this.fit(this.image);this.margins.left=(this.canvas.width-e)/2,this.margins.top=0,this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.fillStyle=t.canvas.background,this.context.fillRect(0,0,this.canvas.width,this.canvas.height),this.context.drawImage(this.image,this.margins.left,this.margins.top,e,i),this.image.onload=void 0},this.loadMirror=()=>{this.mirror.width=this.image.width,this.mirror.height=this.image.height,this.mirrorContext.drawImage(this.image,0,0)},this.crop=t=>{let e=this.fit(this.image),i=this.selector.offsetLeft-this.margins.left,o=this.selector.offsetTop-this.margins.top,r=this.selector.offsetWidth,h=this.selector.offsetHeight;this.selector.offsetLeft<this.margins.left&&(i=0,r-=this.margins.left-this.selector.offsetLeft),this.selector.offsetTop<this.margins.top&&(o=0,h-=this.margins.top-this.selector.offsetTop),i+r>e.width&&(r-=i+r-e.width),o+h>e.height&&(h-=o+h-e.height);const a=this.image.width/(this.canvas.width-2*this.margins.left);i*=a,o*=a,r*=a,h*=a;const{width:n,height:c}=this.fit({width:r,height:h});this.mirror.width=n,this.mirror.height=c,this.mirrorContext.drawImage(this.image,i,o,r,h,0,0,n,c),this.mirror.toBlob(s(t),"image/png")},this.rotate=(t,e)=>{(t%=4)%2?(this.mirror.width=this.image.height,this.mirror.height=this.image.width):(this.mirror.width=this.image.width,this.mirror.height=this.image.height),this.mirrorContext.translate(this.mirror.width/2,this.mirror.height/2),this.mirrorContext.rotate(90*t*Math.PI/180),this.mirrorContext.translate(-this.image.width/2,-this.image.height/2),this.mirrorContext.drawImage(this.image,0,0),this.mirror.toBlob(s(e),"image/png")},this.resetSelector=()=>{this.selector.style.width=(t.selector.initial?.width||this.canvas.width/2)+"px",this.selector.style.height=(t.selector.initial?.height||this.canvas.height/2)+"px",this.selector.style.left=(t.selector.initial?.left||this.canvas.offsetLeft+this.canvas.width/4)+"px",this.selector.style.top=(t.selector.initial?.top||this.canvas.offsetTop+this.canvas.height/4)+"px"},this.reset=()=>{t.canvas.image?(this.image=t.canvas.image,this.loadImage(),this.loadMirror()):t.canvas.imgSrc?(this.image=new Image,this.image.onload=()=>{this.loadImage(),this.loadMirror()},this.image.src=t.canvas.imgSrc):console.warn("cropper:no_image_provided"),this.resetSelector()};const o=(e,i)=>{for(let s in e)"object"!=typeof e[s]?i?i[s]=document.getElementById(e[s]):e[s]+=`-${t.uniqueId}`:(i&&(i[s]={}),o(e[s],i?.[s]))},r=(t,e)=>i=>{-1!==t.indexOf(i.keyCode)&&e()};this.initialize=()=>{this.ids={canvas:"cropper-canvas",selector:"cropper-selector",sections:{tools:"cropper-tools",crop:"cropper-crop-decision"},buttons:{rotateLeft:"cropper-button-rotate-left",rotateRight:"cropper-button-rotate-right",crop:"cropper-button-crop",confirmCrop:"cropper-button-confirm",cancelCrop:"cropper-button-cancel"},handles:{top_left:"cropper-handle-top-left",top:"cropper-handle-top",top_right:"cropper-handle-top-right",left:"cropper-handle-left",right:"cropper-handle-right",bottom_left:"cropper-handle-bottom-left",bottom:"cropper-handle-bottom",bottom_right:"cropper-handle-bottom-right"},masks:{top:"cropper-mask-top",right:"cropper-mask-right",bottom:"cropper-mask-bottom",left:"cropper-mask-left"}},o(this.ids),this.container.innerHTML=`<div class="cropper-buttons">\n      <div class="cropper-inline" id="${this.ids.sections.tools}">\n        <div class="cropper-button cropper-image-button" id="${this.ids.buttons.rotateLeft}" tabindex=0 aria-label="${t.labels.rotateLeft}">\n          <div class="cropper-icon cropper-rotate-left"></div>\n        </div>\n        <div class="cropper-button cropper-image-button" id="${this.ids.buttons.rotateRight}" tabindex=0 aria-label="${t.labels.rotateRight}">\n          <div class="cropper-icon cropper-rotate-right"></div>\n        </div>\n        <div class="cropper-button cropper-image-button" id="${this.ids.buttons.crop}" tabindex=0 aria-label="${t.labels.cropImage}">\n          <div class="cropper-icon cropper-crop"></div>\n        </div>\n      </div>\n      <div class="cropper-hidden" id="${this.ids.sections.crop}">\n        <div class="cropper-button" id="${this.ids.buttons.confirmCrop}" tabindex=0 aria-label="${t.labels.confirmCrop}">\n          <div class="cropper-icon cropper-confirm"></div>\n          <div class="cropper-icon cropper-confirm-text">${t.labels.confirmCrop}</div>\n        </div>\n        <div class="cropper-button" id="${this.ids.buttons.cancelCrop}" tabindex=0 aria-label="${t.labels.cancelCrop}">\n          <div class="cropper-icon cropper-cancel"></div>\n          <div class="cropper-icon cropper-cancel-text">${t.labels.cancelCrop}</div>\n        </div>\n      </div>\n    </div>\n    <div class="cropper-canvas-container">\n      <canvas id="${this.ids.canvas}"></canvas>\n      <div class="cropper-mask" id="${this.ids.masks.top}"></div>\n      <div class="cropper-mask" id="${this.ids.masks.right}"></div>\n      <div class="cropper-mask" id="${this.ids.masks.bottom}"></div>\n      <div class="cropper-mask" id="${this.ids.masks.left}"></div>\n      <div id="${this.ids.selector}" class="cropper-selector">\n        <div class="cropper-selector-border">\n          <div class="cropper-border-top-left"></div><div class="cropper-border-top"></div><div class="cropper-border-top-right"></div>\n          <div class="cropper-border-center-left"></div><div class="cropper-border-center"></div><div class="cropper-border-center-right"></div>\n          <div class="cropper-border-bottom-left"></div><div class="cropper-border-bottom"></div><div class="cropper-border-bottom-right"></div>\n        </div>\n        <div id="${this.ids.handles.top_left}" class="cropper-handle cropper-top-left"></div>\n        <div id="${this.ids.handles.top}" class="cropper-handle cropper-top"></div>\n        <div id="${this.ids.handles.top_right}" class="cropper-handle cropper-top-right"></div>\n        <div id="${this.ids.handles.left}" class="cropper-handle cropper-left"></div>\n        <div id="${this.ids.handles.right}" class="cropper-handle cropper-right"></div>\n        <div id="${this.ids.handles.bottom_left}" class="cropper-handle cropper-bottom-left"></div>\n        <div id="${this.ids.handles.bottom}" class="cropper-handle cropper-bottom"></div>\n        <div id="${this.ids.handles.bottom_right}" class="cropper-handle cropper-bottom-right"></div>\n      </div>\n    </div>`,o(this.ids,this),this.margins={left:0,top:0},this.canvas.width=t.canvas.width,this.canvas.height=t.canvas.height,this.context=this.canvas.getContext("2d"),this.mirror=document.createElement("canvas"),this.mirrorContext=this.mirror.getContext("2d"),this.pointerOffset={},this.buttons.rotateLeft.onclick=()=>this.rotate(-1),this.buttons.rotateRight.onclick=()=>this.rotate(1),this.buttons.crop.onclick=()=>{this.toggleSection("crop"),this.toggleSelector(!0)},this.buttons.confirmCrop.onclick=()=>{this.crop(),this.toggleSection("tools"),this.toggleSelector(!1)},this.buttons.cancelCrop.onclick=()=>{this.toggleSection("tools"),this.toggleSelector(!1)};for(let t in this.buttons){const e=this.buttons[t];"function"==typeof e.onclick&&0==e.getAttribute("tabindex")&&(e.onkeyup=r([13,32],e.onclick))}},this.initialize(),this.reset(),(()=>{const i=e=>{let i=e.clientX-this.pointerOffset.x,s=e.clientY-this.pointerOffset.y;i<this.canvas.offsetLeft&&(i=this.canvas.offsetLeft),i>this.canvas.offsetLeft+this.canvas.offsetWidth-this.selector.offsetWidth&&(i=this.canvas.offsetLeft+this.canvas.offsetWidth-this.selector.offsetWidth),s<this.canvas.offsetTop&&(s=this.canvas.offsetTop),s>this.canvas.offsetTop+this.canvas.offsetHeight-this.selector.offsetHeight&&(s=this.canvas.offsetTop+this.canvas.offsetHeight-this.selector.offsetHeight),this.selector.style.left=i+"px",this.selector.style.top=s+"px",t.selector.mask&&this.updateMask()};this.selector.onpointerdown=t=>{t.preventDefault(),t.stopPropagation(),this.pointerOffset.x=t.clientX-this.selector.offsetLeft,this.pointerOffset.y=t.clientY-this.selector.offsetTop,this.pointerOffset.xSpan=this.selector.offsetLeft+this.selector.offsetWidth,this.pointerOffset.ySpan=this.selector.offsetTop+this.selector.offsetHeight,this.toggleHandles(!1),window.onpointerup=e(),window.onpointermove=i}})();for(let t in this.handles)i(t)}