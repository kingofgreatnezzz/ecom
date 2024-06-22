import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaystackPop from "@paystack/inline-js";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../redux/actions/orderActions";
import { admin_email } from "../../utils/utils";



const PaymentScreen = () => {
  const publicKey = process.env.REACT_APP_KEY;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalAmount = location.state ? location.state.totalAmount : 0;

  const [amount, setAmount] = useState(totalAmount);

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;

  const payWithPaystack = (e) => {
    e.preventDefault();

    let handler = PaystackPop.setup({
      key: publicKey,
      email: admin_email,
      amount: amount * 100,
      ref: "" + Math.floor(Math.random() * 10000000 + 1),
      onClose: function () {
        alert("Window closed.");
      },
      callback: function (response) {
        let message = "Payment complete! Reference: " + response.reference;
        alert(message);
        const order = { order_id: response.reference, totalAmount: amount };

        dispatch(
          createOrder({
            orderItems: cartItems,
            shippingAddress,
            total_price: amount,
            tax_price: 0,
            shipping_price: 0,
            ref_no: response.reference,
            paid_at: new Date().toISOString(),
          })
        ).then((result) => {
          if (result.success) {
            navigate("/order-confirmation", { state: { order } });
          } else {
            alert("Order creation failed: " + result.error);
          }
        });
      },
    });

    handler.openIframe();
  };

  return (
    <div>
      <h2>Paystack Payment</h2>
      <form id="paymentForm" onSubmit={payWithPaystack}>
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
        <button
          type="submit"
          className="bg-blue-600 p-4 rounded-md text-gray-300"
        >
          Pay with Paystack
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;
