import React, {ChangeEvent} from "react";
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileType} from "../ProfileContainer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import UserAvatar from "../../../assets/images/UserAvatar.jpeg";
import {photoFileType} from "../../../redux/profile-reducer";


type ProfileInfoPropsType = {
    profile?: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    changePhoto: (file: photoFileType) => void
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
                                                                profile,
                                                                status,
                                                                updateStatus,
                                                                isOwner,
                                                                changePhoto
                                                            }) => {

    if (!profile) {
        return <Preloader/>
    }

    const onPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            const photo = e.currentTarget.files[0]
            changePhoto(photo)
        }

    }

    return (
        <div className={s.profileInfo}>
            <div className={s.description}>

                <img src={profile.photos.large || UserAvatar} className={s.mainPhoto}/>
                <div>
                    {isOwner && <input type={"file"} onChange={onPhotoChange}/>}
                </div>
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