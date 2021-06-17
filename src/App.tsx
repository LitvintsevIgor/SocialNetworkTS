import React from 'react';
import './App.css';
import {Navbar} from "./Components/Navbar/Navbar";
import {Route, withRouter} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from './Components/Header/HeaderContainer';
import Login from "./Components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {InitializedSuccessTC} from "./redux/app-reducer";
import {Preloader} from "./Components/common/Preloader/Preloader";
import {AllAppStateType} from "./redux/redux-store";


type AppType = {
    InitializedSuccessTC: () => void
    initialized: boolean
}

class App extends React.Component<AppType> {

    componentDidMount() {
        this.props.InitializedSuccessTC(); // thunkCreator
    }

    render() {

        if (this.props.initialized) {
            return (
                <div className={"app-wrapper"}>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className={"app-wrapper-content"}>
                        <Route path={"/login"} render={() => <Login/>}/>
                        <Route path={"/profile/:userId?"} render={() => <ProfileContainer/>}/>
                        <Route path={"/dialogs"} render={() => <DialogsContainer/>}/>
                        <Route path={"/users"} render={() => <UsersContainer/>}/>
                        <Route path={"/news"} component={() => <News/>}/>
                        <Route path={"/music"} component={() => <Music/>}/>
                    </div>
                </div>
            );
        } else {
            return <Preloader/>
        }
    }
}

type mapStateToPropsType = {
    initialized: boolean
}

const mapStateToProps = (state: AllAppStateType): mapStateToPropsType => ({
    initialized: state.app.initialized
})

export default compose<React.ComponentType> (
    connect(mapStateToProps, {InitializedSuccessTC}),
    withRouter
)(App);
