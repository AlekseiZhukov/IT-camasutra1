import React from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from './ProfileStatus'
import {updateUserStatus} from "../../../redux/profileReducer";


const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div >
            {/*<div className={s.imageBlock}>*/}
            {/*    <img src='https://jssors8.azureedge.net/demos/image-slider/img/faded-monaco-scenery-evening-dark-picjumbo-com-image.jpg' alt={""}/>*/}
            {/*</div>*/}
            <div className={s.descriptionBlock}>
                <h1>{props.profile.fullName}</h1>
                <img src={props.profile.photos.large} />
                <ProfileStatus
                    status={props.status}
                    updateUserStatus={props.updateUserStatus}
                />
                <p>{props.profile.aboutMe}</p>

            </div>
        </div >
    )
}


export default ProfileInfo