const cross = document.querySelector('.fa-xmark');
const menu = document.querySelector('.fa-bars');
const menuDashboard = document.querySelector('.admin_dashboard_leftbox');
const scaleIn = document.querySelector('.scale-in-left');

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

