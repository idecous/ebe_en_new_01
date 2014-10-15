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


var EBE_GoodsPreviewNavigator = function(el,changeViewHandler){
	var navEl = el.find(".switchPanel");
	var ulEl = navEl.find("ul").show();
	var arrowEl = navEl.find(".arrow");
	var liEls = navEl.find("li");
	var imgEls = liEls.find("img");
	var uWidth = 0;
	var firstIndex = 0;
	var viewIndex = -1;
	
	var defaultIndex = 0;
	for( var i=0; i <liEls.length;i++ ){
		if( liEls.eq(i).hasClass("checked") ){
			defaultIndex = i;
			break;
		}
	}

	arrowEl.eq(1).click(function(){
		firstIndex++;
		setFirstIndex(firstIndex);
	});
	arrowEl.eq(0).click(function(){
		firstIndex--;
		setFirstIndex(firstIndex);
	});
	function resizeHandler(viewAreaWidth){
		uWidth = (viewAreaWidth-30) * 0.25;
		liEls.width( uWidth ).css("marginRight",10);
		ulEl.width( (uWidth+10)*liEls.length );
		navEl.height( imgEls.eq(0).height() );
		setFirstIndex( firstIndex );
	}
	function setFirstIndex(val){
		firstIndex = val;
		if( firstIndex == 0 ){
			arrowEl.eq(0).hide();
		}else if(  liEls.length > 4 ){
			arrowEl.eq(0).show();
		}
		if( liEls.length > 4){
			if( firstIndex >= liEls.length-4 ){
				arrowEl.eq(1).hide();
			}else{
				arrowEl.eq(1).show();
			}
		}
		ulEl.css("left", -firstIndex * (uWidth+10) );
	}
	function setViewIndex(val){
		if( viewIndex == val){
			return;
		}
		viewIndex = val;
		liEls.removeClass("checked");
		liEls.eq(viewIndex).addClass("checked");
		if( val - firstIndex > 3){
			setFirstIndex( val - firstIndex - 3);	
		}
	}
	liEls.mouseenter(function(){
		var index = liEls.index(this);
		if(viewIndex == index){return;}
		setViewIndex(index);
		changeViewHandler(viewIndex);
	});
	
	return {"resizeHandler":resizeHandler,
	"setViewIndex":setViewIndex,"defaultIndex":defaultIndex,
	"el":navEl};
};

