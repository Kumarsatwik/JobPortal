import React from "react";
import "../styles/header.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";
import { logout } from "../reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
const Header = () => {
  let loggedIn = useSelector((state) => state.user.loggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("_user");
    localStorage.removeItem("_token");
    localStorage.removeItem("_loggedIn");
    navigate("/");
  };
  return (
    <div className="header">
      <h1 className="header-heading">Jobfinder</h1>
      {loggedIn ? (
        <span className="flex gap-4 items-center">
          <button className="button logout-button" onClick={handleLogout}>
            Logout
          </button>
          <label htmlFor="">Hello! Recruiter</label>
          <img
            className="header-user"
            src="https://img.icons8.com/pulsar-color/48/user.png"
            alt=""
          />
        </span>
      ) : (
        <span className="flex gap-5">
          <button className="login-button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="signup-button" onClick={() => navigate("/signup")}>
            Register
          </button>
        </span>
      )}
    </div>
  );
};

export default Header;
