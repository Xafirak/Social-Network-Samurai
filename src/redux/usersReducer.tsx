
import { ThunkAction } from '@reduxjs/toolkit';
import { resultCodesEnum, usersAPI } from '../API/api';
import { userType } from '../types/types';
import { AppStateType, InferActionsTypes } from './reduxStore';


let initialState = {
    users: [] as Array<userType>,
    pageSize: 10,
    totalUsers: 0,
    currentPage: 1,
    isFetching: false,
    onProgress: [] as Array<number>,  // array of users ids
};
type initialStateType = typeof initialState

// Создать toggle чтобы переключать isFollowed одной функцией | Надо ли?

// Jobs done, 'toggle' implemented! Вопрос такой же как и ниже - надо ли
// делать один 'case' для похожих случаев, где меняется один параметр
// или можно оставить оба  одинаковых 'case'-а, и там сделать рефакторинг

//  Рефакторинг : идет уменьшение кода вместо переписания \ создания
// существующих, как правильно - пересоздавать или переписывать

const usersReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case 'TOGGLE_FOLLOW': {
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return { ...u, followed: !u.followed };
                    }
                    return u;
                }),
            };
        }

        // case FOLLOW: {
        //     // return {

        //     // AFTER
        //     // ...state,
        //     // users: updateOnjectInArray(state.users, action.userId, 'id', {
        //     //     followed: true,
        //     // }),

        //     // BEFORE
        //     // users: state.users.map((u) => {
        //     //     if (u.id === action.userId) {
        //     //         return { ...u, followed: true };
        //     //     }
        //     //     return u;
        //     // }),
        //     // };
        // }

        // case UNFOLLOW: {
        //     // return {

        //     // AFTER
        //     // ...state,
        //     // users: updateOnjectInArray(state.users, action.userId, 'id', {
        //     //     followed: false,
        //     // }),

        //     // BEFORE 
        //     // users: state.users.map((u) => {
        //     //     if (u.id === action.userId) {
        //     //         return { ...u, followed: false };
        //     //     }
        //     //     return u;
        //     // }),
        //     // };
        // }

        case 'SET_USERS': {
            return { ...state, users: action.users };
        }

        case 'SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage };
        }

        case 'SET_TOTAL_USERS': {
            return { ...state, totalUsers: action.count };
        }
        case 'TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching };
        }
        case 'TOGGLE_IS_PROGRESS': {
            return {
                ...state,
                onProgress: action.onProgress
                    ? [...state.onProgress, action.userId]
                    : [
                        ...state.onProgress.filter(
                            (id) => id !== action.userId
                        ),
                    ],
            };
        }

        default:
            return state;
    }
};

type ActionTypes = InferActionsTypes<typeof actions>


export const actions = {
    toggleFollow: (userId: number) => ({ type: 'TOGGLE_FOLLOW', userId } as const),

    setUsers: (users: Array<userType>) => ({ type: 'SET_USERS', users } as const),

    setPage: (currentPage: number) => ({
        type: 'SET_CURRENT_PAGE',
        currentPage,
    } as const),

    setTotalUsers: (totalUsers: number) => ({
        type: 'SET_TOTAL_USERS',
        count: totalUsers,
    } as const),

    toggleIsFetching: (isFetching: boolean) => ({
        type: 'TOGGLE_IS_FETCHING',
        isFetching,
    } as const),

    toggleProgress: (onProgress: boolean, userId: number) => ({
        type: 'TOGGLE_IS_PROGRESS',
        onProgress,
        userId,
    } as const),

}



type thunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getUsers = (pageSize: number, page: number): thunkType => async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setPage(page));
    let data = await usersAPI.getUsers(pageSize, page);

    dispatch(actions.setTotalUsers(data.totalCount));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.toggleIsFetching(false));
};

export const toggleFollowUnfollow = (userId: number, type: string): thunkType => async (dispatch) => {
    dispatch(actions.toggleProgress(true, userId));

    let data = await usersAPI.toggleFollowUser(userId, type);

    if (data?.resultCode === resultCodesEnum.error && type === 'unfollow') {
        dispatch(actions.toggleFollow(userId));
    }
    if (data?.resultCode === resultCodesEnum.error && type === 'follow') {
        dispatch(actions.toggleFollow(userId));
    }
    dispatch(actions.toggleProgress(false, userId));
};

export default usersReducer;
