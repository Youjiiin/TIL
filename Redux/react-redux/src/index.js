import React from "react";
import REactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./Store";

REactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);