import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import { Item } from '../Item/Item'

export const NewCollections = () => {

  const [new_collections,setNew_collections] = useState([]);
  const fetchCollections = async () => {
    try {
      const response = await fetch('http://localhost:3000/products/collection');
      
      const data = await response.json();
      
      setNew_collections(data.newCollections);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div className='new-collections'>
        <h1>New Collections</h1>
        <hr />
        <div className="collections">
            {new_collections.map((item , i) =>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}
