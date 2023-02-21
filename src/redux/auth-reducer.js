// @ts-nocheck

import { AuthAPI, SecurityAPI } from './../API/api';
const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_ERROR = 'auth/SET_ERROR';
const GET_CAPTCHA_URL_SUCCES = 'auth/GET_CAPTCHA_URL_SUCCES';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    error: false,
    captchaUrl: null, // if null, the captcha is not required
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCES:
            return {
                ...state,
                ...action.payload,
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.error,
            };
        // можно закинуть в другой кейс, если логика индетична
        // case GET_CAPTCHA_URL_SUCCES:
        //     return {
        //         ...state,
        //         ...action.payload,
        //     };
        default:
            return state;
    }
};

export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCES,
    payload: { captchaUrl },
});

export const setAuthError = (error = true) => ({
    type: SET_ERROR,
    error,
});
export const setAuthUserData = (userId, email, login, isAuth, captchaUrl, error) => ({
    type: SET_USER_DATA,
    payload: { userId, email, login, isAuth, captchaUrl, error },
});
export const getAuthData = () => async (dispatch) => {
    let response = await AuthAPI.AuthMe();

    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};

export const LoginUser =
    (email, password, rememberMe, captcha) => async (dispatch) => {
        let response = await AuthAPI.LoginMe(
            email,
            password,
            rememberMe,
            captcha
        );

        if (response.data.resultCode === 0) {
            dispatch(getAuthData());
        } else if (response.data.resultCode === 1) {
            dispatch(setAuthError());
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            let message = response.data.messages[0];
            dispatch(setAuthError(message));
        }
    };

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await SecurityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const Logout = () => async (dispatch) => {
    let response = await AuthAPI.Logout();

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false, null, false));
    }
};

export default authReducer;
