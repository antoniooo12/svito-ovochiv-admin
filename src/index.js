import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import {Provider} from "react-redux";
import {store} from "./reducer";
import {BrowserRouter, Routes} from "react-router-dom";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);
