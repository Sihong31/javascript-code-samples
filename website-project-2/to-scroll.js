//Page scroll functions
class ToScroll {
    constructor($window, clickTarget, scrollToEl) {
        this.window = $window;
        this.clickTarget = clickTarget;
        this.scrollToEl = scrollToEl;
        this.init();
    }
    init() {
        this.initiateScroll();
    }
    scrollDown = () => {
        const distance = this.scrollToEl.offset().top;

        TweenMax.to(this.window, 1.5, {
          scrollTo: distance,
          ease:Power2.easeOut
        });
    }
    initiateScroll() {
        this.clickTarget.on("click", this.scrollDown);
    }
}

module.exports = ToScroll