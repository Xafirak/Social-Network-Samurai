// @ts-nocheck
import React from 'react';
import {
    createField,
    Input,
    Textarea,
} from './../../common/FormsControl/FormsControl';
import { Form } from 'react-final-form';
import classes from './ProfileInfo.module.css';

///////

/////////////

const ProfileDataForm = ({ onSubmit, profile, error }) => {
    window.err = error;
    window.pr = profile;
    console.log(error);

    
    // очередная попытка сделать валидацию ошибки, по обьекту contacts не работают
    // ни 'map' ни 'forEach', невозможно проитерироватся
    // let contacts = profile.contacts;
    // const showError = (error, key) => {
    //     if (!error) return null;
    //     else {
    //         return error.map(e => e.includes(key) ? error[e] : undefined);
    //     }
    // };
    //     const showErrorCreator = (error, contacts) => {
    //     if (!error) return null;
    //     else {
    //         let newErr = []
    //         for(i = 0; i < contacts.length; i++){
    //             newErr.push(contacts[i])
    //         }
    //         let mediaName = contacts.forEach((e) => console.log(contacts[e]));
    //         return error.includes(mediaName) ? error : undefined;
    //     }
    // };

    // const incError = (errorsArr, profile, error) => {
    //     return errorsArr.includes(profile.contacts)
    //         ? console.log(error)
    //         : undefined;
    // };
    // const getErrors = (error) => {
    //     if (!error) return null;
    //     if (error) {
    //         let errors = Object.keys(error).reduce((acc, key) => {
    //             let errorMessage = error[key]
    //                 .split('>')[1]
    //                 .toLowerCase()
    //                 .slice(0, -1);
    //             // console.log([errorMessage], error[key]);
    //             return { ...acc, [errorMessage]: error[key] };
    //         }, {});
    //         console.log(errors);
    //         return errors;
    //     }
    // };
    return (
        <Form
            onSubmit={onSubmit}
            initialValues={profile}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <button>Save changes</button>
                    </div>
                    {/* {error && <div className={classes.formError}>{error || error.map(e=>{return })}</div>} */}
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
                                <div key={key}>
                                    <b>
                                        {key.replace(/\b\w/g, (c) =>
                                            c.toUpperCase()
                                        )}
                                    </b>
                                    :
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
    );
};

export default ProfileDataForm;
