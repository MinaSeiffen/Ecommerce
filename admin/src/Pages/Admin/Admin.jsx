import { Route, Routes } from 'react-router-dom'
import SideBar from '../../Components/SideBar/SideBar'
import './Admin.css'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'

function Admin() {
  return (
    <div className='admin'>
        <SideBar/>
        <Routes>
            <Route path='/products/add' element={<AddProduct/>}/>
            <Route path='/products/all' element={<ListProduct/>}/>
        </Routes>
    </div>
  )
}

export default Admin