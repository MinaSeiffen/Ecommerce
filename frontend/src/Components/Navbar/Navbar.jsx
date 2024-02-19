import React , {useContext, useRef, useState} from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import drop_icon from '../Assets/nav_drop_down.jpg'

export const Navbar = () => {

    const [menu,setMenu] = useState("shop")
    const {getTotalCartItems} = useContext(ShopContext)
    const menuRef = useRef()
    const dropDownToggle= (e)=>{
        menuRef.current.classList.toggle('nav-menu-visable')
        e.target.classList.toggle('open')
    }

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>Shopping</p>
        </div>
        <img className='nav-drop-down' src={drop_icon} onClick={dropDownToggle} alt="" />
        <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration : 'none'}} to='/'>Shop</Link> {menu==="shop"? <hr></hr> : <></> } </li>
            <li onClick={()=>{setMenu("men")}}><Link style={{textDecoration : 'none'}} to='/men'>Men</Link>  {menu==="men"? <hr></hr> : <></> }</li>
            <li onClick={()=>{setMenu("women")}}><Link style={{textDecoration : 'none'}} to='/women'>Women</Link> {menu==="women"? <hr></hr> : <></> }</li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration : 'none'}} to='/kids'>Kids</Link> {menu==="kids"? <hr></hr> : <></> }</li>
        </ul>
        <div className="nav-login-cart">
            {localStorage.getItem('token')? <button onClick={()=>{localStorage.removeItem('token'); window.location.replace("/")}}>logout</button> : <Link to='/login'><button>login</button></Link> }
            
            <Link to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-counter">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}
