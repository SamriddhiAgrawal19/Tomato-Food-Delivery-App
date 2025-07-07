import { createContext, useState , useEffect} from "react";
import { food_list } from "../assets/frontend_assets/assets";
export const StoreContext = createContext(null);
const StoreContextProvider  = (props) =>{
   const url = "http://localhost:4000";
    const[token , setToken] = useState();
    const [cartItems, setCartItems] = useState({});
    function addtoCart(itemId){
        if(!cartItems[itemId]){
            setCartItems(prev => ({ ...prev, [itemId]: 1 }));
        }
        else{
            setCartItems(prev => ({...prev , [itemId] : prev[itemId] + 1 }));
        }
    }
    function removefromCart(itemId){
         setCartItems(prev => ({...prev , [itemId] : prev[itemId] - 1 }));

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
    useEffect(()=>{
        if(localStorage.getItem("token"));
        setToken("token");
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