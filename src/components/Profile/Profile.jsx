// @ts-nocheck
import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './MyPosts/MyPosts';

const Profile = (props) => {
    // console.log(props);
    return (
        <div>
            <ProfileInfo
                savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
            />
            <MyPosts
                profilePage={props.profilePage}
                addMessage={props.addMessage}
            />
        </div>
    );
};

export default Profile;
