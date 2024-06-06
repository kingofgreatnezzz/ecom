import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/actions/cartActions";

function Product({ product }) {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(product.id, 1)); // Assuming you want to add 1 item to the cart
  };

  return (
    <div>
      <Link to={`/product/${product.id}`}>
        <img src={product.product_img} alt="product" />
        <strong>{product.product_name}</strong>
        <p>${product.price}</p>
      </Link>
      <button
        className="bg-black p-3 rounded-md m-2 text-gray-300"
        onClick={addToCartHandler}
      >
        AddToCart
      </button>
    </div>
  );
}

export default Product;
