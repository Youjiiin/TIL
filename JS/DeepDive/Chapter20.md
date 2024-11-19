# 20장 strict mode

## 20.1 strict mode란?
: JS에는 잠재적인 오류를 발생시키는 경우가 많다. strict mode를 활용해 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시키는 것 <br/>
-> 요즘에는 `ESLint` 도구를 사용해 유사한 효과를 얻을 수 있다. 

## 20.2 strict mode 적용
전역의 선두 혹은 함수 몸체 선두에 `'use strict';`를 추가하면 적용할 수 있다.

## 20.3 전역에 strict mode를 적용하는 것은 피하자
: strict mode와 non-strict mode를 혼용하는 것은 오류를 발생시킬 수 있다. 외부 서드파티 라이브러리를 사용하면 non-strcit mode일 수 있기에 즉시 실행함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode를 적용한다.

## 20.4 함수 단위로 strict mode를 적용하는 것도 피하자
: 이 또한 혼용의 위험성

## 20.5 strict mode가 발생시키는 에러
- 암묵적 전역: 선언하지 않은 변수를 참조하면 ReferenceError
- 변수, 함수, 매개변수의 삭제: delete 연산자로 변수, 함수, 매개변수를 삭제하면 SynctaxError
- 매개변수 이름의 중복: SyntaxError
- with문 사용: SyntaxError

## 20.6 strict mode 적용에 의한 변화
- 일반 함수의 this: 함수를 일반 함수로 호출하면 this에 undefined가 바인딩된다. 에러는 발생하지 않는다.
- arguments 객체: 매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않는다.

## 정리(소감)
TypeScript가 도입되고 많이 사용되면서 strict mode가 기본적으로 적용되어 있다. 또한, 화살표 함수 및 스프레드 문법이 ES6에 도입되면서 자주 발생하지 않는 일이긴 하다. 