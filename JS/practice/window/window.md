### window
: 브라우저 창을 지칭하는 객체 <br>
window 프로퍼티
- `document` : HTML 문서를 지칭하는 객체
- `location` : 브라우저의 URL 정보를 지칭하는 객체
- `screen` : 스크린 창을 지칭하는 객체
- `history` : 브라우저의 인터넷 방문 기록을 지칭하는 객체
- `navigator` : 보라우저의 다양한 정보를 가지는 객체
- `console` : 브라우저 콘솔 창, 주로 로그 출력에 이용
- `innerWidth` : HTML 문서가 출력되는 부분의 가로 사이즈
- `innerHeight` : HTML 문서가 출력되는 부분의 세로 사이즈
- `outerWidth` : 브라우저 창의 가로 사이즈
- `outerHeight` : 브라우저 창의 세로 사이즈
- `screenLeft` : 스크린 왼쪽에서 브라우저가 위치한 거리
- `screenTop` : 스크린 위에서 브라우저가 위치한 거리
- `scrollX` : 브라우저 가로방향 스크롤 위치
- `scrollY` : 브라우저의 세로방향 스크롤 위치

> `document`,`history`, `screen`, `navigator`, `location` 모두 `window`에 포함된 객체이기에 `window.객체명`과 같이 작성해야 한다. 
> 하지만, `window`를 생략해도 된다.

window 함수
- `alert()` : 알림 다이얼로그
- `confirm()` : 확인, 취소 버튼이 있는 다이얼로그
- `prompt()` : 사용자에게 입력받는 다이얼로그
- `open()` : 새로운 URL 문서를 띄움
    - 새로운 브라우저 창을 띄우면 기존 브라우저 창은 **'부모 창'**, 새로운 브라우저 창은 **'자식 창'**
    - `open(url)` : url만 지정해서 함수 호출
    - `open(url, target)` : url과 target(열 위치나 방법 -> ex. `_self`: 해당 브라우저, `_blank` : 새로운 창(기본값), `_parent` : 상위 프레임, `_top` : 최상위 브라우저 창)을 지정해서 함수 호출
    - `open(url, target, windowFeatures)` : 다양한 정보를 설정해서 함수 호출 (ex. 새창의 크기, 위치 ...)
- `close()` : 브라우저 창 닫기
- `scrollBy()` : 스크롤 시키기

다른 HTML 문서의 메모리에 접근할 수 없다. 하지만, `opner - open() 함수 사용`를 활용하면 서로의 변수와 함수에 접근할 수 있다. <br>
자식창의 js 코드에서 opner 객체를 이용해 자신의 window를 지칭하는 객체를 선언해 주어야 한다.

```
// 자식창
var childData =20;
function childFunc() {
    console.log('I'm child!')
}

opener.child = this

// 부모창
let getChildData = () => {
    console.log(child.childData);
    child.childFunc()
}
```
```
//자식창 지칭 객체
let childWindow

const myOpen3 = () => {
  childWindow = window.open(
    'http://www.likelion.net',
    '_blank',
    'left=100,top=100,width=300,height=400'
  )
  if(childWindow == null){
    alert('팝업이 차단되었습니다. 해제해 주세요')
  }
}
```

opener 객체를 이용해 자식창에서 부모창의 URL을 변경해 특정 화면으로 이동시킬 수 있다.
```
opener.location.href = 'http://www.google.com';
window.close();
```

### location
: 브라우저의 URL을 다루기 위한 객체 <br>

location 프로퍼티
- `href` : 브라우저의 URL 정보 -> 브라우저 히스토리에 저장
- `protocol` : 프로토콜 정보
- `host` : 호스트 정보, 호스트명과 포트 정보
- `hostname` : 호스트명 정보
- `port` : 포트 정보
- `pathname` : 경로 정보
- `search` : 쿼리 문자열 정보
- `hash` : 해시 정보
- `origin` : 백엔드를 식별하기 위한 정보

location 함수
- `reload()` : 현재 URL로 새로 요청 -> 새로고침과 같은 효과
- `replace()` : 주어진 URL로 이동 -> 히스토리 저장X

### history
: 브라우저의 히스토리 정보를 이용해 이전/이후 페이지 이동<br>

history 함수
- `back()` : 이전 화면
- `forward()` : 이후 화면
- `go()` : 히스토리 특정 위치로 이동 (ex. `go(0)`-> 새로고침)

### screen
: 스크린 정보를 획득 <br>

screen 프로퍼티
- `availWidth` : 사용 가능한 스크린 가로 사이즈
- `availHeight` : 사용 가능한 스크린 세로 사이즈
- `width` : 스크린 가로 사이즈
- `height` : 스크린 세로 사이즈

> `availWidth`, `availHeight`와 `width`, `height`의 차이는 시스템이 기본으로 제공하는 영역까지 포함되는지의 차이

### navigator
: 브라우저의 다양한 정보 혹은 기능에 접근할 수 있는 프로퍼티를 제공하는 객체<br>

navigator 프로퍼티
- `cookieEnabled` : 브라우저에서 쿠키 사용이 가능한지 여부
- `language` : 브라우저 설정 언어
- `onLine` : 네트워크가 연결된 것인지
- `userAgent` : 브라우저, 플랫폼 정보
    - userAgent 프로퍼티가 반환하는 문자열을 애플리케이션이 실행되는 브라우저와 그 브라우저가 실행되는 플랫폼 정보
    - 자동으로 HTTP Request header에 userAgent 문자열 전송