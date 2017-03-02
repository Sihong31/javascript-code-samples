class RenderImage { //take anchor tag href and create an image tag src in markup
	constructor(imgContainers, pos) { //pos = anchor is nth child of container
		this.imgContainers = imgContainers;
		this.pos = pos;
		this.init();
	}
	init() {
		this.replaceWithImage();
	}
	replaceWithImage() {
		const imgContainers = this.imgContainers;
		const pos = this.pos;
		this.imgContainers.each(function(index) {
			const $imgContainer = $(imgContainers[index]);
			const anchor = $imgContainer.find("a")[pos - 1];
			const anchorLink = anchor.href;
			const imgTemplate = `
						 			<img src="${anchorLink}" alt=""/>
						  		`;
						  		//http://curedev.deutschinc.com/sites/default/files/susan-axelrod.jpg
			$imgContainer.append(imgTemplate);			  
		})

	}
}

module.exports = RenderImage