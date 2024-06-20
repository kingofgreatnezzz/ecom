import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { login } from "../../redux/actions/userActions";

function Loginscreen() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect); // Redirect to appropriate page after successful login
    }
    if (error) {
      setMessage(error); // Display error message
    }
  }, [userInfo, error, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <>
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        {loading ? (
          <div className="pt-4">
            <Loader /> {/* Show loader while logging in */}
          </div>
        ) : (
          <div className="px-6 py-4">
            <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
              Welcome Back
            </h3>

            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
              Login to your account
            </p>

            <div className="pt-4">
              {message && <Message color="red">{message}</Message>}
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
                  type="password"
                  value={password}
                  placeholder="Password"
                  aria-label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between mt-4 pb-6">
                <button
                  type="submit"
                  className="w-full py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Login
                </button>
              </div>
            </form>

            <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-200">
                Don't have an account?
              </span>

              <Link
                to={"/signup"}
                className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
              >
                SignUp
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Loginscreen;
