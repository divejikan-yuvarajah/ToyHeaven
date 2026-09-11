// Toy Haven - Mobile navigation toggle
// Toggles the hamburger menu open and closed on small screens

// Wait until the page HTML is loaded before running
document.addEventListener('DOMContentLoaded', function () {

  // Find the hamburger button and the nav menu
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  // Stop if either element is missing
  if (!navToggle || !navMenu) {
    return;
  }

  // When the hamburger button is clicked, toggle the menu
  navToggle.addEventListener('click', function () {
    // Add or remove the "is-open" class on both elements
    navToggle.classList.toggle('is-open');
    navMenu.classList.toggle('is-open');
  });

  // Close the menu when a nav link is clicked (helpful on mobile)
  var navLinks = navMenu.querySelectorAll('a');
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function () {
      navToggle.classList.remove('is-open');
      navMenu.classList.remove('is-open');
    });
  }

});
