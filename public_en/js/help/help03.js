var EVE_PopWindowManager = function(){
	var boundEl = $(".common_help_rightPanel .common_help_contentBlock");
	var el = $(".common_help_rightPanel .common_help_contentBlock .popWindow");
	var iEl = el.find("i");
	var imgEl = el.find("img");
	
	function show(liEl){
		imgEl.attr("src", liEl.attr("largImg"));
		var boundWidth = boundEl.width();
		var windowWidth = el.width();
		var left = (boundWidth-windowWidth)/2;
		var top = liEl.offset().top - boundEl.offset().top + liEl.height() + 5;
		el.css({"left":left,top:top});
		el.addClass("show");
		var iLeft  = liEl.offset().left - boundEl.offset().left + liEl.width()/2 -  left;
		iEl.css("left",iLeft);
	}
	function hidden(){
		el.removeClass("show");
	}
	return {"show":show,"hidden":hidden};
};


var EVE_PopGoupItemManager = function(el,winManager){
	el.mouseenter(function(){
		winManager.show( el );
		
	}).mouseleave(function(){
		winManager.hidden();
	});
};

var EVE_PopGoupManager = function(el,winManager){
	var liEls = el.find("li");
	for( var i =0; i < liEls.length;i++ ){
		new EVE_PopGoupItemManager( liEls.eq(i),winManager );
	}
};

var EVE_PopManager = function(){
	var winManager = new EVE_PopWindowManager();
	var ulEls = $(".common_help_rightPanel .common_help_contentBlock ul");
	for(var i=0;i<ulEls.length;i++){
		new EVE_PopGoupManager(ulEls.eq(i),winManager);
	}
	
};


$(function(){
	new EVE_PopManager();
	
});
