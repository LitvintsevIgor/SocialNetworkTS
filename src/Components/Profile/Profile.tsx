import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionsTypes, ProfilePageType} from "../../redux/state";



type ProfilePropsType = {
    state: ProfilePageType
    // addPostToState: () => void
    // updateNewPostText: (newText: any) => void
    dispatch: (action: ActionsTypes) => void
}

export function Profile(props: ProfilePropsType) {
    return (
        <div>
            <ProfileInfo avatar={"https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/beaches--ocean/aerial-view-of-the-beach-shore.jpg"} description={"ava+description"} />
            <MyPosts posts={props.state.posts}
                     dispatch={props.dispatch.bind(props.dispatch)}
                     // addPostToState={props.addPostToState}
                     // updateNewPostText={props.updateNewPostText}
                     newPostText={props.state.newPostText}/>
        </div>
    )
}