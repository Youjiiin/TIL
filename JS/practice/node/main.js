"use strict";

let resultNode = document.getElementById('result')
let formNode = document.getElementById('myForm')

function printResult(msg) {
  resultNode.innerHTML = msg
}

formNode.addEventListener('submit', (e) => {
  e.preventDefault()

  // 유저 입력 데이터
  let nameNode = document.getElementById('name')
  let hobbyNode = document.querySelectorAll('input[type="checkbox"]:checked')
  let genderNode = document.querySelector('input[name="gender"]:checked')

  // 취미 선택된 값들을 문자열로
  let hobbyResult = ''
  hobbyNode.forEach((item, index) => {
    if (index > 0) hobbyResult += ', ';
    hobbyResult += `${item.value}`
  })

  // 성별 확인
  let genderResult = ''
  if (genderNode) {
    genderResult = genderNode.value
  }

  // 결과 출력
  let msg = `name : ${nameNode.value}<br/>취미 : ${hobbyResult}<br/>성별 : ${genderResult}`
  printResult(msg)
})
