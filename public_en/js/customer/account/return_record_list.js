var EBE_DeleteManager = function(delWarn){
	var formEl = $(".common_pageContent form:eq(0)");
	var inputEls = formEl.find("input");
	var delBtnEls = $(".common_rightPanel ul li .titleRow a");
	var orderIDEls = $(".common_rightPanel ul li .titleRow b");
	
	delBtnEls.click(function(){
		var tIndex = delBtnEls.index(this);
		var orderID =  $.trim( orderIDEls.eq(tIndex).text() );
		if( confirm(delWarn +orderID+"?")  ){
			inputEls.val(orderID);
			formEl.submit();
		}
	});
};
$(function(){
	new EBE_DeleteManager("是否删除订单：");
});
