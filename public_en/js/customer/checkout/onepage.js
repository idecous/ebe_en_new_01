if(!Object.create){
    Object.create = function(o){
        function F() {}
        F.prototype = o;
        return new F();
    };
}
var EBE_ModuleBase = function(clazzname){
	this.el = $(".common_mainPanel .checkoutProcessBlock "+clazzname );
	this.editBtnEl = this.el.find(".titleBar a");
	this.index = -1;
	this.enable = true;
	this.editBtnClickFn = null;
	this.nextFn = null;
};
(function(){
	this.superInit = function(){
		var that = this;
		this.editBtnEl.click(function(){
			that.editBtnClickFn( that.index );
		});		
	};
	this.getData = function(){
		return null;
	};
	this.setAllow = function(){
		this.el.removeClass("action");
		this.el.addClass("allow");
	};
	this.setDefault = function(){
		this.el.removeClass("action");
		this.el.removeClass("allow");
	};
	this.setAction = function(){
		this.el.removeClass("allow");
		this.el.addClass("action");
	};
	
}).call(EBE_ModuleBase.prototype);
//--
var EBE_LoginModule = function(editClickFn,patterns){
	EBE_ModuleBase.call(this,".login");
	this.editBtnClickFn = editClickFn;
	this.role = "";//Guest Register
	this.leftErrMessage = "";
	this.loginFn = null;
	this.patterns = patterns;
	this.init();
};
EBE_LoginModule.prototype = Object.create(EBE_ModuleBase.prototype);
(function(){
	this.init = function(){
		if( this.el.length == 0){
			this.enable = false;
			return;
		}
		this.build();
		this.superInit();
		if( this.leftInputEls.eq(0).prop("checked") ){
			this.role = "Guest";
		}
		if( this.leftInputEls.eq(1).prop("checked") ){
			this.role = "Register";
		}
		var that = this;
		this.leftInputEls.change(function(){
			var tIndex = that.leftInputEls.index(this);
			that.role = tIndex==0?"Guest":"Register";
		});
		this.leftInputLabelEls.click(function(){
			var tIndex = that.leftInputLabelEls.index(this);
			that.leftInputEls.eq(tIndex).prop("checked",true);
			that.role = tIndex==0?"Guest":"Register";
		});
		this.leftContinueEl.click(function(){
			if( that.role == ""){
				alert( that.leftErrMessage );
				return;
			}else{
				that.nextFn( that.role );
			}
		});
		this.rightContinueEl.click(function(){
			var result = true;
			var name = $.trim( that.loginInputEls.eq(0).val() );
			var password = $.trim( that.loginInputEls.eq(1).val() );
			if( !that.patterns.email.test( name ) ){
				result = false;
				that.loginWarnEls.eq(0).css("visibility","visible");
			}else{
				that.loginWarnEls.eq(0).css("visibility","hidden");
			}
			if( !that.patterns.password.test( password ) ){
				result = false;
				that.loginWarnEls.eq(1).css("visibility","visible");
			}else{
				that.loginWarnEls.eq(1).css("visibility","hidden");
			}
			if( result ){
				that.loginFn(name,password);
			}
		});
	};
	this.setLoginError = function(err){
		this.errEl.show();
		this.errTextEl.text(err);
	};
	this.build = function(){
		this.leftInputEls = this.el.find(".registerBlock ul input");
		this.leftInputLabelEls = this.el.find(".registerBlock ul span");
		this.leftContinueEl = this.el.find(".registerBlock a");
		
		this.errEl = this.el.find(".loginBlock .error");
		this.errTextEl = this.el.find(".loginBlock .error span");
		this.rightContinueEl = this.el.find(".loginBlock  .continueButtton");
		
		this.loginInputEls = this.el.find(".inputUnit input");
		this.loginWarnEls = this.el.find(".inputUnit .warn");
		
	};
}).call(EBE_LoginModule.prototype);

