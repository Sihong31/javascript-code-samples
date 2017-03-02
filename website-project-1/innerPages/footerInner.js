class FooterInner {
	constructor(footer) {
		this.footer = footer;
		this.init();
	}
	init(){
		this.wrapSecondRow();
	}
	wrapSecondRow() {
		const footerLinks = this.footer.find("#block-menu-menu-footer-links");
		const socialLinks = this.footer.find("#block-menu-menu-social-media-menu")
		const wrapper = `<div class="footer-row-2"></div>`;

		footerLinks.add(socialLinks).wrapAll(wrapper);
	}
}

module.exports = FooterInner
