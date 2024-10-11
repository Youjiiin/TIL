# 47장 에러처리

## 47.1 에러 처리의 필요성
`try...catch`문을 사용하면 에러가 발생해도 프로그램이 종료되지 않고 코드를 실행시킬 수 있다. 하지만, 직접 에러를 발생하진 않지만, 예외 상황을 만들어 에러가 나는 상황이 있을 수 있다.(ex. 값을 가져오는데 null 값이라 다른 곳에서 에러 발생)

## 47.2 `try...catch...finally`문
에러 처리에는 두 가지 방법이 있다.
- **if문**
: `querySelector`나 `Array#find`메서드 처럼 예외의 상황이 발생하면 반환하는 값이 `null` 혹은 `-1`일 때 if문으로 처리하는 방법

- `try...catch...finally`문
: '에러 처리'라고 하면 가장 일반적인 방법
```
try {
    // 실행할 코드
} catch (err) {
    // try 코드 블록에서 에러가 발생하면 실행될 코드
    // err에는 try 코드 블록에서 발생한 Error 객체가 전달된다.
} finally {
    // 에러 발생과 상관없이 반드시 한 번 실행된다.
}
```

## 47.3 Error 객체
: Error 생성자 함수에는 에러를 상세히 설명하는 여러 메시지를 인수로 전달할 수 있다.
```
const error = new Error('invalid');
```
- Error 생성자 함수가 생성한 객체는 `message` `stack`프로퍼티를 갖는다. `message`는 에러 메시지, `stack`은 에러를 발생시킨 콜스택의 호출 정보를 나타내며, 디버깅 목적으로 사용한다.

### 자바스크립트 내장 에러 객체(에러 유형)
- `Error`: 일반적 에러 객체
- `SyntaxError`: 자바스크립트 문법에 맞지 않는 문을 해석할 때 발생하는 에러 객체
- `ReferenceError`: 참조할 수 없는 식별자를 참조했을 때 발생하는 에러 객체
- `TypeError`: 피연산자 또는 인수의 데이터 타입이 유효하지 않을 때 발생하는 에러 객체
- `RangeError`: 숫자의 허용 범위를 벗어났을 때 발생하는 에러 객체
- `URIError`: `encodeURI` 또는 `decodeURI` 함수에 부적절한 인수를 전달했을 때 발생하는 에러 객체
- `EvalError`: `eval` 함수에서 발생하는 에러 객체

## 47.4 throw 문
: 에러 객체를 직접 던지는 방법
```
try {
    // 에러 객체를 던져 catch 코드 블록을 실행
    throw new Error('뭔가 잘못되고 있다..');
} catch(error) {
    console.log(error);
}
```

## 47.5 에러의 전파
: 에러는 호출자 방향으로 전파된다. 
- `throw`된 에러는 적절하게 **catch**로 처리하지 않으면 프로그램이 강제 종료된다.
- 비동기 작업(`setTimeout`, `프로미스` 등)에서의 콜백 함수는 콜 스택과 별개로 나중에 실행되며, 이때 발생한 에러는 콜 스택과 관계가 없기 때문에 직접 처리해야 한다. 비동기 함수 내부에서 에러 처리를 따로 해주어야 에러가 제대로 처리된다.
```
setTimeout(() => {
  try {
    throw new Error("Something went wrong!");
  } catch (e) {
    console.error("Caught an error inside the callback:", e.message);
  }
}, 1000);
```