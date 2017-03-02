class StoryView {
	constructor(container, pos) { //pos where element with class of pane story view shows up, 1st, 2nd, 3rd,etc.
		this.container = container;
		this.pos = pos;
		this.init();
	}
	init() {
		this.removeStoryView();
	}
	removeStoryView() {
		const target = this.container.children(".pane-story-view")[this.pos - 1];
		$(target).removeClass("pane-story-view");
	}
}

module.exports = StoryView