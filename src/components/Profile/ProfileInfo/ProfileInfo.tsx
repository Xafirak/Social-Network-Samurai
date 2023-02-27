
import React from 'react';
import Preloader from '../../common/Preloader/preloader';
import classes from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user.jpg';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';
import { ChangeEvent } from 'react';

type propsType = {
    profile: any
    status: string
    isOwner: boolean
    savePhoto: () => void
    saveProfile: (formData: formDataType) => void
    error: any;
    profilePage?: any;
    updateStatus: (status: string) => void
}

type formDataType = {

}

const ProfileInfo = ({
    profile,
    status,
    updateStatus,
    isOwner,
    savePhoto,
    saveProfile,
    error,
}: propsType) => {

    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />;
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        if (e.target.files.length) {
            //@ts-ignore
            savePhoto(e.target.files[0]);
        }
    };
    const onSubmit = (formData: formDataType) => {
        // console.log(formData);
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

type profileDataPropType = {
    profile: any
    isOwner: boolean
    activateEditMode: () => void
}

const ProfileData = ({ profile, isOwner, activateEditMode }: profileDataPropType) => {
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
                <div className={classes.contact}>
                    <b>My skillZ</b>: {profile.lookingForAJobDescription}
                </div>
            </span>
        </div>
    );
};

type contactPropsType = {
    contactName: string
    contactURL: string
}
const Contact = ({ contactName, contactURL }: contactPropsType) => {
    return (
        <div>
            <div className={classes.contact}>
                <span>
                    <b className={classes.contact_media}>
                        {contactName.replace(/\b\w/g, (c) => c.toUpperCase())}:
                    </b>
                    {contactURL ? (
                        <span className={classes.contact_link}>
                            {contactURL}{' '}
                        </span>
                    ) : (
                        false
                    )}
                </span>
            </div>
        </div>
    );
};

export default ProfileInfo;
