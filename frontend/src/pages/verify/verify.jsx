import React, { useContext, useEffect } from 'react';
import "./verify.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success") === "true";
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", { success, orderId });

      if (response.data.success) {
        toast.success("Order placed successfully!");
        setTimeout(() => navigate("/myOrders"), 2000);
      } else {
        toast.error("Payment failed. Redirecting...");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setTimeout(() => navigate("/"), 2000);
    }
  };

  useEffect(() => {
  if (url) {
    verifyPayment();
  }
}, [url]);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
