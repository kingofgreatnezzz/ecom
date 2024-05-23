import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../redux/actions/productActions";

function ProductScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  return (
    <div className="flex flex-col">
      {loading? (
        <h2>Loading...</h2>
      ) : error? (
        <h3>{error}</h3>
      ) : (
        <div>
          <img src={product.product_img} alt="product details" />
          <p className="font-bold text-3xl leading-snug">
            {product.product_name}
          </p>
          <p>{product.product_info}</p>
          <p>{product.product_category}</p>
          <p>{product.product_price}</p>
          <div>
            <strong>Status</strong>
            <div>
              {product.stock_count > 0? "In Stock" : "Out of Stock"}
            </div>
            <button
              type="button"
              className="bg-green-600 p-3 "
              disabled={product.stock_count <= 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;