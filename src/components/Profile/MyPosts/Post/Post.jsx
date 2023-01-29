// @ts-nocheck
import React from "react";
import LikeBtn from "../../../Buttons/LikeBtn";
import cl from './Post.module.css'

const Post = (props) => {
    return (
        <div>
            <div className={cl.otherPosts}>
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ELkGbqOuLQfk5CC-ZTSVZQHaHa%26pid%3DApi&f=1&ipt=e14d637863df1ce2951ca706b519dc8c2d85fff0e7a4090cb27cb9d970440749&ipo=images" alt="pepe" />
                {props.message}
                <LikeBtn likeCount={props.likes} />
            </div>
        </div>
    )
}

export default Post;