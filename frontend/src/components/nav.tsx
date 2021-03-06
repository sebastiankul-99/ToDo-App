import React from "react";
import { Link } from "react-router-dom";
import './nav.css';
const Nav = (props: { name: string, setName: (name: string) => void , setUserID: (userID: string) => void }) => {

    const logout = async () => {
        await fetch('https://backend.todoapp-namespace:8000 api/signout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        props.setName('');
        props.setUserID("0");
    }

    let menu;


    if (props.name === '' || props.name === undefined) {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/signin" className="nav-link">Sign In</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/signin" className="nav-link" onClick={logout}>Logout</Link>
                </li>
            </ul>
        )
    }
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">

                        {menu}
                    </div>
                </div>
            </nav>
        </div>


    );
};

export default Nav;