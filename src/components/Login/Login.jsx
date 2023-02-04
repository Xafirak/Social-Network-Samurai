// @ts-nocheck
import React from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Input } from "../common/FormsControl/FormsControl";
import { LoginUser } from "./../../redux/auth-reducer";
import {
    maxLengthCreator,
    required,
} from "./../../utils/validators/validators";
import s from './../common/FormsControl/FormsControl.module.css'


const LoginForm = (props) => {
    console.log(props);
    const maxLength = maxLengthCreator(25);
    const composeValidators =
        (...validators) =>
        (value) =>
            validators.reduce(
                (error, validator) => error || validator(value),
                undefined
            );
    return (
        <Form
            onSubmit={props.onSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field
                            validate={composeValidators(required, maxLength)}
                            name={"email"}
                            component={Input}
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <Field
                            validate={composeValidators(required, maxLength)}
                            name={"password"}
                            component={Input}
                            placeholder="Password"
                            type="password"
                        />
                    </div>
                    <div>
                        <Field
                            name={"rememberMe"}
                            component={"input"}
                            type="checkbox"
                        />{" "}
                        remember me
                    </div>
                    { props.error && <div className={s.formError}>
                    {typeof props.error === 'string' ? props.error : 'Неправильное мыло или пароль!'}
                    </div>}
                    <div>
                        <button>Login</button>
                    </div>
                </form>
            )}
        />
    );
};

const Login = (props) => {
    
    const onSubmit = ({ email, password, rememberMe }) => {
        props.LoginUser(email, password, rememberMe);
    };
    if (props.isAuth) {
        return <Navigate to={'/profile'} />
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm onSubmit={onSubmit} error={props.error} />
        </div>
    );
};

let mapStateToProps = (state) => ({
    error: state.auth.error,
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { LoginUser })(Login);

// ДЗ
// законектить к стору + сделать thunk + сделать API логина для этой страницы

// Вроде законектил и вроде сделал АПИ без гугла, есессно оно не пашет.

// upd. не работало, потому что забыл, что thunk приходил из пропсов +
// не знал, что делать дальше в санке, когда приходит положительный ответ сервера
