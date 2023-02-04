import React from "react";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";

// запросить показ аву, в контейнере
const Header = (props) => {
    return (
        <header className={classes.header}>
            <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.sxdELx88HQjlvgfXWUENawHaHa%26pid%3DApi&f=1&ipt=af963e529a877c0c337cfc12d9319d0fc9a9a7e54792582b982c76fb6bb39368&ipo=images"
                alt="Dp"
            />

            <div className={classes.loginBlock}> 
                {props.isAuth ? (
                    <div>
                        {props.login} <br />
                        <button onClick={props.Logout}>Logout</button>
                    </div>
                ) : (
                    <NavLink to={"login"}>Login</NavLink>
                )}
            </div>
        </header>
    );
};

export default Header;
