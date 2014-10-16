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
var EBE_LoginModule = function(editClickFn){
	EBE_ModuleBase.call(this,".login");
	this.index = 0;
	this.editBtnClickFn = editClickFn;
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
		var that = this;
		this.leftInputLabelEls.click(function(){
			
		});
		
		this.superInit();
	};
	
	this.build = function(){
		this.leftInputEls = this.el.find(".registerBlock ul input");
		this.leftInputLabelEls = this.el.find(".registerBlock ul span");
		
	
		
		
	};
}).call(EBE_LoginModule.prototype);



var EBE_BillingModule = function(){
	
};
var EBE_ShippingModule = function(){
	
};
var EBE_ShippingMethodModule = function(){
	
};
var EBE_PaymentModule = function(){
	
};
var EBE_ReviewModule = function(){
	
};

var EBE_CheckOutManager = function(){
	var modules = {};
	
	
	var loginModule = new EBE_LoginModule(changeModuleByEdit);
	

	function changeModuleByEdit(index){
		console.log( index );
	};
};


$(function(){
	
	
	var checkOutManager = new EBE_CheckOutManager();
	
	
	
	
	
	
	
});
