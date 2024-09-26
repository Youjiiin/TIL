## typeof
: 타입을 확인하기 위한 연산자
```
let a = 1;

console.log(typeof a); // number
```

## instanceof
: 객체 타입이 특정 타입인지 판단. 왼쪽에 객체를, 오른쪽에 타입을 명시해서 왼쪽 객체의 타입이 오른쪽에 명시한 타입인지 판단. true/false 값을 반환
```
console.log(10 instanceof Number); // false
console.log("hello" instanceof String); // false

console.log(new Number(10) instanceof Number); //true
console.log(new String("hello") instanceof String); // true
```
: 원시값은 객체가 아니기에 false. `Number`, `String`, `Boolean` 같은 래퍼 객체를 사용했기에 true

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
하지만, 경우에 따라 `Object.prototype`이 아닌, 특정한 프로토타입을 명시적으로 지정하여 객체를 생성하고 싶을 때가 있는데, 이때 `Object.create()`를 사용하면 된다. <br>
`Object.create()`를 사용하면 원하는 프로토타입을 기반으로 객체를 생성할 수 있으며, 특정 프로토타입을 재사용하는 개념이다.

```
let user2 = Object.create(Object.prototype, {
    name: {value: '장유진'},
    age: {value: 20}
});
```
: `{value: ..., writable: ..., enumerable: ..., configurable: ...}`와 같은 형식으로 작성 가능하다. <br>

- **Object.create()**를 사용할 때, 새로운 객체의 프로토타입을 Shape.prototype처럼 재사용 가능한 프로토타입으로 설정할 수 있다. 이렇게 하면 상속과 같은 개념을 적용할 수 있게 된다.
```
let rect1 = Object.create(Shape.prototype, {
    name: {value: 'rect1'},
    width: {value: 10},
    height: {value: 10}
});
```