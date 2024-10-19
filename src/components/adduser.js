import axios from "axios";
import React, { useState } from "react";

function Adduser () {
  
  const [formValue, setformValue] = useState({name: "", email: "", contact: "", address: ""});
  
  const handleChange = (e) => {
    setformValue({...formValue, [e.target.name]:e.target.value});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formdata = {name: formValue.name, email: formValue.email, contact: formValue.contact, address: formValue.address};
    const sendreq = await axios.post("http://localhost/api/user.php", formdata);
    setformValue({name: "", email: "", contact: "", address: ""})
  }
    return (
        <React.Fragment>
            <div className="w-50 ms-5">
              <br></br>
              <h2>Add User</h2>
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

export default Adduser;