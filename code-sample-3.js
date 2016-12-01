//code sample functionality for a wordpress cms website "media-center"
//sidenav turns into a responsive dropdown in mobile
//videos open up in modals

"use strict";

function SideMenu() {
	this.sideMenuItems = $("#primary .menu-side-navigation-container #menu-side-navigation li a");

	this.itemClassOnLoad();
	this.toBuild();
	this.replaceDropdownText();
};

SideMenu.prototype = {

	constructor: SideMenu,

	replaceDropdownText: function() {
		const sideMenuItems = this.sideMenuItems;
		const pathName = location.pathname;
		sideMenuItems.each(function(index){
			const itemLink = sideMenuItems[index].href;
			const partialLink = itemLink.split("http://localhost:8888").pop();
			const linkText = $(sideMenuItems[index]).text();
			if (pathName == partialLink) {
				sideMenuItems.parents(".dropdown").find('.btn').html(`${linkText}<span class="caret"></span>`);
			}
		});
	},

	itemAddClass: function(item) {
		item.addClass("menu-item-active");
	},

	itemRemoveClass: function(item) {
		item.removeClass("menu-item-active");
	},

	itemClassOnLoad: function() {
		const pathName = location.pathname;
		const sideMenuItems = this.sideMenuItems;
		const itemAddClass = this.itemAddClass;
		const itemRemoveClass = this.itemRemoveClass;

		sideMenuItems.each(function(index) {
			const itemLink = sideMenuItems[index].href;
			const partialLink = itemLink.split("http://localhost:8888").pop();
			if (pathName == partialLink) {
				itemAddClass($(sideMenuItems[index]));
			}
			else {
				itemRemoveClass($(sideMenuItems[index]));
			}
		});
	},

	buildDropdown: function() { //piece together mobile dropdown menu
		const dropdownList = $(".desktop-sidenav .navlist");
		const btnTemplate = 
			`
		      <button class="btn btn-default dropdown-toggle hidden-sm hidden-md hidden-lg" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Brand Assets
                <span class="caret"></span>
              </button>
            `;
        const navTemplate = `<div class="mobile-sidenav dropdown"></div>`

        dropdownList.addClass("dropdown-menu pull-right");
        dropdownList.attr("aria-labelledby","dropdownMenu1");
        dropdownList.wrap(navTemplate);

        const mobileSideNav = $(".mobile-sidenav");
        mobileSideNav.prepend(btnTemplate);

	},

	toggleDropdown: function(fn, isBuilt) { //toggle dropdown menu depending on window size
		const dropdownList = $(".desktop-sidenav .navlist");
		$(window).resize(function() {
			let winWidth = $(window).width();
			if ( winWidth > 767) {
				dropdownList.removeClass("dropdown-menu pull-right"); //remove dropdown menu on desktop
			}			
			if ( winWidth < 768) {
				dropdownList.addClass("dropdown-menu pull-right"); //add dropdown menu on mobile
			}
			if ( winWidth < 768 && isBuilt == false) { //build on page resize if less than 767px
				fn();
				isBuilt = true; //toggle to build only once
			}			
		});
	},

	toBuild: function() {
		let isBuilt = false;
		const winWidth  = $(window).width();
		const buildDropdown = this.buildDropdown;

		if ( winWidth < 768 && isBuilt == false) { //build on page load if less than 768px
			buildDropdown();
			isBuilt = true; //toggle to build only once
		}

		this.toggleDropdown(buildDropdown, isBuilt);
	}

};

function Video() {
  this.appendModal();
  this.playModalVideo();
};

Video.prototype = {

	constructor: Video,

	appendModal: function() {
		      // <div class="modal-header">
		      //     <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		      // </div>
		this.modalTemplate = 
	  	`
		<div id="myModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-body">
		          <iframe class="youtube_embed_iframe" allowfullscreen="true" src="" id="widget2"></iframe>
		      </div>
		    </div>
		  </div>
		</div>
		`
		$("#container-12170").append(this.modalTemplate);
	},

	playModalVideo: function() { //video img on click, take video src and create iframe for it in modal
		const videoImg = "#container-12170 .wp-caption img"
		$("body").on("click", videoImg, function(e) {
			e.preventDefault();
			const youtubeID = $(this)[0].alt;
	        const src = "//www.youtube.com/embed/" + youtubeID + "?autoplay=0&theme=dark&loop=0&fs=1&showinfo=1&modestbranding=0&iv_load_policy=1&color=red&autohide=1&disablekb=0&enablejsapi=1&version=3";
	        $("#myModal").modal("show");
	        $("#myModal iframe").attr("src", src);
	    });

		$("#myModal").on("hidden.bs.modal", function () {
		    $("#myModal iframe").removeAttr("src");
		})
	}
}

function init() {
	new SideMenu();
	new Video();
}

document.addEventListener("DOMContentLoaded", function(e) {
	init();
});

