var EBE_ModuleGroup = function(){
	var navBarEls = $(".common_rightPanel .shortcutBar a");
	var moduleEls = $(".common_rightPanel .moduleGroup .module");
	
	navBarEls.click(function(){
		var tIndex = navBarEls.index(this);
		var navBtnEl = navBarEls.eq(tIndex);
		if( navBtnEl.hasClass("current") ){
			return;
		}
		navBarEls.removeClass("current");
		moduleEls.removeClass("current");
		navBarEls.eq(tIndex).addClass("current");
		moduleEls.eq(tIndex).addClass("current");
	});
};

var EVE_FilterManager = function(){
	var formEl = $(".common_pageContent form:eq(0)");
	var inputEls = formEl.find("input");
	var checkBoxEls = $(".common_rightPanel .filterBar div input");
	checkBoxEls.eq(0).prop("checked", inputEls.eq(0).val() == "1"?"checked":"" );
	checkBoxEls.eq(1).prop("checked", inputEls.eq(1).val() == "1"?"checked":"" );
	
	checkBoxEls.change(function(){
		var tIndex = checkBoxEls.index(this);
		var checkedBoxEl = checkBoxEls.eq( tIndex );
		inputEls.eq(tIndex).val(  checkBoxEls.eq(tIndex).prop("checked")?"1":"0"  );
		formEl.submit();
	});
};

var EVE_DeleteManager = function(delSureHandler){
	var formEl = $(".common_pageContent form:eq(1)");
	var inputEls = formEl.find("input");
	var tableDelBtnEls = $(".common_rightPanel table tbody tr td a[class='del']"); 
	tableDelBtnEls.each(function(index){
		var btnEl = tableDelBtnEls.eq(index);
		btnEl.data("url",btnEl.attr("href"));
		btnEl.attr("href","javascript:;");
	});
	
	tableDelBtnEls.click(function(){
		var btnEl = tableDelBtnEls.eq( tableDelBtnEls.index(this) );
		var orderID = $.trim( btnEl.parents("tr").find("td:eq(1)").text() );
		if( delSureHandler(orderID) ){
			window.location.href = btnEl.data("url");
		}
	});
	var mobileDelBtnEls = $(".common_mainPanel .mobileBlock ul li .bottomRow .cancel");
	mobileDelBtnEls.each(function(index){
		var btnEl = mobileDelBtnEls.eq(index);
		btnEl.data("url",btnEl.attr("href"));
		btnEl.attr("href","javascript:;");
	});
	
	mobileDelBtnEls.click(function(){
		var btnEl = mobileDelBtnEls.eq( mobileDelBtnEls.index(this) );
		var orderID = $.trim( btnEl.parents("li").find(".topRow .paramCol .No span").text() );
		if( delSureHandler(orderID) ){
			window.location.href = btnEl.data("url");
		}
	});
};

var EVE_AppendToShoppingcarManager = function(appendHandler){
	var tableAppendBtnEls = $(".common_rightPanel table tbody tr td .appendShopping "); 
	tableAppendBtnEls.click(function(){
		var btnEl = tableAppendBtnEls.eq( tableAppendBtnEls.index(this) );
		var orderID = $.trim( btnEl.parents("tr").find("td:eq(1)").text() );
		appendHandler( orderID );		
	});
	var mobileAppendBtnEls = $(".common_mainPanel .mobileBlock ul li .bottomRow .appendShopping");
	mobileAppendBtnEls.click(function(){
		var btnEl = mobileAppendBtnEls.eq( mobileAppendBtnEls.index(this) );
		var orderID = $.trim( btnEl.parents("li").find(".topRow .paramCol .No span").text() );
		appendHandler( orderID );		
	});
};

$(function(){
	new EBE_ModuleGroup();
	new EVE_FilterManager();
	new EVE_DeleteManager(function(orderID){
		return confirm("是否删除商品："+orderID+"?");
	});
	new EVE_AppendToShoppingcarManager(function(orderID){
		if( confirm("是否把商品："+orderID+" 加入购物车?") ){
			//请求服务器
			G_shoppingCar.addGoods({
				id:"sc_02",
				imgUrl:"../../public_en/source/show/shoppingcar_001.jpg",
				name:"xxxxxx",
				size:"尺码:L",
				price:"￥ 2121",
				num:"数量:1"
			});
		}
	});
});
