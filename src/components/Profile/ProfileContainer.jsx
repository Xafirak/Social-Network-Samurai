// @ts-nocheck
import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getStatus, showProfile, savePhoto } from '../../redux/profileReducer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { compose } from 'redux';
import { updateStatus } from './../../redux/profileReducer';
import { addActionCreator } from './../../redux/profileReducer';
import { Navigate } from 'react-router-dom';
import Preloader from '../common/Preloader/preloader';

class ProfileContainer extends React.Component {
    
    refreshProfile() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) return;
        }
        //////////////////попробовать переписать в классовую компоненту
        /// при загрузке авы - страница падает, найти ошибку
        // возможно потому что фотка отправляется 2 раза
        this.props.showProfile(userId);
        this.props.getStatus(userId);
    }
    componentDidMount() {
        this.refreshProfile();
    }
    // старый метод для классовых компонент, сейчас юзают useEffect
    componentDidUpdate(prevProps, prevState, shot) {
        if (this.props.router.params.userId !== prevProps.router.params.userId)
            this.refreshProfile();
    }

    //     this.props.ProfilePage.profile, this.props.ProfilePage.status = ProfileAndStatus

    render() {
        if (!this.props.authorizedUserId && !this.props.router.params.userId) {
            return <Navigate to={'/login'} />;
        }

        console.log(this.props);

        return (
            <div>
                <Profile
                    isOwner={!this.props.router.params.userId}
                    {...this.props}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                    addMessage={this.props.addActionCreator}
                    savePhoto={this.props.savePhoto}
                />
            </div>
        );
    }
}

//==================

let mapStateToProps = (state) => ({
    profilePage: state.profilePage,
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
});

// wrapper идентичный натуральному, без пальмового масла
let withRouter = (Comp) => {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Comp {...props} router={{ location, navigate, params }} />;
    }
    return ComponentWithRouterProp;
};

export default compose(
    connect(mapStateToProps, {
        showProfile,
        getStatus,
        updateStatus,
        addActionCreator,
        savePhoto,
    }),
    withRouter
    // WithAuthRedirect
)(ProfileContainer);
