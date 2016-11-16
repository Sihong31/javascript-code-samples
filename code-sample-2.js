//code sample involving slick.js and custom functions for the carousel
"use strict";

//Slick Carousel functions
function slickCarousel() {
  const mainSlide = $('.slider-for');
  const carouselNav = $('.slider-nav');

  mainSlide.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    draggable: false,
    // infinite: true,
    asNavFor: '.slider-nav',
    cssEase: 'ease-out',
    speed: 500
  });

  carouselNav.slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    draggable: false,
    infinite: true,
    centerMode: false,
    focusOnSelect: true,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: false
        }
      },    
      { 
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false
        }
      }
    ]
  }); 
}

//Custom Carousel functions
function Carousel() {
  this.sliderNav = $(".slider-nav")
  this.navSlideSelected();
};

Carousel.prototype = {

  constructor: Carousel,

  navSlideSelected: function() {
    this.navThumbnailSelect();
    this.navArrowSelect();  
  },

  navThumbnailSelect: function() { //selected through navigation thumbnail click
    const navSlide = ".slick-slide";
    const playCurrentThumbnail = this.playCurrentThumbnail;
    const sliderNav = this.sliderNav;

    sliderNav.on("click", navSlide, function(e){
      e.preventDefault();

      $(this).addClass("selected");
      $(this).siblings().removeClass("selected");
      
      playCurrentThumbnail( $(this) );
    })
  },

  navArrowSelect: function() { //selected through carousel navigation arrows
    const sliderArrows = ".slick-prev, .slick-next";
    const pauseOnArrowSelect = this.pauseOnArrowSelect;
    
    this.sliderNav.on("click", sliderArrows, function(e){ //resolve event bubbling
      e.preventDefault();

      const navCurrentSlide = $(".slider-nav .slick-current");

      navCurrentSlide.addClass("selected");
      navCurrentSlide.siblings().removeClass("selected");
      pauseOnArrowSelect();
    })
  },


  playCurrentThumbnail: function(el) { //play currently selected thumbnail video, pause all others
    const videos = $("video");
    const slideID = el.data('slide');

    const playButtons = $(".play-button");
    const currentPlayButton = $("#video-" + slideID + "-pb");

    videos.each(function(index){
      const video = videos[index];
      if ( el.hasClass("selected") && index + 1 == slideID ) {
        video.play();
        currentPlayButton.hide();
      }
      else {
        video.pause();
        playButtons.not(currentPlayButton).show();
      }
    });
  },

  pauseOnArrowSelect: function() { //pause currently playing video if user navigates away using arrows
    const videos = $("video");
    videos.each(function (index) {
      const video = videos[index];
      const playButton = $("#video-" + (index + 1) + "-pb");
      if (!video.paused) {
        video.pause();
        playButton.show();
      }
    })
  }

}

function carouselInit() {
  slickCarousel();
  new Carousel();
}