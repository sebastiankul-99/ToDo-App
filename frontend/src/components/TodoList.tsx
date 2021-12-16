import React from "react";
import '../pages/home.css';
import { Todo } from "./Todo";
const TodoList = (props: { todos: any[], setTodos: (t: any) => void, formStatus: string }) => {

    return (

        <div className="todo-container">
            <ul className="todo-list" ></ul>
            {props.todos.map((todo) => (<Todo id={todo.id} userId={todo.userId} text={todo.taskName} status={todo.status} setTodos={props.setTodos} formStatus={props.formStatus} />))}

        </div>
    );
}
export { TodoList };