import {maxLengthCreator, required} from "../../../utils/validators/validators";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength = maxLengthCreator(20)


export type AddMessageFormType = {
    newMessageBody: string
}

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder={"Enter your message"}
                   name={"newMessageBody"}
                   component={Textarea}
                   validate={[required, maxLength]}
            />
            <div>
                <button>Sent message</button>
            </div>
        </form>
    )
}

export default reduxForm<AddMessageFormType>({
    // a unique name for the form
    form: 'dialogAddMessageForm'
})(AddMessageForm)