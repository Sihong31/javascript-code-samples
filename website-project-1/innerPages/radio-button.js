class RadioButton {
	constructor(radioWrapper) {
		this.radioWrapper = radioWrapper;
		this.radioIsChecked = false;
		this.init();
	}
	init() {
		this.onClick();
	}
	onClick() {
		this.radioWrapper.on("click", this.toggleRadioButton)
						 .on("click", this.toggleInput);
	}
	toggleRadioButton() {
		$(this).addClass("active");
		$(this).parent().siblings("div.form-type-radio").children("label.option").removeClass("active");
	}
	toggleInput() { //custom styled radio button input tag is set to visibility none, need to make sure input is selected 
		let currentRadio = $(this).siblings("input.form-radio");
		let otherRadios = $(this).closest("div.form-type-radio").siblings("div.form-type-radio").children("input.form-radio");
		this.radioIsChecked = currentRadio.prop("checked");
		if(!this.radioIsChecked) {
			currentRadio.checked = true;
			otherRadios.checked = false;
		}
	}
}

module.exports = RadioButton