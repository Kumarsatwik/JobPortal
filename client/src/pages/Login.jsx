import { useRef } from "react";
import Poster from "../assets/1.png";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser, setToken, setLoggedIn } from "../reducer/userSlice";
import { loginAPI } from "../api/users";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email === "" || password === "") {
      toast.error("Please fill all the fields");
      return;
    }

    loginAPI(email, password)
      .then((response) => {
        dispatch(setUser(response?.user));
        dispatch(setToken(response?.token));
        dispatch(setLoggedIn(true));
        localStorage.setItem("_user", JSON.stringify(response?.user));
        localStorage.setItem("_token", response?.token);
        localStorage.setItem("_loggedIn", true);
        toast.success(response.message);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
      });
  };

  return (
    <div className="login ">
      <div className="login__form">
        <h1>Already have an account? </h1>
        <label>Your personal job finder is here</label>
        <form action="">
          <input
            type="email"
            name="email"
            placeholder="Email"
            ref={emailRef}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id=""
            ref={passwordRef}
            required
          />
          <button className="btn_submit" type="submit" onClick={handleSubmit}>
            Sign in
          </button>
        </form>
        <span>
          <label htmlFor="">Don’t have an account?</label>
          <Link to="/signup" href="">
            Sign Up
          </Link>
        </span>
      </div>
      <div className="login__poster">
        <label>Your Personal Job Finder </label>
        <img src={Poster} alt="" />
      </div>
    </div>

    // <div className="flex justify-between bg-[#f4f4f4] w-screen h-screen">
    //   <div className="my-[10rem] mx-[3rem] ">
    //     <h1>Already have an account? </h1>
    //     <label>Your personal job finder is here</label>
    //     <form action="" className="flex flex-col mb-5 ">
    //       <input
    //         type="email"
    //         name="email"
    //         placeholder="Email"
    //         ref={emailRef}
    //         className="w-[25rem] h-[2.5rem] rounded my-2 pl-2.5 border border-black w-[400px]"
    //       />

    //       <input
    //         type="password"
    //         name="password"
    //         placeholder="Password"
    //         id=""
    //         ref={passwordRef}
    //         className="w-[25rem] h-[2.5rem] rounded my-2 pl-2.5 border border-black w-[400px]"
    //       />

    //       <button
    //         className="w-[25rem] h-[2.5rem] bg-black text-white  rounded mt-[20px] font-bold "
    //         type="submit"
    //         onClick={handleSubmit}
    //       >
    //         Sign in
    //       </button>
    //     </form>
    //     <span>
    //       <label htmlFor="">Don’t have an account?</label>
    //       <Link to="/signup" href="">
    //         Sign Up{" "}
    //       </Link>{" "}
    //     </span>
    //   </div>
    //   <div className="flex justify-end relative">
    //     <label className="absolute top-5 right-[10%] text-center text-white text-3xl">
    //       Your Personal Job Finder{" "}
    //     </label>
    //     <img
    //       src={Poster}
    //       alt=""
    //       className="max-w-full max-h-full object-contain"
    //     />
    //   </div>
    // </div>
  );
};

export default Login;
