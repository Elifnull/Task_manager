import {useState, useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllTasks from "./components/AllTasks";
import MyTasks from "./components/MyTasks";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import ViewTask from "./components/ViewTask";
import LogReg from './views/LogReg';
import './App.css';

function App() {
  return (
  <div className="App">
    <BrowserRouter>
    <Routes>
      <Route element={<LogReg />} path="/"/>
      <Route path="/alltasks" element={<AllTasks/>}/>
      <Route path="/mytasks/:user" element={<MyTasks/>}/>
      <Route path="/addtask" element={<AddTask/>}/>
      <Route path="/taskupdate/:id" element={<EditTask/>}/>
      <Route path="/taskdetail/:id" element={<ViewTask/>}/>
    </Routes>
    </BrowserRouter>
  </div>
    
  );
}

export default App;

