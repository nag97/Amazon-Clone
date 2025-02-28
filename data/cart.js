export const cart = [{
  productId : 
  `e43638ce-6aa0-4b85-b27f-e1d07eb678c6`,
  quantity : 2,
}, {
  productId : `15b6fc6f-327a-4ec4-896f-486349e85a3d`,
  quantity : 1,
}
];

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