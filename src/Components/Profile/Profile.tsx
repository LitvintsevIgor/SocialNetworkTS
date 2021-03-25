import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {AllAppStateType, ReduxStoreType} from "../../redux/redux-store";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {Store} from "redux";



type ProfilePropsType = {
    // state: AllAppStateType
    // dispatch: (actions: any)=> void
    // store: ReduxStoreType
}

export function Profile() {


    return (
        <div>
            <ProfileInfo avatar={"https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/beaches--ocean/aerial-view-of-the-beach-shore.jpg"} description={"ava+description"} />
            <MyPostsContainer />
        </div>
    )
}