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
// 카드번호
let cardNum = "";

// form 요소 이벤트 처리
let items = document.getElementById('items');
items.addEventListener('change', () => {
    // 선택한 상품 배열로 변경
    let selected = Array.from(items.selectedOptions).map(o => o.value);

    // 재선택 시, 가격이 누적되지 않도록
    price = 0;

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

// 상품 선택 후, 구매
let buy = document.getElementById('buy');
buy.addEventListener('submit', (e) => {
    // 새로고침 방지
    e.preventDefault();

    if (price === 0) {
        // 선택한 상품이 없을 시, alert
        alert("결제할 상품을 선택해야 합니다.");
    } else {
        // 새창 띄우기
        const newWindow = window.open("pay.html", "결제창", "width=500, height=400");

        // 새창에 정보 전달하기
        newWindow.onload = () => {
            newWindow.displayPrice(price);
        };

        // 자식 창 닫힘 감지 (매시간 감지)
        let checkChildClosed = setInterval(() => {
            if (newWindow.closed) {
                // 매 시간 감지 안하도록
                clearInterval(checkChildClosed);
                if (cardNum) {
                    // 결제 완료 alert
                    alert(`${cardNum}으로 ${price}원이 결제되었습니다.`);
                } else {
                    // 카드번호 입력을 안하고, 강제로 창을 닫았을 때
                    alert("결제가 취소되었습니다.");
                }
            }
        }, 500);
    }
});

// 자식창에 가격 렌더링
function displayPrice(pay) {
    let cost = document.getElementById('pay');
    cost.innerHTML = `
        <p>${pay}원을 결제하겠습니다.</p>
        <p>신용카드 번호를 입력하고 결제 버튼을 눌러 주세요</p>
    `;
}

// 카드번호 가져오기
function getCardNum(card) {
    cardNum = card;
};