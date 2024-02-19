import React, { useEffect, useState } from 'react'
import './Popular.css'
import { Item } from '../Item/Item'

export const Popular = () => {
  const [product_data , setProduct_data] =  useState([])
  const fetchPopular = async () => {
    try {
      const response = await fetch('http://localhost:3000/products/popular');
      
      const data = await response.json();
      
      setProduct_data(data.womenProduct);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchPopular();
  }, []);

  return (
    <div className='popular'>
        <h1>Popular in women</h1>
        <hr />
        <div className="popular-item">
            {product_data.map((item,i) =>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}
