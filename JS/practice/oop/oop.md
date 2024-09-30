## typeof
: 타입을 확인하기 위한 연산자
```
let a = 1;

console.log(typeof a); // number
```
```
// 특이한 점
console.log(typeof null); // "object"
```

## instanceof
: 객체 타입이 특정 타입인지 판단. 왼쪽에 객체를, 오른쪽에 타입을 명시해서 왼쪽 객체의 타입이 오른쪽에 명시한 타입인지 판단. true/false 값을 반환
```
console.log(10 instanceof Number); // false
console.log("hello" instanceof String); // false

console.log(new Number(10) instanceof Number); //true
console.log(new String("hello") instanceof String); // true
```
: 원시값은 객체가 아니기에 false. `Number`, `String`, `Boolean` 같은 래퍼 객체를 사용했기에 true (instanceof는 원시 값을 감싸는 객체(new Number(10))에서만 true를 반환)

- 다른 함수의 프로토타입을 그대로 자신의 프로토타입으로 지정하면 true
- 상위 객체를 생성해서 하위 프로토타입으로 지정하는 경우, 하위객체를 비교할 때 true, `상위객체 instanceof 하위생성자함수`의 경우에 false

## 프로퍼티 Descriptor
: **객체의 속성(프로퍼티)에 대한 정보를 담고 있는 객체**다. 자바스크립트의 모든 객체 프로퍼티에는 기본적으로 이러한 디스크립터가 존재하며, 이 디스크립터를 사용하면 **프로퍼티의 동작 방식을 제어**할 수 있다. 따로 지정하지 않아도 설명자가 추가되며 값은 true이다.
```
console.log(Object.getOwnPropertyDescriptor(obj, 'name'));
// {value: '장유진', writable: true, enumerable: true, configurable" true}
```

### `value`
: 프로퍼티에 대입된 값

### `writable`
: 프로퍼티 값을 수정할 수 있는지에 대한 여부.<br>
true일 경우, 값을 변경할 수 있고, false일 경우, 값을 변경할 수 없다.
```
Object.defineProperty(obj, 'age', {writable: false});
```

### `enumerable`
: 프로퍼티가 열거형으로 이용이 가능한지에 대한 여부. <br>
true일 경우, for...in 루프나 Object.keys()에서 해당 프로퍼티가 나타난다. false일 경우, 해당 프로퍼티는 열거되지 않는다.
```
Object.defineProperty(obj, 'age', {enumerable: false});
```

### `configurable`
: 프로퍼티의 설명자를 변경할 수 있는지에 대한 여부(구성 가능 여부)<br>
true일 경우, 프로퍼티를 삭제하거나 다른 속성(writable, enumerable, configurable)을 변경할 수 있다. false일 경우, 프로퍼티의 설정을 변경하거나 삭제할 수 없다.
```
Object.defineProperty(obj, 'age', {writable: false, configurable: false});
```

## new Object()
객체 생성 방식
- **객체 리터럴 방식**: {}를 사용하여 간단하게 객체를 생성하는 방식.
- **new Object() 방식**: Object 생성자 함수를 사용하여 객체를 생성하는 방식.

## Object.create()
: 모든 객체는 그 객체를 생성할 때 프로토타입을 가지고 있다. 객체 리터럴 방식으로 생성할 때는 `Object.prototype`이 자동으로 프로토타입으로 설정된다. <br>
하지만, 특정한 프로토타입을 명시적으로 지정하여 객체를 생성하고 싶을 때 `Object.create()`를 사용하면 된다. <br>
`Object.create()`를 사용하면 원하는 프로토타입을 기반으로 객체를 생성할 수 있으며, 특정 프로토타입을 재사용하는 개념이다.

```
let user2 = Object.create(Object.prototype, {
    name: { value: '장유진' },
    age: { value: 20 }
});
```
: `{value: ..., writable: ..., enumerable: ..., configurable: ...}`와 같은 형식으로 작성 가능하다. 이렇게 하면 원하는 디스크립터 속성들을 직접 설정할 수 있다.<br>

- **Object.create()**를 사용할 때, 새로운 객체의 프로토타입을 기존 객체로 설정하거나, 재사용 가능한 프로토타입으로 설정할 수 있다. 이는 객체 상속과 유사한 효과를 낸다.
```
let shape = { type: 'shape' };
let rect1 = Object.create(shape, {
    name: { value: 'rect1' },
    width: { value: 10 },
    height: { value: 10 }
});

console.log(rect1.type);  // 'shape', rect1이 shape을 상속받음
```
- `null`을 프로토타입으로 설정하면, 프로토타입 체인이 끊어지므로 상위 객체가 없는 객체가 생성된다. 이 객체는 __proto__가 없으며, 프로토타입 체인의 특성을 가지지 않는다.
```
let obj = Object.create(null);
console.log(obj.__proto__);  // undefined, 프로토타입 체인이 없음
```
이처럼 Object.create()는 명시적으로 프로토타입을 설정할 수 있는 강력한 도구로, 객체를 보다 유연하게 생성하고 관리할 수 있게 해준다.

## this
: 코드를 실행시키는 객체를 의미. 주로 함수 내에서 이용되며, 함수를 호출한 객체를 지칭하기 위해 this를 사용한다. <br>
JS에서는 함수가 호출된 방식에 따라 this가 달라지며, 동적으로 바인딩된다.

### 전역 위치
- 일반 모드에서는 `this`가 `window`가 지정된다.
- 엄격 모드에서는 `this`가 `undefined` 상태가 된다.
```
console.log(this);  // 일반 모드: window, 엄격 모드: undefined
```

