import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import {state} from "./redux/state";


// export type DialogsType = {
//     id: number
//     name: string
// }
// export type MessageType = {
//     id: number
//     message: string
// }
// export type PostsType = {
//     id: number
//     message: string
//     likesCount: number
// }
// export type StateType = {
//     dialogs: Array<DialogsType>
//     messages: Array<MessageType>
//     posts: Array<PostsType>
// }
//
// let state: StateType = {
//     dialogs: [
//         {id: 1, name: "Петя"},
//         {id: 2, name: "Ваня"},
//         {id: 3, name: "Маня"},
//         {id: 4, name: "Миша"},
//         {id: 5, name: "Кола"},
//     ],
//     messages: [
//         {id: 1, message: "Привет, как дела?"},
//         {id: 2, message: "Хехей!"},
//         {id: 3, message: "Как твой прогресс?"},
//         {id: 4, message: "Какую музыку случаешь?"},
//         {id: 5, message: "Как твоя собака?"},
//     ],
//     posts: [
//         {id: 1, message: "Hello, how are you?", likesCount: 23},
//         {id: 2, message: "Its my first post", likesCount: 5}
//     ]
// }

ReactDOM.render(
  <React.StrictMode>
    <App state={state} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
