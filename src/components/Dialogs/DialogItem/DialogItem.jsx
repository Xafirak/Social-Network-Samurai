import React from "react";
import { NavLink } from "react-router-dom";
import cl from "./../Dialogs.module.css";

const DialogItem = (props) => {
    const path = "dialogs/" + props.id;

    return (
        <div>
            <NavLink
                to={path}
                className={cl.item + " " + (props.active ? cl.active : "")}
            >
                <img src={props.avatar} alt="" />
                <figcaption className={cl.person}>{props.name}</figcaption>
            </NavLink>
        </div>
    );
};

export default DialogItem;
