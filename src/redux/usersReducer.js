// @ts-nocheck
import { usersAPI } from './../API/api';
// import { updateOnjectInArray } from './../utils/object-helpers';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS = 'SET_TOTAL_USERS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_PROGRESS = 'TOGGLE_IS_PROGRESS';
const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsers: 0,
    currentPage: 1,
    isFetching: false,
    onProgress: [],
};

// Создать toggle чтобы переключать isFollowed одной функцией ||| Надо ли?

// Jobs done, 'toggle' implemented! Вопрос такой же как и ниже - надо ли
// делать один 'case' для похожих случаев, где меняется один параметр
// или можно оставить оба  одинаковых 'case'-а, и там сделать рефакторинг

//  Рефакторинг : идет уменьшение кода вместо переписания \ создания
// существующих, как правильно - пересоздавать или переписывать

const usersReducer = (state = initialState, action) => {
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

        case FOLLOW: {
            return {

                // AFTER
                // ...state,
                // users: updateOnjectInArray(state.users, action.userId, 'id', {
                //     followed: true,
                // }),

                // BEFORE
                // users: state.users.map((u) => {
                //     if (u.id === action.userId) {
                //         return { ...u, followed: true };
                //     }
                //     return u;
                // }),
            };
        }

        case UNFOLLOW: {
            return {

                // AFTER
                // ...state,
                // users: updateOnjectInArray(state.users, action.userId, 'id', {
                //     followed: false,
                // }),

                // BEFORE 
                // users: state.users.map((u) => {
                //     if (u.id === action.userId) {
                //         return { ...u, followed: false };
                //     }
                //     return u;
                // }),
            };
        }

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
const toggleFollow = (userId) => ({ type: TOGGLE_FOLLOW, userId });
// const follow = (userId) => ({ type: FOLLOW, userId });
// const unfollow = (userId) => ({ type: UNFOLLOW, userId });
const setUsers = (users) => ({ type: SET_USERS, users });
const setPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage,
});
const setTotalUsers = (totalUsers) => ({
    type: SET_TOTAL_USERS,
    count: totalUsers,
});
const toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching,
});
const toggleProgress = (onProgress, userId) => ({
    type: TOGGLE_IS_PROGRESS,
    onProgress,
    userId,
});

export const getUsers = (pageSize, page) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setPage(page));
    let response = await usersAPI.getUsers(pageSize, page);

    dispatch(setTotalUsers(response.data.totalCount));
    dispatch(setUsers(response.data.items));
    dispatch(toggleIsFetching(false));
};

export const toggleFollowUnfollow = (userId, type) => async (dispatch) => {
    dispatch(toggleProgress(true, userId));

    let response = await usersAPI.toggleFollowUser(userId, type);

    if (response.data.resultCode === 0 && type === 'unfollow') {
        dispatch(toggleFollow(userId));
    }
    if (response.data.resultCode === 0 && type === 'follow') {
        dispatch(toggleFollow(userId));
    }
    dispatch(toggleProgress(false, userId));
};

export default usersReducer;
