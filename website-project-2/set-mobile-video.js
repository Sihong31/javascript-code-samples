class SetMobileVideo {
	constructor(containers, string, isMobile) {
		this.isMobile = isMobile;
		this.containers = containers;
		this.videos = this.containers.find("video");
		this.string = string;
		this.init();
	}
	init() {
		this.loopArray();
	}
	loopArray() {
		this.mobileVidArray = this.string.split("|");
		this.videos.each(this.setMobileLinks);
	}
	setMobileLinks = (index, value) => {
		if (this.isMobile.any()) {
			value.src = "//" + this.mobileVidArray[index];			
		}
	}
}

module.exports = SetMobileVideo