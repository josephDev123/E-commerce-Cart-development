// DOMS
const cart_info = document.getElementById('cart-info');
const cart = document.getElementById('cart');
const item_icon_wrapper = document.querySelectorAll('.store-item-icon');



// event listener
cart_info.addEventListener('click', function(){
cart.classList.toggle('show-cart');

});


//clicking on item-cart

item_icon_wrapper.forEach((icon)=>{

icon.addEventListener('click', (e)=>{

    const items = {};
    
  //    product name
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
   console.log(items);


//    display product img, item and name in cart 

const cart_item = document.createElement('div');
cart_item.classList.add("cart-item","d-flex","justify-content-between","text-capitalize","my-3");
cart_item.innerHTML= `
    <img src="img-cart${items.image}" class="img-fluid rounded-circle" id="item-img" alt="">
    <div class="cart-item-text">

    <p id="cart-item-title" class="font-weight-bold mb-0">${items.name}</p>
    <span>$</span>
    <span id="cart-item-price" class="cart-item-price" class="mb-0">${items.price}</span>
    </div>
    <a href="#" id='cart-item-remove' class="cart-item-remove">
    <i class="fas fa-trash"></i>
    </a>    

`;
const total_wrapper = document.querySelector('.cart-total-container');
cart.insertBefore(cart_item, total_wrapper);
alert('item added to cart');
 showTotal();

})

})

function showTotal(){
    const priceDom = document.querySelectorAll('#cart-item-price');
    const total = [];
    
    priceDom.forEach((itemPrice)=>{
        total.push(parseFloat(itemPrice.textContent))
    });
   
// total price of item selected
    const totalMoney = total.reduce((acc,item)=>{
        acc+=item;
        return acc;
    },0)
    const cart_total = document.getElementById('cart-total');
    cart_total.textContent = totalMoney.toFixed(2)


// total amount of item selected
    const itemCount = document.getElementById('item-count');
    itemCount.textContent = total.length;

    // total price of item selected
    const itemTotal = document.querySelector('.item-total');
    itemTotal.textContent = totalMoney.toFixed(2);
}



const itemDelete = document.querySelectorAll('#cart-item-remove');
itemDelete.forEach(item => {
    item.addEventListener('click', DeleteItem)
});

function DeleteItem(){
    console.log('hello world');
}



