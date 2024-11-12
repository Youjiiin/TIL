## 구조 분해 할당
: **구조 분해 할당 문법은 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 JavaScript 표현식**

- **배열**
```jsx
  const fruits = ['apple', 'berry', 'banana'];
  const [one, two, three] = fruits;
  console.log(one, two, three); // 'apple', 'berry'. 'banana'
```

- **객체**
```jsx
  const apple = {
    type: 'fruit',
    color: 'red',
    shape: 'circle'
  }

  const { type, color, shape } = apple;
  console.log(type, color, shape); // 'fruit', 'red', 'circle'
```

- **React: props**
```jsx
  const Greet = props => { 
    return (
      <div>
        <h1>
          Hello {props.name} a.k.a {props.heroName} 
        </h1>
      </div>
    )
  }
```