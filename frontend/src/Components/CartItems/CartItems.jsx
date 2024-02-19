import React, { useContext } from "react";
import "./CartItem.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

export default function CartItems() {
  const { all_products, cartItems, removeFromCart , getTotalCartAmount} = useContext(ShopContext);
  
  return (
    <div className="cart-items">
      <div className="cart-items-main-format">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_products.map((element) => {
        const quantity = cartItems[element.id];
        const total = element.new_price * quantity;
        return (
          <div key={element.id}>
            {quantity > 0 && ( 
              <div className="cart-items-format cart-items-main-format">
                <img
                  src={element.image}
                  alt=""
                  className="cart-icon-product-icon"
                />
                <p>{element.name}</p>
                <p>${element.new_price}</p>
                <button className="cart-items-quantity">
                  {quantity}
                </button>
                <p>${total}</p>
                <img
                  src={remove_icon}
                  alt=""
                  className="cart-icon-remove-icon"
                  onClick={() => removeFromCart(element.id)}
                />
              </div>
            )}
          </div>
        );
      })}
      <hr />
      <div className="cart-items-down">
        <div className="cart-items-total">
            <h1>Cart Totals</h1>
            <div>
                <div className="cart-items-total-item">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-items-total-item">
                    <p>Shopping fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cart-items-total-item">
                    <h3>Total</h3>
                    <h3>${getTotalCartAmount()}</h3>
                </div>
            </div>
            <button>CheckOut</button>
        </div>
        <div className="cart-items-promocode">
            <p>If you have promo-code , please enter it here</p>
            <div className="cart-items-promobox">
                <input type="text" placeholder="Enter your code" />
                <button>Submit</button>
            </div>
        </div>
      </div>
    </div>
  );
}
