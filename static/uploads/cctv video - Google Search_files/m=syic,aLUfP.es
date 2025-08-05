this._s=this._s||{};(function(_){var window=this;
try{
_.QDb=class{constructor(a){this.Cl=a}};
}catch(e){_._DumpException(e)}
try{
_.t("aLUfP");
var SDb;_.RDb=!1;SDb=function(){return _.qa()&&_.Od.UE()&&!navigator.userAgent.includes("GSA")};
_.Te(_.oXa,class extends _.Ao{static Ta(){return{service:{window:_.Bo}}}constructor(a){super();this.window=a.service.window.get();this.Ba=this.Cl();this.Aa=window.orientation;this.oa=()=>{const b=this.Cl();var c=this.AWb()&&Math.abs(window.orientation)===90&&this.Aa===-1*window.orientation;this.Aa=window.orientation;if(b!==this.Ba||c){this.Ba=b;for(const d of this.listeners){c=new _.QDb(b);try{d(c)}catch(e){_.da(e)}}}};this.listeners=new Set;this.window.addEventListener("resize",this.oa);this.AWb()&&
this.window.addEventListener("orientationchange",this.oa)}addListener(a){this.listeners.add(a)}removeListener(a){this.listeners.delete(a)}Cl(){if(SDb()){var a=_.dm(this.window);a=new _.Vl(a.width,Math.round(a.width*this.window.innerHeight/this.window.innerWidth))}else a=this.Kc()||(_.qa()?SDb():this.window.visualViewport)?_.dm(this.window):new _.Vl(this.window.innerWidth,this.window.innerHeight);return a.height<a.width}destroy(){this.window.removeEventListener("resize",this.oa);this.window.removeEventListener("orientationchange",
this.oa)}Kc(){return _.RDb}AWb(){return"orientation"in window}});
_.RDb=!0;
_.v();
}catch(e){_._DumpException(e)}
})(this._s);
// Google Inc.
