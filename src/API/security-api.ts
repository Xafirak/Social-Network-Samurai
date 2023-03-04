
import { instance } from './api';

export const SecurityAPI = {
    getCaptchaUrl() {
        return instance.get<getCaptchaUrlType>(`security/get-captcha-url`).then(res => res.data)
    },
};

type getCaptchaUrlType = {
    url: string
}