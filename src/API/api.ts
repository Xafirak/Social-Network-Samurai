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



