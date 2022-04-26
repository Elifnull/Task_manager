import axios from "axios";
import react, {useEffect, useState} from "react";
import Header from "./Header";
import {Typography, Box, CardContent, MenuItem ,CssBaseline,Grid, Container, Button, CardMedia, TextField, FormLabel, InputLabel, Select, FormControl} from '@mui/material/';



const AddTask = () =>{
    const current = new Date();
    const date = `${current.getFullYear()}-0${current.getMonth()}-${current.getDate()}`;

    const [userArray, setUserArray] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [taskDueDate, setTaskDueDate] = useState("");
    const [taskAssignment, setTaskAssignment] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    
    

    const submitHandler = 'test'

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
                        <Grid item xs={10}>
                            <FormLabel error sx={{mb: 3}}>
                                error
                            </FormLabel>
                        </Grid>
                    </Grid>
                    <Button 
                    color="primary"
                    type="submit" 
                    variant="contained" 
                    sx={{mt:5, mb: 3}}>Assign Task</Button>
                </Box>
            </Box>
        </>
    )
}

export default AddTask;