class SlickCarousel {
  constructor(elem) {
    this.slickCarousel = elem;
    this.running = false;
    this.initSlickCarousel();
    this.toggleSlickCarousel();
    this.onDownArrowClick();
    this.onMouseWheelChange();
    this.slickEvent();
    this.arrow = $('.down-arrow-container');
  }
  initSlickCarousel() {
    const slickCarousel = $('#slick-carousel');
    const winWidth = window.innerWidth;

    slickCarousel.not('.slick-initialized').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      initialSlide: 0,
      draggable: true,
      infinite: false,
      cssEase: 'ease-out',
      speed: 800,
      swipeToSlide: true,
      vertical: true,
      verticalSwiping: true,
      waitForAnimate: true,
      responsive: [{
        breakpoint: 768,
        draggable: false,
        settings: "unslick",
        vertical: false,
        verticalSwiping: false
      }]
    });
    if (winWidth < 768) {
      this.slickCarousel.removeClass("slick-carousel");
      this.mobile = true;
    } else {
      this.desktop = true;
    }
  }
  slickEvent() {
    this.slickCarousel.on('afterChange', $.proxy(this.reset, this));
    this.slickCarousel.on('beforeChange', $.proxy(this.setArrow, this));
  }
  setArrow(event, slickk, currentSlide, nextSlide){
    console.log(currentSlide, nextSlide)
    if(nextSlide === 4 || currentSlide === 4){
      console.log(true);
      this.arrow.toggleClass('show')
    }
  }
  reset(event, slick, currentSlide, nextSlide) {
    this.running = false;
    setTimeout($.proxy(this.onMouseWheelChange, this), 700);
  }
  carouselToggleLogic() {
    const winWidth = window.innerWidth;
    if (winWidth < 768 && this.desktop) {
      this.desktop = false;
      this.mobile = true;
      this.slickCarousel.removeClass("slick-carousel");
    } else if (winWidth > 768 && this.mobile) {
      this.initSlickCarousel();
      this.desktop = true;
      this.mobile = false;
      this.running = false;
      this.slickCarousel.addClass("slick-carousel");
    }
  }
  toggleSlickCarousel() {
    $(window).resize($.proxy(this.carouselToggleLogic, this));
  }
  onDownArrowClick() {
    const slickCarousel = this.slickCarousel;
    const downArrow = $('.down-arrow-container');
    downArrow.click(function() {
      slickCarousel.slick('slickNext');
    })
  }
  sendSlid(event) {
    if (this.desktop) {
      if (!this.running) {
        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
          this.slickCarousel.slick('slickPrev');
        } else {
          this.slickCarousel.slick('slickNext');
        }
        this.running = true
        $(window).off('mousewheel DOMMouseScroll');
      }
    }
  }
  onMouseWheelChange() {
    $(window).on('mousewheel DOMMouseScroll', $.proxy(this.sendSlid, this));
  }
}

module.exports = SlickCarousel;
