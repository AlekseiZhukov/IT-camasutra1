import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import {getUserProfile, getUserStatus, updateUserStatus} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
//import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = 11886
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId)
    }

    render () {

        return (
            <div >
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateUserStatus={this.props.updateUserStatus}
                />
            </div >
        )
    }
}


//const AuthRedirectComponent = withAuthRedirect(ProfileContainer)


const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status

    }
}
//const WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)
//export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);
export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
    withRouter,
    //withAuthRedirect
)(ProfileContainer);