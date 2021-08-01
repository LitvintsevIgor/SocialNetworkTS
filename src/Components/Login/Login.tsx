import React from "react";
import {InjectedFormProps, reduxForm, Field} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
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
    captcha: string
}

type Iprops = {
    captchaUrl: null | string
}

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, Iprops> & Iprops> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {createField("email", "Email", Input, [required])}
                {createField("password", "Password", Input, [required], "password")}
                {createField("rememberMe", null, Input, [], "checkbox", "remember me")}
                { captchaUrl && <img src={captchaUrl} alt=""/>}
                { captchaUrl &&  <div>{createField("captcha", "Anti-bot symbols", Input, [required])}</div> }
                    {error &&  <div className={style.commonError} >{error}</div>}
                <div>
                    <button>Login</button>
                </div>
            </form>
        </div>
    )
}

const LoginReduxForm = reduxForm<LoginFormDataType, Iprops>({form: 'login'})(LoginForm)
type LoginType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    isAuth: boolean,
    captchaUrl: null | string
}

const Login = (props: LoginType) => {

    const onSubmit = (formData: LoginFormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

type mapStateToPropsType = {
    isAuth: boolean
    captchaUrl: null | string
}

const mapStateToProps = (state: AllAppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl

})

export default connect(mapStateToProps, {login})(Login)