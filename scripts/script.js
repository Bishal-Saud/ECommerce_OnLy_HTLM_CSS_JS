const showHam = document.querySelectorAll(".showHam");
const navbar = document.querySelector(".navbar");
const bar = document.querySelector(".fa-bars");
const cross = document.querySelector(".fa-xmark");
const cartBox = document.getElementById("cartBox");
const cartLists = document.querySelector(".cartList");

//Navbar hamburger show and hide 
showHam.forEach((btn)=>{

  btn.addEventListener("click", () => {
    if (bar) {
      bar.classList.toggle("hide");
      navbar.classList.toggle("show");
    cross.classList.toggle("hide");
  }
});
})

// hide Carts when clicked left cross btn
function hideCart(){
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



  

