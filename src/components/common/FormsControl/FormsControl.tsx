
import React, { ComponentType } from 'react';
import s from './FormsControl.module.css';
import { Field, FieldRenderProps, SupportedInputs } from 'react-final-form';
import { validatorType } from '../../../utils/validators/validators';
import { FieldValidator } from 'final-form';


export const Textarea = (props: any) => {
    const { input, meta, ...restProps } = props;
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps} />
        </FormControl>
    );
};
export const Input = (props: any) => {
    const { input, meta, ...restProps } = props;
    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>
    );
};




// Нахрена типизировать children ???? он не красный, там может быть все что
// угодно...... втф ???
type formControlPropsType = {
    meta: {
        touched: boolean
        error: string
    }
    children: React.ReactNode
}


const FormControl: React.FC<formControlPropsType> = ({ meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div>{props.children}</div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
};



export function createField<formKeysType extends string>(
    validators: FieldValidator<validatorType> | undefined,
    name: formKeysType,
    component: SupportedInputs | ComponentType<FieldRenderProps<validatorType, HTMLElement, validatorType>> | undefined,
    placeholder: string | undefined,
    props = {},
    text = ''
) {
    return (
        <div>
            <Field
                validate={validators}
                name={name}
                component={component}
                placeholder={placeholder}
                {...props}
            />
            {text}
        </div>
    );
}
