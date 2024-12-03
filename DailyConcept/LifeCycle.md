# [LifeCycle](https://ko.legacy.reactjs.org/docs/state-and-lifecycle.html)
: 컴포넌트 라이프사이클(Component Lifecycle)은 컴포넌트가 **생성(Mounting)**, **갱신(Updating)**, **제거(Unmounting)**되는 일련의 과정

## 1. 라이프사이클의 주요 단계
### 1.1. 생성(Mounting)
- 컴포넌트가 DOM에 삽입될 때 호출되는 단계
- 초기 렌더링과 관련된 로직을 처리할 수 있음
- 주요 메서드/훅:
  - `constructor`: 컴포넌트를 초기화하고, 상태(state)나 메서드를 설정할 때 사용됩니다.
  - `static getDerivedStateFromProps`: props에서 state를 초기화할 때 사용됩니다. 정적 메서드이므로 side-effect가 없어야 합니다.
  - `render`: DOM 요소를 생성하거나 JSX를 반환하는 메서드입니다.
  - `componentDidMount`: DOM이 렌더링된 후 호출됩니다. 비동기 데이터 로드(API 호출)나 DOM 조작 등을 처리할 수 있습니다.
### 1.2. 갱신(Updating)
- Props 변경, State 변경, 또는 부모 컴포넌트의 리렌더링 등으로 인해 컴포넌트가 다시 렌더링될 때 호출
- 주요 메서드/훅:
  - `static getDerivedStateFromProps`: 갱신 시에도 호출됩니다. 새로운 props를 기반으로 state를 업데이트할 수 있습니다.
  - `shouldComponentUpdate`: 리렌더링 여부를 결정합니다. true를 반환하면 업데이트, false를 반환하면 업데이트를 방지합니다. 성능 최적화를 위해 사용됩니다.
  - `render`: 갱신된 상태를 기반으로 DOM 요소를 반환합니다.
  - `getSnapshotBeforeUpdate`: 실제 DOM이 업데이트되기 직전에 호출되며, 스크롤 위치 등 DOM 상태를 캡처할 수 있습니다.
  - `componentDidUpdate`: DOM이 갱신된 후 호출됩니다. 네트워크 요청이나 DOM 작업 후처리를 수행할 수 있습니다.
### 1.3. 제거(Unmounting)
- 컴포넌트가 DOM에서 제거될 때 호출되는 단계
- 리소스 정리, 이벤트 리스너 제거, 타이머 제거 등을 처리합니다.
- 주요 메서드/훅:
  - `componentWillUnmount`: 컴포넌트가 제거되기 직전에 호출됩니다.

## 2. 함수형 컴포넌트에서 라이프사이클
: 함수형 컴포넌트는 React Hooks를 사용하여 라이프사이클 로직을 구현

### 2.1. 주요 훅
1. `useEffect`
- 클래스 컴포넌트의 componentDidMount, componentDidUpdate, componentWillUnmount를 대체합니다.
- 의존성 배열을 통해 특정 상태/props 변경 시에만 실행됩니다.

2. `useLayoutEffect`
- DOM이 업데이트된 직후에 동기적으로 실행됩니다.
- useEffect와 달리 렌더링이 화면에 반영되기 전에 호출됩니다.
- 예: 레이아웃 측정 또는 DOM 상태 동기화.

## 3. 라이프사이클 메서드 요약 (클래스 vs 훅)

| 단계     | 클래스 메서드              | 훅에서 대체 방법                      |
|----------|---------------------------|---------------------------------------|
| 생성     | `constructor`             | 상태 초기화 (`useState`)              |
|          | `componentDidMount`       | `useEffect(() => {}, [])`            |
| 갱신     | `shouldComponentUpdate`   | `React.memo` 활용                    |
|          | `getSnapshotBeforeUpdate` | `useLayoutEffect`                    |
|          | `componentDidUpdate`      | `useEffect(() => {...})`             |
| 제거     | `componentWillUnmount`    | `useEffect`의 정리 함수               |