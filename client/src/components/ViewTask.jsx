import React,{useEffect, useState} from "react";
import {Typography, Card, CardContent,CardActions,CssBaseline,Grid, Container, Button, CardMedia} from '@mui/material/';
import Header from "./Header";
import axios from "axios";
import {Link, useNavigate, useParams } from "react-router-dom";


const ViewTask = () => {
    const current = new Date();
    const date = `${current.getFullYear()}-0${current.getMonth()}-${current.getDate()}`;

    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [taskDueDate, setTaskDueDate] = useState("");
    const [taskAssignment, setTaskAssignment] = useState('');
    const [createdBy, setCreatedBy] = useState('');

    const [assignedTo, setAssignedTo] = useState("");
    const [assignedBy, setAssignedBy] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    const deleteHandlier = (idbelow) => {
        axios.delete(`http://localhost:8000/api/delete/${idbelow}`)
            .then( response => {
                console.log(response)
                navigate('/alltasks')
            })
            .catch(err => console.log(err))
    };

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/task/${id}`)
            .then(response => {
                console.log(response.data)
                setTaskName(response.data.taskName);
                setTaskDesc(response.data.taskDesc);
                setTaskDueDate(response.data.taskDueDate);
                setTaskAssignment(response.data.taskAssignment);
                setCreatedBy(response.data.createdBy);
            })
            .catch(err => console.log(err))
    },[id])

    // if(taskAssignment){
    //     useEffect(()=>{
    //         axios.get(`http://localhost:8000/api/task/${taskAssignment}`)
    //             .then(response => {
    //                 setAssignedBy(response.data.)
    //             })
    //     })
    // }

    return(
        <>
            <CssBaseline />
            <Header/>
            <Container maxWidth="lg" >
                <Grid container spacing={6}>
                    <Grid item>
                        <Card style={{
                            marginTop: "3vh",
                            display: "flex",
                            height: "100%",
                            width: '80vh',
                            flexDirection: "column",
                            padding: "1vh"
                            }}>
                            <CardContent >
                                <Typography variant="h3" gutterBottom>
                                    {taskName}
                                </Typography>
                                <Typography variant="h4" gutterBottom>
                                    {taskDesc}
                                </Typography >
                                <Typography variant="h5">
                                    Due by: {taskDueDate}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="large"  color="primary"onClick={()=>navigate(`/taskupdate/${id}`)}>Edit</Button>
                                <Button size="large" color="error" onClick={()=>deleteHandlier(id)}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ViewTask;