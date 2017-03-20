/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var ToScroll = __webpack_require__(2);
	var Carousel = __webpack_require__(3);
	var VideoSection = __webpack_require__(4);
	var setMobileVideo = __webpack_require__(5);
	// const enableInlineVideo = require('./iphone-inline-video.min.js');

	var isMobile = {
	    Android: function Android() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function BlackBerry() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function iOS() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    Opera: function Opera() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function Windows() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    any: function any() {
	        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
	    }
	};

	//initialize
	var domLoaded = function domLoaded() {
	    var $body = $('body'),
	        $window = $(window),
	        arrow = $body.find(".scroll-arrow"),
	        carousel = $body.find('.carousel-container'),
	        carouselVidContainers = carousel.find(".video-container"),
	        carouselString = mobileCarouselVideoLinkString,
	        videoSection = $body.find('.video-and-header-section'),
	        videoSectionContainers = videoSection.find(".video-container"),
	        videoSectionString = mobileVideoLinkString,
	        scrollToSection = void 0;

	    scrollToSection = $body.find(".video-and-header-section");

	    isMobile.any();

	    if (scrollToSection.length > 0) {
	        new ToScroll($window, arrow, scrollToSection);
	    }

	    if (carousel.length > 0) {
	        new Carousel(carousel);
	    }

	    if (videoSection.length > 0) {
	        new VideoSection(videoSection);
	    }

	    if (carouselVidContainers.length > 0) {
	        new setMobileVideo(carouselVidContainers, carouselString, isMobile);
	    }

	    if (videoSectionContainers.length > 0) {
	        new setMobileVideo(videoSectionContainers, videoSectionString, isMobile);
	    }
	};

	document.addEventListener('DOMContentLoaded', domLoaded);

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	//Page scroll functions
	var ToScroll = function () {
	    function ToScroll($window, clickTarget, scrollToEl) {
	        var _this = this;

	        _classCallCheck(this, ToScroll);

	        this.scrollDown = function () {
	            var distance = _this.scrollToEl.offset().top;

	            TweenMax.to(_this.window, 1.5, {
	                scrollTo: distance,
	                ease: Power2.easeOut
	            });
	        };

	        this.window = $window;
	        this.clickTarget = clickTarget;
	        this.scrollToEl = scrollToEl;
	        this.init();
	    }

	    _createClass(ToScroll, [{
	        key: "init",
	        value: function init() {
	            this.initiateScroll();
	        }
	    }, {
	        key: "initiateScroll",
	        value: function initiateScroll() {
	            this.clickTarget.on("click", this.scrollDown);
	        }
	    }]);

	    return ToScroll;
	}();

	module.exports = ToScroll;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Carousel = function () {
		function Carousel(carousel) {
			var _this = this;

			_classCallCheck(this, Carousel);

			this.toggleVid = function (e) {
				var $this = $(e.currentTarget),
				    $currentVid = $this.find("video"),
				    currentVid = $currentVid[0],
				    siblingContainers = $this.parents("body").find(".video-and-header-section .video-container"),
				    isVideo = $currentVid.length > 0 ? true : false;

				if (currentVid.paused && isVideo) {
					$this.addClass("play-active");
					currentVid.play();
					if (!currentVid.paused) {
						siblingContainers.each(_this.pauseSiblingVideos);
					}
				} else {
					$this.removeClass("play-active");
					currentVid.pause();
				}
			};

			this.pauseOnSlide = function () {
				var currentSlide = _this.carousel.find(".slick-active"),
				    currentContainer = currentSlide.find(".video-container"),
				    $currentVid = currentContainer.find("video"),
				    currentVid = $currentVid[0],
				    isVideo = $currentVid.length > 0 ? true : false;

				if (isVideo) {
					currentVid.pause();
					currentContainer.removeClass("play-active");
				}
			};

			this.carousel = carousel;
			this.init();
		}

		_createClass(Carousel, [{
			key: "init",
			value: function init() {
				this.initSlick(this.carousel);
				this.vidOnClick();
				this.onSlide();
			}
		}, {
			key: "initSlick",
			value: function initSlick(carousel) {
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
		}, {
			key: "vidOnClick",
			value: function vidOnClick() {
				this.carousel.on("click", ".slick-slide .video-container", this.toggleVid);
			}
		}, {
			key: "onSlide",
			value: function onSlide() {
				this.carousel.on('beforeChange', this.pauseOnSlide);
			}
		}, {
			key: "pauseSiblingVideos",
			value: function pauseSiblingVideos(index, value) {
				var $container = $(value);
				var $vid = $container.find("video");
				$vid[0].pause();
				$container.removeClass("play-active");
			}
		}]);

		return Carousel;
	}();

	module.exports = Carousel;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VideoSection = function () {
		function VideoSection(videoSection) {
			var _this = this;

			_classCallCheck(this, VideoSection);

			this.toggleVid = function (e) {
				var $this = $(e.currentTarget),
				    currentContainer = $this.find(".video-container"),
				    currentVid = $this.find("video")[0],
				    siblingContainers = $this.siblings().find(".video-container");

				if (currentVid.paused) {
					currentContainer.addClass("play-active");
					currentVid.play();
					if (!currentVid.paused) {
						siblingContainers.each(_this.pauseSiblingVideos);
					}
				} else {
					currentContainer.removeClass("play-active");
					currentVid.pause();
				}
			};

			this.videoSection = videoSection;
			this.init();
		}

		_createClass(VideoSection, [{
			key: "init",
			value: function init() {
				this.onClick();
			}
		}, {
			key: "onClick",
			value: function onClick() {
				this.videoSection.on("click", this.toggleVid);
			}
		}, {
			key: "pauseSiblingVideos",
			value: function pauseSiblingVideos(index, value) {
				var $container = $(value);
				var $vid = $container.find("video");
				$vid[0].pause();
				$container.removeClass("play-active");
			}
		}]);

		return VideoSection;
	}();

	module.exports = VideoSection;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SetMobileVideo = function () {
		function SetMobileVideo(containers, string, isMobile) {
			var _this = this;

			_classCallCheck(this, SetMobileVideo);

			this.setMobileLinks = function (index, value) {
				if (_this.isMobile.any()) {
					value.src = "//" + _this.mobileVidArray[index];
				}
			};

			this.isMobile = isMobile;
			this.containers = containers;
			this.videos = this.containers.find("video");
			this.string = string;
			this.init();
		}

		_createClass(SetMobileVideo, [{
			key: "init",
			value: function init() {
				this.loopArray();
			}
		}, {
			key: "loopArray",
			value: function loopArray() {
				this.mobileVidArray = this.string.split("|");
				this.videos.each(this.setMobileLinks);
			}
		}]);

		return SetMobileVideo;
	}();

	module.exports = SetMobileVideo;

/***/ }
/******/ ]);