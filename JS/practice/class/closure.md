# [클로저](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)
: 클로저는 함수가 선언된 렉시컬 환경을 기억하는 기능을 의미한다. 즉, 함수가 생성된 당시의 스코프(변수들이 존재하는 범위)를 기억하고, 그 범위에 속한 변수들에 계속 접근할 수 있다. 클로저는 외부 함수가 종료된 이후에도, 해당 함수 내부에서 정의된 변수가 메모리에서 지워지지 않고 유지되는 것.

## 동작 방식
: 함수와 그 함수가 생성된 환경을 함께 묶어주는 개념. 이 환경은 함수가 호출된 시점이 아니라 정의된 시점에 참조할 수 있는 모든 변수들을 포함
```
function outer() {
    let count = 0;  // 외부 함수의 변수

    // 내부 함수, 클로저가 됨
    function inner() {
        count++;  // 외부 함수의 변수에 접근 가능
        console.log(count);
    }

    return inner;  // 내부 함수 반환
}

const counter = outer();  // 외부 함수 실행
counter();  // 1
counter();  // 2
counter();  // 3
```
: 클로저는 내부 함수가 외부 함수의 변수에 접근할 수 있게 해주며, 이 변수는 외부 함수가 종료된 이후에도 메모리에 남아 있는 상태가 된다.

```
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(2)); // 12
```
: `add5`,`add10`는 모두 클로저이다. `makeAdder`는 함수를 만들어내는 팩토리이다. 

## 장점
1.  **데이터 은닉**: 클로저를 사용하면 외부에서 직접 접근할 수 없는 변수를 관리할 수 있습니다. 외부 함수의 변수를 내부 함수에서만 접근할 수 있도록 하여 데이터를 은닉할 수 있습니다.
2. **상태 유지를 통한 함수 확장**: 클로저를 통해 함수가 특정 상태를 기억할 수 있으므로, 특정 작업을 하는 함수를 만들 때 유용합니다. 예를 들어, API 호출 횟수, 게임 점수 등 상태를 계속 유지해야 하는 경우에 클로저를 사용할 수 있습니다.
3. 어떤 데이터와 그 데이터를 조작하는 삼수를 연관시켜 주기 때문에 유용하다. 이것은 객체가 어떤 데이터와 하나 혹은 그 이상의 메소드들을 연관시킨다는 점에서 객체지향 프로그래밍과 같은 맥락이다.

## 클로저가 발생하는 상황

1. 함수가 다른 함수 안에서 정의되고: 함수가 다른 함수 안에서 정의되면, 내부 함수는 외부 함수의 스코프에 접근할 수 있다.
2. 내부 함수가 외부 함수의 변수를 참조할 때: 내부 함수는 외부 함수의 변수를 참조할 수 있으며, 이 참조가 클로저를 형성하게 된다.
3. 내부 함수가 외부 함수보다 나중에 실행될 때: 외부 함수가 먼저 종료되더라도 내부 함수가 외부 함수의 변수를 참조할 수 있는 경우, 그 변수가 클로저로 인해 유지됩니다.

## 클로저 사용 시 주의할 점
클로저는 편리하지만, 잘못 사용하면 **메모리 누수(memory leak)를 유발**할 수 있습니다. 클로저로 인해 함수가 참조하고 있는 변수들이 메모리에서 제거되지 않고 계속 남아 있기 때문입니다. 필요 없는 클로저는 적절히 해제해 메모리 관리에 신경 써야 합니다.

## 클로저를 이용해서 비공개 메서드 (private method) 흉내내기
: classes 이전의 JavaScript에는 비공개 메서드를 선언하는 기본 방법이 없었지만, 클로저를 사용하여 비공개 메서드를 흉내낼 수 있다는 것이 가능했다. 비공개 메서드는 코드에 대한 접근을 제한하는 데만 유용한 것이 아니다. 또한 전역 이름 공간을 관리하는 강력한 방법을 제공한다. 이와 같은 방법을 **모듈 디자인 패턴**을 따른다고 한다.
```
const counter = (function () {
  let privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }

  return {
    increment() {
      changeBy(1);
    },

    decrement() {
      changeBy(-1);
    },

    value() {
      return privateCounter;
    },
  };
})();

console.log(counter.value()); // 0.

counter.increment();
counter.increment();
console.log(counter.value()); // 2.

counter.decrement();
console.log(counter.value()); // 1.
```

> **모듈 디자인 패턴**
> : 정보 은닉과 코드 재사용성을 향상시키기 위해 사용되는 패턴. 클로저를 사용하여 프라이빗 멤버(private member)를 만들고, 공개 멤버(public member)와 비공개 멤버(private member)를 명확히 구분하는 방식을 취한다. 모듈 패턴은 데이터를 보호하고, 내부 구현을 숨기면서 외부에서는 필요한 인터페이스만 제공하는 방식으로 코드의 캡슐화를 지원한다.