
import React, { useEffect } from "react";
import cl from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import TextInputWithButton from "../TextInputWithButton/TextInputWithButton";
import { dialogActions } from "../../redux/dialogsReducer";
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType, DispatchType } from "../../redux/reduxStore";
import { useNavigate } from "react-router-dom";
import Preloader from "../common/Preloader/preloader";


type propsType = {

}

const Dialogs: React.FC<propsType> = () => {
    const dialogPage = useSelector((state: AppStateType) => state.dialogPage)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const navigate = useNavigate()
    const dispatch: DispatchType = useDispatch()

    useEffect(() => {
        if (isAuth === false) navigate('/login')
    }, [isAuth])

    const addDialogCreator = (message: string) => {
        dispatch(dialogActions.addDialogCreator(message))
    }

    const users = dialogPage.usersData.map((el) => {
        return (
            <DialogItem
                name={el.name}
                id={el.id}
                key={el.id}
                avatar={el.avatar}

            />
        );
    });

    const messages = dialogPage.messagesData.map((el) => {
        return <Message message={el.message} id={el.id} key={el.id} />;
    });

    return (
        <div className={cl.dialogs}>
            <div className={cl.usersColumn}>{users}</div>
            <div className={cl.messageColumn}>
                {messages}
                <TextInputWithButton
                    dialogPage={dialogPage}
                    addMessage={addDialogCreator}
                />
            </div>
        </div>
    );
};

export default Dialogs;
