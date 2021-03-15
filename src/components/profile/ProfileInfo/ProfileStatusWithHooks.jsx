import React, {useEffect, useState} from 'react';
import s from './ProfileInfo.module.css'


const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMOde = () => {
        setEditMode(true)
    }

    const deActivateEditMOde = () => {
        setEditMode(false)
        props.updateUserStatus(status);
    }



    const onStatusChange = (event) => {
        const newStatus = event.target.value
        setStatus(newStatus)
    }

    return (
        <div>
            { !editMode &&
            <div>
                <span onDoubleClick={activateEditMOde}>{props.status || 'no status'}</span>
            </div>
            }

            {editMode &&
            <div>
                <input autoFocus={true} onBlur={deActivateEditMOde} onChange={onStatusChange}
                       value={status}
                       />
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks