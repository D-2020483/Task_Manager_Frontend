import React, { useState } from "react";
import { Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  //state for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  //handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //submit register form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Register API
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registered Successfully login again");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <Paper elevation={6} className="p-6 w-full">
          <Typography
            variant="h4"
            className="text-center mb-6 font-bold text-blue-700"
            gutterBottom
          >
            Register To Task Manager
          </Typography>
          <form onSubmit={handleSubmit}>
            {/*Name input*/}
            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
            />
            {/*Email input*/}
            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
            />
            {/*Password input*/}
            <TextField
              label="Password"
              name="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
            />
            {/*Submit button*/}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
            >
              Register
            </Button>
            {/*redirect to Login*/}
            <Typography className="mt-4 text-center">
              Already have an account?
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 cursor-pointer"
              >
                Login
              </span>
            </Typography>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default RegisterPage;
