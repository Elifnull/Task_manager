import axios from "axios";
import react, {useEffect, useState} from "react";
import Header from "./Header";
import {Typography, Box, CardContent, MenuItem ,CssBaseline,Grid, Container, Button, CardMedia, TextField, FormLabel, InputLabel, Select, FormControl} from '@mui/material/';
import { useNavigate, useParams } from "react-router-dom";


const EditTask = () =>{
    const current = new Date();
    const date = `${current.getFullYear()}-0${current.getMonth()}-${current.getDate()}`;
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const {id} = useParams();

    const [userArray, setUserArray] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [taskDueDate, setTaskDueDate] = useState("");
    const [taskAssignment, setTaskAssignment] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    

    const submitHandler = (element) => {
        element.preventDefault();
        axios.put(`http://localhost:8000/api/update/${id}`,{
            taskName,
            taskDesc,
            taskDueDate,
            taskAssignment,
            createdBy
        })
            .then(response =>{
                console.log(response);
                navigate("/alltasks")
            })
            .catch(error => {
                console.log(error.response.data.errors);
                if(error.response){setError(error.response.data.errors)}
                
            })
    }

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

    useEffect(()=>{
        axios.get('http://localhost:8000/api/allUsers')
            .then(response =>{
                console.log(response.data);
                setUserArray(response.data);
            })
            .catch(err => console.log(err))
    },[])

    return(
        <>
        <CssBaseline /> {/* this adds basic Css styling to the whole app*/}
            <Header/>
            {/* <main>
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
            </main > */}
            <Container maxWidth="md">
            <Box sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Box component="form" sx={{ mt: 3}} onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <TextField fullWidth 
                            variant="outlined"
                            name="taskName"
                            label="Task Name"
                            type="text"
                            value={taskName}
                            autoFocus
                            onChange={(e)=>setTaskName(e.target.value)}
                            />
                            <FormLabel
                            color="primary"
                            style={{marginLeft: "1vh"}}
                            >{error.taskName? error.taskName.message:null}
                            </FormLabel>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField fullWidth 
                            variant="outlined"
                            name="taskDesc"
                            label="Description"
                            type="text"
                            value={taskDesc}
                            autoFocus
                            onChange={(e)=>setTaskDesc(e.target.value)}
                            multiline
                            rows={5}
                            />
                            <FormLabel xs={10}
                            color="primary"
                            style={{marginLeft: "1vh"}}
                            >{error.taskDesc? error.taskDesc.message:null}
                            </FormLabel>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField fullWidth 
                            variant="outlined"
                            name="comment"
                            label="Due Date"
                            type="Date"
                            value={taskDueDate}
                            autoFocus
                            onChange={(e)=> setTaskDueDate(e.target.value)}
                            InputLabelProps={{shrink:true}}
                            />
                            <FormLabel xs={10}
                            color="primary"
                            style={{marginLeft: "1vh"}}
                            >{error.taskDueDate? error.taskDueDate.message:null}
                            </FormLabel>
                        </Grid>
                        <Grid item xs ={10}>
                            <FormControl fullWidth>
                                <InputLabel>Assign To</InputLabel>
                                <Select
                                label="Assign To"
                                onChange={(e)=>setTaskAssignment(e.target.value)}
                                value={taskAssignment}
                                >
                                {userArray? userArray.map((value,index)=>{
                                    return(
                                    <MenuItem key={index} value={value._id}>{value.username}</MenuItem>)
                                }):null}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs ={10}>
                            <FormControl fullWidth>
                                <InputLabel>Created By</InputLabel>
                                <Select
                                label="Created By"
                                onChange={(e)=>{
                                    console.log(e.target)
                                    return(setCreatedBy(e.target.value))
                                }}
                                value={createdBy}
                                >
                                    {userArray? userArray.map((value,index)=>{
                                    return(
                                    <MenuItem key={index} value={value._id}>{value.username}</MenuItem>)
                                }):null}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button 
                    color="primary"
                    type="submit" 
                    variant="contained" 
                    sx={{mt:5, mb: 3}}>Update Task</Button>
                </Box>
            </Box>
        </Container>
        </>
    )
}

export default EditTask;