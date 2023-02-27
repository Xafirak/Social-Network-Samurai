import { AppStateType } from "./reduxStore"


export const getAllUsers = (state: AppStateType) => {
    return state.usersPage.users
}
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsers = (state: AppStateType) => {
    return state.usersPage.totalUsers
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}
export const getOnProgress = (state: AppStateType) => {
    return state.usersPage.onProgress
}