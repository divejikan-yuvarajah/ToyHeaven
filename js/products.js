// Toy Haven - Products page JavaScript
// Renders product cards, handles search, filter, and add to cart

// Keep track of the current filter and search text
var currentCategory = 'All';
var currentSearch = '';

document.addEventListener('DOMContentLoaded', function () {

  // Show all products when the page first loads
  renderProducts();

  // Set up filter button clicks
  var filterButtons = document.querySelectorAll('.filter-btn');
  for (var i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener('click', function () {
      // Update the active button style
      for (var j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove('active');
      }
      this.classList.add('active');

      // Save the chosen category and re-render
      currentCategory = this.getAttribute('data-category');
      renderProducts();
    });
  }

  // Set up search input - filter as the user types
  var searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      currentSearch = this.value.toLowerCase();
      renderProducts();
    });
  }

});


// Get the list of products that match the current filter and search
function getFilteredProducts() {
  var result = [];

  for (var i = 0; i < PRODUCTS.length; i++) {
    var product = PRODUCTS[i];

    // Check category filter (skip if "All" is selected)
    var categoryMatch = (currentCategory === 'All') || (product.category === currentCategory);

    // Check search filter (match product name)
    var searchMatch = true;
    if (currentSearch.length > 0) {
      searchMatch = product.name.toLowerCase().indexOf(currentSearch) !== -1;
    }

    // Add product if both filters pass
    if (categoryMatch && searchMatch) {
      result.push(product);
    }
  }

  return result;
}


// Draw all matching products into the grid
function renderProducts() {
  var grid = document.getElementById('products-grid');
  var noResults = document.getElementById('no-results');

  if (!grid) {
    return;
  }

  // Clear old cards
  grid.innerHTML = '';

  var filtered = getFilteredProducts();

  // Show or hide the "no results" message
  if (filtered.length === 0) {
    noResults.hidden = false;
  } else {
    noResults.hidden = true;
  }

  // Create a card for each product
  for (var i = 0; i < filtered.length; i++) {
    var card = createProductCard(filtered[i]);
    grid.appendChild(card);
  }
}


// Build one product card element
function createProductCard(product) {
  var card = document.createElement('div');
  card.className = 'product-card';

  // Product image with descriptive alt text for accessibility
  var img = document.createElement('img');
  img.src = product.image;
  img.alt = product.name + ' - ' + product.category;

  var body = document.createElement('div');
  body.className = 'product-card-body';

  var title = document.createElement('h3');
  title.textContent = product.name;

  var category = document.createElement('span');
  category.className = 'product-category';
  category.textContent = product.category;

  var price = document.createElement('p');
  price.className = 'product-price';
  price.textContent = '$' + product.price.toFixed(2);

  var cartButton = document.createElement('button');
  cartButton.className = 'btn btn-primary';
  cartButton.textContent = 'Add to Cart';
  cartButton.addEventListener('click', function () {
    addToCart(product.id, product.name);
  });

  var wishlistButton = document.createElement('button');
  wishlistButton.className = 'btn btn-secondary';
  wishlistButton.textContent = 'Add to Wishlist';
  wishlistButton.addEventListener('click', function () {
    addToWishlist(product.id, product.name);
  });

  body.appendChild(title);
  body.appendChild(category);
  body.appendChild(price);
  body.appendChild(cartButton);
  body.appendChild(wishlistButton);

  card.appendChild(img);
  card.appendChild(body);

  return card;
}


// Save product to cart in localStorage
function addToCart(productId, productName) {
  var cart = JSON.parse(localStorage.getItem('cart'));
  if (cart === null) {
    cart = [];
  }

  // Check if product is already in the cart
  var found = false;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === productId) {
      cart[i].quantity = cart[i].quantity + 1;
      found = true;
      break;
    }
  }

  // Add new item if not found
  if (found === false) {
    cart.push({ id: productId, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  // Show confirmation message
  showCartToast(productName + ' added to cart!');
}


// Save product to wishlist in localStorage
function addToWishlist(productId, productName) {
  var wishlist = JSON.parse(localStorage.getItem('wishlist'));
  if (wishlist === null) {
    wishlist = [];
  }

  // Check if product is already in the wishlist
  var found = false;
  for (var i = 0; i < wishlist.length; i++) {
    if (wishlist[i].id === productId) {
      found = true;
      break;
    }
  }

  // Add new item if not found
  if (found === false) {
    wishlist.push({ id: productId, status: 'Interested' });
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    showCartToast(productName + ' added to wishlist!');
  } else {
    showCartToast(productName + ' is already in your wishlist.');
  }
}


// Show a small message at the bottom of the screen
function showCartToast(message) {
  var toast = document.getElementById('cart-toast');
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.hidden = false;
  // Hide the message after 2.5 seconds
  setTimeout(function () {
    toast.hidden = true;
  }, 2500);
}
