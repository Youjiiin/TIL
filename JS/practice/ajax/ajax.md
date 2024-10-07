# Ajax
: Ajax는 서버 연동을 위한 자바스크립트 프로그래밍 기술로, 비동기적으로 서버와 통신을 가능하게 하는 기술. Ajax는 Asynchronous JavaScript and XML의 약어로, 비동기 방식으로 서버와 데이터를 주고받기 위해 사용된다.

1. 동기 통신과의 차이
- 일반적인 브라우저의 서버와의 통신은 동기 통신이다. 즉, 브라우저가 서버에 요청(request)을 보내면 **서버로부터 응답(response)**을 받을 때까지 기다리는 동안 브라우저는 대기 상태가 된다.
- 동기 통신의 단점은 응답이 완료될 때까지 브라우저 전체가 **블로킹(blocking)**되어 사용자가 다른 작업을 할 수 없다는 점이다.

2. 비동기 통신 (Ajax의 장점)
- 비동기 통신은 서버에 요청을 보내더라도 브라우저가 대기하지 않고, 요청이 완료될 때까지 다른 작업을 계속할 수 있게 해준다.
- 비동기 방식 덕분에 서버로부터 응답이 도착했을 때, 필요한 부분만 화면을 갱신하여 **사용자 경험(UX)**을 개선할 수 있다. 전체 페이지가 새로고침되는 것이 아니라, 화면의 일부만 업데이트된다.

3. Ajax의 동작 원리
- 브라우저에서 비동기 통신이 가능한 이유는 브라우저 내에 있는 **Ajax 엔진(Ajax Engine)**이 동작하기 때문이다. Ajax 엔진은 서버와의 통신을 비동기적으로 처리하여, 브라우저가 다른 작업을 할 수 있도록 한다.

4. Ajax의 특징 요약
- 서버와 비동기 방식으로 데이터를 주고받으며, 페이지를 다시 로드하지 않고도 일부 화면만 갱신할 수 있다.
- 대기 시간이 없기 때문에, 사용자는 서버와 통신하는 동안에도 브라우저를 계속 사용할 수 있다.
- 서버로부터 전달된 데이터를 필요에 따라 화면의 일부에만 반영할 수 있어 전체 페이지를 새로 고칠 필요가 없다.

```
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
```

## XMLHttpRequest
: Ajax 통신을 위해 서버에 요청을 보내려면 XMLHttpRequest 객체를 사용해야 한다.

1. XMLHttpRequest 객체 생성: new XMLHttpRequest()로 객체를 생성한다.
2. 요청 준비 (초기화): open() 메서드를 사용하여 요청을 초기화한다.
3. 요청 전송: send() 메서드를 통해 서버로 요청을 전송한다.
4. 결과 처리: 서버에서 응답을 받은 후, 다양한 이벤트 핸들러로 결과를 처리한다.

```
let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true);  // 요청 초기화
xhr.send();  // 서버에 요청 전송
```

### `open()`
: 서버 요청을 초기화하며, HTTP 메서드와 URL, 동기/비동기 여부를 지정한다.
- open() 메서드의 **첫 번째 매개변수는 HTTP 요청 메서드**를 지정한다 (GET, POST, PUT, DELETE 등).
- 두 번째 매개변수는 **요청할 URL**
- 세 번째 매개변수는 **비동기 여부**를 결정하며, true로 설정하면 비동기 통신, false로 설정하면 동기 통신

### `abort()`
: 진행 중인 요청을 취소한다.

### `send()`
: 서버에 요청을 전송한다.

#### 결과에 대한 처리 - 이벤트 콜백 함수
- `loadstart`: 서버 응답을 받기 시작할 때 발생.
- `progress`: 응답을 받는 도중 지속적으로 발생.
- `load`: 요청이 성공적으로 완료되었을 때 발생.
- `abort`: 요청이 취소되었을 때 발생.
- `error`: 요청 중 에러가 발생했을 때 발생.
- `loadend`: 요청 완료 후 발생 (성공/실패에 상관없음).
- `readystatechange`: readyState 값이 변경될 때마다 발생.

#### 응답 처리 (send() 이후)
: 요청이 완료되면 load 이벤트가 발생합니다. 이때, responseText 프로퍼티를 통해 서버에서 받은 데이터를 확인할 수 있다. 서버 응답이 완료된 후 콜백 함수에서 데이터를 처리하는 방식

- `status`: HTTP 응답 상태 코드 (예: 200, 404 등).
- `readyState`: 요청의 상태를 나타냅니다 (0에서 4까지의 값, 자세한 설명은 위에서 설명한 readyState 참조).
    - 0: UNSENT – 아직 open()으로 초기화되지 않은 상태.
    - 1: OPENED – 요청이 초기화되었지만 아직 전송되지 않은 상태.
    - 2: HEADERS_RECEIVED – 서버로부터 헤더 정보를 받은 상태.
    - 3: LOADING – 서버로부터 데이터를 전송받고 있는 상태.
    - 4: DONE – 모든 데이터 수신이 완료된 상태.
