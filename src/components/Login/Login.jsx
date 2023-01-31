// @ts-nocheck
import React from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { compose } from "redux";
import { LoginUser } from "./../../redux/auth-reducer";

const LoginForm = (props) => {
    return (
        <Form
            onSubmit={props.onSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field
                            name={"login"}
                            component={"input"}
                            placeholder="Login"
                        />
                    </div>
                    <div>
                        <Field
                            name={"password"}
                            component={"input"}
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
    const onSubmit = ({login, password, rememberMe}) => {
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

export default compose(connect(mapStateToProps, { LoginUser}))(Login);

// ДЗ
// законектить к стору + сделать thunk + сделать API логина для этой страницы


// Вроде законектил и вроде сделал АПИ без гугла, есессно оно не пашет.