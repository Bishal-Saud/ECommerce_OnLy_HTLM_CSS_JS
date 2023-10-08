const signInPopUp = document.querySelector('.signIn')
const signIn = document.querySelector('.signIn_popUp')
const isAdmin = document.querySelector('.isAdmin')
const submitSignIn = document.getElementById('signIn_submit_btn')
let isSignInVisible = false;
// Todo I have to do there sign in follow like if user input admin admin than he available to create products

function showHideSignIn(){
    if (isSignInVisible) {
      signIn.style.display= 'none';
      
    } else {

      signIn.style.display= 'block';
       
    }
  
    // Toggle the state
    isSignInVisible = !isSignInVisible;
  }
signInPopUp.addEventListener('click',showHideSignIn)

// userId password admin


function validateUser(event){
  event.preventDefault()
  const username =  document.getElementById('username').value
const userPassword = document.getElementById('password').value
console.log('isusername',username);
console.log('ispassword',userPassword);

if(username === 'admin' && userPassword === 'admin123'){
  window.location.href='../pages/dashboardAdmin.html'
} else if(!username || !userPassword){
  isAdmin.style.margin ="2rem"
  isAdmin.textContent ='All field Required'

}
 else{

  isAdmin.style.margin ="2rem"
  isAdmin.textContent ='Username or Password was Wrong !!'
  console.log('fok u user');
}
}
submitSignIn.addEventListener('click',validateUser)
// validateUser()