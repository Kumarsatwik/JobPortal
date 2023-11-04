import "./App.css";
import Login from "./pages/Login";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";

import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Home from "./pages/Home";
import AddJob from "./pages/AddJob";
import JobDescription from "./pages/JobDescription";
import EditJob from "./pages/EditJob";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/about-job/:jobId" element={<JobDescription />} />
          <Route path="/edit-job/:jobId" element={<EditJob />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
