import { createContext, useState , useEffect} from "react";
import axios from 'axios';
export const StoreContext = createContext(null);
const StoreContextProvider  = (props) =>{
   const url = "http://localhost:4000";
   const[food_list , setFoodList] = useState([]);
    const[token , setToken] = useState();
    const [cartItems, setCartItems] = useState({});
    async function addtoCart(itemId){
        if(!cartItems[itemId]){
            setCartItems(prev => ({ ...prev, [itemId]: 1 }));
        }
        else{
            setCartItems(prev => ({...prev , [itemId] : prev[itemId] + 1 }));
        }
        if(token){
          await axios.post(url + "/api/cart/add", { itemId }, {
             headers: { token }
           });

        }
    }
    async function removefromCart(itemId){
         setCartItems(prev => ({...prev , [itemId] : prev[itemId] - 1 }));
          if(token){
          await axios.post(url + "/api/cart/remove", { itemId }, {
             headers: { token }
           });

        }

    }
    const loadCartData = async(token)=>{
        const response = await axios.post(url + "/api/cart/get", {}, {
             headers: { token }
           });
        setCartItems(response.data.cartData);
    }

    function gettotalValue(){
        let totalamount = 0 ;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let iteminfo = food_list.find((product) => product._id === item);
                totalamount += iteminfo.price * cartItems[item];

            }
        }
        return totalamount;
    }
    const fetchFoodList = async()=>{
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    }
    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                 setToken(localStorage.getItem("token")); 
                 await  loadCartData(localStorage.getItem("token")); 
            }
        }
        loadData();
    },[]);


    const contextValue ={
        cartItems,
        setCartItems,
        addtoCart,
        removefromCart,
        gettotalValue,
        url,
        token,
        setToken,
        food_list,

    }
    return(
        <StoreContext.Provider value ={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}
export default StoreContextProvider;