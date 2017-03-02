function Tiles() {
	this.tiles = $(".section-3 .tile-container");
	this.onHover();
}

Tiles.prototype = {

	constructor: Tiles,

	replaceText: function(text) {
		const textContainer = $(".section-3 .tile-change");
		textContainer.text(text);
	},

	showTileContent: function(contentContainer) {
		contentContainer.show().parent().siblings().children(".content-container").hide();
	},

	onHover: function() {
		const tiles = this.tiles;
		const replaceText = this.replaceText;
		const winWidth = window.innerWidth;
		const showTileContent = this.showTileContent;
		const contentContainer = $(".section-3 .content-container");
		const rightSide = $(".section-3 .right");

		function tileHover() {
			tiles.hover(function(){
			
				const contentContainer = $(this).children(".content-container");

				if ($(this).attr("id") == "tile-1") {
					replaceText("placeholder1");
					showTileContent(contentContainer);
				}				
				if ($(this).attr("id") == "tile-2") {
					replaceText("placeholder2");
					showTileContent(contentContainer);
				}				
				if ($(this).attr("id") == "tile-3") {
					replaceText("placeholder3");
					showTileContent(contentContainer);
				}				
				if ($(this).attr("id") == "tile-4") {
					replaceText("placeholder4");
					showTileContent(contentContainer);
				}
			});		
			rightSide.hover(function(){
				contentContainer.hide();
			});
		}

		if (winWidth < 992) {
			tiles.unbind('mouseenter mouseleave');
			rightSide.unbind('mouseenter mouseleave');
			contentContainer.show()
		}
		else {
			tileHover();
		}

		$(window).resize(function(){
			const winWidth = window.innerWidth;
			if (winWidth > 991) {
				contentContainer.hide();
			}
			if (winWidth < 992) {
				tiles.unbind('mouseenter mouseleave');
				rightSide.unbind('mouseenter mouseleave');
				contentContainer.show()
			}
			else {
				tileHover();
			}	
		});


	}

}

function init() {
	new Tiles();
}

document.addEventListener("DOMContentLoaded", function() {
  init();
}, false);
