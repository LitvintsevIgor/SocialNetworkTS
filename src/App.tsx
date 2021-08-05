import React from 'react';
import './App.css';
import {Navbar} from "./Components/Navbar/Navbar";
import {HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import UsersContainer from "./Components/Users/UsersContainer";
import HeaderContainer from './Components/Header/HeaderContainer';
import Login from "./Components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {InitializedSuccessTC} from "./redux/app-reducer";
import {Preloader} from "./Components/common/Preloader/Preloader";
import store, {AllAppStateType} from "./redux/redux-store";
import {withSuspense} from "./hoc/WithSuspense";
import {message} from 'antd';
import "antd/dist/antd.less";


const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));

type AppType = {
    InitializedSuccessTC: () => void
    initialized: boolean
}

class App extends React.Component<AppType> {

    onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(e, 'I was closed.');
    };

    componentDidMount() {
        this.props.InitializedSuccessTC(); // thunkCreator

        window.addEventListener("unhandledrejection", (e) => {
            message.error({ content: e.reason.toString(), duration: 1.5})

        });
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", (e) => {
            message.error(e.reason.toString());
        });
    }

    render() {

        if (this.props.initialized) {
            return (
                <div className={"app-wrapper"}>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className={"app-wrapper-content"}>
                        <Switch>
                            <Route exact path={"/"} render={() => <Redirect to={"/profile"}/>}/>
                            <Route path={"/login"} render={() => <Login/>}/>
                            <Route path={"/profile/:userId?"} render={withSuspense(ProfileContainer)}/>
                            <Route path={"/dialogs"} render={withSuspense(DialogsContainer)}/>
                            <Route path={"/users"} render={() => <UsersContainer/>}/>
                            <Route path={"/news"} render={() => <News/>}/>
                            <Route path={"/music"} render={() => <Music/>}/>
                            <Route path={"*"} component={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
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

const AppContainer =  compose<React.ComponentType> (
    connect(mapStateToProps, {InitializedSuccessTC}),
    withRouter
)(App);

const SocialNetworkApp = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </HashRouter>
}

export default SocialNetworkApp;