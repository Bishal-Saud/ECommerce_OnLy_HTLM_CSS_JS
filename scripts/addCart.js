let container = document.querySelector('.productContainer')

let productDatas = JSON.parse(localStorage.getItem("products")) ?? [];



function details() {
    const menData = productDatas.map((item, index) => {
      let dress = {
        name: item.name,
        brand: item.brand,
        price: item.price,
        preview: item.preview,
        size: item.size,
        photos: item.photos,
        description: item.description,
      };
  
      // Generate unique IDs for each set of preview and thumbnail images
      const previewId = `previewImg_${index}`;
      const photosId = `photos_${index}`;
  
      let boxDetails = `
        <div class="container card">
          <div class="card_left">
            <a href="#"><i class="fa fa-long-arrow-left left" aria-hidden="true"></i></a>
            <a href="#"><i class="fa fa-long-arrow-right right" aria-hidden="true"></i></a>
            <img id="${previewId}" class='previewImg' src="${dress.preview}">
          </div>
          <div class="card_right">
            <span>${dress.brand}</span>
            <h3>${dress.name}</h3>
            <p>${dress.description} </p>
            <div class="colours">
              <div class="colour orange active"></div>
              <div class="colour green"></div>
              <div class="colour gray"></div>
            </div>
            <div class="card_footer">
              <span class="price">$${dress.price}</span>
              <a href="#" class="btn">
                buy now
              </a>
            </div>
            <div class='otherImages' id="${photosId}"> 
              <img class='photos'  src="${dress.photos[0]}">
              <img class='photos' src="${dress.photos[1]}">
              <img class='photos' src="${dress.photos[2]}">
              
            </div>
          </div>
        </div>
      `;
  
      return { boxDetails, previewId, photosId };
    });
  
    container.innerHTML = menData.map((data) => data.boxDetails).join('');
  
    // Add click event listener to each set of thumbnail photos
    menData.forEach((data) => {
      const previewImg = document.getElementById(data.previewId);
      const photos = document.querySelectorAll(`#${data.photosId} .photos`);
  
      photos.forEach((photo) => {
        photo.addEventListener('click', () => {
          // Set the clicked photo's src as the preview image src
          previewImg.src = photo.src;
        });
      });
    });
  }
  
  details();
  