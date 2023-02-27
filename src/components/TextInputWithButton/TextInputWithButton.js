// @ts-nocheck пока что
import React from 'react';
import { Form, Field } from 'react-final-form';
import { required } from '../../utils/validators/validators';
import { maxLengthCreator } from '../../utils/validators/validators';
import { Textarea } from '../common/FormsControl/FormsControl';

// type TextInputWithButtonPropsType = {

//     addMessage: (message:string) => void
// }

const TextInputWithButton = (props) => {
    let addNewMessage = (data) => {
        props.addMessage(data.messageBody);
    };
    //Возможно ли "нарисовать" строки value и placeholder в свойствах textarea
    // через тернарный оператор, чтобы не хардкодить их значения
    // (На странице Profile исходным текстом должа быть KAWABANGA и
    //     после ввода - пустая строка, в Messages - только плейсхолдер )
    // function valueOrPlaceholder() {
    //     return props.profie ? <div>value = { path }</div> : <div>placeholder = "Твой ответ"</div>;
    // };

    const maxLength10 = maxLengthCreator(10);

    // Эта хрень(validate) не принимает валидаторы по одному,поэтому НАДО создать
    // функцию которая соберет все валидаторы в себя
    const composeValidators =
        (...validators) =>
        (value) =>
            validators.reduce(
                (error, validator) => error || validator(value),
                undefined
            );

    return (
        <Form
            onSubmit={addNewMessage}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field
                            validate={composeValidators(required, maxLength10)}
                            name={'messageBody'}
                            component={Textarea}
                            placeholder="Твой ответ..."
                        />
                    </div>
                    <div className="">
                        <button>CLICK !</button>
                    </div>
                </form>
            )}
        />
    );
};

/* <>
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
</> */

export default TextInputWithButton;
