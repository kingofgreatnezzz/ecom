import React from "react";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import Logoutscreen from "./screens/Logoutscreen"

function Navbar() {
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
        <li>
          <Link to={"/categories"}>categories</Link>
        </li>
      </ul>
      <div>
        <div className=" flex items-center space-x-3">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link to={"/login"}>Login</Link>
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link to={"/signup"}>signup</Link>
          </button>
          <Link to={'/cart'}>
          
          <BsCart3 className="h-6 w-6" />
          </Link>
          <Logoutscreen/>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
