//header functionality for a landing page
"use strict";
function NavHeader() {
	this.slickCarousel = $('.slick-carousel');

	this.slideHeader();
	this.showSearchBox();
	this.toggleCloseBtn();
	this.determineBtnState();
}

NavHeader.prototype = {

	constructor: NavHeader,

	toggleCloseBtn: function() {
		const hamBurgerBtn = `
							<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#cure-nav" aria-expanded="false">
						  		<span class="sr-only">Toggle navigation</span>
				                <span class="icon-bar"></span>
				                <span class="icon-bar"></span>
				                <span class="icon-bar"></span>
			              	</button>
			              	 `;  
	    const closeBtn = `
						    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#cure-nav" aria-expanded="false">
						    	<span class="nav-close-btn" data-target="#cure-nav">X</span>
						    </button>
	    				 `;

		$("body").on("click", "#cure-navbar button.navbar-toggle", function() {
			const navToggle = $("#cure-navbar button.navbar-toggle");
			if (navToggle.hasClass("collapsed")) {
				navToggle.replaceWith(closeBtn);
			}
			else {
				navToggle.replaceWith(hamBurgerBtn);			
			}
	
		})              

	},

	toggleDonateBtn: function(navbar, donateBtn) {
		const winWidth = window.innerWidth;
		if (navbar.hasClass("cure-navbar-active") || winWidth < 1001) {
			donateBtn.removeClass("hidden");
		}	
		else {
			donateBtn.addClass("hidden");
		}			
	},

	determineBtnState: function() {	
		const navbar = $("#cure-navbar");
		const donateBtn = $(".nav-donate-btn");
		const slickCarousel = this.slickCarousel;
		const toggleDonateBtn = this.toggleDonateBtn;

		toggleDonateBtn(navbar, donateBtn);

		$("body").on("click", "#cure-navbar", function() {
			toggleDonateBtn(navbar, donateBtn);
		})

		$(window).resize(function() {
			toggleDonateBtn(navbar, donateBtn);
		});

		slickCarousel.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			toggleDonateBtn(navbar, donateBtn);
		});		

		slickCarousel.on('afterChange', function(event, slick, currentSlide, nextSlide) {
			if ($(".navbar-toggle")[0].getAttribute("aria-expanded") === "true" && currentSlide !=0) {
				donateBtn.removeClass("hidden");
			}
		});
	},

	toggleDownArrow: function(nextSlideID) {
		const downArrow = $(".down-arrow-container")
		if (nextSlideID == 4) {
			// downArrow.fadeTo("slow", "0");
			downArrow.css("opacity", 0);
		}	
		else if (nextSlideID != 4) {
			// downArrow.fadeTo("slow", "1");
			downArrow.css("opacity", 1);
		}
	},
	slideHeader: function() {
		const slickCarousel = this.slickCarousel;
		const cureNav = $("#cure-navbar");
		const navItem = $("ul.navbar-nav li");
		const toggleDownArrow = this.toggleDownArrow;

		slickCarousel.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			let currentSlideID = $(slick.$slides[currentSlide]).data('slick-index');
			let nextSlideID = $(slick.$slides[nextSlide]).data('slick-index');
			const winWidth = window.innerWidth;
			if (winWidth > 1000) {
				if (currentSlide == 0) {

					navItem.animate({
						marginLeft: "-40",
						ease: "swing"
					}, 800)

					cureNav.animate({
						right: '-50%',
						ease: "swing"
					}, 800)

					cureNav.animate({ 
					   easing: "swing"
					}, 0, function() {
					   cureNav.addClass("cure-navbar-active");
					   cureNav.css("right", "0");
					});
				}

				if ( (currentSlideID == 4 || currentSlideID == 1) && nextSlideID == 0 ) {
					cureNav.css("right", "-50%");
					cureNav.removeClass("cure-navbar-active");
					navItem.animate({
						marginLeft: "0",
						ease: "swing"
					}, 800)

					cureNav.animate({ 
					   right: '0',
					   easing: "swing"
					}, 800, function() {
					});	
				}
			}

			toggleDownArrow(nextSlideID);

		})		
	},

	showSearchBox: function() {
		const searchBox = $(".navbar form .search-container");
		const searchBtn = $(".navbar form .cure-search-btn");

		searchBtn.hover(function() {
			searchBox.fadeTo("slow", 1);
		})
	}

}

function init() {
  new NavHeader();
}

document.addEventListener("DOMContentLoaded", function() {
  init();
}, false);
