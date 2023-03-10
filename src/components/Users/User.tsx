
import React from 'react';
import cl from './Users.module.css';
import userPhoto from '../../assets/images/user.jpg';
import { NavLink } from 'react-router-dom';
import { userType } from '../../types/types';


type userPropsType = {
    user: userType
    onProgress: Array<number>
    toggleFollowUnfollow: (a: number, b: string) => void
}
export const User: React.FC<userPropsType> = ({ user, onProgress, toggleFollowUnfollow }) => {

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
                </span>
                <span>
                    <div>{'Типа страна челика'}</div>
                    <div>{'Как бы его город'}</div>
                </span>
            </span>
        </div>
    );
};
