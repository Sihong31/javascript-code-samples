//vertical slick carousel functionality for a landing page

"use strict";
function SlickCarousel() {
  this.slickCarousel = $('#slick-carousel');

  this.initSlickCarousel();
  this.toggleSlickCarousel();
  this.onDownArrowClick();
  this.onMouseWheelChange();
}

SlickCarousel.prototype = {

  constructor: SlickCarousel,

  initSlickCarousel: function() {
    const slickCarousel = $('#slick-carousel');
    slickCarousel.not('.slick-initialized').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      initialSlide: 0,
      // fade: true,
      draggable: true,
      infinite: false,
      cssEase: 'ease-out',
      speed: 800,
      swipeToSlide: true,
      vertical: true,
      verticalSwiping: true,
      waitForAnimate: true,
      responsive: [
        {
          breakpoint: 767,
          draggable: false,
          settings: "unslick",
          vertical: false,
          verticalSwiping: false
        }
      ]
    });
  },

  carouselToggleLogic: function(init, slickCarousel) {
    const winWidth = window.innerWidth;

    if (winWidth < 768) {
      slickCarousel.removeClass("slick-carousel");
    }
    else {
      init();
      slickCarousel.addClass("slick-carousel");
    }

  },

  toggleSlickCarousel: function() {
      const carouselToggleLogic = this.carouselToggleLogic;
      const slickCarousel = this.slickCarousel;
      const init = this.initSlickCarousel;
      $(window).load(function(){
        carouselToggleLogic(init, slickCarousel);
      });

      $(window).resize(function(){
        carouselToggleLogic(init, slickCarousel);
      });
  },

  onDownArrowClick: function() {
    const slickCarousel = this.slickCarousel;
    const downArrow = $('.down-arrow-container');
    downArrow.click( function() {
      slickCarousel.slick('slickNext');
    })
  },

  onMouseWheelChange: function() {
    const slickCarousel = this.slickCarousel;
    $(window).bind('mousewheel DOMMouseScroll', function(event){
        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            slickCarousel.slick('slickPrev');
        }
        else {
             slickCarousel.slick('slickNext');
        }
    });
    
  }

}

function init() {
  new SlickCarousel();
}

document.addEventListener("DOMContentLoaded", function() {
  init();
}, false);




