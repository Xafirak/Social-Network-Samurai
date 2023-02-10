// @ts-nocheck
import React from 'react';
import cl from './Users.module.css';
import userPhoto from '../../assets/images/user.jpg';
import { NavLink } from 'react-router-dom';

let User = ({ user, onProgress, toggleFollowUnfollow }) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img
                            className={cl.img}
                            src={
                                user.photos.small
                                    ? user.photos.small
                                    : userPhoto
                            }
                            alt=""
                        />
                    </NavLink>
                </div>
                <div>
                    {user.followed ? (
                        <button
                            disabled={onProgress.some((id) => id === user.id)}
                            onClick={() => {
                                toggleFollowUnfollow(user.id, 'unfollow');
                            }}
                        >
                            Unfollow
                        </button>
                    ) : (
                        <button
                            disabled={onProgress.some((id) => id === user.id)}
                            onClick={() => {
                                toggleFollowUnfollow(user.id, 'follow');
                            }}
                        >
                            Follow
                        </button>
                    )}
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                </span>
                <span>
                    <div>{'u.address.country'}</div>
                    <div>{'u.address.city'}</div>
                </span>
            </span>
        </div>
    );
};

export default User;
