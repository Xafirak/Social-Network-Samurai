// @ts-nocheck
import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "78f4e6a7-efed-47dc-8abe-fa66b59d1e8c",
    },
});

export const usersAPI = {
    getUsers(pageSize = 10, currentPage = 1) {
        return instance
            .get(`users?count=${pageSize}&page=${currentPage}`)
            .then((response) => response.data);
    },
    toggleFollowUser(id, type) {
        if (type === "unfollow") {
            return instance
                .delete(`follow/${id}`)
                .then((response) => response.data.resultCode);
        }
        if (type === "follow") {
            return instance
                .post(`follow/${id}`)
                .then((response) => response.data.resultCode);
        }
    },

    getProfile(id) {
        console.warn("Старый метод. Пожаулуйста используйте ProfileAPI обьект");
        return profileAPI.getProfile(id);
    },
};

export const profileAPI = {
    getProfile(id) {
        return instance.get(`profile/${id}`);
    },
    getStatus(id) {
        return instance.get(`profile/status/${id}`);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {
            status: status,
        });
    },
};

export const AuthAPI = {
    AuthMe() {
        return instance.get(`auth/me`).then((response) => response.data);
    },
    LoginMe(email, password, rememberMe = false) {
        
        return instance.post("auth/login", {
            email,
            password,
            rememberMe,
        });
    },
    Logout() {
        return instance.delete("auth/login");
    },
};
