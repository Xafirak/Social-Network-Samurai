
import { getItemsType, instance, APIResponseType } from "./api";



export const usersAPI = {
    getUsers(pageSize = 10, currentPage = 1) {
        return instance.get<getItemsType>(`users?count=${pageSize}&page=${currentPage}`)
            .then(res => res.data);
    },
    toggleFollowUser(id: number, type: string) {
        if (type === 'unfollow') {
            return instance.delete(`follow/${id}`).then(res => res.data) as Promise<APIResponseType>
        }
        if (type === 'follow') {
            return instance.post<APIResponseType>(`follow/${id}`).then(res => res.data);
        }
    },
};

