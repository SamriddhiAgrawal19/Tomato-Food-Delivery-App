import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState();
  const [cartItems, setCartItems] = useState({});

  async function addtoCart(itemId) {
    if (!cartItems[itemId]) {
      setCartItems(prev => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(`${url}/api/cart/add`, { itemId }, {
        headers: { token }
      });
    }
  }

  async function removefromCart(itemId) {
    if (cartItems[itemId]) {
      setCartItems(prev => {
        const updated = { ...prev, [itemId]: prev[itemId] - 1 };
        if (updated[itemId] <= 0) delete updated[itemId];
        return updated;
      });

      if (token) {
        await axios.post(`${url}/api/cart/remove`, { itemId }, {
          headers: { token }
        });
      }
    }
  }

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(`${url}/api/cart/get`, {}, {
        headers: { token }
      });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        console.warn("Could not load cart:", response.data.message);
      }
    } catch (err) {
      console.error("Cart load error:", err.message);
    }
  };

  function gettotalValue() {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((p) => p._id === item);
        if (itemInfo) total += itemInfo.price * cartItems[item];
      }
    }
    return total;
  }

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (err) {
      console.error("Fetch food list failed:", err.message);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      await fetchFoodList();

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    };
    loadInitialData();
  }, []);

  const contextValue = {
    cartItems,
    setCartItems,
    addtoCart,
    removefromCart,
    gettotalValue,
    url,
    token,
    setToken,
    food_list,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
