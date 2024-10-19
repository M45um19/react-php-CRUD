import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Edituser () {
  
  const [formValue, setformValue] = useState({name: '', email: '', contact: '', address: ''});
  const {id} = useParams()
  
  const handleChange = (e) => {
    setformValue({...formValue, [e.target.name]:e.target.value});
  }

  useEffect(()=>{
    const getSingleData = async() => {
        const reqSingleData = await fetch("http://localhost/api/user.php/"+id)
        const singleUser = await reqSingleData.json();
        setformValue(singleUser);
        console.log(singleUser)
    } 

    getSingleData();
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formdata = {id:id, name: formValue.name, email: formValue.email, contact: formValue.contact, address: formValue.address};
    const sendreq = await axios.put("http://localhost/api/user.php", formdata);
    setformValue({name: "", email: "", contact: "", address: ""})
  }
    return (
        <React.Fragment>
            <div className="w-50 ms-5">
              <br></br>
              <h2>Edit User</h2>
              <hr></hr>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label className="form-label">Name</label>
    <input name="name" onChange={handleChange} value={formValue.name} type="text" className="form-control"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Email</label>
    <input name="email" onChange={handleChange} value={formValue.email}  type="email" className="form-control"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Contact</label>
    <input name="contact" onChange={handleChange} value={formValue.contact}  type="number" className="form-control"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Address</label>
    <input name="address" onChange={handleChange} value={formValue.address}  type="text" className="form-control"/>
  </div>
  <hr></hr>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
        </React.Fragment>
    )

}

export default Edituser;