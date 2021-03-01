import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import {state, addPostToState, StateType} from "./redux/state";
import {BrowserRouter} from "react-router-dom";


export function rerenderEntireTree(state: StateType) {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state} addPostToState={addPostToState}/>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
