function mobileDownArrow() {
	this.page = $("html, body");
	this.headerHeight = $("body.front .header-background").height();
	this.mobileDownArrow = ".mobile-down-arrow-container";
	this.onClick();
}

mobileDownArrow.prototype = {

	constructor: mobileDownArrow,

	pageOn: function(page) {
	    page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
	       page.stop();
	    });
	},

	pageOff: function(page) {
		page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
	},

	scrollDown: function(scrollTo, headerHeight, page, pageOn, pageOff) {
		pageOn(page);
		page.animate({
			scrollTop: scrollTo.offset().top - headerHeight //headerHeight is height of the fixed header blocking top of section
		}, 1000, function(){
			pageOff(page);
		});	
	},

	onClick: function() {

		const mobileDownArrow = this.mobileDownArrow;
		const scrollDown = this.scrollDown;
		const headerHeight = this.headerHeight;
		const page = this.page;
		const pageOn = this.pageOn;
		const pageOff = this.pageOff;
		const sectionsArr = [".section-1b", ".section-2", ".section-3", ".section-4", ".footer"];
		let scrollTo;

		$("body").on("click", mobileDownArrow, function(){
			if ($(this).parents("section").hasClass("section-1a")) {
				scrollTo = $(sectionsArr[0]);
				scrollDown(scrollTo, headerHeight, page, pageOn, pageOff);
			}			
			if ($(this).parents("section").hasClass("section-1b")) {
				scrollTo = $(sectionsArr[1]);
				scrollDown(scrollTo, headerHeight, page, pageOn, pageOff);
			}			
			if ($(this).parents("section").hasClass("section-2")) {
				scrollTo = $(sectionsArr[2]);
				scrollDown(scrollTo, headerHeight, page, pageOn, pageOff);
			}			
			if ($(this).parents("section").hasClass("section-3")) {
				scrollTo = $(sectionsArr[3]);
				scrollDown(scrollTo, headerHeight, page, pageOn, pageOff);
			}			
			if ($(this).parents("section").hasClass("section-4")) {
				scrollTo = $(sectionsArr[4]);
				scrollDown(scrollTo, headerHeight, page, pageOn, pageOff);
			}
		});
	}

}

function init() {
	new mobileDownArrow();
}

document.addEventListener("DOMContentLoaded", function() {
  init();
}, false);

