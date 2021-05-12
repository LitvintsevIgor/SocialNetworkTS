import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getProfileTC, getStatusTC, updateStatusTC} from "../../redux/profile-reducer";
import { AllAppStateType } from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";


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
    getStatusTC: (userId: string) => void
    status: string
    updateStatusTC: (status: string) => void
    // isAuth: boolean

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
        this.props.getStatusTC(userId)

    }

    render() {

        // if (!this.props.isAuth) return <Redirect to={"/login"}/>

        return (
         <Profile {...this.props}
                  profile={this.props.profile}
                  status={this.props.status}
                  updateStatus={this.props.updateStatusTC}
         />
        )
    }
}

let mapStateToProps = (state: AllAppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})



export default compose<React.ComponentType> (
    // withAuthRedirect,
    connect(mapStateToProps, {getProfileTC, getStatusTC, updateStatusTC}),
    withRouter
)(ProfileContainer);
