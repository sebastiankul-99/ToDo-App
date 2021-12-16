import React, { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router';
import { waitFor } from "@testing-library/react";
import Cookies from "js-cookie";
import './forms.css';


const SignIn = (props: { setName: (name: string) => void }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [mess, setMess] = useState("")
    const navigate = useNavigate();
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (email !== '' && password !== '') {

            
            const response = await fetch("http://localhost:8000/api/signin", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const content = await response.json();
            // console.log(content);
            if (response.ok) {
                navigate('/')
                props.setName(content.name)

            }
            else {
                setMess(content.message);
            }
        }
        else {

            if (email === "") {

                setMess("Please provide email");
            }
            else {
                setMess("Please provide password");
            }
        }

    }

    return (
        <div>
            <form onSubmit={submit} className="form-signin">

                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <input type="email" className="form-control" id="floatingInput" placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                />
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />
                <p style={{ color: "red" }}>
                    {mess}
                </p>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

            </form>
        </div>


    );
};

export default SignIn;