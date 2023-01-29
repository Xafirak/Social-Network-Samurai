import React, { useState } from "react";
import useInput from "./useInput";

const Hooks = () => {
    const username = useInput("");
    const password = useInput("");

    return (
        <>
            <input {...username} type="text" placeholder="username" />
            <input {...password} type="text" placeholder="password" />
            <button onClick={() => console.log(username.value, password.value)}>
                click
            </button>
        </>
    );
};

export default Hooks;
