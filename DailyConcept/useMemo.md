# [useMemo](https://ko.react.dev/reference/react/useMemo)
: 성능 최적화를 위해 사용됩니다. 비용이 큰 계산 작업이나 복잡한 연산을 컴포넌트가 리렌더링될 때마다 매번 실행하지 않고, **값을 메모이제이션(캐싱)**하여 필요할 때만 재계산하도록 합니다.

## useMemo의 문법
```
const memoizedValue = useMemo(() => computeFunction(), [dependency1, dependency2]);
```
- `computeFunction`: 메모이제이션할 계산 함수.
- `[dependency1, dependency2]`: 의존성 배열. 배열 내 값이 변경될 때만 computeFunction이 재실행됩니다.

## useMemo의 특징
1. 메모이제이션(Memoization)
- 컴포넌트가 리렌더링될 때, 의존성 배열의 값이 변경되지 않으면 이전 계산 값을 재사용합니다.
- 불필요한 연산을 방지해 성능을 최적화합니다.

2. 값 재사용
- useMemo는 계산된 값을 반환하며, 함수 호출이 아닌 결과를 메모이제이션합니다.
- React의 렌더링 흐름에서 다시 계산될 필요가 없는 값에 적합합니다.

3. 비용이 큰 연산에 적합
- 계산 비용이 크거나 반복적으로 호출되는 함수에 유용합니다.

## useMemo의 사용법
```
import { useMemo } from 'react';

function App({ items }) {
  const expensiveCalculation = (data) => {
    console.log('Expensive calculation...');
    return data.reduce((acc, item) => acc + item.value, 0);
  };

  const totalValue = useMemo(() => expensiveCalculation(items), [items]);

  return (
    <div>
      <h1>Total Value: {totalValue}</h1>
    </div>
  );
}
```
- expensiveCalculation 함수는 items 배열이 변경될 때만 실행됩니다.
- useMemo는 items가 변경되지 않으면 이전에 계산된 totalValue를 반환합니다.

## 언제 useMemo를 사용해야 할까?
useMemo는 모든 계산에 사용해야 하는 것이 아니라, 아래 조건을 만족할 때 사용하는 것이 적합합니다:

1. 계산 비용이 높은 경우
예: 복잡한 배열 필터링, 대규모 데이터 처리, 수학 연산 등.

2. 연산 결과가 자주 재사용되는 경우
예: 컴포넌트가 리렌더링될 때마다 동일한 연산이 반복되는 경우.

3. 의존성 배열로 조건을 명확히 관리할 수 있는 경우
연산의 재실행 조건이 명확히 정의될 때 사용.