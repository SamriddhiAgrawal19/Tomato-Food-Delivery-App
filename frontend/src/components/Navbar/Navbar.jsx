import React, { useContext } from 'react'
import { useState } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({setShowLogin}) => {
    const[menu , setMenu] = useState("home");
    const{gettotalValue} = useContext(StoreContext);
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
             <button onClick={()=>setShowLogin(true)}>Signin</button>
            </div>
        

      
    </div>
  )
}

export default Navbar 