import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";



// type ProfilePropsType = {
//     // state: AllAppStateType
//     // dispatch: (actions: any)=> void
//     // store: ReduxStoreType
// }

export function Profile() {
    debugger
    return (
        <div>
            <ProfileInfo avatar={"https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/beaches--ocean/aerial-view-of-the-beach-shore.jpg"} description={"ava+description"} />
            <MyPostsContainer />
        </div>
    )
}