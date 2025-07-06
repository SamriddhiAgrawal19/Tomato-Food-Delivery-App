import React, { useState, useEffect, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Sign-up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img src={assets.cross_icon} alt="close" onClick={() => setShowLogin(false)} />
        </div>

        <div className="login-popup-inputs">
          {currState !== 'Login' && (
            <input
              onChange={onChangeHandler}
              name="name"
              value={data.name}
              type="text"
              placeholder='Enter your name'
              required
            />
          )}
          <input
            onChange={onChangeHandler}
            name="email"
            value={data.email}
            type="email"
            placeholder='Enter email'
            required
          />
          <input
            onChange={onChangeHandler}
            name="password"
            value={data.password}
            type="password"
            placeholder='Enter password'
            required
          />
        </div>

        <button type="submit">
          {currState === "Sign-up" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing I agree to the terms of use & privacy policy</p>
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
