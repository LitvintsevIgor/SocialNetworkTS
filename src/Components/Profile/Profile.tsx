import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "./ProfileContainer";


type ProfilePropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}


export const Profile = React.memo((props: ProfilePropsType) =>  {

    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
            />
            <MyPostsContainer />
        </div>
    )
})