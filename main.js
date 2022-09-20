// Cart 
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
//Open Cart
cartIcon.onclick = () =>{
    cart.classList.add('active');
};
//Close Cart
closeCart.onclick = () =>{
    cart.classList.remove('active');
};

// Cart Working 
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

// Function
function ready(){
    // Sacar items de la carta
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons [i]
        button.addEventListener('click', removeCartItem)
    }
    //Quantity Changes
    let quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++){
        let input= quantityInputs[i]
        input.addEventListener('change', quantityChanged);
    }
    // Añadir a la carta
    let añadirCart = document.getElementsByClassName('add-cart')
    for (let i = 0; i < añadirCart.length; i++){
        let button = añadirCart[i]
        button.addEventListener('click', añadirCartClicked);
    }
    // Buy Button work
    document.getElementsByClassName('btn-buy')[0]
    .addEventListener('click', buyButtonClicked);
}
//Buy Button
function buyButtonClicked(){
    alert('Your order is placed')
    let cartContent= document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal();
}

//Quantity Changes
function quantityChanged(event){
    let input = event.target
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    
    updateTotal();
}
// Añadir a la carta
function añadirCartClicked(event){
    let button = event.target;
    let shopProducts= button.parentElement;
    let title= shopProducts.getElementsByClassName('product-title')[0].innerText;
    let colorCart= shopProducts.getElementsByClassName('color')[0].innerText;
    let price= shopProducts.getElementsByClassName('price')[0].innerText;
    let productImg= shopProducts.getElementsByClassName('product-img')[0].src;
    
    addProductToCart(title,colorCart,price,productImg);
    updateTotal();
}



function addProductToCart(title, color, price, productImg){
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('product-title');
    for (let i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            return;
        }
    }
   
    let cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
     <h2 class="product-title">${title}</h2>
       <span class="color">${color}</span>
       <div></div>
      <span class="talle">L</span>
       <div></div>
       <span class="price">${price}</span>
       <div></div>
     <input type="number" value="1" class="cart-quantity">
    <i class='bx bxs-trash-alt cart-remove' ></i>`;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox
.getElementsByClassName('cart-remove')[0]
.addEventListener('click', removeCartItem);
cartShopBox
.getElementsByClassName('cart-quantity')[0]
.addEventListener('change', quantityChanged);
}




// Actualizar Total
function updateTotal(){
    let cartContent= document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++){
        let cartBox= cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace('$',''));
        let quantity = quantityElement.value 
        total= total + (price * quantity);
    } 
        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    }

