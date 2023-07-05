import React, { useState } from "react";


type likeBtnPropstype = {
    likeCount: number
}


const LikeBtn: React.FC<likeBtnPropstype> = ({ likeCount }) => {
    const [counter, setCounter] = useState(likeCount)
    const [disabled, setDisabled] = useState(false);

    function increaseCount() {
        setCounter(counter => counter + 1)
        setDisabled(true)
    }

    return (
        <div>
            <button
                disabled={disabled}
                onClick={() => increaseCount()}
            >Like</button>
            <div style={{ color: 'pink' }}>Likes: <span>{counter}</span></div>
        </div>
    );
};





export default LikeBtn;
