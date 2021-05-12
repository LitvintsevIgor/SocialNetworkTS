import React from "react";
import {InjectedFormProps, reduxForm, Field} from "redux-form";


type LoginFormDataType = {
    login: string
    password: string
    checkbox: string
}

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType>> = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field  name={"login"} placeholder={"login"} component={"input"} />
                </div>
                <div>
                    <Field name={"password"} placeholder={"password"} component={"input"}/>
                </div>
                <div>
                    <Field name={"rememberMe"} type={"checkbox"} component={"input"}/> remember me
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}

const LoginReduxForm = reduxForm<LoginFormDataType>({
    // a unique name for the form
    form: 'login'
})(LoginForm)


export const Login = () => {

    const onSubmit = (formData: LoginFormDataType) => {
        console.log(formData)
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}