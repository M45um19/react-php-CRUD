import React, { useState } from "react";
import axios from "axios";

function Addproduct(){

    const [product_name, set_name] = useState("")
    const [product_price, set_price] = useState("")
    const [product_image, set_iamge] = useState("")

    const addProduct = async ()=> {
      const add_product = new FormData()
      add_product.append('product_name',product_name)
      add_product.append('product_price',product_price)
      add_product.append('product_image',product_image)

      const post_product = await axios.post("http://localhost/api/product.php", add_product, { headers:{'Content_Type':'multipart/form-data'} })
    }

    const handlesubmit = async (e)=> {
      e.preventDefault();
      await addProduct();
    }

    return(
        <React.Fragment>
            <div className="ms-5 w-50">
            <h2>Add Product</h2>
            <hr></hr>
            <form onSubmit={ handlesubmit }>
  <div>
    <label for="exampleInputEmail1" className="form-label">Product Name</label>
    <input type="text" className="form-control" onChange={ (e)=> set_name(e.target.value) }/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Product Price</label>
    <input type="text" className="form-control" onChange={ (e)=> set_price(e.target.value) }/>
  </div>
  <div className="mb-3">
    <label for="file" className="form-label">Product Image</label>
    <input type="file" className="form-control" onChange={ (e)=> set_iamge(e.target.files[0]) }/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
        </React.Fragment>
    )
}

export default Addproduct