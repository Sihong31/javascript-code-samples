class VideoSection {
	constructor(videoSection) {
		this.videoSection = videoSection;
		this.init();
	}
	init() {
		this.onClick();
	}
	onClick() {
		this.videoSection.on("click", this.toggleVid);
	}
	toggleVid = (e) => {
		let $this = $(e.currentTarget),
			currentContainer = $this.find(".video-container"),
			currentVid = $this.find("video")[0],
			siblingContainers = $this.siblings().find(".video-container");

		if (currentVid.paused) {
			currentContainer.addClass("play-active");
			currentVid.play();
			if(!currentVid.paused) {
				siblingContainers.each(this.pauseSiblingVideos);
			}
		}

		else {
			currentContainer.removeClass("play-active");
			currentVid.pause();
		}

	}
	pauseSiblingVideos(index, value) {
		let $container = $(value);
		let $vid = $container.find("video");
		$vid[0].pause();
		$container.removeClass("play-active");
	}
}

module.exports = VideoSection