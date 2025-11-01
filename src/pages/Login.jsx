import React, { useState } from "react";
import { motion } from "framer-motion";
import { TextField, Button, Card, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    const user = existingUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      toast.error("Invalid email or password!");
      return;
    }

    dispatch(loginSuccess(user));
    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Login successful!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="p-8 w-96 shadow-lg rounded-2xl">
          <Typography variant="h5" className="text-center font-semibold mb-6">
            Welcome Back 👋
          </Typography>

          <form onSubmit={handleLogin} className="space-y-4">
            <TextField label="Email" type="email" fullWidth required variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" type="password" fullWidth required variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />

            <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: "#0d9488", paddingY: "10px" }}>
              Login
            </Button>
          </form>

          <Typography className="text-center mt-4 text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-teal-600 font-medium">
              Sign up
            </Link>
          </Typography>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
