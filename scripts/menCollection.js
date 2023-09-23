const productContainer = document.querySelector(".productsBox");
const counterBtn = document.querySelector(".counter");
const backCart = document.querySelector(".backCart");

//Fetching data from individual link for generate products
async function collections() {
  try {
    let resp = await fetch(
      "https://5d76bf96515d1a0014085cf9.mockapi.io/product"
    );

    // Some checks data is coming or not
    if (resp.ok) {
      console.log("response is ok");
    } else {
      console.log("something wrong");
    }

    let data = await resp.json();
    // console.log(data, "data");

    //saving data in localStorage on key products
    localStorage.setItem("products", JSON.stringify(data));
    let productDatas = JSON.parse(localStorage.getItem("products")) ?? [];
    const menData = productDatas.map((item, index) => {
      //save data name,brand etc on dress named variable on object
      let dress = {
        name: item.name,
        brand: item.brand,
        price: item.price,
        preview: item.preview,
        size: item.size,
        photos: item.photos,
      };

      // console.log(dress);

      // Generate cards to show product on webpage

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
                  <a class="btn addBtn" data-item-id="${item.id}">add to cart</a>

                </div>
              </div>`;

      // Save cart

      return card;
    });

    productContainer.innerHTML = menData.join("");

    // Add cartLists on Cart button
    const addBtn = document.querySelectorAll(".addBtn");
    const cartList = document.querySelector(".cartList");
    let count = 0;
    let carts = [];

    let totalPrice = 0;

    function showCart(item) {
      let cart = {
        name: item.name,
        brand: item.brand,
        price: item.price,
        preview: item.preview,
        size: item.size,
        photos: item.photos,
        id: item.id,
      };

      let counterData = `countData${cart.id}`;
      let itemList = `
        <div class="item"  data-item-id="${item.id}">
          <i data-deleteItem-id="${item.id}"  class="fa-regular deleteCart fa-circle-xmark"></i>
          <div class="itemDetail">
            <img src="${item.preview}" alt="">
            <div class="leftSide">
              <h2 class="itemName">${item.name}</h2>
              <p class="itemDeliveryDate">Delivery 05 May</p>
            </div>
            <div class="rightSide">
              <div class="iconPlus">
                <span class="inc">+</span>
                <span id="${counterData}" class="counters">1</span>
                <span class="dec">-</span>
              </div>
              <p class="price" data-price="${item.price}">$${item.price}</p>
            </div>
          </div>
        </div>`;

      totalPrice += cart.price;
      cartList.insertAdjacentHTML('beforeend', itemList);

      

      // cart functionality to add sub the money

      const increment = document.querySelectorAll(".inc");
      const counters = document.querySelectorAll(".counters");
      const decrement = document.querySelectorAll(".dec");
      const priceElements = document.querySelectorAll(".price");
      const totalPrices = document.getElementById("totalP");

      

      // Check if the item exists in localStorage, if not, hide it
      if (
        !localStorage.getItem("carts") ||
        localStorage.getItem("carts").indexOf(item.id) === -1
      ) {
        const itemDetail = document.querySelector(
          `[data-item-id="${item.id}"]`
        );
       
        if (itemDetail) {
          itemDetail.style.display = "none";
        }
      }
  

      const deleteItems = document.querySelectorAll(`[data-deleteItem-id="${item.id}"]`);
     // Attach a click event listener to each deleteItem element
  deleteItems.forEach((deleteItem) => {
    deleteItem.addEventListener('click', () => {
      // Retrieve the item to delete based on the unique identifier
      const itemIdToDelete = deleteItem.getAttribute('data-deleteItem-id');
      const itemToDelete = carts.find((item) => item.id === itemIdToDelete);

      // Remove the item from the carts array
      const itemIndex = carts.indexOf(itemToDelete);
      if (itemIndex !== -1) {
        carts.splice(itemIndex, 1);
      }

        
    
        // Update the localStorage with the updated cart items

      // Retrieve the item's detail element based on the unique identifier
      const itemDetailToDelete = document.querySelector(`[data-item-id="${itemIdToDelete}"]`);

      // Remove the item's DOM element
      if (itemDetailToDelete) {
        itemDetailToDelete.remove();
      }

      // Update the total price and save the updated cart
     
      totalPrice -= itemToDelete.price;
      updateTotalPrice(totalPrice);
      saveCartToLocalStorage(carts);
      localStorage.setItem("carts", JSON.stringify(carts));

    });
  });
    
 


      // to increment the price and items
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

      // to decrement the price and items
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

          if (sub < 0) {
            const itemId = addBtn[index].getAttribute("data-item-id");
            console.log(itemId);
            deleteCart(itemId);
          }

          updateTotalPrice(totalPrice);
        });
      });

      function updateTotalPrice(totalPrice) {
        totalPrices.textContent = `Total Price: $${totalPrice}`;
        // console.log("Total Price: $" + totalPrice);
      }
    }


    function deleteCart(itemId) {
      // Get the cart items from localStorage
      let cartItems = JSON.parse(localStorage.getItem("carts")) || [];
    
      // Find the index of the item with the given ID
      const index = cartItems.findIndex((item) => item.id === itemId);
      
    
      if (index !== -1 || 1 ) {
        // Remove the item at the found index
        cartItems.splice(index, 1);
    
        // Update the localStorage with the updated cart items
        localStorage.setItem("carts", JSON.stringify(cartItems));
    
        // Remove the item from the cart displayed on the webpage
        const itemDetail = document.querySelector(`[data-item-id="${itemId}"]`);
        if (itemDetail ) {
          itemDetail.remove();
        }
      }
    }
    

    function saveCartToLocalStorage(cartArray) {
      localStorage.setItem("carts", JSON.stringify(cartArray));
    }

    // take Array of item and push it on Carts and save on localStorage
    function addItemToCart(item) {
      carts.push(item);
      saveCartToLocalStorage(carts);
    }

    // it get item from localStorage to pass it on showCart array because to show data on web when loaded
    let dataFromCarts = localStorage.getItem("carts");
    if (dataFromCarts !== null || undefined) {
      dataFromCarts = JSON.parse(dataFromCarts);
    } else {
      dataFromCarts = [];
    }

    console.log("data", dataFromCarts);

    dataFromCarts.forEach((item) => {
      showCart(item);
    });

    //it is for create countCart and also pass data from LocalStorage when add cart clicked from web products section.

    addBtn.forEach((btn, index) => {
      btn.addEventListener("click", function counting() {
        count++;
        counterBtn.innerHTML = count;
        localStorage.setItem("cart", JSON.stringify(count));

        let productData = JSON.parse(localStorage.getItem("products")) ?? [];
        // console.log("product DAta", productData[index]);

        let item = productData[index];

        addItemToCart(item);
        showCart(item);
      });
    });
    counterBtn.innerHTML = JSON.parse(localStorage.getItem("carts")).length

  } catch (error) {
    console.log(error);
  }
}

collections();
