## 객체란?
: 함수와 데이터의 집합, 데이터와 기능을 함께 담을 수 있는 복합적인 자료 구조

### 배열 (배열 객체)
- `concat()` : 두 배열 합치기
```
const arr1 = [1, 2];
const arr2 = [3, 4];
const result = arr1.concat(arr2);  // [1, 2, 3, 4]
```
- `join()` : 배열 대에터를 구분자로 연결해 문자열로 만들기
```
const arr = ['Hello', 'World'];
const result = arr.join(' ');  // "Hello World"
```
- `push()` : 배열에 데이터를 추가(뒤쪽인덱스)
```
const arr = [1, 2];
arr.push(3);  // [1, 2, 3]
```
- `unshift()` : 배열 맨 앞에 데이터를 추가
```
const arr = [1, 2];
arr.unshift(0);  // [0, 1, 2]
```
- `pop()` : 배열에 데이터를 삭제(맨 뒤)
```
const arr = [1, 2, 3];
arr.pop();  // [1, 2]
```
- `shift()` : 맨 앞 데이터 삭제
```
const arr = [1, 2, 3];
arr.shift();  // [2, 3]
```
- `splice()` : 지정된 위치의 데이터를 삭제, 변경, 추가
```
const arr = [1, 2, 3, 4];
arr.splice(1, 2);  // [1, 4] -> 인덱스 1부터 2개의 요소 삭제
```
- `slice()` : 특정 위치 데이터 획득
```
const arr = [1, 2, 3, 4];
const result = arr.slice(1, 3);  // [2, 3] -> 인덱스 1부터 3 미만까지 추출
```
- `filter()` : 조건에 만족하는 배열 데이터만 추출
```
const arr = [1, 2, 3, 4];
const result = arr.filter(num => num > 2);  // [3, 4]
```
- `every()` : 배열의 데이터가 특정 조건에 모두 만족하는지 판단
```
const arr = [1, 2, 3, 4];
const result = arr.every(num => num < 5);  // true -> 모두 5보다 작음
```
- `map()` : 배열의 데이터로 함수를 실행, 반환 값을 모아서 배열로 만들기
```
const arr = [1, 2, 3];
const result = arr.map(num => num * 2);  // [2, 4, 6]
```
- `forEach()` : 배열의 데이터를 순서대로 하나하나하나 확인할 수 있도록
```
array.forEach((data, index) => {
    console.log(`array[${index}] = ${data}`);
});
```
- `sort()` : 배열 정렬하기 
```
// 문자열
// 오름차순
const arr = ['banana', 'apple', 'cherry'];
arr.sort();  // ['apple', 'banana', 'cherry']
//내림차순
const arr = ['banana', 'apple', 'cherry'];
arr.sort((a, b) => a > b ? -1 : 1);  // ['cherry', 'banana', 'apple']

// 숫자
// 오름차순
const arr = [3, 1, 4, 2];
arr.sort((a, b) => a - b);  // [1, 2, 3, 4]
// 내림차순
const arr = [3, 1, 4, 2];
arr.sort((a, b) => b - a);  // [4, 3, 2, 1]
```