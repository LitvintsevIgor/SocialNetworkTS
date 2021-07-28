import React from "react";
import {ProfileFormDataType, ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "./ProfileContainer";
import {photoFileType} from "../../redux/profile-reducer";


type ProfilePropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    changePhoto: (file: photoFileType) => void
    editProfileDataTC: (formData: ProfileFormDataType) => void
    changeProfileUpdateSuccessAC: (profileUpdateSuccess: boolean) => void
}


export const Profile = React.memo((props: ProfilePropsType) =>  {

    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         isOwner={props.isOwner}
                         changePhoto={props.changePhoto}
                         editProfileDataTC={props.editProfileDataTC}
                         changeProfileUpdateSuccessAC={props.changeProfileUpdateSuccessAC}

            />
            <MyPostsContainer />
        </div>
    )
})