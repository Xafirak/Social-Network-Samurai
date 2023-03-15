
import React from 'react';
import Profile from './Profile';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getStatus, profileActions, savePhoto, saveProfile, showProfile, updateStatus } from '../../redux/profileReducer';
import { useEffect } from 'react';
import { AppStateType, DispatchType } from '../../redux/reduxStore';
import { profileType } from '../../types/types';
import { useSelector } from 'react-redux';

// надо ли в функциональной компоненте разделять пропсы примитивные и  
// пропсы-методы (как в классовой) 


// ДЗ  избавить компоненту от коннекта и withRouter
//  ITS ALIVE !!!   ALIVE !!!!

export const ProfileFUNC: React.FC = (props) => {


    const profilePage = useSelector((state: AppStateType) => state.profilePage)
    const authorizedUserId = useSelector((state: AppStateType) => state.auth.userId)
    const error = profilePage.error
    const isEditProfileWasSuccesfull = profilePage.isEditProfileWasSuccesfull
    const params = useParams()
    const dispatch: DispatchType = useDispatch()

    const showProfile1 = (userId: number) => {
        dispatch(showProfile(userId))
    }

    const getStatus1 = (userId: number) => {
        dispatch(getStatus(userId))
    }

    const updateStatus1 = (status: string) => {
        dispatch(updateStatus(status))
    }
    const savePhoto1 = (photos: File) => {
        dispatch(savePhoto(photos))
    }
    const saveProfile1 = (profile: profileType) => {
        dispatch(saveProfile(profile))
    }
    const addActionCreator = (messageBody: string) => {
        dispatch(profileActions.addActionCreator(messageBody))
    }


    const navigate = useNavigate();

    //как тупому ТСу сказать, что мне насрать, что возможен undefined ????
    let anotherUserId: number | undefined = +params.userId!;
    let userId = authorizedUserId;

    function refreshingProfile(a: number | undefined, b: number) {
        if (!a) {
            a = b;
            if (!b) {
                return navigate('/login');
            }
        }

        showProfile1(a);
        getStatus1(a);
    }

    useEffect(() => {
        refreshingProfile(anotherUserId as number | undefined, userId as number);
    }, [anotherUserId, userId]);
    // ниже - попытка убрать ненужные ререндеры (ненужные ли?)
    return (
        <div>
            {/* {props.profilePage.status && props.profilePage.profile ? ( */}
            {/* @ts-ignore */}
            <Profile
                isOwner={!params.userId}
                profilePage={profilePage}
                updateStatus={updateStatus1}
                addMessage={addActionCreator}
                savePhoto={savePhoto1}
                saveProfile={saveProfile1}
                error={error}
                isEditProfileWasSuccesfull={isEditProfileWasSuccesfull}
            />
        </div>
    );
};



