import React, { useState } from 'react';
// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { FormLabel } from '@mui/material';

const MRegister = (props) => {
    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
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
                    username:"",
                    email: "",
                    avatar: "",
                    password: "",
                    confirmPassword: "",
                });
                setConfirmReg(
                    "You have successfully registered! You can now log in!",
                );
                setErrors({});
                navigate(`/mytasks/${user.username}`);
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
    }
    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={register} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        onChange={(e) => handleChange(e)}
                        name="firstName"
                        required
                        value={user.firstName}
                        fullWidth
                        label="First Name"
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        fullWidth
                        type="text"
                        label="Last Name"
                        value={user.lastName}
                        name="lastName"
                        onChange={(e) => handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        type="text"
                        name="username"
                        value={user.username}
                        label="User Name"
                        onChange={(e) => handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        type="email"
                        name="email"
                        value={user.email}
                        label="Email Address"
                        autoComplete="email"
                        onChange={(e) => handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        type="password"
                        name="password"
                        label="Password"
                        autoComplete="new-password"
                        onChange={(e) => handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        autoComplete="new-password"
                        onChange={(e) => handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                        >Errors will go here</FormLabel>
                    </Grid>
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color='success'
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2">
                        Already have an account? Sign in
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
                </Box>
            </Container>
        );
    }



export default MRegister;