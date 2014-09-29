var EBE_NormalFilter = function(){
	var groupBtnsEl = $(".common_mainPanel .filterPanel .groupBar");
	var groupBtnsIconEl = groupBtnsEl.children("i");
	var contentBlockEl = $(".common_mainPanel .filterPanel .groupBar+ul");
	
	groupBtnsEl.click(function(){
		var tIndex = groupBtnsEl.index(this);
		var iconEl = groupBtnsIconEl.eq(tIndex);
		if( iconEl.hasClass("close") ){
			contentBlockEl.eq(tIndex).removeClass("close");
			iconEl.removeClass("close");
		}else{
			contentBlockEl.eq(tIndex).addClass("close");
			iconEl.addClass("close");
		}
	});
	var categoryGroupBtnsEl = $(".common_mainPanel .filterPanel .byCategory .groupRow" );
	var categoryGroupBtnsIconEl = categoryGroupBtnsEl.children("i");
	categoryGroupBtnsIconEl.mousedown(function(){
		var tIndex = categoryGroupBtnsIconEl.index(this);
		var groupEl = categoryGroupBtnsEl.eq(tIndex);
		groupEl.toggleClass("close");
		return false;
	});

	var numcheck = /\d|\./;
	var numInputEl = $(".common_mainPanel .filterPanel .byPrice input:text");
	numInputEl.keypress(function(e){
		var keynum;
		if(window.event){
		  keynum = e.keyCode;
		}else if(e.which){
		  keynum = e.which;
		}
		if(keynum==8){
			return true;
		}
		var keychar = String.fromCharCode(keynum);
		return numcheck.test(keychar);
	}).blur(function(){
		var el = numInputEl.eq( numInputEl.index(this) );
		var val = parseFloat( el.val() );
		if( isNaN(val) ||  val < 1){
			val = 0;
		}else if( val > 99999 ){
			val = 99999;
		}
		el.val( val.toFixed(2) );
	});
};
var EBE_ListItem = function(submitHandler,errorHandler,unit){
	this.submitHandler = submitHandler;
	this.errorHandler = errorHandler;
	this.unit = unit;
	this.sizeIndex = -1;
};
(function(){
	this.init = function(){
		var that = this;
		this.sizeEl.click(function(){
			var index = that.sizeEl.index( this );
			if( index == that.sizeIndex ){return;}
			if( that.sizeIndex != -1 ){
				that.sizeEl.eq(that.sizeIndex).removeClass("checked");
			}
			that.sizeIndex = index;
			that.sizeEl.eq(index).addClass("checked");
			return false;
		});
		this.submitBtnEl.click(function(){
			if( that.sizeIndex == -1 ){ 
				that.errorHandler();
				return false;
			}
			that.submitHandler( that.id, that.sizeEl.eq(that.sizeIndex).text()  );
			return false;
		});
	};
	this.buildWithEl = function(el){
		this.id = el.attr("iid");
		this.imgEl = el.find(".imgBlock>img");
		this.sizeEl = el.find(".size>span");
		this.submitBtnEl = el.find("input:button");
		this.enNameEl = el.find("h3");
		this.cnNameEl = el.find("h2");
		this.unitEl = el.find(".price>h1>i,.price>span>i");
		this.realPriceEl = el.find(".price>h1>b");
		this.otherPriceEl = el.find(".price>span>b");
		this.init();
	};
	this.buildWithData = function(data){
		this.id = data.id;
		this.el = $("<li iid='"+ data.id +"'></li>");
		var aEl = $("<a  class='contentBlock' href='"+ data.url +"'></a>").appendTo(this.el);
		tEl01 = $("<div class='imgBlock'></div>").appendTo( aEl );
		this.imgEl = $("<img src='"+ data.imgUrl +"'/>").appendTo(tEl01);
		var tEl02 = $("<div class='shoppingcar'></div>").appendTo( tEl01 );
		var tEl03 = $("<div class='size'></div>").appendTo( tEl02 );
		for(var i=0; i < data.sizes.length;i++){
			tEl03.append( $("<span>"+ data.sizes[i]+"</span>") );
		}
		this.sizeEl = tEl03.find("span");
		tEl03 = $("<div class='submitRow'></div>").appendTo(tEl02);
		this.submitBtnEl = $("<input type='button' value='加入购物车'/>").appendTo(tEl03);
		
		var descriptBlockEl = $("<div class='descriptBlock'></div>").appendTo(aEl);
		$("<h3 class='enFontFamily'>"+ data.enName+"</h3>").appendTo(descriptBlockEl);
		$("<h2>"+ data.cnName+"</h2>").appendTo(descriptBlockEl);
		var priceBlockEl = $("<div class='price'></div>").appendTo(descriptBlockEl);
		
		$("<h1 class='enFontFamily'><i>"+ this.unit+"</i><b>"+
		data.realPrice + "</b></h1><span>市场价：<i>"+ this.unit+"</i><b>"+
		data.otherPrice + "</b><span></div>").appendTo( priceBlockEl );
		this.init();
	};
}).call(EBE_ListItem.prototype);

