import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_image from '../Assets/star_icon.png'
import star_dull_image from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext'

export const ProductDisplay = (props) => {
    const {product} = props
    const {addToCart} = useContext(ShopContext)
  return (
    <div className='product-display'>
        <div className="product-display-left">
            <div className="product-display-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="product-display-img">
                <img className='product-display-main-img' src={product.image} alt="" />
            </div>
        </div>
        <div className="product-display-right">
            <h1>{product.name}</h1>
            <div className="product-display-right-star">
                <img src={star_image} alt="" />
                <img src={star_image} alt="" />
                <img src={star_image} alt="" />
                <img src={star_image} alt="" />
                <img src={star_dull_image} alt="" />
                <p>(254)</p>
            </div>
            <div className="product-display-right-prices">
                <div className="product-display-right-old-price">
                    ${product.old_price}
                </div>
                <div className="product-display-right-new-price">
                    ${product.new_price}
                </div>
            </div>
            <div className="product-display-right-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ea nesciunt quas fugiat eveniet deleniti, veniam ipsa in unde quaerat dolorem placeat, perferendis ex ratione aliquam aspernatur quibusdam eligendi porro?
            </div>
            <div className="product-display-right-size">
                <h1>select size</h1>
                <div className="product-display-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <button onClick={()=>{addToCart(product.id)}}>Add to Cart</button>
            <p className="product-display-right-category">
                <span>Category:</span>  {product.category} 
            </p>
            <p className="product-display-right-category">
                <span>Tags:</span> Modern , Latest 
            </p>

        </div>
    </div>
  )
}
