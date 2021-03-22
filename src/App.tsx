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
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";
import {Store} from "redux";

type AppPropsType = {
    // state: AllAppStateType
    // dispatch: (actions: any) => void
    store: Store
}

const App: React.FC<AppPropsType> = (props) => {

    return (
            <div className={"app-wrapper"}>
                <Header/>
                <Navbar/>
                <div className={"app-wrapper-content"}>
                    <Route path={"/profile"} render={ () => <Profile  store={props.store}/>}/>
                    <Route path={"/dialogs"} render={() => <DialogsContainer store={props.store}/>}/>
                    <Route path={"/news"} component={() => <News/>}/>
                    <Route path={"/music"} component={() => <Music/>}/>
                </div>
            </div>
    );
}


export default App;
