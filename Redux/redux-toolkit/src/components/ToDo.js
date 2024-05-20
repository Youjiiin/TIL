import React from "react";
import { connect } from "react-redux";
import { actionCreaters } from "../Store";
import { Link } from "react-router-dom";

function ToDo({text, onBtnClick, id}) {
    return (
        <li>
            <Link to={`/${id}`}>
                {text} <button onClick={onBtnClick}>DEL</button>
            </Link>
        </li>
    );
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onBtnClick: () => dispatch(actionCreaters.deleteToDo(parseInt(ownProps.id)))
    }
}

export default connect(null, mapDispatchToProps)(ToDo);