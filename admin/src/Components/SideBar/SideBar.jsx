import { Link } from 'react-router-dom'
import './SideBar.css'
import add_product from '../../assets/Product_Cart.svg'
import list_product from '../../assets/Product_list_icon.svg'

const SideBar = () => {
  return (
    <div className="side-bar">
        <Link to={'/products/add'} style={{textDecoration:"none"}}>
            <div className="side-bar-item">
                <img src={add_product} alt="" />
                <p>Add Product</p>
            </div>
        </Link>
        <Link to={'/products/all'} style={{textDecoration:"none"}}>
            <div className="side-bar-item">
                <img src={list_product} alt="" />
                <p>List Product</p>
            </div>
        </Link>
    </div>
  )
}

export default SideBar