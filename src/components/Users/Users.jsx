import React from "react";
import style from './Users.module.css';
import userPhoto from '../../assets/images/userAvaDefault.jpg'
import {NavLink} from "react-router-dom";
import * as axios from "axios";
import {usersApi} from "../../api/api";

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCounts / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let currentPage = props.currentPage

    return (
        <div>
            <div>
                {pages.map(elem => {
                    return (
                        <span
                            className={currentPage === elem ? style.selectedPage : style.numberPage}
                            onClick={(event) => {
                                props.onPageChanged(elem)
                            }}
                        >{elem}</span>)
                    })
                }

            </div>
            {
                props.users.map(user => {
                    return (<div key={user.id}>
                        <span>
                            <div>
                                <NavLink to={`./profile/${user.id}`}>
                                <img alt='' className={style.avatar}
                                     src={user.photos.small !== null ? user.photos.small : userPhoto}/>
                                </NavLink>
                            </div>
                            <div>
                                {user.followed

                                    ? <button disabled={props.followingInProgress.some(id => id === user.id)}
                                              onClick={() => {props.unFollow(user.id);}}>
                                        Unfollow</button>
                                    : <button disabled={props.followingInProgress.some(id => id === user.id)}
                                              onClick={() => {props.follow(user.id);}}>
                                        Follow</button>
                                }
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{user.name}</div>
                                <div>{user.status}</div>
                            </span>
                        </span><br></br>
                    </div>)
                })
            }
        </div>
    )
}

export default Users