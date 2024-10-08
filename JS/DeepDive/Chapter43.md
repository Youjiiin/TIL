# 43장 Ajax

## 43.1 Ajax란?
: JS를 사용해 브라우저가 서버에게 비동기 방식으로 데이터를 요청하고, 서버가 응답한 데이터를 수신하여 웹페이지를 동적으로 갱신하는 프로그래밍 방식. XMLHttpRequest 객체 기반으로 동작한다.
- 이전의 동기 방식은 페이지 전체를 다시 렌더링해야 해서, **변경할 필요가 없는 부분까지 재렌더링되며, 불필요한 통신, 화면 깜빡임, 블로킹 등의 문제**가 있다.
- Ajax는 이러한 단점을 보완하여 비동기 방식으로 필요한 데이터만 갱신할 수 있다.

## 43.2 JSON
: **JSON (JavaScript Object Notation)**은 클라이언트와 서버 간의 HTTP 통신에 사용되는 텍스트 기반의 데이터 포맷. JavaScript의 객체 리터럴과 유사한 구조를 가지고 있어, 데이터 전송에 유용하다.

### JSON.stringfy
: `JSON.stringfy`메서드는 객체, 배열을 JSON 포맷의 문자열로 변환한다.
```
const obj = {
    name: '장유진',
    age: 25,
}

const json = JSON.stringfy(obj);
console.log(json); // {"name":"장유진","age":25}
```

### JSON.parse
: `JSON.parse` 메서드는 JSON 형식의 문자열을 다시 객체나 배열로 변환한다.
```
const obj = {
    name: '장유진',
    age: 25,
}

const json = JSON.stringfy(obj)

const parse = JSON.parse(json)
```

## 43.3 XMLHttpRequest
: XMLHttpRequest는 HTTP 요청을 보내고, HTTP 응답을 수신하기 위한 다양한 메서드와 프로퍼티를 제공

### XMLHttpRequest 객체 생성
```
const xhr = new XMLHttpRequest();
```
: XMLHttpRequest 객체는 브라우저 환경에서만 정상적으로 실행되며, XMLHttpRequest 생성자 함수로 객체를 생성한다.

### XMLHttpRequest 객체 프로퍼티와 메서드
- 프로토타입 프로퍼티
    - `readyState`: 요청의 현재 상태 (0~4)
    - `status`: HTTP 응답 상태 코드
    - `statusText`: 응답 상태를 설명하는 문구
    - `responseType`: 서버에서 응답받은 데이터의 형식
    - `response`: 서버로부터 응답받은 데이터
    - `responseText`: 서버로부터 텍스트 형식으로 응답받은 데이터

- 이벤트 핸들러 프로퍼티
    - `onreadystatechange`: readyState가 변화할 때마다 호출
    - `onloadstart`: 요청 시작 시 호출
    - `onprogress`: 요청 중간에 진행 상황을 받을 때 호출
    - `onabort`: 요청이 중단될 때 호출
    - `onerror`: 요청 중 에러가 발생할 때 호출
    - `onload`: 요청이 성공적으로 완료되었을 때 호출
    - `ontimeout`: 요청이 타임아웃됐을 때 호출
    - `onloadend`: 요청 완료 후 호출 (성공 또는 실패 상관없이)

- 메서드
    - `open(method, url[, async])`: HTTP 요청 초기화
    - `send([body])`: HTTP 요청 전송
    - `abort()`: 요청 중단
    - `setRequestHeader(header, value)`: HTTP 요청 헤더 설정
    - `getResponseHeader(header)`: 응답 헤더 정보 반환

- 정적 프로퍼티
    - `UNSENT (0)`: 요청이 초기화되지 않음
    - `OPENED (1)`: 요청이 설정됨
    - `HEADERS_RECEIVED (2)`: 응답 헤더가 수신됨
    - `LOADING (3)`: 응답 본문이 수신 중
    - `DONE (4)`: 요청 완료

### HTTP 요청 전송
1. XMLHttpRequest.prototype.open 메서드로 HTTP 요청을 초기화
2. 필요한 경우XMLHttpRequest.prototype.setRequestHeader 로 요청 헤더를 설정
3. XMLHttpRequest.prototype.send로 HTTP 요청 전송

- **XMLHttpRequest.prototype.open**
```
xhr.open(method, url[, async])
```
- method: HTTP 요청 메서드(GET, POST, PUT, PATCH, DELETE 등)
- url: 요청할 URL
- async: 비동기 여부 (기본값은 true)

- method
    - GET
    - POST
    - PUT
    - PATCH
    - DELETE

- **XMLHttpRequest.prototype.send**
    - GET 요청의 경우, 데이터를 URL의 일부분인 쿼리 문자열로 서버에 전송
    - POST 요청의 경우, 데이터를 body에 담아 전송

- **XMLHttpRequest.prototype.setRequestHeader**
    - `text`: text/plain, text/html ...
    - `application`: application/json, ...
    - `multipart`: multipart/formed-data ...
```
xhr.setRequestHeader('Content-Type', 'application/json');
```

### HTTP 응답 처리
: 서버가 전송한 응답을 처리하려면 XMLHttpRequest 객체의 이벤트를 캐치해야 한다. 주로 `readystatechang`e 이벤트를 통해 처리하지만, load 이벤트를 사용해 응답이 완료되었을 때만 처리할 수도 있다.
1. onreadystatechange 이벤트 핸들러를 사용해 요청의 현재 상태를 나타내는 xhr.readyState가 XMLHttpRequest.DONE인지 확인
    1-1. 이 값이 4라면, 서버 응답이 완료된 상태
2. **xhr.status**가 200일 경우, 정상적으로 응답되었음을 의미
3. **xhr.response**를 통해 서버로부터 전송된 데이터를 받을 수 있다.

