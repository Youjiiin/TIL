# 10장 객체 리터럴

## 10.1 객체란?
자바스크립트는 객체 기반의 프로그래밍 언어(객체지향언어)이며, 자바스크립트를 구성하는 거의 **모든 것**이 객체다. 원시 값을 제외한 나머지 값(함수, 배열, 정규표현식 등)은 모두 객체다. `원시 값`은 **변경 불가능한 값**이지만, `객체`는 **변경 가능한 값**이다. 객체는 0개 이상의 프로퍼티로 구성된 집합이며, 프로퍼티는 키와 값으로 구성된다. <br/>
![alt text](./img/image9.png.png)<br/>
- 프로퍼티 : 객체의 상태를 나타내는 값
- 메서드 : 프로퍼티(상태 데이터)를 참조하고 조작할 수 있는 동작

## 10.2 객체 리터럴에 의한 객체 생성
자바스크립트는 다른 언어와 달리 다양한 객체 생성 방법을 지원한다.
- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스(ES6)
이 중 가장 일반적이고 간단한 방법은 **객체 리터럴**을 사용하는 방법이다.
```
let person = {
    name: 'Jang',
    sayHello : function () {
        console.log(`Hello! My name is ${this.name}`)
    }
}
```
- 객체 리터럴의 중괄호는 코드 블록을 의미하지 않는다. 그렇기에 마지막에 세미콜론(;)을 붙인다. 

## 10.3 프로퍼티
객체는 프로퍼티의 집합이며, 프로퍼티는 키와 값으로 구성된다.
```
let person = {
    // 프로퍼티 키는 name, 프로퍼티 값은 'Jang'
    name: 'Jang',
    // 프로퍼티 키는 age, 프로퍼티 값은 25
    age: 25
}
```
: 프로퍼티를 나열할 때는 쉼표(,)로 구분한다. 마지막에는 사용해도 좋고 안해도 된다. 
- 프로퍼티 키 : 빈 문자열을 포함하는 모든 문자열 또는 심벌 값
- 프로퍼티 값 : 자바스크립트에서 사용할 수 있는 모든 값
```
let person = {
    firstName: 'Yujin',
    // last-name은 식별자 네이밍 규칙을 따르지 않기에 따옴표로 감싸줘야 한다.
    // 감싸주지 않으면 연산자로 계산됨
    'last-name': 'Jang'
};
```

- 프로퍼티 동적 생성
```
let obj = {};
let key = 'hello';

//ES5
obj[key] = 'world';
//ES6
let obj = { [key]: 'world' };
```
- 프로퍼티 키에 문자열이나 심벌 값 이외의 값을 사용하면 암묵적 타입 변환을 통해 문자열이 된다. 
- 빈 문자열, 예약어를 프로퍼티 키로 사용해도 되나, 권장하지는 않는다. 
- 이미 존재하는 프로퍼티 키를 중복 선언하면 나중에 선언한 프로퍼티가 덮어쓴다.

## 10.4 메서드
프로퍼티 값이 함수일 경우 함수와 구분하기 위해 `메서드`라 부른다. 
```
let circle = {
    // 프로퍼티
    radius: 5,

    // 메서드
    getDiameter: function () {
        return 2 * this.radius;
    }
};
```

## 10.5 프로퍼티 접근
- 마침표 프로퍼티 접근 연산자(.)를 사용하는 **마침표 표기법**
- 대괄호 프로퍼티 접근 연산자([...])를 사용하는 **대괄호 표기법**

```
let person = {
    name: 'Jang'
};

// 마침표 표기법
console.log(person.name);
// 대괄호 표기법
console.log(person['name']);
```
: 대괄호 프로퍼티 접근 연산자 내부에 지정하는 프로퍼티 키는 반드시 따옴표로 감싼 문자열이어야 한다.<br/>
객체에 존재하지 않는 프로퍼티에 접근하면 `undefined`를 반환한다.

## 10.6 프로퍼티 값 갱신
이미 존재하는 프로퍼티에 값을 할당하면 프로퍼티 값이 갱신된다.
```
let person = {
    name: 'Jang'
};

// person 객체에 name 프로퍼티가 존재하므로 name 프로퍼티의 값이 갱신된다.
person.name = 'Ryu'

console.log(person); // {name: 'Ryu}
```

## 10.7 프로퍼티 동적 생성
존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성되어 추가되고 프로퍼티 값이 할당된다.
```
let person = {
    name: 'Jang'
};

// 동적 생성
person.age = 25;

console.log(person); //{nmae: 'Jang', age: 25}
```

## 10.8 프로퍼티 삭제
**delete 연산자**는 객체의 프로퍼티를 삭제한다. 
```
let person = {
    name: 'Jang'
};

// 프로퍼티 동적 생성
person.age = 25;

// 프로퍼티 삭제
delete person.age;

// 존재하지 않는 프로퍼티를 삭제할 수 없다. 에러는 발생하지 않는다.
delete person.address;

console.log(person); // {nmae: 'Jang'}
```

## 10.9 ES6에서 추가된 객체 리터럴의 확장 기능
- 프로퍼티 축약 표현
```
// ES5
let x = 1, y = 2;

let obj = {
    x: x,
    y: y
};

console.log(obj); //{x: 1, y: 2}

//ES6
let x = 1, y = 2;

let obj = { x, y };

console.log(obj); //{x: 1, y: 2}
```

- 계산된 프로퍼티 이름
```
// ES5
let prefix = 'prop';
let i = 0;

let obj = {};

// 계산된 프로퍼티 이름으로 프로퍼티 키 동적 생성
obj[perfix + '-' + ++i] = i;
obj[perfix + '-' + ++i] = i;
obj[perfix + '-' + ++i] = i;

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}

// ES6
const prefix = 'prop';
let i = 0;

// 객체 리터럴 내부에서 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성
const obj = {
    [`${prefix}-${++i}`]: i,
    [`${prefix}-${++i}`]: i,
    [`${prefix}-${++i}`]: i,
};

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```

- 메서드 축약 표현
```
//ES5
let obj = {
    name: 'Jang',
    sayHi: function () {
        console.log('Hi! ' + this.name);
    }
};
obj.sayHi(); // Hi! Jang

//ES6
const obj = {
    name: 'Jang',
    sayHi() {
        console.log('Hi! ' + this.name);
    }
}
obj.sayHi(); // Hi! Jang
```