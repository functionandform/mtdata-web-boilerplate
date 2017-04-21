var carouselInit = false;


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

            drawCharts();
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

// Stylesheet cookie load

function readCookieCSS() {
    console.log(Cookies.get('theme'));
    if (Cookies.get('theme') == 'dark') {
      $('link[href="css/light.css"]').attr('href', 'css/'+Cookies.get('theme')+'.css');
      $("#themeChoices").toggleClass("switch");
      $("#light").removeClass('active');
      $("#dark").addClass('active');
    }
    else {
      // default theme
    }

}


$("#themeChoices li .theme").click(function() {
    var currentTheme = $("#themeChoices .theme.active").attr("id");
    var newTheme = $("#themeChoices .theme:not(.active)").attr("id");
    var clickedTheme = $(this).attr("id");

    if (clickedTheme == newTheme) {
      $("#themeChoices").toggleClass("switch");

      $('#themeLink').attr('href','css/'+newTheme+'.css');
      $("#themeChoices .theme.active").removeClass("active");
      $(this).addClass("active");
      Cookies.set('theme', newTheme, { expires: 365 });
      console.log(Cookies.get('theme'));

      setTimeout( function() {
        $("#themes").blur();
      }, 150);
    }
    else {

    }
  });



// tab switch ajax
var tabLoad = function() {
	var currentTabLink = window.location.hash.substring(1);
	var currentTab = $('a.tab[href^="#'+currentTabLink+'"]');

  var tabs = document.getElementById('pageTabs');

	var tabWidth = $(currentTab).outerWidth();
	var tabPosition = $(currentTab).position().left + tabs.scrollLeft;
	$("#bodyArea").removeClass("reveal");

    if ($("#pageTabs a[href='#"+currentTabLink+"']").length > 0) {
        $("#indicator").css({left: tabPosition, width:tabWidth});
		$(currentTab).addClass('active').siblings().removeClass("active");
		$("#bodyArea").empty().load( "internalpages/" + currentTabLink + ".html", function (data) {

      carouselInit = false;
      slick_mobile();

    });

		$("#bodyArea").addClass("reveal");
    }
    else {
    	var firstTab = $("#pageTabs a:first").attr("href");
    	console.log(firstTab);
    	$(firstTab).addClass("active");

    	$("#pageTabs a:first")[0].click();
    }

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

//floating action placement
var floatingActionFunction = function() {
	if ($(window).width() > 1024) {
		var floatingActionPosition = $("#floatingAction").offset().top;

		$(window).on( 'scroll', function(){
			if ($(window).scrollTop() >= floatingActionPosition) {
			    $('#floatingAction').css({position: "fixed", top: "0px"});
			    setTimeout(function(){
					$('#floatingAction').addClass("bottom");
				}, 1);
			} else {
				$('#floatingAction').css({position: "absolute", top: "auto"});
				setTimeout(function(){
					$('#floatingAction').removeClass("bottom");

				}, 1);
			}
		});
	}
	else {
		$('#floatingAction').removeAttr("style");
		setTimeout(function(){
			$('#floatingAction').removeClass("bottom");
		}, 1);
	};
};

var slick_mobile = function() {

  if(!$('.dashBoard').length) {
    return false;
  }

  $('.dashBoard').on('init', function(){
    carouselInit = true;
  });

	if ($(window).width() > 767) {
    if(carouselInit) {
      $('.dashBoard').slick('unslick');
      carouselInit = false;
    }
	} else {
    if(!carouselInit) {
      $('.dashBoard').slick({
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 1,
        arrows: false,
        centerMode: true,
        centerPadding: '0px',
      });
    }
	}
}



// scroll to drag to scroll

$.fn.attachDragger = function(){
    var attachment = false, lastPosition, position, difference;
    $( $(this).selector ).on("mousedown mouseup mousemove",function(e){
        if( e.type == "mousedown" ) attachment = true, lastPosition = [e.clientX, e.clientY];
        if( e.type == "mouseup" ) attachment = false;
        if( e.type == "mousemove" && attachment == true ){
            position = [e.clientX, e.clientY];
            difference = [ (position[0]-lastPosition[0]), (position[1]-lastPosition[1]) ];
            $(this).scrollLeft( $(this).scrollLeft() - difference[0] );
            $(this).scrollTop( $(this).scrollTop() - difference[1] );
            lastPosition = [e.clientX, e.clientY];
        }
    });
    $(window).on("mouseup", function(){
        attachment = false;
    });
}





//CLICKS


$(".expandableTool:not(.simple) .toggle").click(function() {
    $(this).parent().toggleClass('open');
  });




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

    drawCharts();

	});

	$(".chatBox .chatTools .minimize").click(function () {
		$(this).parents(".chatBox").toggleClass("open");
	});



  $("#floatingAction").click(function() {
      $(this).toggleClass("reveal");
  });

	



	// Overlays

	$("a.overlayLink").click(function(e) {
		e.preventDefault();
		var overlay = $(this).attr('href');
		console.log(overlay);

		$(overlay).addClass("open");
		$("body").addClass("overlay-open");
	});
	$(".overlay .close").click(function() {
		$(this).parents(".overlay").removeClass("open");
		$("body").removeClass("overlay-open");
	});


	// alerts 

	$(".alert .close").click(function(){
		$(this).parent(".alert").removeClass("visible");

	});

	$(".announce .close").click(function(){
		$(this).parents(".announce").removeClass("visible");

	});


	// Map switch

	$("#interactiveMap .switcheroo").click(function() {
		$("#interactiveMap").toggleClass("mapView");
	});


// tab switch ajax

	if(window.location.hash) { // if the URL has a hash tag on page load
		tabLoad(); // Expanding ajax functionality
	}

	$(window).hashchange(function(){ // if URL hash tag changes
		tabLoad(); // Expanding ajax functionality
	});


// date time results preview






$(document).ready(function () {


  readCookieCSS();/*reading cookie on page load*/


	tabLoad();

	// Nav drag re size functionality
	$(window).on('resize', resizeNav);
	resizeNav();



	$(window).on('resize', resizeRight);



	$(window).on('resize', floatingActionFunction);
	floatingActionFunction();



	// Slider dashboard mobile functionality
	$(window).on('resize', slick_mobile);
  slick_mobile();







}); // Doc ready
