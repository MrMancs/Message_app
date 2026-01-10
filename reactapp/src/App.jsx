import React from "react";
import {Routes, Route, useNavigate} from "react-router-dom";

import Button from '@mui/material/Button';

import Login from "./Pages/Login";
import Register from "./Pages/Register";

export default function App(){
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Button onClick={() => navigate("/login")} className="flex">Login</Button>
      <Button onClick={() => navigate("/register")} className="flex">Register</Button>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}