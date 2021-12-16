import React, { SyntheticEvent, useState } from "react";
import '../pages/home.css';

import { useNavigate } from 'react-router';
import { stat } from "fs";
import { store, useGlobalState } from 'state-pool';


const TodoForm = (props: { userID: string, todos: any, setTodos: (t: any) => void, setFormStatus: (name: string) => void }) => {


  const [redirect, setRedirect] = useState(false)
  const [taskName, setTaskName] = useState("")
  const [status, setStatus] = useState("")
  const navigate = useNavigate();

  const getTasks2 = async () => {
    var str: string = status

    var content;
    console.log(props.userID.toString() + " status =" + str)
    if (str != "All") {
      const response = await fetch("http://localhost:8000/api/viewtasks", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "userId": props.userID.toString(),
          "status": str
        })
      })
      const conten = await response.json();
      content = conten
    }
    else {
      const response = await fetch("http://localhost:8000/api/viewalltasks", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "userId": props.userID.toString()
        })
      })
      const conten = await response.json();
      content = conten

    }
    const arr = []
    for (var i = 0; i < content.length; i++) {


      var obj = content[i];
      var arr2 = []
      for (var key in obj) {
        var value = obj[key];
        // console.log("<br> - " + key + ": " + value);
        arr2.push(value)
      }
      // console.log(obj)
      arr.push({ id: arr2[0], userId: arr2[1], taskName: arr2[2], status: arr2[3] })
      arr2 = []

    }
    props.setTodos(arr)
    console.log(props.todos)
    console.log("id = " + props.userID.toString() +" task status + "+ status)
  }

  const getTasks = async (e: any) => {
    var str: string = e.target.value
    console.log(" wybrany select to: " + str)
    setStatus(str)
    props.setFormStatus(status)

    
    var content;
    console.log(props.userID.toString() + " status =" + str)
    if (str != "All") {
      const response = await fetch("http://localhost:8000/api/viewtasks", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "userId": props.userID.toString(),
          "status": str
        })
      })
      const conten = await response.json();
      content = conten
    }
    else {
      const response = await fetch("http://localhost:8000/api/viewalltasks", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "userId": props.userID.toString()
        })
      })
      const conten = await response.json();
      content = conten

    }
    const arr = []
    for (var i = 0; i < content.length; i++) {


      var obj = content[i];
      var arr2 = []
      for (var key in obj) {
        var value = obj[key];
        // console.log("<br> - " + key + ": " + value);
        arr2.push(value)
      }
      // console.log(obj)
      arr.push({ id: arr2[0], userId: arr2[1], taskName: arr2[2], status: arr2[3] })
      arr2 = []

    }
    props.setTodos(arr)
    console.log(props.todos)
  }


  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    
    if (taskName !== "" && props.userID != "0") {

      const response = await fetch("http://localhost:8000/api/addtask", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "userId": props.userID.toString(),
          "taskName": taskName,
          "status": "In Progress"
        })
      })

      setTaskName("")
      console.log(props.userID.toString() + " status =" + status)
      //window.location.reload();

      getTasks2();
    }

  }

  return (

    <form onSubmit={submit} className="form-rest">
      <input type="text" className="todo-input" value={taskName}
        onChange={e => setTaskName(e.target.value)}
      />
      <button className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select name="todos" className="filter-todo" value={status}
          onChange={e => getTasks(e)}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="In progress">In progress</option>

        </select>
      </div>
    </form>
  );
}
export { TodoForm };