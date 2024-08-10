async function login(username, password, loginType) {
    try {
        const response = await fetch("https://openmarket.weniv.co.kr/accounts/login/", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, login_type: loginType })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            // 401 Unauthorized는 일반적으로 인증 실패를 의미합니다
            if (response.status === 401) {
                throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
            } else {
                throw new Error(data.detail || "로그인 중 오류가 발생했습니다.");
            }
        }
        
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // ... (이전 코드 유지)

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const username = document.getElementById('id').value;
        const password = document.getElementById('pw').value;

        // 입력 검증
        if (!username && !password) {
            showError("아이디를 입력해 주세요.");
            return;
        } else if (!username) {
            showError("아이디를 입력해 주세요.");
            return;
        } else if (!password) {
            showError("비밀번호를 입력해 주세요.");
            return;
        }

        try {
            const result = await login(username, password, currentLoginType);

            if (result.token) {
                localStorage.setItem('token', result.token);
                if (result.user_type) localStorage.setItem('user_type', result.user_type);
                alert("로그인 성공!");
                // 리다이렉트 로직
                // window.location.href = '/dashboard';
            } else {
                showError("로그인에 실패했습니다.");
            }
        } catch (error) {
            console.error("로그인 처리 중 오류 발생:", error);
            showError(error.message);
        }
    });

    function showError(message) {
        errorMessageElement.textContent = message;
    }
});