// 현재 페이지 정보를 헤더에 설정
const currentPage = window.location.pathname.split('/').pop();
document.getElementById('hodoHeader').setAttribute('data-current-page', currentPage);


const btnMyPage = document.querySelector(".mypage-menu")
const popupOpen = document.querySelector(".mypage-popup");

btnMyPage.addEventListener('mouseover', () => {
    popupOpen.style.display = 'block';
    btnMyPage.style.display = 'inline-flex';
});

btnMyPage.addEventListener('mouseout', () => {
    popupOpen.style.display = 'none';
});