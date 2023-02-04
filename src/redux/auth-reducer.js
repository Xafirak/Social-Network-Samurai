// @ts-nocheck

import { AuthAPI } from "./../API/api";
const SET_USER_DATA = "SET_USER_DATA";
const SET_ERROR = "SET_ERROR";

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

export const setError = (error = true) => ({
    type: SET_ERROR,
    error,
});
export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: { userId, email, login, isAuth },
});
export const getAuthData = () => {
    return (dispatch) => {
        AuthAPI.AuthMe()
            .then((data) => {
                if (data.resultCode === 0) {
                    let { id, email, login } = data.data;
                    dispatch(setAuthUserData(id, email, login, true));
                }
            })
            .catch((e) => console.error(e));
    };
};

export const LoginUser = (email, password, rememberMe) => {
    return (dispatch) => {
        AuthAPI.LoginMe(email, password, rememberMe)
            .then((response) => {
                console.log(response);
                if (response.data.resultCode === 0) {
                    dispatch(getAuthData());
                } else if (response.data.resultCode === 1) {
                    dispatch(setError());
                } else if (response.data.resultCode === 10) {
                    let message = response.data.messages[0];
                    dispatch(setError(message));
                }
            })
            .catch((e) => console.error(e));
    };
};
export const Logout = () => {
    return (dispatch) => {
        AuthAPI.Logout()
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false));
                }
            })
            .catch((e) => console.error(e));
    };
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
