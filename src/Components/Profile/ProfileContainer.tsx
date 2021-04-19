import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import { AllAppStateType } from "../../redux/redux-store";


export type ContactsType = {
    "facebook": string
    "website": null,
    "vk": string
    "twitter": string
    "instagram": string
    "youtube": null,
    "github": string
    "mainLink": null
}

export type PhotosType = {
    small: string
    large: string
}

export type ProfileType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
}

export type ProfileContainerPropsType = {
    setUserProfile: (profile: null) => void
    profile: null

}

class ProfileContainer extends React.Component<ProfileContainerPropsType>{

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }


    render() {
        return (
         <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: AllAppStateType) => ({
    profile: state.profilePage.profile
})


export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);