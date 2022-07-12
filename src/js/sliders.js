// window.addEventListener("load", function () {
// });
class MySlider {
	constructor(nameSlider) {
		this.nameSlider = nameSlider;
		this.$mySlider = document.querySelector(nameSlider);
		this.$mySliderSlides = document.querySelector(`${nameSlider} .my-slider__slides`);
		this.$mySliderSlidesArray = Array.from(document.querySelectorAll(`${nameSlider} .my-slider__slide`));
		this.$mySliderSlide = document.querySelector(`${nameSlider} .my-slider__slide`);
		// this.slideWidth;
		this.isDragging = false;
		this.startPosition = 0;
		this.currentTranslate = 0;
		this.prevTranslate = 0;
		this.currentIndex = 0;
		this.index = 0;
		this.currentPosition = 0;
		this.animationID = null;
		this.movedBy;
		// this.slideWidth = document.querySelector(`${this.nameSlider} .my-slider__slide`).offsetWidth;
		this.numberOfColumns = Math.floor(parseInt(getComputedStyle(document.querySelector(`${nameSlider}`)).getPropertyValue("--column")));
		this.direction;
		this.$mySliderNextbutton = document.querySelector(`${nameSlider} .my-slider__navegation-button--next`);
		this.$mySliderBackbutton = document.querySelector(`${nameSlider} .my-slider__navegation-button--back`);
	}
	initialize() {
		window.addEventListener(
			"resize",
			() => {
				this.slideWidth = document.querySelector(`${this.nameSlider} .my-slider__slide`).offsetWidth;
			},
			{
				passive: true,
			}
		);
		this.$mySliderSlidesArray.forEach(
			(slide) => {
				slide.querySelector("img").addEventListener("dragstart", (e) => {
					e.preventDefault();
				});
			},
			{
				passive: true,
			}
		);
		// this.$mySlider.oncontextmenu = function (e) {
		// 	e.preventDefault();
		// 	e.stopPropagation();
		// };
		this.$mySliderSlides.addEventListener(
			"touchstart",
			(e) => {
				this.touchStart(e);
			},
			{
				passive: true,
			}
		);
		this.$mySliderSlides.addEventListener(
			"touchend",
			(e) => {
				this.touchEnd(e);
			},
			{
				passive: true,
			}
		);
		this.$mySliderSlides.addEventListener(
			"touchmove",
			(e) => {
				this.touchMove(e);
			},
			{
				passive: true,
			}
		);
		this.$mySliderSlides.addEventListener(
			"mousedown",
			(e) => {
				this.touchStart(e);
			},
			{
				passive: true,
			}
		);
		this.$mySliderSlides.addEventListener(
			"mousemove",
			(e) => {
				this.touchMove(e);
			},
			{
				passive: true,
			}
		);
		this.$mySliderSlides.addEventListener(
			"mouseup",
			(e) => {
				this.touchEnd(e);
			},
			{
				passive: true,
			}
		);
		this.$mySliderSlides.addEventListener(
			"mouseleave",
			(e) => {
				this.touchEnd(e);
			},
			{
				passive: true,
			}
		);
	}
	setSlidesPosition() {
		if (this.currentTranslate > 0) {
			return;
		} else {
			this.$mySliderSlides.style.transform = `translateX(${this.currentTranslate}px)`;
		}
		if (this.$mySliderBackbutton && this.$mySliderNextbutton) {
			if (this.currentIndex == 0) {
				this.$mySliderBackbutton.classList.add("my-slider__navegation-button--opacity-none");
			} else {
				this.$mySliderBackbutton.classList.remove("my-slider__navegation-button--opacity-none");
			}
			if (this.currentIndex == this.$mySliderSlidesArray.length - this.numberOfColumns) {
				this.$mySliderNextbutton.classList.add("my-slider__navegation-button--opacity-none");
			} else {
				this.$mySliderNextbutton.classList.remove("my-slider__navegation-button--opacity-none");
			}
		}
	}

	getPositionX(e) {
		return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
	}

	animation() {
		this.setSlidesPosition();
		// if(this.isDragging){
		// 	reguestAnimationFrame(this.animation())
		// }
	}
	setPositionByIndex() {
		if (this.currentIndex > this.$mySliderSlidesArray.length - this.numberOfColumns) {
			this.currentIndex = this.$mySliderSlidesArray.length - this.numberOfColumns;
		} else if (this.currentIndex < 0) {
			this.currentIndex = 0;
		}
		this.slideWidth = document.querySelector(`${this.nameSlider} .my-slider__slide`).offsetWidth;
		this.currentTranslate = this.currentIndex * -this.slideWidth;
		this.prevTranslate = this.currentTranslate;
		this.setSlidesPosition();
	}

	touchStart(e) {
		this.isDragging = true;
		this.startPosition = this.getPositionX(e);
	}
	touchMove(e) {
		if (this.isDragging) {
			this.$mySliderSlides.style.cursor = "grabbing";
			this.currentPosition = this.getPositionX(e);
			this.currentTranslate = this.prevTranslate + this.currentPosition - this.startPosition;
			this.animation();
		}
	}
	touchEnd() {
		this.isDragging = false;
		this.movedBy = this.currentTranslate - this.prevTranslate;
		this.movedBy > 0 ? (this.direction = -1) : (this.direction = 1);
		if (Math.abs(this.movedBy) > this.slideWidth * 2.5) {
			this.currentIndex += 3 * this.direction;
		} else if (Math.abs(this.movedBy) > this.slideWidth * 1.5) {
			this.currentIndex += 2 * this.direction;
		} else if (Math.abs(this.movedBy) > 50) {
			this.currentIndex += 1 * this.direction;
		}
		if (this.currentIndex > this.$mySliderSlidesArray.length - this.numberOfColumns) {
			this.currentIndex = this.$mySliderSlidesArray.length - this.numberOfColumns;
		} else if (this.currentIndex < 0) {
			this.currentIndex = 0;
		}
		this.setPositionByIndex();
		this.$mySliderSlides.style.cursor = "grab";
	}
	navegationButton() {
		this.$mySlider.addEventListener("click", (e) => {
			if (e.target == this.$mySliderNextbutton) {
				this.currentIndex += 1;
			} else if (e.target == this.$mySliderBackbutton) {
				this.currentIndex -= 1;
			}
			this.setPositionByIndex();
		});
	}
}
const sliderTop = new MySlider(".slider-header");
sliderTop.initialize();
sliderTop.navegationButton();
