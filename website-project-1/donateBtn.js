function DonateBtn() {
	this.donateBtn = $(".hidden-xs.cure-btn.donate-btn");
	this.slickCarousel = $("#slick-carousel");
	this.toggleBtn();
}

DonateBtn.prototype = {

	constructor: DonateBtn,

	toggleBtn: function() {

		const donateBtn = this.donateBtn;
		const slickCarousel = this.slickCarousel;

		slickCarousel.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			let currentSlideID = $(slick.$slides[currentSlide]).data('slick-index');
			let nextSlideID = $(slick.$slides[nextSlide]).data('slick-index');

			if (nextSlide == 4) {
				donateBtn.hide();
			}

			else {
				donateBtn.show();
			}

		});
	}

}

function init() {
  new DonateBtn();
}

document.addEventListener("DOMContentLoaded", function() {
  init();
}, false);