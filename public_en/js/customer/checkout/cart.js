var EBE_DeleteManager = function(){
	var formEl = $(".common_pageContent form:eq(0)");
	var inputEl = formEl.find("input");
	
	var idEls =  $(".common_centerBlock table tbody tr td[class=hidden] input");
	var tableDelEls = $(".common_centerBlock table tbody tr td .delBtn"); 
	var mobileDelEls = $(".common_centerBlock .mobileBlock li .delBtn"); 
	
	tableDelEls.click(function(){
		var tIndex = tableDelEls.index(this);
		inputEl.val( $.trim(idEls.eq(tIndex).val()) );
		
		
	});
	mobileDelEls.click(function(){
		var tIndex = tableDelEls.index(this);
		inputEl.val( $.trim(idEls.eq(tIndex).val()) );
		
		console.log( inputEl );	
	});

	
	
	
};



$(function(){
	new EBE_DeleteManager();
	
	
	
	
});
