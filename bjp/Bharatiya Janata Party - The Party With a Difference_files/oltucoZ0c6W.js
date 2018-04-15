if (self.CavalryLogger) { CavalryLogger.start_js(["hJ1qv"]); }

__d("UserActivity",["Arbiter","Event"],(function a(b,c,d,e,f,g){__p&&__p();var h=5e3,i=500,j=-5,k=Date.now(),l=k,m=false,n=Date.now(),o=document.hasFocus?document.hasFocus():true,p=0,q=Date.now(),r=-1,s=-1,t={EVENT_INTERVAL_MS:i,subscribeOnce:function x(y){var z=t.subscribe(function(A,B){t.unsubscribe(z);y(B)});return z},subscribe:function x(y){return c("Arbiter").subscribe("useractivity/activity",y)},unsubscribe:function x(y){y.unsubscribe()},isActive:function x(y){return new Date()-k<(y||h)},isOnTab:function x(){return o},hasBeenInactive:function x(){return m},resetActiveStatus:function x(){o=true;m=false},getLastInActiveEnds:function x(){return n},getLastActive:function x(){return k},setIdleTime:function x(y){p=y},getLastLeaveTime:function x(){return q},getLastInformTime:function x(){return l},reset:function x(){k=Date.now();l=k;m=false;n=Date.now();o=document.hasFocus?document.hasFocus():true;p=0;q=Date.now();r=-1;s=-1}};function u(event){__p&&__p();var x=b.MouseEvent;if(x&&event instanceof x){if(event.pageX==r&&event.pageY==s&&event.type!="click")return;r=event.pageX;s=event.pageY}k=Date.now();var y=k-l;if(y>i){l=k;if(!o)q=k;if(y>=(p||h)){m=true;n=k}c("Arbiter").inform("useractivity/activity",{event:event,idleness:y,last_inform:l})}else if(y<j)l=k}function v(event){o=true;n=Date.now();u(event)}function w(event){o=false;m=true;q=Date.now()}c("Event").listen(window,"scroll",u);c("Event").listen(window,"focus",v);c("Event").listen(window,"blur",w);c("Event").listen(document.documentElement,{DOMMouseScroll:u,mousewheel:u,keydown:u,mouseover:u,mousemove:u,click:u},undefined,undefined,{passive:true});c("Arbiter").subscribe("Event/stop",function(x,y){u(y.event)});f.exports=t}),null);
__d("ImmutableValue",["invariant","isNode"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();var i="_DONT_EVER_TYPE_THIS_SECRET_KEY";function j(k){k===j[i]||h(0)}j.mergeAllPropertiesInto=function(k,l){var m=l.length;for(var n=0;n<m;n++)Object.assign(k,l[n])};j.deepFreezeRootNode=function(k){if(c("isNode")(k))return;Object.freeze(k);for(var l in k)if(Object.prototype.hasOwnProperty.call(k,l))j.recurseDeepFreeze(k[l]);Object.seal(k)};j.recurseDeepFreeze=function(k){if(c("isNode")(k)||!j.shouldRecurseFreeze(k))return;Object.freeze(k);for(var l in k)if(Object.prototype.hasOwnProperty.call(k,l))j.recurseDeepFreeze(k[l]);Object.seal(k)};j.shouldRecurseFreeze=function(k){return typeof k==="object"&&!(k instanceof j)&&k!==null};j._DONT_EVER_TYPE_THIS_SECRET_KEY=Math.random();f.exports=j}),null);
__d("mergeHelpers",["invariant","FbtResultBase"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();var i=36,j=function j(l){return typeof l!=="object"||l instanceof Date||l===null||l instanceof c("FbtResultBase")},k={MAX_MERGE_DEPTH:i,isTerminal:j,normalizeMergeArg:function l(m){return m===undefined||m===null?{}:m},checkMergeArrayArgs:function l(m,n){Array.isArray(m)&&Array.isArray(n)||h(0)},checkMergeObjectArgs:function l(m,n){k.checkMergeObjectArg(m);k.checkMergeObjectArg(n)},checkMergeObjectArg:function l(m){!j(m)&&!Array.isArray(m)||h(0)},checkMergeIntoObjectArg:function l(m){(!j(m)||typeof m==="function")&&!Array.isArray(m)||h(0)},checkMergeLevel:function l(m){m<i||h(0)},checkArrayStrategy:function l(m){m===undefined||m in k.ArrayStrategies||h(0)},ArrayStrategies:{Clobber:"Clobber",Concat:"Concat",IndexByIndex:"IndexByIndex"}};f.exports=k}),null);
__d("ImmutableObject",["invariant","ImmutableValue","mergeHelpers"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();var i,j,k=c("mergeHelpers").checkMergeObjectArgs,l=c("mergeHelpers").isTerminal,m="_DONT_EVER_TYPE_THIS_SECRET_KEY";function n(q){q instanceof c("ImmutableValue")||h(0)}i=babelHelpers.inherits(o,c("ImmutableValue"));j=i&&i.prototype;function o(){j.constructor.call(this,c("ImmutableValue")[m]);c("ImmutableValue").mergeAllPropertiesInto(this,arguments)}o.create=function(){var q=Object.create(o.prototype);o.apply(q,arguments);return q};o.set=function(q,r){n(q);typeof r==="object"&&r!==undefined&&!Array.isArray(r)||h(0);return new o(q,r)};o.setProperty=function(q,r,s){var t={};t[r]=s;return o.set(q,t)};o.deleteProperty=function(q,r){var s={};for(var t in q)if(t!==r&&Object.prototype.hasOwnProperty.call(q,t))s[t]=q[t];return new o(s)};o.setDeep=function(q,r){n(q);return p(q,r)};o.values=function(q){return Object.keys(q).map(function(r){return q[r]})};function p(q,r){__p&&__p();k(q,r);var s={},t=Object.keys(q);for(var u=0;u<t.length;u++){var v=t[u];if(!Object.prototype.hasOwnProperty.call(r,v))s[v]=q[v];else if(l(q[v])||l(r[v]))s[v]=r[v];else s[v]=p(q[v],r[v])}var w=Object.keys(r);for(u=0;u<w.length;u++){var x=w[u];if(Object.prototype.hasOwnProperty.call(q,x))continue;s[x]=r[x]}return q instanceof c("ImmutableValue")?new o(s):r instanceof c("ImmutableValue")?new o(s):s}f.exports=o}),null);
__d("PagePluginEvents",["ImmutableObject","keyMirrorRecursive"],(function a(b,c,d,e,f,g){"use strict";var h=new(c("ImmutableObject"))(c("keyMirrorRecursive")({page_plugin:{tab:{configured:"",click:"",render:""},messages:{send:"",logged_out:"",invalid_height:""}}}));f.exports=h}),null);
__d("XPagePluginLoggingController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("/platform/plugin/page/logging/",{})}),null);
__d("PagePluginLogger",["AsyncRequest","XPagePluginLoggingController"],(function a(b,c,d,e,f,g){"use strict";function h(i,j){this.$PagePluginLogger1=i;this.$PagePluginLogger2=j}h.prototype.notify=function(i,j,k){var l=c("XPagePluginLoggingController").getURIBuilder().getURI();new(c("AsyncRequest"))().setURI(l).setMethod("POST").setData({event_name:i,page_id:this.$PagePluginLogger1,tab:j,data:Object.assign(k?k:{},{refererURL:this.$PagePluginLogger2})}).send()};f.exports=h}),null);
__d("Grid.react",["cx","React","joinClasses"],(function a(b,c,d,e,f,g,h){__p&&__p();var i,j,k,l,m=c("React").PropTypes;i=babelHelpers.inherits(n,c("React").Component);j=i&&i.prototype;n.prototype.render=function(){"use strict";__p&&__p();var p=this.props,q=p.alignh,r=p.alignv,s=p.children,t=p.cols,u=p.fixed,v=p.spacing,w=c("React").Children.count(s),x=[],y=[],z=0;c("React").Children.forEach(s,function(A,B){__p&&__p();if(A===null||A===undefined)return;var C=A.type===o;z+=C?Math.max(A.props.colSpan||0,1):1;var D=z===t?"_51mw":"";if(!C)A=c("React").createElement(o,{alignh:q,alignv:r,className:c("joinClasses")(v,D),key:A.key||B},A);else A=c("React").cloneElement(A,{key:A.key||B,alignh:A.props.alignh||q,alignv:A.props.alignv||r,className:c("joinClasses")(A.props.className,v,D)});y.push(A);if(z%t===0||B+1===w){if(u&&z<t){for(var E=z;E<t;E++)y.push(c("React").createElement(o,{key:B+E}));z=t}x.push(c("React").createElement("tr",{className:"_51mx",key:B},y));y=[];z=0}});return c("React").createElement("table",babelHelpers["extends"]({},this.props,{className:c("joinClasses")(this.props.className,"uiGrid _51mz"+(u?" _5f0n":"")),cellSpacing:"0",cellPadding:"0"}),c("React").createElement("tbody",null,x))};function n(){"use strict";i.apply(this,arguments)}n.propTypes={cols:m.number.isRequired,fixed:m.bool,alignv:m.oneOf(["top","middle","bottom"]),alignh:m.oneOf(["left","center","right"]),spacing:m.string};k=babelHelpers.inherits(o,c("React").Component);l=k&&k.prototype;o.prototype.render=function(){"use strict";var p=this.props,q=p.alignh,r=p.alignv,s=p.className,t=babelHelpers.objectWithoutProperties(p,["alignh","alignv","className"]),u=c("joinClasses")(s,"_51m-"+(r==="top"?" vTop":"")+(r==="middle"?" vMid":"")+(r==="bottom"?" vBot":"")+(q==="left"?" hLeft":"")+(q==="center"?" hCent":"")+(q==="right"?" hRght":""));return c("React").createElement("td",babelHelpers["extends"]({},t,{className:u}))};function o(){"use strict";k.apply(this,arguments)}o.propTypes={alignv:m.oneOf(["top","middle","bottom"]),alignh:m.oneOf(["left","center","right"]),className:m.string};n.GridItem=o;f.exports=n}),null);
__d("isKeyActivation",["Keys"],(function a(b,c,d,e,f,g){"use strict";function h(event){var i=0,j=event.charCode,k=event.keyCode;if(j!=null&&j!==0)i=j;else if(k!=null&&k!==0)i=k;return[c("Keys").RETURN,c("Keys").SPACE].includes(i)}f.exports=h}),null);
__d("KeyActivationToClickHOC.react",["React","isKeyActivation"],(function a(b,c,d,e,f,g){"use strict";__p&&__p();var h=function(i){__p&&__p();var j,k;return k=j=function(){__p&&__p();var l,m;l=babelHelpers.inherits(n,c("React").Component);m=l&&l.prototype;function n(){__p&&__p();var o;"use strict";for(var p=arguments.length,q=Array(p),r=0;r<p;r++)q[r]=arguments[r];(o=m.constructor).call.apply(o,[this].concat(q));this.$_class2=function(event){if(c("isKeyActivation")(event)){event.preventDefault();event.stopPropagation();if(this.$_class1)this.$_class1.click()}}.bind(this);this.$_class3=function(s){this.$_class1=s}.bind(this);this.$_class1=null}n.prototype.render=function(){"use strict";return c("React").createElement(i,babelHelpers["extends"]({},this.props,{keyActivationToClickEvent:this.$_class2,keyActivationToClickRef:this.$_class3}))};return n}(),j.displayName="KeyActivationToClickHOC",k}.bind(this);f.exports=h}),null);
__d("ShimButton.react",["KeyActivationToClickHOC.react","React","emptyFunction"],(function a(b,c,d,e,f,g){__p&&__p();var h,i,j=c("React").PropTypes;h=babelHelpers.inherits(k,c("React").Component);i=h&&h.prototype;function k(){var l,m;"use strict";for(var n=arguments.length,o=Array(n),p=0;p<n;p++)o[p]=arguments[p];return m=(l=i.constructor).call.apply(l,[this].concat(o)),this.$ShimButton1=function(event){this.props.keyActivationToClickEvent(event);this.props.onKeyPress(event)}.bind(this),this.$ShimButton2=function(q){this.props.keyActivationToClickRef(q);this.props.onRef(q)}.bind(this),m}k.prototype.render=function(){"use strict";var l=this.props,m=l.children,n=l.form,o=l.inline,p=l.keyActivationToClickEvent,q=l.keyActivationToClickRef,r=l.onRef,s=l.pressed,t=babelHelpers.objectWithoutProperties(l,["children","form","inline","keyActivationToClickEvent","keyActivationToClickRef","onRef","pressed"]),u=o?"span":"div";if(n==="link")u="a";return c("React").createElement(u,babelHelpers["extends"]({},t,{"aria-pressed":s,ref:this.$ShimButton2,role:"button",onKeyPress:this.$ShimButton1}),m)};k.defaultProps={form:"none",inline:false,keyActivationToClickRef:c("emptyFunction"),tabIndex:"0",onClick:c("emptyFunction"),onKeyPress:c("emptyFunction"),onRef:c("emptyFunction")};k.propTypes={children:j.any,form:j.oneOf(["none","link"]),inline:j.bool,tabIndex:j.oneOf(["-1","0",-1,0]),onClick:j.func,onKeyPress:j.func,onRef:j.func};f.exports=c("KeyActivationToClickHOC.react")(k)}),null);
__d("PluginTabItem.react",["cx","React","ShimButton.react"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();var i,j;i=babelHelpers.inherits(k,c("React").Component);j=i&&i.prototype;k.prototype.render=function(){var l=this.props.tab.key;return c("React").createElement(c("ShimButton.react"),{className:"_eg_"+(this.props.activeTabKey===l?" _eh2":""),onClick:function(){return this.props.onSelected(l)}.bind(this)},c("React").createElement("div",{className:"_eh3"},this.props.tab.title))};function k(){i.apply(this,arguments)}f.exports=k}),null);
__d("PluginTabControl.react",["cx","Grid.react","PluginTabItem.react","React"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();var i,j,k=c("Grid.react").GridItem;i=babelHelpers.inherits(l,c("React").Component);j=i&&i.prototype;l.prototype.render=function(){return c("React").createElement(c("Grid.react"),{className:"_4v3l",cols:this.props.tabs.length,fixed:true},this.props.tabs.map(function(m){return c("React").createElement(k,{className:"_4v3m",key:m.key},c("React").createElement(c("PluginTabItem.react"),{activeTabKey:this.props.activeTabKey,tab:m,onSelected:this.props.onTabSelected}))}.bind(this)))};function l(){i.apply(this,arguments)}f.exports=l}),null);
__d("XPluginTabAsyncRendererController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("/platform/plugin/tab/renderer/",{})}),null);
__d("PluginTabFetcher.react",["csx","cx","AsyncRequest","DOM","DOMQuery","Event","React","ReactDOM","XPluginTabAsyncRendererController","XUISpinner.react"],(function a(b,c,d,e,f,g,h,i){"use strict";__p&&__p();var j,k;j=babelHelpers.inherits(l,c("React").Component);k=j&&j.prototype;function l(m,n){k.constructor.call(this,m,n);this.state={isFetchingComponent:false,asyncContentLoaded:false};this.hasMoreContent=true;this.isLoadingContent=false}l.prototype.UNSAFE_componentWillReceiveProps=function(m){if(m.isActive===this.props.isActive||!m.isActive)return;this.$PluginTabFetcher1()};l.prototype.componentDidMount=function(){if(this.props.isActive)this.$PluginTabFetcher1()};l.prototype.$PluginTabFetcher2=function(){var m=this.refs.container,n=m.clientHeight,o=m.children[0].clientHeight,p=m.scrollTop,q=100;if(!this.isLoadingContent&&this.hasMoreContent&&p+n+q>o){this.isLoadingContent=true;this.$PluginTabFetcher3()}};l.prototype.$PluginTabFetcher3=function(){var m=c("XPluginTabAsyncRendererController").getURIBuilder().getURI(),n=this.props.tab.configData;new(c("AsyncRequest"))().setURI(m).setMethod("POST").setData({cursor:this.cursor,config_json:JSON.stringify(n),key:this.props.tab.key}).setHandler(function(o){this.setState({isFetchingComponent:false,asyncContentLoaded:true},function(){var p=o.payload;this.isLoadingContent=false;if(this.hasMoreContent){var q=c("DOMQuery").scry(this.refs.container,"._1_lk"),r=q[q.length-1];c("DOM").appendContent(r,p.content.markup)}}.bind(this))}.bind(this)).send()};l.prototype.$PluginTabFetcher4=function(){__p&&__p();this.scrollListener=c("Event").listen(this.refs.container,"scroll",function(){if(this.scrollTimeout){clearTimeout(this.scrollTimeout);this.scrollTimeout=null}this.scrollTimeout=setTimeout(function(){return this.$PluginTabFetcher2()}.bind(this),250)}.bind(this));var m=c("DOMQuery").find(this.refs.container,"._10b6");c("Event").listen(m,"noMoreContent",function(){this.hasMoreContent=false;this.scrollListener.remove()}.bind(this));c("Event").listen(m,"setCursor",function(n){this.cursor=n.getData()}.bind(this))};l.prototype.$PluginTabFetcher1=function(){__p&&__p();if(!this.state.asyncContentLoaded&&!this.state.isFetchingComponent){this.setState({isFetchingComponent:true});var m=c("XPluginTabAsyncRendererController").getURIBuilder().getURI();new(c("AsyncRequest"))().setURI(m).setMethod("POST").setData({config_json:JSON.stringify(this.props.tab.configData),key:this.props.tab.key}).setHandler(function(n){this.setState({isFetchingComponent:false,asyncContentLoaded:true},function(){var o=n.payload;c("DOM").setContent(c("ReactDOM").findDOMNode(this.refs.container),o.content.markup);if(this.props.tab.canLoadMore){this.cursor="";this.$PluginTabFetcher4()}}.bind(this))}.bind(this)).send()}};l.prototype.render=function(){return c("React").createElement("div",{className:!this.props.isActive?"hidden_elem":""},c("React").createElement("div",{style:{maxHeight:this.props.tabHeight+"px"},className:"_10b4"+(this.state.isFetchingComponent?" hidden_elem":""),ref:"container"}),c("React").createElement("div",{className:"_10b5"+(!this.state.isFetchingComponent?" hidden_elem":"")},c("React").createElement(c("XUISpinner.react"),{className:"_4g7o",size:"large"})))};f.exports=l}),null);
__d("PluginTabContainer.react",["cx","PluginTabControl.react","PluginTabFetcher.react","React"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();var i,j;i=babelHelpers.inherits(k,c("React").Component);j=i&&i.prototype;function k(l,m){j.constructor.call(this,l,m);this.state={activeTabKey:this.props.activeTabKey}}k.prototype.componentDidMount=function(){this.props.tabs.map(function(l){return this.onTabLoaded(l)}.bind(this))};k.prototype.onTabLoaded=function(l){};k.prototype.onTabSelected=function(l){this.setState({activeTabKey:l})};k.prototype.render=function(){var l=this.props.tabs.length;if(l===0)return null;return c("React").createElement("div",null,l>1?c("React").createElement(c("PluginTabControl.react"),{tabs:this.props.tabs,activeTabKey:this.state.activeTabKey,onTabSelected:function(m){return this.onTabSelected(m)}.bind(this)}):null,c("React").createElement("div",{className:"_2hkj"},this.props.tabs.map(function(m){return c("React").createElement(c("PluginTabFetcher.react"),{key:m.key,tab:m,isActive:m.key===this.state.activeTabKey,tabHeight:this.props.tabHeight})}.bind(this))))};f.exports=k}),null);
__d("PagePluginTabContainer.react",["PagePluginEvents","PagePluginLogger","PluginTabContainer.react"],(function a(b,c,d,e,f,g){"use strict";__p&&__p();var h,i;h=babelHelpers.inherits(j,c("PluginTabContainer.react"));i=h&&h.prototype;function j(k,l){i.constructor.call(this,k,l);this.$PagePluginTabContainer1=new(c("PagePluginLogger"))(k.pageID,k.refererURI)}j.prototype.onTabLoaded=function(k){this.$PagePluginTabContainer1.notify(c("PagePluginEvents").page_plugin.tab.configured,k.key)};j.prototype.onTabSelected=function(k){this.$PagePluginTabContainer1.notify(c("PagePluginEvents").page_plugin.tab.click,k);i.onTabSelected.call(this,k)};f.exports=j}),null);