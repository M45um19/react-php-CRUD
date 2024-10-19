import React from "react"
import { Link } from "react-router-dom";

function Header () {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand">React PHP CRUD</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Userlist</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/adduser">Add User</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/productlist">Product List</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/addproduct">Add Product</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </React.Fragment>
    )
}

export default Header;