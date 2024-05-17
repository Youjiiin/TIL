import { createStore } from 'redux'; // data 저장소
// createStore 보다 발전된 기능

// const plus = document.getElementById('add');
// const minus = document.getElementById('minus');
// const number = document.querySelector('span');

// const ADD = 'ADD';
// const MINUS = 'MINUS';

// const countModifier = (count = 0, action) => { //reducer
//   // 데이터를 수정할 수 있는 곳
//   switch (action.type) {
//     case ADD:
//       return count + 1;
//     case MINUS:
//       return count - 1;
//     default:
//       return count;
//   }
// };

// const countStore = createStore(countModifier);

// const onChange = () => {
//   number.innerText = countStore.getState(); // 값 가져오기
// }

// countStore.subscribe(onChange); //변화 감지

// plus.addEventListener('click', () => countStore.dispatch({ type: ADD })); //action은 항상 객체여야만 한다.
// minus.addEventListener('click', () => countStore.dispatch({ type: MINUS }));

//////////////////////////////////////////////////////////

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// action creator
const addToDo = text => {
    return { type: ADD_TODO, text }
}

const deleteToDo = id => {
    return { type: DELETE_TODO, id }
}

// reducer
const reducer = (state = [], action) => {
    console.log(action);
    switch(action.type) {
        case ADD_TODO:
            // state.push(action.text) : mutation은 하지 말기
            // 새로운 배열을 생성해서 리턴
            return [{ text: action.text, id: Date.now() }, ...state];
        case DELETE_TODO:
            return state.filter(toDo => toDo.id !== action.id);
        default:
            return state;
    }
};

const store = createStore(reducer);

// dispatch function
const dispatchAddToDo = text => {
    store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
    const id = parseInt(e.target.parentNode.id);
    store.dispatch(deleteToDo(id));
};

store.subscribe(() => console.log(store.getState()));

const paintToDos = () => {
    const toDos = store.getState();
    ul.innerText = "";
    toDos.forEach(toDo => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.innerText = 'Del';
        btn.addEventListener("click", dispatchDeleteToDo);
        li.id = toDo.id;
        li.innerText = toDo.text;
        li.appendChild(btn);
        ul.appendChild(li);
    })
};

store.subscribe(paintToDos);

const onSubmit = e => {
    e.preventDefault();
    const toDo = input.value;
    input.value = "";
    dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);