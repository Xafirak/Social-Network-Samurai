// @ts-nocheck
import React from 'react';
import Preloader from '../../common/Preloader/preloader';
import classes from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user.jpg';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({
    profile,
    status,
    updateStatus,
    isOwner,
    savePhoto,
    saveProfile,
    error,
}) => {
    const [editMode, setEditMode] = useState(false);
    console.log(error);
    if (!profile) {
        return <Preloader />;
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    };
    const onSubmit = (formData) => {
        console.log(formData);
        saveProfile(formData);
        // setEditMode(false);
    };
// ДЗ - добавить эррор к определенному полю, урок 97 1:07:54
    return (
        <div className="profileInfo">
            <div>
                <img
                    className={classes.img}
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2FxefZBsj.jpg&f=1&nofb=1&ipt=739dd23f5464e125250fe492a68a3903c8f93acba5a7c4693889bdb932f22d59&ipo=images"
                    alt="beach"
                />
            </div>
            <div className={classes.descriptionBlock}>
                <div className={classes.description}>
                    <img
                        src={profile.photos.large || userPhoto}
                        alt=""
                        className={classes.avatar}
                    />
                    <div>
                        {isOwner ? (
                            <input type="file" onChange={onMainPhotoSelected} />
                        ) : (
                            true
                        )}
                    </div>
                    <span className={classes.aboutMe}>
                        <b>STATUS</b>:
                        <ProfileStatusWithHooks
                            status={status}
                            updateStatus={updateStatus}
                        />
                    </span>
                </div>
                <div className={classes.description}>
                    {editMode ? (
                        <ProfileDataForm
                            profile={profile}
                            onSubmit={onSubmit}
                            profile={profile}
                            error={error}
                        />
                    ) : (
                        <ProfileData
                            profile={profile}
                            isOwner={isOwner}
                            activateEditMode={() => setEditMode(true)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

const ProfileData = ({ profile, isOwner, activateEditMode }) => {
    return (
        <div>
            {isOwner ? (
                <div>
                    <button onClick={activateEditMode}>
                        Wanna edit your Profile?
                    </button>
                </div>
            ) : null}
            <span>
                <div className={classes.fullName}>{profile.fullName}</div>
                <div>
                    {' '}
                    <b>About me</b>: {profile.aboutMe}
                </div>

                <div className={classes.contacts}>
                    <b>Контакты</b>:
                    {Object.keys(profile.contacts).map((key) => {
                        return (
                            <Contact
                                key={key}
                                contactName={key}
                                contactURL={profile.contacts[key]}
                            />
                        );
                    })}
                </div>
                <div>
                    {profile.lookingForAJob ? (
                        <div>
                            <b>Ищу работу </b>✓
                        </div>
                    ) : (
                        <div>
                            <b>Ищу работу </b>✖
                        </div>
                    )}
                </div>
                <div>
                    <b>My skillZ</b>: {profile.lookingForAJobDescription}
                </div>
            </span>
        </div>
    );
};

const Contact = ({ contactName, contactURL }) => {
    return (
        <div>
            <div className={classes.contact}>
                <span className={classes.contact_media}>
                    <b>{contactName}</b>:
                    <span className={classes.contact_link}>{contactURL} </span>
                </span>
            </div>
        </div>
    );
};

export default ProfileInfo;