var EBE_BillingModule_Unlogined = function(editClickFn,patterns){
	EBE_ModuleBase.call(this,".billingInformation");
	this.editBtnClickFn = editClickFn;
	this.patterns = patterns;
	this.role= "";
	this.shipTo = ""; //billing different 
	this.init();
};
EBE_BillingModule_Unlogined.prototype = Object.create(EBE_ModuleBase.prototype);
(function(){
	this.init = function(){
		this.build();
		this.superInit();
		if( this.shipRadioEls.eq(0).prop("checked") ){
			this.shipTo = "billing";
		}
		if( this.shipRadioEls.eq(1).prop("checked") ){
			this.shipTo = "different";
		}
		var that = this;
		this.shipRadioEls.change(function(){
			var tIndex = that.shipRadioEls.index(this);
			that.shipTo = tIndex==0?"billing":"different";
		});
		this.shipRadioLabelEls.click(function(){
			var tIndex = that.shipRadioLabelEls.index(this);
			that.shipRadioEls.eq(tIndex).prop("checked",true);
			that.shipTo = tIndex==0?"billing":"different";
		});
		
		this.continueEl.click(function(){
			if( !that.verify() ){ return;}
			that.nextFn( that.getData(), that.shipRadioEls.eq(0).prop("checked")  ,false );
		});
	};
	this.getData = function(){
		var data = {};
		var i,inputEl;
		var length = this.inputEls.length - (this.role=="Register"?0:2);
		for(var i=0; i< length;i++){
			inputEl = this.inputEls.eq(i);
			data[ inputEl.attr("name") ] = inputEl.val();
		}
		return data;
	};
	this.verify = function(){
		var i,index,result = true;
		var inputIndexs = [0,1,4,5,6,7,8,9];
		for( i=0; i < inputIndexs.length ;i++ ){
			index = inputIndexs[i];
			if( $.trim( this.inputEls.eq(index).val()) == "" ){
				result = false;
				this.warnEls.eq(index).css("visibility","visible");
			}else{
				this.warnEls.eq(index).css("visibility","hidden");
			}	
		}
		if( !this.patterns.email.test( this.inputEls.eq(3).val()) ){
			result = false;
			this.warnEls.eq(3).css("visibility","visible");
		}else{
			this.warnEls.eq(3).css("visibility","hidden");
		}
		if( this.role == "Guest"){ return result;}
		var pw = true;
		if( !this.patterns.password.test( this.inputEls.eq(11).val())  ){
			pw = false;
			this.warnEls.eq(11).css("visibility","visible");
		}else{
			this.warnEls.eq(11).css("visibility","hidden");
		}
		if( $.trim( this.inputEls.eq(12).val()) !=  $.trim( this.inputEls.eq(11).val()) ){
			pw = false;
			this.warnEls.eq(12).css("visibility","visible");
		}else{
			this.warnEls.eq(12).css("visibility","hidden");
		}
		return result & pw;
	};
	this.setRole = function(role){
		this.role = role;
		if(this.role == "Guest"){
			this.registerEls.hide();
		}else{
			this.registerEls.show();
		}
	};
	this.build = function(){
		this.inputEls = this.el.find("input[type=text],input[type=password],select");
		this.warnEls = this.el.find(".inputUnit .warn");
		this.registerEls = this.el.find(".register");
		this.shipRadioEls = this.el.find("input[type=radio]");
		this.shipRadioLabelEls = this.el.find(".addressRow span");
		this.continueEl = this.el.find(".continueButtton");
	};
}).call(EBE_BillingModule_Unlogined.prototype);
var EBE_BillingModule_Logined = function(editClickFn,patterns){
	EBE_ModuleBase.call(this,".billingInformation");
	this.editBtnClickFn = editClickFn;
	this.patterns = patterns;
	this.shipTo = ""; //billing different 
	this.init();
};
EBE_BillingModule_Logined.prototype = Object.create(EBE_ModuleBase.prototype);
(function(){
	this.init = function(){
		this.build();
		this.superInit();
		this.updateStatus();
		var that = this;
		this.addressSelectorEl.change(function(){
			that.updateStatus();
		});		
		this.continueEl.click(function(){
			if( that.addressSelectorEl.val() == "" ){
				if( !that.verify() ){ return;}
				that.nextFn( that.getData(), that.shipRadioEls.eq(0).prop("checked"),
				that.saveInputEl.prop("checked") );
			}else{
				that.nextFn( that.getData(), that.shipRadioEls.eq(0).prop("checked"),false );
			}
		});
	};
	this.getData = function(){
		var selectValue = this.addressSelectorEl.val();
		if( selectValue == ""){
			var data = {};
			var i,inputEl;
			for( i=0; i< this.inputEls.length;i++){
				inputEl = this.inputEls.eq(i);
				data[ inputEl.attr("name") ] = inputEl.val();
			}
			return data;
		}
		return selectValue;	
	};
	this.verify = function(){
		var i,index,result = true;
		var inputIndexs = [0,1,3,4,5,6,7,8];
		for( i=0; i < inputIndexs.length ;i++ ){
			index = inputIndexs[i];
			if( $.trim( this.inputEls.eq(index).val()) == "" ){
				result = false;
				this.warnEls.eq(index).css("visibility","visible");
			}else{
				this.warnEls.eq(index).css("visibility","hidden");
			}	
		}
		return result;
	};
	this.updateStatus = function(){
		if( this.addressSelectorEl.val() == "" ){
			this.inputUnitEls.show();
			this.saveEl.show();
		}else{
			this.inputUnitEls.hide();
			this.saveEl.hide();
		}
	};	
	this.build = function(){
		this.addressSelectorEl = this.el.find("select:eq(0)");
		this.inputEls = this.el.find("input[type=text],input[type=password],select:gt(0)");
		this.warnEls = this.el.find(".inputUnit .warn:gt(0)");
		
		this.inputUnitEls = this.el.find(".inputUnit:gt(0)");
		
		this.saveEl = this.el.find(".saveRow");
		this.saveInputEl = this.el.find(".saveRow input");
		this.saveLabelEl = this.el.find(".saveRow span");
		
		this.shipRadioEls = this.el.find("input[type=radio]");
		this.shipRadioLabelEls = this.el.find(".addressRow span");
		this.continueEl = this.el.find(".continueButtton");
	};
}).call(EBE_BillingModule_Logined.prototype);

