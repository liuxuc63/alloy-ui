YUI.add("aui-color-picker-base",function(e,t){function p(){}var n=e.Array,r=e.Widget,i=e.Lang,s=e.getClassName,o=10,u=-1,a=s("color-picker-nocolor"),f=s("color-picker-nocolor-icon"),l=s("color-picker-trigger"),c=s("hsv-trigger"),h=s("actions-container");p.prototype={TPL_ACTIONS:'<div class="row '+h+'"></div>',TPL_HSV_TRIGGER:'<div class="col col-lg-6 col-md-6 col-sm-6 '+c+'">{more}</div>',TPL_NO_COLOR:'<div class="col-xs-6 '+a+'">'+'<a href class="btn-link"><span class="'+f+' glyphicon glyphicon-remove-circle"></span>{none}</a>'+"</div>",_currentTrigger:null,_eventHandles:null,_hsvPaletteModal:null,initializer:function(){var t=this;t._eventHandles=[],e.after(t._rendererUICPBase,t,"renderer")},destructor:function(){var t=this;t._recentColorsPalette&&t._recentColorsPalette.destroy(),t._colorPalette&&t._colorPalette.destroy(),(new e.EventHandle(t._eventHandles)).detach()},reset:function(){var e=this;e.set("color","",{src:r.UI_SRC}),e._colorPalette&&e._colorPalette.set("selected",u,{src:r.UI_SRC}),e._recentColorsPalette&&e._recentColorsPalette.set("selected",u,{src:r.UI_SRC})},_bindHSVPalette:function(){var e=this,t;t=e.get("renderHSVPalette"),t&&(e._eventHandles.push(e._hsvTrigger.on("click",e._onHSVTriggerClick,e)),e._recentColorsPalette.on("selectedChange",e._onRecentColorPaletteSelectChange,e))},_bindNoColor:function(){var e=this;e._eventHandles.push(e._noColorNode.on("click",e._onNoColorClick,e))},_bindUICPBase:function(){var e=this;e._bindNoColor(),e._bindHSVPalette(),e.on("colorChange",e._onColorChange,e),e.on("visibleChange",e._onVisibleChange,e)},_defaultValueRecentColors:function(){var e=this,t,n;return t=e.get("defaultColor"),n={name:e.get("strings").noColor,value:t},{columns:o,items:[n,n,n,n,n,n,n,n,n,n]}},_getCurrentTrigger:function(){var e=this;return e._currentTrigger},_getDefaultAttributeValue:function(t){var n=this,r,i;return i=n.get("color"),r=n.get(t),i&&e.mix(r,{selected:i}),r},_findRecentColorEmptySpot:function(e){var t=this,r,i;return r=t.get("defaultColor"),i=u,e||(e=t._recentColorsPalette.get("items")),n.some(e,function(e,t){var n=e.value===r;return n&&(i=t),n}),i},_getHSVPalette:function(){var t=this,n,r,i;return t._hsvPaletteModal||(n=t.get("contentBox"),r=t.get("strings"),i=t.get("zIndex")||0,i+=2,t._hsvPaletteModal=(new e.HSVAPaletteModal({centered:!0,hsv:t.get("hsvPalette"),modal:!0,resizable:!1,toolbars:{footer:[{label:r.cancel,on:{click:function(){t._hsvPaletteModal.hide()}}},{label:r.ok,cssClass:"btn-primary",on:{click:function(){t._onHSVPaletteOK()}}}]},zIndex:i})).render()),t._hsvPaletteModal},_onColorChange:function(e){var t=this;e.src!=="sourceRecentColor"&&e.src!==r.UI_SRC&&t.hide(),e.src!==r.UI_SRC&&t.fire("select",{color:e.newVal,trigger:e.trigger})},_onColorPaletteSelectChange:function(e){var t=this,n,s;e.src!==r.UI_SRC&&(t.get("renderHSVPalette")&&t._recentColorsPalette.set("selected",u,{src:r.UI_SRC}),e.newVal===u?t.set("color","",{trigger:t._currentTrigger}):(s=t._colorPalette.get("items")[e.newVal],n=i.isObject(s)?s.name:s,t.set("color",n,{trigger:t._currentTrigger})))},_onHSVPaletteOK:function(){var e=this,t,n,s;t="#"+e._hsvPaletteModal.get("selected"),s=e._recentColorsPalette.get("items"),e._colorPalette.set("selected",u,{src:r.UI_SRC}),i.isNumber(e._recentColorIndex)?(s[e._recentColorIndex]=t,e._recentColorsPalette.set("selected",e._recentColorIndex,{src:r.UI_SRC})):(n=e._findRecentColorEmptySpot(s),n>u?s[n]=t:s.push(t),e._recentColorsPalette.set("selected",n,{src:r.UI_SRC})),e._recentColorsPalette.set("items",s),e.set("color",t,{src:"sourceRecentColor",trigger:e._currentTrigger}),e._hsvPaletteModal.hide()},_onHSVTriggerClick:function(){var e=this,t;e._recentColorIndex=null,t=e._getHSVPalette(),t.set("selected","FF0000"),e._clickOutsideHandle&&e._clickOutsideHandle.detach(),t.show()},_onNoColorClick:function(e){var t=this;e.halt(),t.set("color","",{trigger:t._currentTrigger})},_onRecentColorPaletteSelectChange:function(e){var t=this,n,s;e.src!==r.UI_SRC&&(t._colorPalette.set("selected",u,{src:r.UI_SRC}),e.newVal===u?t.set("color","",{trigger:t._currentTrigger}):(s=t._recentColorsPalette.get("items")[e.newVal],n=i.isObject(s)?s.name:s,t.set("color",n,{trigger:t._currentTrigger})))},_onRecentColorClick:function(e){var t=this,n,r,s;s=e.item,n=s.getAttribute("data-value"),t._recentColorIndex=i.toInt(s.getAttribute("data-index")),n==="#FFF"&&(e.preventDefault(),r=t._getHSVPalette(),r.set("selected","FF0000"),t._clickOutsideHandle&&t._clickOutsideHandle.detach(),r.show())},_onTriggerInteraction:function(e){var t=this,n;n=e.currentTarget,n===t._currentTrigger?t.set("visible",!t.get("visible")):(t.set("align.node",n),t.set("visible",!0),t._currentTrigger=n,t.get("contentBox").one(".palette-item-inner").focus())},_onVisibleChange:function(t){var n=this;n._clickOutsideHandle&&n._clickOutsideHandle.detach(),t.newVal?(n.reset(),e.later(0,n,function(){n._clickOutsideHandle=n.get("boundingBox").once("clickoutside",n.hide,n)},n)):n._currentTrigger&&n._currentTrigger.focus()},_renderActionsContainer:function(){var t=this,n;n=t.getStdModNode(e.WidgetStdMod.BODY),t._actionsContainer=n.appendChild(t.TPL_ACTIONS)},_renderColorPalette:function(){var t=this,n,r;n=t.getStdModNode(e.WidgetStdMod.BODY),r=t._getDefaultAttributeValue("colorPalette"),t._colorPalette=(new e.ColorPalette(r)).render(n),t._colorPalette.on("selectedChange",t._onColorPaletteSelectChange,t)},_renderHSVTrigger:function(){var e=this,t;t=e.get("strings"),e._hsvTrigger=e._actionsContainer.appendChild(i.sub(e.TPL_HSV_TRIGGER,{more:t.more}))},_renderNoColor:function(){var e=this;e._noColorNode=e._actionsContainer.appendChild(i.sub(e.TPL_NO_COLOR,{none:e.get("strings").none}))},_renderRecentColors:function(){var t=this,n,r,i;r=t._getDefaultAttributeValue("recentColors"),n=t.getStdModNode(e.WidgetStdMod.BODY),i=new e.ColorPalette(r),i.render(n),i.on(["select","unselect"],t._onRecentColorClick,t),t._recentColorsPalette=i},_rendererUICPBase:function(){var e=this,t,n;t=e.get("renderColorPalette"),t&&e._renderColorPalette
(),n=e.get("renderHSVPalette"),e._renderActionsContainer(),n&&(e._renderHSVTrigger(),e._renderRecentColors()),e._renderNoColor(),e._bindUICPBase()},_setTrigger:function(e){return e},_validateTrigger:function(t){return t instanceof e.Node||t instanceof e.NodeList||i.isString(t)},_uiSetTrigger:function(){var t=this,n,r;n=t.get("trigger"),r=t.get("triggerEvent"),i.isString(n)?t._eventHandles.push(e.getBody().delegate(r,t._onTriggerInteraction,n,t)):t._eventHandles.push(n.on(r,t._onTriggerInteraction,t))}},p.ATTRS={bodyContent:{value:""},color:{validator:i.isString},colorPalette:{validator:i.isObject,value:{columns:o,items:["#000000","#434343","#666666","#999999","#b7b7b7","#cccccc","#d9d9d9","#efefef","#f3f3f3","#ffffff","#980000","#FF0000","#FF9900","#FFFF00","#00FF00","#00FFFF","#4A86E8","#0000FF","#9900FF","#FF00FF","#E6B8AF","#F4CCCC","#FCE5CD","#FFF2CC","#D9EAD3","#D0E0E3","#C9DAF8","#CFE2F3","#D9D2E9","#EAD1DC","#DD7E6B","#EA9999","#F9CB9C","#FFE599","#B6D7A8","#A2C4C9","#A4C2F4","#9FC5E8","#B4A7D6","#D5A6BD","#CC4125","#E06666","#F6B26B","#FFD966","#93C47D","#76A5AF","#6D9EEB","#6FA8DC","#8E7CC3","#C27BA0","#A61C00","#CC0000","#E69138","#F1C232","#6AA84F","#45818E","#3C78D8","#3D85C6","#674EA7","#A64D79","#85200C","#990000","#B45F06","#BF9000","#38761D","#134F5C","#1155CC","#0B5394","#351C75","#741B47","#5B0F00","#660000","#783F04","#7F6000","#274E13","#0C343D","#1C4587","#073763","#20124D","#4C1130"]}},currentTrigger:{getter:"_getCurrentTrigger",readOnly:!0},defaultColor:{validator:i.isString,value:"#FFF"},hsvPalette:{validator:i.isObject,value:{alpha:!1}},recentColors:{validator:i.isObject,valueFn:"_defaultValueRecentColors"},renderColorPalette:{validator:i.isBoolean,value:!0},renderHSVPalette:{validator:i.isBoolean,value:!0,writeOnce:!0},strings:{value:{cancel:"Cancel",more:"More colors...",noColor:"No color",none:"None",ok:"OK"}},trigger:{setter:"_setTrigger",validator:"_validateTrigger",value:"."+l},triggerEvent:{validator:i.isString,value:"click"}},p.CSS_PREFIX=s("color-picker-inline"),p.NAME="color-picker-inline",e.ColorPickerBase=p},"3.0.3-deprecated.29",{requires:["aui-color-palette","aui-hsva-palette-modal","event-outside"],skinnable:!0});
