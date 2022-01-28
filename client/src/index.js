import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from "./store/createStore";
import {Provider} from "react-redux";
import AppLoader from "./hoc/appLoader";

const store = createStore()

ReactDOM.render(
    <Provider store={store}>
        <AppLoader>
            <App />
        </AppLoader>
    </Provider>,
  document.getElementById('root')
);

