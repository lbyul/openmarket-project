function updateCartStyle() {
    const header = document.getElementById('hodoHeader');
    const cartLink = document.getElementById('cart-link');
    const cartIcon = document.getElementById('cart-icon');
    const cartText = document.getElementById('cart-text');

    if (!header || !cartLink || !cartIcon || !cartText) {
        console.error('Required elements not found');
        return;
    }

    const currentPage = header.getAttribute('data-current-page');
    const isCartPage = currentPage === 'cart.html';

    if (isCartPage) {
        cartIcon.src = '../assets/icon-shopping-cart-2.svg';
        cartText.style.color = '#21BF48';
        cartLink.classList.add('active');
    } else {
        cartIcon.src = '../assets/icon-shopping-cart.svg';
        cartText.style.color = '';
        cartLink.classList.remove('active');
    }
}

function initializeCartBehavior() {
    const cartLink = document.getElementById('cart-link');
    if (!cartLink) {
        console.error('Cart link not found');
        return;
    }

    cartLink.addEventListener('click', function(e) {
        if (!window.location.pathname.endsWith('cart.html')) {
            e.preventDefault();
            window.location.href = 'cart.html';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    updateCartStyle();
    initializeCartBehavior();
});

