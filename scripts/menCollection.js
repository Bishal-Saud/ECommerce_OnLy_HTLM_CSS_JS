const productContainer = document.querySelector(".productsBox");
const counterBtn = document.querySelector(".counter");
const backCart = document.querySelector(".backCart");
const shoesContainer = document.getElementById("shoesContainer");
const filterItem1 = document.getElementById("product-filter_sec-items-1");
const filterItem2 = document.getElementById("product-filter_sec-items-2");
const filterItem3 = document.getElementById("product-filter_sec-items-3");
const filterItem4 = document.getElementById("product-filter_sec-items-4");
const tShirtContainer = document.getElementById("tShirtContainer");
const menClothes = document.getElementById("tShirt");
const pantContainer = document.getElementById("pantContainer");
let apiUrl = "https://5d76bf96515d1a0014085cf9.mockapi.io/product";
const cartList = document.querySelector(".cartList");

//Fetching data from individual link for generate products
async function collections() {
  try {
    let resp = await fetch(apiUrl);

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
  
    if (productContainer.innerHTML === null || undefined || " ") {
      productContainer.innerHTML = menData.join("");
    }
    



  } catch (error) {
    console.log(error.message);
  }
 
}
 collections()
document.addEventListener('DOMContentLoaded', () => {
  // Query for all elements with class "addBtn" once
  const addBtns = document.querySelectorAll(".addBtn");
  let count = 0;

  // Attach a single click event listener to the document body
  document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('addBtn')) {
      // console.log('isClicking');

      // Access the clicked button directly using event.target
      const clickedBtn = event.target;

      // Retrieve the data-item-id attribute from the clicked button
      const itemId = clickedBtn.getAttribute('data-item-id');

      // Increase the count
      count++;
      counterBtn.innerHTML = count;

      // Update the cart in localStorage (if needed)
      localStorage.setItem("cart", JSON.stringify(count));

      const productData = JSON.parse(localStorage.getItem("products")) ?? [];

      // Find the item in the productData based on the itemId
      const item = productData.find((product) => product.id === itemId);
     
      

      if(item == undefined || null){
        // console.log('isItem Undefined or null');
      const productData = JSON.parse(localStorage.getItem("products")) ?? [];
      console.log('pdd',productData);
      const itemw = productData.find((product) => console.log(product));
 
// console.log('isItemData',productData);
      } else{

        // Handle the item, e.g., add it to the cart
        addItemToCart(item);
        showCart(item);
      }
    }
  });
});




function search() {
  const searchTerm = document
    .getElementById("product_search")
    .value.toLowerCase();

    if(!searchTerm){
     productContainer.innerHTML = 'Empty'
    }

  let data = JSON.parse(localStorage.getItem("products")) ?? [];
  if (!data) {
    console.log("empty data");
  }

  // Filter the JSON data based on the search term
  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm) ||
      item.brand.toLowerCase().includes(searchTerm)
    );
  });

  productContainer.innerHTML = " ";
  shoesContainer.innerHTML = " ";
  tShirtContainer.innerHTML = " ";
  pantContainer.innerHTML = " ";

  if (filteredData.length === 0) {
    shoesContainer.innerHTML = "No results found.";
  } else {
    filteredData.forEach((item) => {
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

      shoesContainer.innerHTML += card;
    });
  }
}

// Call the search function when the user types in the search input
document.getElementById("product_search").addEventListener("input", search);

// // Add cartLists on Cart button
// const addBtn = document.querySelectorAll(".addBtn");
// const cartList = document.querySelector(".cartList");

let carts = [];
let totalPrice = 0;

