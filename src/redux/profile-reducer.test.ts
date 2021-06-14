import {AddPostActionCreator, deletePost, PostsType, profileReducer} from "./profile-reducer";

// start data
let state = {
    posts: [
        {id: 1, message: "Hello, how are you?", likesCount: 23},
        {id: 2, message: "Its my first post", likesCount: 5}
    ] as PostsType[],
    profile: {
        aboutMe: "",
        contacts: {
            facebook: "",
            website: "",
            vk: "",
            twitter: "",
            instagram: "",
            youtube: "",
            github: "",
            mainLink: ""
        },
        lookingForAJob: false,
        lookingForAJobDescription: "",
        fullName: "",
        userId: 0,
        photos: {
            small: "",
            large: ""
        }
    },
    status: ""
}

it('length of message array should be incremented', () => {

    // action
    let action = AddPostActionCreator("Hi")
    let newState = profileReducer(state, action)

    // expectation
    expect(newState.posts.length).toBe(3)
})

it('message of new post should be correct', () => {

    // action
    let action = AddPostActionCreator("Hi")
    let newState = profileReducer(state, action)

    // expectation
    expect(newState.posts[2].message).toBe("Hi")
})

it('after deleting length of message array should be decrement', () => {

    // action
    let action = deletePost(1)
    let newState = profileReducer(state, action)

    // expectation
    expect(newState.posts.length).toBe(1)
})

it('length of message array shouldn`t be changed', () => {

    // action
    let action = deletePost(1000)
    let newState = profileReducer(state, action)

    // expectation
    expect(newState.posts.length).toBe(2)
})

