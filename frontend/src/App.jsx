import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import {Routes , Route} from 'react-router-dom';
import Cart  from './pages/cart/cart';
import PlaceOrder from './pages/place-order/place-order';
import Home from './pages/home/home';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';


const App = () => {
  const[showLogin , setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopup setShowLogin= {setShowLogin}/> :<></>}
    <div className='app'>
      <Navbar setShowLogin= {setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
      </Routes>
      
    </div>
    <Footer />
    </>
  );
};

export default App;
