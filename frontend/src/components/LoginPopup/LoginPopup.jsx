import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/frontend_assets/assets';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign-up");

  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img src={assets.cross_icon} alt="close" onClick={() => setShowLogin(false)} />
        </div>

        <div className="login-popup-inputs">
          {currState === 'Login' ? null : (
            <input type="text" placeholder='Enter your name' required />
          )}
          <input type="email" placeholder='Enter email' required />
          <input type="password" placeholder='Enter password' required />
        </div>

        <button>{currState === "Sign-up" ? "Create Account" : "Login"}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            By continuing I agree to the terms of use & privacy policy
          </p>
        </div>

        <p>
          {currState === 'Login' ? (
            <>Create new account? <span onClick={() => setCurrState('Sign-up')}>Click here</span></>
          ) : (
            <>Already have an account? <span onClick={() => setCurrState('Login')}>Click here</span></>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
