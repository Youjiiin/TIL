# 17장 생성자 함수에 의한 객체 생성

## 17.1 Object 생성자 함수
: `new` 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성하여 반환하고, 이후 프로퍼티 혹은 메서드를 추가할 수 있다.
```
// 빈 객체 생성
const person = new Object();

// 프로퍼티 추가
person.name = 'Yujin';
// 메서드 추가
person.sayHello = function() {
    console.log(`Hello, ${this.name}`);
}

console.log(person); // {name: 'Yujin', sayHello: f}
person.sayHello(); // Hello, Yujin
```
- 생성자 함수란, new 연산자와 함께 호출하여 **객체를 생성하는 함수**를 말한다. 생성자 함수에 의해 생성된 객체를 **인스턴스**라 한다.

## 17.2 생성자 함수
### 객체 리터럴에 의한 객체 생성 방식의 문제점
: 객체 리터럴을 사용하면 단 하나의 객체만 생성한다. 동일한 프로퍼티를 가진 객체를 여러 개 생성해야 할 경우 매번 객체를 생성해야 하므로 비효율적이다.

### 생성자 함수에 의한 객체 생성 방식의 장점
: 생성자 함수는 객체(인스턴스)를 생성하기 위한 템플릿처럼 사용되어, 동일한 구조를 가진 여러 객체를 간편하게 생성할 수 있다.
```
function Circle(radius) {
    this.radius = radius;
    this.getDiameter = function() {
        return 2 * this.radius;
    };
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```
> #### this
> this는 객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수다.
> 일반 함수로서 호출 -> 전역 객체
> 메서드로서 호출 -> 메서드를 호출한 객체
> 생성자 함수로서 호출 -> 생성자 함수가 생성할 인스턴스

생성자 함수는 다른 언어의 생성자와 달리 일반 함수처럼 정의하지만, new 연산자와 함께 호출되면 생성자 함수로 동작한다.

### 생성자 함수의 인스턴스 생성 과정
- 생성자 함수 몸체에서 수행해야 하는 것 : 인스턴스를 생성, 생성된 인스턴스를 초기화(프로퍼티 초기화 및 초기값 할당)

1. 인스턴스 생성과 this 바인딩
: new 연산자를 사용하면 생성된 인스턴스가 자동으로 this에 바인딩된다.

2. 인스턴스 초기화
: 생성된 인스턴스(this)에 프로퍼티와 메서드를 추가하고, 초기값을 할당한다.

3. 인스턴스 반환
: 암묵적으로 this가 반환된다. 명시적으로 다른 객체를 반환하는 경우, 해당 객체가 반환된다.
```
function Circle(radius) {
    // 1. 인스턴스 생성과 this 바인딩
    console.log(this); // Circle {}

    // 2. 인스턴스 초기화
    this.radius = radius;
    this.getDiameter = function() {
        return 2 * this.radius;
    };

    // 3. 인스턴스 반환
}

// 인스턴스 생성
const circle1 = new Circle(5);
```
```
function Circle(radius) {
  this.radius = radius;
  return {}; // this가 아닌 빈 객체가 반환됨
}

const circle = new Circle(5);
console.log(circle); // {}가 반환됨
```

### 내부 메서드 [[Call]]과 [[Construct]]
: 함수는 일반적인 함수로 호출할 수 있는 것뿐만 아니라, 생성자 함수로 호출할 수도 있다. 이는 함수가 객체이기 때문에 내부적으로 [[Call]]과 [[Construct]] 같은 메서드를 갖기 때문이다.
```
// 함수는 객체다.
function foo() {}

// 함수는 객체이므로 프로퍼티를 소유할 수 있다.
foo.prop = 10;

// 함수는 객체이므로 메서드를 소유할 수 있다.
foo.method = function() {
    console.log(this.prop);
};

foo.method(); // 10
```
: 함수는 일반 객체와는 달리 호출할 수 있으며, 이때 [[Call]] 또는 [[Construct]]가 호출된다. [[Call]]을 가진 함수는 callable이라고 하고, [[Construct]]를 가진 함수는 constructor라고 한다. [[Construct]]를 갖지 않는 함수는 non-constructor라고 한다.

### constructor와 non-constructor의 구분
- constructor: 함수 선언문, 함수 표현식, 클래스
- non-constructor: 메서드, 화살표 함수

### new 연산자
: new 연산자와 함께 함수를 호출하면 해당 함수는 생성자 함수로 동작한다. 즉, [[Construct]]가 호출되면서 객체가 생성된다.

### new.target
: new 연산자가 없이 생성자 함수가 호출되는 것을 방지하기 위해 `new.target`을 사용한다. 생성자 함수 내부에서 new.target을 사용하면 함수가 new와 함께 호출되었는지 확인할 수 있다. new와 함께 호출되면 함수 자신을 가리키고, 그렇지 않으면 undefined다.
```
function Circle(radius) {
    // new 연산자와 함께 호출되지 않았다면,
    if(!new.target) {
        // new 연산자와 함께 재귀 호출
        return new Circle(radius);
    }
    this.radius = radius;
    this.getDiameter = function() {
        return 2 * this.radius;
    };
}
```