$(function(){
	var typeIndex = 0;
	var types = ["desktop","tablet-landscape","tablet-portrait","smartphone-landscape","smartphone-portrait"];
	var windowEl = $(window);
	var iFrameBlockEl = $("#iFrameBlock").show();

	var switchTypeBtnsEl = $("header>ul>li");
	switchTypeBtnsEl.click(function(){
		var index = switchTypeBtnsEl.index(this);
		if(typeIndex == index){return;}
		iFrameBlockEl.removeClass( types[typeIndex] );
		switchTypeBtnsEl.eq(typeIndex).removeClass("current");
		typeIndex = index;
		switchTypeBtnsEl.eq(typeIndex).addClass("current");		
		iFrameBlockEl.addClass( types[typeIndex]  );
	});
	
	var urlBtnEls = $("header>.urlBlock>a");
	var iframeEl = $("iframe");
	var urls = [];
	var urlIndex = -1;
	urlBtnEls.each(function(index,node){
		urls[index] = node.href;
		node.href = "javascript:;";
		if(urlIndex == -1 && urlBtnEls.eq(index).hasClass("current") ){
			urlIndex = index;
		}
	});
	if(urlIndex==-1){
		urlIndex = 0;
		urlBtnEls.eq(0).addClass("current");
	}
	iframeEl.prop("src",urls[urlIndex] + "?"+ (new Date().getTime()) );
	
	urlBtnEls.click(function(){
		var index = urlBtnEls.index(this);
		if(urlIndex == index){return;}
		urlBtnEls.eq(urlIndex).removeClass("current");
		urlIndex = index;
		urlBtnEls.eq(urlIndex).addClass("current");
		iframeEl.prop("src",urls[urlIndex] + "?"+ (new Date().getTime()) );
	});
	
	function windowResizeHandler(){
		iFrameBlockEl.height( parseInt( window.innerHeight ) - 62 );
	}
	windowResizeHandler();
	var windowResizeTimeID = 0;
	windowEl.resize(function(){
		clearTimeout(windowResizeTimeID);
		windowResizeTimeID = setTimeout( windowResizeHandler,100);
	});
});





