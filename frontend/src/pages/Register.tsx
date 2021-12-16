import React, { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router';
import './forms.css';



const Register = (props: { name: string }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [mess, setMess] = useState("")
    const navigate = useNavigate();
    const submit = async (e: SyntheticEvent) => {

        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
        console.log(response);
        if (response.status === 400) {
            setMess("Email already exists")
        }
        else {
            navigate('/signin')
        }



    }




    let menu;

    if (props.name === '' || props.name === undefined) {
        menu = (
            <form onSubmit={submit} className="form-signin">

                <h1 className="h3 mb-3 fw-normal">Please Register</h1>
                <input type="text" className="form-control" id="floatingInput" placeholder="Name"
                    onChange={e => setName(e.target.value)}
                />
                <input type="email" className="form-control" id="floatingInput" placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                />
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />
                <p style={{ color: "red" }}>
                    {mess}
                </p>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>

            </form>
        )
    } else {
        navigate('/')
        menu = (
            <div>

            </div>
        )
    }
    return (
        <div>
            {menu}
        </div>


    );
};

export default Register;