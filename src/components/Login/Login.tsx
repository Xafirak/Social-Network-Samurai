import React from 'react';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';
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
import { AppStateType } from '../../redux/reduxStore';
import { FieldValidator } from 'final-form';



type loginFormPropsType = {
    onSubmit: (a: loginFromValuesType) => void
    error: string | boolean
    captchaUrl: string | null
}

const LoginForm: React.FC<loginFormPropsType> = ({ onSubmit, error, captchaUrl }) => {
    const maxLength = maxLengthCreator(30);

    const composeValidators: FieldValidator<validatorType> = (...validators: Array<any>) =>
        (value: string) =>
            validators.reduce(
                (error: string | boolean, validator: (value: string) => string | undefined) => error || validator(value),
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
                    {/* <div>если видно поле без капчи - вся инфа в Login.jsx <br />для входа - тыкни любой символ</div> */}


                    {/* ПОЧЕМУ ОНО ИГНОРИТ УСЛОВИЕ??????????????? ВТФ */}
                    {/* только после добавления 2ого условия '&&' поле ввода исчезло,
                    но снова косяк - поле не появляется при запрашивании капчи, убрал */}

                    {/* оно пропало, слава яйцам (не TS точно) */}
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

type mapDispatchPropsType = {
    LoginUser: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type mapStateToPropsType = {
    captchaUrl: string | null
    error: string | boolean
    isAuth: boolean
}


export type loginFromValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}


type loginFormValueKeys = keyof loginFromValuesType


const Login: React.FC<mapStateToPropsType & mapDispatchPropsType> = (props) => {
    const onSubmit = ({ email, password, rememberMe, captcha }: loginFromValuesType) => {
        props.LoginUser(email, password, rememberMe, captcha);
    };
    if (props.isAuth) {
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
                error={props.error}
                captchaUrl={props.captchaUrl}
            />
        </div>
    );
};


let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    captchaUrl: state.auth.captchaUrl,
    error: state.auth.error,
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { LoginUser })(Login);

// ДЗ
// законектить к стору + сделать thunk + сделать API логина для этой страницы

// Вроде законектил и вроде сделал АПИ без гугла, есессно оно не пашет.

// upd. не работало, потому что забыл, что thunk приходил из пропсов +
// не знал, что делать дальше в санке, когда приходит положительный ответ сервера
