"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}var navbarHeader=document.getElementById("navbar-header"),navbarHeaderLinks=document.getElementById("navbar-header__links"),mainScroll=document.querySelector("main").offsetTop,hamburguer=document.getElementById("hamburguer"),initialScroll=window.pageYOffset;hamburguer.addEventListener("click",(function(){document.querySelector(".hamburguer__div-center").classList.toggle("hamburguer--simple"),navbarHeaderLinks.classList.toggle("navbar-header__links--hamburger"),navbarHeaderLinks.classList.contains("navbar-header__links--hamburger")?disableScroll():enableScroll()})),window.addEventListener("scroll",(function(){var e=window.pageYOffset;e>=initialScroll&&e>=mainScroll?(navbarHeader.classList.add("navbar-header--hide"),navbarHeader.classList.add("navbar-header--scroll")):e<=mainScroll?navbarHeader.classList.add("navbar-header--hide"):navbarHeader.classList.remove("navbar-header--hide"),0==e&&(navbarHeader.classList.remove("navbar-header--scroll"),navbarHeader.classList.remove("navbar-header--hide")),initialScroll=e}));var disableScroll=function(){var e=window.scrollX,t=window.scrollY;window.onscroll=function(){window.scrollTo(e,t)}},enableScroll=function(){window.onscroll=null},MySlider=function(){function e(t){_classCallCheck(this,e),this.nameSlider=t,this.$mySlider=document.querySelector(t),this.$mySliderSlides=document.querySelector("".concat(t," .my-slider__slides")),this.$mySliderSlidesArray=Array.from(document.querySelectorAll("".concat(t," .my-slider__slide"))),this.$mySliderSlide=document.querySelector("".concat(t," .my-slider__slide")),this.slideWidth,this.isDragging=!1,this.startPosition=0,this.currentTranslate=0,this.prevTranslate=0,this.currentIndex=0,this.index=0,this.currentPosition=0,this.animationID=null,this.movedBy,this.slideWidth=document.querySelector("".concat(this.nameSlider," .my-slider__slide")).offsetWidth,this.numberOfColumns=Math.floor(parseInt(getComputedStyle(document.querySelector("".concat(t))).getPropertyValue("--column"))),this.direction,this.$mySliderNextbutton=document.querySelector("".concat(t," .my-slider__navegation-button--next")),this.$mySliderBackbutton=document.querySelector("".concat(t," .my-slider__navegation-button--back"))}return _createClass(e,[{key:"initialize",value:function(){var e=this;window.addEventListener("resize",(function(){e.slideWidth=document.querySelector("".concat(e.nameSlider," .my-slider__slide")).offsetWidth}),{passive:!0}),this.$mySliderSlidesArray.forEach((function(e){e.querySelector("img").addEventListener("dragstart",(function(e){e.preventDefault()}))}),{passive:!0}),this.$mySliderSlides.addEventListener("touchstart",(function(t){e.touchStart(t)}),{passive:!0}),this.$mySliderSlides.addEventListener("touchend",(function(t){e.touchEnd(t)}),{passive:!0}),this.$mySliderSlides.addEventListener("touchmove",(function(t){e.touchMove(t)}),{passive:!0}),this.$mySliderSlides.addEventListener("mousedown",(function(t){e.touchStart(t)}),{passive:!0}),this.$mySliderSlides.addEventListener("mousemove",(function(t){e.touchMove(t)}),{passive:!0}),this.$mySliderSlides.addEventListener("mouseup",(function(t){e.touchEnd(t)}),{passive:!0}),this.$mySliderSlides.addEventListener("mouseleave",(function(t){e.touchEnd(t)}),{passive:!0})}},{key:"setSlidesPosition",value:function(){this.currentTranslate>0||(this.$mySliderSlides.style.transform="translateX(".concat(this.currentTranslate,"px)"),this.$mySliderBackbutton&&this.$mySliderNextbutton&&(0==this.currentIndex?this.$mySliderBackbutton.classList.add("my-slider__navegation-button--opacity-none"):this.$mySliderBackbutton.classList.remove("my-slider__navegation-button--opacity-none"),this.currentIndex==this.$mySliderSlidesArray.length-this.numberOfColumns?this.$mySliderNextbutton.classList.add("my-slider__navegation-button--opacity-none"):this.$mySliderNextbutton.classList.remove("my-slider__navegation-button--opacity-none")))}},{key:"getPositionX",value:function(e){return e.type.includes("mouse")?e.pageX:e.touches[0].clientX}},{key:"animation",value:function(){this.setSlidesPosition()}},{key:"setPositionByIndex",value:function(){this.currentIndex>this.$mySliderSlidesArray.length-this.numberOfColumns?this.currentIndex=this.$mySliderSlidesArray.length-this.numberOfColumns:this.currentIndex<0&&(this.currentIndex=0),this.currentTranslate=this.currentIndex*-this.slideWidth,this.prevTranslate=this.currentTranslate,this.setSlidesPosition()}},{key:"touchStart",value:function(e){this.isDragging=!0,this.startPosition=this.getPositionX(e)}},{key:"touchMove",value:function(e){this.isDragging&&(this.$mySliderSlides.style.cursor="grabbing",this.currentPosition=this.getPositionX(e),this.currentTranslate=this.prevTranslate+this.currentPosition-this.startPosition,this.animation())}},{key:"touchEnd",value:function(){this.isDragging=!1,this.movedBy=this.currentTranslate-this.prevTranslate,this.movedBy>0?this.direction=-1:this.direction=1,Math.abs(this.movedBy)>2.5*this.slideWidth?this.currentIndex+=3*this.direction:Math.abs(this.movedBy)>1.5*this.slideWidth?this.currentIndex+=2*this.direction:Math.abs(this.movedBy)>50&&(this.currentIndex+=1*this.direction),this.currentIndex>this.$mySliderSlidesArray.length-this.numberOfColumns?this.currentIndex=this.$mySliderSlidesArray.length-this.numberOfColumns:this.currentIndex<0&&(this.currentIndex=0),this.setPositionByIndex(),this.$mySliderSlides.style.cursor="grab"}},{key:"navegationButton",value:function(){var e=this;this.$mySlider.addEventListener("click",(function(t){t.target==e.$mySliderNextbutton?e.currentIndex+=1:t.target==e.$mySliderBackbutton&&(e.currentIndex-=1),e.setPositionByIndex()}))}}]),e}(),getScrollBarWidth=function(){return innerWidth-document.documentElement.clientWidth};document.documentElement.style.setProperty("--scroll-bar",getScrollBarWidth());