var EBE_ShippingModule_Unlogined = function(editClickFn,patterns){
	EBE_ModuleBase.call(this,".shippingInformation");
	this.editBtnClickFn = editClickFn;
	this.patterns = patterns;
	this.copyFn = null;
	this.init();
};
EBE_ShippingModule_Unlogined.prototype = Object.create(EBE_ModuleBase.prototype);
(function(){
	this.init = function(){
		this.build();
		this.superInit();
		var that = this;
		this.useCheckboxLabelEl.click(function(){
			that.useCheckboxEl.prop("checked", !that.useCheckboxEl.prop("checked") );
			that.copyByBilling();
		});
		this.useCheckboxEl.change(function(){
			that.copyByBilling();
		});
		this.continueEl.click(function(){
			if( !that.verify() ){return;}
		});
		this.continueEl.click(function(){
			if( !that.verify() ){ return;}
			that.nextFn( that.getData(),false );			
		});
	};
	this.copyByBilling = function(){
		if( this.useCheckboxEl.prop("checked") ){
			var data = this.copyFn();
			var i,inputEl;
			for(i=0; i < this.inputEls.length ;i++ ){
				inputEl = this.inputEls.eq(i);
				inputEl.val( data[ inputEl.attr("name") ] );
			}
		}
	};
	this.getData = function(){
		var data = {};
		var i,inputEl;
		var length = this.inputEls.length;
		for(var i=0; i< length;i++){
			inputEl = this.inputEls.eq(i);
			data[ inputEl.attr("name") ] = inputEl.val();
		}
		return data;
	};
	this.verify = function(){
		var i,index,result = true;
		var inputIndexs = [0,1,3,4,5,6,7,8];
		for( i=0; i < inputIndexs.length;i++){
			index = inputIndexs[i];
			if( $.trim( this.inputEls.eq(index).val()) == "" ){
				result = false;
				this.warnEls.eq(index).css("visibility","visible");
			}else{
				this.warnEls.eq(index).css("visibility","hidden");
			}
		}
		return result;
	};
	this.build = function(){
		this.inputEls = this.el.find("input[type=text],select");
		this.warnEls = this.el.find(".inputUnit .warn");
		
		this.useCheckboxEl = this.el.find("input[type=checkbox]");
		this.useCheckboxLabelEl = this.el.find(".operationRow span");

		this.continueEl = this.el.find(".continueButtton");
	};
}).call(EBE_ShippingModule_Unlogined.prototype);
var EBE_ShippingModule_Logined = function(editClickFn,patterns){
	EBE_ModuleBase.call(this,".shippingInformation");
	this.editBtnClickFn = editClickFn;
	this.patterns = patterns;
	this.copyFn = null;
	this.init();
};
EBE_ShippingModule_Logined.prototype = Object.create(EBE_ModuleBase.prototype);
(function(){
	this.init = function(){
		this.build();
		this.superInit();
		this.updateStatus();
		var that = this;
		this.addressSelectorEl.change(function(){
			that.updateStatus();
		});	
		this.copyInputEl.change(function(){
			that.copyByBilling();
		});
		this.continueEl.click(function(){
			if( that.addressSelectorEl.val() == "" ){
				if( !that.verify() ){ return;}
				that.nextFn( that.getData(),that.saveInputEl.prop("checked") );
			}else{
				that.nextFn( that.getData(),false );
			}
		});
	};
	this.copyByBilling = function(){
		if( this.copyInputEl.prop("checked") ){
			var data = this.copyFn();
			
			if( $.type(data) === "string" ){
				this.addressSelectorEl.val(data);
			}else{
				this.addressSelectorEl.val("");
				var i,inputEl;
				for(i=0; i < this.inputEls.length ;i++ ){
					inputEl = this.inputEls.eq(i);
					inputEl.val( data[ inputEl.attr("name") ] );
				}
			}
			this.updateStatus();
		}
	};
	this.updateStatus = function(){
		if( this.addressSelectorEl.val() == "" ){
			this.inputUnitEls.show();
			this.saveEl.show();
		}else{
			this.inputUnitEls.hide();
			this.saveEl.hide();
		}
	};
	this.getData = function(){
		var selectValue = this.addressSelectorEl.val();
		if( selectValue == ""){
			var data = {};
			var i,inputEl;
			for( i=0; i< this.inputEls.length;i++){
				inputEl = this.inputEls.eq(i);
				data[ inputEl.attr("name") ] = inputEl.val();
			}
			return data;
		}
		return selectValue;	
	};
	this.verify = function(){
		var i,index,result = true;
		var inputIndexs = [0,1,3,4,5,6,7,8];
		for( i=0; i < inputIndexs.length ;i++ ){
			index = inputIndexs[i];
			if( $.trim( this.inputEls.eq(index).val()) == "" ){
				result = false;
				this.warnEls.eq(index).css("visibility","visible");
			}else{
				this.warnEls.eq(index).css("visibility","hidden");
			}	
		}
		return result;
	};
	this.build = function(){
		this.addressSelectorEl = this.el.find("select:eq(0)");
		this.inputUnitEls = this.el.find(".inputUnit:gt(0)");
		this.inputEls = this.el.find("input[type=text],select:gt(0)");
		this.warnEls = this.el.find(".inputUnit .warn:gt(0)");
		
		this.saveEl = this.el.find(".operationRow div:eq(0)");
		this.saveInputEl = this.saveEl.find("input");
		this.saveLabelEl = this.saveEl.find("span");
		
		this.copyEl = this.el.find(".operationRow div:eq(1)");
		this.copyInputEl = this.copyEl.find("input");
		this.copyLabelEl = this.copyEl.find("span");
		
		this.continueEl = this.el.find(".continueButtton");
	};
}).call(EBE_ShippingModule_Logined.prototype);


