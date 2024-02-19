import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);


const ShopContextProvider = (props) => {
  const getDefaultCart = () => {
    let cart = {};
    for (let product of all_products) {
      cart[product.id] = 0;
    }
    return cart;
  };
  const [all_products,setAll_products] = useState([])
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:3000/products/all');
      const data = await response.json();
      setAll_products(data.allProducts);

      if (localStorage.getItem('token')) {
        fetch('http://localhost:3000/products/getCart' , {
          method: 'POST',
          headers:{
            Accept:'application/json',
            'token':`${localStorage.getItem('token')}`,
            'Content-Type':'application/json'
          },
          body:JSON.stringify({})
        }).then(response => response.json())
        .then(data => setCartItems(data))
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchInfo();
  }, []);
  

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (localStorage.getItem('token')) {
      fetch('http://localhost:3000/products/addcart' , {
        method: 'POST',
        headers:{
          Accept:'application/json',
          'token':`${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        },
        body: JSON.stringify({ item_id : itemId })
      }).then(response => response.json())
      .then(data => console.log(data))
    }
  };
  
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) }));
    if (localStorage.getItem('token')) {
      fetch('http://localhost:3000/products/removecart' , {
        method: 'POST',
        headers:{
          Accept:'application/json',
          'token':`${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        },
        body: JSON.stringify({ item_id : itemId })
      }).then(response => response.json())
      .then(data => console.log(data))
    }
  };

  const getTotalCartAmount = ()=>{
    let totalAmount = 0
    for (let item in cartItems) {
      if (cartItems[item]) {
        const itemInfo = all_products.find((product)=>product.id === parseInt(item))
        totalAmount += itemInfo.new_price * cartItems[item]
      }
    }
    return totalAmount
  }

  const getTotalCartItems = ()=>{
    let totalItems = 0
    for(let item in cartItems) {
      if(cartItems[item]) {
        totalItems += cartItems[item]
      }
    }
    return totalItems 
  }
  
  const contextValue = { all_products , cartItems , getTotalCartItems , addToCart , getTotalCartAmount , removeFromCart };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
