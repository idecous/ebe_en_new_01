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

var EVE_DeleteOrderManager = function(delHandler){
	var delBtnEls = $(".common_rightPanel table a[href='javascript:;']"); 
	delBtnEls.click(function(){
		var btnEl = delBtnEls.eq( delBtnEls.index(this) );
		var orderIDColEl =  btnEl.parents("tr").children("td:eq(0)");
		delHandler( $.trim( orderIDColEl.text() ) );
	});
};

$(function(){
	new EBE_ModuleGroup();
	var delFormEl = $("form:eq(0)");
	var delInputEL = delFormEl.children("input").val("");
	new EVE_DeleteOrderManager(function(orderID){
		if ( confirm("是否删除订单："+orderID+"?") ){
			delInputEL.val(orderID);
			delFormEl.submit();			
		}
	});
});
