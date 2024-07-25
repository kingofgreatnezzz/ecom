import React, { useEffect } from "react";
import { listProducts } from "../../redux/actions/productActions";
import Product from "../Product";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import SearchBar from "../screens/SearchBar";

function Homescreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="px-3">
      <div>
        <SearchBar />
      </div>
      <h1 className="font-bold text-3xl p-2 pb-6">My Products</h1>
      <div className="grid">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message color={"red"}>{error}</Message>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-3 bg-green-600 gap-4 "
            >
              <Product product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Homescreen;
