
import { ThunkAction } from '@reduxjs/toolkit';
import { resultCodesEnum, usersAPI } from '../API/api';
import { userType } from '../types/types';
import { AppStateType } from './reduxStore';


const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS = 'SET_TOTAL_USERS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_PROGRESS = 'TOGGLE_IS_PROGRESS';
const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';


let initialState = {
    users: [] as Array<userType>,
    pageSize: 10,
    totalUsers: 0,
    currentPage: 1,
    isFetching: false,
    onProgress: [] as Array<number>,  // array of users ids
};
type initialStateType = typeof initialState

// Создать toggle чтобы переключать isFollowed одной функцией ||| Надо ли?

// Jobs done, 'toggle' implemented! Вопрос такой же как и ниже - надо ли
// делать один 'case' для похожих случаев, где меняется один параметр
// или можно оставить оба  одинаковых 'case'-а, и там сделать рефакторинг

//  Рефакторинг : идет уменьшение кода вместо переписания \ создания
// существующих, как правильно - пересоздавать или переписывать

const usersReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case TOGGLE_FOLLOW: {
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

        case SET_USERS: {
            return { ...state, users: action.users };
        }

        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage };
        }

        case SET_TOTAL_USERS: {
            return { ...state, totalUsers: action.count };
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching };
        }
        case TOGGLE_IS_PROGRESS: {
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

type ActionTypes = toggleFollowActionType | setUsersActionType |
    setPageActionType | setTotalUsersActionType | toggleIsFetchingActionType |
    toggleProgressActionType


const toggleFollow = (userId: number): toggleFollowActionType => ({ type: TOGGLE_FOLLOW, userId });
type toggleFollowActionType = {
    type: typeof TOGGLE_FOLLOW
    userId: number
}

// const follow = (userId) => ({ type: FOLLOW, userId });
// const unfollow = (userId) => ({ type: UNFOLLOW, userId });


const setUsers = (users: Array<userType>): setUsersActionType => ({ type: SET_USERS, users });
type setUsersActionType = {
    type: typeof SET_USERS
    users: Array<userType>
}

const setPage = (currentPage: number): setPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage,
});
type setPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}


const setTotalUsers = (totalUsers: number): setTotalUsersActionType => ({
    type: SET_TOTAL_USERS,
    count: totalUsers,
});
type setTotalUsersActionType = {
    type: typeof SET_TOTAL_USERS
    count: number
}



const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching,
});
type toggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}



const toggleProgress = (onProgress: boolean, userId: number): toggleProgressActionType => ({
    type: TOGGLE_IS_PROGRESS,
    onProgress,
    userId,
});
type toggleProgressActionType = {
    type: typeof TOGGLE_IS_PROGRESS
    onProgress: boolean
    userId: number
}



type thunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getUsers = (pageSize: number, page: number): thunkType => async (dispatch, getState) => {
    dispatch(toggleIsFetching(true));
    dispatch(setPage(page));
    let data = await usersAPI.getUsers(pageSize, page);

    dispatch(setTotalUsers(data.totalCount));
    dispatch(setUsers(data.items));
    dispatch(toggleIsFetching(false));
};

export const toggleFollowUnfollow = (userId: number, type: string): thunkType => async (dispatch) => {
    dispatch(toggleProgress(true, userId));

    let data = await usersAPI.toggleFollowUser(userId, type);

    if (data?.resultCode === resultCodesEnum.error && type === 'unfollow') {
        dispatch(toggleFollow(userId));
    }
    if (data?.resultCode === resultCodesEnum.error && type === 'follow') {
        dispatch(toggleFollow(userId));
    }
    dispatch(toggleProgress(false, userId));
};

export default usersReducer;
