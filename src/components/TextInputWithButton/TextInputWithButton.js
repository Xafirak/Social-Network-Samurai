// @ts-nocheck
import React from "react";
import { addActionCreator, updatePostText } from "./../../redux/profileReducer";
import {
    addDialogCreator,
    updateDialogText,
} from "./../../redux/dialogsReducer";

const TextInputWithButton = (props) => {
    // костыли
    
    let x;
    let y;
    let path;
    if (props.profile) {
        x = addActionCreator(); //
        y = (c) => updatePostText(c); //
        path = props.profilePage.newPostText;
    }
    if (props.dialog) {
        x = addDialogCreator(); //
        y = (c) => updateDialogText(c); //change
        path = props.dialogPage.newDialogText;
    }

    let addPosts = () => {
        props.dispatch(x);
    };

    let input = React.createRef();
    let onPostChange = () => {
        let text = input.current.value;
        let action = y(text);
        props.dispatch(action);
    };

    //Возможно ли "нарисовать" строки value и placeholder в свойствах textarea
    // через тернарный оператор, чтобы не хардкодить их значения
    // (На странице Profile исходным текстом должа быть KAWABANGA и
    //     после ввода - пустая строка, в Messages - только плейсхолдер )
    // function valueOrPlaceholder() {
    //     return props.profie ? <div>value = { path }</div> : <div>placeholder = "Твой ответ"</div>;
    // };
    return (
        <>
            <div className="">
                <textarea
                    onChange={onPostChange}
                    ref={input}
                    value={path} //
                    placeholder="Твой ответ..." //
                />
            </div>
            <div className="">
                <button onClick={addPosts}>CLICK !</button>
            </div>
        </>
    );
};

export default TextInputWithButton;
