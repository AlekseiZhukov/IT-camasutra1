import React from 'react'
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";



const maxLength20 = maxLengthCreator(20)

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name="newMessageBody"
                       placeholder="Enter your message"
                       validate={[required, maxLength20]}
                />
            </div>
            <div>
                <button >Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form:"dialogAddMessageForm"})(AddMessageForm);

export default AddMessageFormRedux