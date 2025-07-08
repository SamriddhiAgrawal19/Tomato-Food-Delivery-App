import React, { useContext } from 'react'
import { useState } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import { Profiler } from 'react'
import { useNavigate } from 'react-router-dom';


const Navbar = ({setShowLogin}) => {
    const navigate = useNavigate();

    const[menu , setMenu] = useState("home");
    const{gettotalValue, token , setToken} = useContext(StoreContext);
    function logOut(){
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }
  return (
    <div className='navbar'>
        <Link to = '/'><img src = {assets.logo} alt = "" className='logo' /></Link>
        <ul className='navbar-menu'>
            <li>
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
            </li>
            <li>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
            </li>
            <li>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile app</a>
            </li>
            <li>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact-Us</a>
            </li>
        </ul>
        <div className='navbar-right'>
            <img src = {assets.search_icon} alt = ""/>
            <div className='navbar-search-icon'>
                <Link to = '/cart'><img src = {assets.basket_icon} alt = ""/></Link>
                 <div className = {gettotalValue() == 0 ? "" : "dot"}></div>
            </div>
             {!token ? <button onClick={()=>setShowLogin(true)}>Signin</button>
             :<div className='navbar-profile'>
                <img src = {assets.profile_icon} alt = "" />
                <ul className="navbar-profile-dropdown">
                    <li onClick = {()=>navigate('/myOrders')}><img src = {assets.bag_icon} alt = "" /><p>Orders</p></li>
                    <hr />
                    <li onClick={logOut}><img src = {assets.logout_icon} alt = ""  /><p>LogOut</p></li>
                </ul>
             </div>
            }
        </div>
    </div>
  )
}

export default Navbar 