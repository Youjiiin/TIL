import {
  configureStore,
  createAction,
  createReducer,
  createSlice,
} from "@reduxjs/toolkit";

// 액션 생성 함수, type(어떤 액션)과 payload(정보)를 정의한다.
// 기존의 redux는 액션을 모두 정의해줘야 하지만 createAction으로 정해주면 된다.
// const addToDo = createAction("ADD");
// const deleteToDo = createAction("DELETE");

// // createReducer(initialState, switch구문으로 작성했던 것)
// // state mutate하기 쉽게 해준다.
// const reducer = createReducer([], {
//     [addToDo]: (state, action) => {
//         // 새로운 state만을 리턴해야 하기에 리턴하지 않는다.(오직 mutate)
//         state.push({text: action.payload, id: Date.now()});
//     },
//     [deleteToDo]: (state, action) => {
//         // 필터링하여 새로운 배열을 반환
//         return state.filter(toDo => toDo.id !== action.payload);
//     }
// });

const toDo = createSlice({
  name: "toDoReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) => {
      return state.filter((toDo) => toDo.id !== action.payload);
    },
  },
});

const store = configureStore({
  reducer: toDo.reducer,
});

export const { add, remove } = toDo.actions;

export default store;
