import React, { useEffect, useState } from "react";
import axios from "axios";

function Homescreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/products/"); // Await the Axios GET request
        setProducts(res.data); // Set state with the response data
      } catch (err) {
        console.log("Something went wrong", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="px-3">
      <h1 className="font-bold text-3xl p-2 pb-6">My Products</h1>
      <div className="grid grid-cols-3 gap-4 ">
        {products.map((product) => (
          <div key={product.id} className="bg-green-700 p-4">
          <img src=""/>
            <p>{product.product_name}</p>
            <p>{product.product_info}</p>
            <p>{product.product_category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homescreen;
