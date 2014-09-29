var MobileMenu = function(){
	var menuEl = $(".common_moblieNav");
	if( menuEl.length == 0 ){return;}
	var menuOpenBtnEl = $(".common_mobile_topMenuBtn .open") ;
	var menuCloseBtnEl = $(".common_mobile_topMenuBtn .close");
	var pageContentEl = $(".common_pageContent");
	menuCloseBtnEl.hide();
	function closeHandler(){
		menuOpenBtnEl.show();
		menuCloseBtnEl.hide();
		menuEl.css("left","-100%");
		pageContentEl.removeClass("mobileOpen");
	}
	menuOpenBtnEl.click(function(){
		menuOpenBtnEl.hide();
		menuCloseBtnEl.show();
		menuEl.css("left",0);
		pageContentEl.addClass("mobileOpen");
		
		pageContentEl.one("mousedown",closeHandler);
	});
};
$(function(){
	new MobileMenu();
	
	
	
});
