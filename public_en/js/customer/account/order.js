var EBE_ModuleGroup = function(){
	var navBarEls = $(".common_rightPanel .shortcutBar a");
	var moduleEls = $(".common_rightPanel .moduleGroup .module");
	
	moduleEls.each(function(index){
		var moduleEl = moduleEls.eq(index);
		var itemEls =  moduleEl.children(".item");
		var extraCount = 3 - itemEls.length % 3;
		for(var i=0; i < extraCount;i++){
			$("<div class='item'></div>").appendTo(moduleEl);
		}
        $("<div class='justifyFix'</div>").appendTo(moduleEl);
	});
	
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
var EVE_DeleteOrderManager = function(delHandler){
	var tableDelBtnEls = $(".common_rightPanel table .del");
	tableDelBtnEls.each(function(index){
		var btnEl = tableDelBtnEls.eq(index);
		btnEl.data("url",btnEl.attr("href"));
		btnEl.attr("href","javascript:;");
	});
	tableDelBtnEls.click(function(){
		var btnEl = tableDelBtnEls.eq( tableDelBtnEls.index(this) );
		var orderIDColEl =  btnEl.parents("tr").children("td:eq(0)");
		if( delHandler( $.trim(orderIDColEl.text()) ) ){
			window.location.href = btnEl.data("url");
		}
	});	
	var mobileDelBtnEls = $(".mobileBlock ul .del"); 
	mobileDelBtnEls.each(function(index){
		var btnEl = mobileDelBtnEls.eq(index);
		btnEl.data("url",btnEl.attr("href"));
		btnEl.attr("href","javascript:;");
	});
	mobileDelBtnEls.click(function(){
		var btnEl = mobileDelBtnEls.eq( mobileDelBtnEls.index(this) );
		var orderIDColEl =  btnEl.parents("li").find(".row01  span");
		if( delHandler( $.trim(orderIDColEl.text()) ) ){
			window.location.href = btnEl.data("url");
		}
	});
};
var EVE_RemindManager = function(delHandler){
	var tableDelBtnEls = $(".common_rightPanel table .remind");
	tableDelBtnEls.each(function(index){
		var btnEl = tableDelBtnEls.eq(index);
		btnEl.data("url",btnEl.attr("href"));
		btnEl.attr("href","javascript:;");
	});
	tableDelBtnEls.click(function(){
		var btnEl = tableDelBtnEls.eq( tableDelBtnEls.index(this) );
		var orderIDColEl =  btnEl.parents("tr").children("td:eq(0)");
		if( delHandler( $.trim(orderIDColEl.text()) ) ){
			window.location.href = btnEl.data("url");
		}
	});	
	var mobileDelBtnEls = $(".mobileBlock ul .remind"); 
	mobileDelBtnEls.each(function(index){
		var btnEl = mobileDelBtnEls.eq(index);
		btnEl.data("url",btnEl.attr("href"));
		btnEl.attr("href","javascript:;");
	});
	mobileDelBtnEls.click(function(){
		var btnEl = mobileDelBtnEls.eq( mobileDelBtnEls.index(this) );
		var orderIDColEl =  btnEl.parents("li").find(".row01 span");
		if( delHandler( $.trim(orderIDColEl.text()) ) ){
			window.location.href = btnEl.data("url");
		}
	});
};
var EVE_ReceivingManager = function(delHandler){
	var tableDelBtnEls = $(".common_rightPanel table .receiving");
	tableDelBtnEls.each(function(index){
		var btnEl = tableDelBtnEls.eq(index);
		btnEl.data("url",btnEl.attr("href"));
		btnEl.attr("href","javascript:;");
	});
	tableDelBtnEls.click(function(){
		var btnEl = tableDelBtnEls.eq( tableDelBtnEls.index(this) );
		var orderIDColEl =  btnEl.parents("tr").children("td:eq(0)");
		if( delHandler( $.trim(orderIDColEl.text()) ) ){
			window.location.href = btnEl.data("url");
		}
	});	
	var mobileDelBtnEls = $(".mobileBlock ul .receiving"); 
	mobileDelBtnEls.each(function(index){
		var btnEl = mobileDelBtnEls.eq(index);
		btnEl.data("url",btnEl.attr("href"));
		btnEl.attr("href","javascript:;");
	});
	mobileDelBtnEls.click(function(){
		var btnEl = mobileDelBtnEls.eq( mobileDelBtnEls.index(this) );
		var orderIDColEl =  btnEl.parents("li").find(".row01 span");
		if( delHandler( $.trim(orderIDColEl.text()) ) ){
			window.location.href = btnEl.data("url");
		}
	});
};
$(function(){
	new EBE_ModuleGroup();
	
	new EVE_DeleteOrderManager(function(orderID){
			return confirm("是否删除订单："+orderID+"?"); 
		});
	new EVE_RemindManager(function(orderID){
			return confirm("是否提醒订单："+orderID+" 发货?"); 
	});
	new EVE_ReceivingManager(function(orderID){
		return confirm("订单："+orderID+" 收货确认?"); 
	});
});
