import React from "react";
import style from "./FormsControls.module.css"
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";

type FormsControlPropsType = {
    meta: WrappedFieldMetaProps
}


export const FormsControl: React.FC<FormsControlPropsType> = ({meta: {touched, error}, children}) => {

    let hasError = touched && error;

    return (
        <div className={style.formsControl + " " + ( hasError ? style.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}




export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props
    const {input, meta, ...restProps} = props
    return (
        <FormsControl {...props} ><textarea {...input} {...restProps}/></FormsControl>
    )
}

export const Input: React.FC<WrappedFieldProps>  = (props) => {
    // const {input, meta, child, ...restProps} = props
    const {input, meta, ...restProps} = props
    return (
        <FormsControl {...props} ><input {...input} {...restProps}/></FormsControl>
    )
}


// export const Input = ({input, meta, ...props}) => {
//     debugger
//
//     let hasError = meta.touched && meta.error;
//
//     return (
//         <div className={style.formsControl + " " + ( hasError ? style.error : "")}>
//             <div>
//                 <input {...input} {...props}/>
//             </div>
//             {hasError && <span>{meta.error}</span>}
//         </div>
//     )
// }