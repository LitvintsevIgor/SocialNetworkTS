import React from "react";
import {Link, NavLink} from "react-router-dom";
import s from "./Header.module.css";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/auth-selectors";
import {Avatar, Button, Col, Row} from "antd";
import Testlogo from "../../assets/images/shazam.svg";
import {UserOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";
import {logout} from "../../redux/auth-reducer";


// export type HeaderPropsType = {
//     isAuth: boolean
//     login: string
//     logout: () => void
// }

export function AppHeader() {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)
    const dispatch = useDispatch()

    const logoutCallBack = () => {
        dispatch(logout())
    }
debugger
    return (
        <Header className="header">
            {/*<div className="logo"/>*/}
            <Row>
                <Col span={19}>
                    <img src={Testlogo} alt="" style={{width: "30px"}}/>
                </Col>
                    {isAuth
                        ? <>
                            <Col span={1}>
                                <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                            </Col>
                            <Col span={4}>
                                <Button onClick={logoutCallBack}>Log out</Button>
                            </Col>
                        </>
                        : <Col span={5}>
                            <Button>
                                <Link to={"/login"}>Login</Link>
                            </Button>
                        </Col>}
            </Row>
        </Header>
    )
}

// export function Header(props: HeaderPropsType) {
//
//     const isAuth = useSelector(selectIsAuth)
//     const login = useSelector(selectCurrentUserLogin)
//
//     return (
//         <header className={s.header}>
//             <img
//                 src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=399&h=399"
//                 alt="logo"/>
//             <div className={s.login}>
//                 {props.isAuth
//                     ? <div> {props.login} - <button onClick={props.logout} >Log out</button>  </div>
//                     : <NavLink to={"/login"}>Login</NavLink>}
//             </div>
//         </header>
//     )
// }