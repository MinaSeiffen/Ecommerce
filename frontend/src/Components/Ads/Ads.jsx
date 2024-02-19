import React from 'react'
import './Ads.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import ads_img from '../Assets/hero_image.png'

export const Ads = () => {
  return (
    <div className='ads'>
        <div className="ads-left">
            <h2>NEW ARRIVALS</h2>
            <div>
                <div className="ads-hand-icon">
                    <p>new</p>
                    <img src={hand_icon} alt="" />
                </div>
                <p>Collections</p>
                <p>For every one</p>
            </div>
            <div className="ads-latest-btn">
                <div>Latest Collections</div>
                <img src={arrow_icon} alt="" />
            </div>
        </div>
        <div className="ads-right">
            <img src={ads_img} alt="" />
        </div>
    </div>
  )
}
