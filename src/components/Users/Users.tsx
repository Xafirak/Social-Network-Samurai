
import React from 'react';
import cl from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { userType } from '../../types/types';

type PropsType = {
    totalUsers: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void    
    users: Array<userType>
    onProgress: Array<number>
    toggleFollowUnfollow: () => void
}

let Users: React.FC<PropsType> = ({
    currentPage,
    totalUsers,
    pageSize,
    onPageChanged,
    users,
    onProgress,
    toggleFollowUnfollow,
    ...props
}) => {
    return (
        <div className={cl.body}>
            <Paginator
                currentPage={currentPage}
                totalItems={totalUsers}
                onPageChanged={onPageChanged}
                pageSize={pageSize}
            />
            {users.map((u) => (
                <User
                    user={u}
                    key={u.id}
                    onProgress={onProgress}
                    toggleFollowUnfollow={toggleFollowUnfollow}
                />
            ))}
        </div>
    );
};

export default Users;
