var EBE_SubmitManager = function(){
	var formEl = $(".common_rightPanel form");
	var inputEls = formEl.find("input,select");
	var warnEls = formEl.find(".warn");

	formEl.submit(function(){
		var result = true;
		if( $.trim( inputEls.eq(0).val() ) == "" ){
			result = false;
			warnEls.eq(0).css("visibility","visible");
		}else{
			warnEls.eq(0).css("visibility","hidden");
		}
		if( $.trim( inputEls.eq(1).val() ) == "" ){
			result = false;
			warnEls.eq(1).css("visibility","visible");
		}else{
			warnEls.eq(1).css("visibility","hidden");
		}
		if( $.trim( inputEls.eq(3).val() ) == "" ){
			result = false;
			warnEls.eq(3).css("visibility","visible");
		}else{
			warnEls.eq(3).css("visibility","hidden");
		}
		
		if( $.trim( inputEls.eq(5).val() ) == "" ){
			result = false;
			warnEls.eq(5).css("visibility","visible");
		}else{
			warnEls.eq(5).css("visibility","hidden");
		}
		if( $.trim( inputEls.eq(6).val() ) == "" ){
			result = false;
			warnEls.eq(6).css("visibility","visible");
		}else{
			warnEls.eq(6).css("visibility","hidden");
		}
		
		if( $.trim( inputEls.eq(8).val() ) == "" ){
			result = false;
			warnEls.eq(8).css("visibility","visible");
		}else{
			warnEls.eq(8).css("visibility","hidden");
		}
		if( $.trim( inputEls.eq(9).val() ) == "" ){
			result = false;
			warnEls.eq(9).css("visibility","visible");
		}else{
			warnEls.eq(9).css("visibility","hidden");
		}
		return result;
	});
};
$(function(){
	new EBE_SubmitManager();
});
