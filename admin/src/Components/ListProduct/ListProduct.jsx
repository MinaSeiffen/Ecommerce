import { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const [allProducts , setAllProducts] = useState([])
  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:3000/products/all');
      
      const data = await response.json();
      
      setAllProducts(data.allProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE"
      });
      console.log("Product deleted successfully.");
      fetchInfo()
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  

  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className="list-product-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="list-product-allproducts">
        <hr />
        {allProducts.map((product , i) =>{

          return <>
          <div key={i} className="list-product-format-main list-product-format">
              <img src={product.image} alt="" className="list-product-producticon" />
              <p>{product.name}</p>
              <p>{product.old_price} $</p>
              <p>{product.new_price} $</p>
              <p>{product.category}</p>
              <img onClick={()=>deleteProduct(product.id)} src={cross_icon} alt="" className='list-product-removeicon' />
            </div>
            <hr />
          </>
        })}
      </div>
    </div>
  ) 
}

export default ListProduct
