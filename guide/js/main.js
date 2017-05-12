$( document ).ready(function() {
    $(".nav").find('a').each(function(){
	   var curValue = $(this).attr('href').substring(1);
	   if (curValue.indexOf('-') > -1)
		{
		  var curValue = curValue.replace(/-/g , " ");
		};
	   $(this).text(curValue);
	});


    $(".nav li a").click(function(){
    	var link
    })

    pageload();

    $(".nav a").click(function() {
    	pageload();
    })
}); // doc ready



// tab switch ajax
var pageload = function() {
	
	var currentPage = window.location.hash.substring(1);
	console.log(currentPage);

	var newLink = $("pages/"+currentPage+".html");
	console.log(newLink);
	
	$(".content").empty().load(newLink);
	$('a[href="#' + currentPage + '"]').addClass("active");
};