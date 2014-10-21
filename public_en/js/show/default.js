var EVE_MobileMenu = function(){
	var menuEl = $(".common_moblieNav");
	if( menuEl.length == 0 ){return;}
	var menuOpenBtnEl = $(".common_mobile_topMenuBtn .open") ;
	var menuCloseBtnEl = $(".common_mobile_topMenuBtn .close");
	var pageContentEl = $(".common_pageContent");
	var fixedEl = $("header .fixed");
	
	menuCloseBtnEl.hide();
	function closeHandler(){
		menuOpenBtnEl.show();
		menuCloseBtnEl.hide();
		menuEl.css("left","-100%");
		pageContentEl.removeClass("mobileOpen");
		fixedEl.removeClass("common_fixedWidth");
	}
	menuOpenBtnEl.click(function(){
		menuOpenBtnEl.hide();
		menuCloseBtnEl.show();
		menuEl.css("left",0);
		pageContentEl.addClass("mobileOpen");
		fixedEl.addClass("common_fixedWidth");
		
		
		pageContentEl.one("mousedown",closeHandler);
	});
};
$(function(){
	new EVE_MobileMenu();
	
	
	
});
