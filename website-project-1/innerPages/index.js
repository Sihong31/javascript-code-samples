"use strict";
window.$ = window.jQuery;
const Nav = require('../header');
const Search = require('../search');
const FooterInner = require('./footerInner.js');
const TwitterShare = require('./twitterShare.js');
const ObjectFit = require('./object-fit.js');
const RadioButton = require('./radio-button.js');
const CharacterLimit = require('./character-limit.js');
const StoryView = require('./story-view.js');
const RenderImage = require('./render-image.js');
const HeroContentWrap = require('./hero-content-wrap.js');
const BioSelect = require('./bio-select-box.js');
const HashBang = require('./hash-bang.js');

let domLoaded = () => {
  //Dom Loaded init scirpts
  const footerInner = $("body.not-front .footer.region-footer");
  const imgContainerBio = $(".node-type-employee-bio-template .field-name-field-employee-image .field-item"); //for bio template
  const imgContainerStory = $(".node-type-story-detail-template .pane-story-view-panel-pane-1 .views-field-value"); //for story template
  const imgContainerStoryView = $(".panel-pane.pane-story-view .view-story-view .views-field-value"); //for story view
  const radioWrapper = $("form.webform-client-form div.form-item label.option");
  const eefTextArea = $(".page-node-56 .form-textarea-wrapper textarea");
  const blockquote = $('.layout-center .panel-pane blockquote');
  const storyViewCarouselImgContainers = $(".pane-story-view .jcarousel-container .jcarousel-item .views-field-value span.field-content");
  const personalStoriesSection = $(".page-node-63 .panels-flexible-region-inside");
  const personalStoryImgContainers = $(".page-node-63 .view-display-id-block_1 .story-container div:nth-child(2)");
  const storyDetailImgContainer = $(".node-type-story-detail-template .view-id-story_view .views-field-value");
  const blockSuperfixh = $('#block-superfish-1');
  const searchForm = $('#block-search-form');
  const hero = $('.field-name-field-header-hero-image .field-items .field-item');
  const heroCopy = $('.field-name-field-header .entity-field-collection-item');
  const bioTabs = $('#quicktabs-our_team_tabs');

  new Nav(blockSuperfixh, true);
  new Search(searchForm, 'layout-center');

  if (footerInner.length > 0) {
    new FooterInner(footerInner);
  }

  if (heroCopy.length > 0) {
    new HeroContentWrap(heroCopy, 'field-name-field-header-headline', 'field-name-field-header-copy')
  }

  if (hero.length > 0 && !Modernizr.objectfit) {
    new ObjectFit(hero);
  }

  if(bioTabs.length > 0){
    new BioSelect(bioTabs);
    new HashBang(bioTabs);
    bioTabs.addClass('active');
  }

  if (imgContainerBio.length > 0 && !Modernizr.objectfit) {
    new ObjectFit(imgContainerBio);
  }

  if (imgContainerStory.length > 0 && !Modernizr.objectfit) {
    new ObjectFit(imgContainerStory);
  }

  if (imgContainerStoryView.length > 0 && !Modernizr.objectfit) {
    new ObjectFit(imgContainerStoryView);
  }

  if (radioWrapper.length > 0) {
    new RadioButton(radioWrapper);
  }

  if (eefTextArea.length > 0) {
    new CharacterLimit(eefTextArea, 500);
  }

  if (blockquote.length > 0) {
    new TwitterShare(blockquote);
  }

  if (personalStoriesSection.length > 0) {
    new StoryView(personalStoriesSection, 2);
  }

  if (storyViewCarouselImgContainers.length > 0) { //red story view section images with carousel
    new RenderImage(storyViewCarouselImgContainers, 2);
  }

  if (personalStoryImgContainers.length > 0) { //all the personal stories images
    new RenderImage(personalStoryImgContainers, 1);
  }

  if (storyDetailImgContainer.length > 0) { //detail story page images
    new RenderImage(storyDetailImgContainer, 1);
  }

}

document.addEventListener("DOMContentLoaded", domLoaded);
