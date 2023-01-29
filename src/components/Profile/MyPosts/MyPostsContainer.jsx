// @ts-nocheck
import React from "react";
import Post from "./Post/Post";
import cl from "./MyPosts.module.css";
import TextInputWithButton from "../../TextInputWithButton/TextInputWithButton";
import { connect } from 'react-redux';
import MyPosts from './MyPosts';

//Читай ниже, файл не нужен=================

const MyPostsContainer = (props) => {
    
    const posts = props.state.profilePage.postData.map((el) => {
        return (
            <Post
                message={el.message}
                likes={el.likes}
                id={el.id}
                key={el.id}
            />
        );
    });

   
    // } придумать как увеличить кол-во лайков при нажатии LikeBtn
    // function increaseLikeCount (id) {
    //     postData.id == id ? postData.likes +=1 : false

    return (
        <div className={cl.postBlock}>
            <h3>myPosts</h3>
            <TextInputWithButton 
                profile 
                state = { props.state } 
                dispatch = { props.dispatch }
            />
            <div className={cl.posts}>{posts}</div>
        </div>
    );
};

// let mapStateToProps = (state) => {
//     return {
//         profilePage: state.profilePage,
//     }
// }

// let mapDispatchToProps = (dispatch) => {
//     return {
//         dispatch: dispatch,
//     }
// }

// const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
// export default MyPostsContainer;

//==================================================
// не нужен ибо в ProfileContainer приходит вся необходимая дата