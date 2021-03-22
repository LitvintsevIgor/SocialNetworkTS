import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {AllAppStateType} from "../../redux/redux-store";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {Store} from "redux";



type ProfilePropsType = {
    // state: AllAppStateType
    // dispatch: (actions: any)=> void
    store: Store
}

export function Profile(props: ProfilePropsType) {


    return (
        <div>
            <ProfileInfo avatar={"https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/beaches--ocean/aerial-view-of-the-beach-shore.jpg"} description={"ava+description"} />
            <MyPostsContainer store={props.store}/>
        </div>
    )
}