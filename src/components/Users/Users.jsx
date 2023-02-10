// @ts-nocheck
import React from 'react';
import cl from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

let Users = ({
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
                totalUsers={totalUsers}
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
