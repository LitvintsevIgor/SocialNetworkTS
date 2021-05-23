import React from "react";
import {InjectedFormProps, reduxForm, Field} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AllAppStateType} from "../../redux/redux-store";
import style from "./../common/FormsControls/FormsControls.module.css"


type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType>> = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field  name={"email"} placeholder={"Email"} component={Input} validate={[required]}/>
                </div>
                <div>
                    <Field name={"password"} placeholder={"Password"} component={Input} type={"password"} validate={[required]} />
                </div>
                <div>
                    <Field name={"rememberMe"} type={"checkbox"} component={Input}/> remember me
                </div>

                    { props.error &&  <div className={style.commonError} >{props.error}</div>}

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


type LoginType = {
    login: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
}

const Login = (props: LoginType) => {

    const onSubmit = (formData: LoginFormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

type mapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AllAppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)