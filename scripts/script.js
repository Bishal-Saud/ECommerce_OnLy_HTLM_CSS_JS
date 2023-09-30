const showHam = document.querySelectorAll(".showHam");
const navbar = document.querySelector(".navbar");
const bar = document.querySelector(".fa-bars");
const cross = document.querySelector(".fa-xmark");
const cartBox = document.getElementById("cartBox");
const cartLists = document.querySelector(".cartList");
const products = document.getElementById("products");
const productLinks = document.querySelector('.product-links')
let isDisplayFlex = false;

function showLinks() {
  productLinks.style.display = "flex";
  isDisplayFlex = true;
}

function hideLinks() {
// Check if the mouse is still over the products or productLinks
const isMouseOverProducts = products.contains(event.relatedTarget);
const isMouseOverLinks = productLinks.contains(event.relatedTarget);

if (!isMouseOverProducts && !isMouseOverLinks) {
  productLinks.style.display = "none";
  isDisplayFlex = false;
}
}

products.addEventListener("mouseover", showLinks);
products.addEventListener("mouseout", hideLinks);

productLinks.addEventListener("mouseover", () => {
  // Prevent hiding when the mouse is over productLinks
  isDisplayFlex = true;
});

productLinks.addEventListener("mouseout", () => {
  // Continue checking if the mouse should be over products or productLinks
  hideLinks();
});


//Navbar hamburger show and hide
showHam.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (bar) {
      bar.classList.toggle("hide");
      navbar.classList.toggle("show");
      cross.classList.toggle("hide");
    }
  });
});

// hide Carts when clicked left cross btn
function hideCart() {
  cartLists.style.display = "none"; // Hide cartList
}

let isCartListVisible = false;

cartBox.addEventListener("click", () => {
  if (isCartListVisible) {
    cartLists.style.display = "none"; // Hide cartList
  } else {
    cartLists.style.display = "block"; // Show cartList
  }

  // Toggle the state
  isCartListVisible = !isCartListVisible;
});

// Function to hide the cartList
