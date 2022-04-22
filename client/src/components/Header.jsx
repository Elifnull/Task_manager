import react, {useEffect, useState} from "react";
import { AppBar,Toolbar, Typography, Box, Button, Menu, MenuItem, IconButton } from '@mui/material';
import {Link, useNavigate} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import axios from "axios";

const Header = () =>{

    const [user, setUser]= useState("")

    const userIdTest = "testID";

    const navigate = useNavigate();

    const logout = (e) => {
        axios
            .post(
                "http://localhost:8000/api/users/logout",
                {},
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        axios.get("http://localhost:8000/api/users",
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>navigate("/alltasks")}>
            <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div">
            Hello {user? user: null}
        </Typography>
        <Box container sx={{ flexGrow: 1 }}>
        <Button color="inherit"onClick={()=>navigate(`/mytasks/${userIdTest}`)}>My Tasks</Button>
        </Box>
        <Button color="inherit"onClick={logout}>Logout</Button>
        </Toolbar>
    </AppBar>
    </Box>
    );
}


export default Header;


// 