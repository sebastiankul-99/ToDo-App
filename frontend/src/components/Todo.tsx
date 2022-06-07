import React, { SyntheticEvent, useState } from "react";
import '../pages/home.css';

const Todo = (props: { id: any, text: any, userId: any, status: any, setTodos: (t: any) => void,  setReload: (t:string) =>void }) => {
 
  

  const submitDelete = async (e: SyntheticEvent) => {
   
    var Id: string
    Id = props.id.toString()
    console.log("Id = " + Id)
    e.preventDefault();
    const response = await fetch("https://backend.todoapp-namespace:8000/api/deletetask", {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "Id": Id,
      })
    })
   
   let strs :string = props.id+ props.userId + "delete";  
   props.setReload(strs)
  }

  const submitUpdate = async (e: SyntheticEvent) => {
  
    
    var Id: string
    Id = props.id.toString()
  
    var status: string;
    if (props.status == "In progress") {
      status = "Completed"
    } else {
      status = "In progress"
    }
    console.log("status po zmianie to: " + status)
    e.preventDefault();
    const response = await fetch("https://backend.todoapp-namespace:8000/api/changetaskstatus", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "id": Id,
        "status": status
      })
    })
    let num: number = Math.floor(Math. random() * (1000000 + 10000 + 1)) - 10000;
    let strs :string = props.id+ props.status+ props.userId + "update" + num;
    props.setReload(strs)
   
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