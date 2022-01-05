import React, { useEffect, useState } from "react";
import './App.css';
import SignIn from "./pages/Signin"
import Register from "./pages/Register"
import Nav from './components/nav';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Home from './pages/Home';
import { } from 'react-router-dom';

function App() {
  const [name, setName] = useState("")
  const [userId, setUserID] = useState("0")


  useEffect(() => {
    if (name !== "" || name !== undefined) {
      (

        async () => {
          const response = await fetch('http://localhost:8000/api/user', {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });

          const content = await response.json();
          //console.log(content)
          if (content.message !== "unauthenticated") {
            setName(content.name);
            setUserID(content.id)
          }
          

        }
      )();

    }
  }, [name]);



  return (
    <div className="App">
      <BrowserRouter>
        <Nav name={name} setName={setName} setUserID = {setUserID}/>
        <main className="form-signin">


          <Routes>
            <Route path='/' element={<Home name={name} userID={userId} setName={setName} />} />
            <Route path='/signin' element={<SignIn setName={setName} />} />
            <Route path='/register' element={<Register name={name} />} />
          </Routes>

        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
