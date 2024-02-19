import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
// import product_data from '../Assets/data'
import { Item } from '../Item/Item'

export const RelatedProducts = () => {
  const [product_data,setproduct_data] = useState([]);
  const fetchCollections = async () => {
    try {
      const response = await fetch('http://localhost:3000/products/collection');
      
      const data = await response.json();
      
      setproduct_data(data.newCollections);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchCollections();
  }, []);
  return (
    <div className='related-products'>
        <h1>Related Products</h1>
        <hr />
        <div className="related-products-item">
            {product_data.slice(0,4).map((item , i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}
