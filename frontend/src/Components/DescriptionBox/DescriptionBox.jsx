import React from 'react'
import './DescriptionBox.css'

export const DescriptionBox = () => {
  return (
    <div className='description-box'>
        <div className="description-box-navigator">
            <div className="description-box-nav-box">
                Description
            </div>
            <div className="description-box-nav-box fade">
                Reviews (254)
            </div>
        </div>
        <div className="description-box-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia fuga similique non, dolor quibusdam esse in quidem id, animi consequatur velit numquam. Aliquam atque eveniet sapiente tenetur ratione magnam similique?</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore officiis, inventore reprehenderit excepturi, sequi odio veritatis aliquam fuga temporibus provident corrupti nihil sed. Reprehenderit quaerat eius debitis doloremque qui laboriosam?</p>
        </div>
    </div>
  )
}
