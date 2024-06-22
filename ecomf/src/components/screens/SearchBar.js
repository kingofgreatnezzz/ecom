import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../redux/actions/productActions";
import { addToCart } from "../../redux/actions/cartActions";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productSearch
  );

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim()) {
      dispatch(searchProducts(e.target.value));
    } else {
      dispatch({ type: "SEARCH_PRODUCTS_CLEAR" }); // Clear search results when input is empty
    }
  };

  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId, 1)); // Add 1 quantity of the product to the cart
  };

  const truncateText = (text, maxWords) => {
    return text.split(' ').slice(0, maxWords).join(' ') + '...';
  };

  // Clear search results when component unmounts
  useEffect(() => {
    return () => {
      dispatch({ type: "SEARCH_PRODUCTS_CLEAR" });
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <input
        type="text"
        className="bg-gray-400 w-[50%] h-10 rounded-full placeholder:text-gray-600 p-3"
        placeholder="Search for products..."
        value={query}
        onChange={handleSearch}
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="flex flex-wrap">
        {products.map((product) => (
          <div key={product.id} className="pt-4 m-2 border p-2 rounded shadow-md">
            <Link to={`/product/${product.id}`}>
              <img
                className="w-32 h-32 object-cover"
                src={product.product_img}
                alt={product.product_name}
              />
              <li className="font-bold">{product.product_name}</li>
              <p className="text-sm">
                {truncateText(product.product_info, 7)}
              </p>
              <li className="font-bold">${product.price}</li>
            </Link>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => handleAddToCart(product.id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
