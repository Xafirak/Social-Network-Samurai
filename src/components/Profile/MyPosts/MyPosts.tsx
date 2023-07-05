
import React from 'react';
import Post from './Post/Post';
import cl from './MyPosts.module.css';
import TextInputWithButton from '../../TextInputWithButton/TextInputWithButton';
import { postDataType } from '../../../types/types';

type myPostsPropsType = {
    postData: Array<postDataType>
    addMessage: (message: string) => void

}
const MyPosts: React.FC<myPostsPropsType> = ({ postData, addMessage }) => {
    return (
        <div className={cl.postBlock}>
            <h3 className={cl.postBlock_title}>myPosts</h3>
            {postData.map((el: any) => {
                return (
                    <Post
                        message={el.message}
                        likes={el.likes}
                        key={el.id}
                    />
                );
            })}

            <TextInputWithButton
                addMessage={addMessage}
            />

        </div>
    );
};

export default MyPosts;
