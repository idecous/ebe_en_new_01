var EBE_SetDefaultManager = function( setDefaultHandler ){
	var formEl = $(".common_pageContent form:eq(0)");
	var inputEl = formEl.find("input");
	var setBtnEls = $(".common_rightPanel table tbody a.default");
	
	setBtnEls.each(function(index){
		var btnEl = setBtnEls.eq(index);
		btnEl.data("url",btnEl.attr("href"));
		btnEl.attr("href","javascript:;");
	});
	setBtnEls.click(function(){
		var btnEl = setBtnEls.eq( setBtnEls.index(this) );
		var rowEl = setBtnEls.parents("tr");
		var address = $.trim( rowEl.find("td:eq(2)").text() );
		if( setDefaultHandler(address) ){
			window.location.href = btnEl.data("url");
		}
	});
	
	var mobileSetBtnEls = $(".common_mainPanel .mobileBlock ul li .operationRow .default");
	mobileSetBtnEls.each(function(index){
		var btnEl = mobileSetBtnEls.eq(index);
		btnEl.data("url",btnEl.attr("href"));
		btnEl.attr("href","javascript:;");
	});
	mobileSetBtnEls.click(function(){
		var btnEl = mobileSetBtnEls.eq( mobileSetBtnEls.index(this) );
		var rowEl = btnEl.parents("li");
		var address = $.trim( rowEl.find("div:eq(0) p").text() );
		if( setDefaultHandler(address) ){
			window.location.href = btnEl.data("url");
		}	
	});
};

var EBE_SetDefaultBillingManager = function( setDefaultBillingHandler ){
	var formEl = $(".common_pageContent form:eq(2)");
	var inputEl = formEl.find("input");
	var setBtnEls = $(".common_rightPanel table tbody a.billing");
	setBtnEls.each(function(index){
		var btnEl = setBtnEls.eq(index);
		btnEl.data("url",btnEl.attr("href"));
		btnEl.attr("href","javascript:;");
	});
	
	setBtnEls.click(function(){
		var btnEl = setBtnEls.eq( setBtnEls.index(this) );
		var rowEl = btnEl.parents("tr");
		var address = $.trim( rowEl.find("td:eq(2)").text() );
		if( setDefaultBillingHandler(address) ){
			window.location.href = btnEl.data("url");
		}
	});
	
	
	var mobileBillingBtnEls = $(".common_mainPanel .mobileBlock ul li .operationRow .billing");
	mobileBillingBtnEls.each(function(index){
		var btnEl = mobileBillingBtnEls.eq(index);
		btnEl.data("url",btnEl.attr("href"));
		btnEl.attr("href","javascript:;");
	});
	
	mobileBillingBtnEls.click(function(){
		var btnEl = mobileBillingBtnEls.eq( mobileBillingBtnEls.index(this) );
		var rowEl = btnEl.parents("li");
		var address = $.trim( rowEl.find("div:eq(0) p").text() );
		if( setDefaultBillingHandler(address) ){
			window.location.href = btnEl.data("url");
		}	
	});	
};

var EBE_DeleteManager = function(delHandler){
	var formEl = $(".common_pageContent form:eq(1)");
	var inputEl = formEl.find("input");
	var delBtnEls = $(".common_rightPanel table tbody a.del");
	delBtnEls.each(function(index){
		var btnEl = delBtnEls.eq(index);
		btnEl.data("url",btnEl.attr("href"));
		btnEl.attr("href","javascript:;");
	});
	
	delBtnEls.click(function(){
		var btnEl = delBtnEls.eq( delBtnEls.index(this) );
		var rowEl = btnEl.parents("tr");
		var address = $.trim( rowEl.find("td:eq(2)").text() );
		if( delHandler(address) ){
			window.location.href = btnEl.data("url");
		}
	});
	
	var mobileDelBtnEls = $(".common_mainPanel .mobileBlock ul li .operationRow .del");
	mobileDelBtnEls.each(function(index){
		var btnEl = mobileDelBtnEls.eq(index);
		btnEl.data("url",btnEl.attr("href"));
		btnEl.attr("href","javascript:;");
	});
	mobileDelBtnEls.click(function(){
		var btnEl = mobileDelBtnEls.eq( mobileDelBtnEls.index(this) );
		var rowEl = btnEl.parents("li");
		var address = $.trim( rowEl.find("div:eq(0) p").text() );
		if( delHandler(address) ){
			window.location.href = btnEl.data("url");
		}	
	});
};

$(function(){
	new EBE_SetDefaultManager(function(address){
		return  confirm("是否把："+ address+" 设为默认地址?");
	});
	new EBE_SetDefaultBillingManager(function(address){
		return  confirm("是否把："+ address+" 设为默认账单地址?");
	});
	new EBE_DeleteManager(function(address){
		return  confirm("是否删除："+ address+" ?");
	});
	
});
