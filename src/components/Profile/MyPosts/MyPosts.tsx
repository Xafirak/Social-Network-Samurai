
import React from 'react';
import Post from './Post/Post';
import cl from './MyPosts.module.css';
import TextInputWithButton from '../../TextInputWithButton/TextInputWithButton';
import { profileInitialStateType } from '../../../redux/profileReducer';

type myPostsPropsType = {
    profilePage: profileInitialStateType
    addMessage: (message: string) => void

}
const MyPosts: React.FC<myPostsPropsType> = (props) => {
    return (
        <div className={cl.postBlock}>
            {props.profilePage.postData.map((el: any) => {
                return (
                    <div key={el.id}>
                        <Post
                            message={el.message}
                            likes={el.likes}
                            key={el.id}
                        />
                    </div>
                );
            })}

            <h3>myPosts</h3>
            <TextInputWithButton
                addMessage={props.addMessage}
            />

        </div>
    );
};

export default MyPosts;
