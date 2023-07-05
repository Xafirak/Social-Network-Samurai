// import { resultCodesEnum } from "./../API/";
import { profileType, photosType, postDataType } from '../types/types';
import { baseThunkType, InferActionsTypes } from './reduxStore';
import { profileAPI } from './../API/priofile-api';
import { resultCodesEnum } from '../API/api';


export const profileActions = {
    addActionCreator: (messageBody: string) => ({
        type: 'ADD_POST',
        messageBody,
    } as const),
    setUserProfile: (profile: profileType) => ({
        type: 'SET_USER_PROFILE',
        profile,
    } as const),
    setStatus: (status: string) => ({
        type: 'SET_STATUS',
        status,
    } as const),
    deletePost: (postId: number) => ({
        type: 'DELETE_POST',
        postId,
    } as const),
    savePhotoSuccess: (photos: photosType) => ({
        type: 'SAVE_PHOTO_SUCCES',
        photos,
    } as const),
    setProfileError: (error: Array<string> | boolean) => ({
        type: 'SET_PROFILE_ERROR',
        error,
    } as const),
    setEditProfile: () => ({
        type: 'SET_EDIT_PROFILE_MODE',        
    }as const)
}


export const showProfile = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(profileActions.setUserProfile(response));
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(profileActions.setStatus(response));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    // try {
    let response = await profileAPI.updateStatus(status);

    if (response.resultCode === resultCodesEnum.success) dispatch(profileActions.setStatus(status));
    if (response.resultCode === resultCodesEnum.error) {
        let message = response.messages;
        dispatch(profileActions.setProfileError(message));

        // } catch (error)
        //сделать логику если сюда приходит resultCode === 1, вывести ошибку
        // код 1 - не ошибка, поэтому не может отображатся в catch, если
        // я правильно понимаю
    }
};

export const savePhoto = (photos: File): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(photos);

    if (response.resultCode === resultCodesEnum.success)
        dispatch(profileActions.savePhotoSuccess(response.data.photos));
};

export const saveProfile = (profile: profileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);

    // это мое, дальше вообще без понятия как преобразовать для выдачи
    // ошибки, и правильно ли я сделал
    // const getErrors = (messages) => {
    //     let name = messages.map((e) =>
    //         e.split('>')[1].toLowerCase().slice(0, -1)
    //     );

    //     console.log(name);
    // };

    // Слизано, работает, но при передаче в компоненту реакт ругается, что пропс
    //является обьектом, что недопустимо о_О

    // const getErrors = (messages: any): object => {
    //     let errors = Object.keys(messages).reduce((acc, key) => {
    //         let errorMessage = messages[key]
    //             .split('>')[1]
    //             .toLowerCase()
    //             .slice(0, -1);
    //         return { ...acc, [errorMessage]: messages[key] };
    //     }, {});
    //     console.log(errors);
    //     return errors;
    // };

    if (response.resultCode === resultCodesEnum.success) {
        if (userId !== null) {
            dispatch(showProfile(userId))           
            dispatch(profileActions.setEditProfile())
            dispatch(profileActions.setProfileError(false))
        } else {
            throw new Error('userId cant be null')
        }
        
    } else if (response.resultCode === resultCodesEnum.error) {
        let message = response.messages;
        // dispatch(profileActions.setProfileError(getErrors(message)));
        dispatch(profileActions.setProfileError(message));
    }
};


let initialState = {
    postData: [
        { id: 1, message: 'HOWDY partner!', likes: 2 },
        { id: 2, message: "It's my first post", likes: 7 },
        { id: 3, message: 'Hahahhaha', likes: 1 },
        { id: 4, message: 'l2p nub', likes: 420 },
    ] as Array<postDataType>,
    isEditProfileWasSuccesfull: false as boolean,
    profile: undefined as profileType | undefined,
    status: '' as string | undefined,
    error: false as Array<string> | boolean,
};



const profileReducer = (state = initialState, action: profileActionsType): profileInitialStateType => {
    switch (action.type) {
        case "ADD_POST": {
            let newPost = {
                id: state.postData.length + 1,
                message: action.messageBody,
                likes: 0,
            };

            // let stateCopy = JSON.parse(JSON.stringify(state));
            // использую новый метод клонирования
            let stateCopy = structuredClone(state);
            stateCopy.postData.push(newPost);
            return stateCopy;
        }

        case 'SET_USER_PROFILE': {
            return { ...state, profile: action.profile };
        }
        case 'SET_STATUS': {
            return { ...state, status: action.status };
        }
        case 'DELETE_POST': {
            return {
                ...state,
                postData: state.postData.filter((p) => p.id !== action.postId),
            };
        }
        case 'SAVE_PHOTO_SUCCES': {
            return {
                ...state,
                profile: { ...(state.profile as profileType), photos: action.photos },
            };
        }
        case 'SET_PROFILE_ERROR': {
            return {
                ...state,
                error: action.error,
            };
        }
        case 'SET_EDIT_PROFILE_MODE':{
            return {
                ...state,
                isEditProfileWasSuccesfull: true
            }
        }
        default:
            return state;
    }
};

export default profileReducer;

type profileActionsType = InferActionsTypes<typeof profileActions>
export type profileInitialStateType = typeof initialState;
type ThunkType = baseThunkType<profileActionsType>
