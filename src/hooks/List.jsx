// @ts-nocheck
import React, { useState } from "react";
import { useRef } from "react";
import useScroll from "./useScroll";

const List = () => {
    const [todos, setTodos] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 20;
    const parentRef = useRef();
    const childRef = useRef();
    const itersected = useScroll(parentRef, childRef, () =>
        fetchTodos(page, limit)
    );


    function fetchTodos(page, limit) {
        fetch(
            `https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`
        )
            .then((response) => response.json())
            .then((json) => {
                if (json.length !==0 ){
                setTodos((prev) => [...prev, ...json]);
                setPage((prev) => prev + 1);
                }
                return
            });
    }

    return (
        <div ref={parentRef} style={{ height: "90vh", overflow: "auto" }}>
            {todos.map((todo) => (
                <div
                    key={todo.id}
                    style={{ padding: 30, border: "2px solid black" }}
                >
                    {todo.id}. {todo.title}
                </div>
            ))}
            <div
                ref={childRef}
                style={{ height: 20, background: "green" }}
            ></div>
        </div>
    );
};

export default List;
