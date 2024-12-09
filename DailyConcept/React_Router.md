# Router

## SPA (Single Page Application)
: 단일(Single) HTML 페이지를 로드하고, 사용자가 앱과 상호작용할 때 해당 페이지를 동적으로 업데이트하는 웹 애플리케이션. JavaScript를 활용해 페이지 전환 없이 콘텐츠를 갱신하며, 사용자는 하나의 완전한 애플리케이션처럼 느낄 수 있음.

### SPA 특징 및 장점
1. **한 번에 전체 페이지를 로드**: 초기 로드 시 모든 필요한 리소스를 다운로드하며, 이후에는 변경되는 부분만 동적으로 렌더링. 결과적으로 네트워크 요청이 줄어들고, 빠르고 매끄러운 사용자 경험(UX) 제공.

2. **성능 향상**: 페이지 전환 시 전체 페이지를 다시 로드하지 않아도 되므로 렌더링 속도가 빠름. 브라우저는 이미 다운로드된 자바스크립트와 데이터를 사용하여 UI를 즉시 업데이트.

3. **사용자 경험(UX) 강화**: 페이지 리로드 없이 앱처럼 작동하므로 전환 속도가 빨라지고, 사용자는 더 자연스럽고 일관된 경험 제공.

4. **프론트엔드 중심의 설계**: 클라이언트에서 많은 작업을 처리하며, 서버는 API를 통해 필요한 데이터만 전달.


> ### URL VS URI
> - `URL`: 리소스의 위치를 나타내는 URI의 하위 집합
> - `URI`: 리소스를 고유하게 식별하기 위한 문자열
>   - `URL`: 리소스의 **위치(Location)**를 나타냄.
>   - `URN` (Uniform Resource Name): 리소스의 **이름(Name)**을 나타냄.
-----
## 라우터 종류
### 1. BrowserRouter
- **기능**: HTML5 History API를 사용하여 URL과 UI를 동기화합니다. 브라우저의 history 스택을 관리하며, 뒤로 가기/앞으로 가기 등의 탐색이 가능합니다.
- **적합한 환경**: 일반적인 웹 애플리케이션.
```
import { createBrowserRouter } from 'react-router-dom';
import Page1 from "./Page1";
import Page2 from "./Page2";
import Home from "./Home";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'page1', element: <Page1 /> },
      { path: 'page2', element: <Page2 /> },
    ],
  },
]);

export default router;
```
- **사용 사례**: 블로그 사이트: example.com으로 접속하면 홈 화면이 보이고, example.com/about으로 접속하면 소개 페이지가 표시.
- **주의점**: 서버는 모든 URL 요청(example.com/about)에 대해 초기 HTML 파일(index.html)을 반환해야 합니다.


