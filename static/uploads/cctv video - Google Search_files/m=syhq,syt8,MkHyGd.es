this._s=this._s||{};(function(_){var window=this;
try{
_.df(_.Zq);
}catch(e){_._DumpException(e)}
try{
var mNb=[1,2],oNb=function(a,b,c){a.Ea===0&&(b?a.Na=_.ie(a.Ca.get().document.body,"mousedown",d=>{nNb(a,d)},!0):(_.IGa&&(a.Pa=_.ie(a.Ca.get().document.body,"touchstart",d=>{nNb(a,d)&&!c&&(d.stopPropagation(),d.preventDefault())},{capture:!0,passive:!1})),a.Ja=_.ie(a.Ca.get().document.body,"click",d=>{nNb(a,d)},!0)));a.Ea++},sNb=function(a){a.hb||(a.hb=a.Ba.getEventTarget().listen("FWkcec",b=>{if(a.oa){var c=a.Ba.getState();if(c)if(Number(c.id)===Number(a.oa.historyId))a.oa.Ryb();else for(const d of a.Aa.values())d.eventTypes.has(4)&&
pNb(a,d,4,void 0,b)}else if(b=qNb(a))if(c=a.Va.get(b))a.Va.delete(b),rNb(a,c)}))},tNb=function(a,b,c,d){a.oa&&!a.oa.listener&&(a.oa.listener=b);var e=a.Ba.getState().id;a.oa&&a.oa.listener.element===b.element&&a.oa.historyId===e||a.Da!==0||(e=a.Ba.getState(),d=Object.assign({},e?e.userData:void 0,{Oad:d}),a.Ba.pushAsync(void 0,d).then(f=>{a.oa={historyId:f,Ryb:c,listener:b}}))},uNb=function(a,b,c=!0){a.Aa.delete(_.ce(b.element))&&(b.eventTypes.has(1)&&(a.Ea--,a.Ea===0&&(a.Na?(_.pn(a.Na),a.Na=null):
(a.Pa&&(_.pn(a.Pa),a.Pa=null),a.Ja&&(_.pn(a.Ja),a.Ja=null)))),b.eventTypes.has(2)&&(a.Ma--,a.Ma===0&&(_.pn(a.Ua),a.Ua=null)),b.eventTypes.has(3)&&(a.Ka--,a.Ka===0&&(_.pn(a.Sa),a.Sa=null)),b.eventTypes.has(4)&&(a.Da--,a.Da===0&&c&&a.Ba.pop(a.oa.historyId)))},pNb=function(a,b,c,d,e){let f;try{f=b.onDismiss(c,d,e)}catch(g){_.da(g)}d=f===!1;d||(c=b.eventTypes.has(4)&&c!==4,uNb(a,b,c));return!d},nNb=function(a,b){const c=b.target;for(const d of[...a.Aa.values()].reverse())if(d.eventTypes.has(1)){if(!_.Sf(d.element,
c)&&pNb(a,d,1,c,b))return!0;break}return!1},qNb=function(a){return(a=a.Ba.getState())&&(a=a.userData)&&a.Oad?a.Oad:null},rNb=function(a,b){a.oa={historyId:a.Ba.getState().id,Ryb:b,listener:null};b()},vNb=class extends _.Ao{static Ta(){return{service:{window:_.Bo,history:_.Ju}}}constructor(a){super();this.Ca=a.service.window;this.Ba=a.service.history;this.Aa=new Map;this.Ea=0;this.Na=this.Pa=this.Ja=null;this.Ma=0;this.Ua=null;this.Ka=0;this.Sa=null;this.Da=0;this.oa=this.hb=null;this.Va=new Map}listen(a,
b,c=mNb,d=!1,e=!1,f=!1,g,h){const k=_.ce(a);c=new Set(c);if(e)this.unlisten(a);else if(this.Aa.has(k))throw Error("gf");this.Aa.set(k,{element:a,onDismiss:b,eventTypes:c});c.has(1)&&oNb(this,d,f);c.has(2)&&(this.Ma===0&&(this.Ua=_.ie(this.Ca.get().document.body,"keydown",l=>{if(l.keyCode===27){for(const n of this.Aa.values())n.eventTypes.has(2)&&pNb(this,n,2,void 0,l);l.stopPropagation();l.preventDefault()}return f},!0)),this.Ma++);c.has(3)&&(this.Ka===0&&(this.Sa=_.ie(this.Ca.get().document.body,
"focus",l=>{const n=l.target;for(const q of this.Aa.values())!q.eventTypes.has(3)||_.gf(n)&&n.nodeType>0&&_.Sf(q.element,n)||pNb(this,q,3,n,l);return f},!0)),this.Ka++);c.has(4)&&(sNb(this),a=this.Aa.get(k),tNb(this,a,g,h),this.Da++)}unlisten(a){(a=this.Aa.get(_.ce(a)))&&uNb(this,a)}dismiss(a){(a=this.Aa.get(_.ce(a)))&&pNb(this,a,0)}hasListener(a){return this.Aa.has(_.ce(a))}Xa(a,b){sNb(this);qNb(this)===b?rNb(this,a):this.Va.set(b,a)}};_.Te(_.HXa,vNb);
}catch(e){_._DumpException(e)}
try{
_.t("MkHyGd");

_.v();
}catch(e){_._DumpException(e)}
})(this._s);
// Google Inc.
