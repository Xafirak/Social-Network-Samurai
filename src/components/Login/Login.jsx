// @ts-nocheck
import React from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { compose } from "redux";
import { Input } from "../common/FormsControl/FormsControl";
import { LoginUser } from "./../../redux/auth-reducer";
import {
    maxLengthCreator,
    required,
} from "./../../utils/validators/validators";

const LoginForm = (props) => {
    const maxLength10 = maxLengthCreator(10);
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
                            validate={composeValidators(required, maxLength10)}
                            name={"login"}
                            component={Input}
                            placeholder="Login"
                        />
                    </div>
                    <div>
                        <Field
                            validate={composeValidators(required, maxLength10)}
                            name={"password"}
                            component={Input}
                            placeholder="Password"
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
                    <div>
                        <button>Login</button>
                    </div>
                </form>
            )}
        />
    );
};

const Login = () => {
    const onSubmit = ({ login, password, rememberMe }) => {
        
        console.log(login, password, rememberMe);
        LoginUser(login, password, rememberMe);
    };

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm onSubmit={onSubmit} />
        </div>
    );
};

let mapStateToProps = (state) => ({
    userId: state.userId,
    email: state.email,
    login: state.login,
    password: state.password,
    isFetching: state.isFetching,
    isAuth: state.isAuth,
    isRemembed: state.isRemembed,
});

export default compose(connect(mapStateToProps, { LoginUser }))(Login);

// ДЗ
// законектить к стору + сделать thunk + сделать API логина для этой страницы

// Вроде законектил и вроде сделал АПИ без гугла, есессно оно не пашет.
