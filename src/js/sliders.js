// window.addEventListener("load", function () {
// });
class MySlider {
	constructor(nameSlider, parameters) {
		this.nameSlider = nameSlider;
		this.$mySlider = document.querySelector(nameSlider);
		this.$mySliderSlides = document.querySelector(`${nameSlider} .my-slider__slides`);
		this.$mySliderSlidesArray = Array.from(document.querySelectorAll(`${nameSlider} .my-slider__slide`));
		this.$mySliderSlide = document.querySelector(`${nameSlider} .my-slider__slide`);
		this.$mySliderNextbutton = document.querySelector(`${nameSlider} .my-slider__navegation-button--next`);
		this.$mySliderBackbutton = document.querySelector(`${nameSlider} .my-slider__navegation-button--back`);
		this.isDragging = false;
		this.startPosition = 0;
		this.currentTranslate = 0;
		this.prevTranslate = 0;
		this.currentIndex = 0;
		this.index = 0;
		this.currentPosition = 0;
		this.numberOfColumns = Math.floor(parseInt(getComputedStyle(document.querySelector(`${nameSlider}`)).getPropertyValue("--column")));
		this.numberOfRows = Math.floor(parseInt(getComputedStyle(document.querySelector(`${nameSlider}`)).getPropertyValue("--row")));
		this.gap = Math.floor(parseInt(getComputedStyle(document.querySelector(`${nameSlider}`)).getPropertyValue("--gap")));
		this.mySliderSlidesArray = document.querySelectorAll(`${this.nameSlider} .my-slider__slide`);
		this.semaphoreButton = true;
		this.interval = parameters.interval;
		this.semaphoreInterval;
		this.loop = parameters.loop;
		this.startPositionY;
		this.currentPositionY;
		this.y;
		this.semaphore;
	}
	initialize() {
		// TODO:ANCHOR --- ESCUCHADORES DE EVENTOS
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

		// TODO:ANCHOR --- EJECUTAR FUNCIONES
		// * STUB --- Botones de navegaciom
		if (this.$mySliderNextbutton) {
			this.navegationButton();
		}
		// * STUB --- Loop
		if (typeof this.loop !== "undefined") {
			this.funcitionLoop();
		} else {
			if (this.$mySliderNextbutton) this.$mySliderBackbutton.classList.add("my-slider__navegation-button--opacity-none");
		}
		// * STUB --- Interval
		if (typeof this.interval !== "undefined") {
			this.semaphoreInterval = true;
			this.functionInterval();
		}
	}
	// TODO:ANCHOR --- FUNCIONES COMIENZO, MOVIMIENTO Y FINAL
	touchStart(e) {
		this.isDragging = true;
		this.startPosition = this.getPositionX(e);
		this.startPositionY = this.getPositionY(e);
	}
	touchMove(e) {
		if (this.semaphoreInterval) {
			this.semaphoreInterval = false;
		}
		if (this.isDragging) {
			// this.$mySliderSlides.style.cursor = "grabbing";
			this.currentPosition = this.getPositionX(e);
			this.currentPositionY = this.getPositionY(e);
			this.currentTranslate = this.prevTranslate + this.currentPosition - this.startPosition;
			if (Math.abs(this.startPositionY - this.currentPositionY) < 10) {
				if (Math.abs(this.startPosition - this.currentPosition) > 10) {
					this.semaphore = true;
				}
			}
			console.log(this.semaphore);
			if (this.semaphore) {
				this.setSlidesPosition();
			}
			// // this.animation();
		}
	}
	touchEnd() {
		let movedBy, direction;
		movedBy = this.currentTranslate - this.prevTranslate;
		movedBy > 0 ? (direction = -1) : (direction = 1);
		if (this.semaphore) {
			if (Math.abs(movedBy) > this.slideWidth * 2.5) {
				this.currentIndex += 3 * direction;
			} else if (Math.abs(movedBy) > this.slideWidth * 1.5) {
				this.currentIndex += 2 * direction;
			} else if (Math.abs(movedBy) > 50) {
				this.currentIndex += 1 * direction;
			}
			this.setPositionByIndex();
		}
		this.isDragging = false;
		this.semaphore = false;
		// this.$mySliderSlides.style.cursor = "grab";
	}

	// TODO:ANCHOR --- ESTABLECER TRANSLACION DE $SLIDES
	setSlidesPosition() {
		this.$mySliderSlides.style.transform = `translateX(${this.currentTranslate}px)`;
	}

	// TODO:ANCHOR --- OBTENER POSICION DE X
	getPositionX(e) {
		return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
	}
	getPositionY(e) {
		return e.type.includes("mouse") ? e.pageY : e.touches[0].clientY;
	}

