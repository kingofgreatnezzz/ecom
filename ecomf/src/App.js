import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homescreen from './components/screens/Homescreen';
import Loginscreen from './components/screens/Loginscreen';
import ProductScreen from './components/screens/ProductScreen';
import Signupscreen from './components/screens/Signupscreen';
import Cartscreen from './components/screens/Cartscreen';
import ShippingScreen from './components/screens/ShippingScreen';
import PaymentScreen from './components/screens/PaymentScreen';
import PrivateRoute from './utils/PrivateRoute';
//import PlaceOrderScreen from './components/screens/PlaceorderScreen';
import OrderConfirmationScreen from './components/screens/OrderConfirmationScreen';
import Navbarr from './components/Navbarr';
import Notifications from './components/screens/Notifications';



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/login" element={<Loginscreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/signup" element={<Signupscreen />} />
          <Route path="/cart/:id?" element={<Cartscreen />} />
          <Route path='/navbarr' element={<Navbarr/>}/>

          <Route element={<PrivateRoute />}>
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/order-confirmation" element={<OrderConfirmationScreen />} />
            <Route path='/notifications' element={<Notifications/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
