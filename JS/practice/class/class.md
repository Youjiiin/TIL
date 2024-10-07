# Class
: **객체의 모형(설계도)**를 선언하고 그 모형을 이용해 객체를 만드는 또 다른 방법이다. 클래스는 객체 지향 프로그래밍에서 중요한 개념으로, 객체를 생성하기 위한 청사진 역할을 한다.
```
class User {
    name = '장유진';
    sayHello() {
        console.log(`Hello ${this.name}`);
    }
}

let obj = new User();  // User 클래스의 인스턴스 생성
obj.sayHello();  // "Hello 장유진"
```
- 클래스는 `생성자`, `프로퍼티`, `메서드`로 구성된다.

## 생성자
- 생성자는 객체를 생성할 때 호출되며, 클래스의 프로퍼티를 초기화하고 메서드를 메모리에 할당하는 역할을 한다.
- `new 연산자`를 이용할 때 생성자가 자동으로 호출되며, 생성자가 없는 클래스는 존재할 수 없다.
- 생성자를 명시적으로 추가할 때는 `constructor()` 메서드를 사용하며, 매개변수를 가질 수 있다. 클래스 내에 하나의 생성자만 정의할 수 있다.
```
class User {
    constructor(name) {  // 생성자 정의
        this.name = name;  // 생성자를 통해 프로퍼티 초기화
    }

    sayHello() {
        console.log(`Hello ${this.name}`);
    }
}

let obj = new User('유진');  // 생성자를 통해 name에 '유진' 전달
obj.sayHello();  // "Hello 유진"
```

### 기본생성자 
: 생성자를 명시적으로 추가하지 않으면, 기본 생성자가 자동으로 제공된다. 이 기본 생성자는 매개변수를 받지 않으며, 빈 객체를 생성한다.
```
class User {}

let user = new User();  // 기본 생성자 호출
console.log(user);  // 빈 객체 출력: User {}
```

## 객체 멤버
- 객체 멤버는 객체가 가져야 하는 프로퍼티와 메서드를 의미하며, 클래스 내에 정의된다. 클래스에서 정의된 프로퍼티와 메서드는 인스턴스가 생성될 때 그 인스턴스의 메모리에 할당된다.

### 프로퍼티 (Property)
: 클래스에서 프로퍼티는 일반적으로 생성자 내에서 `this.프로퍼티명`을 사용해 선언한다. 그러나 클래스 영역에서도 직접 선언할 수 있다. 이 경우 모든 인스턴스는 해당 기본 값을 가진다.
```
class User {
    age = 20;  // 클래스 영역에서 프로퍼티 선언

    constructor(name) {
        this.name = name;  // 생성자에서 프로퍼티 초기화
    }
}
let user = new User('유진');
console.log(user.name);  // "유진"
console.log(user.age);   // 20
```

### 메서드 (Method)
: 클래스 내에서 메서드는 생성자 밖에 선언하며, 이를 통해 객체가 동작할 수 있는 로직을 정의한다. 메서드를 선언할 때는 `function` 예약어를 사용하지 않으며, 클래스 내에서는 메서드명만 적어 정의한다.
```
class User {
    constructor(name) {
        this.name = name;
    }

    sayHello() {  // 메서드는 클래스 영역에 정의
        console.log(`Hello ${this.name}`);
    }
}

let user = new User('유진');
user.sayHello();  // "Hello 유진"
```

- 외부에서 멤버 추가: 객체 생성 후에도 클래스 외부에서 멤버를 추가할 수 있다. 이렇게 추가된 멤버는 인스턴스에만 적용된다.
```
let user = new User('유진');
user.age = 25;  // 외부에서 프로퍼티 추가
console.log(user.age);  // 25

user.sayGoodbye = function() {  // 외부에서 메서드 추가
    console.log('Goodbye!');
};
user.sayGoodbye();  // "Goodbye!"
```

### private 멤버
- **Private 멤버는 클래스 외부에서 접근할 수 없도록 보호된 프로퍼티나 메서드**를 의미한다. 이를 통해 데이터 은닉을 실현할 수 있으며, 객체 지향 프로그래밍의 중요한 원칙인 캡슐화를 지원한다.
- 자바스크립트에서는 `#` 기호를 사용하여 private 멤버를 선언할 수 있으며, 이는 ES6 이후 도입된 기능이다.
```
class User {
    #name;  // private 프로퍼티 선언

    constructor(name) {
        this.#name = name;
    }

    sayHello() {
        console.log(`Hello ${this.#name}`);
    }
}

