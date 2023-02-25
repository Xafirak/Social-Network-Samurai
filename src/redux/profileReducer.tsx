
import { profileType, photosType, postDataType } from '../types/types';
import { profileAPI } from './../API/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCES = 'SAVE_PHOTO_SUCCES';
const SET_PROFILE_ERROR = 'profile/SET_ERROR';

type addActionCreatorType = {
    type: typeof ADD_POST
    messageBody: string
}
export const addActionCreator = (messageBody: string): addActionCreatorType => ({
    type: ADD_POST,
    messageBody,
});

type setUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: profileType
}

export const setUserProfile = (profile: profileType): setUserProfileActionType => ({
    type: SET_USER_PROFILE,
    profile,
});

type setStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}
export const setStatus = (status: string): setStatusActionType => ({
    type: SET_STATUS,
    status,
});

type deletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}
export const deletePost = (postId: number): deletePostActionType => ({
    type: DELETE_POST,
    postId,
});

type savePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCES,
    photos: photosType
}
export const savePhotoSuccess = (photos: photosType): savePhotoSuccessActionType => ({
    type: SAVE_PHOTO_SUCCES,
    photos,
});

type setProfileErrorActionType = {
    type: typeof SET_PROFILE_ERROR,
    error: any
}
export const setProfileError = (error: any): setProfileErrorActionType => ({
    type: SET_PROFILE_ERROR,
    error,
});

export const showProfile = (userId: Number) => async (dispatch: any) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
};

export const getStatus = (userId: Number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
    // try {
    let response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === 0) dispatch(setStatus(status));
    if (response.data.resultCode === 1) {
        let message = response.data.messages;
        dispatch(setProfileError(message));

        // } catch (error)
        //сделать логику если сюда приходит resultCode === 1, вывести ошибку
        // код 1 - не ошибка, поэтому не может отображатся в catch, если
        // я правильно понимаю
    }
};

export const savePhoto = (photos: photosType) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(photos);

    if (response.data.resultCode === 0)
        dispatch(savePhotoSuccess(response.data.data.photos));
};

export const saveProfile = (profile: profileType) => async (dispatch: any, getState: any) => {
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
    const getErrors = (messages: any): object => {
        let errors = Object.keys(messages).reduce((acc, key) => {
            let errorMessage = messages[key]
                .split('>')[1]
                .toLowerCase()
                .slice(0, -1);
            // console.log([errorMessage], messages[key]);
            return { ...acc, [errorMessage]: messages[key] };
        }, {});
        // console.log(errors);
        // let newErr = Object.keys(errors).map(e => e[e.errors[e]])
        // console.log(newErr);
        return errors;
    };

    if (response.data.resultCode === 0) {
        dispatch(showProfile(userId));
    } else if (response.data.resultCode === 1) {
        let message = response.data.messages;
        // dispatch(setProfileError(getErrors(message)))
        dispatch(setProfileError(getErrors(message)));
    }
};


let initialState = {
    postData: [
        { id: 1, message: 'HOWDY partner!', likes: 2 },
        { id: 2, message: "It's my first post", likes: 7 },
        { id: 3, message: 'Hahahhaha', likes: 1 },
        { id: 4, message: 'l2p nub', likes: 420 },
    ] as Array<postDataType>,

    profile: false as profileType | boolean,
    status: false as string | boolean,
    error: false as string | boolean,
};

export type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case ADD_POST: {
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

        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile };
        }
        case SET_STATUS: {
            return { ...state, status: action.status };
        }
        case DELETE_POST: {
            return {
                ...state,
                postData: state.postData.filter((p) => p.id !== action.postId),
            };
        }
        case SAVE_PHOTO_SUCCES: {
            return {
                ...state,
                profile: { ...(state.profile as profileType), photos: action.photos },
            };
        }
        case SET_PROFILE_ERROR: {
            return {
                ...state,
                error: action.error,
            };
        }
        default:
            return state;
    }
};

export default profileReducer;