var EBE_List = function(submitHandler,errorHandler,unit){
	this.submitHandler = submitHandler;
	this.errorHandler = errorHandler;
	this.unit = unit;
	this.totalPage = window.totalPage?window.totalPage:1;
	this.page = 1;
	this.isLoading = false;
	this.init();
};
(function(){
	this.init = function(){
		this.build();
		if( this.totalPage > 1){
			this.winEl.resize( $.proxy( this.scroll7ResizeHandler,this) );
			this.winEl.scroll( $.proxy( this.scroll7ResizeHandler,this) );
		}
	};
	this.appendData = function(data,page){
		var i,item;
		for( i=0; i < data.length ;i++){
			item = new EBE_ListItem(this.submitHandler ,this.errorHandler,this.unit);
			item.buildWithData( data[i] );
			this.el.append( item.el );
		}
		this.page = page;
		this.setIsLoading(false);
		
	};
	this.scroll7ResizeHandler = function(){
		if( this.isLoading || this.page == this.totalPage){return;}
		var offsetTop = this.el.offset().top;
		var scrollTop = this.winEl.scrollTop();
		var viewHeigth = this.winEl.height();
		var bottom = this.loadingEl.offset().top;
		
		if( scrollTop + viewHeigth > bottom + 50){
			this.setIsLoading( true );
			this.loadPageHandler( this.page + 1 );
		}
	};
	this.setIsLoading = function(val){
		this.isLoading = val;
		this.loadingEl.css("visibility",val?"visible":"hidden");
	};
	this.setLoadPageHandler = function( fn){
		this.loadPageHandler = fn;
	};
	this.build = function(){
		this.el = $(".common_mainPanel .listPanel>ul");
		this.loadingEl = $(".common_mainPanel .listPanel .loadingRow");
		this.winEl = $(window);	
		var i,item,existItemEls =  this.el.find("li");
		for( i = 0; i < existItemEls.length ;i++){
			item = new EBE_ListItem( this.submitHandler ,this.errorHandler,this.unit);
			item.buildWithEl( existItemEls.eq(i) );
		}
	};
}).call(EBE_List.prototype);

var EVE_MobileFilter = function(){
	var mobileFilterBgEl = $("<div class='mobileFilterBg'></div>").appendTo( $(".common_mainPanel .listPanel") ).hide();
	var mobileFilterPopEl= $("<div class='mobileFilterPop'></div>").appendTo( $(".common_mainPanel .listPanel") ).hide();
	var brandEl = $(".mobileFilter .brandPop").appendTo( mobileFilterPopEl ).hide();
	var colorEl = $(".mobileFilter .colorPop").appendTo( mobileFilterPopEl ).hide();
	var priceEl = $(".mobileFilter .pricePop").appendTo( mobileFilterPopEl ).hide();
	var numInputEl = priceEl.find("input:text");
	var popEls = [brandEl,colorEl,priceEl];
	var numcheck = /\d|\./;
	var isPop = false;
    var popIndex = -1;
    var navBtnEls = $(".mobileFilter li>a");
    function close(){
    	for(var i=0; i < popEls.length;i++){
    		popEls[i].hide();
    	}
    	mobileFilterBgEl.hide();
    	mobileFilterPopEl.hide();
    	popIndex = -1;
    }
    navBtnEls.click(function(){
    	var index = navBtnEls.index(this);
    	if( index == popIndex ){
    		close();
    		return;
    	}
    	mobileFilterBgEl.show();
    	mobileFilterPopEl.show();
    	if( popIndex != -1 ){
    		popEls[popIndex].hide();
    	}
    	popIndex = index;
    	popEls[popIndex].show();
    });
    mobileFilterBgEl.click(function(){
    	close();
    });
	numInputEl.keypress(function(e){
		var keynum;
		if(window.event){
		  keynum = e.keyCode;
		}else if(e.which){
		  keynum = e.which;
		}
		if(keynum==8){
			return true;
		}
		var keychar = String.fromCharCode(keynum);
		return numcheck.test(keychar);
	}).blur(function(){
		var el = numInputEl.eq( numInputEl.index(this) );
		var val = parseFloat( el.val() );
		if( isNaN(val) ||  val < 1){
			val = 0;
		}else if( val > 99999 ){
			val = 99999;
		}
		el.val( val.toFixed(2) );
	});
};

