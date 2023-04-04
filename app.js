/**
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
*/

// These are the global variables that will be used to reference the DOM
const sections = document.querySelectorAll("section");
const navList = document.querySelector("#navbar__list");

// Select all sections on the page and the navigation bar list in the DOM
function buildNav() {
  for (const section of sections) {
    const newNavItem = document.createElement("li");
    const newNavLink = document.createElement("a");
    newNavLink.href = `#${section.id}`;
    newNavLink.classList.add("menu__link");
    newNavLink.textContent = section.dataset.nav;
    newNavItem.appendChild(newNavLink);
    navList.appendChild(newNavItem);
  }
}

// Check if a section is in the viewport and add or remove active classes from both the section and its corresponding link in the navigation menu.
function setActiveSection() {
  for (const section of sections) {
    const sectionRect = section.getBoundingClientRect();
    if (sectionRect.top >= 0 && sectionRect.top <= window.innerHeight) {
      section.classList.add("your-active-class");
      navList.querySelector(`a[href="#${section.id}"]`).classList.add("active-nav");
    } else {
      section.classList.remove("your-active-class");
      navList.querySelector(`a[href="#${section.id}"]`).classList.remove("active-nav");
    }
  }
}

// Highlight the active section in the navigation bar when it is present in the viewport.
function highlightActiveSection() {
  for (const navLink of navList.querySelectorAll(".menu__link")) {
    const href = navLink.getAttribute("href");
    const section = document.querySelector(href);
    if (section.classList.contains("your-active-class")) {
      navLink.classList.add("active-nav");
    } else {
      navLink.classList.remove("active-nav");
    }
  }
}

// Scroll smoothly to section when link is clicked
function scrollToSection(event) {
  event.preventDefault();
  const sectionId = event.target.getAttribute("href");
  const section = document.querySelector(sectionId);
  const top = section.offsetTop;
  window.scrollTo({
    top,
    behavior: "smooth"
  });
}

// Build menu and add event listeners
document.addEventListener("DOMContentLoaded", buildNav);
window.addEventListener("scroll", () => {
  setActiveSection();
  highlightActiveSection();
});
navList.addEventListener("click", scrollToSection);

