class Carousel {
	constructor(carousel) {
		this.carousel = carousel;
		this.init();
	}
	init() {
		this.initSlick(this.carousel);
		this.vidOnClick();
		this.onSlide();
	}
	initSlick(carousel) {
		carousel.slick({
		  cssEase: 'ease-out',
		  dots: true,
		  infinite: false,
		  speed: 500,
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  useTransform: true
		});		
	}
	toggleVid = (e) => {
		let $this = $(e.currentTarget),
			$currentVid = $this.find("video"),
			currentVid = $currentVid[0],
			siblingContainers = $this.parents("body").find(".video-and-header-section .video-container"),
			isVideo = $currentVid.length > 0 ? true : false;

		if (currentVid.paused && isVideo) {
			$this.addClass("play-active");
			currentVid.play();
			if (!currentVid.paused) {
				siblingContainers.each(this.pauseSiblingVideos);
			}
		}
		else {
			$this.removeClass("play-active");
			currentVid.pause();
		}
	}
	pauseOnSlide = () => {
		let currentSlide = this.carousel.find(".slick-active"),
			currentContainer = currentSlide.find(".video-container"),
			$currentVid = currentContainer.find("video"),
			currentVid = $currentVid[0],
			isVideo = $currentVid.length > 0 ? true : false;

			if (isVideo) {
				currentVid.pause();
				currentContainer.removeClass("play-active");
			}
	}
	vidOnClick() {
		this.carousel.on("click", ".slick-slide .video-container", this.toggleVid);
	}
	onSlide() {
		this.carousel.on('beforeChange', this.pauseOnSlide);
	}
	pauseSiblingVideos(index, value) {
		let $container = $(value);
		let $vid = $container.find("video");
		$vid[0].pause();
		$container.removeClass("play-active");
	}

}

module.exports = Carousel