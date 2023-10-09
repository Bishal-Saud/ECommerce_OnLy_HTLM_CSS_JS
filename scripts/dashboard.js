const cross = document.querySelector('.fa-xmark');
const menu = document.querySelector('.fa-bars');
const menuDashboard = document.querySelector('.admin_dashboard_leftbox');
const scaleIn = document.querySelector('.scale-in-left');
const addProduct = document.querySelector('#admin_addProducts') 
const addProduct_cross = document.querySelector('#addProduct_cross')

function toggleMenu() {
  if (cross.style.display === 'none') {
    // Cross is hidden, show it and hide the menu
    cross.style.display = 'block';
    menuDashboard.style.display ='flex'
    menu.style.display = 'none';
  } else {
    // Cross is visible, hide it and show the menu
    cross.style.display = 'none';
    menuDashboard.style.display ='none'
    menu.style.display = 'block';
 

  }
}

menu.addEventListener('click', toggleMenu);
cross.addEventListener('click', toggleMenu);

// when admin click the add button than show the popup and when admin fill the details then collect that details and store it on localStorage and show the products on new page or product container.



function addProducts_admin() {
  let popupSection = document.querySelector('.popupIt');

  // Toggle the visibility of the popupSection
  if (popupSection.style.display === 'none' || popupSection.style.display === '') {
    popupSection.style.display = 'flex';
  } else {
    popupSection.style.display = 'none';
  }
}

// Add a click event listener to the "Add" button
if (addProduct) {
  addProduct.addEventListener('click', addProducts_admin);
  addProduct_cross.addEventListener('click',addProducts_admin);
  
} else {
  console.error("Element with ID 'addProductButtonId' not found.");
}
