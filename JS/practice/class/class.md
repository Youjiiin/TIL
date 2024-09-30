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