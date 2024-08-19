import React, { useState } from "react";
import { USER_ENDPOINT, TWEET_ENDPOINT } from "../utils//content";
import axios from "axios";
import toast from "react-hot-toast";
import {  Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setuser } from "../redux/userSlice";
const Login = () => {
  const [isloggin, setloggin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (isloggin) {
      try {
        const res = await axios.post('/user/login', { email, password });
        console.log(res.data);
        dispatch(setuser(res?.data?.user))
        if(res.data.success) {
          navigate("/");
          toast.success(res.data.msg);
        }
      } catch (error) {
        console.log(error);
        toast.success(error.response.data.message);
      }
    } else {
      try {
        const res = await axios.post('/user/register', { username, password, email, name });
        console.log(res.data);
        setloggin(true)
        if(res.data.success) {
          toast.success(res.data.msg);
        }
      } catch (error) {
        console.log(error);
        toast.success(error.response.data.message);
      }
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex w-[90%] items-center ">
        <div className="shadow-2xl rounded-3xl py-10 mt-10">
          <img
            src="https://logos-world.net/wp-content/uploads/2023/08/X-Logo-500x281.png"
            alt="Logo"
          />
        </div>
        <div className="ml-44">
          <h1 className="font-bold text-6xl mb-10">Happening Now.</h1>
          <div className="shadow-2xl p-8 m-4 rounded-3xl">
            <h1 className="font-bold text-3xl mt-5">
              {isloggin ? "Login" : "SignUp"}
            </h1>

            <form
              className="flex flex-col w-[100%] transition-all items-center ml-5 mt-5"
              onSubmit={submitHandler}
              method="post"
            >
              {/* Conditionally render fields */}
              {!isloggin && (
                <>
                  <input
                    type="text"
                    name="name"
                    className="px-5 hover:w-72 hover:shadow-lg py-3 m-2 outline-none border rounded-full shadow-md transition-all bg-gray-100" // Consistent background color
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    name="username"
                    className="px-5 hover:w-72 hover:shadow-lg py-3 m-2 outline-none border rounded-full shadow-md transition-all bg-gray-100" // Consistent background color
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    placeholder="Username"
                  />
                </>
              )}
              <input
                type="text"
                className="px-5 hover:w-72 hover:shadow-lg py-3 m-2 outline-none border rounded-full shadow-md transition-all bg-gray-100" // Consistent background color
                value={email}
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
              />
              <input
                type="password"
                className="px-5 hover:w-72 hover:shadow-lg py-3 m-2 outline-none border rounded-full shadow-md transition-all bg-gray-100" // Consistent background color
                value={password}
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />
              <button className="bg-blue-500 text-white rounded-full px-4 py-2 w-32 shadow-md hover:shadow-lg hover:w-40 hover:bg-white hover:text-blue-500 mt-4 border-2 hover:border-blue-400 font-bold text-lg">
                {isloggin ? "Login" : "Sign Up"}
              </button>
              <h1 className="mt-4">
                {isloggin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <span
                  className={`cursor-pointer ${
                    isloggin ? "text-blue-500" : "text-blue-300"
                  } hover:text-blue-400`}
                  onClick={() => setloggin(!isloggin)}
                >
                  {isloggin ? " Sign Up" : " Sign In"}
                </span>
              </h1>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
