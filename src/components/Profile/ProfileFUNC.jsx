// @ts-nocheck
import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {
    getStatus,
    showProfile,
    savePhoto,
    saveProfile,
} from '../../redux/profileReducer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { compose } from 'redux';
import { updateStatus } from '../../redux/profileReducer';
import { addActionCreator } from '../../redux/profileReducer';
import Preloader from '../common/Preloader/preloader';
import { useEffect } from 'react';

const ProfileFUNC = (props) => {
    useEffect(() => {
        let userId = props.router.params.userId;
        if (!userId) {
            userId = props.authorizedUserId;
            if (!userId) return;
        }
        props.showProfile(userId);
        props.getStatus(userId);
    }, []);

    return (
        <div>
            {props.profilePage.status && props.profilePage.profile ? (
                <Profile
                    isOwner={!props.router.params.userId}
                    profilePage={props.profilePage}
                    updateStatus={props.updateStatus}
                    addMessage={props.addActionCreator}
                    savePhoto={props.savePhoto}
                    saveProfile={props.saveProfile}
                    error={props.error}
                />
            ) : (
                <Preloader />
            )}
        </div>
    );
};

let mapStateToProps = (state) => ({
    profilePage: state.profilePage,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    error: state.profilePage.error,
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
        saveProfile,
    }),
    withRouter
    // WithAuthRedirect
)(ProfileFUNC);
