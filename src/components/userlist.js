import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Userlist() {
    const [users, setUser] = useState([]);


    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const reqData = await fetch("http://localhost/api/user.php");
            const resultData = await reqData.json();

            console.log(resultData);
            setUser(resultData.users);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleDelete = async(id) => {
        const deleteData = await axios.delete("http://localhost/api/user.php/"+id)
        getUserData();
    }

    return (
        <React.Fragment>
            <table className="table container">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Address</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
    {users.length > 0 ? (
        users.map((userdata, index) => (
            <tr key={index}>
                <th scope="row">{userdata.name}</th>
                <td>{userdata.email}</td>
                <td>{userdata.contact}</td>
                <td>{userdata.address}</td>
                <td><Link to={"/edituser/"+userdata.id} className="btn btn-primary">Edit</Link> <button onClick={ ()=>handleDelete(userdata.id) } className="btn btn-danger">Delete</button></td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="5">No users found</td>
        </tr>
    )}
</tbody>
            </table>
        </React.Fragment>
    );
}

export default Userlist;