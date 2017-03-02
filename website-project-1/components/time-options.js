const React = require('react');

class TimeOptions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {selectedTimeOption: 'option1'};
	}

	handleTimeOptionChange = (changeEvent) => {
		this.setState({
			selectedTimeOption: changeEvent.target.value
		}, this.setParentState)
	}

	setParentState = () => {
		let option = this.state.selectedTimeOption;
		this.props.onSelectActive(option);		
	}

	render() {
		return(
			<div className="form-group time-options-container">
			    <div className="form-check">
				    <div className="row">
				    	<div className="col-xs-12 p-0">
							<div className="col-xs-6 p-r-0 time-option">
							    <label className="form-check-label rad" htmlFor="time-option-1">
							     	<input type="radio" className="form-check-input" name="options" id="time-option-1" value="option1" checked={this.state.selectedTimeOption === "option1"} onChange={this.handleTimeOptionChange}/>
							        <i></i> One Time
							    </label>
							</div>
				    		<div className="col-xs-6 p-r-0 time-option">
							    <label className="form-check-label rad" htmlFor="time-option-2">
							    	<input type="radio" className="form-check-input" name="options" id="time-option-2" value="option2" checked={this.state.selectedTimeOption === "option2"} onChange={this.handleTimeOptionChange}/>
							        <i></i> Monthly
							    </label>
							</div>
						</div>
					</div>
			    </div>
			</div>
		)
	}
}

export default TimeOptions;