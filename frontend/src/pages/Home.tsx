import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import './home.css';
import { TodoForm } from "../components/TodoForms";
import { TodoList } from "../components/TodoList";
import { privateDecrypt } from "crypto";
const Home = (props: { name: string, userID: string, setName: (name: string) => void }) => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([])
    const [formStatus, setFormStatus] = useState("")

    return (
        <div>
            <header>
                <h1>  {props.name ? props.name + "'s Todo list" : 'Sign in first'}  </h1>

            </header>
            <TodoForm userID={props.userID} todos={todos} setTodos={setTodos} setFormStatus={setFormStatus} />
            <TodoList todos={todos} setTodos={setTodos} formStatus={formStatus} />
        </div>

    );
};

export default Home;