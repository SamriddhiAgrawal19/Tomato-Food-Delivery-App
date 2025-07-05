import React from 'react'
import "./ExploreMenu.css"
import { menu_list } from '../../assets/frontend_assets/assets'

const ExploreMenu = ({category , setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
          <h1>Explore Our Menu</h1>
          <p className='explore-menu-text'>Craving something delicious? Explore our mouthwatering menu and discover flavors that satisfy every craving!</p>
          <div className='explore-menu-list'>
              {menu_list.map((item, index) => (
                  <div className='explore-menu-list-item'
                      key={index}
                      onClick={() => setCategory(category === item.menu_name ? "All" : item.menu_name)}
                      
                  >
                      <img src={item.menu_image} className={category === item.menu_name ? "active" : ""} alt=""  />
                      <p>{item.menu_name}</p>
                  </div>
              ))}
          </div>
          <hr />
      </div>
  )
}

export default ExploreMenu
