## 함수와 메서드
약간의 차이가 있는데 **클래스 내의 함수를 메서드**라 칭한다. `함수(function)`는 작성된 기능에 초점을 맞춘 단어이고, `메서드(method)`는 클래스를 이용하는 수단으로 본다는 용어이다.

## Parameter vs Argument
- `Parameter` : 함수를 선언하는 입장에서 그 함수를 호출하는 곳에 전달하는 값을 받기 위해 선언되는 변수 = 매개변수
- `Argument` : 함수를 이용하는 곳에서 그 함수를 호출하면서 전달하는 값
=> 함수를 선언하면서 Parameter를 선언하고 외부에서 함수를 호출하면서 Parameter에 Argument를 전달해서 실행한다.

> default parameter
> 함수를 선언하면서 매개변수에 기본 값을 대입할 수 있다.
> `function f(arg1, arg2 = 0) {}`

> reset parameter
> 나머지 매개변수 - 하나의 매개변수 이지만 여러 개의 값을 가질 수 있는 매개변수가 됨으로 내부적으로 배열로 만들어진다.
> `function f(arg1, ...arg2) {}`

## 함수 표현식
함수가 변수처럼 선언되는 것
```
const f1 = function() {
    console.log('function1');
}

f1(); // 함수 호출
```
- 화살표 함수(람다 함수)도 함수 표현식이다. `const f2 = () => console.log('function2')`
- 호이스팅이 되지 않는다.

## 함수 선언문
```
function f3() {
    console.log('function3');
}
```
- 호이스팅이 된다.