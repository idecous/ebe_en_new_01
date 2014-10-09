var EBE_Background = function(){
	var windEl = $(window);
	var el = $(".common_mainPanel .bgImg");
	if( el.attr("complete")){
		init();
	}else{
		el[0].onload = init;
	}
	var imgWidth = 0;
	var imgHeight = 0;
	function init(){
		imgWidth = el.width();
		imgHeight = el.height();
		updateSizeHandler();
		el.addClass("show");
	}
	windEl.resize(updateSizeHandler);
	function updateSizeHandler(){
		var cWidth = windEl.width(),cHeight = windEl.height();
		var rate = Math.max( cWidth/imgWidth,cHeight/imgHeight );
		var nWidth = imgWidth*rate,nHeight = imgHeight*rate;
		el.css({"width":nWidth,"height":nHeight,"left":(cWidth-nWidth)/2,"top":(cHeight-nHeight)/2});
	}
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
	function getValue(){
		return $.trim( inputEl.val() );
	}
	function isEqual(val){
		var result = pattern.test( $.trim( inputEl.val() ) );
		result =( getValue() == val ) && result;
		if(!result){
			el.addClass("warn");
		}else{
			el.removeClass("warn");
		}
		return result;
	}
	
	return {"verify":verify,"getValue":getValue,"isEqual":isEqual};
};
var EBE_Register = function(patternAccount,patternPassword){
	var rowEls = $(".common_mainPanel .rightGroup .loginPanel .inputRow");
	var accountRow = new EBE_LoginRow( rowEls.eq(0),patternAccount );
	var passwordRow = new EBE_LoginRow( rowEls.eq(1),patternPassword );
	var repeatRow = new EBE_LoginRow( rowEls.eq(2),patternPassword );
	
	var formEl = $(".common_mainPanel .rightGroup .loginPanel .bg form");	

	 formEl.submit(function(){
	 	var correct = accountRow.verify();
		correct = passwordRow.verify() && correct;
		correct = repeatRow.isEqual( passwordRow.getValue() ) && correct;
		return correct;
	 });	
};

$(function(){
	new EBE_Background();
	new EBE_Register( /(^[1]+[3,4,5,8]+\d{9})|(^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/,
				   /^[a-zA-Z0-9!@#$%^&*]{6,16}$/i );
	$(".leftGroup .navBar a:eq(1)").click(function(){
		var url = window.location;  
        var title = document.title;  
        if(window.external && 'addFavorite' in window.external){
	        window.external.addFavorite(url, title);
	    } else if(window.sidebar && window.sidebar.addPanel) {
	        window.sidebar.addPanel(url, title);
	    } else if(window.opera && window.print) {
	        this.title = title;
	        return true;
	    } else {
	        alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
	    }
	});
	
	
});
