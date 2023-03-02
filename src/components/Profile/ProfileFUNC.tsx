
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
import addActionCreator from "../../redux/profileReducer"
import { useEffect } from 'react';
import { AppStateType } from '../../redux/reduxStore';

// надо ли в функциональной компоненте разделять пропсы примитивные и  
// пропсы-методы (как в классовой) 
type propsType = {
    router: {
        params: { userId: number; }
        navigate: any
        location: any
    }

    error: boolean | string
    profilePage: any;
    authorizedUserId: number

    savePhoto: () => void
    saveProfile: () => void
    showProfile: (a: number) => void
    getStatus: (a: number) => void
    updateStatus: (status: string) => void
    addActionCreator: () => void
}

const ProfileFUNC = (props: propsType) => {


    const navigate = useNavigate();
    let anotherUserId = props.router.params.userId;
    let userId = props.authorizedUserId;

    function refreshingProfile(a: number, b: number) {
        if (!a) {
            a = b;
            if (!b) {
                return navigate('/login');
            }
        }

        props.showProfile(a);
        props.getStatus(a);
    }

    useEffect(() => {
        refreshingProfile(anotherUserId, userId);
    }, [anotherUserId, userId]);
    // ниже - попытка убрать ненужные ререндеры (ненужные ли?)
    return (
        <div>
            {/* {props.profilePage.status && props.profilePage.profile ? ( */}
            {/* @ts-ignore */}
            <Profile
                isOwner={!props.router.params.userId}
                profilePage={props.profilePage}
                updateStatus={props.updateStatus}
                addMessage={props.addActionCreator}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
                error={props.error}
            />
            {/* ) : (
                <Preloader />
            )} */}
        </div>
    );
};

let mapStateToProps = (state: AppStateType) => ({
    profilePage: state.profilePage,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    error: state.profilePage.error,
});

// wrapper идентичный натуральному, без пальмового масла
//@ts-ignore
let withRouter = (Comp) => {
    function ComponentWithRouterProp(props: any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        //@ts-ignore
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
)(ProfileFUNC);
