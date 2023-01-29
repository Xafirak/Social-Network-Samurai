// @ts-nocheck
import { usersAPI } from './../API/api';
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS = "SET_TOTAL_USERS";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_PROGRESS = "TOGGLE_IS_PROGRESS";

let initialState = {
    users: [],
    pageSize: 10,
    totalUsers: 0,
    currentPage: 1,
    isFetching: false,
    onProgress: [],
};

// Создать toggle чтобы переключать isFollowed одной функцией ||| Надо ли?

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true };
                    }
                    return u;
                }),
            };
        }

        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false };
                    }
                    return u;
                }),
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

export const follow = (userId) => ({ type: FOLLOW, userId });
export const unfollow = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage,
});
export const setTotalUsers = (totalUsers) => ({
    type: SET_TOTAL_USERS,
    count: totalUsers,
});
export const toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching,
});
export const toggleProgress = (onProgress, userId) => ({
    type: TOGGLE_IS_PROGRESS,
    onProgress,
    userId,
});

export const getUsers = (pageSize, currentPage) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        usersAPI
            .getUsers(pageSize, currentPage)
            .then((data) => {
                dispatch(setPage(currentPage));
                dispatch(setTotalUsers(data.totalCount));
                dispatch(setUsers(data.items));
                dispatch(toggleIsFetching(false));
            })
            .catch((e) => console.log(e));
    };
};

export const toggleFollowUnfollow = (userId, type) => {
    return (dispatch) => {
        dispatch(toggleProgress(true, userId));

        usersAPI
            .toggleFollowUser(userId, type)
            .then((resultCode) => {

                // надо ли итог ".then" инкапсулировать в API.js 
                // чтобы не спрашивать тип, он уже спрашивается в toggleFollowUser

                if (resultCode === 0 && type === 'unfollow') {
                    dispatch(unfollow(userId));                    
                }
                if (resultCode === 0 && type === 'follow') {
                    dispatch(follow(userId));                    
                }
                dispatch(toggleProgress(
                    false,
                    userId
                ));
            })
            .catch((e) => console.error(e));
    };
};

export default usersReducer;