var EBE_GoodsPreview = function(levelCount){
	var winEl = $(window);
	var documentEl = $(document);
	var el = $(".common_mainPanel .detailPanel .leftBlock .goodsPreview");
	var imgEl = el.find("img");
	var imgTotal = imgEl.length;
	var imgLoaded = 0;
	imgEl.each(function(){
		if( this.complete ){
			imgLoaded++;
		}else{
			this.onload = imgCompletedHandler;
		}
	});
	function imgCompletedHandler(){
		imgLoaded++;
		if(imgLoaded == imgTotal){init();}
	}
	
	var i,navigator;
	var mainViewBgEl = el.find(".mainView .holder"); 	
	var navBgEl = el.find(".switchPanel .holder"); 
	var mouseAreaEl = el.find(".mouseArea");
	var toolGroupEl = el.find(".toolBlock");
	var mainOrgWidth =0;
	var mainOrgHeight =0;
	var scaleLevel = 1;
	var centers = [];
	var viewAreaWidth = 0;
	var viewAreaHeight = 0;
	var isFirst = true;
	var viewIndex = -1;
	var mainVewImgEls = el.find(".groupContainer img");
	var mainVewCenterEl = el.find(".groupContainer .center");
	//--
	if(imgLoaded == imgTotal){init();}
	function init(){
		el.find(".groupContainer").removeClass("loading");
		navigator = new EBE_GoodsPreviewNavigator(el,setViewIndex);
		var tImg = mainVewImgEls.eq(0);
		tImg.css({"width":"auto","height":"auto" });
		mainOrgWidth = tImg.width();	
		mainOrgHeight = tImg.height();
		resizeHandler();
		el.mouseenter(function(){
			if( navigator.el.is(":hidden") ){return;} 
			mouseAreaEl.show();		
			toolGroupEl.show();
		}).mouseleave(function(){
			if( navigator.el.is(":hidden") ){return;} 
			mouseAreaEl.hide();
			toolGroupEl.hide();
		});
		
		toolGroupEl.children(".zoomOut").click(zoomOutHandler);
		toolGroupEl.children(".zoomIn").click(zoomInHandler);
		toolGroupEl.children(".reset").click(zoomResetHandler);
		mouseAreaEl.mousedown( startDragHandler );
		
		mouseAreaEl.bind("mousedown touchstart",touchstartHandler);
		documentEl.bind("mouseup touchend", touchendHandler );
		
		winEl.resize(function(){
			resizeHandler();
		});
	}
	var isTouch = false;
	var touchX = 0;
	function touchstartHandler(e){
		if( navigator.el.is(":visible") ){return;} 
		isTouch = true;
		var touch = null;
		if( e.originalEvent.touches || e.originalEvent.changedTouches){
			touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		}
		if( touch ){
			e.pageX = touch.pageX;
		}
		touchX = e.pageX;
		if (window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
        } else if (this.el.setCapture) {
           el[0].setCapture();
        }  
	}
	function touchendHandler(e){
		if( !isTouch ){ return; }
		isTouch = false;
		var touch = null;
		if( e.originalEvent.touches || e.originalEvent.changedTouches){
			touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		}
		if( touch ){
			e.pageX = touch.pageX;
		}
		var offsetX =  touchX - e.pageX;
		if( Math.abs(offsetX) < 50 ){
			return;
		}
		var index =  viewIndex + (offsetX<0?1:-1);
		if(index<0){index=mainVewImgEls.length-1;}
		if( index >= mainVewImgEls.length ){
			index = 0;
		}
		setViewIndex(index);
		if (window.releaseEvents) {
            window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP);
        } else if (this.el.releaseCapture) {
            el[0].releaseCapture();
        } 
	}
	var pageStartX,pageStartY,dragCenterX,dragCenterY;
	var dragImgWidht,dragImgHeight;
	function startDragHandler(e){
		if( navigator.el.is(":hidden") ){return true;} 
		
		documentEl.bind("mousemove", dragHandler);
        documentEl.bind("mouseup", endDragHandler );
		if (window.captureEvents) {
            window.addEventListener(Event.MOUSEMOVE, null, true);
            window.addEventListener(Event.MOUSEUP, null, true);
        } else if (this.mouseAreaEl[0].setCapture) {
            this.mouseAreaEl[0].setCapture();;
        }
        pageStartX = e.pageX;
        pageStartY = e.pageY;
        dragCenterX = parseFloat(  mainVewCenterEl.css("left") );
        dragCenterY = parseFloat(  mainVewCenterEl.css("top") );

        dragImgWidht = mainVewImgEls.eq(viewIndex).width() ;
        dragImgHeight = mainVewImgEls.eq(viewIndex).height();
        
        mainVewCenterEl.removeClass("anime");
		return false;
	}
	function dragHandler(e){
		var tX = e.pageX - pageStartX + dragCenterX;
		if( tX - dragImgWidht/2 > 0){
			tX = dragImgWidht/2; 
		}
		if( tX + dragImgWidht/2 < viewAreaWidth){
			tX = viewAreaWidth - dragImgWidht/2;
		}
		var tY = e.pageY - pageStartY + dragCenterY;
		if( tY - dragImgHeight/2 > 0){
			tY = dragImgHeight/2; 
		}
		if( tY + dragImgHeight/2 < viewAreaHeight){
			tY = viewAreaHeight - dragImgHeight/2;
		}
		mainVewCenterEl.css( {"left":tX,"top":tY} );
		
		centers[0] = tX / viewAreaWidth;
		centers[1] = tY / viewAreaHeight;
	}
	function endDragHandler(e){
		documentEl.unbind();
        if (window.releaseEvents) {
            window.removeEventListener(Event.MOUSEMOVE, null, true);
            window.removeEventListener(Event.MOUSEUP, null, true);
        } else if (this.mouseAreaEl[0].releaseCapture) {
            this.mouseAreaEl[0].releaseCapture();
        }	
        mainVewCenterEl.addClass("anime");
	}
	
	function zoomOutHandler(){
		if( scaleLevel == 0){return;}
		mainVewImgEls.eq(viewIndex).addClass("anime");
		mainVewCenterEl.eq(viewIndex).addClass("anime");
		scaleLevel--;
		var rate = minScale + (1-minScale)/levelCount * scaleLevel;
		mainVewImgEls.eq(viewIndex).width( rate*mainOrgWidth ).css({"left":-rate*mainOrgWidth/2 ,"top":-rate*mainOrgHeight/2 });
		_moveCenterHandler(rate);
	}
	function zoomInHandler(){
		if( scaleLevel >= levelCount){return;}
		mainVewImgEls.eq(viewIndex).addClass("anime");
		mainVewCenterEl.eq(viewIndex).addClass("anime");
		scaleLevel++;
		var rate = minScale + (1-minScale)/levelCount *scaleLevel;
		mainVewImgEls.eq(viewIndex).width( rate*mainOrgWidth ).css({"left":-rate*mainOrgWidth/2 ,"top":-rate*mainOrgHeight/2 });
	}
	function zoomResetHandler(){
		mainVewImgEls.eq(viewIndex).addClass("anime");
		mainVewCenterEl.eq(viewIndex).addClass("anime");
		scaleLevel = 0;
		mainVewImgEls.eq(viewIndex).width( minScale*mainOrgWidth ).css({"left":-minScale*mainOrgWidth/2 ,"top":-minScale*mainOrgHeight/2 });
		_moveCenterHandler(minScale);
	}
	function _moveCenterHandler(rate){
		var imgWidth = rate*mainOrgWidth;
		var imgHeight = rate*mainOrgHeight;
		var tX = centers[0] * viewAreaWidth;
		if( tX - imgWidth/2 > 0){
			tX = imgWidth/2; 
		}
		if( tX + imgWidth/2 < viewAreaWidth){
			tX = viewAreaWidth - imgWidth/2;
		}
		var tY = centers[1] * viewAreaHeight;
		if( tY - imgHeight/2 > 0){
			tY = imgHeight/2; 
		}
		if( tY + imgHeight/2 < viewAreaHeight){
			tY = viewAreaHeight - imgHeight/2;
		}
		mainVewCenterEl.css( {"left":tX,"top":tY} );
		centers[0] = tX / viewAreaWidth;
		centers[1] = tY / viewAreaHeight;
	}

	function resizeHandler(){
		mainVewImgEls.removeClass("anime");
		mainVewCenterEl.removeClass("anime");
		minScale =  mainViewBgEl.width() / mainOrgWidth;
		viewAreaWidth = mainViewBgEl.width();
		viewAreaHeight = mainViewBgEl.height();
		if( isFirst ){
			scaleLevel = 0;
			centers = [ 0.5 , 0.5 ];			
			isFirst = false;
			mainVewImgEls.width(minScale * mainOrgWidth).css({"left":-viewAreaWidth/2,"top":-viewAreaHeight/2}).addClass("anime");
			mainVewCenterEl.css( {"left":viewAreaWidth*0.5 ,"top":viewAreaHeight*0.5 } );
			setViewIndex( navigator.defaultIndex );
			navigator.resizeHandler(viewAreaWidth);
			navigator.setViewIndex(  navigator.defaultIndex );
			return;
		}
		var rate = minScale + (1-minScale)/levelCount * scaleLevel;
		mainVewImgEls.width( rate*mainOrgWidth ).css({"left":-rate*mainOrgWidth/2 ,"top":-rate*mainOrgHeight/2 });
		_moveCenterHandler(rate);
		navigator.resizeHandler(viewAreaWidth);
	}
	function setViewIndex(index){
		if(viewIndex == index ){return;}
		mainVewImgEls.removeClass("anime");
		mainVewCenterEl.removeClass("anime");
		if( viewIndex != -1){
			mainVewImgEls.eq(viewIndex).addClass("anime").css("zIndex",2);
			mainVewImgEls.eq(viewIndex).removeClass("current");
		}
		viewIndex = index;
		var rate = minScale + (1-minScale)/levelCount * scaleLevel;
		mainVewImgEls.eq(viewIndex).width( rate*mainOrgWidth ).css({"left":-rate*mainOrgWidth/2 ,"top":-rate*mainOrgHeight/2 });
		mainVewImgEls.eq(viewIndex).addClass("current").css("zIndex",0);
	}	
};

