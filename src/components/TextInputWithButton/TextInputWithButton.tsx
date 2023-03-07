
import { FieldValidator } from 'final-form';
import React from 'react';
import { Form, Field } from 'react-final-form';
import { iniialStateType } from '../../redux/dialogsReducer';
import { required, validatorType } from '../../utils/validators/validators';
import { maxLengthCreator } from '../../utils/validators/validators';
import { createField, Textarea } from '../common/FormsControl/FormsControl';

type TextInputWithButtonPropsType = {
    addMessage: (message: string) => void
    dialogPage?: iniialStateType
}

const TextInputWithButton: React.FC<TextInputWithButtonPropsType> = (props) => {

    let addNewMessage = (data: dataType) => {
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
    const composeValidators: FieldValidator<validatorType> =
        (...validators: Array<any>) =>
            (value: string) =>
                validators.reduce(
                    (error: string | boolean, validator) => error || validator(value),
                    undefined
                );

    return (
        <Form
            onSubmit={addNewMessage}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        {createField<TextInputWithButtonValueKeys>(
                            // @ts-ignore незнаю как решить TS ошибку
                            composeValidators(maxLength10),
                            'messageBody',
                            Textarea,
                            'Твой ответ...'
                        )}
                    </div>
                    <div className="">
                        <button>CLICK !</button>
                    </div>
                </form>
            )}
        />
    );
};


export type dataType = {
    messageBody: string
}


type TextInputWithButtonValueKeys = keyof dataType

export default TextInputWithButton;