var EVE_ShoppingCarItem = function(deleteHandler){
	this.deleteHandler = deleteHandler;
};
(function(){
	this.init = function(){
		var that = this;
		this.delBtnEl.click(function(){
			that.deleteHandler(that);
		});
	};
	this.buildByEl = function(el){
		this.el = el;
		this.id = el.attr("iid");
		this.paramEl = el.find(".infoBlock>div");
		this.name = $.trim( this.paramEl.eq(0).text() ); 
		var tStr = this.paramEl.eq(3).text();
		this.count = parseInt( tStr.substr( tStr.lastIndexOf(":")+1 )  );
		tStr = this.paramEl.eq(2).text();
		this.price = parseFloat( tStr.substr( 1 )  );
		tStr = this.paramEl.eq(1).text();
		this.size = $.trim( tStr.substr(tStr.lastIndexOf(":") + 1 ) );
		this.delBtnEl = el.find(".infoBlock>a");
		this.init();
	};
	this.buildByData = function(data){
		this.id = data.id;
		this.name = $.trim( data.name );
		var tStr = data.size;
		this.size = tStr.substr( tStr.lastIndexOf(":")+1 ) ;
		tStr = data.price;
		this.price = parseFloat( tStr.substr(1) );
		tStr = data.num;
		this.count = parseInt( tStr.substr( tStr.lastIndexOf(":")+1 ) );

		this.el = $("<li iid='"+this.id+"'></li>");
		var t01El =$("<div class='imgBlock'></div>").appendTo(this.el);
		$("<img src='"+data.imgUrl +"' />").appendTo(t01El);
		t01El = $("<div class='infoBlock'>").appendTo(this.el);
		
		$("<div>"+ data.name+"</div>").appendTo( t01El );
		$("<div>"+ data.size+"</div>").appendTo( t01El );
		$("<div class='price'>"+ data.price+"</div>").appendTo( t01El );
		$("<div>"+ data.num+"</div>").appendTo( t01El );
		this.delBtnEl = $("<a href='javascript:;'>删除</a>").appendTo( t01El );
		this.paramEl = this.el.find(".infoBlock>div");

		this.init();
	};
	this.addSameGoods = function(data){
		var name = $.trim( data.name );
		var tStr = data.size;
		var size = tStr.substr( tStr.lastIndexOf(":")+1 ) ;
		tStr = data.price;
		var price = parseFloat( tStr.substr(1) );
		tStr = data.num;
		var count = parseInt( tStr.substr( tStr.lastIndexOf(":")+1 )  );
		if( name == this.name && data.id == this.id &&  size == this.size && price == this.price ){
			this.count += count;
			tStr = this.paramEl.eq(3).text();
			tStr = tStr.substring( 0, tStr.lastIndexOf(":") +1) + " " + this.count;
			this.paramEl.eq(3).text(tStr);
			return true;
		}
		return false;
	};
}).call(EVE_ShoppingCarItem.prototype);

