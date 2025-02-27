export const cart = [];

export function addToCart(productId){
  let matchingItem;

    cart.forEach((cartItem) => {
      console.log(cartItem.productId);
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    // Get selected quantity from dropdown
    let selectorQuantity = Number(
      document.querySelector(`.js-quantity-selector-${productId}`).value, 
      10
    );

    if (matchingItem) {
      matchingItem.quantity += selectorQuantity; 
    } else {
      cart.push({
        productId: productId,
        quantity: selectorQuantity 
      });
    }
};