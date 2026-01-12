import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Login() {
  const navigate = useNavigate();

  const [validPassword, setValidPassword] = useState(false);

  const checkValidPassword = (pw) => {
    if (pw.length <= 7) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
  };

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [matchingPasswords, setMatchingPasswords] = useState(false);

  const checkMatchingPasswords = (password, passwordAgain) => {
    if (password === passwordAgain) {
      setMatchingPasswords(true);
    } else {
      setMatchingPasswords(false)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-linear-to-r from-red-200 to-orange-200">
      <Stack
        spacing={2}
        className="flex flex-col items-center justify-center h-screen"
      >
        <div className="flex flex-col items-center justify-center gap-4 h-112.5 w-87.5">
          <h1 className="text-2xl pb-2 text-[#3285d7] font-bold">Register</h1>

          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            required
            className="w-62.5"
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            required
            className="w-62.5"
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            required
            type="password"
            className="w-62.5"
            onChange={(e) => {
              const pw = e.target.value;
              checkValidPassword(pw);

              setPassword(pw);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Password Again"
            variant="outlined"
            required
            type="password"
            className="w-62.5"
            onChange={(e) => {
              setPasswordAgain(e.target.value);
            }}
          />
          <div className="flex flex-row justify-center gap-5">
            <Button onClick={() => navigate("/login")} variant="outlined">
              Register
            </Button>
            <Button onClick={() => navigate("/")} variant="outlined">
              Back
            </Button>

            <Button
              onClick={() => {
                /*console.log("Érvényes: ", validPassword);
                console.log(password);
                console.log(passwordAgain);

                checkMatchingPasswords(password, passwordAgain);
                console.log(matchingPasswords)*/
              }}
              variant="outlined"
            >
              Kiírás
            </Button>
          </div>
        </div>
      </Stack>
    </div>
  );
}
