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

// 총 가격
let price = 0;

// form 요소 이벤트 처리
let items = document.getElementById('items');
items.addEventListener('change', () => {
    // 선택한 상품 배열로 변경
    let selected = Array.from(items.selectedOptions).map(o => o.value);

    let result = `
        <h2>선택한 상품</h2>
        <ul>
            ${selected.map(item => {
                let product = products.find(p => p.name == item);
                price += product.price;
                return `<li>${product.name} - ${product.price}</li>`
            }).join('')}
        </ul>
        <p>총액: ${price}</p>
    `;

    // 결과를 list 구역에 출력
    list.innerHTML = result;
});

let buy = document.getElementById('buy');
buy.addEventListener('submit', (e) => {
    // 새로고침 방지
    e.preventDefault();

    if (price === 0) {
        alert("결제할 상품을 선택해야 합니다.");
    } else {
        window.open()
    }
});