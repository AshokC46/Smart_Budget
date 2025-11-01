import React, { useState } from "react";
import { motion } from "framer-motion";
import { TextField, Button, Card, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signupSuccess } from "../redux/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    const userExists = existingUsers.some((user) => user.email === email);

    if (userExists) {
      toast.error("User already exists. Please login!");
      return;
    }

    const newUser = { fullName, email, password };

    existingUsers.push(newUser);
    localStorage.setItem("allUsers", JSON.stringify(existingUsers));

    dispatch(signupSuccess(newUser));
    toast.success("Account created successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="p-8 w-96 shadow-lg rounded-2xl">
          <Typography variant="h5" className="text-center font-semibold mb-6">
            Create Account 📝
          </Typography>

          <form onSubmit={handleSignup} className="space-y-4">
            <TextField
              label="Full Name"
              name="fullName"
              fullWidth
              required
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              required
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              required
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              required
              variant="outlined"
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#0d9488", paddingY: "10px" }}
            >
              Sign Up
            </Button>
          </form>

          <Typography className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-600 font-medium">
              Login
            </Link>
          </Typography>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