var EBE_ShippingMethodModule = function(editClickFn){
	EBE_ModuleBase.call(this,".shippingMethod");
	this.editBtnClickFn = editClickFn;
	this.data = null;
	this.init();
};
EBE_ShippingMethodModule.prototype = Object.create(EBE_ModuleBase.prototype);
(function(){
	this.init = function(){
		this.build();
		this.superInit();
		var that = this;
		this.continueEl.click(function(){
			var value = that.ulEl.find("input:checked").val();
			that.nextFn( that.data[value] );
		});
	};
	this.setData = function( data ){
		this.ulEl.empty();
		this.data = {};
		var i,itemData,str;
		for( i=0;i < data.length;i++ ){
			itemData = data[i];
			this.data[ itemData.value ] = itemData;
			$("<li><input type='radio' name='"+itemData.name+"' value='"+itemData.value
			+"' /><span>"+ itemData.label +"</span></li>").appendTo(this.ulEl);
		}
		this.ulEl.find("input:eq(0)").prop("checked",true);
	};
	this.build = function(){
		this.ulEl = this.el.find("ul");
		this.continueEl = this.el.find(".continueButtton");
	};	
}).call(EBE_ShippingMethodModule.prototype);

var EBE_PaymentModule = function(editClickFn){
	EBE_ModuleBase.call(this,".paymentInformation");
	this.editBtnClickFn = editClickFn;
	this.isPop = false;
	this.init();
};
EBE_PaymentModule.prototype = Object.create(EBE_ModuleBase.prototype);
(function(){
	this.init = function(){
		this.build();
		this.superInit();
		var that = this;
		this.continueEl.click(function(){
			if( !that.verify() ){return;}
			that.nextFn( that.getData() );
		});
		this.winEl.mousedown(function(){
			if( !that.isPop ){return;}
			that.popWindowEl.hide();
			that.isPop = false;
		}).resize(function(){
			if( !that.isPop ){return;}
			that.popWindowEl.hide();
			that.isPop = false;
		});
		this.popBtnEl.click(function(e){
			var offset = that.popBtnEl.offset();
			var top = offset.top + 20;
			var left = offset.left + 5;
			var winWidth = that.winEl.width();
			that.popWindowEl.show().css({"top":top,"left":left});
			that.isPop = true;
		});
	};
	this.getData = function(){
		var data = {};
		var i,inputEl;
		for(i=0; i < this.inputEls.length;i++){
			inputEl = this.inputEls.eq(i);
			data[ inputEl.attr("name") ] = inputEl.val();
		}
		return data;
	};
	this.verify = function(){
		var i,inputVal,result = true;
		for( i=0; i < this.inputEls.length;i++){
			inputVal = this.inputEls.eq(i).val();
			if( $.trim( inputVal ) == "" ){
				result = false;
				this.warnEls.eq(i).css("visibility","visible");
			}else{
				this.warnEls.eq(i).css("visibility","hidden");
			}
		}
		return result;
	};
	this.build = function(){
		this.bodyEl = $("body");
		this.winEl = $(window);
		this.inputEls = this.el.find("input[type=text],select");
		this.warnEls = this.el.find(".inputUnit .warn");
		this.continueEl = this.el.find(".continueButtton");
		
		this.popBtnEl = this.el.find(".inputUnit .descript");
		this.popWindowEl = $(".popWindow");
	};	
}).call(EBE_PaymentModule.prototype);

