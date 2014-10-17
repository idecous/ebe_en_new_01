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
				that.nextFn();
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
			//if( !that.verify() ){ return;}
			that.nextFn();
		});
	};
	this.getData = function(){
		var data = {};
		var i,inputEl;
		for(var i=0; i<this.inputEls.length;i++){
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
var EBE_BillingModule_Logined = function(editClickFn,patterns){};



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
			//if( !that.verify() ){ return;}
			that.nextFn();
			
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
var EBE_ShippingModule_Logined = function(editClickFn,patterns){};


var EBE_ShippingMethodModule = function(){
	
};
var EBE_PaymentModule = function(){
	
};
var EBE_ReviewModule = function(){
	
};

var EBE_CheckOutManager = function(patterns){
	var i,modules = [];
	var currentIndex = 0;

	var loginModule = new EBE_LoginModule(changeModuleByEdit,patterns);
	var logined = loginModule.enable;
	
	var billingModule = logined?new EBE_BillingModule_Unlogined(changeModuleByEdit,patterns):
								new EBE_BillingModule_Logined(changeModuleByEdit,patterns);
	modules.push(billingModule);
	
	var shippingModule = logined? new EBE_ShippingModule_Unlogined(changeModuleByEdit,patterns):
								  new EBE_ShippingModule_Logined(changeModuleByEdit,patterns);
	modules.push(shippingModule);
	
	
	if( loginModule.enable  ){
		modules.splice(0,0,loginModule);
		loginModule.nextFn = function(){
			changeModuleByEdit(1);
			billingModule.setRole( loginModule.role );
		};
	}
	for(i=0;i<modules.length;i++){
		modules[i].index = i;
	}
	
	
	billingModule.nextFn = function(){
		if( billingModule.shipTo == "billing" ){
			changeModuleByEdit( currentIndex + 2);
		}else{
			changeModuleByEdit( currentIndex + 1);
		}
	};
	shippingModule.nextFn = function(){
		
	};
	shippingModule.copyFn = function(){
		return billingModule.getData();
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
	
	
	function setLoginHandler(fn){
		loginModule.loginFn = fn;
	};
	function setLoginError(err){
		loginModule.setLoginError(err);
	};
	function setError(err01){
		loginModule.leftErrMessage = err01;
		
		
	}
	
	
	return {
		"setError":setError,
		"setLoginError":setLoginError,
		"setLoginHandler":setLoginHandler
	};
};


$(function(){
	var checkOutManager = new EBE_CheckOutManager({
		"email":/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
		"password": /^[a-zA-Z0-9!@#$%^&*]{6,16}$/i
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
