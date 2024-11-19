# 프로토타입
: JS는 클래스와(ES6에는 존재) 상속 public, private, protected 등의 캡슐화를 위한 키워드가 없어 객체지향언어가 아니라 오해를 하지만, JS는 프로토타입 기반의 객체지향 언어이다.

## 19.1 객체지향 프로그래밍
: **객체의 집합**으로 프로그램을 표현하려는 프로그래밍 패러다임을 말한다. 객체란, **상태 데이터와 동작을 하는 하나의 논리적인 단위로 묶은 복합적인 자료구조**이다.

## 19.2 상속과 프로토타입
생성자 함수를 통해 여러개의 인스턴스(객체)를 생성했을 때, 프로퍼티 값은 모두 달라도 되고, 다를 수 있으나 메서드는 동일한 내용이기에 단 하나만 생성해서 모든 인스턴스가 공유하는 것이 바람직하다. 객체안에서 메서드를 정의하면 인스턴스가 생성될 때마다 동일한 메서드를 생성하므로 메모리를 불필요하게 낭비한다.<br>
이때, 프로토타입을 기반으로 상속을 구현할 수 있다.
```
// 생성자 함수
function Circle(radus) {
    this.radius = radius;
    this.getArea = function() {
        return Math.PI * this.radius ** 2;
    };
}

const c1 = new Circle(1);
const c2 = new Circle(2);
// 동일한 메서드가 계속 생성


// 생성자 함수
function NewCircle(raidus) {
    this.radius = radius;
}

// 메서드 공유 - 프로토타입에 추가, 프로토타입은 NewCircle 생성자 함수의 prototype 프로퍼티에 바인딩 되어있다.
NewCircle.prototype.getArea = function() {
    return Math.PI * this.radius ** 2;
}

const c3 = new NewCircle(3);
const c4 = new NewCircle(4);

console.log(c3.getArea === c4.getArea); // true
```
![상속에 의한 메서드 공유](./img/image15.png) <br>
: NewCircle 생성자 함수가 생성한 모든 인스턴스는 자신의 프로토타입, 즉 상위 객체 역할을 하는 NewCircle.prototype의 모든 프로퍼티와 메서드를 상속받는다. 이는 **코드의 재사용** 관점에서 매우 유용

## 19.3 프로토타입 객체
: 프로토타입 객체는 객체간 상속을 구현하기 위해 사용. 객체의 상위 객체 역할을 하며 다른 객체에 공유 프로퍼티를 제공한다. <br>
모든 객체는 `[[Prototype]]`이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 프로토타입의 참조다. 객체가 생성될때마다 생성 방식에 딸 프로토타입이 결정되고 `[[Prototype]]`에 저장된다. <br>
모든 객체는 프로토타입을 가지며, 이 프로토타입은 해당 객체의 생성자 함수와 연결되어 있다<br>
![프로토타입과 생성자함수는 연결되어있다.](./img/image16.png) <br>
`[[Prototype]]`에 직접 접근할 수 없고, `__proto__` 접근자 프로퍼티를 통해 프로토타입에 간접적으로 접근할 수 있다.<br>

콘솔에 객체를 출력하면 다음과 같은 프로토타입을 확인할 수 있다.
```
[[Prototype]]: Object
constructor: ƒ Object()
hasOwnProperty: ƒ hasOwnProperty()
isPrototypeOf: ƒ isPrototypeOf()
propertyIsEnumerable: ƒ propertyIsEnumerable()
toLocaleString: ƒ toLocaleString()
toString: ƒ toString()
valueOf: ƒ valueOf()
__defineGetter__: ƒ __defineGetter__()
__defineSetter__: ƒ __defineSetter__()
__lookupGetter__: ƒ __lookupGetter__()
__lookupSetter__: ƒ __lookupSetter__()
__proto__: (...)
get __proto__: ƒ __proto__()
set __proto__: ƒ __proto__()
```

