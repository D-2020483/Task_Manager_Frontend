import React from "react"; 
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import LoginPage from "./pages/login.page";
import RegisterPage from "./pages/register.page";
import DashboardPage from "./pages/dashboard.page";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes> 
    </Router>
  );
  };
export default App;