### 2. HashRouter
- **기능**: **URL에 해시(#)를 추가하여 라우팅**합니다. 서버는 항상 초기 HTML 페이지(index.html)만 반환하며, 브라우저가 # 이후의 경로를 클라이언트 라우팅에 사용합니다.
- **적합한 환경**: 서버가 URI 요청을 모두 초기 HTML 파일로 응답하지 못하는 경우.
```
import { createHashRouter } from 'react-router-dom';
import Page1 from "./Page1";
import Page2 from "./Page2";
import Home from "./Home";
import Layout from "./Layout";

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'page1', element: <Page1 /> },
      { path: 'page2', element: <Page2 /> },
    ],
  },
]);

export default router;
```
- **사용 사례**: 정적 파일 호스팅 환경(GitHub Pages 등)에서 동작하는 SPA.
- **URL**: example.com/#/about처럼 표시되며, 해시 이후의 경로는 브라우저에서만 인식됩니다.


### 3. MemoryRouter
- **기능**: 브라우저의 주소창을 갱신하지 않고, 메모리에 라우팅 정보를 저장하여 탐색을 처리합니다.
- **적합한 환경**: 주소창 표시가 필요 없고, history 상태를 메모리에서 관리하면 충분한 환경(예: 하이브리드 앱).
```
import { createMemoryRouter } from 'react-router-dom';
import Page1 from "./Page1";
import Page2 from "./Page2";
import Home from "./Home";
import Layout from "./Layout";

const router = createMemoryRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'page1', element: <Page1 /> },
      { path: 'page2', element: <Page2 /> },
    ],
  },
]);

export default router;
```
- **사용 사례**: 모바일 앱 내장 웹 뷰에서 사용: 주소창 표시 없이 화면 전환.
- **테스트 환경**: 메모리에 상태를 저장하므로 브라우저 없이도 라우팅 테스트 가능.


### 4. NativeRouter
- **기능**: React Native 애플리케이션에서 네이티브 환경의 라우팅을 제공합니다.
- **적합한 환경**: React Native 기반 모바일 애플리케이션.
```
import { NativeRouter, Route, Routes } from 'react-router-native';

function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </NativeRouter>
  );
}
```
- **사용 사례**: React Native 기반 앱에서 화면 간 탐색(예: Home → Profile).

### 5. StaticRouter
- 기능: 서버 사이드 렌더링(SSR) 환경에서 사용되며, 라우팅 정보는 정적으로 설정됩니다.
- **적합한 환경**: Node.js 기반 서버에서 React 컴포넌트를 렌더링할 때.
```
import { StaticRouter } from 'react-router-dom/server';

function ServerApp({ url }) {
  return (
    <StaticRouter location={url}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </StaticRouter>
  );
}
```
- **사용 사례**: Node.js에서 HTML을 생성하여 클라이언트에 반환(예: Next.js와 유사한 서버 사이드 렌더링).

## 리액트 라우터가 제공하는 컴포넌트
### Link
: 사용자가 클릭해서 다른 페이지로 이동할 수 있게 a 요소를 렌더링 해주는 컴포넌트
- 주요 속성
  - `to`: 이동할 URI 지정
  - `replace?`: true로 지정할 경우 history 스택에 추가하지 않고 현재 스택을 교체
  - `state?`: 이동할 컴포넌트에 추가 데이터 전달
```
<Link to="/home">Home</Link>
```

### NavLink
: className, style 속성에 함수를 정의하면 현재 URI가 NavLink의 to 속성과 일치하는 경우 true, 일치하지 않으면 false를 인자로 함수가 호출되므로 URI 매칭 여부에 따라서 각각 다른 스타일 적용 가능
```
<NavLink className={ ({ isActive }) => isActive ? 'menu-dark' : 'menu' } to="/home">Home</NavLink>
<NavLink className={ ({ isActive }) => isActive ? 'menu-dark' : 'menu' } to="/about">About</NavLink>
<NavLink className={ ({ isActive }) => isActive ? 'menu-dark' : 'menu' } to="/list">TodoList</NavLink>
```

### Navigate
: 요청한 URI 대신 다른 경로로 이동시킬 경우 Navigate 컴포넌트 사용
```
{ index: true, element: <Navigate to="/home" /> }
```

## 리액트 라우터가 제공하는 기능
### 동적 세그먼트
- URI 파라미터: URI 경로에 매번 바뀌는 동적인 값이 포함되면 컴포넌트에서는 URI 파라미터를 통해 이 값을 전달받을 수 있음
```
{ path: 'list/:_id', element: <TodoDetail /> }
```
```
const { _id } = useParams();
```

### 중첩 라우트 (nested route)
: Route 컴포넌트 내부에 자식 Route 컴포넌트를 포함
- 부모 컴포넌트와 매칭 되는 경우 부모 컴포넌트를 렌더링 하고 하위 경로가 자식 컴포넌트와 매칭되면 추가적으로 자식 컴포넌트도 렌더링
- 부모 컴포넌트에는 자식 컴포넌트가 렌더링될 영역에 Outlet 컴포넌트 추가
```
{ 
  path: 'list/:_id',
  element: <TodoDetail />,
  children: [
    { path: 'edit', element: <TodoEdit /> }
  ]
}
```
```
<Link to="edit">수정</Link>
<Link to="/list">목록</Link>
<Outlet />
```

### fallback UI와 404 라우트
- `fallback UI`: 사용자가 브라우저 주소창에 list/3과 같은 URI를 직접 입력하면, 서버에 해당 URI가 없으면 404 에러가 발생합니다. 그러나 SPA 웹 서버에서는 모든 URI 요청에 대해 **시작 페이지(index.html)**를 반환하도록 설정해야 합니다. 이를 통해 React Router가 클라이언트에서 라우팅을 처리하며 올바른 페이지로 연결됩니다.
- 에러처리 라우트
```
{
  path: '/',
  element: <Layout />,
  errorElement: <ErrorPage />,
  ......
}
```

## 리액트 라우터가 제공하는 Hook
### useRouteError
```
import { useRouteError } from "react-router-dom";

function ErrorPage(){
  const err = useRouteError();
  const message = err.status === 404 ? '존재하지 않는 페이지입니다.' : '예상하지 못한 에러가 발생했습니다.';
  return (
    <div id="main">
      <div className="todo">
        <h2>에러 발생</h2>
        <p>{ message }</p>
      </div>
    </div>
  );
}

export default ErrorPage;
```

### useParams
: URI 파라미터 값을 꺼낼 때 사용
```
const params = useParems();
const _id = params._id;
// 또는
const { _id } = useParams();
```
- 사용사례
  - RESTful API 스타일의 URL에서 리소스 ID나 동적 경로를 읽을 때.
  - 예: /users/:id → 특정 사용자 프로필 페이지(/users/123).

### useSearchParams
: 쿼리 스트링(URI에 포함된 ? 뒷부분) 정보를 읽거나 설정하는데 사용
```
// list?page=2 요청시
const [searchParams, setSearchParams] = useSearchParams();
const page = Number(searchParams.get('page') || 1);
// 다음 페이지로 이동
searchParams.set('page', page+1);
setSearchParams(searchParams);
```
- 사용사례
  - 검색 조건, 필터, 페이지 번호 등 동적 데이터로 URL을 조작해야 할 때.
  - 예: /list?page=2&filter=name → 리스트 페이지에서 필터와 페이지네이션

### useMatch
- 현재 요청된 URI 경로가 인자로 전달한 경로 패턴과 매칭되는지 확인 후 PathMatch 객체를 반환
- PathMatch의 속성
  - params: URI 파라미터
  - pathname: 요청된 경로
  - pattern: 요청된 경로 패턴
```
const TodoEdit = function(){
  const pathMatch = useMatch('/list/:_id/edit');
  const paramId = pathMatch?.params?._id ? Number(pathMatch.params._id) : -1;
  ......
}
```

### useNavigate
: 페이지를 이동할 수 있는 navigate 함수 반환

### useLocation
: 요청된 URI 정보를 담고 있는 location 객체 반환
- pathname: 현재 요청된 경로
- search: 쿼리 문자열
- state: navigate()로 이동할 때 전달된 state 객체

### useOutletContext
: 중첩 라우팅에서 부모가 Outlet 컴포넌트의 context 속성으로 전달한 값을 접근
- 부모
```
<Outlet context={ itemList } />
```
- 자식
```
const itemList = useOutletContext();
```

## 레이지 로딩 (lazy loading)
: 첫 페이지를 접근할 때 번들링된 큰 파일을 로딩하면 초기 로딩 속도가 느려짐. 레이지 로딩을 적용할 경우 초기 페이지에 필요한 js만 로딩하고 다른 js 파일은 해당 URI에 접근할때 추가로 서버에서 다운 받을 수 있어서 초기 로딩 속도 개선에 도움이 됨
```
// 정적 import
import Home from './Home';
// 동적 import (해당 컴포넌트가 필요한 시점에 import 됨)
const Home = React.lazy(() => import('./Home'));
```

### React.Suspense 컴포넌트
: 동적 import를 사용하면 해당 컴포넌트는 서버에서 네트워크를 통해 가져오기 때문에 지연시간이 발생할 수 있음. 사용자에게 로딩중임을 나타내는 적절한 UI 필요
```
import { Suspense } from "react";

<Suspense fallback={ <div>Loading...</div> }>
  <RouterProvider router={ router } />
</Suspense>
```