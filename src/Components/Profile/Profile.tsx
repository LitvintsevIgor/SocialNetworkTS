import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {AllAppStateType} from "../../redux/redux-store";



type ProfilePropsType = {
    state: AllAppStateType
    dispatch: (actions: any)=> void
}

export function Profile(props: ProfilePropsType) {


    return (
        <div>
            <ProfileInfo avatar={"https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/beaches--ocean/aerial-view-of-the-beach-shore.jpg"} description={"ava+description"} />
            <MyPosts posts={props.state.profilePage.posts}
                     dispatch={props.dispatch}
                     newPostText={props.state.profilePage.newPostText}
            />
        </div>
    )
}