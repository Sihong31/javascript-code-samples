//footer functionality for a landing page
"use strict";
function Footer() {
	this.slickCarousel = $('#slick-carousel');
	this.footer = $(".footer");
	this.regionBottom = $(".region-bottom");

	this.toggleFooter();
}

Footer.prototype = {

	constructor: Footer,

	footerState: function(slickCarousel, footer, regionBottom) {
		const winWidth = window.innerWidth;

		slickCarousel.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			let currentSlideID = $(slick.$slides[currentSlide]).data('slick-index');
			let nextSlideID = $(slick.$slides[nextSlide]).data('slick-index');
			if (winWidth > 767) {
				if (nextSlideID == 4) {
					// footer.add(regionBottom).fadeTo("slow", 1);
					footer.add(regionBottom).css("opacity", 1);
				}
				else {
					// footer.add(regionBottom).fadeTo("slow", 0);
					footer.add(regionBottom).css("opacity", 0);
				}
			}
			else {
				footer.add(regionBottom).css("opacity", 1);
			}
		});

		if (winWidth > 767) {
			footer.add(regionBottom).css("opacity", 0);
		}
		else {
			footer.add(regionBottom).css("opacity", 1);
		}
	},

	toggleFooter: function() {
		const footerState = this.footerState;
		const slickCarousel = this.slickCarousel;
		const footer = this.footer;
		const regionBottom = this.regionBottom;

		$(window).resize(function(){
			footerState(slickCarousel, footer, regionBottom);
		});

		footerState(slickCarousel, footer, regionBottom);

	}

}


function init() {
  new Footer();
}

document.addEventListener("DOMContentLoaded", function() {
  init();
}, false);