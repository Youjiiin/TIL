"use strict";

let userInfo = document.getElementById('user');
let signUp = document.getElementById('signup');

// 결과 출력 함수
function printUserInfo(msg) {
    userInfo.innerHTML = msg;
}

// 회원가입 함수 (submit)
signUp.addEventListener('submit', (e) => {
    e.preventDefault();

    // 입력 값 가져오기
    let userName = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let job = document.getElementById('job').value;

    let user = `
        <p>이름 : ${userName}</p>
        <p>전화번호 : ${phone}</p>
        <p>직업 : ${job}</p>
    `;

    printUserInfo(user);
});
