import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  addToCart,
  removeFromCart,
  resetCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/actions/cartActions";

function Cartscreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const productId = id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [subtotal, setSubtotal] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  useEffect(() => {
    const calculateSubtotal = () => {
      const sum = cartItems.reduce(
        (acc, item) => acc + item.qty * item.price,
        0
      );
      setSubtotal(sum);
    };

    calculateSubtotal();
  }, [cartItems]);

  useEffect(() => {
    if (subtotal <= 400) {
      setShippingCharge(50);
    } else if (subtotal <= 500) {
      setShippingCharge(25);
    } else {
      setShippingCharge(20);
    }
  }, [subtotal]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping", { state: { totalAmount: subtotal + shippingCharge } });
  };

  const resetCartHandler = () => {
    dispatch(resetCart());
  };

  const increaseQuantityHandler = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const decreaseQuantityHandler = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Cart Items</h1>
      {cartItems.length === 0 ? (
        <div>
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src=""
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray500 hover:text-blue bg-gray-300 duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartItems.map((item) => (
              <div
                key={item.product}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <Link
                    to={`/product/${item.product}`}
                    className="text-lg font-semibold"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-2">${item.price}</p>
                  <div className="flex items-center mt-4">
                    <div className="flex flex-row gap-2 pr-4">
                      <button
                        className="bg-gray-400 rounded-sm p-4"
                        onClick={() => decreaseQuantityHandler(item.product)}
                      >
                        <FaMinus />
                      </button>
                      <div className="bg-blue-500 p-4 font-bold">
                        {item.qty}
                      </div>
                      <button
                        className="rounded-md outline-2 outline-black bg-gray-400 px-3 py-3"
                        onClick={() => increaseQuantityHandler(item.product)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <p>Total</p>
                      <p className="font-bold">${item.qty * item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromCartHandler(item.product)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={resetCartHandler}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Reset cart
          </button>
          <div className="mt-6 flex flex-col justify-end">
            <div className="max-w-7xl gap-4 flex flex-col justify-end mt-4">
              <div className="w-96 flex flex-col gap-4">
                <h1 className="text-2xl font-semibold text-right">
                  Cart totals
                </h1>
                <div>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                    Subtotal
                    <span className="font-semibold tracking-wide font-titleFont">
                      ${subtotal}
                    </span>
                  </p>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                    Shipping Charge
                    <span className="font-semibold tracking-wide font-titleFont">
                      ${shippingCharge}
                    </span>
                  </p>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                    Total
                    <span className="font-bold tracking-wide text-lg font-titleFont">
                      ${subtotal + shippingCharge}
                    </span>
                  </p>
                  <button
                    onClick={checkoutHandler}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cartscreen;
