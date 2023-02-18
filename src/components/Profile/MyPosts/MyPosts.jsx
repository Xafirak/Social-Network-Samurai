// @ts-nocheck
import React from 'react';
import Post from './Post/Post';
import cl from './MyPosts.module.css';
import TextInputWithButton from '../../TextInputWithButton/TextInputWithButton';

const MyPosts = (props) => {
    return (
        <div className={cl.postBlock}>
            {props.profilePage.postData.map((el) => {
                return (
                    <div key={el.id}>
                        <Post
                            message={el.message}
                            likes={el.likes}
                            id={el.id}
                            key={el.id}
                        />
                    </div>
                );
            })}

            <h3>myPosts</h3>
            <TextInputWithButton
                profile
                profilePage={props.profilePage}
                addMessage={props.addMessage}
            />
            <div className={cl.posts}>{props.posts}</div>
        </div>
    );
};

export default MyPosts;
