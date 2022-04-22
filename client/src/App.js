import react from "react";
import Header from "./components/Header";
import {useNavigate} from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllTasks from "./components/AllTasks";
import MyTasks from "./components/MyTasks";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import ViewTask from "./components/ViewTask";

function App() {
  return (
  <>
    <BrowserRouter>
    <Routes>
      <Route path="/alltasks" element={<AllTasks/>}/>
      <Route path="/mytasks" element={<MyTasks/>}/>
      <Route path="/addtask" element={<AddTask/>}/>
      <Route path="/taskupdate" element={<EditTask/>}/>
      <Route path="/taskdetail" element={<ViewTask/>}/>
    </Routes>
    </BrowserRouter>
  </>
    
  );
}

export default App;


{/* <>
    <BrowserRouter>
    <Routes>
      <Route/>
    </Routes>
    </BrowserRouter>
</> */}