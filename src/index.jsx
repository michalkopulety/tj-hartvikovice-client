import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";

import store from "./store";
import Authentication from "./Authentication";

ReactDOM.render(
  <Provider store={store}>
    <Authentication />
  </Provider>,
  document.getElementById("root")
);
