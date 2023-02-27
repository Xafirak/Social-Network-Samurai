
import React from 'react';
import { useEffect, useState } from 'react';
import cl from './ProfileInfo.module.css';
import { ChangeEvent } from 'react';

type propsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks = (props: propsType) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const toggleActivateEditMode = () => {
        return !editMode
            ? (setEditMode(true), console.log('editmode true'))
            : (setEditMode(false),
                console.log('editmode false'),
                props.updateStatus(status));
    };
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div>
            {!editMode ? (
                <div>
                    <span
                        className={cl.statusText}
                        onDoubleClick={toggleActivateEditMode}
                    >
                        {props.status || '_____'}
                    </span>
                </div>
            ) : null}
            {editMode && (
                <div>
                    <input
                        onChange={onStatusChange}
                        autoFocus={true}
                        onBlur={toggleActivateEditMode}
                        value={status}
                    />
                </div>
            )}
        </div>
    );
};

export default ProfileStatusWithHooks;
