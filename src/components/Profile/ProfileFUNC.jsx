// @ts-nocheck
import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getStatus, showProfile, savePhoto } from '../../redux/profileReducer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { compose } from 'redux';
import { updateStatus } from '../../redux/profileReducer';
import { addActionCreator } from '../../redux/profileReducer';
import { Navigate } from 'react-router-dom';
import Preloader from '../common/Preloader/preloader';
import { useEffect } from 'react';
import { useState } from 'react';

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
    // window.props = [];
    // window.props.push(props);
    // console.log('render',  props.profilePage);   
    // продолжить искать проблему ререндера, если она есть (проблема)
    return (
        <div>
            {props.profilePage.status && props.profilePage.profile ? (
                <Profile
                    isOwner={!props.router.params.userId}
                    profilePage={props.profilePage}
                    updateStatus={props.updateStatus}
                    addMessage={props.addActionCreator}
                    savePhoto={props.savePhoto}
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
)(ProfileFUNC);
