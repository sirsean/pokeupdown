import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "./stores/Store";

var Actions = require("./actions/Actions.js");
Actions.initialLoad();

import {Main} from "./components/Main";

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById("app")
);
