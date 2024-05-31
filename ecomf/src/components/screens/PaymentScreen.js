import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { paymentMethod } = cart;

  const [method, setMethod] = useState(paymentMethod || 'PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(method));
    navigate('/placeorder');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Payment Method</h1>
      <form onSubmit={submitHandler} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <input
            type="radio"
            id="paypal"
            label="PayPal or Credit Card"
            value="PayPal"
            checked={method === 'PayPal'}
            onChange={(e) => setMethod(e.target.value)}
            className="mr-2"
          />
          <label htmlFor="paypal" className="text-lg">PayPal or Credit Card</label>
        </div>
        <div className="mb-6">
          <input
            type="radio"
            id="stripe"
            label="Stripe"
            value="Stripe"
            checked={method === 'Stripe'}
            onChange={(e) => setMethod(e.target.value)}
            className="mr-2"
          />
          <label htmlFor="stripe" className="text-lg">Stripe</label>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          Continue
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen
