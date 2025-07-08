import React, { useContext, useState, useEffect } from 'react';
import "./MyOrders.css";
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/frontend_assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userOrders",
        {},
        {
          headers: { token },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="myorders">
      <h2>My Orders</h2>
      <div className="container">
        {data.length === 0 && <p>No orders yet.</p>}
        {data.map((order) => (
          <div key={order._id} className="myorders-order">
            <img src={assets.parcel_icon} alt="parcel" />
            <p>
              {order.items.map((item, idx) =>
                idx === order.items.length - 1
                  ? `${item.name} x${item.quantity}`
                  : `${item.name} x${item.quantity}, `
              )}
            </p>
            <p>₹{order.amount.toFixed(2)}</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span> <b>{order.status}</b>
            </p>
            <button onClick = {fetchOrders}> Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
