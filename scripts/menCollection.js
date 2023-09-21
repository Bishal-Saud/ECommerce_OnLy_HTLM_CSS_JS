const productContainer = document.querySelector(".productsBox");
const counterBtn = document.querySelector(".counter");

async function collections() {
  try {
    await fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/product")
      .then((res) => {
        if (res.ok) {
          console.log("response is ok");
        } else {
          console.log("something wrong");
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("products", JSON.stringify(data));

        let productDatas = JSON.parse(localStorage.getItem("products")) ?? [];

        //  console.log('data',productDatas);

        const menData = productDatas.map((item, index) => {
          //  console.log(index);
          let dress = {
            name: item.name,
            brand: item.brand,
            price: item.price,
            preview: item.preview,
            size: item.size,
            photos: item.photos,
          };

          // console.log(dress);

          let card = `
<div class="card">
                <figure>
                  <img src="${dress.preview}" alt="t-shirt">
                </figure>
                <div class="details">
                  <div class="min-details">
                    <h1>${dress.brand}<span>${dress.name}</span></h1>
                    <h1 class="price">$${dress.price}</h1>
                  </div>
          
                  </div>
                  <a  class="btn addBtn" >add to cart</a>
                </div>
              </div>`;

          // Save cart

          return card;
        });

        productContainer.innerHTML = menData.join("");
        const addBtn = document.querySelectorAll(".addBtn");
        const cartList = document.querySelector(".cartList");
        let count = 0;
        let carts = [];

        function showCart(item) {
          let totalPrice = 0;
          let cart = {
            name: item.name,
            brand: item.brand,
            price: item.price,
            preview: item.preview,
            size: item.size,
            photos: item.photos,
          };

          let itemList = `
    <div class="item" >
      <div class="itemDetail" >
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
</div> 

`;
          totalPrice += cart.price;
          cartList.innerHTML += itemList;

          const increment = document.querySelectorAll(".inc");
          const counters = document.querySelectorAll(".counters");
          const decrement = document.querySelectorAll(".dec");
          const priceElements = document.querySelectorAll(".price");
          const totalPrices = document.getElementById("totalP");

          increment.forEach((btn, index) => {
            btn.addEventListener("click", () => {
              let add = parseInt(counters[index].textContent);

              add++;

              counters[index].textContent = add;

              let itemPrice = parseFloat(
                priceElements[index].getAttribute("data-price")
              );
              totalPrice += itemPrice;
              priceElements[index].textContent = `$${itemPrice * add}`;

              updateTotalPrice(totalPrice);
            });
          });

          decrement.forEach((btn, index) => {
            btn.addEventListener("click", () => {
              let sub = parseInt(counters[index].textContent);

              sub--;

              counters[index].textContent = sub;
              let itemPrice = parseFloat(
                priceElements[index].getAttribute("data-price")
              );
              totalPrice -= itemPrice;
              priceElements[index].textContent = `$${itemPrice * sub}`;

              updateTotalPrice(totalPrice);
            });
          });

         

          function updateTotalPrice(totalPrice) {
            totalPrices.textContent = `Total Price: $${totalPrice}`;
            // console.log("Total Price: $" + totalPrice);
          }
        }

        function saveCartToLocalStorage(cartArray) {
          localStorage.setItem("carts", JSON.stringify(cartArray));
        }

        function addItemToCart(item) {
          carts.push(item);
          saveCartToLocalStorage(carts);
        }

        let dataFromCarts = JSON.parse(localStorage.getItem("carts")) || []; // Load the cart items array from localStorage
        console.log("data", dataFromCarts);

        dataFromCarts.forEach((item) => {
          showCart(item);
        });

        addBtn.forEach((btn, index) => {
          btn.addEventListener("click", function counting() {
            count++;
            counterBtn.innerHTML = count;
            localStorage.setItem("cart", JSON.stringify(count));

            let productData =
              JSON.parse(localStorage.getItem("products")) ?? [];
            // console.log("product DAta", productData[index]);

            let item = productData[index];
            addItemToCart(item);
            showCart(item);
          });
        });
        counterBtn.innerHTML = localStorage.getItem("cart");
      })

      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
}

collections();
