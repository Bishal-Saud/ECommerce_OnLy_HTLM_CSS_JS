const showHam = document.querySelector(".showHam");
const navbar = document.querySelector(".navbar");
const bar = document.querySelector(".fa-bars");
const cross = document.querySelector(".fa-xmark");
const cartBox = document.getElementById("cartBox");
const cartLists = document.querySelector(".cartList");

showHam.addEventListener("click", () => {
  if (bar) {
    bar.classList.toggle("hide");
    navbar.classList.toggle("show");
    cross.classList.toggle("hide");
  }
});



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
