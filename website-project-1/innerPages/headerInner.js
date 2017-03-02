//********NAV HEADER FOR INNER PAGES*********
const _ = require('lodash');

function NavHeader() {
    this.searchContainer = $("#block-search-form");
    this.superFishBlock = $(".block-superfish");

    this.superFishDT = this.superFishBlock.find("#superfish-1");
    this.superFishBurger = this.superFishBlock.find(".sf-accordion-toggle");
    this.superFishToggle = this.superFishBlock.find("#superfish-1-toggle");
    this.superFishAccordion = this.superFishBlock.find("#superfish-1-accordion");
    this.superFishCloseBtn = this.superFishBlock.find(".sf-accordion-toggle span");
    this.toggles = false;

    this.showSearchBox();
    this.appendDonateBtn();
    this.appendMobileTemplates();
    this.toggleMobileNav();
    this.toggleMenuCarat();
}

NavHeader.prototype = {

    constructor: NavHeader,

    showSearchBox: function() {
        const searchContainer = this.searchContainer;
        const searchBox = searchContainer.children(".form-type-textfield");
        const searchInput = searchContainer.find("#edit-search-block-form--2");

        searchInput[0].placeholder = "Search";
        searchContainer.hover(function() {
            searchInput.show();
            searchInput.animate({
                marginLeft: "0",
                opacity: "1",
                ease: "swing"
            }, 800);
        });
    },

    appendDonateBtn: function() {
        const btnTemplate = `
							  <a href="#" class="btn cure-btn donate-btn nav-donate-btn" role="button">
						          donate
						      </a>  								
							`;
        const searchContainer = this.searchContainer;
        searchContainer.append(btnTemplate);


    },

    appendMobileTemplates: function() {
        const mobileNav = $("#superfish-1-accordion");
        const searchContainer = this.searchContainer;

        const btnTemplate = `
							  <li class="sf-depth-1 btn-container">
							  <a href="#" class="btn cure-btn donate-btn nav-donate-btn" role="button">
						          donate now
						      </a>  
						      </li>
							  `;
        const searchTemplate = `
								<li class="sf-depth-1"><div class="block block-search first odd" role="search" id="block-search-form">
								 <form action="/cureepilepsy/" method="post" id="search-block-form" accept-charset="UTF-8"><div><div class="container-inline">
								      <h2 class="element-invisible">Search form</h2>
								    <div class="form-item form-type-textfield form-item-search-block-form">
								  <label class="element-invisible" for="edit-search-block-form--2">Search </label>
								 <input title="Enter the terms you wish to search for." placeholder="Search" type="text" id="edit-search-block-form--2" name="search_block_form" value="" size="15" maxlength="128" class="form-text">
								</div>
								<div class="form-actions form-wrapper" id="edit-actions--3"><input type="submit" id="edit-submit--3" name="op" value="Search" class="form-submit"></div><input type="hidden" name="form_build_id" value="form-8BSbuLDZxf_zFfxdYJitaZugr1qqi4OEsCgwbs_RRHY">
								<input type="hidden" name="form_id" value="search_block_form">
								</div>
								</div>
								</form>
								</div>
								</li>
							   `;

        mobileNav.append(searchTemplate);
        mobileNav.append(btnTemplate);

        $(window).load(function() {
            const winWidth = window.innerWidth;
            if (winWidth < 768) {
                searchContainer.hide();
            } else {
                searchContainer.show();
            }
        });

        $(window).resize(function() {
            const winWidth = window.innerWidth;
            if (winWidth < 768) {
                searchContainer.hide();
                setTimeout(function() {
                    const mobileNav = $("#superfish-1-accordion");
                    if (!searchContainer.is(":visible")) {
                        const searchContainer = $("#superfish-1-accordion #block-search-form");
                        const donateBtn = $("#superfish-1-accordion .sf-depth-1 .donate-btn");
                        if (searchContainer.length != 1 && donateBtn.length != 1) {
                            mobileNav.append(searchTemplate);
                            mobileNav.append(btnTemplate);
                        }
                    }
                }, 50)
            } else {
                searchContainer.show();
            }
        });

    },

    mobileNavOnClick: function() {
        const winWidth = window.innerWidth;
        let toggle = (this.toggles === false) ? true : false;
        if (winWidth < 768) {
            if (toggle) {
                this.superFishAccordion.attr('style', 'display:block !important');
                this.superFishCloseBtn.addClass("close-active").text("X").css("background", "none");
                this.toggles = true;
            } else {
                this.superFishAccordion.attr('style', 'display:none !important');
                this.superFishCloseBtn.removeClass("close-active").empty().css("background", "url(../sites/all/themes/cure/public/images/global/icon-hamburger.png) no-repeat center center");
                this.toggles = false;

            }
        }
    },

    mobileNavOnResize: function() {
        const winWidth = window.innerWidth;
        if (winWidth > 767) {
            this.superFishDT.show();
            this.superFishCloseBtn.removeClass("close-active").empty().css("background", "url(../sites/all/themes/cure/public/images/global/icon-hamburger.png) no-repeat center center");
            this.superFishAccordion.hide();
            if (!this.superFishBlock.hasClass("active")) {
                this.superFishBurger.hide();
            }
        }
        if (winWidth < 768) {
            this.superFishDT.hide();
            this.superFishBurger.show();
        }
    },

    toggleMobileNav: function() {

        const winWidth = window.innerWidth;
        const superFishBlock = this.superFishBlock;

        if (winWidth < 768) {
            this.superFishDT.hide();
            this.superFishBurger.show();
        } else {
            this.superFishDT.show();
            this.superFishBurger.hide();
        }

        $("body").on("click", "#superfish-1-toggle", _.bind(this.mobileNavOnClick, this, this.toggles));
        $(window).resize(_.debounce(_.bind(this.mobileNavOnResize, this, this.toggles), 100));

    },

    toggleMenuCarat: function() {
        const toToggle = $("li.sf-depth-1.menuparent a.menuparent");
        $("body").on("click", "li.sf-depth-1.menuparent a.menuparent", function() {
            $(this).toggleClass('changed');
            $(this).parent().siblings().children("a.menuparent").removeClass("changed");
        });

    }

}

function init() {
    new NavHeader();
}

document.addEventListener("DOMContentLoaded", function() {
    init();
}, false);