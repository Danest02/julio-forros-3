// window.addEventListener("load", function () {
// });
class MySlider {
	constructor(nameSlider, infinity, interval) {
		this.nameSlider = nameSlider;
		this.$mySlider = document.querySelector(nameSlider);
		this.$mySliderSlides = document.querySelector(`${nameSlider} .my-slider__slides`);
		this.$mySliderSlidesArray = Array.from(document.querySelectorAll(`${nameSlider} .my-slider__slide`));
		this.$mySliderSlide = document.querySelector(`${nameSlider} .my-slider__slide`);
		this.isDragging = false;
		this.startPosition = 0;
		this.currentTranslate = 0;
		this.prevTranslate = 0;
		this.currentIndex = 0;
		this.index = 0;
		this.currentPosition = 0;
		this.animationID = null;
		this.movedBy;
		this.numberOfColumns = Math.floor(parseInt(getComputedStyle(document.querySelector(`${nameSlider}`)).getPropertyValue("--column")));
		this.direction;
		this.$mySliderNextbutton = document.querySelector(`${nameSlider} .my-slider__navegation-button--next`);
		this.$mySliderBackbutton = document.querySelector(`${nameSlider} .my-slider__navegation-button--back`);
		this.mySliderSlidesArray = document.querySelectorAll(`${this.nameSlider} .my-slider__slide`);
		this.semaphoreInterval = interval;
		this.mySliderFirstClone = false;
		this.mySliderLastClone = false;
		this.semaphoreinfinity = infinity;
		this.semaphoreHideNavegationButton = false;
	}
	initialize() {
		if (this.semaphoreinfinity) {
			this.infinity();
		} else {
			this.$mySliderBackbutton.classList.add("my-slider__navegation-button--opacity-none");
		}
		if (this.semaphoreInterval) {
			this.interval();
		}
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
		this.$mySlider.oncontextmenu = function (e) {
			e.preventDefault();
			e.stopPropagation();
		};
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
	// TODO:ANCHOR --- ESTABLECER TRANSLACION DE $SLIDES
	setSlidesPosition() {
		this.$mySliderSlides.style.transform = `translateX(${this.currentTranslate}px)`;
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
	a() {
		this.$mySliderSlides.classList.add("transition-none");
		if (this.currentIndex == 0) {
			this.currentIndex = this.$mySliderSlidesArray.length;
			console.log("se ejecuto A");
		} else {
			this.currentIndex = 1;
		}
		this.currentTranslate = this.currentIndex * -this.slideWidth;
		this.prevTranslate = this.currentTranslate;
		this.$mySliderSlides.style.transform = `translateX(${this.currentTranslate}px)`;
		setTimeout(() => {
			this.$mySliderSlides.classList.remove("transition-none");
		}, 100);
	}
	setPositionByIndex() {
		// * Bloquear el desplazamiento de los slide de los extremos
		// if (!this.semaphoreinfinity) {
		// 	if (this.currentIndex > this.$mySliderSlidesArray.length - this.numberOfColumns) {
		// 		this.currentIndex = this.$mySliderSlidesArray.length - this.numberOfColumns;
		// 	} else if (this.currentIndex < 0) {
		// 		this.currentIndex = 0;
		// 	}
		// }
		if (this.currentIndex == this.$mySliderSlidesArray.length + 1 || this.currentIndex == 0) {
			setTimeout(() => {
				this.a();
			}, 500);
		}
		this.slideWidth = document.querySelector(`${this.nameSlider} .my-slider__slide`).offsetWidth;
		this.currentTranslate = this.currentIndex * -this.slideWidth;
		this.prevTranslate = this.currentTranslate;
		this.setSlidesPosition();

		console.log(this.currentIndex);
		console.log(this.$mySliderSlidesArray.length);
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
		this.setPositionByIndex();
		this.$mySliderSlides.style.cursor = "grab";
		if (!this.semaphoreinfinity) {
			this.hideNavegationButton();
		}
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
	hideNavegationButton() {
		// this.semaphoreHideNavegationButton = true;
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
	infinity() {
		this.semaphoreinfinity = true;
		this.mySliderFirstClone = this.mySliderSlidesArray[0].cloneNode(true);
		this.mySliderLastClone = this.mySliderSlidesArray[this.mySliderSlidesArray.length - 1].cloneNode(true);
		this.mySliderFirstClone.querySelector("img").addEventListener("dragstart", (e) => {
			e.preventDefault();
		});
		this.mySliderLastClone.querySelector("img").addEventListener("dragstart", (e) => {
			e.preventDefault();
		});
		this.mySliderFirstClone.classList.add("first-clone");
		this.mySliderLastClone.classList.add("last-clone");
		document.querySelector(`${this.nameSlider} .my-slider__slides`).append(this.mySliderFirstClone);
		document.querySelector(`${this.nameSlider} .my-slider__slides`).prepend(this.mySliderLastClone);

		this.$mySliderSlides.classList.add("transition-none");
		this.currentIndex = 1;
		this.$mySliderSlides.classList.remove("transition-none");
		this.setPositionByIndex();
	}
	interval() {
		setInterval(() => {
			this.currentIndex += 1;
			this.setPositionByIndex();
		}, 5000);
	}
	pauseInterval
}
const sliderTop = new MySlider(".slider-header", true, true);
sliderTop.initialize();
sliderTop.navegationButton();
// sliderTop.infinity();
