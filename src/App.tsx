import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Navbar} from "./Components/Navbar/Navbar";
import {Profile} from "./Components/Profile/Profile";
import {Dialogs} from "./Components/Dialogs/Dialogs";
import {Route} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import {StateType} from "./redux/state";

type AppPropsType = {
    state: StateType
    addPostToState: () => void
    updateNewPostText: (newText: any) => void
}

function App(props: AppPropsType) {
    return (
            <div className={"app-wrapper"}>
                <Header/>
                <Navbar/>
                <div className={"app-wrapper-content"}>
                    <Route path={"/profile"} render={ () => <Profile state={props.state.profilePage}
                                                                     addPostToState={props.addPostToState}
                                                                     updateNewPostText={props.updateNewPostText}/>}/>
                    <Route path={"/dialogs"}  render={ () => <Dialogs state={props.state.dialogsPage}/>}/>
                    <Route path={"/news"} component={() => <News/>}/>
                    <Route path={"/music"} component={() => <Music/>}/>
                </div>
            </div>
    );
}


export default App;
