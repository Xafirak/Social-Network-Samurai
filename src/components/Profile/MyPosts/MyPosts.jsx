// @ts-nocheck
import React from 'react';
import Post from './Post/Post';
import cl from './MyPosts.module.css';
import TextInputWithButton from '../../TextInputWithButton/TextInputWithButton';

const MyPosts = (props) => {

    const posts = props.profilePage.postData.map((el) => {
        return (
            <Post
                message={el.message}
                likes={el.likes}
                id={el.id}
                key={el.id}
            />
        );
    });

    return (
        <div className={cl.postBlock}>
            <h3>myPosts</h3>
            <TextInputWithButton
                profile
                profilePage={props.profilePage}
                addMessage={props.addMessage}
            />
            <div className={cl.posts}>{posts}</div>
        </div>
    );
};

export default MyPosts;
