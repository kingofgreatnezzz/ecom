import React from "react";
import { Link } from "react-router-dom";

import { BsCart3 } from "react-icons/bs";

export default function Navbarr() {
  return (
    <div>
      <div>
        <h1>E-Shop</h1>
      </div>

      <div>
        <ul>
          <li>Home</li>
          <li>Shop</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

        <div>
          <Link to={"#"}>Sign Up</Link>
          <BsCart3 className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
