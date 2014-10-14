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

var EBE_LoginRow = function(labelEl,el,pattern){
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
			labelEl.addClass("warnInfo");
		}else{
			el.removeClass("warn");
			labelEl.removeClass("warnInfo");
		}
		return result;
	}
	return {"verify":verify};
};
var EBE_Login = function(patternAccount,patternPassword){
	var topWarnEls = $(".common_mainPanel .rightGroup .loginPanel .topWarn");
	var labelEls = $(".common_mainPanel .rightGroup .loginPanel .label");
	var rowEls = $(".common_mainPanel .rightGroup .loginPanel .inputRow");
	var accountRow = new EBE_LoginRow( labelEls.eq(0),rowEls.eq(0),patternAccount );
	var passwordRow = new EBE_LoginRow(labelEls.eq(1), rowEls.eq(1),patternPassword );
	var formEl = $(".common_mainPanel .rightGroup .loginPanel .bg form");	
	formEl.submit(function(){
		var correct1 = accountRow.verify();
		if( !correct1 ){
			topWarnEls.eq(0).show();
			topWarnEls.eq(1).hide();
		}else{
			topWarnEls.eq(0).hide();
		}		
		var correct2 = passwordRow.verify();
		if( correct1 ){
			if( correct2 ){
				topWarnEls.eq(1).hide();
			}else{
				topWarnEls.eq(1).show();
			}
		}
		
		correct = passwordRow.verify() && correct;
		return correct1 && correct2;
	});	
};
$(function(){
	new EBE_Background();
	new EBE_Login( /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
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
