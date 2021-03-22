import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Navbar} from "./Components/Navbar/Navbar";
import {Profile} from "./Components/Profile/Profile";
import {Dialogs} from "./Components/Dialogs/Dialogs";
import {Route} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import {AllAppStateType} from "./redux/redux-store";


type AppPropsType = {
    state: AllAppStateType
    dispatch: (actions: any) => void
}

const App: React.FC<AppPropsType> = (props) => {

    return (
            <div className={"app-wrapper"}>
                <Header/>
                <Navbar/>
                <div className={"app-wrapper-content"}>
                    <Route path={"/profile"} render={ () => <Profile  dispatch={props.dispatch} state={props.state}/>}/>
                    <Route path={"/dialogs"} render={() => <Dialogs state={props.state}  dispatch={props.dispatch}/>}/>
                    <Route path={"/news"} component={() => <News/>}/>
                    <Route path={"/music"} component={() => <Music/>}/>
                </div>
            </div>
    );
}


export default App;
