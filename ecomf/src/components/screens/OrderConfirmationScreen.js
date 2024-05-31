import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const OrderConfirmationScreen = () => {
  const location = useLocation();
  const { order } = location.state || {}; // Add a fallback to avoid undefined error

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Order Confirmation</h1>
        <p>There was an issue with your order. Please try again.</p>
      </div>
    );
  }

  return (
    <div className=" flex flex-col justify-center items-center container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order Confirmation</h1>
      <p>Your order has been successfully placed!</p>
      <p>Order ID: {order.order_id}</p>
      {/* Add more details about the order and expected delivery time */}
      <p>Your order will be delivered in not less than 24 hours.</p>
      <Link to={"/"} className='py-3 w-px-6 bg-slate-600 rounded-lg p-2'>Continue shopping</Link>
    </div>
  );
};

export default OrderConfirmationScreen;
