// Toy Haven - Wishlist page JavaScript
// Displays saved wishlist items and lets user change status

document.addEventListener('DOMContentLoaded', function () {

  // Show wishlist items when the page loads
  renderWishlist();

});


// Read wishlist from localStorage
function getWishlist() {
  var wishlist = JSON.parse(localStorage.getItem('wishlist'));
  if (wishlist === null) {
    wishlist = [];
  }
  return wishlist;
}


// Save wishlist back to localStorage
function saveWishlist(wishlist) {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}


// Find a product in PRODUCTS by its id
function findProductById(id) {
  for (var i = 0; i < PRODUCTS.length; i++) {
    if (PRODUCTS[i].id === id) {
      return PRODUCTS[i];
    }
  }
  return null;
}


// Update the status of a wishlist item
function updateStatus(productId, newStatus) {
  var wishlist = getWishlist();

  for (var i = 0; i < wishlist.length; i++) {
    if (wishlist[i].id === productId) {
      wishlist[i].status = newStatus;
      break;
    }
  }

  saveWishlist(wishlist);
}


// Draw all wishlist items on the page
function renderWishlist() {
  var wishlist = getWishlist();
  var grid = document.getElementById('wishlist-grid');
  var emptyMessage = document.getElementById('empty-wishlist');

  if (!grid) {
    return;
  }

  grid.innerHTML = '';

  if (wishlist.length === 0) {
    emptyMessage.hidden = false;
    return;
  }

  emptyMessage.hidden = true;

  for (var i = 0; i < wishlist.length; i++) {
    var item = wishlist[i];
    var product = findProductById(item.id);

    // Skip if product not found in PRODUCTS
    if (product === null) {
      continue;
    }

    var card = createWishlistCard(product, item.status);
    grid.appendChild(card);
  }
}


// Build one wishlist card
function createWishlistCard(product, status) {
  var card = document.createElement('div');
  card.className = 'wishlist-card';

  // Product image with descriptive alt text for accessibility
  var img = document.createElement('img');
  img.src = product.image;
  img.alt = product.name + ' - ' + product.category;

  var body = document.createElement('div');
  body.className = 'wishlist-card-body';

  var title = document.createElement('h3');
  title.textContent = product.name;

  var label = document.createElement('label');
  label.className = 'status-label';
  label.textContent = 'Status';
  label.setAttribute('for', 'status-' + product.id);

  var select = document.createElement('select');
  select.className = 'status-select';
  select.id = 'status-' + product.id;

  // The three status options
  var statuses = ['Interested', 'Owned', 'Not Interested'];
  for (var i = 0; i < statuses.length; i++) {
    var option = document.createElement('option');
    option.value = statuses[i];
    option.textContent = statuses[i];
    if (statuses[i] === status) {
      option.selected = true;
    }
    select.appendChild(option);
  }

  // Update localStorage when dropdown changes
  select.addEventListener('change', function () {
    updateStatus(product.id, this.value);
  });

  body.appendChild(title);
  body.appendChild(label);
  body.appendChild(select);

  card.appendChild(img);
  card.appendChild(body);

  return card;
}
