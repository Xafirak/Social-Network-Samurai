// @ts-nocheck
import React from "react";
import { useState } from 'react';
import useDebounce from './useDebounce';

const Shit = () => {
    const [value, setValue] = useState('')
    const debouncedSearch = useDebounce(search, 500)
    function search(query) {
        fetch(`https://jsonplaceholder.typicode.com/todos?query=` + query)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
            });
    }

    const onChange = (e) => {
        setValue(e.target.value);
        debouncedSearch(e.target.value);
    };
    return (
        <div>
            <input type="text" value={value} onChange={onChange} />
        </div>
    );
};

export default Shit;


