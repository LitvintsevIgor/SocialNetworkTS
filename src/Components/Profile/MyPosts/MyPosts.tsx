import React from "react";
import {InitialStateType} from "../../../redux/profile-reducer";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {InjectedFormProps, Field, reduxForm} from "redux-form";


type MyPostsPropsType = {
    profilePage: InitialStateType
    addPost: (newPostBody: string) => void
}


export function MyPosts(props: MyPostsPropsType) {

    let state = props.profilePage

    let postsElements = state.posts
        .map((p) => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)


    let addNewPost = (values: MyPostFormType) => {
        props.addPost(values.newPostBody);
    }


    return (
        <div className={s.myPosts}>
            My posts
            <div>
                <MyPostReduxForm onSubmit={addNewPost}/>
            </div>

            <div className={s.post}>
                new post
            </div>
            {postsElements}
        </div>
    )
}

type MyPostFormType = {
    newPostBody: string
}

const MyPostForm: React.FC<InjectedFormProps<MyPostFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder={"Enter your post"}
                   name={"newPostBody"}
                   component={"textarea"} />
            <button>Add post</button>
        </form>
    )
}

const MyPostReduxForm = reduxForm<MyPostFormType>({
    // a unique name for the form
    form: 'MyPostForm'
})(MyPostForm)