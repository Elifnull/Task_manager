import React,{useEffect, useState} from "react";
import {Typography, Card, CardContent,CardActions,CssBaseline,Grid, Container, Button, CardMedia} from '@mui/material/';
import Header from "./Header";
import axios from "axios";
import {Link, useNavigate, useParams } from "react-router-dom";


const ViewTask = () => {
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const [comment, setComment] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    const deleteHandlier = (idbelow) => {
        axios.delete(`http://localhost:8000/api/photos/${idbelow}`)
            .then( response => {
                console.log(response)
                navigate('/')
            })
            .catch(err => console.log(err))
    };

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/photos/${id}`)
            .then(success => {
                console.log(success.data)
                setName(success.data.name);
                setPhoto(success.data.picture);
                setComment(success.data.comment);
            })
            .then(err => console.log(err));
    },[id])
    return(
        <>
            <CssBaseline />
            <Header/>
            <Container maxWidth="lg" >
                <Grid container spacing={6}>
                    <Grid item>
                        <Card>
                            <CardMedia
                                image="{photo}"
                                title="{name}"
                            />
                            <CardContent >
                                <Typography variant="h5" gutterBottom>
                                    Test Data
                                </Typography>
                                <Typography>
                                    Test comments
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary"onClick={()=>navigate(`/edit/${id}`)}>Edit</Button>
                                <Button size="small" color="warning" onClick={()=>deleteHandlier(id)}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ViewTask;