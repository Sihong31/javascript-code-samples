var isMobile = {
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
    "http://d2jq83h1vduk6u.cloudfront.net/Carnival_final_v04a_mobile.mp4",
    "http://d2jq83h1vduk6u.cloudfront.net/Carnival_final_v04a_mobile.mp4",
    "http://d2jq83h1vduk6u.cloudfront.net/carnival_final_mobile.mp4"  
  ]
  this.mobileVidsObj = new jsonObject();

  this.videos = $("video");
  this.videoPausePlay();
  this.createMobileVids(); //call before isMobileVideo() to pass json object
  this.isMobileVideo();
}

Video.prototype = {

  constructor: Video,

  createMobileVids: function() { //create json object from mobileVidsArray
    this.mobileVidsObj.Videos = new jsonObject();
    for (var i = 1; i <= this.mobileVidsArray.length; i++) {
      var sourceNum = "Source" + i; //Source1, Source2, Source3...
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

  videoPausePlay: function() { //pause play a video on click
    var videoComponents = $("video, .play-button");
    var videos = this.videos;
    videoComponents.click(function(e) {

      e.preventDefault();

      var dataAttribute = $(this)[0].getAttribute('data-attribute');
      var video = $("#video-" + dataAttribute)[0];
      var playButton = $("#video-" + dataAttribute + "-pb");

      if (video.paused == true) {
        playButton.hide();
        video.play();
        Video.prototype.pauseNotClicked(videos, dataAttribute);
      }

      else {
        playButton.show();
        video.pause();
      }

    });
  },

  pauseNotClicked: function(videos, dataAttribute) { //pause currently playing videos when another video is clicked on for playing

    videos.each(function(index) {
      var currentDataAtt = videos[index].getAttribute('data-attribute'); //find data-attribute of current video element
      var playButton = $("#video-" + currentDataAtt + "-pb"); //play button for current video element

      if (currentDataAtt !== dataAttribute) { //pause all other videos when current video is clicked to play
        videos[index].pause();
        playButton.show();
      }
      else {
        videos[index].play();
        playButton.hide();
      }
    });

  },

  isMobileVideo: function() { //find out if a mobile video is needed because user agent matches a mobile device
    if( isMobile.any()) {
      var videos = this.videos;
      var mobileVidsObj = this.mobileVidsObj;
      videos.each(function(index) { 
        var vidID = videos[index].getAttribute('data-attribute');
        var vidSource = "Source" + vidID
        videos[index].src = mobileVidsObj.Videos[vidSource];
      });
    }  
  }

}

//Page scroll functions
function Page() {

  this.videoOffset = $('#video-1').offset().top;
  this.videoHeight = $('#video-1').height();
  this.windowHeight = $(window).height();

  this.distance = this.videoOffset - this.windowHeight + this.videoHeight;

  this.pageScroll();

}

Page.prototype = {

    constructor: Page,

    pageScroll: function() {

      var page = $('html,body');
      var arrow = $('#scroll-arrow');
      var distance = this.distance;

      arrow.click(function(e) {

        e.preventDefault();
        Page.prototype.pageOn(page);

        page.animate( {
          scrollTop: distance
        }, 2500, function() {
          Page.prototype.pageOff(page);
        });

      });
    },
    pageOn: function(page) {
      page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function() {
        page.stop(); //stop scroll animation if user does something manual
      });
    },
    pageOff: function(page) {
      page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
    }

}

//initialize
function init() {
  new Page();
  new Video();
  isMobile.any();
}

document.addEventListener('DOMContentLoaded', function() {
  init();
}, false);