### `__proto__`는 접근자 프로퍼티다.
접근자 프로퍼티(`__proto__`)는 자체적인 값을 갖지 않고 다른 데이터 프로퍼티 값을 읽거나 저장할 때 사용하는 접근자 함수(`[[Get]]``[[Set]]`)로 구성된 프로퍼티이다. 접근자 함수를 통해 취득, 할당한다. 
```
const obj = {};
const parent = { x: 1 };

obj.__proto__;
obj.__proto__ = parent;

console.log(obj.x); //1
```

### `__proto__` 접근자 프로퍼티는 상속을 통해 사용된다.
: `__proto__` 접근자는 객체가 직접 소유하는 프로퍼티가 아니라 Object.prototype의 프로퍼티다. `Object - Object.prototype - Object.prototype.__proto__` 의 프로토타입 체인으로 구성되어있다. 

### `__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유
: 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위함이다. 프로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다. 서로를 참조하게되면 체인의 종점이 존재하지 않기 때문에 프로퍼티 검색 시, 무한 루프에 빠진다.

### `__proto__` 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않음
: 모든 객체가 `__proto__` 접근자 프로퍼티를 사용할 수 있는 것이 아니기 때문. 직접 상속을 통해 Object.prototype을 상속받지 않는 객체를 생성할 수도 있다.

- 함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다. 따라서 non-constructor인 화살표 함수와 ES6 메서드 축약 표현으로 정의한 메서드는 prototype 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않는다. 생성자 함수로 호출하기 위해 정의하지 않은 일반함수(함수 선언문, 함수 표현식)도 prototype 프로퍼티를 소유하지만 객체를 생성하지 않는 일반 함수의 prototype 프로퍼티는 의미가 없다.<br>
모든 객체가 가지고 있는 `__proto__` 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 결국 동일한 프로토타입을 가리키지만, 사용하는 주체가 다르다.<br>
| 구분          | 소유       | 값                   | 사용 주체   | 사용 목적                                                           |
|---------------|------------|----------------------|-------------|--------------------------------------------------------------------|
| `__proto__`   | 모든 객체  | 프로토타입의 참조     | 모든 객체   | 객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용             |
| `prototype`   | constructor| 프로토타입의 참조     | 생성자 함수 | 생성자 함수가 자신이 생성한 객체(인스턴스)의 프로토타입을 할당하기 위해 사용 |
![alt text](./img/image17.png)<br>

- 모든 프로토타입은 constructor 프로퍼티를 갖고 이는 prototype 프로퍼티로 생성자 함수를 가리킨다. <br>
![alt text](./img/image18.png)<br>
-> 무한 사이클? Person.prototype.constructor가 다시 Person을 참조하는 구조는 단지 생성된 객체가 자신의 생성자를 참조할 수 있게 하는 메커니즘일 뿐

> 근데 `__proto__` 방식은 구식이라고 합니다. 

## 19.4 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입
```
// 객체 리터럴 + 함수리터럴, 배열 리터럴, 정규표현식 리터럴...
const obj = {};

// 리터럴로 선언된 객체의 생성자 함수는 Object 생성자 함수다.
console.log(obj.constructor === Object); //true
```
: 리터럴 표기법으로 생성된 객체도 실제로는 자바스크립트에서 내부적으로 생성자 함수와 프로토타입을 사용하여 생성됩니다. 예를 들어, 객체 리터럴 {}로 만든 객체는 Object 생성자 함수를 통해 만들어지며, 이 객체의 프로토타입은 `Object.prototype`에 연결됩니다. 즉, 생성자 함수를 명시적으로 사용하지 않아도 자바스크립트는 내부적으로 생성자 함수와 프로토타입을 활용하여 객체를 생성합니다.

## 19.5 프로토타입의 생성 시점
: 프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다. 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재하기 때문이다. 

### 사용자 정의 생성자 함수와 프로토타입 생성 시점
생성자 함수로서 호출할 수 있는 함수, 즉 **constructor**는 함수 정의가 평가되어 **함수 객체를 생성하는 시점에 프로토타입도 함께 생성됨** <br>
생성자 함수로서 호출할 수 없는 함수, 즉 **non-constructor**는 **프로토타입이 생성되지 않는다**.