let user = new User('유진');
console.log(user.#name);  // Error: private 멤버는 외부에서 접근 불가
user.sayHello();  // "Hello 유진"
```

### Static 멤버
- **Static 멤버는 클래스 자체에 속하는 프로퍼티나 메서드**를 의미하며, 인스턴스가 아닌 클래스에서 직접 호출할 수 있다.
- static 키워드를 사용하여 선언하며, 해당 멤버는 인스턴스가 아닌 클래스 자체에 속하게 된다.

## 상속
- 상속은 기존 클래스의 기능을 확장하여 새로운 클래스를 만드는 기법이다. **부모 클래스의 프로퍼티와 메서드를 자식 클래스에서 그대로 사용할 수 있다.**
- 자바스크립트에서 extends 키워드를 사용하여 상속을 구현할 수 있다.
```
class Person {
    constructor(name) {
        this.name = name;
    }

    introduce() {
        console.log(`Hi, I'm ${this.name}`);
    }
}

class Student extends Person {
    constructor(name, studentId) {
        super(name);  // 부모 클래스의 생성자 호출
        this.studentId = studentId;
    }

    study() {
        console.log(`${this.name} is studying.`);
    }
}

let student = new Student('유진', 'S123');
student.introduce();  // "Hi, I'm 유진"
student.study();  // "유진 is studying."
```

### super
: `super`는 부모 클래스의 생성자 또는 메서드를 호출할 때 사용된다. 자식 클래스의 생성자에서는 `super()`를 호출하여 부모 클래스의 생성자를 실행해야 한다.
```
class Parent {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(`Hello, ${this.name}`);
    }
}

class Child extends Parent {
    constructor(name, age) {
        super(name);  // 부모 클래스의 생성자 호출
        this.age = age;
    }

    greet() {
        super.greet();  // 부모 클래스의 greet 메서드 호출
        console.log(`I am ${this.age} years old.`);
    }
}

let child = new Child('유진', 20);
child.greet();
// "Hello, 유진"
// "I am 20 years old."
```

## 클로저
: 클로저는 함수가 선언된 렉시컬 환경을 기억하여, 외부 함수의 변수에 접근할 수 있게 해주는 함수이다. 클로저는 외부 함수가 실행된 이후에도 변수를 유지하며, 외부 스코프의 변수를 참조할 수 있다. 즉, 클로저는 내부 함수가 외부 함수의 변수에 접근할 수 있게 해주며, 이 변수는 외부 함수가 종료된 후에도 메모리에 남아 있는 상태가 됩니다.
```
function outer() {
    let count = 0;
    
    return function inner() {
        count++;
        console.log(count);
    };
}

const counter = outer();
counter();  // 1
counter();  // 2
```
1. 데이터 은닉: 클로저를 사용하면 외부에서 직접 접근할 수 없는 변수를 관리할 수 있습니다. 외부 함수의 변수를 내부 함수에서만 접근할 수 있도록 하여 데이터를 은닉할 수 있습니다.
2. 상태 유지를 통한 함수 확장: 클로저를 통해 함수가 특정 상태를 기억할 수 있으므로, 특정 작업을 하는 함수를 만들 때 유용합니다. 예를 들어, API 호출 횟수, 게임 점수 등 상태를 계속 유지해야 하는 경우에 클로저를 사용할 수 있습니다.

### 실행 컨텍스트
: 실행 컨텍스트는 자바스크립트 코드가 실행되는 환경을 의미하며, 코드가 실행될 때마다 생성된다. 실행 컨텍스트는 변수 객체, this, 스코프 체인 등의 정보를 포함하고 있다.

### 렉시컬 환경과 클로저
- 렉시컬 환경은 코드가 작성된 위치에 따라 변수의 스코프가 결정되는 환경을 의미한다.
- 클로저는 이러한 렉시컬 환경을 활용하여 함수가 외부 스코프의 변수를 참조하고 유지할 수 있게 한다.

## 캡슐화
: 캡슐화는 객체의 내부 상태를 외부에서 직접 접근할 수 없도록 하고, 메서드를 통해서만 접근할 수 있도록 하는 개념이다. 이를 통해 객체의 상태를 보호할 수 있으며, 자바스크립트에서는 private 멤버와 getter/setter를 사용하여 캡슐화를 구현할 수 있다.
```
class User {
    #age;

    constructor(age) {
        this.#age = age;
    }

    get age() {
        return this.#age;
    }

    set age(value) {
        if (value > 0) {
            this.#age = value;
        }
    }
}

let user = new User(20);
console.log(user.age);  // 20
user.age = -1;  // 유효하지 않은 값, 설정되지 않음
console.log(user.age);  // 20
```