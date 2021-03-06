
$('body').scrollspy({ target: '.navmenu' });

// When we click on the LI
$("ul.qcontrols li").click(function(){
  // If this isn't already active
  if (!$(this).hasClass("active")) {
    // Remove the class from anything that is active
    $("ul.qcontrols li.active").removeClass("active");
    // And make this active
    $(this).addClass("active");
  }
});


//WOW Scroll Spy
var wow = new WOW({
    //disabled for mobile
    mobile: false
});
wow.init();

jQuery(document).ready(function( $ ) {
        $('.circle').circleProgress({
        // ,
        value: $('.percent')[0].innerText*0.01,
        startAngle: 4.75,
        size: 200,
        fill: { gradient: ["#FFFFFF"] }
      });
        $('.two').circleProgress({
          value: $('.percent')[1].innerText*0.01,
        });
        $('.three').circleProgress({
          value: $('.percent')[2].innerText*0.01,
        });
        $('.four').circleProgress({
          value: $('.percent')[3].innerText*0.01,
        });

   //Clients carousel Slider
    $('#clients-carousel').owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 400,
        paginationSpeed: 800,
        autoPlay: true,
        pagination : false,
        items : 4,
        itemsCustom : false,
        itemsDesktop : [1199,4],
        itemsDesktopSmall : [980,3],
        itemsTablet: [768,2],
        itemsTabletSmall: false,
        itemsMobile : [479,1],
    });
          $('#menu').on("click",(function(){
        $('#menu').not(this).removeClass("active");
        $(this).toggleClass("active");
        console.log($('body').width());
      }));
  });

  
//ScrollTop
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
