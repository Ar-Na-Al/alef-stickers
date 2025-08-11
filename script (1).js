fetch('products.json')
  .then(response => response.json())
  .then(products => {
    const container = document.getElementById('products-container');
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="clickable-image">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <span class="price">${product.price}</span>
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