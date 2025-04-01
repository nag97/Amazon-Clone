import { cart, removeFromCart, saveToStorage } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';


import { deliveryOptions } from '../data/deliveryOptions.js';

function getDeliveryDate(deliveryDays) {
  return dayjs().add(deliveryDays, 'days').format('dddd, MMMM D');
}

function deliveryOptionsHTML(cartItem) {
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const dateString = getDeliveryDate(deliveryOption.deliveryDays);
    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
    const isChecked = cartItem.deliveryOptionId === deliveryOption.id ? 'checked' : '';

    html += `
      <div class="delivery-option">
        <input type="radio" 
          class="delivery-option-input"
          name="delivery-option-${cartItem.productId}"
          data-product-id="${cartItem.productId}"
          data-delivery-option-id="${deliveryOption.id}"
          ${isChecked}>
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>`;
  });
  return html;
}

function updateCartSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const matchingProduct = products.find((product) => product.id === cartItem.productId);
    const deliveryDate = getDeliveryDate(deliveryOptions.find(opt => opt.id === cartItem.deliveryOptionId).deliveryDays);
    
    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${deliveryDate}
        </div>
        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">
          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
              <span class="update-quantity-link link-primary">Update</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
            </div>
          </div>
          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${deliveryOptionsHTML(cartItem)}
          </div>
        </div>
      </div>`;
  });

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
  addEventListeners();
}

function addEventListeners() {
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
    });
  });

  document.querySelectorAll('.delivery-option-input').forEach((input) => {
    input.addEventListener('change', (event) => {
      const productId = event.target.dataset.productId;
      const deliveryOptionId = event.target.dataset.deliveryOptionId;
      const cartItem = cart.find(item => item.productId === productId);
      if (cartItem) {
        cartItem.deliveryOptionId = deliveryOptionId;
        saveToStorage();
        updateCartSummary();
      }
    });
  });
}

updateCartSummary();