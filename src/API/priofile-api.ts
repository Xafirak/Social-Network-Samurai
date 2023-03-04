import { photosType, profileType } from "../types/types";
import { instance, APIResponseType } from "./api";



export const profileAPI = {
    getProfile(id: number|null) {
        return instance.get<profileType>(`profile/${id}`).then(res => res.data)
    },

    getStatus(id: number) {
        return instance.get<string>(`profile/status/${id}`).then(res => res.data)
    },

    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {
            status: status,
        }).then(res => res.data)
    },

    savePhoto(photoFile: File) {
        let formData = new FormData();
        formData.append('image', photoFile);
        return instance.put<APIResponseType<savePhotoResponseDataType>>(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(res => res.data)
    },
    saveProfile(profile: profileType) {
        return instance.put<APIResponseType>(`profile/`, profile).then(res => res.data)
    },
};

type savePhotoResponseDataType = {
    photos: photosType
}

export enum resultCodesEnum {
    success = 0,
    error = 1,
}