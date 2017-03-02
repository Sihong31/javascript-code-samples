"use strict";
window.$ = window.jQuery;
const React = require('react');
const ReactDOM = require('react-dom');
const Nav = require('./header');
const Search = require('./search');
const footer = require('./footer');
const carouselAnimation = require('./carouselAnimation');
const tiles = require('./tiles');
const donate = require('./donate');
const mobileDownArrow = require('./mobileDownArrow');
const slick = require('./slickCarousel');
const footerForm = require('./footerForm');

import Carousel from './components/carousel';
import Tile from './components/tiles';
import Donation from './components/donations';

let domLoaded = () => {
	//Dom Loaded init scirpts
	new Nav($('#block-superfish-1'));
	new Search($('#block-search-form'));
	new slick($('#slick-carousel'));
}

document.addEventListener("DOMContentLoaded", domLoaded);

ReactDOM.render(
	<Tile />,
	document.getElementById('react-tile')
)

ReactDOM.render(
	<Donation />,
	document.getElementById('react-donations')
)
