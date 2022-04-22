import React, { useState, useEffect } from 'react';
import axios from "axios";



const Register = (props) => {

    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        avatar: "",
        password: "",
        confirmPassword: "",
});

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const register = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/register",
            user,
            {
                withCredentials: true
            })
            .then((res) => {
                console.log(res.data);
                setUser({
                    firstName: "",
                    lastName: "",
                    email: "",
                    avatar: "",
                    password: "",
                    confirmPassword: "",
                });
                setConfirmReg(
                    "You have successfully registered! You can now log in!",
                );
                setErrors({});
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })

    }


    return (
        <div className='log-reg-page'>
            <div>
            <div>
            <h1> Register </h1>
            </div>
            <div className="log-reg-form">
                <form onSubmit={register}>
                    <div>
                        <h3>First Name:</h3>
                        {errors.firstName ? (
                            <span className="error-text">
                                {errors.firstName.message}
                            </span>
                        ) : null}
                        <input
                            type="text"
                            name="firstName"
                            value={user.firstName}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <h3>Last Name:</h3>
                        {errors.lastName ? (
                            <span className="error-text">
                                {errors.lastName.message}
                            </span>
                        ) : null}
                        <input
                            type="text"
                            name="lastName"
                            value={user.lastName}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <h3>Email:</h3>
                        {errors.email ? (
                            <span className="error-text">{errors.email.message}</span>
                        ) : null}
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <h3>Avatar:</h3>
                        {errors.avatar ? (
                            <span className="error-text">
                                {errors.avatar.message}
                            </span>
                        ) : null}
                        <input
                            type="file"
                            name="avatar"
                            value={user.avatar}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <h3>Password:</h3>
                        {errors.password ? (
                            <span className="error-text">
                                {errors.password.message}
                            </span>
                        ) : null}
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <h3>Confirm Password:</h3>
                        {errors.confirmPassword ? (
                            <span className="error-text">
                                {errors.confirmPassword.message}
                            </span>
                        ) : null}
                        <input
                            type="password"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button>Register</button>
                    </div>
                    {confirmReg ? <h4>{confirmReg}</h4> : null}
                </form>
            </div>
            </div>
        </div>
    )
}


export default Register;