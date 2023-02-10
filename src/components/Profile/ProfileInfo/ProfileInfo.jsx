import React from 'react';
import Preloader from '../../common/Preloader/preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({ profile, status, updateStatus }) => {
    if (!profile) {
        return <Preloader />;
    }

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
                    <img src={profile.photos.large} alt="" />
                    <span className={classes.aboutMe}>
                        <ProfileStatusWithHooks
                            status={status}
                            updateStatus={updateStatus}
                        />
                    </span>
                </div>
                <div className={classes.description}>
                    <span>
                        <div className={classes.fullName}>
                            {profile.fullName}
                        </div>
                        <div className={classes.contacts}>
                            Контакты:
                            <div className={classes.contact}>
                                <span className={classes.contact_media}>
                                    Facebook
                                </span>
                                <span className={classes.contact_link}>
                                    {profile.contacts.facebook}
                                </span>
                            </div>
                            <div className={classes.contact}>
                                <span className={classes.contact_media}>
                                    Vk
                                </span>
                                <span className={classes.contact_link}>
                                    {profile.contacts.vk}
                                </span>
                            </div>
                            <div className={classes.contact}>
                                <span className={classes.contact_media}>
                                    Instagram
                                </span>
                                <span className={classes.contact_link}>
                                    {profile.contacts.instagram}
                                </span>
                            </div>
                            <div className={classes.contact}>
                                <span className={classes.contact_media}>
                                    GitHub
                                </span>
                                <span className={classes.contact_link}>
                                    {profile.contacts.github}
                                </span>
                            </div>
                        </div>
                        {profile.lookingForAJob ? (
                            <div>
                                Ищу работу ✓ <br />
                                {profile.lookingForAJobDescription}
                            </div>
                        ) : (
                            <div>Ищу работу ✖</div>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
