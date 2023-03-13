import React from 'react'
import { Field, Form, Formik } from 'formik';
import { filterType } from '../../redux/usersReducer';
import { useSelector } from 'react-redux';
import { getUsersFilter } from './../../redux/users-selectors';


const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}


const UsersSearchForm: React.FC<UsersSearchFormType> = (props) => {

    const filter = useSelector(getUsersFilter)

    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {

        const filter: filterType = {
            term: values.term,
            friend: values.friend === 'null' ? null
                : values.friend === 'true' ? true : false
        }
        props.onFilterChanged(filter)
    }
    return (
        <div>
            <Formik        
                initialValues={{ term: filter.term, friend: String(filter.friend) }}
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

type UsersSearchFormType = {
    onFilterChanged: (filter: filterType) => void
}
type FormType = {
    term: string
    friend: 'null' | 'false' | 'true'
}

export default UsersSearchForm