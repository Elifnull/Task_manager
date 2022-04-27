import react, { useEffect, useState } from "react";
import Header from "./Header";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
import { CardMedia,Card, CardActions, CardContent } from "@mui/material";
import { makeStyles } from "@mui/material";

const AllTasks = () =>{
    const navigate = useNavigate();
    const [allTasks, setAllTasks] = useState([]);
    const photoArray = [1,2,3,4,5,6,7,8,9,10]  //test variables for mapping
    
    useEffect(()=>{
        axios.get('http://localhost:8000/api/alltasks')
            .then(response =>{
                console.log(response.data)
                setAllTasks(response.data);
            })
            .catch(err =>{
                console.log(err)
            })
    }, [])

    let title = "title"
    
    return(
        <>
        <CssBaseline /> {/* this adds basic Css styling to the whole app*/}
            <Header/>
            <main>
            <div >
                <Container maxWidth='sm' style={{marginTop: "3vh"}}>
                <Typography gutterBottom variant="h2" color="textPrimary" align="center" >All Tasks</Typography>
                <Typography paragraph variant="h6" color="textSecondary" align="center" >All Assigned task reside here</Typography>
                <div>
                <Grid container spacing={2} justifyContent='center'>
                    <Grid item>
                    <Button onClick={()=>navigate('/addtask')} variant="outlined" color="primary">
                            Add Task
                        </Button>
                    </Grid>
                </Grid>
                </div>
                </Container>
            </div>
            </main >
            <Container maxWidth="lg" style={{marginTop: "3vh"}}>
                <Grid container spacing={5}>
                    {allTasks?allTasks.map((value, index)=>(
                    <Grid item key={index}>
                        <Card style={{
                            width:"20vh",
                            height: "25vh"
                                    }}>
                            <CardContent style={{flexGrow:1,}}>
                                <Typography variant="h5" gutterBottom>
                                    {value.taskName}
                                </Typography>
                                <Typography>
                                    {value.taskDesc}
                                </Typography>
                                <Typography>
                                    Due: {value.taskDueDate}
                                </Typography>
                            </CardContent >
                            <CardActions>
                                <Button size="small" color="primary"onClick={()=>navigate(`/taskdetail/${value._id}`)}>View</Button>
                                <Button size="small" color="secondary" onClick={()=>navigate(`/taskupdate/${value._id}`)}>Edit</Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    )):null}
                </Grid>
            </Container>
        </>
    )
}

export default AllTasks;