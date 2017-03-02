class CharacterLimit {
	constructor(textContainer, limit) {
		this.textContainer = textContainer;
		this.textContainerWrapper = textContainer.parent();
		this.limit = limit;
		this.init();
	}

	init() {
		this.displayLimit();
		this.limitInput();
	}

	displayLimit() {
		const limit = this.limit;
		const textContainerWrapper = this.textContainerWrapper;
		const calculateRemaining = this.calculateRemaining;
		this.textContainerWrapper.attr('data-content', `${this.limit} characters left`);
		this.textContainer.on("keyup input propertychange", function(){
			let currentValue = $(this).val().slice(0, limit);
			calculateRemaining(currentValue, textContainerWrapper, limit)
		});
	}

	calculateRemaining(currentValue, textContainerWrapper, limit) {
		let valLength = currentValue.length;
		let remaining = limit - valLength;
		textContainerWrapper.attr('data-content', `${remaining} characters left`);
	}

	limitInput() {
		const limit = this.limit;
		const events = 	"keydown input propertychange";
		const stopInput = this.stopInput;
		const preventInputOverFlow = this.preventInputOverFlow;
		// this.textContainer.attr("maxlength", limit);
		this.textContainer.on(events, function(event){
			const textArea = $(this);
			stopInput(textArea, limit, event);
			preventInputOverFlow(textArea, limit);
		});
	}

	stopInput(textArea, limit, event) {
		if(event.keyCode != 8 && event.keyCode != 46 && textArea.val().length >= limit) {
			event.preventDefault();
		}
	}

	preventInputOverFlow(textArea, limit) {
		setTimeout(function(){
			const maxTextString = textArea.val().slice(0, limit);
				textArea.val(maxTextString);
		}, 100)
	}
}

module.exports = CharacterLimit