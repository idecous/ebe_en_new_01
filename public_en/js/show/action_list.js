var EBE_TopActionManager = function(){
	var isOpen = false;
	var btnEl = $("header .currentPanel a");
	var actionBlock = $("header .actionBlock");
	
	btnEl.click(function(){
		if(isOpen){return;}
		actionBlock.addClass("show");
		isOpen = true;
	});
	actionBlock.mouseleave(function(){
		isOpen = false;
		actionBlock.removeClass("show");
	});
};

$(function(){
	new EBE_TopActionManager();
});
