import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../redux/actions/orderActions';
import { useNavigate } from 'react-router-dom';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success } = orderCreate;

  useEffect(() => {
    if (success) {
      alert("Order is successfully placed!"); // Show alert after success
      navigate('/order-confirmation', { state: { order } });
    }
  }, [success, navigate, order]);
 
  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cartItems,
      shippingAddress,
      paymentMethod,
      itemsPrice: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
      shippingPrice: 12, // Add your logic for shipping price
      taxPrice: 12, // Add your logic for tax price
      totalPrice: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) + 12 + 12, // Include shipping and tax
    }));
  };

  if (!shippingAddress || !paymentMethod || cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Place Order</h1>
        <p className="text-red-500">Please complete your shipping and payment details and add items to your cart.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Place Order</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Shipping</h2>
          <p>{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Payment Method</h2>
          <p>{paymentMethod}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Order Items</h2>
          <div>
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                <p>{item.name}</p>
                <p>{item.qty} x ${item.price} = ${item.qty * item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button onClick={placeOrderHandler} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
