// @ts-nocheck
import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = (props) => {
    const friend = props.friends.map((e) => {
        return (
            <NavLink to="s" className={classes.friend} key={e.id}>
                <img src={e.avatar} alt={e.name} />
                <figcaption className={classes.caption}>{e.name}</figcaption>
            </NavLink>
        );
    });

    return (
        <nav className={classes.nav}>
            <div className={classes.item}>
                <NavLink
                    to="profile"
                    className={(n) =>
                        n.isActive ? classes.active : classes.item
                    }
                >
                    Profile
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink
                    to="dialogs"
                    className={(n) =>
                        n.isActive ? classes.active : classes.item
                    }
                >
                    Messages
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink
                    to="news"
                    className={(n) =>
                        n.isActive ? classes.active : classes.item
                    }
                >
                    News
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink
                    to="users"
                    className={(n) =>
                        n.isActive ? classes.active : classes.item
                    }
                >
                    Users
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink
                    to="music"
                    className={(n) =>
                        n.isActive ? classes.active : classes.item
                    }
                >
                    Music
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink
                    to="settings"
                    className={(n) =>
                        n.isActive ? classes.active : classes.item
                    }
                >
                    Settings
                </NavLink>
            </div>
            <div className={classes.friendsArea}>
                <h1>Friends</h1>
                <div>
                    {/* обьединение кружочка авы\имени пользователя в один компонент 
                     тут и в диалогах??
                    имя компоненты --- <Friend /> */}
                    {friend}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
