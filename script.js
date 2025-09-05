products.forEach(product => {
  const productDiv = document.createElement('div');
  productDiv.className = 'product';

  // حساب السعر والعرض المناسب
  let priceHtml = '';
  if ('price_after_discount' in product) {
    priceHtml = `<span class="price"><del style="color:#b0b0b0;">${product.original_price} ريال</del> <span style="color:#c0392b;">${product.price_after_discount} ريال</span> <span style="font-size:12px;color:#388e3c;">خصم ${product.discount_percent}%</span></span>`;
  } else {
    priceHtml = `<span class="price">${product.price} ريال</span>`;
  }

  productDiv.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="clickable-image">
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    ${priceHtml}
    <br>
    <a class="whatsapp-button" href="https://api.whatsapp.com/send?phone=966557548596&text=مرحبًا، أرغب في شراء: ${product.name}" target="_blank" rel="noopener noreferrer">
      اطلب عبر واتساب
    </a>
  `;

  container.appendChild(productDiv);
});
    
    // المربع المنبثق
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.modal .close');
    
    document.querySelectorAll('.clickable-image').forEach(img => {
      img.addEventListener('click', () => {
        modal.style.display = "block";
        modalImg.src = img.src;
      });
    });
    
    closeBtn.onclick = () => {
      modal.style.display = "none";
    };
    
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  });
