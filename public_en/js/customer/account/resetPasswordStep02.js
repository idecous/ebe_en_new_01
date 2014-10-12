var EVE_FormManager = function(patternPW){
	var formEl = $(".common_mainPanel form");
	if(formEl.length==0){return;}
	var inputEls = formEl.find("input[type=text]");
	var warnEls = formEl.find(".warn");
	
	formEl.submit(function(){
		var result = true;
		if( !patternPW.test($.trim(inputEls.eq(0).val())) ){
			result = false;
			warnEls.eq(0).css("color","#f00");
			warnEls.eq(1).css("visibility","hidden");
		}else{
			warnEls.eq(0).css("color","#666");
			if( $.trim(inputEls.eq(0).val()) != $.trim(inputEls.eq(1).val()) ){
				result = false;
				warnEls.eq(1).css("visibility","visible");
			}else{
				warnEls.eq(1).css("visibility","hidden");
			}
		}	
		return result;
	});
};

$(function(){
	new EVE_FormManager( /^[a-zA-Z0-9]{6,16}$/i);
});