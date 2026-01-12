import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Login() {
  const navigate = useNavigate();

  const [validPassword, setValidPassword] = useState(true);

  const checkValidPassword = (pw) => {
    if (pw.length <= 7) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
  };

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [matchingPasswords, setMatchingPasswords] = useState(true);

  const checkMatchingPasswords = (password, passwordAgain) => {
    if (password === passwordAgain) {
      setMatchingPasswords(true);
    } else {
      setMatchingPasswords(false);
    }
  };

  const [validEmail, setValidEmail] = useState(true);

  const checkValidEmail = (email) => {
    const splitEmail = email.split("@");
    console.log(splitEmail);

    const splitAfterAt = splitEmail[1]?.split(".");
    console.log(splitAfterAt);

    if (email.length == 0 || !email.includes("@")) {
      setValidEmail(false);
      //console.log("első")
    }
    if (splitEmail[0].length == 0 || splitEmail[1].length == 0) {
      setValidEmail(false);
      //console.log("második")
    }
    if (!splitEmail[1].includes(".")) {
      setValidEmail(false);
      //console.log("harmadik")
    }
    if (splitAfterAt[0].length == 0 || splitAfterAt[1].length < 2) {
      setValidEmail(false);
      //console.log("negyedik")
    } else {
      setValidEmail(true);
    }
  };

  const [validUsername, setValidUsername] = useState(true);

  const checkValidUsername = (username) => {
    if (username.length < 3) {
      setValidUsername(false);
    } else {
      setValidUsername(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-linear-to-r from-red-200 to-orange-200">
      <Stack
        spacing={2}
        className="flex flex-col items-center justify-center h-screen"
      >
        <div className="flex flex-col items-center justify-center gap-4 h-112.5 w-100">
          <h1 className="text-2xl pb-2 text-[#3285d7] font-bold">Register</h1>

          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            required
            className="w-75"
            onChange={(e) => {
              checkValidUsername(e.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            required
            className="w-75"
            onChange={(e) => {
              checkValidEmail(e.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            required
            type="password"
            className="w-75"
            onChange={(e) => {
              setPassword(e.target.value);
              checkValidPassword(e.target.value);

              checkMatchingPasswords(e.target.value, passwordAgain);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Password Again"
            variant="outlined"
            required
            type="password"
            className="w-75"
            onChange={(e) => {
              setPasswordAgain(e.target.value);

              checkMatchingPasswords(password, e.target.value);
            }}
          />
          <p className="text-red-500 text-[12px]">
            {!validUsername &&
              "A felhasználónévnek legalább 3 karakter hosszúnak kell lennie!"}
          </p>
          <p className="text-red-500 text-[12px]">
            {!validEmail && "Helytelen email formátum!"}
          </p>
          <p className="text-red-500 text-[12px]">
            {!validPassword &&
              "A jelszónak legalább 8 karakter hosszúnak kell lennie!"}
          </p>
          <p className="text-red-500 text-[12px]">
            {!matchingPasswords && "A jelszavak nem egyeznek!"}
          </p>
          <div className="flex flex-row justify-center gap-5">
            <Button onClick={() => navigate("/login")} variant="outlined">
              Register
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
