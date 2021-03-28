import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Navbar} from "./Components/Navbar/Navbar";
import {Profile} from "./Components/Profile/Profile";
import {Route} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";

// type AppPropsType = {
//     // state: AllAppStateType
//     // dispatch: (actions: any) => void
//     store: ReduxStoreType
// }

const App: React.FC = () => {

    return (
            <div className={"app-wrapper"}>
                <Header/>
                <Navbar/>
                <div className={"app-wrapper-content"}>
                    <Route path={"/profile"} render={ () => <Profile />}/>
                    <Route path={"/dialogs"} render={() => <DialogsContainer />}/>
                    <Route path={"/news"} component={() => <News/>}/>
                    <Route path={"/music"} component={() => <Music/>}/>
                </div>
            </div>
    );
}


export default App;
