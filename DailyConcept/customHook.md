# [CustomHook](https://react.dev/learn/reusing-logic-with-custom-hooks)
: React에서 코드 재사용성을 높이고, 컴포넌트의 복잡성을 줄이기 위해 사용됩니다. 특정한 로직이나 상태 관리를 여러 컴포넌트에서 공통적으로 사용할 때 주로 활용됩니다.

## 일반적으로 많이 사용되는 방법

### 1. 상태 관리
- **폼 입력 처리**: 여러 입력 필드의 상태를 관리하고 처리하는 로직을 커스텀 훅으로 추출
```
const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return [values, handleChange];
};
```

- **모달 상태 관리**: 모달의 열림/닫힘 상태를 여러 컴포넌트에서 공유하기 위해 활용
```
const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return { isOpen, open, close };
};
```

### 2. API 호출 및 데이터 페칭
: API 호출 로직을 재사용 가능하게 만들 때 활용
```
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};
```

### 3. 이벤트 및 DOM 제어
: 스크롤 위치, 뷰포트 크기 등 DOM 상태를 제어하고 관리하는 데 사용
```
const useWindowSize = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};
```

### 4. 비즈니스 로직 캡슐화
: 특정한 비즈니스 로직을 컴포넌트와 분리해 재사용성을 높임
```
const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const response = await api.post('/login', credentials);
    setUser(response.data.user);
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
};
```

### 5. 성능 최적화
: 디바운싱(Debouncing)이나 스로틀링(Throttling)과 같은 성능 최적화 로직을 커스텀 훅으로 추출해 활용
```
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
```

### 6. 타이머 및 비동기 제어
: 타이머, 인터벌 제어 로직을 추출해 관리할 때 활용
```
const useTimer = (initialTime) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => setTime((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
};
```

> **내 프로젝트에서 활용예시**
> - 슬라이더 이동 거리계산시 뷰포트 측정 (원래는 한 번렌더링하면 다시 재렌더링이 안됐다.)
> - API 호출
> - 성능최적화
> - 모달, 폼 입력처리