// @ts-nocheck
import { profileAPI } from './../API/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCES = 'SAVE_PHOTO_SUCCES';
const SET_PROFILE_ERROR = 'profile/SET_ERROR';

export const addActionCreator = (messageBody) => ({
    type: ADD_POST,
    messageBody,
});
export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile,
});
export const setStatus = (status) => ({
    type: SET_STATUS,
    status,
});
export const deletePost = (postId) => ({
    type: DELETE_POST,
    postId,
});

export const savePhotoSuccess = (photos) => ({
    type: SAVE_PHOTO_SUCCES,
    photos,
});
export const setProfileError = (error = true) => ({
    type: SET_PROFILE_ERROR,
    error,
});

export const showProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
};

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === 0) dispatch(setStatus(status));
};

export const savePhoto = (photos) => async (dispatch) => {
    let response = await profileAPI.savePhoto(photos);

    if (response.data.resultCode === 0)
        dispatch(savePhotoSuccess(response.data.data.photos));
};

export const saveProfile = (profile) => async (dispatch, getState) => {
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

    // Слизано, аботает, но при передаче в компоненту реакт ругается, что пропс
    //является обьектом, что недопустимо о_О
    // const getErrors = (messages) => {
    //     let errors = Object.keys(messages).reduce((acc, key) => {
    //         let errorMessage = messages[key]
    //             .split('>')[1]
    //             .toLowerCase()
    //             .slice(0, -1);
    //         // console.log([errorMessage], messages[key]);
    //         return { ...acc, [errorMessage]: messages[key] };
    //     }, {});
    //     console.log(errors);
    //     return errors;
    // };

    if (response.data.resultCode === 0) {
        dispatch(showProfile(userId));
    } else if (response.data.resultCode === 1) {
        let message = response.data.messages;
        // getErrors(message);
        dispatch(setProfileError(message));
    }
};

let initialState = {
    postData: [
        { id: 1, message: 'HOWDY partner!', likes: 2 },
        { id: 2, message: "It's my first post", likes: 7 },
        { id: 3, message: 'Hahahhaha', likes: 1 },
        { id: 4, message: 'l2p nub', likes: 420 },
    ],

    profile: false,
    status: false,
    error: false,
};

const profileReducer = (state = initialState, action) => {
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
                profile: { ...state.profile, photos: action.photos },
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
