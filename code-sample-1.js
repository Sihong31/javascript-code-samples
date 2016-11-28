"use strict";

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


//use to create new objects
function jsonObject() {};

//Video functions
function Video() {
  this.mobileVidsArray = [
    "http://d2jq83h1vduk6u.cloudfront.net/carnival_111016_v4_mobile.mp4",
    "http://d2jq83h1vduk6u.cloudfront.net/carnival_111016_v4_mobile.mp4",
    "http://d2jq83h1vduk6u.cloudfront.net/Carnival_final_v04a_mobile.mp4",
    "http://d2jq83h1vduk6u.cloudfront.net/carnival_final_mobile.mp4"
  ]
  this.mobileVidsObj = new jsonObject();

  this.videos = $("video");
  this.videoControls();
  this.createMobileVids(); //call before isMobileVideo() to pass json object
  this.isMobileVideo();
}

Video.prototype = {

  constructor: Video,

  videoPlay: function(video, playbutton) {
    playbutton.hide();
    video.play();
  },

  videoPause: function(video, playbutton) {
    playbutton.show();
    video.pause();
  },

  pauseOtherVids: function(videos, dataAttribute) { //pause other videos when another video is clicked on for playing
    const videoPlay = this.videoPlay;
    const videoPause = this.videoPause;

    videos.each(function(index) {
      const currentDataAtt = videos[index].getAttribute("data-attribute"); //find data-attribute of current video element
      const playButton = $(`#video-${currentDataAtt}-pb`); //play button for current video element
      if (currentDataAtt !== dataAttribute) { //pause all other videos when current video is clicked to play
        videoPause(videos[index], playButton);
      }
      else {
        videoPlay(videos[index], playButton);
      }
    });

  },

  videoControls: function() {
    const videoComponents = $("video, .play-button");
    const videos = this.videos;
    const pauseOtherVids = this.pauseOtherVids.bind(this);

    const videoPlay = this.videoPlay;
    const videoPause = this.videoPause;

    videoComponents.click(function(e) {
      e.preventDefault();

      const dataAttribute = $(this)[0].getAttribute("data-attribute");
      const video = $(`#video-${dataAttribute}`)[0];
      const playButton = $(`#video-${dataAttribute}-pb`);

      if (video.paused) {
        videoPlay(video, playButton);
        pauseOtherVids(videos, dataAttribute);
      }

      else {
        videoPause(video, playButton);
      }

    });
  },

  createMobileVids: function() { //create json object from mobileVidsArray
    this.mobileVidsObj.Videos = new jsonObject();
    for (let i = 1; i <= this.mobileVidsArray.length; i++) {
      let sourceNum = `Source${i}`; //Source1, Source2, Source3...
      this.mobileVidsObj.Videos[sourceNum] = this.mobileVidsArray[i-1]; //set keys as Source# and value as video link
    }
            // this.mobileVidsObj = {
            //   "Videos": {
            //     "Source1":"link",
            //     "Source2":"link",
            //     "Source3":"link",
            //   }
            // }
  },

  isMobileVideo: function() { //find out if a mobile video is needed because user agent matches a mobile device
    if( isMobile.any()) {
      const videos = this.videos;
      const mobileVidsObj = this.mobileVidsObj;
      videos.each(function(index) {
        const vidID = videos[index].getAttribute("data-attribute");
        const vidSource = `Source${vidID}`;
        videos[index].src = mobileVidsObj.Videos[vidSource];
      });
    }
  }
}

//Page scroll functions
function Page() {
  this.pageScroll();
}

Page.prototype = {

    constructor: Page,

    calculateDistance: function(el) {
        el.videoOffset = $("#video-1").offset().top;
        el.videoHeight = $("#video-1").height();
        el.windowHeight = $(window).height();

        const distance = el.videoOffset - el.windowHeight + el.videoHeight;
        return distance;
    },

    pageOn: function(page) {
      page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function() {
        page.stop(); //stop scroll animation if user does something manual
      });
    },
    pageOff: function(page) {
      page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
    },

    pageScroll: function() {
      const page = $("html,body");
      const arrow = $("#scroll-arrow");
      const pageOn = this.pageOn;
      const pageOff = this.pageOff;
      const calculateDistance = this.calculateDistance;

      arrow.click(function(e) {
        const distance = calculateDistance(this); //taken into account window resizing, recalculate distance

        e.preventDefault();
        pageOn(page);

        page.animate( {
          scrollTop: distance
        }, 1000, function() {
          pageOff(page);
        });

      });
    }
}

//initialize
function init() {
  new Page();
  new Video();
  isMobile.any();
}

document.addEventListener("DOMContentLoaded", function() {
  init();
}, false);

