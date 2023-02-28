import axios from 'axios';
import { profileType, userType } from '../types/types';


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '78f4e6a7-efed-47dc-8abe-fa66b59d1e8c',
    },
});


type getUsersType = {
    items: Array<userType>
    totalCount: number
    error: string
}

export const usersAPI = {
    getUsers(pageSize = 10, currentPage = 1) {
        return instance.get<getUsersType>(`users?count=${pageSize}&page=${currentPage}`)
            .then(res => res.data);
    },
    toggleFollowUser(id: number, type: string) {
        if (type === 'unfollow') {
            return instance.delete<authMeType>(`follow/${id}`).then(res => res.data);
        }
        if (type === 'follow') {
            return instance.post<authMeType>(`follow/${id}`).then(res => res.data);
        }
    },
    // неиспользуемый АПИ для примера, что якобы метод поменялся
    getProfile(id: number) {
        console.warn('Старый метод. Пожаулуйста используйте ProfileAPI обьект');
        return profileAPI.getProfile(id);
    },
};


export const profileAPI = {
    getProfile(id: number) {
        return instance.get<profileType>(`profile/${id}`);
    },

    // какая-то хрень написана в доке, пока не буду писать
    getStatus(id: number) {
        return instance.get(`profile/status/${id}`);
    },
    updateStatus(status: string) {
        return instance.put<authMeType>(`profile/status`, {
            status: status,
        });
    },
    savePhoto(photoFile: any) {
        let formData = new FormData();
        formData.append('image', photoFile);
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    saveProfile(profile: profileType) {
        return instance.put<authMeType>(`profile/`, profile);
    },
};

export enum resultCodesEnum {
    success = 0,
    error = 1,
}
export enum resultCodeForCaptcha {
    captcha = 10,
}

type authMeType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: resultCodesEnum
    messages: Array<string>
}

type loginMeType = {
    data: {
        iserId: number
    }
    resultCode: resultCodesEnum | resultCodeForCaptcha
    messages: Array<string>
}

export const AuthAPI = {
    AuthMe() {
        return instance.get<authMeType>(`auth/me`).then(res => res.data)
    },
    LoginMe(email: string, password: string, rememberMe: boolean = false, captcha: string = '') {
        return instance.post<loginMeType>('auth/login', {
            email,
            password,
            rememberMe,
            captcha,
        }).then(res => res.data)
    },
    Logout() {
        return instance.delete<authMeType>('auth/login');
    },
};

type getCaptchaUrlType = {
    url: string
}

export const SecurityAPI = {
    getCaptchaUrl() {
        return instance.get<getCaptchaUrlType>(`security/get-captcha-url`);
    },
};


