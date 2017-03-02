function DonateSection() {
	this.updateDonateInfo();
	this.toggleTributeBox();
}

DonateSection.prototype = {

	constructor: DonateSection,
	updateDonateInfo: function() {

		const donationButtons = "form .donation-buttons input";
		$("body").on("click", donationButtons, function() {
				const donatePlaceholder = $("#donation-form #donation");
				if ( this.value === "option1" ) {
					donatePlaceholder.attr("placeholder", "$25.00")
				}		
				if ( this.value === "option2" ) {
					donatePlaceholder.attr("placeholder", "$50.00")
				}		
				if ( this.value === "option3" ) {
					donatePlaceholder.attr("placeholder", "$100.00")
				}
		});
	},

	toggleTributeBox: function() {

		$("body").on("click", ".tribute-name-ckb", function() {
			const checkBox = $(".tribute-name-ckb .form-check-input");
			const formInput = $("#donation-form #tribute-name");
			if (checkBox.is(":checked")) {
				formInput.show();
			}
			else {
				formInput.hide();
			}
		})


	}

}

function init() {
	new DonateSection();
}

document.addEventListener("DOMContentLoaded", function() {
	init();
}, false);
