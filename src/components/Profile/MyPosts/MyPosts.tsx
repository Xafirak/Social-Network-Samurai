
import React from 'react';
import Post from './Post/Post';
import cl from './MyPosts.module.css';
import TextInputWithButton from '../../TextInputWithButton/TextInputWithButton';

type myPostsPropsType = {
    profilePage: any
    addMessage: (message: string) => void

}
const MyPosts = (props: myPostsPropsType) => {
    return (
        <div className={cl.postBlock}>
            {props.profilePage.postData.map((el: any) => {
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

                // profilePage={props.profilePage}
                addMessage={props.addMessage}
            />

        </div>
    );
};

export default MyPosts;
