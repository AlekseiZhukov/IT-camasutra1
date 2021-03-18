import React from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhoto from "../../../assets/images/userAvaDefault.jpg";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";
//import {updateUserStatus} from "../../../redux/profileReducer";


const ProfileInfo = ({profile, status, updateUserStatus, isOwner, savePhoto, saveProfile,
                         editModeProfile,
                         setEditModeProfile}) => {

    //let [editMode, setEditMode] = useState(false);

    const goToEditMode = () => {
        setEditModeProfile(true)
    }
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData);

    }

    return (
        <div>

            <div className={s.descriptionBlock}>
                <h1>{profile.fullName}</h1>
                <img src={profile.photos.large || userPhoto} alt={""} className={s.avatar}/>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                {editModeProfile
                    ? <ProfileDataForm initialValues={profile} onSubmit={onSubmit} profile={profile}/>
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={goToEditMode}/>}

                <ProfileStatusWithHooks
                    status={status}
                    updateUserStatus={updateUserStatus}
                />
            </div>
        </div>
    )
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (
       <div>
           {isOwner && <div><button onClick={goToEditMode}>редактировать профиль</button></div>}
           {profile.lookingForAJob && <div><p>В поиске работы</p> <p><b>мои навыки: </b>{profile.lookingForAJobDescription}</p></div>}
           <div>
               <h3>Обо мне: </h3>
               <p>{profile.aboutMe}</p>
           </div>
           <div>
               <h3>Мои контакты: </h3>
               {Object.keys(profile.contacts).map(key => {
                   return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
               })}
           </div>
       </div>
    )
}



const Contacts = ({contactTitle, contactValue}) => {
    return <p><b>{contactTitle}: </b>{contactValue ? contactValue : "------------" }</p>
}

export default ProfileInfo