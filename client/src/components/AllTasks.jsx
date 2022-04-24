import react from "react";
import Header from "./Header";
import React, { useState } from 'react';
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
    const photoArray = [1,2,3,4,5,6]  //test variables for mapping
    
    let title = "title"
    let image = "https://wallsdesk.com/wp-content/uploads/2016/09/Space-Wallpapers-HQ.jpg"
    return(
        <>
        <CssBaseline /> {/* this adds basic Css styling to the whole app*/}
            <Header/>
            <main>
            <div >
                <Container maxWidth='sm' style={{marginTop: "3vh"}}>
                <Typography gutterBottom variant="h2" color="textPrimary" align="center" >All Tasks</Typography>
                <Typography paragraph variant="h6" color="textSecondary" align="center" >Hi this is my test for the Task viewer. is it wrapping well? or is it not wrapping well</Typography>
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
                <Grid container spacing={6}>
                    {photoArray?photoArray.map((value, index)=>(
                    <Grid item key={index}>
                        <Card style={{width:"20vh"}}>
                            <CardMedia
                                image={image}
                                title={title}
                            />
                            <CardContent  >
                                <Typography variant="h5" gutterBottom>
                                    test
                                </Typography>
                                <Typography>
                                    test
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary"onClick={()=>navigate(`/view/test`)}>View</Button>
                                <Button size="small" color="secondary" onClick={()=>navigate(`/edit/test`)}>Edit</Button>
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