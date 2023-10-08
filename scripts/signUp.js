const signUp = document.querySelector('.signUp_popUp')
const signUpPopUp = document.querySelector('.signUp')
const submitSignUp = document.getElementById('signUp_submit_btn')
let isSignUpVisible = false;
function showHideSignUp(){
    if (isSignUpVisible) {
      signUp.style.display= 'none';
    } else {
      signUp.style.display= 'block';
       // Show cartList
    }
    // Toggle the state
    isSignUpVisible = !isSignUpVisible;
  }


signUpPopUp.addEventListener('click',showHideSignUp)
