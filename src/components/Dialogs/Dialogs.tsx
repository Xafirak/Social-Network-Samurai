
import React from "react";
import cl from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import TextInputWithButton from "../TextInputWithButton/TextInputWithButton";
import { iniialStateType } from "../../redux/dialogsReducer";


type propsType = {
    dialogPage: iniialStateType
    dispatch: () => void
    addDialogCreator: (message: string) => void

}

const Dialogs:React.FC<propsType> = (props) => {

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

    return (
        <div className={cl.dialogs}>
            <div className={cl.usersColumn}>{users}</div>
            <div className={cl.messageColumn}>
                {messages}
                <TextInputWithButton
                    
                    dialogPage={props.dialogPage}
                    addMessage={props.addDialogCreator}
                />
            </div>
        </div>
    );
};

export default Dialogs;
