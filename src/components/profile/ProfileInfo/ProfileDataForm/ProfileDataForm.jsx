import React from "react";
import {createField, Input, Textarea} from "../../../common/FormsControls/FormControls";
import {reduxForm} from "redux-form";
import style from "../../../common/FormsControls/FormControls.module.css";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>сохранить</button>
            </div>
            <h3>Имя: </h3>
            <div>{createField("Full Name", "fullName", [], Input)}</div>
            <div>
                <h3>В поиске работы: </h3>

                    {createField("",
                    "lookingForAJob",
                    [], Input,
                    {type: "checkbox"})}

                <h3>Описание навыков: </h3>
                {createField("Job Description",
                        "lookingForAJobDescription",
                        [],
                        Textarea)}

            </div>
            <div>
                <h3>Обо мне: </h3>
                {createField("About Me", "aboutMe", [], Textarea)}
            </div>
            <div>
                <h3>Мои контакты: </h3>
                {Object.keys(profile.contacts).map(key => {
                    return <div key={key}>
                        <b>{key}:</b>
                        {createField(key,
                            "contacts." + key,
                            [],
                            Input)}
                    </div>
                })}
            </div>
            {error && <div className={style.formSummaryError}>{error}</div>}
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({form: 'EditProfile'})(ProfileDataForm)
export default ProfileDataFormReduxForm