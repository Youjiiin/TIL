# Storage
: 백엔드 어플리케이션에는 DB를 이용해 정보를 저장할 수 있지만, 프론트 어플리케이션에서 정보를 저장하기 위해선 Storage와 Indexed DB가 있다.

## Session Storage
- Session은 실행되고 있는 하나의 브라우저 창을 의미하며, 하나의 창에 떠 있는 어플리케이션을 위한 Storage이다. 각 Storage는 데이터를 공유하지 않는다.
- `window.open()`에 의해 새 창이 열렸을 경우에는 Session Storage가 **복제**된다. 하지만 **공유는 되지 않는다.**
- 브라우저나 컴퓨터가 꺼지면 데이터가 사라진다. 

## Local Storage
- 동일 오리진의 모든 세션에서 공유할 수 있는 데이터를 저장하기 위해 사용한다.
> 오리진(Origin)이란?
> 프로토콜 + 도메인 + 포트가 결합된 문자열을 의미한다.
> ex. "https://localhost:3000"/....
- Local Storage에 저장된 데이터는 브라우저가 종료되어도 사라지지 않는다.

## Storage 함수
- `setItem(key, value)`: Storage 데이터 저장
    - 키, 값은 모두 문자열 취급이다. 숫자로 저장해도 문자열로 저장된다. 
    - 객체를 저장하고 싶으면 객체를 문자열로 변형해 저장해야 한다.
- `getItem(key)`: Storage 데이터 획득
- `removeItem(key)`: Storage 데이터 삭제
- `clear()`: Storage 내 모든 데이터 삭제

### 모든 데이터 획득하기 
- `key()` 함수로 데이터 키 값을 얻을 수 있다.
```
for(let i = 0; i < sessionStorage.length; i++) {
    let key = sessionStorage.key(i);
    console.log(key, sessionStorage.getItem(key));
}
```

- `Object.keys()`로 키를 배열로 획득할 수 있다.
```
let keys = Object.keys(sessionStorage);
keys.forEach(key => {
    console.log(key, sessionStorage.getItem(key));
})
```

## Storage 이벤트
- Storage 이벤트는 **브라우저의 로컬 저장소(Local Storage)나 세션 저장소(Session Storage)**에서 데이터가 변경될 때 발생하는 이벤트.
- **Storage 이벤트 발생 조건**: 이 이벤트는 **동일한 출처(origin)**에서 다른 브라우저 창이나 탭에서 스토리지 데이터가 변경되었을 때 발생
    - 예를 들어, 같은 도메인에서 여러 개의 브라우저 창이 열려 있을 때, 한 창에서 스토리지 데이터를 변경하면 다른 창에서 이 이벤트가 발생하여 스토리지 데이터를 업데이트하는 것을 감지할 수 있다.
- **스토리지 이벤트의 제한사항**: 현재 브라우저 창에서 데이터를 변경하는 경우에는 이 이벤트가 발생하지 않는다.
    - 예를 들어, 한 브라우저 창에서 데이터를 직접 변경할 때는 해당 창에서는 Storage 이벤트가 발생하지 않는다. 오직 다른 창에서 데이터가 변경되었을 때만 이 이벤트가 발생한다.
- **사용 목적**: Storage 이벤트는 동일한 웹 애플리케이션이 여러 개의 브라우저 창 또는 탭에서 열려 있을 때, 어떤 창에서든 스토리지 데이터를 변경한 사실을 다른 창에 동기화하기 위한 용도로 사용. 여러 창이 열려 있어도 데이터의 일관성을 유지할 수 있다.
- sessionStorage는 창 별로 따로이므로 이벤트를 감지할 수 없다. 이벤트가 발생하는 경우는, 하나의 창에 `<iframe>`으로 두개의 HTML이 실행된 경우


### StorageEvent 객체에서 제공하는 주요 프로퍼티
- `key`: 변경된 데이터의 키 값. 즉, 변경된 항목의 key 값이 무엇인지 알 수 있다.
- `newValue`: 변경된 후의 데이터 값. 새로 설정된 값이 무엇인지 나타낸다.
- `oldValue`: 변경되기 전의 데이터 값. 이전에 저장된 값이 무엇이었는지 나타낸다.
- `storageArea`: 어떤 스토리지 객체에서 변경이 발생했는지를 나타낸다. localStorage 또는 sessionStorage를 가리킨다.
- `url`: 데이터가 변경된 HTML 페이지의 URL을 나타낸다. 즉, 어느 페이지에서 스토리지가 변경되었는지 알 수 있다.

```
window.addEventListener('storage', function(event) {
    console.log('스토리지 변경 감지');
    console.log('key:', event.key);  // 변경된 데이터의 key 값
    console.log('newValue:', event.newValue);  // 변경 후 데이터
    console.log('oldValue:', event.oldValue);  // 변경 전 데이터
});
```