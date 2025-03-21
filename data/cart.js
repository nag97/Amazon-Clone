export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [{
    productId : 
    `e43638ce-6aa0-4b85-b27f-e1d07eb678c6`,
    quantity : 2,
    deliveryOptionId : '2'
  }, {
    productId : `15b6fc6f-327a-4ec4-896f-486349e85a3d`,
    quantity : 1,
    deliveryOptionId : '1'
  }
  ];
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

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
        quantity: selectorQuantity ,
        deliveryOptionId : '1'
      });
    }

    saveToStorage();
  };
  
  export function removeFromCart(productId){
    let newCart = [];
    cart.forEach((cartItem) => {
      if(cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    
    cart = newCart;
    saveToStorage();
    
  }