import React from 'react';
import { Form } from 'react-final-form';
import {  useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Input } from '../common/FormsControl/FormsControl';
import { LoginUser } from '../../redux/auth-reducer';
import {
    maxLengthCreator,
    required,
    validatorType,
} from '../../utils/validators/validators';
import s from './../common/FormsControl/FormsControl.module.css';
import { createField } from '../common/FormsControl/FormsControl';
import { AppStateType, DispatchType } from '../../redux/reduxStore';
import { FieldValidator } from 'final-form';

export type loginFromValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type loginFormPropsType = {
    onSubmit: (a: loginFromValuesType) => void
    error: string | boolean
    captchaUrl: string | null
}

type loginFormValueKeys = keyof loginFromValuesType

const LoginForm: React.FC<loginFormPropsType> = ({ onSubmit, error, captchaUrl }) => {
    const maxLength = maxLengthCreator(30);

    const composeValidators: FieldValidator<validatorType> = (...validators: Array<any>) =>
        (value: string) =>
            validators.reduce(
                (error: string | boolean, validator: validatorType) => error || validator(value),
                undefined
            );

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    {createField<loginFormValueKeys>(
                        composeValidators(required, maxLength),
                        'email',
                        Input,
                        'Email'
                    )}
                    {createField<loginFormValueKeys>(
                        composeValidators(required, maxLength),
                        'password',
                        Input,
                        'Password',
                        { type: 'password' }
                    )}
                    {createField<loginFormValueKeys>(
                        undefined,
                        'rememberMe',
                        Input,
                        undefined,
                        { type: 'checkbox' },
                        'remember me!'
                    )}
                    {captchaUrl && <img src={captchaUrl} alt="" />}
                    {captchaUrl &&
                        createField<loginFormValueKeys>(
                            undefined,
                            'captcha',
                            Input,
                            'enter symbols pls',
                            {}
                        )}
                    {error && (
                        <div className={s.formError}>
                            {typeof error === 'string'
                                ? error
                                : 'Неправильное мыло или пароль!'}
                        </div>
                    )}
                    <div>
                        <button>Login</button>
                    </div>
                </form>
            )}
        />
    );
};


//============================


export const LoginPage: React.FC = (props) => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const error = useSelector((state: AppStateType) => state.auth.error)
    
    const dispatch: DispatchType = useDispatch()

    const onSubmit = ({ email, password, rememberMe, captcha }: loginFromValuesType) => {
        dispatch(LoginUser(email, password, rememberMe, captcha))
    };
    if (isAuth) {
        return <Navigate to={'/profile'} />;
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <h3>Псст! Нужен тестовый акк? </h3>
            <div>
                Email: free@samuraijs.com <br /> Password: free
            </div>
            <LoginForm
                onSubmit={onSubmit}
                error={error}
                captchaUrl={captchaUrl}
            />
        </div>
    );
};




// ДЗ
// законектить к стору + сделать thunk + сделать API логина для этой страницы

// Вроде законектил и вроде сделал АПИ без гугла, есессно оно не пашет.

// upd. не работало, потому что забыл, что thunk приходил из пропсов +
// не знал, что делать дальше в санке, когда приходит положительный ответ сервера
