import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import Routers from "./routers/Router";
import "./sass/Public.scss";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Routers />
    </Provider>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