### 빌트인 생성자 함수와 프로토타입 생성 시점
Object, String, Number, Function ... 등과 같은 빌트인 생성자 함수도 일반 함수와 마찬가지로 빌**트인 생성자 함수가 생성되는 시점에 프로토타입이 생성된다**. <br>

객체가 생성되기 이전에 생성자 함수와 프로토타입은 이미 객체화되어 존재한다. 이후 생성자 함수또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 생성된 객체의 `[[Prototype]]` 내부 슬롯에 할당된다. 이로써 생성된 객체는 프로토타입을 상속받는다.

## 19.6 객체 생성 방식과 프로토타입의 결정
: 객체는 생성 방식의 차이가 있지만, 추상연산 `OrdinaryObjectCreate`에 의해 생성된다. 그리고 이는 자신이 생성할 객체의 프로토타입을 인수로 전달받고 이후 자신이 생성한 객체의 `[[Prototype]]` 내부 슬록에 할당한다.

### 객체 리터럴
- 객체 리터럴로 생성된 객체는 Object.prototype을 상속받는다.
- 객체 리터럴로 작성한 코드는 내부적으로 Object 생성자 함수와 동일한 동작을 수행한다.

### Object 생성자 함수
- Object 생성자 함수로 생성된 객체는 Object.prototype을 상속받는다.
예: const obj = new Object();의 경우에도 obj는 Object.prototype을 참조하게 된다.

### 생성자 함수
- 생성자 함수로 생성된 객체는 생성자 함수의 prototype 프로퍼티에 바인딩된 객체를 상속받는다.
```
function MyConstructor() {}
const instance = new MyConstructor();
```
- 이 경우, instance는 MyConstructor.prototype에 바인딩된 객체를 상속받는다.
- 생성자 함수의 prototype에 새로운 프로퍼티를 추가하면 이를 생성된 객체들이 상속받는다.

## 19.7 프로토타입 체인
: 객체가 다른 객체의 속성과 메서드를 상속받는 메커니즘

- 프로토타입 객체
  - 모든 함수(예: Person)는 생성될 때 기본적으로 연결된 prototype 객체를 가집니다.
  - 이 prototype 객체에 속성이나 메서드를 추가하면, 해당 생성자로 만들어진 객체들(예: me)이 이를 상속받아 사용할 수 있습니다.

- 프로토타입 체인 동작
  - 객체(예: me)에서 속성(예: name)이나 메서드(예: sayHello)를 호출하면, 먼저 객체 자체에서 해당 속성을 찾습니다.
  - 만약 찾지 못하면, 객체의 __proto__(또는 내부적으로 [[Prototype]])를 따라 prototype 객체로 이동해 찾습니다.
  - 이 과정을 반복하며 체인을 따라 올라가고, 최종적으로 Object.prototype에 도달합니다.

- 예시
```
function Person(name) {
    this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');

// hasOwnProperty는 Object.prototype의 메서드다.
console.log(me.hasOwnProperty('name')); // true
```
  - me.hasOwnProperty('name'): hasOwnProperty는 Object.prototype에 정의된 메서드입니다. 프로토타입 체인을 따라 Object.prototype에서 메서드를 찾고 실행합니다.
  - me.sayHello(): sayHello는 Person.prototype에 정의되어 있으므로 프로토타입 체인을 따라 실행됩니다.

## 19.8 오버라이딩과 프로퍼티 섀도잉
> 오버라이딩: 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식
> 오버로딩: 함수의 이름은 동일하지만 매개변수의 타입 또는 개수가 다른 메서드를 구현하고 매개변수에 의해 메서드를 구별하여 호출하는 방식. JS에서는 arguments 객체를 사용해 구현할 수 있다.
```
const Person = (function () {
    // 생성자 함수
    function Person(name) {
        this.name = name;
    }

    // 프로토타입 메서드
    Person.prototype.sayHello = function () {
        console.log(`Hi! My name is ${this.name}`);
    };

    // 생성자 함수를 반환
    return Person;
})();

const me = new Person('Lee');

// 인스턴스 메서드
me.sayHello = function () {
    console.log(`Hey! My name is ${this.name}`);
};

// 인스턴스 메서드가 호출된다. 프로토타입 메서드는 인스턴스 메서드에 의해 가려진다.
me.sayHello(); // Hey! My name is Lee
```
: 프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가하면 덮어쓰는게 아닌, 인스턴스 프로퍼티로 추가한다. 이때, sayHello를 오버라이딩 했고 프로토타입 메서드는 가려지게된다. => **프로퍼티 섀도잉**