var EBE_GoodsParameter = function(sizeWarn,submitHandler,favoritesHandler){
	var html7BodyEl = $("html, body");
	var sizeDataTitleEl = $(".common_mainPanel .sizeDataPanel h3");
	var el = $(".common_mainPanel .detailPanel .rightBlock .paramPanel");
	el.find(".sizeGroup .toData a").click(function(){
		html7BodyEl.animate({ scrollTop: sizeDataTitleEl.offset().top });	
	});
	var contentIndex = 0;
	var contentBtnEl = el.find(".messageBlock .tabBar li");
	var contentLiEl = el.find(".messageBlock .contentBlock li");
	contentBtnEl.click(function(){
		var tIndex = contentBtnEl.index(this);
		if(contentIndex == tIndex){return;}
		if( contentIndex != -1 ){
			contentBtnEl.eq(contentIndex).removeClass("checked");
			contentLiEl.eq(contentIndex).removeClass("checked");
		}
		contentIndex = tIndex;
		contentBtnEl.eq(contentIndex).addClass("checked");
		contentLiEl.eq(contentIndex).addClass("checked");
	});
	var priceEl = el.find("h3 b");
	var sizeIndex = -1;
	var priceEls = el.find(".sizeGroup .list a");
	for(var i=0; i < priceEls.length;i++){
		if( priceEls.eq(i).hasClass("checked")  ){
			sizeIndex = i;
			priceEl.text(  priceEls.eq(sizeIndex).attr("price") );
			break;
		}
	}
	priceEls.click(function(){
		var tIndex = priceEls.index(this);
		if(sizeIndex == tIndex){return;}
		if( sizeIndex != -1 ){
			priceEls.eq(sizeIndex).removeClass("checked");
		}
		sizeIndex = tIndex;
		priceEls.eq(sizeIndex).addClass("checked");
		priceEl.text(  priceEls.eq(sizeIndex).attr("price") );
	});
	el.find(".appendShopping a span").click(appendGoodsHandler);
	el.find(".appendShopping a i").click(favoritesHandler);
	//--
	var messageBlockEl = el.find(".messageBlock");
	var mobileMessageEl = $("<div class='mobile_paramMessage'></div>");
	$(".common_mainPanel .detailPanel .shapeBar").after(mobileMessageEl);
	var messageTitleEls = messageBlockEl.find(".tabBar li");
	var messageContentEls = messageBlockEl.find(".contentBlock li");
	var sizeBlock = $(".common_mainPanel .sizeDataPanel");
	
	var titleEl = $("<div class='subTitle'></div>").appendTo(mobileMessageEl);
	var contentEl = $("<div class='content'></div>").appendTo(mobileMessageEl);
	
	titleEl.append( sizeBlock.find("h3").clone() );
	contentEl.append( sizeBlock.find("img").clone() );

	for(var i=0;i<messageTitleEls.length;i++){
		titleEl = $("<div class='subTitle'></div>").appendTo(mobileMessageEl);
		contentEl = $("<div class='content'></div>").appendTo(mobileMessageEl);
		
		titleEl.text(  messageTitleEls.eq(i).text() );
		contentEl.append( messageContentEls.eq(i).children().clone() );
	}
	
	var appendShoppingcarEl = $("<a class='appendShopping' href='javascript:;'>加入购物袋</a>").appendTo(mobileMessageEl);
	appendShoppingcarEl.click(appendGoodsHandler);

	function appendGoodsHandler(){
		if( sizeIndex == -1){
			alert( sizeWarn );
		}else{
			submitHandler( priceEls.eq(sizeIndex).text() ,priceEls.eq(sizeIndex).attr("iid")  );
		}
	}
};

