class ObjectFit {
	constructor(imgContainer) {
		this.imgContainer = imgContainer;
		this.init();
	}
	init() {
		this.createBackgroundImage();
	}
	createBackgroundImage() {
		const img = this.imgContainer.find("img");
		const imgSrc = img[0].src;
		this.imgContainer.addClass('img-cover').css({
			"background-image" : `url(${imgSrc})`
		});
	}
}

module.exports = ObjectFit
