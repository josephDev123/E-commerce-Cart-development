// DOMS
'use strict'
const cart_info = document.getElementById('cart-info');
const cart = document.getElementById('cart');
const item_icon_wrapper = document.querySelectorAll('.store-item-icon');
const clear_cart = document.getElementById('clear');

const cartWrapperId =  document.querySelectorAll('#itemWrapper');
const total_wrapper = document.querySelector('.cart-total-container');
let cartItemObj =[];
let cartArr =localStorage.getItem('cartItemData')?JSON.parse(localStorage.getItem('cartItemData')):[];





if (cartArr.length > 0) {
    cartArr.forEach(localStorageItem =>{
        let items = localStorageItem

        //    display product img, item and name in cart 
        const cart_item = document.createElement('div');
        cart_item.id='itemWrapper';
    // if(cart_item.classList.add("cart-item","d-flex","justify-content-between","text-capitalize","my-3") == null){
        cart_item.classList.add("cart-item","d-flex","justify-content-between","text-capitalize","my-3");
        cart_item.innerHTML= `
        <img src="img-cart${items.image}" class="img-fluid rounded-circle" id="item-img" alt="">
        <div class="cart-item-text">
    
        <p id="cart-item-title" class="font-weight-bold mb-0">${items.name}</p>
        <span>$</span>
        <span id="cart-item-price" class="cart-item-price" class="mb-0">${items.price}</span>
        </div>
        <a href="#" id='cart-item-remove' class="cart-item-remove" onClick="removeCart()">
        <i class="fas fa-trash"></i>
        </a>    
    
    `;
    

    
    //push object to array
    cartItemObj.push(items)
    
    //insert array cart into localstorage
    localStorage.setItem('cartItemData', JSON.stringify(cartItemObj));
    
    cart.insertBefore(cart_item, total_wrapper);
    
     showTotal();
    
    
    })
    
}






















//show and hide cart items by toggling
cart_info.addEventListener('click', function(){
cart.classList.toggle('show-cart');

});



//clicking on item-cart
item_icon_wrapper.forEach((icon)=>{

icon.addEventListener('click', (e)=>{

    const items = {};
    
  //    product image
    //slicing image link to obtain only the image text
    const index = e.target.parentElement.children[0].src.indexOf('img'); 
    const img= e.target.parentElement.children[0].src.substr(index+3);
   items.image = img;

//    product name
   const item_name = e.target.parentElement.nextElementSibling.children[0].children[0].textContent;
   items.name = item_name;

//    product price
   const item_price = +e.target.parentElement.nextElementSibling.children[0].children[1].textContent.substr(1).trim();
   items.price = item_price;
   


//    display product img, item and name in cart 
const cart_item = document.createElement('div');
cart_item.id='itemWrapper';
// if(cart_item.classList.add("cart-item","d-flex","justify-content-between","text-capitalize","my-3") == null){
    cart_item.classList.add("cart-item","d-flex","justify-content-between","text-capitalize","my-3");
    cart_item.innerHTML= `
    <img src="img-cart${items.image}" class="img-fluid rounded-circle" id="item-img" alt="">
    <div class="cart-item-text">

    <p id="cart-item-title" class="font-weight-bold mb-0">${items.name}</p>
    <span>$</span>
    <span id="cart-item-price" class="cart-item-price" class="mb-0">${items.price}</span>
    </div>
    <a href="#" id='cart-item-remove' class="cart-item-remove" onClick="removeCart()">
    <i class="fas fa-trash"></i>
    </a>    

`;

//push object to array
cartItemObj.push(items)

//insert array cart into localstorage
localStorage.setItem('cartItemData', JSON.stringify(cartItemObj));

cart.insertBefore(cart_item, total_wrapper);
// cart.appendChild(cart_item);
alert('item added to cart');
 showTotal();


})

});

// delete each item 
function removeCart(){
const displayCartDiv = document.querySelector('.cart-item');
displayCartDiv.remove();
showTotal();
//get the starting point index of the image from the http(link)
let removeImageIndex= displayCartDiv.children[0].src.indexOf('sweet');
//extract image base on the index point 
let removeImage = displayCartDiv.children[0].src.substr(63-1);
cartItemObj = cartItemObj.filter(element => element.image !== removeImage); 
localStorage.setItem('cartItemData', JSON.stringify(cartItemObj));
}

//clear all item
function clearAllItem(){
const clearAll = document.getElementById('clear');
clearAll.addEventListener('click', ()=>{
    const alldisplayCartDiv = document.querySelectorAll('.cart-item');
    alldisplayCartDiv.forEach(item =>{
        item.remove();
        showTotal();
        cartItemObj = [];
        localStorage.clear();
    })
    
})
}
clearAllItem()


//
function showTotal(){
    const priceDom = document.querySelectorAll('#cart-item-price');
    const total = [];
    
    priceDom.forEach((itemPrice)=>{
        total.push(parseFloat(itemPrice.textContent))
    });
   
// total price of item selected
    var totalMoney = total.reduce((acc,item)=>{
        acc+=item;
        return acc;
    },0)
    const cart_total = document.getElementById('cart-total');
    cart_total.textContent = totalMoney.toFixed(2)


// total item selected
    const itemCount = document.getElementById('item-count');
    itemCount.textContent = total.length;

    // total price of item selected
    const itemTotal = document.querySelector('.item-total');
    itemTotal.textContent = totalMoney.toFixed(2);
    
};



//paypal checkout
var data =  cartArr.reduce((acc,item) =>{
    return acc+=item.price
}, 0)

paypal.Buttons({
    createOrder: function(data, actions) {
      // This function sets up the details of the transaction, including the amount and line item details.
      
      return actions.order.create({
        purchase_units: [{
          amount: {
            value:cartItemObj.reduce((acc,item) =>{
                return acc+=item.price
            }, 0)
          }
        }]
      });
    },
    onApprove: function(data, actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function(details) {
          // This function shows a transaction success message to your buyer.
          alert('Transaction completed by ' + details.payer.name.given_name);
        //   alert('Transaction completed successful ');
        });
      }
  
}).render('#checkout');
