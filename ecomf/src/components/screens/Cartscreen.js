import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, resetCart } from '../../redux/actions/cartActions';
import Message from '../Message';

function Cartscreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const productId = id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  const resetCartHandler = () => {
    dispatch(resetCart());
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Cart Items</h1>
      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty <Link to="/">Go back</Link>
        </Message>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cartItems.map((item) => (
            <div key={item.product} className="bg-white p-4 rounded-lg shadow-md">
              <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-t-lg" />
              <div className="mt-4">
                <Link to={`/product/${item.product}`} className="text-lg font-semibold">
                  {item.name}
                </Link>
                <p className="mt-2">${item.price}</p>
                <div className="flex items-center mt-4">
                  <select
                    value={item.qty}
                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                    className="mr-4 border border-gray-300 rounded-lg px-2 py-1"
                  >
                    {
                      [...Array(item.countInstock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))
                    }
                  </select>
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
      )}
      <button
        onClick={resetCartHandler}
        className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
      >
        Reset cart
      </button>
      {cartItems.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={checkoutHandler}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cartscreen;
