// @ts-nocheck

import { AuthAPI } from './../API/api';
const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_ERROR = 'auth/SET_ERROR';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    error: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};

export const setAuthError = (error = true) => ({
    type: SET_ERROR,
    error,
});
export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: { userId, email, login, isAuth },
});
export const getAuthData = () => async (dispatch) => {
    let response = await AuthAPI.AuthMe();

    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};

export const LoginUser = (email, password, rememberMe) => async (dispatch) => {
    let response = await AuthAPI.LoginMe(email, password, rememberMe);

    if (response.data.resultCode === 0) {
        dispatch(getAuthData());
    } else if (response.data.resultCode === 1) {
        dispatch(setAuthError());
    } else if (response.data.resultCode === 10) {
        let message = response.data.messages[0];
        dispatch(setAuthError(message));
    }
};

export const Logout = () => async (dispatch) => {
    let response = await AuthAPI.Logout();

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};

export default authReducer;

// export const login = (data, setError) => {
//     const {email, password, rememberMe, captcha} = data
//     return (dispatch) => {
//       authAPI.login(email, password, rememberMe, captcha)
//         .then(data => {
//           const {fieldsErrors, resultCode, messages} = data

//           const setFieldsError = () => {
//             if (fieldsErrors.length > 0) {
//               for (let key in fieldsErrors) {
//                 let message = fieldsErrors[key].error
//                 setError(fieldsErrors[key].field, {type: 'server', message})
//               }
//             } else for (let key in messages) {
//               let message = messages[key]
//               setError('common', {type: 'server', message})
//             }
//           }
