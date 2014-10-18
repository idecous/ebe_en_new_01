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

var EBE_TopSwitchView = function(holderEl,el){
	if( el.length == 0 ){return;}
	var i;
	var index = 0;
	var isInit = false;
	var timer = -1;
	var ulEl = el.find("ul");
	var liEl = el.find("li");
	var liCount = liEl.length;
	var liWidth = 0;
	var liHeight = 0;
	var navPanelEl = $("<div class='withchNavPanel'></div>") ;//$("<div class='navPanel'></div>").appendTo(el)
	
	 el.after( navPanelEl);
	var navBtnEl;
	if( liCount > 1 ){
		var firstLiEl = liEl.eq(0);
		var lastLiEl = liEl.eq( liCount-1 );
		firstLiEl.before( lastLiEl.clone() );
		lastLiEl.after( firstLiEl.clone() );
		liEl = ulEl.children("li");
		for(i=0;i<liCount;i++){
			$("<a href='javascript:;'>&nbsp;</a>").appendTo(navPanelEl);
		}
		navBtnEl = navPanelEl.find("a");
		navBtnEl.click( navLiClickHandler );
	}
	function updateSize(){
		if( !isInit || el.length == 0 ){return;}
		clearTimeout( timer );
		ulEl.stop();
		liWidth = holderEl.width();
		var allHeigth = holderEl.height();
		liHeight = allHeigth ;
		el.height(allHeigth);
		ulEl.width( liWidth *  (liCount +2 ) ).height(liHeight);
		liEl.width(liWidth).height(liHeight);
		if( liCount < 2){return;}
		setPosByIndex(index);
		animaPosByAuto();
	}
	function setPosByIndex(val){
		index = val;
		ulEl.css("left", -(1+ index%liCount) * liWidth );
		navBtnEl.removeClass("selected");
		navBtnEl.eq(index).addClass("selected");
	}
	function navLiClickHandler(){
		var tIndex = navBtnEl.index(this);
		if( index == tIndex ){return;}
		animaPosByIndex( index,tIndex);
	}
	function animaPosByIndex(startIndex,endIndex){
		clearTimeout(timer);
		ulEl.stop();
		index = endIndex;
		navBtnEl.removeClass("selected");
		navBtnEl.eq(index).addClass("selected");
		var curX = parseInt( ulEl.css("left") );
		ulEl.animate({"left":  curX - (endIndex-startIndex)* liWidth },500* Math.abs(endIndex-startIndex),function(){
			ulEl.css("left", -(1 + index%liCount) * liWidth );
			animaPosByAuto();
		});
	}
	function animaPosByAuto(){
		clearTimeout(timer);
		ulEl.stop();
		timer = setTimeout(function(){
			index = (index+1) % liCount;
			navBtnEl.removeClass("selected");
			navBtnEl.eq( index ).addClass("selected");
			var curX = parseInt( ulEl.css("left") );
			ulEl.animate({"left":  curX - liWidth },500,function(){
				ulEl.css("left", -(1 + index%liCount) * liWidth );
				animaPosByAuto();
			});
		},5000);
	}
	$(window).resize(function(){
		updateSize();
	});
	if( holderEl.prop("complete") ){
		isInit = true;
		updateSize();
	}else{
		holderEl.load(function(){
			isInit = true;
			updateSize();
		});
	}
};
var EBE_BottomElementManager = function(){
	var ulEl = $(".common_mainPanel .elementPanel");
	var liEl = ulEl.find("li");
	if( liEl.length == 0){return;}
	var extraCount = 4 - liEl.length%4; 
	for(var i=0;i<extraCount;i++){
		$("<li class='empty'></li>").appendTo(ulEl);
	}
	$("<li class='justifyFix'></li>").appendTo(ulEl);
};
$(function(){
	new EBE_TopSwitchView($("header .top_switchPlaceholder"),$(".topSwitchViewBlock") );
	new EBE_BottomElementManager();
	var shoppingCar = new EVE_ShoppingCar(function(id,size){
		console.log("删除购物车商品(商品ID/尺寸)",id,size);
		//请求服务器
	});
	
});



