import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = ({currentPage, onPageChanged, totalUsersCounts, pageSize, users, ...props}) => {

    return (
        <div>
            <Paginator
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalItemsCounts={totalUsersCounts}
                pageSize={pageSize}
            />
            <div>
            {users.map(user => <User user={user}
                                     key={user.id}
                                     followingInProgress={props.followingInProgress}
                                     follow={props.follow}
                                     unFollow={props.unFollow}
            />)}
            </div>
        </div>
    )
}

export default Users