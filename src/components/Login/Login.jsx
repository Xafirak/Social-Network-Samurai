// @ts-nocheck
import React from "react";
import { Form, Field } from 'react-final-form';


const LoginForm = (props) => {
    return (
        <Form 
            onSubmit={props.onSubmit}
            render={({handleSubmit}) => (

            <form onSubmit={handleSubmit}>
                <div>   
                    <Field name={'login'} component={'input'} placeholder="Login" />
                </div>
                <div>
                    <Field name={'password'} component={'input'} placeholder="Password" />
                </div>
                <div>
                    <Field name={'memberMe'} component={'input'} type="checkbox" /> remember me
                </div>
                <div>
                    <button >Login</button>
                </div>
            </form>
            )}
        />
    );
};


const Login = () => {

    const onSubmit = (formData) => {
        console.log(formData);
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm onSubmit={onSubmit} />
        </div>
    );
};

export default Login;


// ДЗ
// законектить к стору + сделать thunk + сделать API логина для этой страницы