- `statusText`: HTTP 응답 상태 메시지 (예: OK, Not Found 등).
- `responseText`: 서버에서 받은 응답 데이터를 문자열로 반환합니다.
- `responseType`: 서버 응답의 타입을 나타냅니다 (예: text, json, blob 등).
```
xhr.onload = function() {
    if (xhr.status === 200) {  // 응답이 성공적으로 완료된 경우
        let data = JSON.parse(xhr.responseText);  // 응답 데이터를 JSON으로 파싱
        resultNode.innerHTML = data.result;  // 응답 데이터를 DOM에 출력
    }
};
```

### `setRequestHeader()`
: 요청 헤더를 설정한다.

## CORS
: Cross Origin Response Sharing의 약어로 교차 출처 리소스 공유를 의미하며, 웹 브라우저에서 다른 출처의 리소스에 대한 요청을 제한하거나 허용하는 메커니즘을 정의한 보안 기능 <br>
**CORS는 웹 페이지가 현재 도메인 이외의 다른 도메인, 프로토콜, 또는 포트에서 리소스를 요청할 때 발생하는 보안 정책**이다. 웹 브라우저는 보안상의 이유로, 기본적으로 다른 출처에서 온 요청에 대한 자원의 접근을 제한한다. 이 때, CORS 정책을 사용하면 서버가 특정 조건 하에 다른 출처의 리소스를 허용할 수 있다. (`Access-Control-Allow-Origin` 헤더 사용)

### Access-Control-Allow-Origin
: **Access-Control-Allow-Origin** 헤더는 서버가 어떤 출처(origin)에서의 요청을 허용할지 결정하는 데 사용

- 모든 출처 허용: 만약 이 값을 *로 설정하면 모든 출처에서의 요청을 허용한다는 의미. 즉, 출처에 상관없이 누구나 서버 자원에 접근할 수 있게 된다.
```
Access-Control-Allow-Origin: *
```

- 특정 출처만 허용: 모든 출처를 허용하는 대신, 특정 출처만 허용하고 싶다면, * 대신 허용하고자 하는 출처의 URL을 명시하면 된다.
```
Access-Control-Allow-Origin: https://example.com
```

### Access-Control-Allow-Origin
: **Access-Control-Allow-Headers**는 서버가 어떤 요청 헤더를 허용할 것인지 결정. 이 헤더를 사용하여, 어떤 헤더가 포함된 요청만 허용할지를 명시할 수 있다.
```
Access-Control-Allow-Headers: X-Requested-With
```
: ex. X-Requested-With 헤더만 포함된 요청을 허용

### Access-Control-Allow-Methods
: **Access-Control-Allow-Methods**는 허용할 HTTP 메서드(GET, POST, PUT, DELETE 등)를 명시. 서버가 특정 메서드로만 요청을 허용하도록 설정할 수 있다.
```
Access-Control-Allow-Methods: GET, POST
```
: ex. GET과 POST 메서드로만 요청을 허용

## Axios
: jquery ajax, fetch, superagent와 같은 Ajax 라이브러리
```
axios({
    method: 'get',
    url: 'http://localhost:3000/example'
})
.then(response => {
    printResult(response.data.result)
})
```

### 서버요청
- axios.request(config)
- axios.get(url[, config])
- axios.post(url[, data[, config]])
- axios.delete(url[, config])
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])
- axios.head(url[, config]) : GET 요청과 유사하지만, 응답 본문을 받지 않고 헤더 정보만 받음
- axios.options(url[, config]) : 서버에서 지원하는 요청 메서드를 확인하기 위해 사용

=> post, put, patch는 url 정보이외에 바디 스트림으로 전송하는 데이터를 명시해야 한다.
```
axios.post('http://localhost:3000/example', {
    name: '장유진',
    age: 25
})
```

### Config 설정
: 공통 config를 설정하고, 재사용할 수 있다.
- axios객체의 **defaults에 설정**
```
axios.defaults.baseURL = 'http://localhost:3000/example';
axios.defaults.timeout = 2000;

axios.post('post_test', { //http://localhost:3000/example/post_test
    name: '장유진',
    age: 25
})
```
- **custom axios 객체**를 만들어 공통정보를 설정
```
const myAxios = axios.create({
    baseURL = 'http://localhost:3000/example',
    timeout = 2000
})

myAxios.post('post_test', { //http://localhost:3000/example/post_test
    name: '장유진',
    age: 25
})
```

#### config 설정 정보
- `url`: 서버요청 URL
- `method`: HTTP Request Method
- `baseURL`: url이 http / https로 시작하지 않았을 때 url 앞에 들어갈 공통 URL
- `data`: POST, PUT, PATCH 요청 시 서버에 전송될 바디 스트림 데이터
- `timeout`: 요청 타임아웃 시간
- `params`: 요청 URL 파라미터

- `transformRequest`, `transformResponse`: 배열에 요청과 응답에 실행되어야 하는 함수를 여러개 등록 가능.
```
transformRequest: [
    function (data, headers) {
        headers["Content-Type"] = "application/json";
        let newData = { ...data, key: 1 };
        return JSON.stringify(newData);
    },
],

transformResponse: [
    function (data) {
        const jsonData = JSON.parse(data);
        let newData = { ...jsonData, index: 1 };
        return newData;
    },
]
```