import { useState } from "react";
import { Button, Link, Paper, TextField, Typography } from "@mui/material";
import { login } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  //state for form data
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  //handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //submit login form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/dashboard"); //redirect to dashboard
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md">
        {/*Paper for card-like style*/}
        <Paper elevation={6} className="p-6">
          <Typography
            variant="h4"
            className="text-center mb-6 font-bold text-blue-700"
            gutterBottom
          >
            Login To Task Manager
          </Typography>
          <form onSubmit={handleSubmit}>
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
              Login
            </Button>
            {/*redirect to register*/}
            <Typography className="mt-4 text-center">
              Don't have an account?
              <Link href="/register" underline="hover">
                Register
              </Link>
            </Typography>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default LoginPage;
