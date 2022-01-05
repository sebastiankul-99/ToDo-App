import React from "react";
import '../pages/home.css';

import { Todo } from "./Todo";
const TodoList = (props: { todos: any[], setTodos: (t: any) => void, setReload: (t:string) =>void }) => {

    return (

        <div className="todo-container">
            <ul className="todo-list" ></ul>
           
            {props.todos.map((todo) => (<Todo  id={todo.id} userId={todo.userId} text={todo.taskName} status={todo.status} setTodos={props.setTodos} setReload={props.setReload} />))}
        
        </div>
    );
}
export { TodoList };