import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {getProfileTC, setUserProfile} from "../../redux/profile-reducer";
import { AllAppStateType } from "../../redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {profileAPI} from "../../api/api";


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
    // setUserProfile: (profile: ProfileType) => void
    profile: ProfileType
    getProfileTC: (userId: string) => void
    isAuth: boolean

}


type PathParamType = {
    userId: string
}

type CommonPropsType = RouteComponentProps<PathParamType> & ProfileContainerPropsType

class ProfileContainer extends React.Component<CommonPropsType>{

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = "2"
        }


        this.props.getProfileTC(userId);


        // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
        //     .then(response => {
        //         debugger
        //         this.props.setUserProfile(response.data)
        //     })
    }

    render() {

        if (!this.props.isAuth) return <Redirect to={"/login"}/>

        return (
         <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: AllAppStateType) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuthorized
})

let WithURLDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {
    // setUserProfile,
    getProfileTC
})(WithURLDataContainerComponent);