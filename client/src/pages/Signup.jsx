import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Poster from "../assets/1.png";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { signupAPI } from "../api/users";

const Signup = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const mobileRef = useRef(null);
  const usernameRef = useRef(null);
  const checkboxRef = useRef(null);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkboxRef.current.checked) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const phone = mobileRef.current.value;
      const name = usernameRef.current.value;

      signupAPI(email, password, phone, name)
        .then((response) => {
          // console.log(response);
          toast.success(response.message);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        })
        .catch((err) => {
          // console.log(err.response.data.message);
          toast.error(err.message);
        });
    } else {
      toast.error("Please agree to our terms of use and privacy policy");
    }
  };

  return (
    <div className="register ">
      <div className="register__form">
        <h1>Create an account </h1>
        <label>Your personal job finder is here</label>
        <form action="">
          <input
            type="text"
            name="username"
            placeholder="Username"
            ref={usernameRef}
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            ref={mobileRef}
          />
          <input type="email" name="email" placeholder="Email" ref={emailRef} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id=""
            ref={passwordRef}
          />
          <div>
            <input type="checkbox" name="checkbox" ref={checkboxRef} />
            <span>
              By creating an account, I agree to our terms of use and privacy
              policy
            </span>
          </div>
          <button className="btn_submit" type="submit" onClick={handleSubmit}>
            Create Account
          </button>
        </form>
        <span>
          <label htmlFor="">Already have an account?</label>
          <Link to="/login" href="">
            Sign In
          </Link>
        </span>
      </div>
      <div className="register__poster">
        <label>Your Personal Job Finder </label>
        <img src={Poster} alt="" />
      </div>
    </div>
  );
};

export default Signup;
