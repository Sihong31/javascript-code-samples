function ChangeSubSlide() {
	this.carouselOnSlide();
}

ChangeSubSlide.prototype = {

	constructor: ChangeSubSlide,

	carouselOnLoad: function(subSlide, markup) {
		subSlide.html(markup);
	},

	carouselOnSlide: function() {
		const carousel = $(".section-1a .carousel");
		const subSlide = $(".section-1b .lower-slide-container");


		const slide1 = `
						<div class="col-xs-12 col-sm-6 lower-slide-left a">
				      	</div>
				      	<div class="right-content-container col-xs-12 col-sm-6 ">
					    	<div class="lower-slide-right">
				    			<p class="story-mini-headline"><span class="brand-color-1">Ella</span><span>Age 4</span>TYPE OF EPILEPSY</p>
				    			<h1 class="story-main-headline">Epilepsy is <span class="brand-color-1">suffering</span></h1>
				    			<hr></hr>
				    			<p class="story-body-copy">After experiencing her first seizure just after her first birthday, Ella’s parents were given encouraging odds that she would outgrow them. They quickly realized this was not the case. After failing ten different medications and the ketogenic diet, they began to explore surgical alternatives. Ella and her parents began their search hoping she would be considered a viable candidate for brain surgery.</p>
				    			<p class="story-body-copy">Each of these visits was met with poking and prodding, intentional sleep deprivation, being weaned off her medications and remaining tethered to an EEG monitor for days. Ella was denied surgery, but her parents continue to search for alternatives.</p>
				    			<p class="story-body-copy">Like many sufferers, Ella, has faced significant developmental delays but her parents describe her as a happy four-year-old that inspires everyone she meets with her bravery and indelible spirit.</p>
					    		<a href="#" class="btn cure-btn lower-carousel-btn" role="button">
						    		More about epilepsy
						    	</a>
						    	<a href="#" class="btn cure-btn lower-carousel-btn" role="button">
						    		More about lauren
						    	</a>
						    </div>
						    <div class="hidden-sm hidden-md hidden-lg mobile-down-arrow-container">
                  			</div> 
						</div>
					   `


		const slide2 = `
						<div class="col-xs-12 col-sm-6 lower-slide-left b">
				      	</div>
				      	<div class="right-content-container col-xs-12 col-sm-6 ">
					    	<div class="lower-slide-right">
				    			<p class="story-mini-headline"><span class="brand-color-1">Ella</span><span>Age 4</span>TYPE OF EPILEPSY</p>
				    			<h1 class="story-main-headline">Epilepsy is <span class="brand-color-1">suffering</span></h1>
				    			<hr></hr>
				    			<p class="story-body-copy">After experiencing her first seizure just after her first birthday, Ella’s parents were given encouraging odds that she would outgrow them. They quickly realized this was not the case. After failing ten different medications and the ketogenic diet, they began to explore surgical alternatives. Ella and her parents began their search hoping she would be considered a viable candidate for brain surgery.</p>
				    			<p class="story-body-copy">Each of these visits was met with poking and prodding, intentional sleep deprivation, being weaned off her medications and remaining tethered to an EEG monitor for days. Ella was denied surgery, but her parents continue to search for alternatives.</p>
				    			<p class="story-body-copy">Like many sufferers, Ella, has faced significant developmental delays but her parents describe her as a happy four-year-old that inspires everyone she meets with her bravery and indelible spirit.</p>
					    		<a href="#" class="btn cure-btn lower-carousel-btn" role="button">
						    		More about epilepsy
						    	</a>
						    	<a href="#" class="btn cure-btn lower-carousel-btn" role="button">
						    		More about lauren
						    	</a>
						    </div>
						   	<div class="hidden-sm hidden-md hidden-lg mobile-down-arrow-container">
                  			</div> 
						</div>
					   `		
		const slide3 = `
						<div class="col-xs-12 col-sm-6 lower-slide-left c">
				      	</div>
				      	<div class="right-content-container col-xs-12 col-sm-6">
					    	<div class="lower-slide-right">
				    			<p class="story-mini-headline"><span class="brand-color-1">Ella</span><span>Age 4</span>TYPE OF EPILEPSY</p>
				    			<h1 class="story-main-headline">Epilepsy is <span class="brand-color-1">suffering</span></h1>
				    			<hr></hr>
				    			<p class="story-body-copy">After experiencing her first seizure just after her first birthday, Ella’s parents were given encouraging odds that she would outgrow them. They quickly realized this was not the case. After failing ten different medications and the ketogenic diet, they began to explore surgical alternatives. Ella and her parents began their search hoping she would be considered a viable candidate for brain surgery.</p>
				    			<p class="story-body-copy">Each of these visits was met with poking and prodding, intentional sleep deprivation, being weaned off her medications and remaining tethered to an EEG monitor for days. Ella was denied surgery, but her parents continue to search for alternatives.</p>
				    			<p class="story-body-copy">Like many sufferers, Ella, has faced significant developmental delays but her parents describe her as a happy four-year-old that inspires everyone she meets with her bravery and indelible spirit.</p>
					    		<a href="#" class="btn cure-btn lower-carousel-btn" role="button">
						    		More about epilepsy
						    	</a>
						    	<a href="#" class="btn cure-btn lower-carousel-btn" role="button">
						    		More about lauren
						    	</a>
						    </div>
						   	<div class="hidden-sm hidden-md hidden-lg mobile-down-arrow-container">
                  			</div> 
						</div>
					    `

		this.carouselOnLoad(subSlide, slide1);

		carousel.on('slid.bs.carousel', function () {
		const slideID = $(this).children(".carousel-inner").children(".active").attr("id");
			if (slideID === 'cure-slide-1') {
				subSlide.html(slide1);
			}				
			if (slideID === 'cure-slide-2') {
				subSlide.html(slide2);
			}				
			if (slideID === 'cure-slide-3') {
				subSlide.html(slide3);
			}
		});
	}

}

function init() {
	new ChangeSubSlide();
}

document.addEventListener("DOMContentLoaded", function() {
  init();
}, false);
