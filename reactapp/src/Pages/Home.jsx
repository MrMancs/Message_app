import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Home(){
    const navigate = useNavigate();

    return(
        <div className="flex flex-col justify-center text-center text-[#3285d7]">
            <h1 className="text-6xl mt-10">Whisp</h1>
            <Stack spacing={2} className="flex flex-col items-center justify-center h-screen">
                <Button onClick={() => navigate("/login")} variant="outlined" size="large">Login</Button>
                <Button onClick={() => navigate("/register")} variant="outlined" size="large">Register</Button>
            </Stack>
        </div>
    )
}