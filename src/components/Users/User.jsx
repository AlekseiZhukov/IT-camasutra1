import React from "react";
import style from './Users.module.css';
import userPhoto from '../../assets/images/userAvaDefault.jpg'
import {NavLink} from "react-router-dom";


const User = ({user, followingInProgress, follow, unFollow}) => {
    return (
        <div>
                <span>
                    <div>
                        <NavLink to={`./profile/${user.id}`}>
                            <img alt='' className={style.avatar}
                                 src={user.photos.small !== null ? user.photos.small : userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => {
                                          unFollow(user.id);
                                      }}>
                                Unfollow</button>
                            : <button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => {
                                          follow(user.id);
                                      }}>
                                Follow</button>
                        }
                    </div>
                </span>
            <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                </span>
            <br></br>
        </div>


    )
}

export default User