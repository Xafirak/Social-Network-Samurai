
import { AuthAPI, resultCodeForCaptcha, resultCodesEnum, SecurityAPI } from './../API/api';
import { InferActionsTypes } from './reduxStore';


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    error: false as boolean | string,
    captchaUrl: null as string | null, // if null, the captcha is not required
};
export type initialStateType = typeof initialState

const authReducer = (state = initialState, action: authActionTypes): initialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCES':
            return {

                ...state,
                ...action.payload,


            };
        case 'SET_ERROR':
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

type authActionTypes = InferActionsTypes<typeof authActions>



let authActions = {

    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'GET_CAPTCHA_URL_SUCCES',
        payload: { captchaUrl },
    } as const),
    setAuthError: (error: boolean | string = true) => ({
        type: 'SET_ERROR',
        error,
    } as const),
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean, captchaUrl: string, error: false | string) => ({
        type: 'SET_USER_DATA',
        payload: { userId, email, login, isAuth, captchaUrl, error },
    } as const),


}

export const getAuthData = () => async (dispatch: any) => {
    let meData = await AuthAPI.AuthMe();


    if (meData.resultCode === resultCodesEnum.success) {
        let { id, email, login } = meData.data;
        dispatch(authActions.setAuthUserData(id, email, login, true, '', false));
    }
};


export const LoginUser =
    (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
        let loginData = await AuthAPI.LoginMe(
            email,
            password,
            rememberMe,
            captcha
        );

        if (loginData.resultCode === resultCodesEnum.success) {
            dispatch(getAuthData());
        } else if (loginData.resultCode === resultCodesEnum.error) {
            dispatch(authActions.setAuthError());
        } else {
            if (loginData.resultCode === resultCodeForCaptcha.captcha) {
                dispatch(getCaptchaUrl());
            }
            let message = loginData.messages[0];
            dispatch(authActions.setAuthError(message));
        }
    };



export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await SecurityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(authActions.getCaptchaUrlSuccess(captchaUrl));
};

export const Logout = () => async (dispatch: any) => {
    let response = await AuthAPI.Logout();

    if (response.data.resultCode === resultCodesEnum.success) {
        dispatch(authActions.setAuthUserData(null, null, null, false, '', false));
    }
};

export default authReducer;
