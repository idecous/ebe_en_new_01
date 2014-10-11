var EVE_SubmitManager = function(warnMessage,patternEmail){
	var formEl = $(".common_mainPanel .bottomBlock .emailInputRow form"); 
	var inputEl = formEl.find("input[type='text']");
	var infoEl = $(".common_mainPanel .bottomBlock .emailInputRow .cell .inputBorder span");
	
	inputEl.focus(function(){
		infoEl.hide();
	}).blur(function(){
		var val = $.trim( inputEl.val() );
		if( val == ""){
			infoEl.show();
		}
	});
	
	formEl.submit(function(){
		if(  !patternEmail.test( $.trim( inputEl.val() )  )  ){
			alert(warnMessage);
			return false;
		}
	});
};


$(function(){
	new EVE_SubmitManager("邮件地址错误!",/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
	
});
