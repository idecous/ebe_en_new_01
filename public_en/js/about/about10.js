var EVE_TabManager = function(){
	var index = 0;
	var tabEls = $(".departmentBar a");
	var liEls = $(".common_help_contentBlock ul li");
	
	tabEls.click(function(){
		var tIndex = tabEls.index(this);
		if(index == tIndex){return;}
		index = tIndex;
		tabEls.removeClass("current");
		liEls.hide();
		tabEls.eq(index).addClass("current");
		liEls.eq(index).show();
	});
};

$(function(){
	new EVE_TabManager();	
});
