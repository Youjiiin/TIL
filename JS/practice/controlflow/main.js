"use strict";

const primeTest = () => {
  let no = parseInt(prompt('2 이상의 숫자를 입력하세요'), 10);
  let message = '';

  if (isNaN(no) || no < 2) {
    message = '2 이상의 숫자를 입력하세요.';
  } else {
    let isPrime = true;

    for (let i = 2; i < no; i++) {
      if (no % i === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      message = `${no}는 소수입니다.`;
    } else {
      message = `${no}는 소수가 아닙니다.`;
    }
  }

  // 결과를 HTML 요소에 출력
  document.querySelector('#result').innerHTML = message;
};
