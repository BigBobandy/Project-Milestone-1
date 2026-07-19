// open and close nav menu for smaller screens
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.getElementById("main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", function () {
    const menuIsOpen = mainNav.classList.toggle("nav-open");

    navToggle.setAttribute("aria-expanded", String(menuIsOpen));
  });

  const navLinks = mainNav.querySelectorAll(".nav-link");

  navLinks.forEach(function (navLink) {
    navLink.addEventListener("click", function () {
      mainNav.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && mainNav.classList.contains("nav-open")) {
      mainNav.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.focus();
    }
  });
}
