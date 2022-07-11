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