var EBE_ReviewModule = function(editClickFn){
	EBE_ModuleBase.call(this,".orderReview");
	this.editBtnClickFn = editClickFn;
	this.init();
};
EBE_ReviewModule.prototype = Object.create(EBE_ModuleBase.prototype);
(function(){
	this.init = function(){
		this.build();
		this.superInit();
		var that = this;
		this.continueEl.click(function(){
			that.nextFn();
		});
	};
	this.setData = function(data){
		this.listEls.find("li:gt(0)").remove();
		var i,itemData;
		for( var i = 0 ; i < data.list.length ;i++ ){
			itemData = data.list[i];
			$("<li><div class='paramCol'>h1>"+itemData.name+"</h1><div>"+ itemData.color+"</div>"+
			"<div>"+itemData.size+"</div><div>"+itemData.price+
			"</div></div><div class='quantityCol'>"+itemData.QTY+"</div>"+
			"<div class='price'><b>"+itemData.subtotal+"</b></div></li>").appendTo(this.listEls);
		}
		
		for(i=0; i < data.total.length;i++){
			itemData = data.total[i];
			this.totalLabelEls.eq(i).text(  itemData[0]);
			this.totalPriceEls.eq(i).text(  itemData[1]);
		}
	};
	this.build = function(){
		this.listEls = this.el.find(".listBlock");
		this.totalLabelEls = this.el.find(".totalBlock li>.label:empty,.totalBlock li>.label>b ");
		this.totalPriceEls = this.el.find(".totalBlock li>.priceCol:empty,.totalBlock li>.priceCol>b ");
		this.continueEl = this.el.find(".continueButtton");
	};
}).call(EBE_ReviewModule.prototype);

