// 요소 선택
const loginForm = document.getElementById('login-form');
const logoutForm = document.getElementById('logout-form');
const loginButton = document.getElementById('login-btn');
const logoutButton = document.getElementById('logout-btn');
const welcomeMessage = document.getElementById('welcome-message');

// 로그인 상태 확인
window.onload = function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    if (loggedInUser) {
        // 로그인 상태면 로그아웃 화면 표시
        showLogoutForm(loggedInUser);
    } else {
        // 로그인 화면 표시
        showLoginForm();
    }
};

// 로그인 버튼 클릭 이벤트
loginButton.addEventListener('click', function () {
    const userId = document.getElementById('id').value;
    const password = document.getElementById('password').value;

    if (userId && userId === password) {
        // 로그인 성공 시 로컬 스토리지에 사용자 정보 저장
        localStorage.setItem('loggedInUser', userId);
        showLogoutForm(userId);
    } else {
        alert('로그인 실패: ID와 비밀번호가 일치하지 않습니다.');
    }
});

// 로그아웃 버튼 클릭 이벤트
logoutButton.addEventListener('click', function () {
    // 로컬 스토리지에서 제거
    localStorage.removeItem('loggedInUser');
    showLoginForm();
});

// 로그인 화면 표시 함수
function showLoginForm() {
    loginForm.style.display = 'block';
    logoutForm.style.display = 'none';
}

// 로그아웃 화면 표시 함수
function showLogoutForm(userId) {
    welcomeMessage.textContent = `${userId}로 로그인 되었습니다.`;
    loginForm.style.display = 'none';
    logoutForm.style.display = 'block';
}
