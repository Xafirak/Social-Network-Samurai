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
    AuthMe() {
        return instance.get(`auth/me`).then((response) => response.data);
    },
    getProfile(id) {
        return instance.get(`profile/${id}`);
    },
};
