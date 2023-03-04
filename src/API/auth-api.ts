import { instance, APIResponseType, resultCodeForCaptchaEnum, resultCodesEnum } from "./api";


export const AuthAPI = {
    AuthMe() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    LoginMe(email: string, password: string, rememberMe: boolean = false, captcha: string = '') {
        return instance.post<APIResponseType<loginResponseDataType, resultCodesEnum | resultCodeForCaptchaEnum>>('auth/login', {
            email,
            password,
            rememberMe,
            captcha,
        }).then(res => res.data)
    },
    Logout() {
        return instance.delete('auth/login');
    },
};



type MeResponseDataType = {
    id: number
    email: string
    login: string
}
type loginResponseDataType = {
    iserId: number
}