var EBE_CheckOutManager = function(patterns){
	var i,modules = [];
	var currentIndex = 0;

	var loginModule = new EBE_LoginModule(changeModuleByEdit,patterns);
	var logined = !loginModule.enable;
	if( !logined ){
		modules.push(loginModule);
	}
	var billingModule = logined?new EBE_BillingModule_Logined(changeModuleByEdit,patterns):
								new EBE_BillingModule_Unlogined(changeModuleByEdit,patterns);
	modules.push(billingModule);
	var shippingModule = logined? new EBE_ShippingModule_Logined(changeModuleByEdit,patterns):
								  new EBE_ShippingModule_Unlogined(changeModuleByEdit,patterns);
	modules.push(shippingModule);
	var shippingMethodModule = new EBE_ShippingMethodModule(changeModuleByEdit);
	modules.push(shippingMethodModule);
	var paymentModule = new EBE_PaymentModule(changeModuleByEdit);
	modules.push(paymentModule);
	var reviewModule = new EBE_ReviewModule(changeModuleByEdit);
	modules.push(reviewModule);
	
	for(i=0;i<modules.length;i++){
		modules[i].index = i;
	}
	shippingModule.copyFn = function(){
		return billingModule.getData({"value":"7","name":"FedEx","label":"FedEx Ground $7.00"  });
	};

	function changeModuleByEdit(index){
		currentIndex = index;
	
		for(var i=0; i < modules.length;i++){
			if( i < currentIndex){
				modules[i].setAllow();
			}else if( i > currentIndex ){
				modules[i].setDefault();
			}else{
				modules[i].setAction();
			}
		}
	};
	function nextModule(){
		if( !logined && currentIndex == 0){
			billingModule.setRole( loginModule.role );
		}
		changeModuleByEdit( currentIndex + 1);
		
		
	}
	
	
	function setError(err01){
		loginModule.leftErrMessage = err01;
	}
	function setLoginError(err){
		loginModule.setLoginError(err);
	};
	function setLoginHandler(fn){
		loginModule.loginFn = fn;
	};
	
	function setUnloginedHandler(fn){
		loginModule.nextFn = fn;
	}
	function setBillingHandler(fn){
		billingModule.nextFn = fn;
	}
	function setShippingHandler(fn){
		shippingModule.nextFn = fn;
	}
	function setShippingMethodHandler(fn){
		shippingMethodModule.nextFn = fn;
	}
	function setPaymentHandler(fn){
		paymentModule.nextFn = fn;
	}
	function setSaveHandler(fn){
		reviewModule.nextFn = fn;
	}

	function setShippingMethodData(data){
		shippingMethodModule.setData(data);
	}
	function setReviewData(data){
		reviewModule.setData(data);
	}
	
	return {
		"setError":setError,
		"setLoginError":setLoginError,
		"setLoginHandler":setLoginHandler,
		"setUnloginedHandler":setUnloginedHandler,
		"setBillingHandler":setBillingHandler,
		"setShippingHandler":setShippingHandler,
		"setShippingMethodHandler":setShippingMethodHandler,
		"setPaymentHandler":setPaymentHandler,
		"setSaveHandler":setSaveHandler,
		"nextModule":nextModule,
		"setShippingMethodData":setShippingMethodData,
		"setReviewData":setReviewData
	};
};



