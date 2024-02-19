import React from 'react'
import './ProductDetails.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

export const ProductDetails = (props) => {
    const {product} = props 
  return (
    <div className='product-details'>
        Home <img src={arrow_icon} alt="" /> Shop <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  )
}
