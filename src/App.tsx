import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Navbar} from "./Components/Navbar/Navbar";
import {Profile} from "./Components/Profile/Profile";
import {Dialogs} from "./Components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";

export type DialogsType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
export type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type miniAppStateType = {
    dialogs: Array<DialogsType>
    messages: Array<MessageType>
    posts: Array<PostsType>
}

function App() {
    let miniAppState: miniAppStateType = {
        dialogs: [
            {id: 1, name: "Петя"},
            {id: 2, name: "Ваня"},
            {id: 3, name: "Маня"},
            {id: 4, name: "Миша"},
            {id: 5, name: "Кола"},
        ],
        messages: [
            {id: 1, message: "Привет, как дела?"},
            {id: 2, message: "Хехей!"},
            {id: 3, message: "Как твой прогресс?"},
            {id: 4, message: "Какую музыку случаешь?"},
            {id: 5, message: "Как твоя собака?"},
        ],
        posts: [
            {id: 1, message: "Hello, how are you?", likesCount: 23},
            {id: 2, message: "Its my first post", likesCount: 5}
        ]
    }

    return (
        <BrowserRouter>
            <div className={"app-wrapper"}>
                <Header/>
                <Navbar/>
                <div className={"app-wrapper-content"}>
                    <Route path={"/profile"} render={ () => <Profile posts={miniAppState.posts}/>}/>
                    <Route path={"/dialogs"}  render={ () => <Dialogs dialogs={miniAppState.dialogs} messages={miniAppState.messages}/>}/>
                    <Route path={"/news"} component={() => <News/>}/>
                    <Route path={"/music"} component={() => <Music/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}


export default App;
