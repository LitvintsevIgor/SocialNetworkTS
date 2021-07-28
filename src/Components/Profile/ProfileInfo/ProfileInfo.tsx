import React, {ChangeEvent} from "react";
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileType} from "../ProfileContainer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import UserAvatar from "../../../assets/images/UserAvatar.jpeg";
import {photoFileType} from "../../../redux/profile-reducer";
import {ProfileDataReduxForm} from "./ProfileDataReduxForm";
import {useSelector} from "react-redux";
import {AllAppStateType} from "../../../redux/redux-store";


type ProfileInfoPropsType = {
    profile?: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    changePhoto: (file: photoFileType) => void
    editProfileDataTC: (formData: ProfileFormDataType) => void
    changeProfileUpdateSuccessAC: (profileUpdateSuccess: boolean) => void
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
                                                                profile,
                                                                status,
                                                                updateStatus,
                                                                isOwner,
                                                                changePhoto,
                                                                editProfileDataTC,
                                                                changeProfileUpdateSuccessAC
                                                            }) => {

    const profileUpdateSuccess = useSelector<AllAppStateType, boolean>( state =>  state.profilePage.profileUpdateSuccess)

    const onSubmit = (formData: ProfileType) => {
        editProfileDataTC(formData)
    }

    const changeEditMode = () => {
       changeProfileUpdateSuccessAC(true)
    }

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
                    {profileUpdateSuccess ? <ProfileDataReduxForm initialValues={profile} onSubmit={onSubmit} profile={profile}/> : <ProfileData profile={profile} status={status} updateStatus={updateStatus} isOwner={isOwner} changeEditMode={changeEditMode}/>}
                </div>
            </div>
        </div>
    )
};

export type ProfileDataPropsType = {
    profile?: ProfileType
    updateStatus: (status: string) => void
    status: string
    isOwner: boolean
    changeEditMode: () => void

}

export const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, changeEditMode}) => {

    if (!profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div>
                Full name: {profile.fullName}
            </div>
            <div>
                Обо мне:
                {profile.AboutMe}
            </div>
            <div>
                <div>
                    looking for a job: {profile.lookingForAJob ? "yes" : "not"}
                </div>
                {profile.lookingForAJob &&
                <div>My professional skills: {profile.lookingForAJobDescription}</div>
                }
            </div>
            <Contacts contacts={profile.contacts}/>
            <div>
                {isOwner && <button onClick={ changeEditMode }>Edit profile info</button>}
            </div>
        </div>
    )
}

export type ProfileFormDataType = {
    contacts: {[key:string]: string}
    fullName: string
    AboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    onSubmit: () => void
}

export type ContactsPropsType = {
    contacts: {[key:string]: string}
}

export const Contacts: React.FC<ContactsPropsType> = ({contacts}) => {

    if (!contacts) {
        return <Preloader/>
    }

    const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) => obj[key];

    return (
        <div>
            Contacts:
            {Object.keys(contacts).map( (c) => {
                return (
                    <div><b>{c}: </b>{getKeyValue(contacts)(c)}</div>
                )
            })}
        </div>
    )
}