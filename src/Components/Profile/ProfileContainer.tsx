import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getProfileTC, getStatusTC, updateStatusTC} from "../../redux/profile-reducer";
import {AllAppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";


export type ContactsType = {
    "facebook": string
    "website": string
    "vk": string
    "twitter": string
    "instagram": string
    "youtube": string
    "github": string
    "mainLink": string
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
    profile: ProfileType
    getProfileTC: (userId: string) => void
    getStatusTC: (userId: string) => void
    status: string
    updateStatusTC: (status: string) => void
    authorizedUserId: string
    isFetching: boolean

}


type PathParamType = {
    userId: string
}

type CommonPropsType = RouteComponentProps<PathParamType> & ProfileContainerPropsType

class ProfileContainer extends React.Component<CommonPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }

        this.props.getProfileTC(userId);
        this.props.getStatusTC(userId)
    }



    render() {
        // if (!this.props.isAuth) return <Redirect to={"/login"}/>

        return (
            <>
                {/*{this.props.isFetching && <Preloader/>}*/}
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatusTC}
                />
            </>

        )
    }
}

let mapStateToProps = (state: AllAppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,
    isFetching: state.usersPage.isFetching
})


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfileTC, getStatusTC, updateStatusTC}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);
