import React, { useState } from "react";
import { connect } from "react-redux";
import { add, remove, actionCreaters } from "../store";
import ToDo from "../components/ToDo";

// Home 컴포넌트: toDos를 props로 받아서 렌더링
const Home = ({ toDos, addToDo }) => {
  const [text, setText] = useState("");

  // 입력 값 변경 핸들러
  function onChange(e) {
    setText(e.target.value);
  }

  // 폼 제출 핸들러
  function onSubmit(e) {
    e.preventDefault();
    console.log(text);
    setText("");
    // dispatch(addToDo(text));
    addToDo(text);
  }

  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </>
  );
};

// Redux state를 Home 컴포넌트의 props로 매핑
// = getState()
function getCurrentState(state) {
  return { toDos: state };
}

// = dispatch()
function mapDispatchToProps(dispatch, ownProps) {
  return {
    //함수가 실행되면 dispatch를 호출
    //addToDo: text => dispatch(actionCreaters.addToDo(text))

    //createSlice 사용시
    addToDo: text => dispatch(add(text))
  };
}

// store와 component를 연결하는 방법
// Redux store와 Home 컴포넌트를 연결
export default connect(getCurrentState, mapDispatchToProps)(Home);
