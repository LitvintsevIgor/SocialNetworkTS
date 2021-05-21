import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

export type HeaderPropsType = {
    isAuth: boolean
    login: string
    logout: () => void
}

export function Header(props: HeaderPropsType) {
    return (
        <header className={s.header}>
            <img
                src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=399&h=399"
                alt="logo"/>
            <div className={s.login}>
                {props.isAuth
                    ? <div> {props.login} - <button onClick={props.logout} >Log out</button>  </div>
                    : <NavLink to={"/login"}>Login</NavLink>}
            </div>
        </header>
    )
}