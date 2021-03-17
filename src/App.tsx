import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Navbar} from "./Components/Navbar/Navbar";
import {Profile} from "./Components/Profile/Profile";
import {Dialogs} from "./Components/Dialogs/Dialogs";
import {Route} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import {StoreType} from "./redux/state";
// import {StateType} from "./redux/state";


type AppPropsType = {
    store: StoreType
}

const App: React.FC<AppPropsType> = (props) => {
    const state = props.store.getState();
    return (
            <div className={"app-wrapper"}>
                <Header/>
                <Navbar/>
                <div className={"app-wrapper-content"}>
                    <Route path={"/profile"} render={ () => <Profile state={state.profilePage}
                                                                     dispatch={props.store.dispatch.bind(props.store)}
                                                                     // addPostToState={props.store.addPostToState.bind(props.store)}
                                                                     // updateNewPostText={props.store.updateNewPostText.bind(props.store)}
                    />}/>
                    <Route path={"/dialogs"}  render={ () => <Dialogs state={state.dialogsPage}/>}/>
                    <Route path={"/news"} component={() => <News/>}/>
                    <Route path={"/music"} component={() => <Music/>}/>
                </div>
            </div>
    );
}


export default App;