## 함수 내
: 일반적으로 함수 내에서 다른 함수를 선언하고 호출하면, 그 내부 함수의 this는 전역 객체를 가리킨다. 즉, 함수 안에서 함수를 호출해도 this는 여전히 전역 객체를 참조한다.
```
function outerFunction() {
  console.log(this);  // 일반 모드에서는 window

  function innerFunction() {
    console.log(this);  // window
  }

  innerFunction();  // 내부 함수 호출
}

outerFunction();
```

### 객체 메서드
: 객체의 메서드가 호출될 때, 그 메서드 내부의 this는 해당 메서드를 호출한 객체를 참조한다.
```
const obj = {
  name: '장유진',
  sayHello: function() {
    console.log(this.name);  // '장유진'
  }
};

obj.sayHello();  // this는 obj를 가리키며 '장유진' 출력
```
: **obj.sayHello()**를 호출할 때, this는 obj 객체를 참조

### 생성자 함수
: new 연산자에 의해 호출되는 생성자 함수의 this는 새로 만들어지는 객체를 가리킨다.
```
function Person(name) {
  this.name = name;
}

const person = new Person('장유진');
console.log(person.name);  // '장유진'
```

### 화살표 함수
: **일반 함수에서는 this가 동적으로 바인딩**되지만, **화살표 함수의 this는 정적 바인딩**된다. 화살표 함수 내에서의 this는 선언 시점의 상위 스코프에 있는 this를 따르며, 이를 **렉시컬 바인딩**이라고 한다.
```
const obj = {
  name: '장유진',
  normalFunction: function() {
    console.log(this.name);  // 여기서 this는 obj를 가리킴
    
    const arrowFunction = () => {
      console.log(this.name);  // 상위 스코프의 this를 따름, obj를 가리킴
    };

    arrowFunction();  // '장유진' 출력
  }
};

obj.normalFunction();
```

- 전역 위치에 선언된 화살표 함수는 this가 전역 객체를 참조하지 않고, 상위 스코프를 따라간다. 전역 위치에 선언된 화살표 함수는 상위 스코프가 전역이므로, 브라우저 환경에서는 window를 가리킨다.
- 객체 리터럴 내에서 화살표 함수를 사용하면, 생성된 객체를 참조하지 못하고 상위 스코프의 this를 따른다.

## this의 동적 바인딩
: 동적 바인딩이란, 함수가 호출되는 시점에 this가 결정되는 것을 의미한다. 이를 통해 함수의 this를 다양한 객체에 바인딩해 사용할 수 있다.

### bind()
```
함수명.bind(객체명)
```
: bind()는 함수의 this를 특정 객체에 바인딩하고, 새로운 함수를 반환한다. 함수 호출 시 this를 고정하고 싶을 때 사용한다.
```
let obj = {
  name: '장유진'
};
let sayHello = function() {
  console.log(`Hello, ${this.name}`)
}

let newSayHello = sayHello.bind(obj);
newSayHello(); // Hello, 장유진
```
- bind()로 만든 함수는 새로운 매개변수를 받을 수 있으며, 미리 일부 매개변수를 고정할 수도 있다.
```
let sayHello = function(arg1, arg2) {
  console.log(`Hello, ${this.name}, ${arg1},${arg2}`)
}

let newSayHello = sayHello.bind(obj);
newSayHello(a, b); // Hello, 장유진, a, b
```
- bind()로 함수에 객체를 바인딩 시키면서 매개변수 값도 지정할 수 있다.
```
let sayHello = function(...arg) {
  console.log(`Hello, ${this.name}, ${arg}`)
}

let newSayHello = sayHello.bind(obj, a);
newSayHello(b); // Hello, 장유진, a, b
```

### call(), apply()
: bind()는 새로운 함수를 만드는 역할이고, **call()과 apply()는 함수에 객체를 바인딩 시키고 함수를 호출**까지 한다. -> 함수가 아닌, 함수를 호출한 결과 값
```
let sayHello = function() {
  console.log(`Hello, ${this.name}`);
  return 100;
}

console.log(sayHello.call(obj)); // 100
```
- 매개변수 값 전달 가능
- call()은 `함수.call(객체, 매개변수1, 매개변수2)`와 같은 형식
- apply()는 `함수.call(객체, [매개변수1, 매개변수2])`배열로 매개변수를 전달해야 한다.

## getter, setter
: getter는 프로퍼티 값을 읽을 때 호출되며, setter는 프로퍼티 값을 변경할 때 호출된다. 이 둘을 함께 사용하면, 하나의 프로퍼티를 통해 값의 읽기와 쓰기를 동시에 제어할 수 있다.
- getter : 프로퍼티 값을 참조할 때 호출 - `get 함수명() {...}`
- setter : 프로퍼티 값을 변경할 때 호출 - `set 함수명() {...}`
```
const obj = {
  _value: 0,  // 실제 값을 저장할 내부 변수

  get value() {
    return this._value;  // getter: _value 값을 반환
  },

  set value(newValue) {
    if (newValue > 0) {  // 새로운 값이 0보다 클 때만 설정
      this._value = newValue;
    }
  }
};

obj.value = 10;  // setter 호출 -> _value가 10으로 변경
console.log(obj.value);  // getter 호출 -> 10 출력
```
- getter와 setter는 하나의 프로퍼티에 대해 값의 읽기와 쓰기를 별도로 제어할 수 있어, 값의 유효성 검사를 하거나 특정 조건을 만족할 때만 값이 변경되도록 할 수 있다.
- getter만 정의하면 읽기 전용 프로퍼티가 되고, setter만 정의하면 쓰기 전용 프로퍼티가 된다.