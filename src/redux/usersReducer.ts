import {usersApi} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'



let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCounts: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> //array of users ids
}

type InitialStateType = typeof initialState
const usersReducer = (state = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                /*users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user
                }),*/
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }

        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCounts: action.count
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}
// action creators:
type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number):FollowSuccessActionType => ({type: FOLLOW, userId})

type UnFollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unFollowSuccess = (userId: number):UnFollowSuccessActionType => ({type: UNFOLLOW, userId})

type SetUsersACActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsersAC = (users: Array<UserType>):SetUsersACActionType => ({type: SET_USERS, users})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number):SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage: currentPage})

type SetTotalUsersCountsACActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCountsAC = (totalUsersCount: number):SetTotalUsersCountsACActionType => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})

type ToggleIsFetchingACActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetchingAC = (isFetching: boolean):ToggleIsFetchingACActionType => ({type: TOGGLE_IS_FETCHING, isFetching})

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number):ToggleFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

//thunk creators:
export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(setCurrentPage(page));
        dispatch(toggleIsFetchingAC(true));

        let data = await usersApi.getUsers(page, pageSize);
        dispatch(toggleIsFetchingAC(false));
        dispatch(setUsersAC(data.items));
        dispatch(setTotalUsersCountsAC(data.totalCount));

    }
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {

    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));

}

export const follow = (userId: number) => {

    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, usersApi.followUser.bind(usersApi), followSuccess)
    }
}
export const unFollow = (userId: number) => {

    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, usersApi.unfollowUser.bind(usersApi), unFollowSuccess)
    }
}

export default usersReducer;