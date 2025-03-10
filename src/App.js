import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/login";
import Register from "./Components/Register";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import SubmitRequests from "./Components/SubmitRequests";
import TaskRequests from "./Components/TaskRequests";
import JobSparePart from "./Components/JobSparePart";
import Jobs from "./Components/Jobs";
import UserProfile from "./Components/UserProfile";
import FQA from "./Components/FQA";
import Home from './Components/Home'; 
import Footer from "./Components/Footer";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const account = localStorage.getItem("account");
    const storedRole = localStorage.getItem("role");
    setLoggedIn(!!account);
    setRole(storedRole);
  }, []);

  return (
    <div className="app-container">
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            {isLoggedIn ? (
              <>
                {role === "User" && (
                  <>
                    <Route path="/AddRequests" element={<SubmitRequests />} />
                    <Route path="/FQA" element={<FQA />} />
                  </>
                )}
                {role === "Admin" && (
                  <>
                    <Route path="/Requests" element={<TaskRequests />} />
                    <Route path="/Stocks" element={<JobSparePart />} />
                    <Route path="/Jobs" element={<Jobs />} />
                    <Route path="/FQA" element={<FQA />} />
                  </>
                )}
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/UserProfile" element={<UserProfile />} />
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Footer" element={<Footer />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;