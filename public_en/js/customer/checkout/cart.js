var EBE_DeleteManager = function(delHandler){
	var formEl = $(".common_pageContent form:eq(0)");
	var inputEl = formEl.find("input");
	
	var idEls =  $(".common_centerBlock table tbody tr td[class=hidden] input");
	var nameEls = $(".common_centerBlock table tbody tr td .descriptBlock h3");
	var tableDelEls = $(".common_centerBlock table tbody tr td .delBtn"); 
	var mobileDelEls = $(".common_centerBlock .mobileBlock li .delBtn"); 
	
	tableDelEls.click(function(){
		var tIndex = tableDelEls.index(this);
		if( delHandler(nameEls.text()) ){
			inputEl.val( $.trim(idEls.eq(tIndex).val()) );
			formEl.submit();
		};
	});
	mobileDelEls.click(function(){
		var tIndex = mobileDelEls.index(this);
		if( delHandler(nameEls.text()) ){
			inputEl.val( $.trim(idEls.eq(tIndex).val()) );
			formEl.submit();
		}
	});
};
var EBE_QuantityInput = function(el){
	var reduceEl = el.find(".reduce");
	var increaseEl = el.find(".increase");
	var inputEl = el.find("input");
	var bindTarget = null; 
	var numcheck = /\d/;
	
	var value = parseInt( inputEl.val() );
	if( isNaN(value) ||  value < 1){
		value=1;
		inputEl.val(value);
	}
	reduceEl.click(function(){
		value--;
		if(value < 1){ value =1;}
		inputEl.val(value);
		bindTarget.setValue(value);
	});
	increaseEl.click(function(){
		value++;
		if(value > 99){ value =99;}
		inputEl.val(value);
		bindTarget.setValue(value);
	});
	inputEl.keypress(function(e){
		var keynum;
		if(window.event){
		  keynum = e.keyCode;
		}else if(e.which){
		  keynum = e.which;
		}
		if(keynum==8){
			return true;
		}
		var keychar = String.fromCharCode(keynum);
		return numcheck.test(keychar);
	}).keyup(function(){
		value = parseInt( inputEl.val() );
		if( isNaN(value) ||  value < 1){
			value=1;
		}
		if( value > 99 ){
			value=99;
		}
		inputEl.val(value);
		bindTarget.setValue(value);
	});
	
	function setValue( val ){
		value = val;
		if( isNaN(value)){
			value=1;
		}
		if(value < 1){ value =1;}
		if(value > 99){ value =99;}
		inputEl.val(value);
	}
	function setBind(target){
		bindTarget = target;
	}
	return {
		"setValue":setValue,
		"setBind":setBind
	};
};
var EBE_QuantityGroup = function(tQuantityEl,mQuantityEl){
	var tQuantity = new EBE_QuantityInput(tQuantityEl);
	var mQuantity = new EBE_QuantityInput(mQuantityEl);
	
	tQuantity.setBind(mQuantity);
	mQuantity.setBind(tQuantity);
};
var EBE_QuantityInputManager = function(){
	var tableQuantityEls = $(".common_mainPanel table .quantitySelector");
	var mobileQuantityEls = $(".common_mainPanel .mobileBlock .quantitySelector");
	for(var i=0; i < tableQuantityEls.length ;i++){
		new EBE_QuantityGroup(  tableQuantityEls.eq(i), mobileQuantityEls.eq(i));
	}
};

var EBE_AddToWishList = function(addHandler){
	var formEl = $(".common_pageContent form:eq(1)");
	var inputEl = formEl.find("input");
	
	var idEls =  $(".common_centerBlock table tbody tr td[class=hidden] input");
	var nameEls = $(".common_centerBlock table tbody tr td .descriptBlock h3");
	var tableAddEls = $(".common_centerBlock table tbody tr td .toWish"); 
	var mobileAddEls = $(".common_centerBlock .mobileBlock li .toWish"); 
	
	tableAddEls.click(function(){
		var tIndex = tableAddEls.index(this);
		if( addHandler(nameEls.text()) ){
			inputEl.val( $.trim(idEls.eq(tIndex).val()) );
			formEl.submit();
		};
	});
	mobileAddEls.click(function(){
		var tIndex = mobileAddEls.index(this);
		if( addHandler(nameEls.text()) ){
			inputEl.val( $.trim(idEls.eq(tIndex).val()) );
			formEl.submit();
		}
	});
};

var EBE_UpdateManager = function(){
	var formEl = $(".common_mainPanel form:eq(0)");
	var inputEl = formEl.find("input[type=hidden]:last");
	var codeInputEl = $(".common_mainPanel .updateRow .codeGroup input[type=text]");
	var codeSubmitEl = $(".common_mainPanel .updateRow .codeGroup input[type=submit]");
	var updateSubmitEl= $(".common_mainPanel .updateRow .updateBtn");

	codeSubmitEl.click(function(){
		var code= $.trim( codeInputEl.val() );
		if( code == "" ){
			inputEl.val("");
			codeInputEl.addClass("warn");
			return;
		}
		codeInputEl.removeClass("warn");
		inputEl.val(code);
		formEl.submit();
	});
	updateSubmitEl.click(function(){
		formEl.submit();
	});
};

var EBE_ShippingTaxManager = function(){
	var addressFormEl = $(".common_mainPanel .shippingTaxBlock form");
	var addressRowEl = $(".common_mainPanel .shippingTaxBlock .addressRow");
	var addressInputEls = addressRowEl.find("select,input[type=text]");
	var warnEls = addressRowEl.find(".warn");
	
	addressFormEl.submit(function(){
		var result = true;
		if( $.trim( addressInputEls.eq(0).val()) == "" ){
			result = false;
			warnEls.eq(0).css("visibility", "visible");
		}else{
			warnEls.eq(0).css("visibility", "hidden");
		}
		if( $.trim( addressInputEls.eq(1).val()) == "" ){
			result = false;
			warnEls.eq(1).css("visibility", "visible");
		}else{
			warnEls.eq(1).css("visibility", "hidden");
		}
		if( $.trim( addressInputEls.eq(2).val()) == "" ){
			result = false;
			warnEls.eq(2).css("visibility", "visible");
		}else{
			warnEls.eq(2).css("visibility", "hidden");
		}
		return result;
	});
	
	var shippingRowEl = $(".common_mainPanel .shippingTaxBlock .shippingRow");
	var radioEls = shippingRowEl.find("input[type=radio]");
	var labelEls = shippingRowEl.find("li span");
	labelEls.click(function(){
		var tIndex = labelEls.index(this);
		radioEls.prop("checked",false);
		radioEls.eq(tIndex).prop("checked",true);
	});
	
};

$(function(){
	new EBE_DeleteManager(function(name){
		return confirm("是否删除："+ name+" ?");;
	});
	new EBE_QuantityInputManager();
	new EBE_AddToWishList(function(name){
		return confirm("是否收藏："+ name+" ?");;
	});
	new EBE_UpdateManager();
	new EBE_ShippingTaxManager();
});













