function footerForm() {
	this.validate();
}

footerForm.prototype = {

	constructor: footerForm,

	validateEmail: function(email) {
	  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	  return re.test(email);	
	},

	validate: function() {
		const validateEmail = this.validateEmail;
		const formBtn = "footer form input.submit";
		const emailField = $("footer form input.searchFieldHome");

		$("body").on("click", formBtn, function(e) {
			const email = emailField.val();
			if (!validateEmail(email)) {
				e.preventDefault();
				emailField.addClass("invalid").val("");
				emailField[0].placeholder = "Enter a valid address";
				emailField.click(function() {
					emailField.removeClass("invalid");
					emailField[0].placeholder = "Enter your email address";
				})
			}
		});
	}

}

function init() {
	new footerForm();
}

document.addEventListener("DOMContentLoaded", function() {
  init();
}, false);
