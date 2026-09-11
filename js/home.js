// Toy Haven - Home page JavaScript
// Handles the hero banner slider and featured products section

document.addEventListener('DOMContentLoaded', function () {

  // ---- Hero Banner Slider ----

  // Get all slides and dot buttons
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.hero-dot');
  var currentSlide = 0;

  // Function to show a specific slide by its index number
  function showSlide(index) {
    // Loop back to the start if we go past the last slide
    if (index >= slides.length) {
      index = 0;
    }
    // Loop to the end if we go before the first slide
    if (index < 0) {
      index = slides.length - 1;
    }

    // Remove "active" from all slides and dots
    for (var i = 0; i < slides.length; i++) {
      slides[i].classList.remove('active');
      dots[i].classList.remove('active');
    }

    // Add "active" to the current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');

    // Remember which slide we are on
    currentSlide = index;
  }

  // Auto-change slides every 4 seconds
  setInterval(function () {
    showSlide(currentSlide + 1);
  }, 4000);

  // Allow users to click dots to jump to a slide
  for (var d = 0; d < dots.length; d++) {
    dots[d].addEventListener('click', function () {
      // Find which dot was clicked
      var dotIndex = 0;
      for (var j = 0; j < dots.length; j++) {
        if (dots[j] === this) {
          dotIndex = j;
          break;
        }
      }
      showSlide(dotIndex);
    });
  }


  // ---- Featured Products ----

  var featuredContainer = document.getElementById('featured-products');

  if (!featuredContainer) {
    return;
  }

  // Find products where featured is true
  var featuredProducts = [];
  for (var p = 0; p < PRODUCTS.length; p++) {
    if (PRODUCTS[p].featured === true) {
      featuredProducts.push(PRODUCTS[p]);
    }
  }

  // Create a card for each featured product
  for (var f = 0; f < featuredProducts.length; f++) {
    var product = featuredProducts[f];
    var card = createProductCard(product);
    featuredContainer.appendChild(card);
  }

});


// Function to build one product card element
function createProductCard(product) {
  var card = document.createElement('div');
  card.className = 'product-card';

  // Product image
  var img = document.createElement('img');
  img.src = product.image;
  img.alt = product.name;

  // Card body wrapper
  var body = document.createElement('div');
  body.className = 'product-card-body';

  // Product name
  var title = document.createElement('h3');
  title.textContent = product.name;

  // Product price (show 2 decimal places)
  var price = document.createElement('p');
  price.className = 'product-price';
  price.textContent = '$' + product.price.toFixed(2);

  // Add to Cart button
  var button = document.createElement('button');
  button.className = 'btn btn-primary';
  button.textContent = 'Add to Cart';
  button.addEventListener('click', function () {
    addToCart(product.id);
  });

  // Put everything together
  body.appendChild(title);
  body.appendChild(price);
  body.appendChild(button);

  card.appendChild(img);
  card.appendChild(body);

  return card;
}


// Simple function to add a product to the cart in localStorage
function addToCart(productId) {
  // Get existing cart from localStorage, or start with an empty array
  var cart = JSON.parse(localStorage.getItem('cart'));
  if (cart === null) {
    cart = [];
  }

  // Check if this product is already in the cart
  var found = false;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === productId) {
      cart[i].quantity = cart[i].quantity + 1;
      found = true;
      break;
    }
  }

  // If not found, add it as a new item
  if (found === false) {
    cart.push({ id: productId, quantity: 1 });
  }

  // Save back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  alert('Added to cart!');
}
