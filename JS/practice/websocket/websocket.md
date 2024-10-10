# WebSocket

## HTTP 프로토콜의 한계
- HTTP 프로토콜의 특징: Connection Oriented
: HTTP는 두 애플리케이션 간의 연결을 통해 데이터를 송수신한다. 즉, 웹 브라우저와 웹 서버가 상호 연결된 상태에서만 데이터를 주고받으며, 이러한 연결을 기반으로 백엔드 데이터가 브라우저에 출력된다.

- HTTP 프로토콜의 특징: Stateless
: HTTP는 상태를 유지하지 않는 프로토콜로, 요청과 응답 사이에 연결이 지속적으로 유지되지 않는다. 서버에 요청을 보내고 응답을 받으면, 그 즉시 연결이 종료됩니다. 매번 새로운 요청마다 연결이 다시 이루어지는 방식이다.

- HTTP는 서버에서 클라이언트로 실시간으로 데이터를 전송하는 '서버 푸시' 기능을 지원하지 못한다. 또한, 네트워크가 연결되지 않은 경우 데이터를 전송할 수 없다. 클라이언트(프론트엔드)는 필요할 때 자유롭게 데이터를 요청할 수 있지만, 서버(백엔드)는 클라이언트가 요청하지 않는 한 데이터를 전송할 수 없다.

## WebSocket 이란?
: WebSocket은 HTTP 프로토콜의 연결 비유지 특성으로 인해 발생하는 실시간 서버 푸시 구현의 한계를 해결하기 위해 등장한 프로토콜이다. WebSocket은 소켓 연결을 통해 클라이언트와 서버 간에 지속적인 양방향 통신을 지원하며, 연결이 유지된 상태에서 실시간으로 데이터를 주고받을 수 있다. 이를 통해 서버는 클라이언트가 요청하지 않더라도 실시간으로 데이터를 푸시할 수 있다.

## WebSocket의 실시간 통신 가능 이유
- 연결 유지: WebSocket은 초기 연결 이후, 클라이언트와 서버 간의 지속적인 연결을 유지합니다. 이 연결을 통해 클라이언트와 서버는 언제든지 양방향으로 데이터를 주고받을 수 있다.
- 양방향 통신: WebSocket은 클라이언트뿐만 아니라 서버에서도 데이터를 자유롭게 전송할 수 있다. 이를 통해 실시간으로 서버가 데이터를 클라이언트에게 푸시(push)하는 것이 가능하다.
- 낮은 오버헤드: HTTP는 매번 요청과 응답 시마다 새로운 연결을 생성해야 하지만, WebSocket은 한 번 연결되면 연결을 유지하면서 여러 데이터를 주고받는 방식이므로 오버헤드가 적다.

> 오버헤드
> 필요한 작업을 처리하기 위해 들어가는 추가적인 시간, 메모리, 네트워크 자원 등

## Client 측
### 1. 서버 연결
: WebSocket 객체를 생성해야 하고 매개변수로 서버의 네트워크 정보를 설정해야 한다. 프로토콜명은 `ws`이며, 보안 프로토콜을 이용하려면 `wss`이다.
```
webSocket = new WebSocket("ws://localhost:3000");
```

### 2. 데이터 송신
: WebSocket 객체의 `send()` 함수를 이용한다.
```
WebSocket.send(${nickname} => ${msg})
```

### 3. 데이터 수신
: 데이터가 언제 넘어올지 모르기에 이벤트 모델을 사용한다. 데이터가 수신될 때 실행될 이벤트를 콜백 함수를 등록해 놓으면 실제 데이터가 수신될 때 콜백 함수가 실행된다.
```
WebSocket.onmessage = (event) => {
    let data = event.data;
}
```

### 4. 연결 해제
: 연결을 해제하고 싶다면, `close()`함수 이용
```
WebSocket.close();
```

## Server 측
- 어떤 언어로 개발된 서버로든 WebSocket 서버를 구동할 수 있다. Node.js 기반은 websocket, ws, socket.io등 많은 모듈이 있다.
```
npm i ws
```

### 1. WebSocket 서버 구동
```
const { WebSocketServer } = require('ws');
```

### 2. 연결 요청 처리
: `connection` 이라는 이벤트를 등록해 주면 연결요청이 들어오는 순간 이벤트 발생하며, 콜백 함수가 실행된다.
```
socketserver.on('connection', ws => {
    console.log('Connected!');
    ws.on('close', () => console.log('Disconnected!'));

    ws.onerror = function () {
        console.log('Error!');
    }
})
```

### 3. 데이터 수신
: `message`이벤트 활용
```
ws.on('message', data => {
    socketserver.clients.forEach(client => {
        console.log(`send message: ${data}`);
        client.send(`${data}`);
    })
})
```

### 4. 데이터 송신
: `send()` 함수 이용
```
ws.send('message...');
```