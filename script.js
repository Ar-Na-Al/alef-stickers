// عند تحميل الصفحة، قم بجلب بيانات المنتجات من ملف JSON خارجي
document.addEventListener('DOMContentLoaded', () => {
  // جلب ملف المنتجات products.json
  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      // الحصول على عنصر الحاوية في الـ HTML
      const container = document.getElementById('products-container');

      // عرض كل منتج في مصفوفة المنتجات
      products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        // حساب السعر المعروض: إذا كان هناك تخفيض يظهر السعر الأصلي مشطوب والسعر بعد التخفيض باللون الأحمر
        let priceHtml = '';
        if ('price_after_discount' in product && product.price_after_discount) {
          priceHtml = `
            <span class="price">
              <del style="color:#b0b0b0;">${product.original_price} ريال</del>
              <span style="color:#c0392b;font-weight:bold;"> ${product.price_after_discount} ريال</span>
            </span>
          `;
        } else {
          priceHtml = `<span class="price">${product.price} ريال</span>`;
        }

        // بناء كود المنتج وإضافته للحاوية
        productDiv.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="clickable-image" style="max-width:140px;max-height:140px;cursor:pointer;">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          ${priceHtml}
          <br>
          <a class="whatsapp-button"
             href="https://api.whatsapp.com/send?phone=966557548596&text=مرحبًا، أرغب في شراء: ${encodeURIComponent(product.name)}"
             target="_blank" rel="noopener noreferrer"
             style="display:inline-block;margin-top:8px;padding:6px 14px;background:#25D366;color:white;font-weight:bold;border-radius:5px;text-decoration:none;">
            اطلب عبر واتساب
          </a>
        `;

        container.appendChild(productDiv);
      });

      // إعداد نافذة الصورة المنبثقة (modal)
      const modal = document.getElementById('image-modal');
      const modalImg = document.getElementById('modal-image');
      const closeBtn = document.querySelector('.modal .close');

      document.querySelectorAll('.clickable-image').forEach(img => {
        img.addEventListener('click', () => {
          modal.style.display = "block";
          modalImg.src = img.src;
          modalImg.alt = img.alt;
        });
      });

      closeBtn.onclick = () => {
        modal.style.display = "none";
        modalImg.src = "";
      };

      window.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.style.display = "none";
          modalImg.src = "";
        }
      });
    })
    .catch(error => {
      console.error('حدث خطأ أثناء جلب المنتجات:', error);
    });
});
