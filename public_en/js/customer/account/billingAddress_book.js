var EBE_SetDefaultManager = function( setDefaultHandler ){
	var formEl = $(".common_pageContent form:eq(0)");
	var inputEl = formEl.find("input");
	var setBtnEls = $(".common_rightPanel table tbody a.default");
	
	setBtnEls.click(function(){
		var rowEl = setBtnEls.eq( setBtnEls.index(this) ).parents("tr");
		var address = $.trim( rowEl.find("td:eq(2)").text() );
		var id = $.trim( rowEl.find("td:eq(0)").text() );
		
		if( setDefaultHandler(address) ){
			inputEl.val( id );
			formEl.submit();
		}
	});
	
	var mobileSetBtnEls = $(".common_mainPanel .mobileBlock ul li .operationRow .default");
	mobileSetBtnEls.click(function(){
		var rowEl = mobileSetBtnEls.eq( mobileSetBtnEls.index(this) ).parents("li");
		var address = $.trim( rowEl.find("div:eq(0) p").text() );
		var id = $.trim( rowEl.attr("iid") );
		if( setDefaultHandler(address) ){
			inputEl.val( id );
			formEl.submit();
		}	
	});
};
var EBE_DeleteManager = function(delHandler){
	var formEl = $(".common_pageContent form:eq(1)");
	var inputEl = formEl.find("input");
	var delBtnEls = $(".common_rightPanel table tbody a.del");
	delBtnEls.click(function(){
		var rowEl = delBtnEls.eq( delBtnEls.index(this) ).parents("tr");
		var address = $.trim( rowEl.find("td:eq(2)").text() );
		var id = $.trim( rowEl.find("td:eq(0)").text() );
		if( delHandler(address) ){
			inputEl.val( id );
			formEl.submit();
		}
	});
	
	var mobileDelBtnEls = $(".common_mainPanel .mobileBlock ul li .operationRow .del");
	mobileDelBtnEls.click(function(){
		var rowEl = mobileDelBtnEls.eq( mobileDelBtnEls.index(this) ).parents("li");
		var address = $.trim( rowEl.find("div:eq(0) p").text() );
		var id = $.trim( rowEl.attr("iid") );
		if( delHandler(address) ){
			inputEl.val( id );
			formEl.submit();
		}	
	});
};

$(function(){
	new EBE_SetDefaultManager(function(address){
		return  confirm("是否把："+ address+" 设为默认地址?");
	});
	new EBE_DeleteManager(function(address){
		return  confirm("是否删除："+ address+" ?");
	});
	
});