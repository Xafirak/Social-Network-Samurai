// @ts-nocheck
import { usersAPI } from "./../API/api";
const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
    userId: 2,
    email: "defEmail@mail.com",
    login: "defaultLogin",
    isFetching: false,
    isAuth: false,
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
        usersAPI
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
export default authReducer;
