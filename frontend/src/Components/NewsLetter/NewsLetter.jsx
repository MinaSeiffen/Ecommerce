import React from 'react'
import './NewsLetter.css'

export const NewsLetter = () => {
  return (
    <div className='news-letter'>
        <h1>Get exclusive offer  and updates!</h1>
        <p>Subscribe to  our newsletter for the latest update about our products.</p>
        <div>
            <input type="email" placeholder='Your Email Address'/>
            <button>Subscribe</button>
        </div>
    </div>
  )
}
