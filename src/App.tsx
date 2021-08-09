import React from 'react';
import './App.css';
import {Navbar} from "./Components/Navbar/Navbar";
import {HashRouter, Link, NavLink, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import UsersContainer from "./Components/Users/UsersContainer";
import Login from "./Components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {InitializedSuccessTC} from "./redux/app-reducer";
import {Preloader} from "./Components/common/Preloader/Preloader";
import store, {AllAppStateType} from "./redux/redux-store";
import {withSuspense} from "./hoc/WithSuspense";
import Testlogo from "./assets/images/skype-seeklogo.svg"
import {Avatar, Col, message, Row} from 'antd';
import "antd/dist/antd.less";

// Ant Design

import {Layout, Menu, Breadcrumb} from 'antd';
import {GlobalOutlined, UserOutlined, TeamOutlined, MailOutlined, PlaySquareOutlined, HomeOutlined} from '@ant-design/icons';
import s from "./Components/Navbar/Navbar.module.css";
import {AppHeader} from "./Components/Header/Header";


const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;


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
            message.error({content: e.reason.toString(), duration: 1.5})

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
                <Layout>
                    <AppHeader />
                    <Content style={{padding: '0 50px'}}>
                        <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                            <Sider className="site-layout-background" width={200}>
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={['1']}
                                    style={{height: '100%'}}
                                >
                                    <Menu.Item key="1" icon={<HomeOutlined />}>
                                        <Link to={"/profile"} >Profile</Link>
                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<TeamOutlined />}>
                                        <Link to={"/users"}  >Users</Link>
                                    </Menu.Item>
                                    <Menu.Item key="3" icon={<MailOutlined />}>
                                        <Link to={"/dialogs"} >Messages</Link>
                                    </Menu.Item>
                                    <Menu.Item key="4" icon={<PlaySquareOutlined />}>
                                        <Link to={"/news"} >Music</Link>
                                    </Menu.Item>
                                    <Menu.Item key="5" icon={<GlobalOutlined />}>
                                        <Link to={"/music"} >News</Link>
                                    </Menu.Item>
                                </Menu>
                            </Sider>
                            <Content style={{padding: '0 24px', minHeight: 280}}>
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
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
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

const AppContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {InitializedSuccessTC}),
    withRouter
)(App);

const SocialNetworkApp = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default SocialNetworkApp;