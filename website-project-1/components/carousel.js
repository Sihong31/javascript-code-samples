const React = require('react');
const es6Promise = require('es6-promise').polyfill(); //IE10, IE11
const slideData = require('../../data/carousel.json')

import Button from './button';

class Carousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = { active: true, slides: [] };
	}

	componentDidMount() {
		this.setState({
			slides: slideData.slides
		})
	}

	componentWillUnMount(){
		console.log("unmounted!");
	}

	activeFirstItem(index) {
		if (index === 1) {
			return 'active';
		}
		else {
			return '';
		}
	}

	render() {
			return (
	      	  	<div id="carousel" className="carousel slide" data-ride="carousel" data-interval="false">

				  <ol className="carousel-indicators">
				    <li data-target="#carousel" data-slide-to="0" className="active"></li>
				    <li data-target="#carousel" data-slide-to="1"></li>
				    <li data-target="#carousel" data-slide-to="2"></li>
				  </ol>

				  <div className="carousel-inner" role="listbox">   	  		
	      	  		  {this.state.slides.map(slide =>
					    <div className={`item cure-carousel-item ${this.activeFirstItem(slide.id)}`} key={slide.id}>
					      <div className="row">
					      	<div className="col-xs-12">
					      	  <div className="upper-slide-container">
					      	  	<h4 className="header-left" dangerouslySetInnerHTML={{__html: slide.headerLeft}}></h4>
						    	<img className="img-responsive main-image" src={`/images/carousel/${slide.upperImg}`} alt={slide.id}/>
						    	<h4 className="header-right" dangerouslySetInnerHTML={{__html: slide.headerRight}}></h4>
						    	<h1 dangerouslySetInnerHTML={{__html: slide.upperMainHeader}}></h1>
						    	<a href="#" className="btn cure-btn upper-carousel-btn" role="button">
						    		<div className="btn-text-container">
						    			{slide.btnText}
						    		</div>
						    	</a>
						    	<div className="down-arrow-container">
						    		<img className="down-arrow arrow-1" src="/images/down-arrow.png" alt=""/>
						    	</div>	
						      </div>
					      	</div>
						  </div>

					      <div className="row">
					      	<div className="lower-slide-container">
						      	<div className="col-xs-12 col-sm-6 lower-slide-left">
						      		<img className="" src={`/images/carousel/${slide.lowerImgD}`} alt=""/>
						      	</div>
						      	<div className="right-content-container">
							    	<div className="col-xs-12 col-sm-6 lower-slide-right">
						    			<p className="story-mini-headline"><span className="brand-color-1">Lauren</span><span>Age 8</span>Enjoys lorem IPSUM DOLORE SU ANUM</p>
						    			<h1 className="story-main-headline">Epilepsy is <span className="brand-color-1">suffering</span></h1>
						    			<hr></hr>
						    			<p className="story-body-copy">Like many people suffering from epilepsy, the disorder wreaked havoc on Lauren’s developing brain as a child. As her seizures continued, their origin remained a mystery - a reality that two-thirds of those diagnosed with epilepsy share. After countless hospitalizations, medical procedures, and a lifetime of assisted living, Lauren still doesn’t have an answer. Lauren will never live a normal life, but she is not done fighting. For Lauren and so many others, finding a cure for epilepsy means complete freedom from seizures and the opportunity for a future filled with possibility. </p>
							    		<a href="#" className="btn cure-btn lower-carousel-btn" role="button">
								    		<div className="btn-text-container">
								    			More about epilepsy
								    		</div>
								    	</a>
								    	<a href="#" className="btn cure-btn lower-carousel-btn" role="button">
								    		<div className="btn-text-container">
								    			More about lauren
								    		</div>
								    	</a>
								    </div>
								</div>
								<div className="down-arrow-container">
						    		<img className="down-arrow arrow-2" src="/images/down-arrow.png" alt=""/>
						    	</div>
					    	</div>
						  </div>
					    </div>
  	      	  	      )}
					  <Button link="#" bodyText="donate" extraClass="donate-btn" id="donate-btn-first-section" />
					  <Button link="#" bodyText="donate" extraClass="donate-btn" />
				  </div>

				  <a className="left carousel-control" href="#carousel"
				     role="button" data-slide="prev">
				    <span className="carousel-prev" aria-hidden="true"></span>
				    <span className="sr-only">Previous</span>
				  </a>
				  <a className="right carousel-control" href="#carousel"
				     role="button" data-slide="next">
				    <span className="carousel-next" aria-hidden="true"></span>
				    <span className="sr-only">Next</span>
				  </a>
				</div>

			);
			
	}
}

export default Carousel;