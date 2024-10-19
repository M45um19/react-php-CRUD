import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Editproduct(){
    const [product_name, set_name] = useState("")
    const [product_price, set_price] = useState("")
    const [product_image, set_iamge] = useState("")
    const {id} = useParams()

    useEffect(()=>{
        get_product()
    },[])
    const get_product = async ()=> {
      const getdata = await fetch("http://localhost/api/product.php/"+id)
      const single_product = await getdata.json()
      console.log(single_product)
      set_name(single_product.name)
      set_price(single_product.price)
      set_iamge(single_product.image)
      
  }

    const addProduct = async () => {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('product_name', product_name);
        formData.append('product_price', product_price);
        formData.append('product_image', product_image); // Assuming product_image is set from file input
    
        // Change PATCH to POST for handling file uploads
        const post_product = await axios.post("http://localhost/api/product.php", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        get_product()
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
    <input type="text" value={ product_name } className="form-control" onChange={ (e)=> set_name(e.target.value) }/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Product Price</label>
    <input type="text" value={ product_price } className="form-control" onChange={ (e)=> set_price(e.target.value) }/>
  </div>
  <div className="mb-3">
    <label for="file" className="form-label">Old Image</label>
    <br></br>
    <img src={"http://localhost/api/images/"+product_image} width={100} height={120}/>
  </div>
  <div className="mb-3">
    <label for="file" className="form-label">New Image</label>
    <input type="file" className="form-control" onChange={ (e)=> set_iamge(e.target.files[0]) }/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
        </React.Fragment>
    )
}

export default Editproduct