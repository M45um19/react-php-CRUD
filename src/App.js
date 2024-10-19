import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/header';
import Userlist from './components/userlist';
import Footer from './components/footer';
import Adduser from './components/adduser';
import Edituser from './components/edituser';
import Productlist from './components/productlist';
import Addproduct from './components/addproduct';
import Editproduct from './components/editproduct';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element= { <Userlist/> } />
        <Route path="/adduser" element= { <Adduser/> }/>
        <Route path="edituser/:id" element= { <Edituser/> } />
        <Route path="/productlist" element= { <Productlist/> } />
        <Route path="/addproduct" element= { <Addproduct/> } />
        <Route path='/editproduct/:id' element= { <Editproduct/> }/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
