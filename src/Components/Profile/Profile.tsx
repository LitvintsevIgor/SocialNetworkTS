import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";



// type ProfilePropsType = {
//     // state: AllAppStateType
//     // dispatch: (actions: any)=> void
//     // store: ReduxStoreType
// }

export function Profile(props: any) {
    return (
        <div>
            <ProfileInfo profile={props.profile} />
            <MyPostsContainer />
        </div>
    )
}