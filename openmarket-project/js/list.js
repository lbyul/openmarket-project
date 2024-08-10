const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
  
    // Autoplay
    autoplay: {
      delay: 5000, // 3초마다 슬라이드 전환 (밀리초 단위)
      disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 계속
    },
  
    // Pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      bulletActiveClass: 'swiper-pagination-bullet-active',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});



async function mallReqList() {
   try{ const response = await fetch("https://openmarket.weniv.co.kr/products/", {
        method: "GET",
        headers:{
            "Content-Type":"application/json"
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      // 여기서 데이터 구조를 확인하고 필요한 경우 변환
      return Array.isArray(data) ? data : (data.results || data.products || []);
    } catch (error) {
      console.error("상품 리스트를 가져오는 중 오류 발생:", error);
      throw error;
    }
}

function displayProducts(products) {
    const container = document.getElementById('product-list-container');
    container.innerHTML = ''; // 기존 내용을 비웁니다.
    
    const listcontent = document.createElement('section');
    listcontent.className = 'product-content'
    container.appendChild(listcontent);

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.product_name}">
            <div class="product-info">
                <p class="store-name">${product.store_name}</p>
                <p class="product-name">${product.product_name}</ㅔ>
                <p class="product-price"><strong>${product.price.toLocaleString()}</strong>원</p>
            </div>
        `;
        listcontent.appendChild(productElement);
    });
}

async function loadAndDisplayProducts() {
    try {
        const products = await mallReqList();
        displayProducts(products);
    } catch (error) {
        console.error("상품을 불러오는 데 실패했습니다:", error);
        document.getElementById('product-list-container').innerHTML = '상품을 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.';
    }
}

// 페이지 로드 시 상품 목록을 불러옵니다.
loadAndDisplayProducts();