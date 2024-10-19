import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Productlist(){
    const [product_list, set_product] = useState([])

    useEffect(()=>{
        get_product()
    },[])
    
    const get_product = async ()=> {
        const all_product = await fetch("http://localhost/api/product.php")
        const products = await all_product.json()
        set_product(products)
    }

    const handleDelete = async (id)=> {
      const delete_product = await axios.delete("http://localhost/api/product.php/"+id)
      get_product()
    }

    return (
        <React.Fragment>
            <div className="container">
            <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Image</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
        {
            product_list.map((product, index)=>(
<tr key={index}>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td><img src={"http://localhost/api/images/"+product.image} width={50} height={60}/></td>
      <td><Link to={"/editproduct/"+product.id} className="btn btn-primary">Edit</Link> <button onClick={ ()=>handleDelete(product.id) } className="btn btn-danger">Delete</button></td>
    </tr>
            ))
        }
    

  </tbody>
</table>
            </div>   
        </React.Fragment>
    )
}

export default Productlist