var EVE_ShoppingCar = function(deleteHandler){
	var el = $("header .shoppingcar");
	var popWinEl = el.find(".popWin");

	el.find(".topInfoPanel a").click(function(){
		popWinEl.removeClass("open");
	});
	el.mouseenter(function(){
		popWinEl.addClass("open");
	}).mouseleave(function(){
		popWinEl.removeClass("open");
	});
	var scrollTopEl = $(".mobileSide .scrollTop");
	var html7BodyEl = $("html, body");
	scrollTopEl.click(function(){
		html7BodyEl.animate({ scrollTop: 0 }, "slow");
	});
	var sideInfoPointEl = $(".mobileSide .toShoppingcarPage i");

	var count01El = el.find(">div>span");
	var count02El = el.find(".popWin .topInfoPanel>span>b");
	var emptyInfoEl =  el.find(".popWin .borderContent .empty");
	
	var listContainerEl = el.find(".popWin .borderContent .listContainer");
	var listEl = listContainerEl.find("ul");
	
	var totalPriceRowEl = el.find(".popWin .borderContent .statsRow");
	var totalPriceEl = totalPriceRowEl.find("b:eq(1)");
	var toPayBtnEl = el.find(".popWin .borderContent .toPay");
	
	var items = [];
	var i,item,tLiEl = listEl.find("li");
	for( i=0; i < tLiEl.length ;i++){
		item = new EVE_ShoppingCarItem(delItemHandler);
		item.buildByEl( tLiEl.eq(i) );
		items.push( item );
	}
	function delItemHandler(item){
		var index = $.inArray( item , items);
		if(index==-1){return;}
		items.splice(index,1);
		item.el.remove();
		deleteHandler( item.id ,item.size );
		popWinEl.removeClass("open");		
		update();
	}
	function update(){
		if( items.length == 0 ){
			emptyInfoEl.show();
			count01El.text("0");
			count02El.text("0");
			listContainerEl.hide();
			totalPriceRowEl.hide();
			toPayBtnEl.hide();
			sideInfoPointEl.hide();
			return;
		}
		var i,item,gCount = 0,gPrice=0;
		for( i=0; i < items.length;i++ ){
			gCount += items[i].count;
			gPrice += items[i].count * items[i].price;
		}
		if( items.length < 4 ){
			listContainerEl.height( items.length * 116 -1);
			listContainerEl.removeClass("scroll");
		}else{
			listContainerEl.height( 3 * 115 );
			listContainerEl.addClass("scroll");
		}
		count01El.text( gCount );
		count02El.text( gCount );
		totalPriceEl.text(  gPrice.toFixed(2) );
		sideInfoPointEl.show();
		emptyInfoEl.hide();
		listContainerEl.show();
		totalPriceRowEl.show();
		toPayBtnEl.show();	
	}
	function addGoods( data ){
		var i,item,hasSame = false;
		for(i=0; i < items.length;i++){
			item = items[i];
			hasSame = item.addSameGoods( data);
			if( hasSame ){ break;}
		}
		if( !hasSame ){
			item = new EVE_ShoppingCarItem(delItemHandler);
			item.buildByData( data );
			listEl.append(item.el);
			items.push( item );
		}
		update();
	}
	update();
	return {"addGoods":addGoods};
};


$(function(){
	var imgs = ["l_001.jpg","l_002.jpg"];
	var countID = 10; 
	var page = 1;
	function getPageData( size ){
		var i,arr=[];
		for( i=0; i < size ;i++ ){
			arr.push({
				id:"g_" + countID,
				url:"#",
				imgUrl:"public_en/source/show/life_list/" + imgs[ countID%2 ],
				sizes:["X","M","L"],
				enName:"eve by eve`s" + countID,
				cnName:"绿野仙踪组连体泳衣" + countID,
				realPrice:"1500.00",
				otherPrice:"1500.00"
			});
			countID++;
		}
		return arr;
	}
	//--
	new EBE_NormalFilter();
	new EVE_MobileFilter();
	var shoppingCar = new EVE_ShoppingCar(function(id,size){
		console.log("删除购物车商品(商品ID/尺寸)",id,size);
		//请求服务器
	});
	var list = new EBE_List(function(id,size){
		console.log("添加到购物车(商品ID/尺寸)",id,size);
		//请求服务器
		shoppingCar.addGoods({
			id:"sc_02",
			imgUrl:"public_en/source/show/shoppingcar_001.jpg",
			name:"xxxxxx",
			size:"尺码:L",
			price:"￥ 2121",
			num:"数量:1"
		});
	},function(){
		alert("请选择尺寸");
	},"RMB");
	list.setLoadPageHandler(function(page){
		console.log("读取页面数据(页数)",page);
		//请求服务器
		list.appendData( getPageData(4) , page++ );		
	});
	
});
