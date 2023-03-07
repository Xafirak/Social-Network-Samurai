// @ts-nocheck
import React from "react";
import useRequest from "./useRequest";
import axios from "axios";

const AnothaSht = () => {
    const [todos, loading, error] = useRequest(fetchTodos);
    function fetchTodos() {
        return axios.get(`https://jsonplaceholder.typicode.com/todsos?query=`);
    }
    if (loading) {
        return <h1>Идет загрузка...</h1>;
    }

    if (error) {
        return <h1>Произошла ошибка при загрузке</h1>;
    }

    return (
        <div>
            {todos &&
                todos.map((todo) => (
                    <div
                        key={todo.id}
                        style={{ padding: 30, border: "2px solid black" }}
                    >
                        {todo.id}. {todo.title}
                    </div>
                ))}
        </div>
    );
};
export default AnothaSht;
