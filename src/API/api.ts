import axios from 'axios';
import { userType } from '../types/types';


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '78f4e6a7-efed-47dc-8abe-fa66b59d1e8c',
    },
});

export type APIResponseType<D = {}, RC = resultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
export enum resultCodesEnum {
    success = 0,
    error = 1,
}

export type getItemsType = {
    items: Array<userType>
    totalCount: number
    error: string | null
}

export enum resultCodeForCaptchaEnum {
    captcha = 10,
}

// type authMeType = {
//     data: {
//         id: number
//         email: string
//         login: string
//     }
//     resultCode: resultCodesEnum
//     messages: Array<string>
// }

// type loginMeType = {
//     data: {
//         iserId: number
//     }
//     resultCode: resultCodesEnum | resultCodeForCaptcha
//     messages: Array<string>
// }



// type getCaptchaUrlType = {
//     url: string
// }

// export const SecurityAPI = {
//     getCaptchaUrl() {
//         return instance.get<getCaptchaUrlType>(`security/get-captcha-url`);
//     },
// };


