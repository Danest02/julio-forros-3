const disableScroll = () => {
	var x = window.scrollX;
	var y = window.scrollY;
	window.onscroll = function () {
		window.scrollTo(x, y);
	};
};
const enableScroll = () => {
	window.onscroll = null;
};

document.getElementById("activities__card-button").addEventListener(
	"click",
	() => {
        disableScroll()
		document.getElementById("menu-restaurant").classList.add("menu-restaurant--visible");
	},
	{ passive: true }
);
document.getElementById("menu-restaurant__button").addEventListener(
	"click",
	() => {
        enableScroll()
		document.getElementById("menu-restaurant").classList.remove("menu-restaurant--visible");
	},
	{ passive: true }
);
