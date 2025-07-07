import React, { useContext, useState, useEffect } from 'react';
import "./place-order.css";
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { gettotalValue, cartItems, url, food_list , token} = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const placeOrder = async (event) => {
    event.preventDefault();
    const orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
    address : data,
    items: orderItems,
    amount : gettotalValue() + 2
  }
  let response = await axios.post(url + "/api/order/place" , orderData , {headers : {token}});
  if(response.data.success){
    const{session_url} = response.data;
    window.location.replace(session_url);

  }
  else{
    alert("error");
  }
    
  };
  
  

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={data.firstName}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={data.lastName}
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={data.email}
          onChange={onChangeHandler}
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={data.street}
          onChange={onChangeHandler}
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={data.city}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={data.state}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="zipcode"
            placeholder="Zip-Code"
            value={data.zipcode}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={data.country}
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={data.phone}
          onChange={onChangeHandler}
          required
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-breakdown">
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${gettotalValue()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${gettotalValue() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${gettotalValue() === 0 ? 0 : gettotalValue() + 2}</p>
            </div>
          </div>
          <button type="submit">PROCEED TO PAY</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
