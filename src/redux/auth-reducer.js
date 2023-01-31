// @ts-nocheck

import { AuthAPI } from './../API/api';
const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
    userId: null,
    email: "Your email?",
    login: "Your login",
    password: "Secret word?",
    isFetching: false,
    isAuth: false,
    isRemembed: false,

};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true,
            };
        default:
            return state;
    }
};

export const setAuthUserData = (userId, email, login) => ({
    type: SET_USER_DATA,
    data: { userId, email, login },
});
export const getAuthData = () => {
    return (dispatch) => {
        AuthAPI
            .AuthMe()
            .then((data) => {
                if (data.resultCode === 0) {
                    let { id, email, login } = data.data;
                    dispatch(setAuthUserData(id, email, login));
                }
            })
            .catch((e) => console.error(e));
    };
};

export const LoginUser =(email, password, rememberMe) => {
    return (dispatch) => {
        AuthAPI.LoginMe(email, password, rememberMe)
        .then(data => {
            if (data.resultCode === 0){
                console.log('success');
                let {id} = data.data
                dispatch(setAuthUserData(id));
            }else {
                console.log('doesnt work');
            }
        })
    }
}
export default authReducer;
