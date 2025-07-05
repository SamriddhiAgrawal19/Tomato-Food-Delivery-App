import { createContext, useEffect , useState} from "react";
import { food_list } from "../assets/frontend_assets/assets";
export const StoreContext = createContext(null);
const StoreContextProvider  = (props) =>{

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


    const contextValue ={
        food_list,
        cartItems,
        setCartItems,
        addtoCart,
        removefromCart,
        gettotalValue

    }
    return(
        <StoreContext.Provider value ={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}
export default StoreContextProvider;