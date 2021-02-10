import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";

export type PostsType = {
    id: number
    message: string
    likesCount: number
}

export function Profile() {

    let posts: PostsType[] = [
        {id: 1, message: "Hello, how are you?", likesCount: 23},
        {id: 2, message: "Its my first post", likesCount: 5}
    ]

    return (
        <div>
            <ProfileInfo avatar={"https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/beaches--ocean/aerial-view-of-the-beach-shore.jpg"} description={"ava+description"} />
            <MyPosts posts={posts}/>
        </div>
    )
}