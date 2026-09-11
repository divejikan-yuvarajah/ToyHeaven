// Toy Haven - Mobile navigation toggle + service worker registration

document.addEventListener('DOMContentLoaded', function () {

  setupNav();
  registerServiceWorker();

});


// Toggle the hamburger menu open and closed on small screens
function setupNav() {
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (!navToggle || !navMenu) {
    return;
  }

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('is-open');
    navMenu.classList.toggle('is-open');
  });

  var navLinks = navMenu.querySelectorAll('a');
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function () {
      navToggle.classList.remove('is-open');
      navMenu.classList.remove('is-open');
    });
  }
}


// Register the service worker so it works on every page
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(function () {
        console.log('Service worker registered.');
      })
      .catch(function (error) {
        console.log('Service worker registration failed:', error);
      });
  }
}
