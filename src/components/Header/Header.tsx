import React from "react";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { AppStateType, DispatchType } from "../../redux/reduxStore";
import { useSelector, useDispatch } from 'react-redux';
import { Logout } from "../../redux/auth-reducer";




export const Header: React.FC = () => {


    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const login = useSelector((state: AppStateType) => state.auth.login)

    const dispatch: DispatchType = useDispatch()

    const logout = () => {
        dispatch(Logout())
    }


    return (
        <header className={classes.header}>
            <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.sxdELx88HQjlvgfXWUENawHaHa%26pid%3DApi&f=1&ipt=af963e529a877c0c337cfc12d9319d0fc9a9a7e54792582b982c76fb6bb39368&ipo=images"
                alt="Dp"
            />

            <div className={classes.loginBlock}>
                {isAuth ? (
                    <div>
                        {login} <br />
                        <button onClick={logout}>Logout</button>
                    </div>
                ) : (
                    <NavLink to={"login"}>Login</NavLink>
                )}
            </div>
        </header>
    );
};

