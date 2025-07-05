import React from 'react'
import "./place-order.css"
import { StoreContext } from '../../Context/StoreContext'
import { useContext } from 'react'

const PlaceOrder = () => {
  const{gettotalValue} = useContext(StoreContext);
  return (
   <form className="place-order">
    <div className="place-order-left">
      <p className="title">Delivery Information</p>
      <div className="multi-fields">
        <input type="text" placeholder="First name" />
         <input type="text" placeholder="Last name" />
      </div>
       <input type="email" placeholder="Email address" />
        <input type="text" placeholder="Street" />
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
          
        </div>
         <div className="multi-fields">
          <input type="text" placeholder="Zip-Code" />
          <input type="text" placeholder="Country" />
          
        </div>
        <input type="text" placeholder="Phone" />



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
              <p>${gettotalValue() === 0 ?0 :gettotalValue() + 2 }</p>
            </div>
          </div>
         <button>PROCEED TO PAY</button>
        </div>

    </div>
   </form>
      
  )
}

export default PlaceOrder;
