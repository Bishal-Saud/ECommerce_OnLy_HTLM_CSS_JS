const productContainer = document.querySelector('.productsBox');

async function collections(){

try {
     
   await fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product')
   .then(res =>{
       if(res.ok){
           console.log('response is ok');
       }
       else{
           console.log('something wrong');
       }
       return res.json();
   })
   .then(data =>{

     localStorage.setItem("products", JSON.stringify(data));
     
     let productDatas = JSON.parse(localStorage.getItem("products")) ?? [];

       console.log('data',productDatas);

      const menData =  productDatas.map((item,index) => {
      //  console.log(index);
let dress= {
   name : item.name,
   brand:item.brand,
   price:item.price,
   preview:item.preview,
   size:item.size,
   photos:item.photos

}

// console.log(dress);





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
                  <a  class="btn addBtn" >add to cart</a>
                </div>
              </div>`


               // Save cart
 


return card


      })
    

      productContainer.innerHTML = menData.join('')
      const addBtn = document.querySelectorAll('.addBtn')
      const counterBtn = document.querySelector('.counter')
let count = 0;
      addBtn.forEach((btn)=>{
        btn.addEventListener('click',function counting(){
         count++
         counterBtn.innerHTML =count
         localStorage.setItem('cart',JSON.stringify(count))
        //  window.location.href='./pages/addTOcart.html'
        })
    
      })
counterBtn.innerHTML = localStorage.getItem('cart')

   })


   .catch((err)=>{
       console.log(err);
   })
    
} catch (error) {
    console.log(error);
}
   
}

collections()