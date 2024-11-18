# 보간법
: 문자열 또는 데이터 템플릿 내에서 변수나 표현식을 삽입하고 처리하는 기술

## 왜?
- 동적 데이터 표시
- 변수, 함수 결과, 조건부 로직 삽입
- DOM 업데이트 없이 UI를 효율적으로 재렌더링

## 어떻게 사용?
`{{ 변수명 }}` 또는 `${ 변수명 }`으로 사용

- 템플릿 리터럴
```
const name = '유진';
console.log(`Hello, ${name}!`);
```

- JSX
```
const name = '유진';

return (
  <div>
    <p>Hello, {name}!</p>
  </div>
)
```

## 특징
- 표현식을 사용해야 함
  - 변수값, 메서드 리턴값 등 값만 사용
  - 삼항 연산자 (if X)
  - forEach(), map() (for X)
- html 코드는 삽입되지 않음, 사용하려면 `dangerouslySetInnerHTML`속성 사용 혹은 JSX를 사용하면 된다.
```
const App = () => {
  const msg = '<i>World</i>'; // HTML 문자열
  return (
    <span>
      Hello <span dangerouslySetInnerHTML={{ __html: msg }} />
    </span>
  );
};
```