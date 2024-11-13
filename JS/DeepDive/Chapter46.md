# 46장 제너레이터와 async/await

## 46.1 제너레이터란?
: 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수.
- 제너레이터 함수는 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다.
- 제너레이터 함수는 함수 호출자와 함수의 상태를 주고받을 수 있다.
- 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.

## 46.2 제너레이터 함수의 정의
`function*` 키워드로 선언. 그리고 하나 이상의 `yield` 표현식을 포함
```
// 제너레이터 함수 선언문
function* genDecFunc() {
    yield 1;
}

// 제너레이터 함수 표현식
const genExpFunc = function* () {
    yield 1;
};

// 제너레이터 메서드
const obj = {
    *genObjMethod() {
        yield 1;
    }
};

// 제너레이터 클래스 메서드
class MyClass {
    *genClsMethod() {
        yield 1;
    }
}
```

## 46.3 제너레이터 객체
: 제너레이터 객체는 제너레이터 함수가 호출될 때 반환되는 특별한 이터러블 객체. 이 객체는 **이터레이터(Iterator)**이자 **이터러블(Iterable)**의 특성을 동시에 가지며, 제너레이터 함수의 실행 상태를 제어할 수 있다.

### 제너레이터 객체의 특징
1. Iterator와 Iterable의 동시 특성

- 제너레이터 객체는 next() 메서드를 가진 이터레이터
- 동시에 Symbol.iterator 메서드를 가진 이터러블이기도 한다.
- 따라서, 제너레이터 객체는 for...of 루프와 같은 이터레이션 문법에서 사용할 수 있다.
```
function* genFunc() {
    yield 1;
    yield 2;
    yield 3;
}

const genObj = genFunc();

console.log(genObj.next()); // { value: 1, done: false }
console.log(genObj.next()); // { value: 2, done: false }
console.log(genObj.next()); // { value: 3, done: false }
console.log(genObj.next()); // { value: undefined, done: true }
```

2. next() 메서드
- 제너레이터 객체의 next() 메서드는 제너레이터 함수 내부에서 yield 키워드를 만나 실행을 일시 중단하고, 다시 호출될 때 중단된 지점에서 재개한다.
- 반환값은 { value: any, done: boolean } 형식:
  - value: 현재 yield 표현식의 값.
  - done: 제너레이터 함수 실행이 완료되었는지 여부.

3. 일시 중단과 상태 저장
- 제너레이터 함수는 호출 즉시 실행되지 않고 **"일시 중단 상태"**로 시작된다.
- next()를 호출하면 함수가 실행되다가 yield에서 멈춘다.
- yield를 사용해 값을 반환하면서, 중단된 상태를 기억한다.
```
function* genFunc() {
    console.log("Start");
    yield 1;
    console.log("Resume");
    yield 2;
    console.log("End");
}

const genObj = genFunc();

genObj.next(); // "Start", { value: 1, done: false }
genObj.next(); // "Resume", { value: 2, done: false }
genObj.next(); // "End", { value: undefined, done: true }
```

4. 동적인 입력값 전달
- next() 메서드의 인수로 값을 전달하면, 해당 값이 이전 yield 표현식의 결과로 사용된다.
```
function* genFunc() {
    const x = yield "First yield";
    const y = yield "Second yield";
    return x + y;
}

const genObj = genFunc();

console.log(genObj.next()); // { value: "First yield", done: false }
console.log(genObj.next(10)); // { value: "Second yield", done: false } (x = 10)
console.log(genObj.next(20)); // { value: 30, done: true } (y = 20, x + y = 30)
```

5. 이터레이션 종료
- 제너레이터 함수 내부에서 return 문을 사용하거나 함수가 끝나면, 제너레이터 객체의 done 속성이 true로 설정된다.
- 종료 후 next()를 호출하면 { value: undefined, done: true }를 반환한다.

## 46.5 제너레이터의 활용
1. 이터러블 데이터 생성

제너레이터를 사용해 유한 또는 무한 이터러블 데이터를 생성할 수 있다.
```
function* infiniteNumbers() {
    let num = 0;
    while (true) {
        yield num++;
    }
}

const nums = infiniteNumbers();
console.log(nums.next().value); // 0
console.log(nums.next().value); // 1
console.log(nums.next().value); // 2
```

2. 비동기 흐름 제어
- yield를 사용해 비동기 작업의 순서를 제어하는 데 유용하다.

3. 복잡한 데이터 처리
- 데이터를 한 단계씩 처리해 메모리 효율성을 높인다. (예: 대용량 파일 처리)

## 46.6 async/await
: 제너레이터를 사용해 비동기 처리를 동기 처리처럼 동작하도록 했지만, 이는 너무 복잡하고 가독성도 좋지 않아 `async/awati`가 도입되었다. 이는 프로미스 기반이며, 비동기 처리 결과를 후속 처리할 필요 없이 마치 동기 처리처럼 프로미스를 사용할 수 있다. 

### async
: 언제나 프로미스를 반환한다. async 함수는 암묵적으로 반환값을 resolve하는 프로미스를 반환한다. await 키워드는 반드시 async 함수 내부에서 사용해야 한다. 

### await
: 프로미스가 settled 상태가 될 때까지 대기하다가 settled 상태가 되면 프로미스가 resolve한 처리 결과를 반환한다. 프로미스가 settled 상태가 되면 프로미스가 resolve한 처리 결과가 변수에 할당된다. 

### 에러처리
: try...catch문을 사용해 에러를 캐치할 수 있다. async 함수 내에서 catch문을 사용하지 않으면, async 함수는 발생한 에러를 reject하는 프로미스를 반환한다. 그렇기에 `Promise.prototype.catch` 후속 처리 메서드를 사용해 에러를 캐치할 수 있다. 


## 의문점과 해결
- 비동기 처리를 왜 굳이 동기 처럼 진행해야할까?
: 동기적으로 작업을 처리하면, 하나의 작업이 끝날 때까지 프로그램이 멈춰 있다. 이는 UX 관점 및 성능 관점에서도 좋지 않다. 통신과 같은 오래 걸리는 작업은 비동기 처리로 실행하고, 이 결과를 사용할 때는 `await`로 동기처럼 기다리는 것이다! **요청은 비동기, 결과를 받아올 때는 동기**