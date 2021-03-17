import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {StoreType} from "../../redux/state";



type ProfilePropsType = {
    store: StoreType
}

export function Profile(props: ProfilePropsType) {

    let state = props.store.getState()

    return (
        <div>
            <ProfileInfo avatar={"https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/beaches--ocean/aerial-view-of-the-beach-shore.jpg"} description={"ava+description"} />
            <MyPosts posts={state.profilePage.posts}
                     dispatch={props.store.dispatch.bind(props.store)}
                     newPostText={state.profilePage.newPostText}
            />
        </div>
    )
}