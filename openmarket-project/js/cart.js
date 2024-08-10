// function loadComponent(containerId, url, callback) {
//     fetch(url)
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById(containerId).innerHTML = data;
//             if (callback) callback();
//         })
//         .catch(error => console.error('Error loading component:', error));
// }

// 헤더 로드
loadComponent('header-container', 'header.html', function() {
    // 헤더 로드 후 스타일 적용
    const cartIcon = document.getElementById('cart-icon');
    const cartText = document.getElementById('cart-text');
    const cartLink = document.getElementById('cart-link');
    
    if (cartIcon && cartText && cartLink) {
        cartIcon.src = './assets/icon-shopping-cart-2.svg';
        cartText.style.color = '#21BF48';
        cartLink.classList.add('active');
    }
});