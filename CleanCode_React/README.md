# 상태(State)
## 리액트의 상태
- 컴포넌트 상태
- 전역 상태
- 서버 상태
## 상태를 위한 행동
- 상태 변경
- 상태 최적화
- 렌더링 최적화
- 불변성
- 상태 관리자

## 올바른 초기값 설정
### 초기값?
- 가장 먼저 렌더링될 때 순간적으로 보여질 수 있는 값이기도 하다.
- 초기에 렌더링 되는 값

### 초기값이 지켜지지 않을 경우
- 렌더링 이슈 발생, 무한 루프, 타입 불일치로 의도치 않은 동작 => 런타임 에러 (많이 경험중)
- 초기값이 없다면 => undefined
- 상태를 CRUD(Create(생성), Read(읽기), Update(갱신), Delete(삭제)) => 상태를 지울때도 초기값을 잘 기억해놔야 원상태로 돌아간다.
- 빈값 => null처리를 하면 불필요한 방어코드도 줄여준다.

### 업데이트가 되지 않는 값(상수)
- 리액트 외부로 추출하도록 한다.
- 리액트 상태로 변경할 수 있다면 한다.

### 플래그 상태로 바꾸기
- 플래그 값 : 프로그래밍에서 주로 특정 조건 혹은 제어를 위한 조건을 불리언으로 나타내는 값(ex: isLogin)
- useState 대신 플래그로 상태를 정의할 수 있다.

```
const isLogin = 
    hasToken &&
    hasCookie &&
    isValidCookie &&
    isValidToken;

return <div>{isLogin && '00회원님 반갑습니다!'}<div>
```

### 불필요한 상태 제거하기
- 컴포넌트 내부에서의 변수는? : 렌더링마다 고유의 값을 가지는 계산된 값을 가진다.
- props를 useState에 넣지 않고 return문에 사용하기
- 컴포넌트 내부 변수는 렌더링마다 고유한 값을 가짐
- 따라서 useState가 아닌 const로 상태를 선언하는게 좋은 경우도 있음
 
### useState대신 useRef
- useRef는 가변 컨테이너이다.
- 한 번 고정된 값을 컴포넌트에서 계속해서 사용하는 값은 useState를 사용하지 않아도 된다. => 컴포넌트의 전체적인 수명과 동일하게 지속된 정보를 일관적으로 제공해야하는 경우

### 연관된 상태 단순화하기
- 복잡한 것 -> 단순하게 하는 패턴 : KISS
- useState를 많이 사용하게 되면 side effect가 많이 일어난다.
- 상태를 많이 만들어서 관리하기 보단 연관된 것들끼리 문자열로 혹은 객체로 묶어서 관리해주기 

### 연관된 상태 객체로 묶어내기
```
const [isLoading, setIsLoading] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);

const [fetchState, setFetchState] = useState({
    isLoading: false,
    isSuccess: false
});

setFetchState((prevState) => {
    ...prevState, // 이전상태 가져오기
    isSuccess : true // 새로운 상태 변화
})
```

### useReducer 사용하기
- 구조화된 상태를 원한다면 useReducer
```
const ACTION_TYPE = {
    FETCH_LOADING: FETCH_LOADING,
    ...
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_LOADING':
            return { ...state, isLoading: true }
        default:
            return INIT_STATE;
    }
}

const [state, dispatch] = useReducer(reducer, INIT_STATE);

dispatch({ type: ACTION_TYPE.FETCH_LOADING })
```

### Custom Hooks 사용하기
- Custom Hooks를 사용하면 코드를 확장성 있고 재사용 가능하게 작성할 수 있다.
```
const useFetchData = (url) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    useEffect(() => {
        const fetchData = async() => {
            //fetch Data 시도
            dispatch({ type: ACTION_TYPE.FETCH_LOADING });

            await fetch(url)
                .then(() => {
                    dispatch({ type: ACTION_TYPE.FETCH_SUCCESS });
                })
                .catch(() => {
                    dispatch({ type: ACTION_TYPE.FETCH_FIAL });
                })
        };
    }, [url])

    return state
}

const {isLoading, isFail, isSuccess} = useFetchData('url');
```

### 이전 상태 활용하기
- updater function을 사용해 prev state를 고려하면 예상치 못한 결과를 예방할 수 있다.
- setState만 사용하면 업데이트된 값보다, 원래 상태만을 가져와 사용하기에 에러가 발생
```
const [age, setAge] = useState(42);

function updateState() {
    setAge(age + 1); // 42 + 1
    setAge(age + 1); // 42 + 1
    setAge(age + 1); // 42 + 1
}

function updaterFunction() {
    setAge((prevAge) => prevAge + 1); // 42 -> 43
    setAge((prevAge) => prevAge + 1); // 43 -> 44
    setAge((prevAge) => prevAge + 1); // 44 -> 45
}
```