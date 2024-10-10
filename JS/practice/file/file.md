# File
: 브라우저에서 실행되는 웹 어플리케이션에서 컴퓨터의 파일을 핸들링 하는 것은 금지되어 있지만, 사용자가 선택한 파일에 한해서는 읽어들일 수 있고, 서버에 업로드가 가능하다.

## 파일 업로드
```
<input type="file" />
```
- `multiple` : 여러 파일을 선택할 수 있다.
- `accept`: 사용자가 선택할 파일의 타입을 지정할 수 있다.
```
<input type="file" accpet=".txt, .png"/>
```

- File과 FileList API로 파일의 저장시간 및 사이즈 정보를 획득할 수 있다. File은 파일 하나이고, 이것이 여러개가 되면 FileList에 담긴다.
- 파일 정보 획득은 사용자가 파일을 선택한 순간 이루어지며 change 이벤트를 제공한다.
```
const files = e.target.files;
if (files.length !== 0) {
    for (const file of files) {
        const ListItem = document.createElement('li');
        ListItem.innerHTML = `file name: ${file.name}, file size: ${file.size}, modified: ${new Date(file.lastModified)}`

        resultNode.appendChild(ListItem)
    }
}
```

## 파일 내용 읽기
: FileReader API를 사용한다.
- `readAsText()`: 파일 내용을 텍스트로 읽음
- `readAsDataURL()`: 파일 내용을 읽어 Base64로 인코딩해 반환 -> img의 src에 지정하면 이미지가 출력된다.
- `readAsArrayBuffer()`: 파일의 내용을 버퍼로 읽음
- `readAsBinaryString()`: 파일의 내용을 바이너리 문자열로 읽음

### FileReader이벤트
- `load`: 파일 읽기 작업이 완료된 순간의 이벤트
- `error`: 에러 발생 이벤트
- `abort`: abort() 함수가 호출되어 읽기 작업이 취소된 순간의 이벤트
- `progress`: 파일을 읽는 동안 주기적으로 발생하는 이벤트
```
const reader = new FileReader();
reader.onload = function(e) {
  const pNode = document.createElement('p');
  pNode.innerHTML = e.target.result.split("\n").join("<br />");
  liNode.appendChild(pNode);
  resultNode.appendChild(liNode);
};

reader.onerror = function(e) {
  const pNode = document.createElement('p');
  pNode.innerHTML = '파일을 읽기에 실패했습니다.';
  liNode.appendChild(pNode);
  resultNode.appendChild(liNode);
};

reader.readAsText(file);
```

## FormData
: FormData로 파일을 담아 Ajax 통신을 통해 업로드하는 방법. 서버에 데이터를 넘기기 위해 **키-값**형식으로 표현하기 위해서 제공되는 API이다. 
```
if (files.length !== 0) {
  const formData = new FormData(); // 새로운 FormData 객체를 생성
  for (const file of files) { // files 배열에 있는 파일들을 하나씩 순회
    formData.append('file', file); // 각 파일을 formData에 'file'이라는 키로 추가
  }
  formData.append('title', title); // 'title'이라는 이름으로 추가 데이터를 formData에 추가

  const resp = await axios.post('http://localhost:8000/upload', formData); // axios를 사용해 formData를 서버로 POST 요청

  if (resp.data.status === 200) { // 서버 응답이 200 (성공)인지 확인
    alert('업로드 완료'); // 성공 시 알림을 띄움
  }
}
```

## Drag&Drop
```
<div
    id="drop_zone"
    ondrop="dropHandler(event)"
    ondragover="dragOverHandler(event)"
>
```