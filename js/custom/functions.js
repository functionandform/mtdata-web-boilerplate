var resizeNav = function() {
	if ($(window).width() > 1024) {

		var min = 48;
		var max = 184;
		var mainmin = 320;
		var breakpointOne = 96;
		var breakpointTwo = 144;

		$('#leftDragBar').mousedown(function (e) {
		    e.preventDefault();
		    console.log(min);
		    $(document).mousemove(function (e) {
		    	console.log(max);
		        e.preventDefault();
		        var x = e.pageX - $('#navBar').offset().left;
		        if (x > min && x < max && e.pageX < ($(window).width() - mainmin)) {  
		          $('#navBar').css("width", x);
		          $('#content').css("margin-left", x);
		        }
		        if (x < breakpointOne) {
		        	$("#navBar").removeAttr("class").addClass("small");
		        }
		        if (x > breakpointOne && x < breakpointTwo) {
		        	$("#navBar").removeAttr("class").addClass("medium");
		        }
		        if (x > breakpointTwo) {
		        	$("#navBar").removeAttr("class").addClass("large");
		        }
		    })
		});

		$(document).mouseup(function (e) {
		    $(document).unbind('mousemove');
		});
			
	}
	else {
		$('#navBar').removeAttr('style');
		$('#content').removeAttr('style');
		$("#rightSideBar").removeClass("open");
		$("#content").removeClass("rightSideBarOpen");
		$("#fixedFooter").removeClass("open");
	}
}



// tab switch ajax
var tabLoad = function() {
	var currentTabLink = window.location.hash.substring(1);
	var currentTab = $('a[href^="#'+currentTabLink+'"]');

	var tabWidth = $(currentTab).outerWidth();
	var tabPosition = $(currentTab).position().left;

	$("#indicator").css({left: tabPosition, width:tabWidth});

	$(currentTab).addClass('active').siblings().removeClass("active");
	$("#bodyArea").empty().load( "internalPages/" + currentTabLink + ".html");
};

// rightSideBar drag re size functionality

var resizeRight = function() {
	if ($("#rightSideBar").hasClass("open")) {

		var min = 200;
		var max = 1000;
		var mainmin = 300;

		$('#rightDragBar').mousedown(function (e) {
		    e.preventDefault();
		    console.log(min);
		    $(document).mousemove(function (e) {
		    	console.log(max);
		        e.preventDefault();
		        var x = e.pageX - $('#rightSideBar').offset().left;
		        if (x > min && x < max && e.pageX < ($(window).width() - mainmin)) {  
		        	$('#rightSideBar').css("width", x);
		        	$('#content').css("margin-right", x);
		        }
		    })
		});

		$(document).mouseup(function (e) {
		    $(document).unbind('mousemove');
		});
			
	}
	else {
		$('#rightSideBar').removeAttr('style');
		$('#content').removeAttr('style');
	}
}

$("#messages").click(function () {
	if ($(window).width() > 1024) {
		$("#rightSideBar").toggleClass("open");
		$("#content").toggleClass("rightSideBarOpen");
		$("#fixedFooter").toggleClass("open");
		resizeRight();
	}
	else {
		$("#rightSideBar").removeClass("open");
		$("#content").removeClass("rightSideBarOpen");
		$("#fixedFooter").removeClass("open");
	}
});

$(".chatBox .chatTools .minimize").click(function () {
	$(this).parents(".chatBox").toggleClass("open");
});




$("#themeChoices li .theme").click(function() {
	var currentTheme = $("#themeChoices .theme.active").attr("id");
	var newTheme = $("#themeChoices .theme:not(.active)").attr("id");
	var clickedTheme = $(this).attr("id");

	if (clickedTheme == newTheme) {
		$("#themeChoices").toggleClass("switch");

 		$('#themeLink').attr('href','css/'+newTheme+'.css');
 		$("#themeChoices .theme.active").removeClass("active");
 		$(this).addClass("active");	
 		setTimeout( function() {
			$("#themes").blur();	
		}, 150);
	}
	else {

	}
});
