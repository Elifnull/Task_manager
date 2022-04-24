import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();
        axios.post(
                "http://localhost:8000/api/users/login",
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res, "res");
                console.log(res.data, "is res data!");
                navigate("/home");
            })
            .catch((err) => {
                console.log(err.response)
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });
    };
    
    return (
        <div className='log-reg-page'>
            <div>
            <h1> Welcome Back! </h1>
            </div>
            <div className="log-reg-form">
            <p >{errorMessage ? errorMessage : ""}</p>
            <form onSubmit={login}>
                <div>
                    <h3>Email: </h3>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <h3>Password: </h3>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="log-reg-button">Sign In!</button>
            </form>
            </div>
        </div>
    )
}

export default Login;