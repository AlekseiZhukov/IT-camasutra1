import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    saveProfile,
    setEditModeProfile
} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    reFreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId)

    }

    componentDidMount() {
        this.reFreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.reFreshProfile();
        }
    }

    render() {

        return (
            <div>
                <Profile {...this.props}
                    savePhoto={this.props.savePhoto}
                         saveProfile={this.props.saveProfile}
                         isOwner={!this.props.match.params.userId}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateUserStatus={this.props.updateUserStatus}
                         editModeProfile={this.props.editModeProfile}
                         setEditModeProfile={this.props.setEditModeProfile}
                />
            </div>
        )
    }
}


//const AuthRedirectComponent = withAuthRedirect(ProfileContainer)


const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
        editModeProfile: state.profilePage.editModeProfile
    }
}
//const WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)
//export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);
export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile, setEditModeProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);