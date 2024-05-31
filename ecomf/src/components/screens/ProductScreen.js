import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../redux/actions/productActions";

function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  return (
    <div className="flex flex-col">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div className="pb-4">
          <div>
            <img src={product.product_img} className="h-80 w-80" alt="product details" />
            <p className="font-bold text-3xl leading-snug">
              {product.product_name}
            </p>
            <p>{product.product_info}</p>
            <p>{product.product_category}</p>
            <p>{product.product_price}</p>
          </div>

          <div className="">
            <strong>Status</strong>
            <div>
              {product.stock_count > 0 && (
                <div>
                  <label htmlFor="qty">Quantity:</label>
                  <select 
                    id="qty"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                  >
                    {[...Array(Math.min(product.stock_count)).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={addToCartHandler}
              className="bg-green-600 p-3"
              disabled={product.stock_count === 0}
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
