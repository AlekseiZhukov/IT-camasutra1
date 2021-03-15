import profileReducer, {addPostActionCreator, deletePost} from "./profileReducer";

//import React from "react";

let state = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 11},
        {id: 3, message: "Bla-bla", likesCount: 0},
    ]
}

test('length of post should be incremented', () => {
    //1. test data
    let action = addPostActionCreator("it-kamasutra.com")

    // 2. action
    let newState = profileReducer(state, action)

    //3. expectation
    expect(newState.posts.length).toBe(4)

});

test('message of new post should be correct', () => {
    //1. test data
    let action = addPostActionCreator("it-kamasutra.com")

    // 2. action
    let newState = profileReducer(state, action)

    //3. expectation

    expect(newState.posts[3].message).toBe("it-kamasutra.com")
});

test('after deleting length of messages should be decrement', () => {
    //1. test data
    let action = deletePost(1)

    // 2. action
    let newState = profileReducer(state, action)

    //3. expectation

    expect(newState.posts.length).toBe(2)
});

