# Router

## 라우터 종류
### 1. BrowserRouter
- 기능: HTML5 History API를 사용하여 URL과 UI를 동기화합니다. 브라우저의 history 스택을 관리하며, 뒤로 가기/앞으로 가기 등의 탐색이 가능합니다.
- 적합한 환경: 일반적인 웹 애플리케이션.
- 예시:
```
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```
- 사용 사례: 블로그 사이트: example.com으로 접속하면 홈 화면이 보이고, example.com/about으로 접속하면 소개 페이지가 표시.
- 주의점: 서버는 모든 URL 요청(example.com/about)에 대해 초기 HTML 파일(index.html)을 반환해야 합니다.

### 2. HashRouter
- 기능: URL에 해시(#)를 추가하여 라우팅합니다. 서버는 항상 초기 HTML 페이지(index.html)만 반환하며, 브라우저가 # 이후의 경로를 클라이언트 라우팅에 사용합니다.
- 적합한 환경: 서버가 URI 요청을 모두 초기 HTML 파일로 응답하지 못하는 경우.
- 예시:
```
import { HashRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  );
}
```
- 사용 사례: 정적 파일 호스팅 환경(GitHub Pages 등)에서 동작하는 SPA.
- URL: example.com/#/about처럼 표시되며, 해시 이후의 경로는 브라우저에서만 인식됩니다.

### 3. MemoryRouter
- 기능: 브라우저의 주소창을 갱신하지 않고, 메모리에 라우팅 정보를 저장하여 탐색을 처리합니다.
- 적합한 환경: 주소창 표시가 필요 없고, history 상태를 메모리에서 관리하면 충분한 환경(예: 하이브리드 앱).
- 예시:
```
import { MemoryRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </MemoryRouter>
  );
}
```
- 사용 사례: 모바일 앱 내장 웹 뷰에서 사용: 주소창 표시 없이 화면 전환.
- 테스트 환경: 메모리에 상태를 저장하므로 브라우저 없이도 라우팅 테스트 가능.

### 4. NativeRouter
- 기능: React Native 애플리케이션에서 네이티브 환경의 라우팅을 제공합니다.
- 적합한 환경: React Native 기반 모바일 애플리케이션.
예시:
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
- 사용 사례: React Native 기반 앱에서 화면 간 탐색(예: Home → Profile).

### 5. StaticRouter
- 기능: 서버 사이드 렌더링(SSR) 환경에서 사용되며, 라우팅 정보는 정적으로 설정됩니다.
- 적합한 환경: Node.js 기반 서버에서 React 컴포넌트를 렌더링할 때.
- 예시:

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
- 사용 사례: Node.js에서 HTML을 생성하여 클라이언트에 반환(예: Next.js와 유사한 서버 사이드 렌더링).