import {profileApi, usersApi} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType } from "../types/types";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'
const SET_EDIT_MODE_PROFILE = 'SET_EDIT_MODE_PROFILE'



let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 11},
        {id: 3, message: "Bla-bla", likesCount: 0},
    ] as Array<PostType>,

    profile: null as ProfileType | null,
    status: '',
    editModeProfile: false,
    newPostText: ''
}

export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): initialStateType => {

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

        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos} as ProfileType
            }

        case SET_EDIT_MODE_PROFILE:
            return {
                ...state,
                editModeProfile: action.value
            }

        default:
            return state;
    }
}

type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPost: string
}
export const addPostActionCreator = (newPost: string): AddPostActionCreatorActionType => ({type: ADD_POST, newPost});

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile: profile})

type SetStatusUserActionType = {
    type: typeof SET_STATUS
    status: string
}
const setStatusUser = (status: string): SetStatusUserActionType => ({type: SET_STATUS, status})

type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId})

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

type SetEditModeProfileActionType = {
    type: typeof SET_EDIT_MODE_PROFILE
    value: boolean
}
export const setEditModeProfile = (value: boolean): SetEditModeProfileActionType => ({type: SET_EDIT_MODE_PROFILE, value})
//const saveProfile = (profile)

// DAL lear
export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await usersApi.getProfileUser(userId);
    dispatch(setUserProfile(response.data))
}

export const getUserStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileApi.getStatusUser(userId);
    dispatch(setStatusUser(response.data))
}

export const updateUserStatus = (status: string) => async (dispatch: any) => {
    const response = await profileApi.updateStatusUser(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatusUser(status))
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    const response = await profileApi.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const response = await profileApi.saveProfile(profile);

    if (response.data.resultCode === 0) {
        dispatch(setEditModeProfile(false));
        dispatch(getUserProfile(userId));

    } else {

        const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        /*const error1 = () => {
            const errorObj = {}
            const arrayStrings = response.data.messages[0].split("(")[1].replace(")","").toLowerCase().split("->");
            const key1 = arrayStrings[0];
            const key2 = arrayStrings[1];
            errorObj[key1] = {};
            errorObj[key1][key2] = message
            return  errorObj
        }*/

        dispatch(stopSubmit('EditProfile', {_error: message}));
        //dispatch(stopSubmit('EditProfile', error1()));
    }
}

export default profileReducer;