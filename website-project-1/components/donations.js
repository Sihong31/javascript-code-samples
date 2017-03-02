const React = require('react');
const donationData = require('../../data/donations.json')
const appID = 184859551535099;
const currentUrl = window.location.port !== "" ?  encodeURIComponent("http://google.com")  : encodeURIComponent(window.location.href);
const message = encodeURIComponent("an estimated 3 million americans currently live with epilepsy.");
const shareUrl = "https://www.facebook.com/dialog/share";
const redirectUri = encodeURIComponent("http://socialshare.carlosagosto.com/close.html");
const description = encodeURIComponent("This is a test descripton");
const img = encodeURIComponent("https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg");
import Form from './form';

class Donation extends React.Component {

	constructor(props) {
		super(props);
		this.state = {donations: [], donateActive: true, fundraiseActive: false, speakActive: false, headerActiveValue: 1 };
	}

	componentDidMount() {
		this.setState({
			donations: donationData.donations
		})
	}

	componentWillUnMount(){
		console.log("unmounted!");
	}

	headerIsActive = (value) => {
		return 'col-xs-4 col-sm-12 selection-container ' + ((value===this.state.headerActiveValue) ? 'selection-active':'');
	}

	donateOnClick = () => {
		this.setState({ donateActive: true, fundraiseActive: false, speakActive: false, headerActiveValue: 1});
	}

	fundraiseOnClick = () => {
		this.setState({ fundraiseActive: true, donateActive: false, speakActive: false, headerActiveValue: 2});
	}

	speakOnClick = () => {
		this.setState({ speakActive: true, fundraiseActive: false, donateActive: false, headerActiveValue: 3});
	}
	popupCenter = (url, title, w, h) => {
			// Fixes dual-screen position                         Most browsers      Firefox
		let dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left,
			dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top,
			width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
			height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
			left = ((width / 2) - (w / 2)) + dualScreenLeft,
			top = ((height / 2) - (h / 2)) + dualScreenTop,
			props = `scrollbars=no, width=${w}, height=${h}, top=${top}, left=${left}`,
			newWindow = window.open(url, title, props);

		// Puts focus on the newWindow
		if (window.focus) {
		  newWindow.focus();
		}
	}
	shareFB = (event) => {
		event.preventDefault();
		let url = `https://www.facebook.com/dialog/share?app_id=${appID}&display=popup&redirect_uri=${redirectUri}&quote=${message}&description=${description}&picture=${img}&href=${currentUrl}`;
		this.popupCenter(url, "Facebook", "550", "420");
	}
	shareTwitter = (event) => {
		event.preventDefault();
		let url = `https://twitter.com/intent/tweet?text=${message}&url=${currentUrl}`
		this.popupCenter(url, "Twitter", "550", "420");
	}
	donateTemplate() {
		return (
			<Form />
		)
	}

	fundraiseTemplate() {
		return (
			<div className="tab-content">
				<p className="fundraise-copy">CURE Crew members are making a difference all over the United States by hosting bake sales, swim-a-thons, golf outings, concerts, and much more. By using your own talents, you can lead an event that raises awareness and important funds for research in epilepsy.</p>
				<a href="#" className="btn cure-btn fundraise-btn" role="button">
		    		more about fundraising
		    	</a>
			</div>
		)

	}

