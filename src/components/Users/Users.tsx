
import React from 'react';
import cl from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { userType } from '../../types/types';
import UsersSearchForm from './UsersSearchForm';
import { filterType } from '../../redux/usersReducer';

type PropsType = {
    totalUsers: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<userType>
    onProgress: Array<number>
    toggleFollowUnfollow: (a: number, b: string) => void
    onFilterChanged: (filter: filterType) => void
}

let Users: React.FC<PropsType> = ({
    currentPage,
    totalUsers,
    pageSize,
    onPageChanged,
    users,
    onProgress,
    toggleFollowUnfollow,
    onFilterChanged,
    ...props
}) => {
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
                        toggleFollowUnfollow={toggleFollowUnfollow}
                    />
                ))}
            </div>
        </div>
    );
};



export default Users;
