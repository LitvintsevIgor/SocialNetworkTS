import React from "react";
import s from "./Profile.module.css";
import {MyPosts} from "./MyPosts/MyPosts";


export function Profile () {
    return (
        <div>
            <img src="https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/beaches--ocean/aerial-view-of-the-beach-shore.jpg" alt=""/>
            <div>
                ava+description
            </div>
           <MyPosts/>
        </div>
    )
}