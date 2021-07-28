import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {
    changePhotoTC, changeProfileUpdateSuccessAC,
    editProfileDataTC,
    getProfileTC,
    getStatusTC,
    photoFileType,
    updateStatusTC
} from "../../redux/profile-reducer";
import {AllAppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {ProfileFormDataType} from "./ProfileInfo/ProfileInfo";


export type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}

export type PhotosType = {
    small: string
    large: string
}

export type ProfileType = {
    AboutMe: string
    contacts: {[key:string]: string}
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
    onSubmit: () => void
}

export type ProfileContainerPropsType = {
    profile: ProfileType
    getProfileTC: (userId: string) => void
    getStatusTC: (userId: string) => void
    status: string
    updateStatusTC: (status: string) => void
    authorizedUserId: string
    isFetching: boolean
    changePhotoTC: (file: photoFileType) => void
    editProfileDataTC: (formData: ProfileFormDataType) => void
    changeProfileUpdateSuccessAC: (profileUpdateSuccess: boolean) => void
}


type PathParamType = {
    userId: string
}

export type CommonPropsType = RouteComponentProps<PathParamType> & ProfileContainerPropsType

class ProfileContainer extends React.Component<CommonPropsType> {

    refreshProfile () {
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



    componentDidMount() {
       this.refreshProfile()

    }


    componentDidUpdate(prevProps: Readonly<CommonPropsType>, prevState: Readonly<{}>) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }


    render() {

        return (
            <>
                <Profile {...this.props}
                         isOwner={!this.props.match.params.userId}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatusTC}
                         changePhoto={this.props.changePhotoTC}
                         editProfileDataTC={this.props.editProfileDataTC}
                         changeProfileUpdateSuccessAC={this.props.changeProfileUpdateSuccessAC}
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
    connect(mapStateToProps, {getProfileTC, getStatusTC, updateStatusTC, changePhotoTC, editProfileDataTC, changeProfileUpdateSuccessAC}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);
