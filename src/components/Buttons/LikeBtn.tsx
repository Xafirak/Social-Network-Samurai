
import React, { useState } from "react";


type likeBtnPropstype ={
    likeCount: number
}


const LikeBtn = (props:likeBtnPropstype) => {
    const [counter, setCounter] = useState(props.likeCount)
    
    function increaseCount () {
        setCounter(counter + 1)
    }

    return (
        <div>
            <button onClick={increaseCount} >Like</button>
            <div style={{color:'pink'}}>Likes: <span>{counter}</span></div>
        </div>
    );
};





export default LikeBtn;
