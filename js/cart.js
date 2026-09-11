// Toy Haven - Cart page JavaScript
// Reads cart from localStorage and displays items with quantity controls

document.addEventListener('DOMContentLoaded', function () {

  // Draw the cart when the page loads
  renderCart();

  // Clear Cart button
  var clearBtn = document.getElementById('clear-cart-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearCart);
  }

});


// Read the cart array from localStorage
function getCart() {
  var cart = JSON.parse(localStorage.getItem('cart'));
  if (cart === null) {
    cart = [];
  }
  return cart;
}


// Save the cart array back to localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
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


// Calculate the total price of all items in the cart
function calculateTotal(cart) {
  var total = 0;

  for (var i = 0; i < cart.length; i++) {
    var product = findProductById(cart[i].id);
    if (product !== null) {
      total = total + (product.price * cart[i].quantity);
    }
  }

  return total;
}


// Update the quantity of a product (+1 or -1)
function updateQuantity(productId, change) {
  var cart = getCart();

  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === productId) {
      cart[i].quantity = cart[i].quantity + change;

      // Remove item if quantity reaches 0 or below
      if (cart[i].quantity <= 0) {
        cart.splice(i, 1);
      }
      break;
    }
  }

  saveCart(cart);
  renderCart();
}


// Draw all cart items and the summary total on the page
function renderCart() {
  var cart = getCart();
  var itemsContainer = document.getElementById('cart-items');
  var totalElement = document.getElementById('cart-total');
  var emptyCart = document.getElementById('empty-cart');
  var cartContent = document.getElementById('cart-content');

  if (!itemsContainer) {
    return;
  }

  // Clear old items
  itemsContainer.innerHTML = '';

  // Show empty message or cart content
  if (cart.length === 0) {
    emptyCart.hidden = false;
    cartContent.hidden = true;
    return;
  }

  emptyCart.hidden = true;
  cartContent.hidden = false;

  // Build a row for each cart item
  for (var i = 0; i < cart.length; i++) {
    var cartItem = cart[i];
    var product = findProductById(cartItem.id);

    // Skip if product not found in PRODUCTS
    if (product === null) {
      continue;
    }

    var subtotal = product.price * cartItem.quantity;
    var row = createCartItemRow(product, cartItem.quantity, subtotal);
    itemsContainer.appendChild(row);
  }

  // Update the total price in the summary box
  var total = calculateTotal(cart);
  totalElement.textContent = '$' + total.toFixed(2);
}


// Build one cart item row
function createCartItemRow(product, quantity, subtotal) {
  var row = document.createElement('div');
  row.className = 'cart-item';

  // Product image with descriptive alt text for accessibility
  var img = document.createElement('img');
  img.src = product.image;
  img.alt = product.name + ' product image';

  // Name and unit price
  var details = document.createElement('div');
  details.className = 'cart-item-details';

  var name = document.createElement('h3');
  name.textContent = product.name;

  var unitPrice = document.createElement('p');
  unitPrice.className = 'cart-item-price';
  unitPrice.textContent = '$' + product.price.toFixed(2) + ' each';

  details.appendChild(name);
  details.appendChild(unitPrice);

  // Quantity + and - buttons
  var qtyControls = document.createElement('div');
  qtyControls.className = 'quantity-controls';

  var minusBtn = document.createElement('button');
  minusBtn.className = 'qty-btn';
  minusBtn.textContent = '-';
  minusBtn.setAttribute('aria-label', 'Decrease quantity');
  minusBtn.addEventListener('click', function () {
    updateQuantity(product.id, -1);
  });

  var qtyDisplay = document.createElement('span');
  qtyDisplay.className = 'qty-value';
  qtyDisplay.textContent = quantity;

  var plusBtn = document.createElement('button');
  plusBtn.className = 'qty-btn';
  plusBtn.textContent = '+';
  plusBtn.setAttribute('aria-label', 'Increase quantity');
  plusBtn.addEventListener('click', function () {
    updateQuantity(product.id, 1);
  });

  qtyControls.appendChild(minusBtn);
  qtyControls.appendChild(qtyDisplay);
  qtyControls.appendChild(plusBtn);

  // Subtotal for this line
  var subtotalEl = document.createElement('p');
  subtotalEl.className = 'cart-item-subtotal';
  subtotalEl.textContent = '$' + subtotal.toFixed(2);

  row.appendChild(img);
  row.appendChild(details);
  row.appendChild(qtyControls);
  row.appendChild(subtotalEl);

  return row;
}


// Clear the entire cart after user confirms
function clearCart() {
  var confirmed = confirm('Are you sure you want to clear your cart?');
  if (confirmed) {
    saveCart([]);
    renderCart();
  }
}
