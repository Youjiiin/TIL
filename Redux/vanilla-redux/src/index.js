import { createStore } from 'redux'; // data 저장소
// createStore 보다 발전된 기능

const plus = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');

const ADD = 'ADD';
const MINUS = 'MINUS';

const countModifier = (count = 0, action) => { //reducer
  // 데이터를 수정할 수 있는 곳
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState(); // 값 가져오기
}

countStore.subscribe(onChange); //변화 감지

plus.addEventListener('click', () => countStore.dispatch({ type: ADD })); //action은 항상 객체여야만 한다.
minus.addEventListener('click', () => countStore.dispatch({ type: MINUS }));