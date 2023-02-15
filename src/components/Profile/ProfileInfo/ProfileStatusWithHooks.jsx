// @ts-nocheck
import React from 'react';
import { useEffect,useState } from 'react';


const ProfileStatusWithHooks = (props) => {
    
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect ( () => {
        setStatus(props.status)
    }, [props.status])

    const toggleActivateEditMode = () => {
        return !editMode 
            ? (setEditMode(true), console.log('editmode tru'))
            : (setEditMode(false),
              console.log('editmode false'),
              props.updateStatus(status));
    };
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div>
            {!editMode && (
                <div>
                    <span onDoubleClick={toggleActivateEditMode}>
                        {props.status || '_____'}
                    </span>
                </div>
            )}
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
