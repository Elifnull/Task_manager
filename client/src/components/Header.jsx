import react, {useEffect, useState} from "react";
import { AppBar,Toolbar, Typography, Box, Button, Menu, MenuItem, IconButton } from '@mui/material';
import {Link, useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LogoutIcon from '@mui/icons-material/Logout';
import { style } from "@mui/system";



const Header = () =>{

    const [user, setUser]= useState("")

    const userIdTest = "testID";

    const navigate = useNavigate();
    const theme = createTheme();
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
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative">
            <Toolbar style={{padding: "2vh"}}>
                <IconButton
                color="inherit"
                onClick={()=>navigate("/alltasks")}
                >
            <HomeIcon sx={{ mr: 2 }} 
            
            fontSize="large"
            />
            </IconButton>
            <Typography variant="h4" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                Hello {user? user: null}
            </Typography>
            <Box container>
            <Button color="inherit"onClick={logout} size='large' endIcon={<LogoutIcon fontSize="large"/>} style={{marginRight: "3vh"}}>Logout</Button>
            </Box>
            </Toolbar>
        </AppBar>
        </ThemeProvider>
    
    );
};


export default Header;


/*
<AppBar position="static">
<Toolbar>
<IconButton
    size="large"
    edge="start"
    color="inherit"
    aria-label="menu"
    sx={{ mr: 2 }}
    onClick={()=>navigate("/alltasks")}>
    <HomeIcon fontSize="large"/>
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
*/