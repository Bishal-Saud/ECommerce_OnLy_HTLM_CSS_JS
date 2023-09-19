const showHam = document.querySelector(".showHam");
const navbar = document.querySelector(".navbar");
const bar = document.querySelector(".fa-bars");
const cross = document.querySelector(".fa-xmark");
const cartBox = document.getElementById("cartBox");
const cartList = document.querySelector(".cartList");
const cartListBack = document.getElementById('cartListBack')
showHam.addEventListener("click", () => {
  if (bar) {
    bar.classList.toggle("hide");
    navbar.classList.toggle("show");
    cross.classList.toggle("hide");
  }
});


cartListBack.addEventListener('click',()=>{
        cartList.style.display = 'none'; // Hide cartList

})

let isCartListVisible = false

cartBox.addEventListener("click", () => {
    if (isCartListVisible) {
        cartList.style.display = 'none'; // Hide cartList
    } else {
        cartList.style.display = 'block'; // Show cartList
    }
    
    // Toggle the state
    isCartListVisible = !isCartListVisible;

})