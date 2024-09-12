## 이벤트 종류
- 브라우저 이벤트 : 브라우저 자체에서 발생하는 이벤트
- 사용자 이벤트 : 애플리케이션 화면에서 사용자가 키보드 혹은 마우스로 발생시키는 이벤트 (ex. 마우스, 키, HTML Form 관련 이벤트)

## 이벤트 프로그래밍 구조
`이벤트 소스`와 `이벤트 핸들러`를 `리스너`로 연결해야 한다.
- 이벤트 소스 : 이벤트 발생 객체 (HTML 요소)
- 이벤트 핸들러 : 이벤트 처리 내용 (JS 함수)
- 리스너 : 이벤트 소스와 이벤트 핸들러를 연결 (.addEventListener ...)

### addEventListener()
```
이벤트소스.addEventListener('이벤트 명', 이벤트 핸들러)
```

### DOM 노드에서 이벤트 등록
```
<button onClick="eventHandler()">클릭</button>
```

### 자바스크립트에서 onXXX로 이벤트 등록
```
let btn = document.querySelector('#btn');
button.onClick = () => { 
    console.log('클릭');
}
```

## 마우스 이벤트
- `click` : 클릭 이벤트
- `dbclick` : 더블 클릭 이벤트
- `mousedown` : 버튼을 누르는 순간 이벤트
- `mouseup` : 버튼을 떼는 순간 이벤트
- `mousemove` : 이동 이벤트
- `mouseenter` : 포인터 들어오는 순간 이벤트 / 버블링X
- `mouseleave` : 포인터 나가는 순간 이벤트 / 버블링X
- `mouseover` : 포인터가 들어오는 순간 이벤트
- `mouseout` : 포인터가 나가는 순간 이벤트

### 버블링
한 요소에 이벤트가 발생하면, 이 요소에 할당된 핸들러가 동작하고, 이어서 부모 요소의 핸들러가 동작한다. 가장 최상단의 조상 요소를 만날 때까지 이 과정이 반복되면서 요소 각각에 할당된 핸들러가 동작한다.
```
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">FORM
  <div onclick="alert('div')">DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
```
1. <p>에 할당된 onClick 핸들러 동작
2. <div>에 할당된 onClick 핸들러 동작
3. <form>에 할당된 onClick 핸들러 동작
4. document 객체를 만날 때까지, 각 요소에 할당된 onClick 핸들러가 동작
-> 자식요소에서 부모요소까지 이벤트를 한번에 처리할 때에는 좋으나, 의도하지 않은 이벤트 처리, 복잡한 구조에서 관리가 어려우며 성능 문제가 발생한다. `event.stopPropagation()`를 통해 버블링을 막을 수도 있다.

## window 이벤트
- `copy` : 복사했을 때의 이벤트
- `cut` : 잘라내기했을 때의 이벤트
- `paste` : 복사했을 때의 이벤트
- `load` : 문서 로딩 완료 시 이벤트
- `error` : 문서 로딩에 실패했을 때의 이벤트
- `resize` : 브라우저 창의 크기가 변경될 때의 이벤트 (`innerWidth`, `innerHeight`를 통해 창의 크기 획득 가능)

## Form 이벤트
- `submit` : form 데이터 제출 시
- `reset` : form 데이터 리셋 시

- `change` : 데이터 변경되는 순간
- `focus` : 입력 요소 포커스를 가지는 순간
- `blur` : 입력 요소 포커스를 읽어버리는 순간