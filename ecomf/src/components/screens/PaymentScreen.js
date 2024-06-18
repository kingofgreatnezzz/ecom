import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaystackPop from '@paystack/inline-js';
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../redux/actions/orderActions";

const PaymentScreen = () => {
  const publicKey = process.env.REACT_APP_KEY
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalAmount = location.state ? location.state.totalAmount : 0;
  const order = location.state && location.state.order; 


  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(totalAmount);

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;

  const payWithPaystack = (e) => {
    e.preventDefault();

    let handler = PaystackPop.setup({
      key: publicKey,
      email: email,
      amount: amount * 100,
      ref: '' + Math.floor((Math.random() * 100000) + 1),
      onClose: function() {
        alert('Window closed.');
      },
      callback: function(response) {
        let message = 'Payment complete! Reference: ' + response.reference;
        alert(message);
        const order = { order_id: response.reference, totalAmount: amount };
        
        dispatch(createOrder({
          orderItems: cartItems,
          shippingAddress,
          total_price: amount,
          tax_price: 0,
          shipping_price: 0,
          paid_at: new Date().toISOString()
        }))
        .then(result => {
          if (result.success) {
            navigate('/order-confirmation', { state: { order } });
          } else {
            alert('Order creation failed: ' + result.error);
          }
        });
      }
    });

    handler.openIframe();
  };

  return (
    <div>
      <h2>Paystack Payment</h2>
      <form id="paymentForm" onSubmit={payWithPaystack}>
        <div>
          <label htmlFor="email-address">Email Address</label>
          <input
            type="email"
            id="email-address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            readOnly
          />
        </div>
        <button type="submit" className="bg-blue-600 p-4 rounded-md text-gray-300">
          Pay with Paystack
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;
