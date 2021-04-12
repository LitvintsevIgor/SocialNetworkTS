import style from "../../Users/Users.module.css";
import React from "react";
import preloader from "./../../../assets/images/preloader.svg"


export const Preloader = () => {
    return (
        <img src={preloader} className={style.preloader}/>
    )
}