function Footer() {
	this.footer = $("body.front .footer.region-footer");
	this.regionBottom = $("body.front .region-bottom");
	this.addSecondRowWrap();
	this.appendFooter();
}

Footer.prototype = {

	constructor: Footer,

	addSecondRowWrap: function() {
		const footerLinks = $("#block-menu-menu-footer-links");
		const socialLinks = $("#block-menu-menu-social-media-menu");
		const wrapper = `<div class="footer-row-2"></div>`;

		footerLinks.add(socialLinks).wrapAll(wrapper);
	},

	removeInitialFooter: function(footer, regionBottom) {
		footer.add(regionBottom).remove();
	},

	appendFooter: function() {
		const lastSection = $("body.front .section-4");
		const footer = this.footer;
		const regionBottom = this.regionBottom;

		this.removeInitialFooter(footer, regionBottom);
		lastSection.append(footer.add(regionBottom));
	}


}


function init() {
  new Footer();
}

document.addEventListener("DOMContentLoaded", function() {
  init();
}, false);