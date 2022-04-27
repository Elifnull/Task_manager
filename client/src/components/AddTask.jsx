import axios from "axios";
import react, {useEffect, useState} from "react";
import Header from "./Header";
import {Typography, Paper, Box, CardContent, MenuItem ,CssBaseline,Grid, Container, Button, CardMedia, TextField, FormLabel, InputLabel, Select, FormControl} from '@mui/material/';
import { useNavigate } from "react-router-dom";


const AddTask = () =>{
    const current = new Date();
    const date = `${current.getFullYear()}-0${current.getMonth()}-${current.getDate()}`;
    const navigate = useNavigate();
    const [error, setError] = useState({});

    const [userArray, setUserArray] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [taskDueDate, setTaskDueDate] = useState("");
    const [taskAssignment, setTaskAssignment] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    
    

    const submitHandler = (element) => {
        element.preventDefault();
        axios.post(`http://localhost:8000/api/create`,{
            taskName,
            taskDesc,
            taskDueDate,
            taskAssignment,
            createdBy
        },
        {
            withCredentials: true,
        },)
            .then(response =>{
                console.log(response);
                navigate("/alltasks")
            })
            .catch(error => {
                console.log(error.response.data);
                if(error.response){setError(error.response.data.errors)}
                
            })
    }

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
        <Container maxWidth="md" sx={{
            backgroundColor: "#E5E4E2",
            height: '100vh',
            overflow: 'auto',}}>
            <Box fullWidth sx={{
                marginTop: 8,
            }}>
            <Paper sx={{
                width: "100%",
                padding: "3vh"
            }}>
                <Box component="form"  onSubmit={submitHandler}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
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
                            <FormLabel xs={12}
                            color="primary"
                            style={{marginLeft: "1vh"}}
                            >{error.taskDesc? error.taskDesc.message:null}
                            </FormLabel>
                        </Grid>
                        
                        <Grid item xs={12}>
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
                            <FormLabel xs={12}
                            color="primary"
                            style={{marginLeft: "1vh"}}
                            >{error.taskDueDate? error.taskDueDate.message:null}
                            </FormLabel>
                        </Grid>
                        <Grid item xs ={12}>
                            <FormControl fullWidth xs={10}>
                                <InputLabel>Assign To</InputLabel>
                                <Select
                                label="Assign To"
                                onChange={(e)=>setTaskAssignment(e.target.value)}
                                value={taskAssignment}
                                >
                                {userArray? userArray.map((value,index)=>{
                                    return(
                                    <MenuItem xs={10} key={index} value={value._id}>{value.username}</MenuItem>)
                                }):null}
                                </Select>
                            </FormControl>
                            <FormLabel xs={12}
                            color="primary"
                            style={{marginLeft: "1vh"}}
                            >{error.taskAssignment? "Task must be assigned":null}
                            </FormLabel>
                        </Grid>
                        <Grid item xs ={12}>
                            <FormControl fullWidth xs={12}>
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
                                    <MenuItem xs={12} key={index} value={value._id}>{value.username}</MenuItem>)
                                }):null}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button 
                    color="primary"
                    type="submit" 
                    variant="contained" 
                    sx={{mt:5, mb: 3}}>Assign Task</Button>
                </Box>
                </Paper>
            </Box>
    </Container>
    </>
    )
}

export default AddTask;