// @ts-nocheck
import React from "react";
import cl from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import TextInputWithButton from "../TextInputWithButton/TextInputWithButton";
import { Navigate } from "react-router-dom";

const Dialogs = (props) => {
    const users = props.dialogPage.usersData.map((el) => {
        return (
            <DialogItem
                name={el.name}
                id={el.id}
                key={el.id}
                avatar={el.avatar}
            />
        );
    });

    const messages = props.dialogPage.messagesData.map((el) => {
        return <Message message={el.message} id={el.id} key={el.id} />;
    });
    ///----------
    if (!props.isAuth) return <Navigate to={"/login"} />;
    ///----------
    return (
        <div className={cl.dialogs}>
            <div className={cl.usersColumn}>{users}</div>
            <div className={cl.messageColumn}>
                {messages}
                <TextInputWithButton
                    dialog
                    dialogPage={props.dialogPage}
                    dispatch={props.dispatch}
                />
            </div>
        </div>
    );
};

export default Dialogs;
