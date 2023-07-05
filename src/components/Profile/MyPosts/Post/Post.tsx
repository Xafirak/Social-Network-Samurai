
import React from "react";
import LikeBtn from "../../../Buttons/LikeBtn";
import cl from './Post.module.css'


type postPropstype = {
    message: string
    likes: number
}
const Post: React.FC<postPropstype> = ({ message, likes }) => {

    return (
        <div>
            <div className={cl.myPosts}>

                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ELkGbqOuLQfk5CC-ZTSVZQHaHa%26pid%3DApi&f=1&ipt=e14d637863df1ce2951ca706b519dc8c2d85fff0e7a4090cb27cb9d970440749&ipo=images" alt="pepe" />

                <div className={cl.myPosts_message}>
                    {message}
                </div>

                <div className={cl.likeBtn}>
                    <LikeBtn likeCount={likes} />
                </div>
            </div>
        </div>
    )
}

export default Post;