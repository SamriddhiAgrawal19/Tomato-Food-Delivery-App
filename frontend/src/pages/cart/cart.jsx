import React, { useContext } from 'react';
import "./cart.css";
import { StoreContext } from '../../Context/StoreContext';
import { Link } from 'react-router-dom';


const Cart = () => {
  const { cartItems, removefromCart, food_list, gettotalValue } = useContext(StoreContext);
  function navigate(){
    path = '/order'
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <hr />

        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p className='cross' onClick={() => removefromCart(item._id)}>x</p>
                </div>
                <hr />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>

      <div className="cart-bottom">
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
         <Link to = '/order'><button>PROCEED TO CHECKOUT</button></Link>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have any promo code enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo-code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
