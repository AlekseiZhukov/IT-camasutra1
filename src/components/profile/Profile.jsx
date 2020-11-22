import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {Redirect} from "react-router-dom";
import {updateUserStatus} from "../../redux/profileReducer";

const Profile = (props) => {

    return (
        <div >
            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateUserStatus={props.updateUserStatus}
            />
            <MyPostsContainer />
        </div >
    )
}


export default Profile

// <MyPosts
//     posts={props.state.posts}
//     newPostText={props.state.newPostText}
//     dispatch={props.dispatch}
//
// />