var countID = 600;
var shippingMethodData = [
	{"value":"1","name":"FedEx","label":"FedEx Ground $1.00"  },
	{"value":"2","name":"FedEx","label":"FedEx Ground $2.00"  },
	{"value":"3","name":"FedEx","label":"FedEx Ground $3.00"  }
];
function getReviewData( size ){
	var i,arr = [];
	for( i=0; i < size;i++ ){
		arr.push({
			"name":"ABBY DEEP V TOP__" + countID,
			"color":"Color BLACK",
			"size":"Size S",
			"price":"$1,333.00",
			"QTY":"999",
			"subtotal":"$888,333.00"
		});
		countID++;
	}
	var totalData = [
		["Subtotal","$5,919.00 "],
		["Shipping & Handling (Select Shipping Method - FedEx 2-Day)","$9.00"],
		["Grand Total","$939.00"]
	];
	return {"list":arr,"total":totalData};
}



$(function(){
	var checkOutManager = new EBE_CheckOutManager({
		"email":/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
		"password": /^[a-zA-Z0-9!@#$%^&*]{1,16}$/i
	});
	
	checkOutManager.setError("请选择地区或以来宾身份结账!");
	
	
	checkOutManager.setLoginHandler(function(name,password){
		console.log("登陆(用户名/密码)",name,password);
		//请求服务器
		//成功刷新页面
		//window.location.reload();
		//失败
		checkOutManager.setLoginError("无效的登录名或密码。");
	});
	checkOutManager.setUnloginedHandler(function(role){
		console.log( "未登录访问方式", role);
		//
		checkOutManager.nextModule();		
	});
	checkOutManager.setBillingHandler(function(data,sameddress,isSave){
		console.log( "账单信息(数据/是否送货到同一地方/是否保存)", data,sameddress,isSave);
		//请求服务器
		/*
		 * 根据 $.type(data) === "string" 来判断是否为 地址ID
		 */
		if( sameddress ){
			checkOutManager.setShippingMethodData(shippingMethodData);
			checkOutManager.nextModule();		
			checkOutManager.nextModule();		
		}else{
			checkOutManager.nextModule();		
		}
	});
	checkOutManager.setShippingHandler(function(data,isSave){
		console.log("送货地址信息(数据/是否保存)", data,isSave);
		//请求服务器
		/*
		 * 根据 $.type(data) === "string" 来判断是否为 地址ID
		 */
		checkOutManager.setShippingMethodData(shippingMethodData);
		checkOutManager.nextModule();
	});
	checkOutManager.setShippingMethodHandler(function(value){
		console.log("送货方式",value);
		if( value == undefined ){
			alert("请选择送货方式");
			return;
		}
		//
		checkOutManager.nextModule();
	});
	checkOutManager.setPaymentHandler(function(data){
		console.log("支付方式",data);
		//
		checkOutManager.setReviewData( getReviewData(2) );
		checkOutManager.nextModule();		
	});
	checkOutManager.setSaveHandler(function(){
		console.log("流程完成");
		//
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
