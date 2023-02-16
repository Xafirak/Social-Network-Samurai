import React from 'react';
import {
    createField,
    Input,
    Textarea,
} from './../../common/FormsControl/FormsControl';
import { Form } from 'react-final-form';
import classes from './ProfileInfo.module.css';

const ProfileDataForm = ({ onSubmit, profile, error }) => {
    return (
        <Form
            onSubmit={onSubmit}
            initialValues={profile}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <button>Save changes</button>
                    </div>
                    {error && (
                        <div className={classes.formError}>
                            {typeof error === 'string'
                                ? error
                                : 'Неправильное мыло или пароль!'}
                        </div>
                    )}
                    <div>
                        <b>Full Name</b>
                        {createField(null, 'fullName', Input, 'Full name')}
                    </div>
                    <div>
                        <b>Looking for a job</b>
                        {createField(
                            null,
                            'lookingForAJob',
                            Input,
                            'Do you need a job?',
                            { type: 'checkbox' }
                        )}
                    </div>
                    <div>
                        <b>Job Description</b>
                        {createField(
                            null,
                            'lookingForAJobDescription',
                            Textarea,
                            'describe your dream job'
                        )}
                    </div>
                    <div>
                        <b>About me</b>
                        {createField(
                            null,
                            'aboutMe',
                            Textarea,
                            'Some details about you'
                        )}
                    </div>
                    <div>
                        <b className={classes.contacts}>Контакты</b>:
                        {Object.keys(profile.contacts).map((key) => {
                            return (
                                <div key={key} >
                                    <b>{key}</b>:
                                    {createField(
                                        null,
                                        'contacts.' + key,
                                        Textarea,
                                        key
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </form>
            )}
        />
        //  {profile.lookingForAJob ? (
        //             <div>
        //                 <b>Ищу работу </b>✓
        //             </div>
        //         ) : (
        //             <div>
        //                 <b>Ищу работу </b>✖
        //             </div>
        //         )}
    );
};

export default ProfileDataForm;
