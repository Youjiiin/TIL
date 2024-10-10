# 44장 REST API

## 44.1 REST API의 구성
- 자원: URI(엔드포인트)
- 행위: 자원에 대한 행위 - HTTP 요청 메서드
- 표현: 자원에 대한 행위의 구체적 내용 - 페이로드

## 44.2 REST API 설계 원칙
: **URI는 리소스를 표현**하는데 집중하고 **행위에 대한 정의는 HTTP 요청 메서드**를 통해 하는 것이 RESTful API를 설계하는 중심 규칙이다.

1. URI는 리소스를 표현해야 한다.
: 동사보다는 명사를 사용하며 리소스를 표현할 수 있는 URI를 사용하도록 한다.

2. 리소스에 대한 행위는 HTTP 요청 메서드로 표현한다.
: HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적을 알리는 행위이다. 주로 5가지 메서드로 CRUD를 구현한다.
- `GET`: 모든/특정 리소스 취득
- `POST`: 리소스 생성
- `PUT`: 리소스 전체 교체
- `PATCH`: 리소스 일부 수정
- `DELETE`: 모든/특정 리소스 삭제
-> 이는 URI에 표현하지 않는다. 

## 44.3 JSON Server를 이용한 REST API 실습
### JSON Server 설치
```
npm install json-server --save-dev
```

### db.json 파일 생성
: 루트 폴더에 `db.json`파일을 생성 -> db 역할
```
{
    "todos": [
        {
            "id": 1,
            "content": "HTML",
            "completed": true
        },
        {
            "id": 2,
            "content": "CSS",
            "completed": false
        },
        {
            "id": 3,
            "content": "JavaScript",
            "completed": true
        },
    ]
}
```

### JSON Server 실행
- 파일 변경 감지를 위해 watch옵션 추가
```
json-server --watch db.json
```
- 포트 변경(기본은 3000)
```
json-server --watch db.json --port 5000
```

### 요청 메서드
```
const xhr = new SMLHttpRequest();


// GET
xhr.open('GET', '/todos');
xhr.send();

// POST
xhr.open('POST', '/todos');
xhr.setRequestHeader('content-type', 'application/json');
xhr.send(JSON.stringfy({id: 4, content: 'Angular', completed: false}));

// PUT
xhr.open('PUT', '/todos');
xhr.setRequestHeader('content-type', 'application/json');
xhr.send(JSON.stringfy({id: 4, content: 'React', completed: true}));

// PATCH
xhr.open('PATCH', '/todos');
xhr.setRequestHeader('content-type', 'application/json');
xhr.send(JSON.stringfy({completed: false}));

// DELETE
xhr.open('DELETE', '/todos/4');
xhr.send();
```