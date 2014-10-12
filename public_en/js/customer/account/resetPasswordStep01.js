var EVE_FormManager = function(patternEmail,patternCode){
	var formEl = $(".common_mainPanel form");
	if(formEl.length==0){return;}
	var inputEls = formEl.find("input[type=text]");
	var warnEls = formEl.find(".warn");
	
	formEl.submit(function(){
		var result = true;
		if( !patternEmail.test($.trim(inputEls.eq(0).val())) ){
			result = false;
			warnEls.eq(0).css("visibility","visible");
		}else{
			warnEls.eq(0).css("visibility","hidden");
		}
		if( !patternCode.test($.trim(inputEls.eq(1).val())) ){
			result = false;
			warnEls.eq(1).css("visibility","visible");
		}else{
			warnEls.eq(1).css("visibility","hidden");
		}
		return result;
	});
};

$(function(){
	new EVE_FormManager( /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,/^[a-zA-Z0-9]{4,4}$/i);
	
});
