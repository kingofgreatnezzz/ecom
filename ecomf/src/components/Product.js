import React from "react";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <div>
      <Link to={`/product/${product.id}`}>
        <img src={product.product_img} alt="product"/>
        <strong>{product.product_name}</strong>
        <p>${product.price}</p>
      </Link>
    </div>
  );
}

export default Product;
