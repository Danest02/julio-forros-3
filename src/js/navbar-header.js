const navbarHeader = document.getElementById("navbar-header"),
navbarHeaderLinks = document.getElementById("navbar-header__links"),
mainScroll = document.querySelector("main").offsetTop,
hamburguer = document.getElementById("hamburguer");
let initialScroll = window.pageYOffset;

hamburguer.addEventListener("click", () => {

    document.querySelector(".hamburguer__div-center").classList.toggle("hamburguer--simple")
    navbarHeaderLinks.classList.toggle("navbar-header__links--hamburger")
    if (navbarHeaderLinks.classList.contains("navbar-header__links--hamburger")) {
        disableScroll()
    } else {
        enableScroll()
    }

})

window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset;
    if (currentScroll >= initialScroll && currentScroll) {
        navbarHeader.classList.add("navbar-header--hide")
    }else {
        navbarHeader.classList.remove("navbar-header--hide")
    }
    if (currentScroll == 0) {
        navbarHeader.classList.remove("navbar-header--hide")
    }

    initialScroll = currentScroll;

});
