import React from "react";
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import { ProfileType } from "../ProfileContainer";


type ProfileInfoPropsType = {
    profile: ProfileType
}

export function ProfileInfo(props:ProfileInfoPropsType) {

    if (!props.profile) {
        return <Preloader/>
    }
    debugger
    return (
        <div className={s.profileInfo}>
            <img
                src="https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/beaches--ocean/aerial-view-of-the-beach-shore.jpg"
                alt=""/>
            <div className={s.description}>
                <img src={props.profile.photos.large}/>

                <div>
                    Обо мне:
                    {props.profile.aboutMe}
                </div>
                Контакты:
                <div>
                    {props.profile.contacts.facebook}
                </div>
                <div>
                    {props.profile.contacts.instagram}
                </div>

            </div>
        </div>
    )
};