import React from "react";
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileType} from "../ProfileContainer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";


type ProfileInfoPropsType = {
    profile?: ProfileType
    status: string
    updateStatus: (status: string) => void
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, status, updateStatus}) => {

    if (!profile) {
        return <Preloader/>
    }

    return (
        <div className={s.profileInfo}>
            <img
                src="https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/beaches--ocean/aerial-view-of-the-beach-shore.jpg"
                alt=""/>
            <div className={s.description}>
                <img src={profile.photos.large}/>
                <ProfileStatusWithHooks status={status}
                               updateStatus={updateStatus}
                />
                <div>
                    Обо мне:
                    {profile.aboutMe}
                </div>
                Контакты:
                <div>
                    {profile.contacts.facebook}
                </div>
                <div>
                    {profile.contacts.instagram}
                </div>

            </div>
        </div>
    )
};