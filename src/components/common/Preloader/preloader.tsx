import React from "react";
import preloader from "../../../assets/images/Spin-1s-200px.svg";

type preloaderPropsType = {

}

let Preloader:React.FC<preloaderPropsType> = () => {
    return (
        <div>
            <img src={preloader} alt=''/>
        </div>
    );
};

export default Preloader;