// @ts-nocheck
import React, { useState } from "react";





const LikeBtn = (props) => {
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