function showCart(item) {
  console.log('iin',item);
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
  cartList.insertAdjacentHTML("beforeend", itemList);
  // cartList.innerHTML += itemList

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
    const itemDetail = document.querySelector(`[data-item-id="${item.id}"]`);

    if (itemDetail) {
      itemDetail.style.display = "none";
    }
  }

  const deleteItems = document.querySelectorAll(
    `[data-deleteItem-id="${item.id}"]`
  );
  // Attach a click event listener to each deleteItem element
  deleteItems.forEach((deleteItem) => {
    deleteItem.addEventListener("click", () => {
      // Retrieve the item to delete based on the unique identifier
      const itemIdToDelete = deleteItem.getAttribute("data-deleteItem-id");
      const itemToDelete = carts.find((item) => item.id === itemIdToDelete);

      // Remove the item from the carts array
      const itemIndex = carts.indexOf(itemToDelete);
      if (itemIndex !== -1) {
        carts.splice(itemIndex, 1);
      }

      // Update the localStorage with the updated cart items

      // Retrieve the item's detail element based on the unique identifier
      const itemDetailToDelete = document.querySelector(
        `[data-item-id="${itemIdToDelete}"]`
      );

      // Remove the item's DOM element
      if (itemDetailToDelete) {
        itemDetailToDelete.remove();
      }

      // Update the total price and save the updated cart
      localStorage.setItem("carts", JSON.stringify(carts));

      totalPrice -= itemToDelete.price;
      updateTotalPrice(totalPrice);
      saveCartToLocalStorage(carts);

    });
  });

  // to increment the price and items
  increment.forEach((btn, index) => {
    counters[index].innerHTML = "0";

    let add = parseInt(counters[index].textContent);
    btn.addEventListener("click", () => {
      add++;

      if (add) {
        counters[index].textContent = add;
      }

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
    let sub = parseInt(counters[index].textContent);

    btn.addEventListener("click", () => {
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

  if (index !== -1 || 1) {
    // Remove the item at the found index
    cartItems.splice(index, 1);

    // Update the localStorage with the updated cart items
    localStorage.setItem("carts", JSON.stringify(cartItems));

    // Remove the item from the cart displayed on the webpage
    const itemDetail = document.querySelector(`[data-item-id="${itemId}"]`);
    if (itemDetail) {
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
if(dataFromCarts == null || undefined){
  console.log('null data');
}else{

  
  dataFromCarts.forEach((item) => {
    if(!item){
      console.log('no item ');
    } else{

      showCart(item);
    }
  });
  
}



collections();

counterBtn.innerHTML = JSON.parse(localStorage.getItem("carts")).length;

const allShoes = [
  {
    id: 1,
    name: "Wild Rider Layers Unisex Sneakers",
    price: "$121",
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/380697/02/sv01/fnd/IND/fmt/png/,Wild-Rider-Layers-Unisex-Sneakers",
    description:
      "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.",
  },
  {
    id: 2,
    name: "Wild Rider Layers 2 Unisex Sneakers",
    price: "$151",
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/380697/03/sv01/fnd/IND/fmt/png/Wild-Rider-Layers-Unisex-Sneakers",
    description:
      "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.",
  },
  {
    id: 3,
    name: "Wild Rider Layers Unisex3 sneakers",
    price: "$161",
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/380697/01/sv01/fnd/IND/fmt/png/Wild-Rider-Layers-Unisex-Sneakers",
    description:
      "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.",
  },
  {
    id: 4,
    name: "PUMA Serve Pro Lite Unisex shoes",
    price: "$261",
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374902/01/sv01/fnd/IND/fmt/png/PUMA-Serve-Pro-Lite-Unisex-Shoes",
    description:
      "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.",
  },
  {
    id: 5,
    name: "PUMA Serve Pro Lite Unisex",
    price: "$321",
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374902/11/sv01/fnd/IND/fmt/png/PUMA-Serve-Pro-Lite-Unisex-Shoes",
    description:
      "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.",
  },
  {
    id: 6,
    name: "one8 Virat Kohli Basket Classice Unisex Sneakers",
    price: "$371",
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/375314/01/sv01/fnd/IND/fmt/png/one8-Virat-Kohli-Basket-Classic-Unisex-Sneakers",
    description:
      "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.",
  },
  {
    id: 7,
    name: "Caracal SoftFoam+Sneakers",
    price: "$171",
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/369863/18/sv01/fnd/IND/fmt/png/Caracal-SoftFoam+-Sneakers",
    description:
      "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.",
  },
  {
    id: 8,
    name: "Mirage Mox Brightly Packed Shoes",
    price: "$271",
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/375168/01/sv01/fnd/IND/fmt/png/Mirage-Mox-Brightly-Packed-Shoes",
    description:
      "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.",
  },
  {
    id: 9,
    name: "Future Rider Play On Unisex Sneakers",
    price: "$571",
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/371149/69/sv01/fnd/IND/fmt/png/Future-Rider-Play-On-Unisex-Sneakers",
    description:
      "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.",
  },
  {
    id: 10,
    name: "Future Rider2 Play On Unisex Sneakers",
    price: "$571",
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/371149/68/sv01/fnd/IND/fmt/png/Future-Rider-Play-On-Unisex-Sneakers",
    description:
      "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.",
  },
  {
    id: 11,
    name: "Future Rider3 Play On Unisex Sneakers",
    price: "$571",
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/371149/72/sv01/fnd/IND/fmt/png/Future-Rider-Play-On-Unisex-Sneakers",
    description:
      "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.",
  },
  {
    id: 12,
    name: "Rebound Lay-Up Lo SoftFoam+Mesh Shoes",
    price: "$571",
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/370914/01/sv01/fnd/IND/fmt/png/Rebound-Lay-Up-Lo-SoftFoam+-Mesh-Shoes",
    description:
      "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.",
  },
];

// here we are showing shoes on web page
function setShoesData() {
  

   localStorage.setItem("products", JSON.stringify(allShoes));
  let allData = allShoes.map((data) => {
    let card = `
        <div class="card">
        <figure>
        <img src="${data.image}" alt="t-shirt">
                          </figure>
                        <div class="details">
                          <div class="min-details">
                          <h1>${data.name}<span>${data.description}</span></h1>
                            <h1 class="price">${data.price}</h1>
                            </div>
                  
                            </div>
                            <a class="btn addBtn" data-item-id="${data.id}">add to cart</a>
                            
                            </div>
                            </div>`;

    productContainer.innerHTML = " ";
    pantContainer.innerHTML = " ";
    tShirtContainer.innerHTML = " ";
    shoesContainer.innerHTML += card;
  });
}

// here we are showing t shirts on web page

async function setTshirt(event) {
  // event.preventDefault();
  let resp = await fetch("https://fakestoreapi.com/products");
  let resData = await resp.json();

  let categoryData = resData.map((item) => {
    localStorage.setItem("products", JSON.stringify(item));

    if (item.category === "men's clothing") {
      //  console.log(item);

      let card = `
        <div class="card">
        <figure>
        <img src="${item.image}" alt="t-shirt">
                          </figure>
                        <div class="details">
                          <div class="min-details">
                          <h1>${item.title}<span>${item.description.slice(
        0,
        100
      )}</span></h1>
                            <h1 class="price">${item.price}</h1>
                            </div>
                  
                            </div>
                            <a class="btn addBtn" data-item-id="${
                              item.id
                            }">add to cart</a>
                            
                            </div>
                            </div>`;
      productContainer.innerHTML = " ";
      shoesContainer.innerHTML = " ";
      pantContainer.innerHTML = " ";

      tShirtContainer.innerHTML += card;
    }
  });
}

const allPant = [
  {
    id: 1,
    name: "Wild Unisex pant",
    price: "$121",
    image:
      "https://np-live-21.slatic.net/kf/Scae1ec23b06043ee91b68eabace8cd3aV.jpg_300x0q75.webp",
    description:
      "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life.",
  },
  {
    id: 2,
    name: "Wild Unisex pant 2",
    price: "$151",
    image:
      "https://static-01.daraz.com.np/p/15b36256c8a2041a75f504fb70c7a486.jpg_300x0q75.webp",
    description:
      "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life.",
  },
  {
    id: 3,
    name: "Wild Unisex pant 3",
    price: "$161",
    image:
      "https://static-01.daraz.com.np/p/24b4d3b853f7c3cecd44e5640d1bb96c.jpg_300x0q75.webp",
    description:
      "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life.",
  },
  {
    id: 4,
    name: "Wild Unisex pant 4",
    price: "$261",
    image:
      "https://static-01.daraz.com.np/p/102c1670da9fcd306941ce2f32ee116a.jpg_300x0q75.webp",
    description:
      "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life.",
  },
];

function setPantData(event) {
  // event.preventDefault();

  let allData = allPant.map((data) => {
    localStorage.setItem("products", JSON.stringify(data));

    productContainer.innerHTML = " ";
    shoesContainer.innerHTML = " ";
    tShirtContainer.innerHTML = " ";

    let card = `
            <div class="card">
            <figure>
            <img src="${data.image}" alt="t-shirt">
                              </figure>
                            <div class="details">
                              <div class="min-details">
                              <h1>${data.name}<span>${data.description}</span></h1>
                                <h1 class="price">${data.price}</h1>
                                </div>
                      
                                </div>
                                <a class="btn addBtn" data-item-id="${data.id}">add to cart</a>
                                
                                </div>
                                </div>`;

    pantContainer.innerHTML += card;
  });
}

function filteringItems(event) {
  const selectedValue = event.target.value;
  if (selectedValue === "shoes") {
    setShoesData();
  } else if (selectedValue === "T-shirt") {
    setTshirt();
  } else if (selectedValue === "pant") {
    setPantData();
  } else if (selectedValue === "universe") {
    collections();
    setShoesData();
    setPantData();
    setTshirt();
  } else if (selectedValue === "Nike") {
    setShoesData();
  } else if (selectedValue === "toto") {
    productContainer.innerHTML = "Not available Now";
  } else if (selectedValue === "Men") {
    setPantData();
    setShoesData();
  } else if (selectedValue === "women") {
    productContainer.innerHTML = "Not available Now";
  } else if (selectedValue === "forall") {
    collections();
    setShoesData();
    setPantData();
    setTshirt();
  } else if (selectedValue === "lower") {
    productContainer.innerHTML = "Not available Now";
  } else if (selectedValue === "higher") {
    productContainer.innerHTML = "Not available Now";
  } else {
    collections();
  }
}

filterItem1.addEventListener("change", filteringItems);
filterItem2.addEventListener("change", filteringItems);
filterItem3.addEventListener("change", filteringItems);
filterItem4.addEventListener("change", filteringItems);
