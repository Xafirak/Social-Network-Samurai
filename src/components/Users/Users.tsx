
import React from 'react';
import cl from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import { User } from './User';
import UsersSearchForm from './UsersSearchForm';
import { filterType } from '../../redux/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getPageSize, getTotalUsers, getAllUsers, getOnProgress, getUsersFilter } from './../../redux/users-selectors';
import { getUsers, toggleFollowUnfollow } from './../../redux/usersReducer';
import { AppStateType } from '../../redux/reduxStore';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

type PropsType = {
}

export const Users: React.FC<PropsType> = (props) => {


    const totalUsers = useSelector(getTotalUsers)
    const users = useSelector(getAllUsers)
    const onProgress = useSelector(getOnProgress)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)

    const dispatch: TypedDispatch = useDispatch()
    type TypedDispatch = ThunkDispatch<AppStateType, any, Action>





    const onPageChanged = (page: number) => {
        dispatch(getUsers(pageSize, page, filter));
    }

    const onFilterChanged = (filter: filterType) => {
        dispatch(getUsers(pageSize, 1, filter))
    }

    const toggleUnfollowFollow = (userId: number, type: string) => {
        dispatch(toggleFollowUnfollow(userId, type))
    }



    return (
        <div className={cl.body}>

            <div className={cl.paginator}>
                <div>
                    <UsersSearchForm onFilterChanged={onFilterChanged} />
                </div>
                <Paginator
                    currentPage={currentPage}
                    totalItems={totalUsers}
                    onPageChanged={onPageChanged}
                    pageSize={pageSize}
                />
            </div>
            <div className={cl.listOfUsers}>
                {users.map((u) => (
                    <User
                        user={u}
                        key={u.id}
                        onProgress={onProgress}
                        toggleFollowUnfollow={toggleUnfollowFollow}
                    />
                ))}
            </div>
        </div>
    );
};

