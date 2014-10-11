var EVE_MobileMenu = function(){
	var menuEl = $(".common_moblieNav");
	if( menuEl.length == 0 ){
		$(".common_mobile_topMenuBtn .return").show();
		return;
	}
	var menuOpenBtnEl = $(".common_mobile_topMenuBtn .open") ;
	var menuCloseBtnEl = $(".common_mobile_topMenuBtn .close");
	var pageContentEl = $(".common_pageContent");
	menuCloseBtnEl.hide();
	function closeHandler(){
		menuOpenBtnEl.show();
		menuCloseBtnEl.hide();
		menuEl.css("left","-100%");
		pageContentEl.removeClass("mobileOpen");
	}
	menuOpenBtnEl.click(function(){
		menuOpenBtnEl.hide();
		menuCloseBtnEl.show();
		menuEl.css("left",0);
		pageContentEl.addClass("mobileOpen");
		
		pageContentEl.one("mousedown",closeHandler);
	});
};
var EBE_LoginRow = function(el,pattern){
	var infoEl = el.children("span");
	var inputEl = el.children("input").val(""); 
	
	inputEl.focus(function(){
		infoEl.hide();
	}).blur(function(){
		var val = $.trim( inputEl.val() );
		if( val == ""){
			infoEl.show();
		}
	});
	function verify(){
		var result = pattern.test( $.trim( inputEl.val() ) );
		if(!result){
			el.addClass("warn");
		}else{
			el.removeClass("warn");
		}
		return result;
	}
	return {"verify":verify};
};
var EBE_MobileReset = function(patternEmail,patternCode){
	var rowEls = $(".common_mainPanel .mobileBlock .inputRow");
	var emailRow = new EBE_LoginRow( rowEls.eq(0),patternEmail );
	var codeRow = new EBE_LoginRow( rowEls.eq(1),patternCode );
	
    var formEl = $(".common_mainPanel .mobileBlock form");	
	formEl.submit(function(){
		var correct = emailRow.verify();
		correct = codeRow.verify() && correct;
		return false;
	});	
};

$(function(){
	new EVE_MobileMenu();
	new EBE_MobileReset(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,/[0-9a-zA-Z]{4,4}/);

});











