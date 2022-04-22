import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {useState, useEffect} from "react";
import LogReg from './views/LogReg';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
        <Route element={<LogReg />} path="/"/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
