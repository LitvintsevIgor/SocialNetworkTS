import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileType} from "../ProfileContainer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import UserAvatar from "../../../assets/images/UserAvatar.jpeg";
import {photoFileType} from "../../../redux/profile-reducer";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";


type ProfileInfoPropsType = {
    profile?: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    changePhoto: (file: photoFileType) => void
    editProfileDataTC: (formData: ProfileFormDataType) => void
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
                                                                profile,
                                                                status,
                                                                updateStatus,
                                                                isOwner,
                                                                changePhoto,
                                                                editProfileDataTC
                                                            }) => {

    const [editMode, setEditMode] = useState(false)

    const onSubmit = (formData: ProfileFormDataType) => {
        editProfileDataTC(formData)
        setEditMode(false)
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
    debugger
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
                    {editMode ? <ProfileFormDataReduxForm initialValues={profile} onSubmit={onSubmit}/> : <ProfileData profile={profile} status={status} updateStatus={updateStatus} editMode={editMode} setEditMode={setEditMode} isOwner={isOwner}/>}
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
    editMode: boolean
    setEditMode: Dispatch<SetStateAction<boolean>>

}

export const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, editMode, setEditMode}) => {

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
                {profile.aboutMe}
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
                {isOwner && <button onClick={ () => {setEditMode(!editMode)} }>Edit profile info</button>}
            </div>
        </div>
    )
}

export type ProfileFormDataType = {
    fullName: string
    AboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    onSubmit: () => void
}

const ProfileFormData: React.FC<InjectedFormProps<ProfileFormDataType>> = ({handleSubmit}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <button>Save</button>
                </div>
                <div>
                    <b>Full name:</b> {createField("fullName", "Full name", Input)}
                </div>
                <div>
                    <b>About me:</b> {createField("aboutMe", "Some information about you", Input)}
                </div>
                <div>
                    <b>Looking for a job:</b> {createField("lookingForAJob", null, Input, [], "checkbox")}
                </div>
                <div>
                    <b>Looking for a job(Description):</b> {createField("lookingForAJobDescription", "Description about job", Textarea)}
                </div>
            </form>
        </div>
    )
}


export const ProfileFormDataReduxForm =  reduxForm<ProfileFormDataType>({form: 'Edit profile'})(ProfileFormData)

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
            Контакты:
            {Object.keys(contacts).map( (c) => {
                return (
                    <div><b>{c}: </b>{getKeyValue(contacts)(c)}</div>
                )
            })}
        </div>
    )
}