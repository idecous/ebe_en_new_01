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

var EVE_Comment = function(emptyWarn){
	var formEls = $(".common_pageContent form:eq(0)");
	var inputEls = formEls.find("input");
	var submitBtnEls = $(".common_rightPanel .commentBlock li .submitRow .operationCol .btnRow a");
	var textareaEls = $(".common_rightPanel .commentBlock li .submitRow textarea");
	var orderIDEls = $(".common_rightPanel .commentBlock li .infoRow b");
	
	submitBtnEls.click(function(){
		var tIndex =  submitBtnEls.index(this);
		var text =  $.trim( textareaEls.eq(tIndex).val() );
		if( text == "" ){
			alert(emptyWarn);
			return;
		}
		inputEls.eq(0).val( $.trim( orderIDEls.eq(tIndex).text()) );
		inputEls.eq(1).val( text );
		formEl.submit();
	});
};
$(function(){
	new EBE_ModuleGroup();
	new EVE_Comment("请不要留空！");
	
});
