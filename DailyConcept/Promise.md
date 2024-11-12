## 비동기
: 코드의 작업의 완료를 기다리지 않고, 동시에 실행할 수 있도록 하는 개념


## Promise
비동기 작업에도 순서가 필요할 때, 동기적인 작업이 필요할 때 콜백함수의 단점을 해결할 수 있는 `Promise` 함수를 사용한다. 

```jsx
function fetchDataA() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("A 작업 완료");
      resolve("A 결과");
    }, 1000);
  });
}

function fetchDataB() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("B 작업 완료");
      resolve("B 결과");
    }, 1000);
  });
}

fetchDataA()
  .then((resultA) => {
    console.log(resultA); // "A 결과" 출력
    return fetchDataB(); // B 작업을 A 작업 이후에 시작
  })
  .then((resultB) => {
    console.log(resultB); // "B 결과" 출력
  });

```

`Promise` 의 단점을 보완하기 위한 `async/await` 사용 (무한 체이닝, 에러처리의 어려움, 동기 코드 같지 않음)

## async/await
```jsx
async function fetchData() {
  try {
    const resultA = await fetchDataA();
    console.log(resultA);

    const resultB = await fetchDataB();
    console.log(resultB);

    const resultC = await fetchDataC();
    console.log(resultC);
  } catch (error) {
    console.error(error);
  }
}
```

## 에러처리의 차이점

- `Promsie` : `.then()` 과 `catch()` 활용
- `async/await` : `try{}catch(e){}`

## + Promise.all
: promise.all에 전달된 promise가 동시에 병렬로 실행된다. 모든 작업이 완료되면, 결과값이 배열로 반환한다. 하나라도 실패하면, 모든 작업이 멈추고, 에러 처리로 넘어가게된다.