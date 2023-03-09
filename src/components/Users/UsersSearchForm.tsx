import React from 'react'
import { Field, Form, Formik } from 'formik';
import { filterType } from '../../redux/usersReducer';


const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

type UsersSearchFormType = {
    onFilterChanged: (filter: filterType) => void
}

type FormType = {
    term: string
    friend: '' | 'false' | 'true'
}

const UsersSearchForm: React.FC<UsersSearchFormType> = (props) => {
    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        
        const filter: filterType = {
            term: values.term,
            friend: values.friend === '' ? null
                : values.friend === 'true' ? true : false
        }
        props.onFilterChanged(filter)
    }
    return (
        <div>
            <Formik
                initialValues={{ term: '', friend: '' }}
                validate={usersSearchFormValidate}
                //@ts-ignore я хз че ему не нравится 
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Followed Only</option>
                            <option value="false">Unfollowed Only</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find!
                        </button>
                    </Form>
                )}
            </Formik>

        </div>
    )
}

export default UsersSearchForm