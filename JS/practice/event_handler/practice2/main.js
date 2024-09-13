"use strict";

let error_id = document.getElementById('error_id');
let error_pwd = document.getElementById('error_pwd');
let signIn = document.getElementById('signin');
let success = document.getElementById('success');

// 결과 출력 함수
function printUserInfo(error, msg) {
    error.innerHTML = msg;
}

// 정규식
const regExpPassword = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,16}$/;

// 아이디 검증
document.getElementById('id').addEventListener('blur', () => {
    let id = document.getElementById('id').value;

    if (id === "") { 
        printUserInfo(error_id, `<p style="color: red">아이디는 필수 입력입니다.</p>`);
    } else {
        printUserInfo(error_id, "");
    }
});

// 비밀번호
document.getElementById('pwd').addEventListener('blur', () => {
    let pwd = document.getElementById('pwd').value;

    if (pwd === "") {
        printUserInfo(error_pwd, `<p style="color: red">비밀번호는 필수 입력입니다.</p>`);
    } else if (!regExpPassword.test(pwd)) {
        printUserInfo(error_pwd, `<p style="color: red">비밀번호는 영문자 숫자 조합 6자 이상이어야 합니다.</p>`);
    } else {
        printUserInfo(error_pwd, "");
    }
});

// 로그인
signIn.addEventListener('submit', (e) => {
    e.preventDefault();

    let id = document.getElementById('id').value;
    let pwd = document.getElementById('pwd').value;
    let isValid = true;

    // 아이디 검증
    if (id === "") {
        printUserInfo(error_id, `<p style="color: red">아이디는 필수 입력입니다.</p>`);
        isValid = false;
    }

    // 비밀번호 검증
    if (pwd === "") {
        printUserInfo(error_pwd, `<p style="color: red">비밀번호는 필수 입력입니다.</p>`);
        isValid = false;
    } else if (!regExpPassword.test(pwd)) {
        printUserInfo(error_pwd, `<p style="color: red">비밀번호는 영문자 숫자 조합 6자 이상이어야 합니다.</p>`);
        isValid = false;
    }

    // 성공 메시지 출력
    if (isValid) {
        printUserInfo(success, `<p style="color: green">${id} ${pwd}로 로그인 되었습니다.</p>`);
    } else {
        printUserInfo(success, "");
    }
});