import {profileApi, usersApi} from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS'

let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 11},
        {id: 3, message: "Bla-bla", likesCount: 0},
    ],
    newPostText: 'it-kamasutra.com',
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action ) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost]
            }

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            };
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

        default:
            return state;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST });
const setUserProfile =(profile) => ({type:SET_USER_PROFILE, profile: profile})
export const updateNewPostTextActionCreator = (newText) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: newText });
const setStatusUser = (status) => ({type: SET_STATUS, status})

// DAL lear
export const getUserProfile = (userId) => {
    return (dispatch) => {
        usersApi.getProfileUser(userId).then(data => {
            dispatch(setUserProfile(data))
        })
    }
}

export const getUserStatus = (userId) => {
    return (dispatch) => {
        profileApi.getStatusUser(userId).then(data => {
            dispatch(setStatusUser(data))
        })
    }
}
export const updateUserStatus = (status) => {
    return (dispatch) => {
        profileApi.updateStatusUser(status).then(data => {
            if(data.resultCode === 0 )
            dispatch(setStatusUser(status))
        })
    }
}



export  default profileReducer;