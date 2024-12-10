## Recoil
* 리액트를 만든 페이스북 팀에서 만든 상태 관리 라이브러리

### 설치
```sh
npm i recoil
```

### RecoilRoot
* RecoilRoot 컴포넌트 하위의 컴포넌트가 recoil을 사용할 수 있으므로 주로 루트 컴포넌트를 RecoilRoot로 감싼다.
* App.jsx
  ```jsx
  import { RecoilRoot } from 'recoil';

  function App() {
    return (
      <RecoilRoot>
        <MyRootComponent />
      </RecoilRoot>
    );
  }
  ```

### atom
* atom은 상태를 정의하는데 사용
* Recoil은 여러 종류의 상태를 관리할 수 있는데 atom은 상태의 일부를 나타냄(로그인 상태, 다크모드 여부 상태 등 상태값 하나)
* atom의 값을 읽는 컴포넌트들은 암묵적으로 atom을 구독하게 됨
* atom이 바뀌면(상태가 바뀌면) 그 atom을 구독하는 모든 컴포넌트가 리렌더링 됨

#### atom을 정의하는 방법
* atom 함수 사용
* atoms.js
  ```js
  import { atom } from "recoil";
  export const countState = atom({
    key: 'count', // atom 식별자. 모든 atom에서 고유해야 함
    default: 10 // 상태 초기값
  });
  ```

#### atom에서 읽기(getter)
* atom에서 읽기 작업을 하는 컴포넌트는 자동으로 atom을 구독하게 되고 구독중인 atom에 변경이 발생하면 리렌더링 됨
* 읽기 작업만 필요할 때는 useRecoilValue 훅 사용
* Left3.jsx
  ```jsx
  import { countState } from '@recoil/atoms.js';
  import { useRecoilValue } from 'recoil';

  function Left3() {
    const count = useRecoilValue(countState);
    return (
      <div>
        <h3>Left3</h3>
        <span>{ count }</span>
      </div>
    );
  }

  export default Left3;
  ```

#### atom을 변경(setter)
* 변경 작업만 필요할 때는 useSetRecoilState 훅 사용
* Right3.jsx
  ```jsx
  import { countState } from '@recoil/atoms.js';
  import { useSetRecoilState } from 'recoil';

  function Right3() {
    const setCount = useSetRecoilState(countState);

    const countUp = function(step){
      setCount((count) => count + step);
    };

    return (
      <div>
        <h3>Right3</h3>
        <button onClick={ () => countUp(1) }>+1</button>
      </div>
    );
  }

  export default Right3;
  ```

#### atom을 읽고 쓰기
* 읽고 쓰는 작업이 다 필요하면 useRecoilState 훅 사용
* Right3.jsx
  ```jsx
  import { countState } from '@recoil/atoms.mjs';
  import { useRecoilState } from 'recoil';

  function Right3() {
    const [count, setCount] = useRecoilState(countState);
    const countUp = function(step){
      setCount(count + step);
    };

    return (
      <div>
        <h1>Right3 : { count }</h1>
        <button onClick={ () => countUp(1) }>+</button>
      </div>
    );
  }

  export default Right3;
  ```

### selector
* atom이나 다른 selector를 통해서 읽은 상태값을 기반으로 가공된 값을 반환
* 컴포넌트가 atom을 읽을 경우는 현재 상태값 그대로 읽게 되지만 selector를 통해서 읽을 경우에는 현재 상태값을 기반으로 파생된 다른 값으로 사용 가능
* selector는 atom 값이 변하지 않으면 언제나 같은 값을 반환하는 순수 함수로 만들어야 함

#### selector를 정의하는 방법
* selector 함수 사용
* selectors.js
  ```js
  import { countState } from "@recoil/atoms.js";
  import { selector } from "recoil";

  export const countStateKor = selector({
    key: 'korCount',
    get: ({ get }) => {
      const count = get(countState); // atom 값 추출
      return numberToKorean(count); // 추출한 atom 값을 기반으로 파생된 값을 반환
    }
  });

  function numberToKorean(number) {
    // 아라비아 숫자 number를 한국식으로 변경
    ......
  }
  ```

#### selector에서 읽기(getter)
* selector에서 읽기 작업을 하는 컴포넌트는 자동으로 selector가 사용하는 atom을 구독하게 되고 구독중인 atom에 변경이 발생하면 리렌더링 됨
* selector는 주로 읽기 전용으로 사용되며 useRecoilValue 훅 사용
* Left3.jsx
  ```jsx
  import { countStateKor } from '@recoil/selectors.js';
  import { useRecoilValue } from 'recoil';

  function Left3() {
    const korCount = useRecoilValue(countStateKor);
    return (
      <div>
        <h1>Left3 : { korCount }</h1>
      </div>
    );
  }

  export default Left3;
  ```

##### Recoil 참고: <https://recoiljs.org/ko>