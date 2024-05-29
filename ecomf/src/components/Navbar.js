import React from "react";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import Logoutscreen from "./screens/Logoutscreen";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";

function Navbar() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className="flex justify-between mx-auto px-4 py-3 bg-gray-600">
      <div>
        <h4>Lucas shop</h4>
      </div>
      <ul className="flex flex-row gap-4 justify-center items-center font-bold">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/shop"}>Shop</Link>
        </li>
        <li>
          <Link to={"/about"}>about</Link>
        </li>
      </ul>
      <div>
        <div className="flex items-center space-x-3">
          {userInfo ? (
            <div>
              <p className="font-bold">Hi {userInfo.user.username}</p>
            </div>
          ) : (
            <div className="space-x-3">
              <Link
                to={"/login"}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </Link>

              <Link
                to={"/signup"}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                signup
              </Link>
            </div>
          )}
          <div onClick={logoutHandler}>
            <Logoutscreen />
          </div>

          <Link to={"/cart"}>
            <BsCart3 className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
