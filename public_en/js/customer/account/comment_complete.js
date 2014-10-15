var EBE_ModuleGroup = function(){
	var navBarEls = $(".common_rightPanel .shortcutBar a");
	var moduleEls = $(".common_rightPanel .moduleGroup .module");
	moduleEls.each(function(index){
		var moduleEl = moduleEls.eq(index);
		var itemEls =  moduleEl.children(".item");
		var extraCount = 3 - itemEls.length % 3;
		for(var i=0; i < extraCount;i++){
			$("<div class='item'></div>").appendTo(moduleEl);
		}
        $("<div class='justifyFix'</div>").appendTo(moduleEl);
	});
	
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
