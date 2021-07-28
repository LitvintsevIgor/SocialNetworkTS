import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {ProfileType} from "../ProfileContainer";
import {ProfileFormDataType} from "./ProfileInfo";
import style from "../../common/FormsControls/FormsControls.module.css";
import {changeProfileUpdateSuccessAC} from "../../../redux/profile-reducer";
import {useDispatch} from "react-redux";

type IProps = {
    profile: ProfileType
}

const ProfileFormData: React.FC<InjectedFormProps<ProfileType, IProps> & IProps> = ({handleSubmit, error, profile}) => {

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <button>Save</button>
                </div>
                <div>
                    {error &&  <div className={style.commonError} >{error}</div>}
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
                <div>
                    Contacts:
                    {Object.keys(profile.contacts).map( (c) => {
                        return (
                            <div>
                                <b>{c}: </b>{createField(`contacts.${c}`, `${c}`, Input)}
                            </div>
                        )
                    })}
                </div>
            </form>
        </div>
    )
}


export const ProfileDataReduxForm =  reduxForm<ProfileType, IProps>({form: 'Edit profile'})(ProfileFormData)