	speakTemplate() {
		return (
			<div className="tab-content">
				<p className="speak-up-copy">Help us spread the word about epilepsy and the need for a cure.</p>
				<div className="boxed-content"><span>"an estimated 3 million americans currently live with epilepsy."</span></div>
				<div className="social-icons">
					<div className="row">
						<div className="col-xs-12 p-0">
							<div className="col-xs-6 social-container">
								<a href="#" onClick={this.shareFB} >

									<svg className="social-facebook" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
										 viewBox="0 0 77.4 166.9" style={{fill: "#e51937"}} xmlSpace="preserve">
									<g>
										<path d="M74.5,83.7c-7.8,0-15.1,0-23,0c0,27.9,0,55.4,0,83.2c-11.6,0-22.5,0-34.2,0c0-27.5,0-55.1,0-83.1c-6.1,0-11.5,0-17.3,0
											c0-9.7,0-19,0-28.7c5.4,0,10.9,0,17.4,0c0-7.7-0.2-15,0-22.2C18.2,13,27.7,2.6,47.6,0.6C56.4-0.3,65.2,0.1,74.1,0
											c1,0,1.9,0.1,3.1,0.2c0,9.5,0,18.8,0,28.6c-5.3,0-10.4-0.1-15.5,0c-7.6,0.2-10.1,2.7-10.2,10.4c-0.1,4.5,0,9,0,13.5
											c0,0.5,0.2,1,0.3,2c8.3,0,16.7,0,25.7,0C76.4,64.6,75.5,73.8,74.5,83.7z"/>
									</g>
									</svg>
									<span id="social-icon-fb">share on facebook</span>

								</a>
							</div>
							<div className="col-xs-6 social-container">
								<a href="#" onClick={this.shareTwitter}>

								<svg className="social-twitter" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
									 viewBox="0 0 164.3 135.9" style={{fill: "#e51937"}} xmlSpace="preserve">
								<g>
									<path d="M79.9,41.9c-2.3-20.3,7-35.6,24.4-40.5c11.1-3.1,21.6-1.1,30.5,6.2c3.2,2.6,5.9,3.1,9.5,1.8c5-1.8,9.9-3.7,15.4-5.8
										c-1.9,7.3-7,12.1-12,17.5c5.3-1.4,10.6-2.7,15.9-4.1c0.2,0.3,0.5,0.6,0.7,0.8c-4.4,4.4-8.9,8.7-13.1,13.4c-1.5,1.6-2.9,4-2.9,6.1
										c-0.2,40.9-24.9,78-63.1,92.2c-27.9,10.3-55.6,8.2-82-6c-0.7-0.4-1.4-0.9-2.1-1.3c-0.2-0.2-0.4-0.5-1.1-1.4
										c17.7,0.3,33.8-3.1,48.4-14.6c-15.3-1.9-25.8-9-31.3-23.8c4.6,0,8.7,0,12.7,0C14.7,75.8,5.9,65.3,4.9,48.3
										c4.8,1.4,9.2,2.7,14.7,4.3C3.7,33.4,1,20.1,10.1,6.6c8.8,10.5,19.1,19.1,31.2,25.1C53.2,37.8,65.9,41.3,79.9,41.9z"/>
								</g>
								</svg>
								<span id="social-icon-twitter">share on twitter</span>

								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	donateImage() {
		return (
			<div>
				{/*<img className="img-responsive hidden-xs" src="./sites/all/themes/cure/public/images/home/selections/desktop-selection-1.jpg" alt=""/>*/}
				<div className="left-content-container a">
					<img className="img-responsive hidden-sm hidden-md hidden-lg" src="./sites/all/themes/cure/public/images/home/selections/mobile-selection-1.jpg" alt=""/>
				</div>
			</div>
		)
	}

	fundraiseImage() {
		return (
			<div>
				{/*<img className="img-responsive hidden-xs" src="./sites/all/themes/cure/public/images/home/selections/desktop-selection-2.jpg" alt=""/>*/}
				<div className="left-content-container b">
					<img className="img-responsive hidden-sm hidden-md hidden-lg" src="./sites/all/themes/cure/public/images/home/selections/mobile-selection-2.jpg" alt=""/>
				</div>
			</div>
		)
	}

	speakImage() {
		return (
			<div>
				{/*<img className="img-responsive hidden-xs" src="./sites/all/themes/cure/public/images/home/selections/desktop-selection-3.jpg" alt=""/>*/}
				<div className="left-content-container c">
					<img className="img-responsive hidden-sm hidden-md hidden-lg" src="./sites/all/themes/cure/public/images/home/selections/mobile-selection-3.jpg" alt=""/>
				</div>
			</div>
		)
	}

	render() {
		return(
			<div>
				<div className="col-sm-6 col-sm-push-6 right">
					<div className="right-content-container">
						<div className="row">
							<div className="col-xs-12 p-0 selections">
								<div onClick={this.donateOnClick} className={this.headerIsActive(1)}>
									<h1 className="selection" id="selection-donate"><span>donate</span></h1>
								</div>
								<div onClick={this.fundraiseOnClick} className={this.headerIsActive(2)}>
									<h1 className="selection" id="selection-fundraise"><span>fundraise</span></h1>
								</div>
								<div onClick={this.speakOnClick} className={this.headerIsActive(3)}>
									<h1 className="selection" id="selection-speak"><span>speak up</span></h1>
								</div>
							</div>
						</div>
						<hr className="hidden-xs"></hr>
						<div>
						    { this.state.donateActive ? this.donateTemplate() : null }
						    { this.state.fundraiseActive ? this.fundraiseTemplate() : null }
						    { this.state.speakActive ? this.speakTemplate() : null }
						</div>
					</div>
				</div>
				<div className="col-sm-6 col-sm-pull-6 left">
					{ this.state.donateActive ? this.donateImage() : null }
				    { this.state.fundraiseActive ? this.fundraiseImage() : null }
				    { this.state.speakActive ? this.speakImage() : null }
				</div>
			</div>
		);
	}
}

export default Donation;
