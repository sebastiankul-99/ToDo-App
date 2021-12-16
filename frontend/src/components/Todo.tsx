import React, { SyntheticEvent, useState } from "react";
import '../pages/home.css';
import { store, useGlobalState } from 'state-pool';

// name is a member of myModule due to the export above


const Todo = (props: { id: any, text: any, userId: any, status: any, setTodos: (t: any) => void, formStatus: string }) => {

  const GetTasks = async (usrID:string) => {
    console.log("user id to :" + usrID)
    var content;
    
    const response = await fetch("http://localhost:8000/api/viewalltasks", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "userId": usrID
      })
    })
    const conten = await response.json();
    content = conten
    console.log(response);

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
  }

  const submitDelete = async (e: SyntheticEvent) => {
    var Id: string
    Id = props.id.toString()
    console.log("Id = " + Id)
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/deletetask", {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "Id": Id,
      })
    })
   // console.log(response);
    GetTasks(props.userId)
  }
  var status2: string = "Inprogress";
  const submitUpdate = async (e: SyntheticEvent) => {
    var Id: string
    Id = props.id.toString()
    console.log("Id = " + Id)
    var status: string;
    if (props.status == "In progress") {
      status = "Completed"
    } else {
      status = "In progress"
    }
    console.log("status po zmianie to: " + status)
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/changetaskstatus", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "id": Id,
        "status": status
      })
    })
   // console.log(response);
    GetTasks(props.userId)
  }
  return (
    <div className="todo">
      <li className="todo-iteam" id={props.status}> {props.text} </li>

      <button className="complete-btn" onClick={submitUpdate}><i className="fas fa-check"></i></button>

      <button className="trash-btn" onClick={submitDelete}><i className="fas fa-trash"></i></button>
    </div>
  );
}
export { Todo };