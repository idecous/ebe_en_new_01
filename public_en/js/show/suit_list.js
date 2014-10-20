var EBE_List = function(totalPage,loadPageHandler){
	var winEl = $(window);	
	var el = $(".common_mainPanel .listBlock");
	var loadingEl = $(".common_mainPanel .loadingRow");
	var isLoading = false;
	var page = 1; 
	
	scroll7ResizeHandler = function(){
		if( isLoading || page == totalPage){return;}
		var offsetTop = el.offset().top;
		var scrollTop = winEl.scrollTop();
		var viewHeigth = winEl.height();
		var bottom = loadingEl.offset().top;
		if( scrollTop + viewHeigth > bottom + 20){
			setIsLoading( true );
			loadPageHandler( page + 1 );
		}
	};
	setIsLoading = function(val){
		isLoading = val;
		loadingEl.css("visibility",val?"visible":"hidden");
	};
	function appendData(data,newPage){
		var i,item;
		for( i=0; i < data.length ;i++){
			$("<li><a href='"+data[i].url+"'><img src='"+data[i].img+"'/></a></li>").appendTo(el);
		}
		page = newPage;
		setIsLoading(false);
	}
	
	
	winEl.resize(scroll7ResizeHandler).scroll(scroll7ResizeHandler);

	return {"appendData":appendData};
};



function buildPageData(size){
	var i,arr=[];
	for( i=0; i < size;i++){
		arr.push({"url":"#","img":"public_en/source/show/suit_list/001.jpg"});
	}
	return arr;
}

$(function(){
	$("body").css({"background":"url("+bgUrl+") no-repeat center top","backgroundSize":"100%"});
	
	
	var list = new EBE_List(totalPage,function(page){
		console.log("载入页面数据(页数)",page);
		//请求服务器
		list.appendData( buildPageData(12),page);
		
		
	});
	
	
	
	
});
