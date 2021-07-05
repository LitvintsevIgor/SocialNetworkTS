import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "./ProfileContainer";
import {photoFileType} from "../../redux/profile-reducer";


type ProfilePropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    changePhoto: (file: photoFileType) => void
}


export const Profile = React.memo((props: ProfilePropsType) =>  {

    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         isOwner={props.isOwner}
                         changePhoto={props.changePhoto}

            />
            <MyPostsContainer />
        </div>
    )
})