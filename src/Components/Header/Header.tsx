import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

export type HeaderPropsType = {
    isAuthorized: boolean
    login: string
}

export function Header(props: HeaderPropsType) {
    return (
        <header className={s.header}>
            <img
                src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=399&h=399"
                alt="logo"/>
            <div className={s.login}>
                {props.isAuthorized ? props.login : <NavLink to={"/login"}>Login</NavLink>}
                {/*<NavLink to={"/login"}>Login</NavLink>*/}
            </div>
        </header>
    )
}