	// TODO:ANCHOR --- ANIMACION
	// animation() {
	// this.setSlidesPosition();
	// if(this.isDragging){
	// 	reguestAnimationFrame(this.animation())
	// }
	// }
	// TODO:ANCHOR --- ESTABLECER INDICE DE POSICION
	setPositionByIndex() {
		// * STUB --- Bloquear el desplazamiento de los slide de los extremos
		if (typeof this.loop == "undefined") {
			let a;
			if (this.numberOfColumns == 1 && this.numberOfRows == 1) {
				a = Math.round(this.$mySliderSlidesArray.length - 1);
			} else if (this.numberOfColumns == 1 && this.numberOfRows == 3) {
				a = Math.round(this.$mySliderSlidesArray.length / this.numberOfRows);
			} else if (this.numberOfColumns == 2 && this.numberOfRows == 1) {
				a = Math.round(this.$mySliderSlidesArray.length - this.numberOfColumns);
			} else if (this.numberOfColumns == 2 && this.numberOfRows == 2) {
				a = Math.round(this.$mySliderSlidesArray.length / this.numberOfColumns - 2);
			} else if (this.numberOfColumns == 3 && this.numberOfRows == 2) {
				a = Math.ceil(this.$mySliderSlidesArray.length / this.numberOfColumns - 1);
			}
			if (this.currentIndex > a) {
				this.currentIndex = a;
			} else if (this.currentIndex < 0) {
				this.currentIndex = 0;
			}
			if (this.currentIndex == 0) {
				this.$mySliderBackbutton.classList.add("my-slider__navegation-button--opacity-none");
			} else {
				this.$mySliderBackbutton.classList.remove("my-slider__navegation-button--opacity-none");
			}
			if (this.currentIndex == a) {
				this.$mySliderNextbutton.classList.add("my-slider__navegation-button--opacity-none");
			} else {
				this.$mySliderNextbutton.classList.remove("my-slider__navegation-button--opacity-none");
			}
		}
		// * STUB --- Ejecutar salto del slide infinito
		if (this.currentIndex == this.$mySliderSlidesArray.length + 1 || (this.currentIndex == 0 && typeof this.loop !== "undefined")) {
			setTimeout(() => {
				this.jumpOfSlide();
			}, 500);
		}
		this.slideWidth = document.querySelector(`${this.nameSlider} .my-slider__slide`).offsetWidth;
		this.currentTranslate = this.currentIndex * -(this.slideWidth + this.gap);
		this.prevTranslate = this.currentTranslate;
		this.setSlidesPosition();
	}

	navegationButton() {
		this.$mySlider.addEventListener("click", (e) => {
			if (this.semaphoreButton) {
				this.semaphoreButton = false;
				this.semaphoreInterval = false;
				if (e.target == this.$mySliderNextbutton) {
					this.currentIndex += 1 * this.numberOfColumns;
				} else if (e.target == this.$mySliderBackbutton) {
					this.currentIndex -= 1 * this.numberOfColumns;
				}
				this.setPositionByIndex();
				setTimeout(() => {
					this.semaphoreButton = true;
				}, 600);
			} else {
			}
		});
	}
	funcitionLoop() {
		let mySliderFirstClone = this.mySliderSlidesArray[0].cloneNode(true);
		let mySliderLastClone = this.mySliderSlidesArray[this.mySliderSlidesArray.length - 1].cloneNode(true);
		mySliderFirstClone.querySelector("img").addEventListener("dragstart", (e) => {
			e.preventDefault();
		});
		mySliderLastClone.querySelector("img").addEventListener("dragstart", (e) => {
			e.preventDefault();
		});
		mySliderFirstClone.classList.add("first-clone");
		mySliderLastClone.classList.add("last-clone");
		document.querySelector(`${this.nameSlider} .my-slider__slides`).append(mySliderFirstClone);
		document.querySelector(`${this.nameSlider} .my-slider__slides`).prepend(mySliderLastClone);

		this.$mySliderSlides.classList.add("transition-none");
		this.currentIndex = 1;
		this.$mySliderSlides.classList.remove("transition-none");
		this.setPositionByIndex();
	}
	// TODO:ANCHOR --- SALTO DE SLIDE DEL LOPP
	jumpOfSlide() {
		this.$mySliderSlides.classList.add("transition-none");
		if (this.currentIndex == 0) {
			this.currentIndex = this.$mySliderSlidesArray.length;
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

	functionInterval() {
		setInterval(() => {
			if (this.semaphoreInterval) {
				this.currentIndex += 1;
				this.setPositionByIndex();
			} else if (!this.semaphoreInterval) {
				setTimeout(() => {
					this.semaphoreInterval = true;
				}, this.interval.resume);
			}
		}, this.interval.time);
	}
}
const sliderTop = new MySlider(".slider-header", {
	interval: {
		time: 5000,
		resume: 7000,
	},
	loop: "active"
});
sliderTop.initialize();
const sliderCatalogueIndex = new MySlider(".slider-catalogue-index", {});
sliderCatalogueIndex.initialize();
