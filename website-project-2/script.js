"use strict";
const ToScroll = require('./to-scroll.js');
const Carousel = require('./asset-carousel.js');
const VideoSection = require('./video.js');
const setMobileVideo = require('./set-mobile-video.js');

const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

//initialize
let domLoaded = () => {
    let $body = $('body'),
        $window = $(window),
        arrow = $body.find(".scroll-arrow"),
        carousel = $body.find('.carousel-container'),
        carouselVidContainers = carousel.find(".video-container"),
        carouselString = mobileCarouselVideoLinkString,
        videoSection = $body.find('.video-and-header-section'),
        videoSectionContainers = videoSection.find(".video-container"),
        videoSectionString = mobileVideoLinkString,
        scrollToSection;

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
