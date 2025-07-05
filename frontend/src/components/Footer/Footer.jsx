import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer" id = "footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <img src = {assets.logo} alt = "" />
                <p>Your favorite meals, delivered fast and fresh. Made with ❤️ by Team Tomato</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>

            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <li>Home</li>
                <li>About</li>
                <li>Delivery</li>
                <li>Privacy policy</li>


            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-212-456-7890</li>
                    <li>contact@tomato.com</li>
                </ul>

            </div>

        </div>
        <hr />
      <p className='footer-copyright'>© {new Date().getFullYear()} Tomato. All rights reserved.</p>

    </div>
    
      
    
  )
}

export default Footer
