"use strict"

function Product(name, price) {
    this.name = name;
    this.price = price;
}
let products = [
    new Product('대뱃살', 3000),
    new Product('목살', 5000),
    new Product('배꼽살', 4000),
    new Product('중뱃살', 1000)
];

// 상품을 클릭하면 아래에 렌더링
// 결과를 출력할 구역
let list = document.getElementById('list');

// form 요소 이벤트 처리
let items = document.getElementById('items');
items.addEventListener('change', () => {
    // 값 배열로 변경
    let selected = Array.from(items.selectedOptions).map(o => o.value);

    let result = `
        <h2>선택한 상품</h2>
        <ul>
            ${selected.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;

    // 결과를 list 구역에 출력
    list.innerHTML = result;
})