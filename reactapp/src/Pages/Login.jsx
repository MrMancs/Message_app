import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    .then(async (responseJSON) => {
      const response = await responseJSON.json()
      console.log(response)
    }).catch((error) => {
      console.error(error)
    })
    console.log(email, password)
  };

  return (
    <div className="flex flex-col items-center justify-center bg-linear-to-r from-red-200 to-orange-200">
      <Stack
        spacing={2}
        className="flex flex-col items-center justify-center h-screen"
      >
        <div className="flex flex-col items-center justify-center gap-4 h-112.5 w-87.5">
          <h1 className="text-2xl pb-2 text-[#3285d7] font-bold">Login</h1>

          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            required
            className="w-62.5"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            required
            type="password"
            className="w-62.5"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="flex flex-row justify-center gap-5">
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              variant="outlined"
            >
              Login
            </Button>
            <Button onClick={() => navigate("/")} variant="outlined">
              Back
            </Button>
          </div>
        </div>
      </Stack>
    </div>
  );
}
