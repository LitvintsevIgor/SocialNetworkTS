import React from 'react';
import './App.css';
import {Navbar} from "./Components/Navbar/Navbar";
import {Route} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";
import {UsersContainer} from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from './Components/Header/HeaderContainer';
import {Login} from "./Components/Login/Login";




// type AppPropsType = {
//     // state: AllAppStateType
//     // dispatch: (actions: any) => void
//     store: ReduxStoreType
// }

const App: React.FC = () => {

    return (
            <div className={"app-wrapper"}>
                <HeaderContainer />
                <Navbar/>
                <div className={"app-wrapper-content"}>
                    <Route path={"/login"} render={ () => <Login />}/>
                    <Route path={"/profile/:userId?"} render={ () => <ProfileContainer />}/>
                    <Route path={"/dialogs"} render={() => <DialogsContainer />}/>
                    <Route path={"/users"} render={() => <UsersContainer />}/>
                    <Route path={"/news"} component={() => <News/>}/>
                    <Route path={"/music"} component={() => <Music/>}/>
                </div>
            </div>
    );
}


export default App;
