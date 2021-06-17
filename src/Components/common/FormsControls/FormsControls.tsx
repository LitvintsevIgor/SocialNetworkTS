import React, {ComponentType} from "react";
import style from "./FormsControls.module.css"
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators/validators";

type FormsControlPropsType = {
    meta: WrappedFieldMetaProps
}


export const FormsControl: React.FC<FormsControlPropsType> = ({meta: {touched, error}, children}) => {

    let hasError = touched && error;

    return (
        <div className={style.formsControl + " " + (hasError ? style.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return (
        <FormsControl {...props} ><textarea {...input} {...restProps}/></FormsControl>
    )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return (
        <FormsControl {...props} ><input {...input} {...restProps}/></FormsControl>
    )
}

export const createField = (name: string, placeholder: string | null, component: ComponentType<WrappedFieldProps>, validate?: Array<FieldValidatorType>, type?: string, text?: string) => {
    return (
        <div>
            <Field name={name} placeholder={placeholder} component={component} validate={validate} type={type}/> {text}
        </div>
    )
}