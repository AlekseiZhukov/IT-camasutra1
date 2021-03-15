import {profileApi, usersApi} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'

let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 11},
        {id: 3, message: "Bla-bla", likesCount: 0},
    ],

    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPost,
                likesCount: 0
            };
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost]
            }


        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }

        default:
            return state;
    }
}

export const addPostActionCreator = (newPost) => ({type: ADD_POST, newPost});
const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile: profile})
const setStatusUser = (status) => ({type: SET_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_POST, postId})

// DAL lear
export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersApi.getProfileUser(userId);
    dispatch(setUserProfile(response.data))

}

export const getUserStatus = (userId) => async (dispatch) => {
    let response = await profileApi.getStatusUser(userId);
    dispatch(setStatusUser(response.data))

}
export const updateUserStatus = (status) => async (dispatch) => {
    let response = await profileApi.updateStatusUser(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatusUser(status))
    }
}


export default profileReducer;