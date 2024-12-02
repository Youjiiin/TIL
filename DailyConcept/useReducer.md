# [useReducer](https://ko.react.dev/reference/react/useReducer)
: `useReducer`는 상태와 업데이트 로직을 분리하여 관리하며, 상태 전환 과정을 예측 가능하고 명확하게 만듭니다. 특히 여러 상태 변화가 서로 관련되어 있거나, 복잡한 상태 업데이트 로직을 다룰 때 유용합니다.
```
import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
  }
  throw new Error('[ERROR] unknown action type');
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, 0);

  return (
    <>
      <h3>{state}</h3>
      <button
        onClick={() => {
          dispatch({ type: 'INCREASE' });
        }}
      >
        Increase Counter
      </button>
      <button
        onClick={() => {
          dispatch({ type: 'DECREASE' });
        }}
      >
        Decrease Counter
      </button>
    </>
  );
}
```
- `reducer`: state가 어떻게 업데이트 되는지 지정하는 리듀서 함수
- `initialArg`: 초기 state가 계산되는 값
- `(선택사항) init`: 초기 state를 반환하는 초기화 함수

- `state` : 현재 state 값
- `dispatch` : state를 업데이트 하고 리렌더링을 촉발하는 함수

## 사용 이유?
`useReducer`는 `useState`와 유사한 상태 관리 훅처럼 보이지만, 다음과 같은 상황에서 유용합니다:

1. **복잡한 업데이트 로직 분리**  
   중첩된 상태(예: `state.home.price`)를 관리하거나, 여러 상태가 서로 관련되어 있는 경우 상태 관리 로직을 분리하여 명확하게 정의할 수 있습니다.  
   예: 한 곳에서 모든 상태 전환 로직을 처리하므로, 디버깅과 유지 보수가 쉬워집니다.

2. **setState 로직 통합 및 재사용**  
   `useReducer`를 사용하면 상태를 변경하는 로직을 한 곳에 모아 컴포넌트의 규모가 커져도 가독성을 유지할 수 있습니다. 

3. **Redux 학습 및 유사성**  
   Redux와 유사한 패턴으로 동작하므로, 상태 관리의 일관성을 유지하고, 팀 내 협업이나 Redux 학습에도 도움이 됩니다. 

### useState vs useReducer
- useState 사용: 단순 상태 관리(예: 카운터, boolean 상태 등).
- useReducer 사용: 상태 업데이트 로직이 복잡하거나, 상태가 여러 개로 나뉘어 관리되어야 하는 경우.