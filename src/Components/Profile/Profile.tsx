import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {miniAppStateType, PostsType} from "../../App";


type ProfilePropsType = {
    posts: Array<PostsType>
}

export function Profile(props: ProfilePropsType) {
    return (
        <div>
            <ProfileInfo avatar={"https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/beaches--ocean/aerial-view-of-the-beach-shore.jpg"} description={"ava+description"} />
            <MyPosts posts={props.posts}/>
        </div>
    )
}