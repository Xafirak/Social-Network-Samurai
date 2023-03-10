
import React from 'react';
import { useEffect, useState } from 'react';
import cl from './ProfileInfo.module.css';
import { ChangeEvent } from 'react';

type propsType = {
    status: string | undefined
    updateStatus: (status: string) => void
    isOwner: boolean
}

const ProfileStatusWithHooks = (props: propsType) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);


    useEffect(() => {
        setStatus(props.status) 
    },[]);

    const toggleActivateEditMode = () => {
        return !editMode
            ? (setEditMode(true), console.log('editmode true'))
            : (setEditMode(false),
                console.log('editmode false'),
                //cтатус есть всегда, если мы обновляем его
                props.updateStatus(status!));
    };
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    };


    return (
        <div>
            {(!editMode && props.isOwner )? (
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
