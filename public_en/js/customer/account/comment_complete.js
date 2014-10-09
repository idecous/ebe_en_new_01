var EBE_ModuleGroup = function(){
	var navBarEls = $(".common_rightPanel .shortcutBar a");
	var moduleEls = $(".common_rightPanel .moduleGroup .module");
	
	navBarEls.click(function(){
		var tIndex = navBarEls.index(this);
		var navBtnEl = navBarEls.eq(tIndex);
		if( navBtnEl.hasClass("current") ){
			return;
		}
		navBarEls.removeClass("current");
		moduleEls.removeClass("current");
		navBarEls.eq(tIndex).addClass("current");
		moduleEls.eq(tIndex).addClass("current");
	});
};

$(function(){
	new EBE_ModuleGroup();
	
});
