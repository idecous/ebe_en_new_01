var EBE_DeleteManager = function(){
	var formEl = $(".common_pageContent form:eq(0)");
	var inputEl = formEl.find("input");
	
	var idEls =  $(".common_centerBlock table tbody tr td ");
	var tableDelEls = $(".common_centerBlock table tbody tr td .delBtn"); 
	var mobileDelEls = $(".common_centerBlock .mobileBlock li .delBtn"); 
	
	
	
	
	console.log( idEls );	
};



$(function(){
	new EBE_DeleteManager();
	
	
	
	
});
