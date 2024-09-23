## DOM이란?
: 웹 페이지의 구조를 **객체** 형태로 표현한 것으로, 자바스크립트와 같은 프로그래밍 언어가 웹 페이지의 HTML이나 XML 문서에 접근하고 조작할 수 있도록 만들어주는 인터페이스이다. 즉, 웹 페이지의 문서를 프로그래밍 적으로 제어할 수 있는 방법을 제공한다.

### DOM의 역할
1. HTML 문서를 구조화 하여 트리 형태의 구조로 표현
2. 웹 페이지의 각 요소를 객체로 표현하여 프로그래밍 언으를 통해 동적으로 접근하고 수정가능
3. 자바스크립트를 통해 웹 페이지의 콘텐츠, 스타일, 구조를 실시간으로 변경가능

![DOM의 계층구조](image.png)

### 속성(Attribute)
: **HTML 요소에 설정된 값으로, HTML 문서 안에 존재하는 정보이다.** 웹 페이지가 처음 로드될 때 브라우저가 해석하는 요소의 초기 상태를 정의. HTML 태그 내에서 선언된 **정적 값**이며, **값은 문자열로 저장**된다.
```
<input type="text" value="Hello" id="myInput" disabled>
```

### 프로퍼티(Property)
: **DOM 객체가 가지고 있는 동적 속성**으로, 자바스크립트로 접근할 수 있는 값이다.DOM에서 요소가 실시간으로 가지는 상태나 값을 나타낸다. 브라우저가 HTML을 해석해 DOM 객체를 생성한 후 **자바스크립트로 접근하거나 수정할 수 있는 동적 속성**이다.
```
const inputElement = document.getElementById('myInput');

// 속성에 접근
console.log(inputElement.getAttribute('value')); // "Hello"

// 프로퍼티에 접근
console.log(inputElement.value); // "Hello"

// 속성 값 변경
inputElement.setAttribute('value', 'Hi');

// 프로퍼티 값 변경
inputElement.value = 'Hi';
```
- `getAttribute()` : DOM 요소에서 속성 값을 가져오는 함수. 주어진 요소에서 속성이 존재할 경우, 그 속성의 값을 **문자열로 반환**. 만약 속성의 **값이 존재하지 않으면 빈 문자열**을 반환하고, 해당 요소에서 **일치하는 속성이 없다면 null을 반환**
- `setAttribute()` : DOM 요소에 속성 값을 설정하는 함수. 속성이 **이미 존재하는 경우 값이 업데이트**. 그렇지 않으면 **지정된 이름과 값으로 새 속성이 추가**
- `removeAttribute()` : DOM 요소에서 매개변수로 지정하는 속성을 제거하는 함수. **매개변수가 없으면 오류를 발생**시키지만, 매개변수로 지정하는 속성이 요소에 없어도 오류 없이 아무 동작도 하지 않음.
- `hasAttribute()` : DOM 요소에 지정한 속성이 있는지 체크하는 함수. 해당 요소에 **지정한 속성이 있으면 true를 반환하고, 없으면 false**를 반환


### DOM 요소 선택
- `getElementById` : 특정 id 속성을 가진 요소 하나를 선택할 때 사용
```
let element = document.getElementById('myElement'); // 'myElement'라는 id를 가진 요소 선택
```

- `querySelector` : CSS 선택자를 사용하여 문서 내의 첫 번째로 일치하는 요소 하나를 선택
```
let element = document.querySelector('.myClass'); // 'myClass' 클래스를 가진 첫 번째 요소 선택
```
- `querySelectorAll` : CSS 선택자를 사용하여 문서 내의 모든 일치하는 요소를 모두 선택. 일치하는 요소를 NodeList 객체로 반환.
```
let elements = document.querySelectorAll('.myClass'); // 'myClass' 클래스를 가진 모든 요소 선택
```

- `getElementsByName()` : 태그에 name 속성을 설정하고, 속성값으로 노드를 획득
```
let idInput = document.getElementsByName('id'); //name이 'id'인 요소 선택
```
- `getElementsByClassName` : 특정 클래스명을 가진 모든 요소를 선택. 주어진 클래스명을 가진 요소들을 HTMLCollection으로 반환. HTMLCollection은 실시간으로 동적이므로 DOM에 변화가 생기면 자동으로 업데이트
```
let elements = document.getElementsByClassName('myClass'); // 'myClass' 클래스를 가진 모든 요소 선택
```
- `getEl
ementsByTagName` : 특정 태그명을 가진 모든 요소를 선택. 주어진 태그명을 가진 요소들을 HTMLCollection으로 반환
```
let elements = document.getElementsByTagName('div'); // 모든 <div> 요소 선택
```