import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { validPassword } from "./Regexx";
import Message from "../Message";

function Signupscreen() {
  const navigate = useNavigate();
  const [usernmae, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [error, setError] = useState("");



  const submitHandler = (e) => {
    e.preventDefault();

    // Clear previous error message
    setError("");

    console.log(usernmae, email, password, password1);

    if (password !== password1) {
      setError("Passwords do not match");
      navigate("/signup");
    } else if (!validPassword.test(password)) {
      setError("Password must be at least 6 characters long");
    } else {
      setError('Successfully Signed Up');
    }
  };


  return (
    <>
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Welcome Back
          </h3>

          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            Login or create account
          </p>

          <div className="pt-4">
            {error && <Message color={"red"}>{error}</Message>}
          </div>

          <form onSubmit={submitHandler}>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-300 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                value={usernmae}
                placeholder="Username"
                aria-label="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-300 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                value={email}
                placeholder="Email Address"
                aria-label="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-300 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                value={password}
                placeholder="Password"
                aria-label="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-gray-600 text-left">
                password must include atleasr [1-9][a-z][A-Z][@./$%^&] & %
                characters
              </p>
            </div>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-300 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                onChange={(e) => setPassword1(e.target.value)}
                value={password1}
                placeholder="Confirm Password"
                aria-label="Confirm Password"
                required
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
              onClick={submitHandler} 
              className="w-full py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Sign Up
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Have an account?
          </span>

          <Link
            to={"/login"}
            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
}

export default Signupscreen;
