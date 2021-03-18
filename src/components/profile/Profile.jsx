import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
//import {Redirect} from "react-router-dom";
//import {updateUserStatus} from "../../redux/profileReducer";

const Profile = (props) => {

    return (
        <div >
            <ProfileInfo
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateUserStatus={props.updateUserStatus}
                editModeProfile={props.editModeProfile}
                setEditModeProfile={props.setEditModeProfile}
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