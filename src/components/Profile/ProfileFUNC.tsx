
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
//  Done

export const ProfileFUNC: React.FC = () => {

    //как правильно - вытащить из стейта profilePage в отдельную переменную и из
    // нее вытаскивать нужные данные (error, status, etc.) или для каждой данной 
    // сделать свой селектор из стейта?
    const postData = useSelector((state: AppStateType) => state.profilePage.postData)
    const authorizedUserId = useSelector((state: AppStateType) => state.auth.userId)
    const error = useSelector((state: AppStateType) => state.profilePage.error)
    const status = useSelector((state: AppStateType) => state.profilePage.status)
    const profile = useSelector((state: AppStateType) => state.profilePage.profile)
    const isEditProfileWasSuccesfull = useSelector((state: AppStateType) => state.profilePage.isEditProfileWasSuccesfull)
    const params = useParams()
    const navigate = useNavigate();
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





    let anotherUserId: number | undefined = +params.userId!;
    let userId = authorizedUserId;

    function refreshingProfile(anotherUserId: number | undefined, userId: number) {
        if (!anotherUserId) {
            anotherUserId = userId;
            if (!userId) {
                return navigate('/login');
            }
        }

        showProfile1(anotherUserId);
        getStatus1(anotherUserId);
    }

    useEffect(() => {
        refreshingProfile(anotherUserId as number | undefined, userId as number);
    }, [anotherUserId, userId]);
    return (
        <div>
            <Profile
                profile={profile}
                status={status}
                isOwner={!params.userId}
                postData={postData}
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



