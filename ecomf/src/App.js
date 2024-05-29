import './App.css';
import Navbar from './components/Navbar';
import Cartscreen from './components/screens/Cartscreen';
import Homescreen from './components/screens/Homescreen';
import Loginscreen from './components/screens/Loginscreen'
import ProductScreen from './components/screens/ProductScreen';
import Signupscreen from './components/screens/Signupscreen'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (

    <div className="App">
    <Router>
    {/* navbar */}
    <Navbar/>

    <Routes>
    <Route exact path='/' element={<Homescreen/>}></Route>
    <Route exact path='/login' element={<Loginscreen/>}></Route>
    <Route exact path='/product/:id' element={<ProductScreen/>}></Route>    
    <Route exact path='/signup' element={<Signupscreen/>}></Route>
    <Route exact path='/cart/:id?' element={<Cartscreen/>}></Route>
    </Routes>
    </Router>
    </div>
  );
}

export default App;