- 하위 객체를 통해 프로토타입의 프로퍼티를 변경 또는 삭제할 수 없다. 프로토타입 체인으로 접근하는 것이 아니라 직접 접근해야한다.

## 19.9 프로토타입의 교체
: 프로토타입은 생성자 함수 또는 인스턴스에 의해 교체할 수 있다.

### 생성자 함수
```
const Person = (function () {
    function Person(name) {
        this.name = name;
    }

    // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
    Person.prototype = {
        sayHello() {
            console.log(`Hi! My name is ${this.name}`);
        }
    };

    return Person;
})();

const me = new Person('Lee');
```
: 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수간의 연결이 파괴되는데, 프로토타입으로 교체한 객체 리터럴에 constructor 프로퍼티를 추가하여 프로토타입의 constructor 프로퍼티를 되살린다.

### 인스턴스
:`__proto__` 접근자 프로퍼티를 통해 접근할 수 있다. 생성자 함수의 prototype 프로퍼티에 다른 임의의 객체를 바인딩하는 것은 미래에 생성할 인스턴스의 프로토타입을 교체하는 것이다.

## 19.10 instanceof 연산자
: 좌변 - 객체를 가리키는 식별자, 우변 - 생성자 함수를 가리키는 식별자 => 우변의 생성자 함수의 prototype에 바인딩된 객체가 좌변의 객체의 프로토타입 체인 상에 존재하면 true 아니면 false
```
console.log(me instanceof Person);
```

## 19.11 직접 상속
- `Object.create`에 의한 직접 상속: 프로토타입 체인에 속하는 객체를 생성한다.
  - new 연산자가 없이도 객체를 생성할 수 있다.
  - 프로토타입을 지정하면서 객체를 생성할 수 있다.
  - 객체 리터럴에 의해 생성된 객체도 상속받을 수 있다.

- 객체 리터럴 내부에서 `__proto__`

## 19.12 정적 프로퍼티/메서드
: 생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 프로퍼티/메서드
```
// 프로토타입 메서드
Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
};

// 정적 프로퍼티
Person.staticProp = 'static prop';

// 정적 메서드
Person.staticMethod = function() {
  console.log('staticMethod');
}
```
생성자 함수가 생성한 인스턴스는 자신의 프로토타입 체인에 속한 객체의 프로퍼티/메서드에 접근할 수 있다. 하지만 정적 프로퍼티/메서드는 인스턴스의 프로토타입 체인에 속한 객체의 프로퍼티/메서드가 아니므로 인스턴스에 접근할 수 없다.

## 19.13 프로퍼티 존재 확인
- `in` 연산자
: 객체 내에 특정 프로퍼티가 존재하는지 여부를 확인 -> `key in object`
- `Object.prototype.hasOwnProperty`
: in과 마찬가지 -> `person.hasOwnProperty('name')`

## 19.14 프로퍼티 열거
- `for...in`: 객체의 모든 프로퍼티를 순회하며 열거 -> `for(변수선언문 in 객체) {...}` 
  - 상속받은 프로퍼티도 열거
- `Object.keys/values/entries`: 자신의 고유 프로퍼티만 열거

## 정리(소감)
### Prototype은 어디에 사용되는가? 자주 사용되는가?
- 메모리 효율적인 메서드 공유, 객체 상속 구현에 주로 사용된다.
-> class개념이 나오면서 상속을 캡슐화하여 더 직관적으로 사용된다.

### 그럼 왜 학습해야하나?
: class 자체가 프로토타입 기반으로 설계되었기 때문.

### 마무리
: 상속과 클래스에 대입해 생각해보며 기본 동작원리에 대해서 정리할 수 있었다.