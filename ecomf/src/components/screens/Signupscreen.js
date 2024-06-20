import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { signup } from "../../redux/actions/userActions";
import { validPassword } from "./Regexx";

function Signupscreen() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const userSignup = useSelector((state) => state.userSignup);
  const { loading, error, userInfo } = userSignup;

  // Redirect
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      setMessage(userInfo.details); // Display success message
      setUsername(""); // Reset form fields
      setEmail("");
      setPassword("");
      setPassword1("");
    }
    if (error) {
      setMessage(error); // Display error message
    }
  }, [userInfo, error, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Reset message state on form submission
    setMessage("");

    if (password !== password1) {
      setMessage("Passwords do not match");
    } else if (!validPassword.test(password)) {
      setMessage("Password must meet the criteria");
    } else {
      dispatch(signup(username, email, password));
    }
  };

  return (
    <>
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Create Account
          </h3>

          <div className="pt-4">
            {message && <Message color="red">{message}</Message>}
            {loading && <Loader />}
          </div>

          <form onSubmit={submitHandler}>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-300 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                value={username}
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
                Password must include at least one number, one letter, and one special character.
              </p>
            </div>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-300 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                placeholder="Confirm Password"
                aria-label="Confirm Password"
                required
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                type="submit"
                className="w-full py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Already have an account?
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
