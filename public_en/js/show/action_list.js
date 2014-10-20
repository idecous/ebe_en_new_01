var EBE_TopActionManager = function(){
	var isOpen = false;
	var popBtnEl = $("header .mainNavBar .checked");
	var actionBlock = $("header .actionBlock");

	popBtnEl.mouseenter(function(){
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
