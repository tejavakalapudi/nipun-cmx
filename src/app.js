import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import MySite from "./components/Template";

// Use normalize to have same styling format across cross browser

import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

ReactDOM.render( <MySite store = { store } />, document.getElementById( "app" ) );



