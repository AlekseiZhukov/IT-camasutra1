import React from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
//import {updateUserStatus} from "../../../redux/profileReducer";


const ProfileInfo = ({profile, status, updateUserStatus}) => {
    if (!profile) {
        return <Preloader />
    }
    return (
        <div >

            <div className={s.descriptionBlock}>
                <h1>{profile.fullName}</h1>
                <img src={profile.photos.large} alt={""}/>
                <ProfileStatusWithHooks
                    status={status}
                    updateUserStatus={updateUserStatus}
                />
                <p>{profile.aboutMe}</p>

            </div>
        </div >
    )
}


export default ProfileInfo