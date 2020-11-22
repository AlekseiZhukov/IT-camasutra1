import React from 'react';
import {connect} from "react-redux";
import {
    follow, getUsers,
    setCurrentPage,
    toggleFollowingProgress,
    unFollow
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
//import {usersApi} from "../../api/api";


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
        /*this.props.toggleIsFetching(true);

        usersApi.getUsers(this.props.currentPage, this.props.pageSize).then(data => {

                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
            });*/
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
        /*this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        usersApi.getUsers(pageNumber, this.props.pageSize).then(data => {
                this.props.setUsers(data.items)
                this.props.toggleIsFetching(false);
            });*/
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users
                totalUsersCounts={this.props.totalUsersCounts}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged ={this.onPageChanged}
                users = {this.props.users}
                unFollow={this.props.unFollow}
                follow={this.props.follow}

                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCounts: state.usersPage.totalUsersCounts,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}


//export default connect(mapStateToProps,
//    {follow, unFollow, setCurrentPage, toggleFollowingProgress, getUsers})(UsersContainer);
export default compose (
    //withAuthRedirect,
    connect(mapStateToProps,
        {follow, unFollow, setCurrentPage, toggleFollowingProgress, getUsers})
)(UsersContainer)
