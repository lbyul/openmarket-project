const BUYER_PAGE_URL = 'list.html';  // 구매회원 대시보드 페이지 URL
const SELLER_PAGE_URL = '';  // 판매회원 대시보드 페이지 URL

async function login(username, password, loginType) {
    try {
        const response = await fetch("https://openmarket.weniv.co.kr/accounts/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, login_type: loginType })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(response.status === 401 
                ? "아이디 또는 비밀번호가 일치하지 않습니다." 
                : (data.detail || "로그인 중 오류가 발생했습니다."));
        }
        
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginBox = document.querySelector('.login-box');
    const loginForm = document.querySelector('.login-form');
    const errorMessageElement = document.getElementById('errorMessage');
    let currentLoginType = 'BUYER';

    function setActiveButton(activeButton, inactiveButton) {
        [activeButton, inactiveButton].forEach(button => {
            button.style.backgroundColor = button === activeButton ? '#fff' : '#F2F2F2';
            button.style.zIndex = button === activeButton ? '10' : '1';
        });

        loginBox.classList.toggle('sales-active', activeButton.classList.contains('sales-member'));
        currentLoginType = activeButton.classList.contains('sales-member') ? 'SELLER' : 'BUYER';
    }

    document.querySelector('.purchasing-member').addEventListener('click', e => {
        e.preventDefault();
        setActiveButton(e.currentTarget, document.querySelector('.sales-member'));
    });

    document.querySelector('.sales-member').addEventListener('click', e => {
        e.preventDefault();
        setActiveButton(e.currentTarget, document.querySelector('.purchasing-member'));
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('id').value.trim();
        const password = document.getElementById('pw').value;

        if (!username || !password) {
            showError(`${!username ? '아이디' : '비밀번호'}를 입력해 주세요.`);
            return;
        }

        try {
            const result = await login(username, password, currentLoginType);
            if (result.token) {
                localStorage.setItem('token', result.token);
                if (result.user_type) {
                    localStorage.setItem('user_type', result.user_type);
                    // 사용자 유형에 따라 다른 페이지로 리다이렉트
                    if (result.user_type === 'BUYER') {
                        window.location.href = BUYER_PAGE_URL;
                    } else if (result.user_type === 'SELLER') {
                        window.location.href = SELLER_PAGE_URL;
                    } else {
                        console.error("알 수 없는 사용자 유형:", result.user_type);
                        showError("로그인 처리 중 오류가 발생했습니다.");
                    }
                } else {
                    // user_type이 없는 경우 currentLoginType에 따라 리다이렉트
                    window.location.href = currentLoginType === 'BUYER' ? BUYER_PAGE_URL : SELLER_PAGE_URL;
                }
            } else {
                showError("로그인에 실패했습니다.");
            }
        } catch (error) {
            showError(error.message);
        }
    });

    function showError(message) {
        errorMessageElement.textContent = message;
    }

    // 초기 상태 설정
    setActiveButton(document.querySelector('.purchasing-member'), document.querySelector('.sales-member'));
});