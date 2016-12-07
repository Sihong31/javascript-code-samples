//code sample functionality for a wordpress cms website "media-center"
//sidenav turns into a responsive dropdown in mobile
//videos open up in modals

"use strict";

function SideMenu() {
	this.sideMenuItems = $("#primary .menu-side-navigation-container #menu-side-navigation li a");
	this.containerID = parseInt($(".subpage-container").attr("id").split("container-").pop());

	this.itemAddID();
	this.itemClassOnLoad();
	this.toBuild();
	this.dropdownTextState();
};

SideMenu.prototype = {

	constructor: SideMenu,

	replaceDropdownText: function(menuItems, textToReplace) {
		menuItems.parents(".dropdown").find('.btn').html(`${textToReplace}<span class="caret"></span>`);
	},

	dropdownTextState: function() {
		const sideMenuItems = this.sideMenuItems;
		const containerID = this.containerID;
		const replaceDropdownText = this.replaceDropdownText;

		sideMenuItems.each(function(index){
			const itemLinkID = sideMenuItems[index].id;
			const linkText = $(sideMenuItems[index]).text();
			if (containerID == itemLinkID) {

				replaceDropdownText(sideMenuItems, linkText); //makes sure to replace dropdown text on load

				$(window).resize(function() {
					replaceDropdownText(sideMenuItems, linkText); //makes sure to replace dropdown text on window resizing
				});
			}
		});
	},

	itemAddID: function() {
		const idArr = [
						"12138", //brand assets
						"12170", //application videos
						"12203", //product images
						"12215", //testimonials
						"12236"  //news and press releases
					];
		const sideMenuItems = this.sideMenuItems;
		sideMenuItems.each(function(index) {
			$(sideMenuItems[index]).attr("id", idArr[index]);
		});
	},

	itemAddClass: function(item) {
		item.addClass("menu-item-active");
	},

	itemRemoveClass: function(item) {
		item.removeClass("menu-item-active");
	},

	itemClassOnLoad: function() { //determine which menu item on side nav should be active depending on page url
		const sideMenuItems = this.sideMenuItems;
		const itemAddClass = this.itemAddClass;
		const itemRemoveClass = this.itemRemoveClass;

		const containerID = this.containerID;

		sideMenuItems.each(function(index) {
			const itemLinkID = sideMenuItems[index].id;
			if (containerID == itemLinkID) {
				itemAddClass($(sideMenuItems[index]));
			}
			else {
				itemRemoveClass($(sideMenuItems[index]));
			}
		});
	},

	buildMobileDropdown: function() { //piece together mobile dropdown menu
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

	toggleDropdown: function(fn, isBuilt) { //change type of dropdown menu depending on window size
		const dropdownList = $(".desktop-sidenav .navlist");
		$(window).resize(function() {
			let winWidth = window.innerWidth;
			if ( winWidth > 767) {
				dropdownList.removeClass("dropdown-menu pull-right"); //remove dropdown menu on desktop
			}			
			if ( winWidth < 768) {
				dropdownList.addClass("dropdown-menu pull-right"); //add dropdown menu on mobile
			}
			if ( winWidth < 768 && isBuilt == false) { //build on page resize if less than 768px
				fn();
				isBuilt = true; //toggle to build only once
			}
		    if (winWidth > 767) { //if user leaves dropdown open and goes to larger window view, close that dropdown in the mobile view
				dropdownList.addClass("hidden-xs");
			}			
		});
        //display dropdown list only after button is clicked on, prevents desktop navlist from briefly loading before dropdown structure is built around it via js
        $("body").on("click", ".dropdown-toggle", function(){
        	// if ( dropdownList.hasClass("hidden-xs") ) {
        	if (dropdownList.css("display") !== "block") { 
        		dropdownList.css("display", "block");
        		dropdownList.removeClass("hidden-xs");
        	}
        	else {    
        		dropdownList.addClass("hidden-xs");
        	}
        });
	},

	toBuild: function() {
		let isBuilt = false;
		const winWidth  = window.innerWidth;
		const buildMobileDropdown = this.buildMobileDropdown;

		if ( winWidth < 768 && isBuilt == false) { //build on page load if less than 768px
			buildMobileDropdown();
			isBuilt = true; //toggle to build only once
		}

		this.toggleDropdown(buildMobileDropdown, isBuilt);
	}

};

function Modal() {
    this.appendModal();
    this.centerModal();
    this.playModalVideo();
    this.stopModalVideo();
};

Modal.prototype = {

	constructor: Modal,

	appendModal: function() {
		this.modalTemplate = 
	  	`
		<div id="video-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
			  <div class="modal-header">
			    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			  </div>
		      <div class="modal-body" id="yt-player">
		          <iframe class="youtube_embed_iframe" allowfullscreen="true" src="" id="widget2"></iframe>
		      </div>
		    </div>
		  </div>
		</div>
		`
		$("#container-12170").append(this.modalTemplate);
	},

	calculateCenter: function() {
        $(this).css('display', 'block');
        const dialog  = $(this).find(".modal-dialog"); //find modal dialog class
        const bottomMargin = parseInt(dialog.css('marginBottom'), 10);
        let offset = ($(window).height() - dialog.height()) / 2; //calculate difference between window height and dialog height, half distance top, half distance bottom


        // Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
        if (offset < bottomMargin) {
        	offset = bottomMargin;
        }

        dialog.css("margin-top", offset);
	},

	centerModal: function() {
		const calculateCenter = this.calculateCenter;
		$(document).on('show.bs.modal', '.modal', calculateCenter);
	    $(window).on("resize", function () {
	        $('.modal:visible').each(calculateCenter);
	    });
	},

	playModalVideo: function() { //video img on click, take video src and create iframe for it in modal
		const videoImg = "#container-12170 .wp-caption img";
		const videoModal = $("#video-modal");
		const modalIframe = $("#video-modal iframe");

		$("body").on("click", videoImg, function(e) {
			e.preventDefault();
			const youtubeID = $(this)[0].alt;
	        const src = "//www.youtube.com/embed/" + youtubeID + "?autoplay=0&theme=dark&loop=0&fs=1&showinfo=1&modestbranding=0&iv_load_policy=1&color=red&autohide=1&disablekb=0&enablejsapi=1&version=3";
	        videoModal.modal("show");
	        modalIframe.attr("src", src);
	    });
	},

	stopModalVideo: function() { //stop modal video on modal close
		const videoModal = $("#video-modal");
		const modalIframe = $("#video-modal iframe");
		videoModal.on('hidden.bs.modal', function () {
		    modalIframe.attr("src", "");
		});
	}

}

function Page() {
	const productImagesLinks = "#container-12203 .document-icon a";
	this.preventLinkDefault(productImagesLinks);
};

Page.prototype = {

	constructor: Page,

	preventLinkDefault: function(el) {
		$("body").on("click", el, function(e){
			e.preventDefault();
		})
	}
}

function init() {
	new Page();
	new SideMenu();
	new Modal();
}

document.addEventListener("DOMContentLoaded", function(e) {
	init();
});