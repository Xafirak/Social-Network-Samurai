
import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { compose } from 'redux';
import { getStatus, profileActions, savePhoto, saveProfile, showProfile, updateStatus } from '../../redux/profileReducer';
import { useEffect } from 'react';
import { AppStateType } from '../../redux/reduxStore';
import { profileInitialStateType } from '../../redux/profileReducer';
import { profileType } from '../../types/types';
import { routerPropsType } from '../../App';

// надо ли в функциональной компоненте разделять пропсы примитивные и  
// пропсы-методы (как в классовой) 


const ProfileFUNC: React.FC<profilePropsType> = (props) => {

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
        refreshingProfile(anotherUserId as number, userId as number);
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
                isEditProfileWasSuccesfull={props.isEditProfileWasSuccesfull}
            />
            {/* ) : (
                <Preloader />
            )} */}
        </div>
    );
};



let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profilePage: state.profilePage,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    error: state.profilePage.error,
    isEditProfileWasSuccesfull: state.profilePage.isEditProfileWasSuccesfull
});

type profilePropsType = routerPropsType & mapStateToPropsType & mapDispatchToPropsType

type mapStateToPropsType = {
    profilePage: profileInitialStateType
    authorizedUserId: number | null
    isAuth: boolean
    error: Array<string> | boolean
    isEditProfileWasSuccesfull: boolean
}


type mapDispatchToPropsType = {
    savePhoto: (photos: File) => void
    saveProfile: (profile: profileType) => Promise<any>
    showProfile: (a: number | null) => void
    getStatus: (a: number | null) => void
    updateStatus: (status: string | undefined) => void
    addActionCreator: (messageBody: string) => void
}

// wrapper идентичный натуральному, без пальмового масла

let withRouter = (Comp: React.FC) => {
    function ComponentWithRouterProp(props: routerPropsType) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        //@ts-ignore
        return <Comp {...props} router={{location,navigate,params}} />;
    }
    return ComponentWithRouterProp;
};

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        showProfile,
        getStatus,
        updateStatus,
        savePhoto,
        saveProfile,
        ...profileActions
    }),
    withRouter
)(ProfileFUNC);
