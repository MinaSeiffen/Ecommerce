import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown from '../Components/Assets/dropdown_icon.png'
import  {Item}  from '../Components/Item/Item'

export const ShopCategory = (props) => {
  const {all_products} = useContext(ShopContext)
  return (
    <div className='shop-category'>
        <img className='shopCategory-banner' src={props.banner} alt="" />
        <div className="shop-category-indexSort">
          <p>
            <span>Showing 1-12</span> out of 36 Proucts
          </p>
          <div className="shopcategory-sort">
            Sort by <img src={dropdown} alt="" />
          </div>
        </div>
        <div className="subcategory-products">
          {all_products.map((item , i)=>{
            if(props.category===item.category){
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            }
            else{
              return null
            }
          })}
        </div>
        <div className="shopcategory-loadmore">
          Explore More
        </div>
    </div>
  )
}
