let cartLists = document.querySelector(".cartList");

let data = JSON.parse(localStorage.getItem("products")) ?? [];

console.log("data", data);

function showList() {
  let totalPrice = 0;
  const cartData = data.slice(0,5).map((item, index) => {
    let cart = {
      name: item.name,
      brand: item.brand,
      price: item.price,
      preview: item.preview,
      size: item.size,
      photos: item.photos,
    };

    let itemList = `
      <div class="item">
        <div class="itemDetail" id="item${index}">
  <img src="${cart.preview}" alt="">
  <div class="leftSide">
    <h2>${cart.name}</h2>
    <p>Delivery 05 May</p>
  </div>
<div class="rightSide">
  <div class="iconPlus">
    <span class="inc">+</span>
    <span class="counters">1</span>
    <span class="dec">-</span>
  </div>
  <p class="price" data-price="${cart.price}">$${cart.price}</p>
</div>
</div>
 
<div id="totalPrice">
<p id="totalP"></p>
    </div>
</div>
`;
    totalPrice += cart.price; // Add the item's price to the total price
    return itemList;
  });
  cartLists.innerHTML = cartData.join("");

  const increment = document.querySelectorAll(".inc");
  const counters = document.querySelectorAll(".counters");
  const counter = document.querySelectorAll(".counter");
  const decrement = document.querySelectorAll(".dec");
  const priceElements = document.querySelectorAll(".price");
  const totalPrices = document.getElementById('totalP')
  console.log(increment);

  increment.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      let add = parseInt(counters[index].textContent);
     

      add++;
      
      counters[index].textContent = add;

      // Update the item's price and total price
      let itemPrice = parseFloat(
        priceElements[index].getAttribute("data-price")
      );
      totalPrice += itemPrice;
      priceElements[index].textContent = `$${itemPrice * add}`;

      // Update the total price displayed somewhere in your UI
      updateTotalPrice(totalPrice);
    });
  });

  decrement.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      let sub = parseInt(counters[index].textContent);
      
      sub--;
  
      counters[index].textContent = sub;
     // Update the item's price and total price
     let itemPrice = parseFloat(
        priceElements[index].getAttribute("data-price")
      );
      totalPrice -= itemPrice;
      priceElements[index].textContent = `$${itemPrice * sub}`;

      // Update the total price displayed somewhere in your UI
      updateTotalPrice(totalPrice);

    });
  });

  function updateTotalPrice(totalPrice) {
    // Replace this with code to update the total price in your UI
    totalPrices.textContent = `Total Price: $${totalPrice}`
    console.log("Total Price: $" + totalPrice);
  }
}

showList();
