!function($){void 0===Craft.CpNav&&(Craft.CpNav={});var t=new Craft.AdminTable({tableSelector:"#layoutItems",sortable:!1,deleteAction:"cp-nav/layout/delete",confirmDeleteMessage:Craft.t("app","Are you sure you want to permanently delete this layout and all its settings? This cannot be undone.")});$(document).on("click","tr.layout-item a.edit-layout",function(t){new Craft.CpNav.EditLayoutItem($(this),$(this).parents("tr.layout-item"))}),Craft.CpNav.EditLayoutItem=Garnish.Base.extend({$element:null,data:null,layoutId:null,$form:null,$spinner:null,hud:null,init:function(t,e){this.$element=t,this.data={id:e.data("id")},this.$element.addClass("loading"),Craft.postActionRequest("cp-nav/layout/get-hud-html",this.data,$.proxy(this,"showHud"))},showHud:function(t,e){if(this.$element.removeClass("loading"),"success"===e){var a=$();this.$form=$("<div/>"),$fieldsContainer=$('<div class="fields"/>').appendTo(this.$form),$fieldsContainer.html(t.html),Craft.initUiElements($fieldsContainer);var s=$('<div class="hud-footer"/>').appendTo(this.$form),n=$('<div class="buttons right"/>').appendTo(s);this.$cancelBtn=$('<div class="btn">'+Craft.t("app","Cancel")+"</div>").appendTo(n),this.$saveBtn=$('<input class="btn submit" type="submit" value="'+Craft.t("app","Save")+'"/>').appendTo(n),this.$spinner=$('<div class="spinner hidden"/>').appendTo(n),a=a.add(this.$form),this.hud=new Garnish.HUD(this.$element,a,{bodyClass:"body",closeOtherHUDs:!1}),this.hud.on("hide",$.proxy(this,"closeHud")),Garnish.$bod.append(t.footerJs),this.addListener(this.$saveBtn,"click","save"),this.addListener(this.$cancelBtn,"click","closeHud")}},save:function(t){t.preventDefault(),this.$spinner.removeClass("hidden");var e=this.hud.$body.serialize();Craft.postActionRequest("cp-nav/layout/save",e,$.proxy(function(t,e){this.$spinner.addClass("hidden"),"success"===e&&t.success?(this.$element.html("<strong>"+t.layout.name+"</strong>"),Craft.cp.displayNotice(Craft.t("app","Layout saved.")),this.closeHud()):(Craft.cp.displayError(t.error),Garnish.shake(this.hud.$hud))},this))},closeHud:function(){this.hud.$shade.remove(),this.hud.$hud.remove()}}),$(document).on("click",".add-new-layout",function(t){t.preventDefault(),new Craft.CpNav.CreateLayoutItem($(this))}),Craft.CpNav.CreateLayoutItem=Garnish.Base.extend({$element:null,data:null,layoutId:null,$form:null,$spinner:null,hud:null,init:function(t){this.$element=t,this.$element.addClass("loading"),Craft.postActionRequest("cp-nav/layout/get-hud-html",{},$.proxy(this,"showHud"))},showHud:function(t,e){if(this.$element.removeClass("loading"),"success"===e){var a=$();this.$form=$("<div/>"),$fieldsContainer=$('<div class="fields"/>').appendTo(this.$form),$fieldsContainer.html(t.html),Craft.initUiElements($fieldsContainer);var s=$('<div class="hud-footer"/>').appendTo(this.$form),n=$('<div class="buttons right"/>').appendTo(s);this.$cancelBtn=$('<div class="btn">'+Craft.t("app","Cancel")+"</div>").appendTo(n),this.$saveBtn=$('<input class="btn submit" type="submit" value="'+Craft.t("app","Save")+'"/>').appendTo(n),this.$spinner=$('<div class="spinner hidden"/>').appendTo(n),a=a.add(this.$form),this.hud=new Garnish.HUD(this.$element,a,{bodyClass:"body",closeOtherHUDs:!1}),this.hud.on("hide",$.proxy(this,"closeHud")),Garnish.$bod.append(t.footerJs),this.addListener(this.$saveBtn,"click","save"),this.addListener(this.$cancelBtn,"click","closeHud")}},save:function(e){e.preventDefault(),this.$spinner.removeClass("hidden");var a=this.hud.$body.serialize();Craft.postActionRequest("cp-nav/layout/new",a,$.proxy(function(e,a){if(this.$spinner.addClass("hidden"),"success"===a&&e.success){Craft.cp.displayNotice(Craft.t("app","Layout created."));var s=e.layouts,n=t.addRow('<tr class="layout-item" data-id="'+s.id+'" data-name="'+s.name+'"><td><a class="edit-layout"><strong>'+s.name+'</strong></a></td><td class="thin"><a class="delete icon" title="'+Craft.t("app","Delete")+'" role="button"></a></td></tr>');this.closeHud()}else Craft.cp.displayError(e.error),Garnish.shake(this.hud.$hud)},this))},closeHud:function(){this.hud.$shade.remove(),this.hud.$hud.remove()}})}(jQuery),function($){void 0===Craft.CpNav&&(Craft.CpNav={}),$(document).on("change","select#layoutId",function(){$(this).addClass("loading"),window.location.href=Craft.getUrl("cp-nav?layoutId="+$(this).val())}),$(document).on("click",".add-new-menu-item",function(t){new Craft.CpNav.AddMenuItem($(this))}),Craft.CpNav.AddMenuItem=Garnish.Base.extend({$element:null,data:null,navId:null,$form:null,$cancelBtn:null,$saveBtn:null,$spinner:null,hud:null,init:function(t,e){this.$element=t,this.data={layoutId:$("select#layoutId").val()},this.$element.addClass("loading"),Craft.postActionRequest("cp-nav/navigation/get-hud-html",this.data,$.proxy(this,"showHud"))},showHud:function(t,e){if(this.$element.removeClass("loading"),"success"===e){var a=$();this.$form=$("<div/>"),$fieldsContainer=$('<div class="fields"/>').appendTo(this.$form),$fieldsContainer.html(t.html),Craft.initUiElements($fieldsContainer);var s=$('<div class="hud-footer"/>').appendTo(this.$form),n=$('<div class="buttons right"/>').appendTo(s);this.$cancelBtn=$('<div class="btn">'+Craft.t("app","Cancel")+"</div>").appendTo(n),this.$saveBtn=$('<input class="btn submit" type="submit" value="'+Craft.t("app","Save")+'"/>').appendTo(n),this.$spinner=$('<div class="spinner hidden"/>').appendTo(n),a=a.add(this.$form),this.hud=new Garnish.HUD(this.$element,a,{bodyClass:"body",closeOtherHUDs:!1}),this.hud.on("hide",$.proxy(this,"closeHud")),new Craft.HandleGenerator("#currLabel","#handle"),Garnish.$bod.append(t.footerJs),this.addListener(this.$saveBtn,"click","saveGroupField"),this.addListener(this.$cancelBtn,"click","closeHud")}},saveGroupField:function(a){a.preventDefault(),this.$spinner.removeClass("hidden");var s=this.hud.$body.serialize();Craft.postActionRequest("cp-nav/navigation/new",s,$.proxy(function(a,s){if(this.$spinner.addClass("hidden"),"success"===s&&a.success){Craft.cp.displayNotice(Craft.t("app","Menu saved.")),e(a.navs);var n=a.navs[a.navs.length-1],i=t.addRow('<tr class="nav-item" data-id="'+n.id+'" data-currlabel="'+n.currLabel+'" data-name="'+n.currLabel+'"><td class="thin"><div class="field"><div class="input ltr"><div class="lightswitch on" tabindex="0"><div class="lightswitch-container"><div class="label on"></div><div class="handle"></div><div class="label off"></div></div><input type="hidden" name="navEnabled" value="1"></div></div></div></td><td data-title="'+n.currLabel+'"><a class="move icon" title="'+Craft.t("app","Reorder")+'" role="button"></a><a class="edit-nav">'+n.currLabel+'</a><span class="original-nav">('+n.currLabel+')</span></td><td data-title="'+n.currLabel+'"><span class="original-nav-link">'+n.url+'</span></td><td class="thin"><a class="delete icon" title="'+Craft.t("app","Delete")+'" role="button"></a></td></tr>');Craft.initUiElements(i),this.closeHud()}else Craft.cp.displayError(a.error),Garnish.shake(this.hud.$hud)},this))},closeHud:function(){this.hud.$shade.remove(),this.hud.$hud.remove()}}),$(document).on("change","#navItems .lightswitch",function(){var t=$(this).parents("tr.nav-item"),a=$(this).find("input:first").val();a=a?1:0;var s={value:a,id:t.data("id"),layoutId:$("select#layoutId").val()};Craft.postActionRequest("cp-nav/navigation/toggle",s,$.proxy(function(t,a){"success"===a&&t.success&&(Craft.cp.displayNotice(Craft.t("app","Status saved.")),e(t.navs))}))}),$(document).on("click","tr.nav-item a.edit-nav",function(t){new Craft.CpNav.EditNavItem($(this),$(this).parents("tr.nav-item"))}),Craft.CpNav.EditNavItem=Garnish.Base.extend({$element:null,data:null,navId:null,$form:null,$cancelBtn:null,$saveBtn:null,$spinner:null,hud:null,init:function(t,e){this.$element=t,this.data={id:e.data("id"),currLabel:e.data("currlabel"),layoutId:$("select#layoutId").val()},this.$element.addClass("loading"),Craft.postActionRequest("cp-nav/navigation/get-hud-html",this.data,$.proxy(this,"showHud"))},showHud:function(t,e){if(this.$element.removeClass("loading"),"success"===e){var a=$();this.$form=$("<div/>"),$fieldsContainer=$('<div class="fields"/>').appendTo(this.$form),$fieldsContainer.html(t.html),Craft.initUiElements($fieldsContainer);var s=$('<div class="hud-footer"/>').appendTo(this.$form),n=$('<div class="buttons right"/>').appendTo(s);this.$cancelBtn=$('<div class="btn">'+Craft.t("app","Cancel")+"</div>").appendTo(n),this.$saveBtn=$('<input class="btn submit" type="submit" value="'+Craft.t("app","Save")+'"/>').appendTo(n),this.$spinner=$('<div class="spinner hidden"/>').appendTo(n),a=a.add(this.$form),this.hud=new Garnish.HUD(this.$element,a,{bodyClass:"body",closeOtherHUDs:!1}),this.hud.on("hide",$.proxy(this,"closeHud")),Garnish.$bod.append(t.footerJs),this.addListener(this.$saveBtn,"click","saveGroupField"),this.addListener(this.$cancelBtn,"click","closeHud")}},saveGroupField:function(t){t.preventDefault(),this.$spinner.removeClass("hidden");var a=this.hud.$body.serialize();Craft.postActionRequest("cp-nav/navigation/save",a,$.proxy(function(t,a){this.$spinner.addClass("hidden"),"success"===a&&t.success?(this.$element.html(t.nav.currLabel),this.$element.parents("tr.nav-item").find(".original-nav-link").html(t.nav.url),Craft.cp.displayNotice(Craft.t("app","Menu saved.")),this.closeHud(),e(t.navs)):(Craft.cp.displayError(t.error),Garnish.shake(this.hud.$hud))},this))},closeHud:function(){this.hud.$shade.remove(),this.hud.$hud.remove()}}),Craft.CpNav.AlternateAdminTable=Craft.AdminTable.extend({reorderItems:function(){if(this.settings.sortable){for(var t=[],a=0;a<this.sorter.$items.length;a++){var s=$(this.sorter.$items[a]).attr(this.settings.idAttribute);t.push(s)}var n={ids:JSON.stringify(t),layoutId:$("select#layoutId").val()};Craft.postActionRequest(this.settings.reorderAction,n,$.proxy(function(a,s){"success"===s&&(a.success?(this.onReorderItems(t),Craft.cp.displayNotice(Craft.t("app",this.settings.reorderSuccessMessage)),e(a.navs)):Craft.cp.displayError(Craft.t("app",this.settings.reorderFailMessage)))},this))}},deleteItem:function(t){var a={id:this.getItemId(t),layoutId:$("select#layoutId").val()};Craft.postActionRequest(this.settings.deleteAction,a,$.proxy(function(a,s){"success"===s&&(this.handleDeleteItemResponse(a,t),e(a.navs))},this))}});var t=new Craft.CpNav.AlternateAdminTable({tableSelector:"#navItems",newObjectBtnSelector:"#newNavItem",sortable:!0,reorderAction:"cp-nav/navigation/reorder",deleteAction:"cp-nav/navigation/delete"}),e=function(t){$("#global-sidebar nav#nav ul").empty();var e="";$.each(t,function(t,a){if("1"==a.enabled){var s=Craft.getUrl(a.parsedUrl),n='<span class="icon icon-mask"><svg version="1.1" baseProfile="full" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="#000" fill-opacity="0.35"></circle><text x="10" y="15" font-size="15" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#000">'+a.currLabel.substring(0,1).toUpperCase()+"</text></svg></span>";a.craftIcon&&(n='<span class="icon icon-mask"><span data-icon="'+a.craftIcon+'"></span></span>'),a.pluginIcon&&(n='<span class="icon icon-mask">'+a.pluginIcon+"</span>");var i='target="_self"';1==a.newWindow&&(i='target="_blank"'),e+='<li id="nav-'+a.handle+'"><a href="'+s+'" '+i+">"+n+'<span class="label">'+a.currLabel+"</span></a></li>"}}),$("#global-sidebar nav#nav ul").append(e)}}(jQuery),$(function(){});