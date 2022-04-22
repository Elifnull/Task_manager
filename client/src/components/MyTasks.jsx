import react from "react";
import Header from "./Header";
import {useParams} from "react-router-dom";
const MyTasks = () =>{
    const { user } = useParams(); //variable to allow user diferentiation from all tasks

    return(
        <>
        <Header/>
        <h1>MyTasks</h1>
        </>
    )
}

export default MyTasks;