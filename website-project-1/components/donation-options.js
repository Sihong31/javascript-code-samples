const React = require('react');

class DonationOptions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {selectedDonationOption: '', btnActiveID: ""};
	}

	btnIsActive = (value) => {
		return 'btn btn-primary ' + ((value===this.state.btnActiveID) ? 'active':'');
	}

	handleDonationOptionChange = (changeEvent) => {
		this.setState({
			selectedDonationOption: changeEvent.target.value,
			btnActiveID: changeEvent.target.id
		})
	}

	render() {
		return(

		  <div className="btn-group donation-buttons">
		  	<div className="row">
	  			<div className="col-xs-12 p-0">
	  				<div className="col-xs-4 btn-container">
						<label className={this.btnIsActive("donation-option-1")}>
						  <input type="checkbox" name="options" className="donation-options" id="donation-option-1" value="option1" checked={this.state.selectedDonationOption === "option1"} onChange={this.handleDonationOptionChange}/>$25
						</label>
					</div>
					<div className="col-xs-4 btn-container">
						<label className={this.btnIsActive("donation-option-2")}>
						  <input type="checkbox" name="options" className="donation-options" id="donation-option-2" value="option2" checked={this.state.selectedDonationOption === "option2"} onChange={this.handleDonationOptionChange}/>$50
						</label>
					</div>
					<div className="col-xs-4 btn-container">
						<label className={this.btnIsActive("donation-option-3")}>
						  <input type="checkbox" name="options" className="donation-options" id="donation-option-3" value="option3" checked={this.state.selectedDonationOption === "option3"} onChange={this.handleDonationOptionChange}/>$100
						</label>
					</div>
				</div>
			</div>
		  </div>
		)
	}
}

export default DonationOptions;