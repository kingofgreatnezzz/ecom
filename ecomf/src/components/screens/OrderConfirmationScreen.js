import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { resetCart } from '../../redux/actions/cartActions';

const OrderConfirmationScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const order = location.state && location.state.order; // Corrected to 'order'

  const resetCartHandler = () => {
    dispatch(resetCart());
  };

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Order Confirmation</h1>
        <p>There was an issue with your order. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order Confirmation</h1>
      <p>Your order has been successfully placed!</p>
      <p>Order ID: {order.order_id}</p>
      <p>Total Amount: ${order.totalAmount}</p>
      <p>Your order will be delivered in not less than 24 hours.</p>
      <Link to={"/"} onClick={resetCartHandler} className="py-3 w-px-6 bg-slate-600 rounded-lg p-2">
        Continue shopping
      </Link>
    </div>
  );
};

export default OrderConfirmationScreen;