var EBE_ElementRow = function(el){
	var el = el;
	var rightBlockEl = el.find(".rightBlock");
	var itemsBlockEl = rightBlockEl.find(".itemsBlock");
	var arrowEl = itemsBlockEl.find(".arrow");
	var ulEl = rightBlockEl.find("ul");
	var liEl = ulEl.find("li");
	var liCount = liEl.length;
	var liWidth = 0;
	var firstIndex = 0;
	if( liCount > 4){
		var fItem = liEl.eq(0);
		var lItem = liEl.eq(liCount-1);
		fItem.before( lItem.clone() );
		lItem.after( fItem.clone() );
		liEl = ulEl.find("li");
	}
	arrowEl.click(function(){
		if( ulEl.is(":animated") ){
			return;
		}
		var tIndex = arrowEl.index(this);
		firstIndex += (tIndex==0?-1:1);
		ulEl.animate({"left":-(firstIndex+1) * (liWidth+40) },"normal",function(){
			setIndex(firstIndex);
		});
	});
	function setIndex(val ){
		ulEl.stop();
		firstIndex = val;
		if(liCount <= 4){
			arrowEl.hide();
			return;
		}
		if( val == 0){
			arrowEl.eq(0).hide();
		}else{
			arrowEl.eq(0).show();
		}
		if( val >= liCount-4){
			arrowEl.eq(1).hide();
		}else{
			arrowEl.eq(1).show();
		}
		ulEl.css("left", -(firstIndex+1) * (liWidth+40)  );	
	}
	function resizeHandler(h){
		el.height( h );
		rightBlockEl.height( h );
		liWidth = (itemsBlockEl.width()- 40*3)/4;
		ulEl.width( (liWidth+40) * (liCount +2)  );
		liEl.width( liWidth );
		setIndex(firstIndex);
	}
	var _isOver = false;
	
	return {"resizeHandler":resizeHandler};
};
var EBE_ElementNav = function(el,total,changeHandler){
	var index = 0;
	for(var i=0; i < total;i++){
		$("<a href='javascript:;'></a>").appendTo(el);
	}
	var btnEls = el.find("a");
	btnEls.click(function(){
		var tIndex = btnEls.index(this);
		if(tIndex == index){return;}
		
		changeHandler(tIndex);
	});
	
	function setIndex(val){
		index = val;
		btnEls.removeClass("selected");
		btnEls.eq(index).addClass("selected");
	}
	setIndex(index);
	
	return {"setIndex":setIndex};
};
var EBE_ElementGroup = function(){
	var winEl = $(window);
	var el =  $(".common_mainPanel .elementPanel");
	var switchPanelEl = el.find(".switchPanel");	
	var i,row,rows=[];
	var ulEl = switchPanelEl.find(".rowBlock");
	var rowEls = ulEl.children("li");
	var rowCount = rowEls.length;
	var rowHeight = 0;
	var viewIndex = 0;
	var bgEl = switchPanelEl.find(".holder");
	var nav,timer=-1;
	
	function init(){
		if( rowCount > 1 ){
			var fItem = rowEls.eq(0);
			var lItem = rowEls.eq(rowCount-1);
			fItem.before( lItem.clone() );
			lItem.after( fItem.clone() );
			rowEls = ulEl.find("li");
			nav = new EBE_ElementNav( $(".common_mainPanel .elementPanel .navBar") ,rowCount ,indexChangeHandler);
				animaPosByAuto();
		}
		for(i=0; i < rowEls.length;i++){
			row = new EBE_ElementRow( rowEls.eq(i) );
			rows.push(row);
		}
		resizeHandler();
		winEl.resize(resizeHandler);	
	}
	function indexChangeHandler(val){
		if( ulEl.is(":animated") ){
			return;
		}
		animaPosByIndex(viewIndex,val);
	}
	function animaPosByIndex(startIndex,endIndex){
		clearTimeout(timer);
		ulEl.stop();
		viewIndex = endIndex;
		nav.setIndex( endIndex );
		var curY = parseInt( ulEl.css("top") );
		ulEl.animate({"top":  curY - (endIndex-startIndex)* rowHeight },500* Math.abs(endIndex-startIndex),function(){
			ulEl.css("top", -(1 + viewIndex%rowCount) * rowHeight );
			animaPosByAuto();
		});
	}
	function animaPosByAuto(){
		clearTimeout(timer);
		ulEl.stop();
		timer = setTimeout(function(){
			if( switchPanelEl.is(":hidden") ){
				animaPosByAuto();
				return;
			}
			viewIndex = (viewIndex+1) % rowCount;
			nav.setIndex( viewIndex );
			var curY = parseInt( ulEl.css("top") );
			ulEl.animate({"top":  curY - rowHeight },500,function(){
				ulEl.css("top", -(1 + viewIndex%rowCount) * rowHeight );
				animaPosByAuto();
			});
		},5000);
	}
	function setIndex(val ){
		animaPosByAuto();
		viewIndex = val;
		ulEl.css("top", -(viewIndex+1) * rowHeight );
	}
	function resizeHandler(){
		rowHeight = bgEl.height();
		for(i=0; i < rows.length;i++){
			rows[i].resizeHandler(rowHeight );
		}	
		setIndex(viewIndex);
	}

	if( bgEl.attr("complete") ){
		init();
	}else{
		bgEl[0].onload = init;
	} 
};
var EBE_RecommendPanel = function(){
	var winEl = $(window);
	var el = $(".common_mainPanel .recommendPanel .contentBlock");
	var ulEl =  el.find("li");
	resizeHandler();
	winEl.resize(resizeHandler);	
	
	function resizeHandler(){
		var elWidth = el.width();
		var liW = (elWidth- 26.66*3)/4;
		ulEl.width(liW);	
	}
};
$(function(){
	new EBE_GoodsPreview(2);
	new EBE_ElementGroup();	
	new EBE_RecommendPanel();
	new EBE_GoodsParameter("请选择尺寸！",function(size,sizeID){
		console.log("添加到购物车(尺寸/尺寸ID)",size,sizeID);
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
		console.log("添加到收藏");
		
	});
	var shoppingCar = new EVE_ShoppingCar(function(id,size){
		console.log("删除购物车商品(商品ID/尺寸)",id,size);
		//请求服务器
	});
	
});
