import React from 'react';
import {connect} from "react-redux";
import {
    follow, requestUsers,
    setCurrentPage,
    toggleFollowingProgress,
    unFollow
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
//import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getUsers,
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCounts
} from "../../redux/users-selectors";



class UsersContainer extends React.Component {

    componentDidMount() {
        const {getUsers, currentPage, pageSize} =this.props
        getUsers(currentPage, pageSize);
        /*this.props.toggleIsFetching(true);

        usersApi.getUsers(this.props.currentPage, this.props.pageSize).then(data => {

                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
            });*/
    }

    onPageChanged = (pageNumber) => {
        const {getUsers, pageSize} = this.props
        getUsers(pageNumber, pageSize);
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


/*let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCounts: state.usersPage.totalUsersCounts,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}*/
let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCounts: getTotalUsersCounts(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

//export default connect(mapStateToProps,
//    {follow, unFollow, setCurrentPage, toggleFollowingProgress, getUsers})(UsersContainer);
export default compose (
   // withAuthRedirect,
    connect(mapStateToProps,
        {follow, unFollow, setCurrentPage, toggleFollowingProgress, getUsers: requestUsers})
)(UsersContainer)
