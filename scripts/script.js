const showHam = document.querySelector(".showHam");
const navbar = document.querySelector(".navbar");
const bar = document.querySelector(".fa-bars");
const cross = document.querySelector(".fa-xmark");


showHam.addEventListener("click", () => {
    
    if(bar){
        bar.classList.toggle("hide");
        navbar.classList.toggle("show");
        cross.classList.toggle("hide");
    }
   
    

  

});
