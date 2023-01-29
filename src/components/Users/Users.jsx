// @ts-nocheck
import React from "react";
import cl from "./Users.module.css";
import userPhoto from "../../assets/images/user.jpg";
import { NavLink } from "react-router-dom";

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsers / props.pageSize);
    let pages = [];
    if (pagesCount > 15) {
        pagesCount = 15;
    }
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={cl.body}>
            {pages.map((p) => {
                return (
                    <span
                        key={p}
                        onClick={(e) => {
                            props.onPageChanged(p);
                        }}
                        className={
                            props.currentPage === p ? cl.selectedPage : cl.page
                        }
                    >
                        {p}
                    </span>
                );
            })}

            {props.users.map((u) => (
                <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={"/profile/" + u.id}>
                                <img
                                    className={cl.img}
                                    src={
                                        u.photos.small
                                            ? u.photos.small
                                            : userPhoto
                                    }
                                    alt=""
                                />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed ? (
                                <button
                                    disabled={props.onProgress.some(
                                        (id) => id === u.id
                                    )}
                                    onClick={() => {
                                        props.toggleFollowUnfollow(
                                            u.id,
                                            "unfollow"
                                        );
                                    }}
                                >
                                    Unfollow
                                </button>
                            ) : (
                                <button
                                    disabled={props.onProgress.some(
                                        (id) => id === u.id
                                    )}
                                    onClick={() => {
                                        props.toggleFollowUnfollow(
                                            u.id,
                                            "follow"
                                        );
                                    }}
                                >
                                    Follow
                                </button>
                            )}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.email}</div>
                        </span>
                        <span>
                            <div>{"u.address.country"}</div>
                            <div>{"u.address.city"}</div>
                        </span>
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Users;
