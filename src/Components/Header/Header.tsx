import React from "react";
import s from "./Header.module.css";

export function Header () {
    return (
        <header className={s.header}>
            <img
                src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=399&h=399"
                alt="logo"/>
        </header>
    )
}