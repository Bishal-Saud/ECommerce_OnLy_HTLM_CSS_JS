const productContainer = document.querySelector('.productsBox');
const navbar = document.querySelector('.navbar')
navbar.style.position ='relative'
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
       console.log('data',data);
      const menData =  data.map((item) => {
       // console.log(item);
let dress= {
   name : item.name,
   brand:item.brand,
   price:item.price,
   preview:item.preview,
   size:item.size,
   photos:item.photos

}

let card = `
<div class="card">
                <figure>
                  <img src="${dress.preview}" alt="t-shirt">
                </figure>
                <section class="details">
                  <div class="min-details">
                    <h1>brand name<span>${dress.brand}</span></h1>
                    <h1 class="price">$${dress.price}</h1>
                  </div>
              
                  <div class="options">
                    <div class="options-size">
                      <h1>sizes</h1>
                      <ul>
                        <li>${dress.size[0]}-s</li>
                        <li>${dress.size[1]}-s</li>
                        <li>${dress.size[2]}-m</li>
                        <li>${dress.size[3]}-l</li>
                        <li>${dress.size[4]}-xl</li>
                      </ul>
                    </div>
              
                    <div class="options-colors">
                      <h1>colors</h1>
                      <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>

                    
                  </div>
                  <a href="#" class="btn">add to cart</a>
                </section>
              </div>`

return card


      })

      productContainer.innerHTML = menData.join('')
   })
   .catch((err)=>{
       console.log(err);
   })
    
} catch (error) {
    console.log(error);
}
   
}

collections()