import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import "./FoodDisplay.css"

const FoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreContext)
     console.log("food_list from context:", food_list)
  return (
    <div className='food-display' id = 'food-dsplay'>
        <h2>Top Dishes Near you</h2>
        <div className='food-display-list'>
            {food_list.map((item , index)=>{
                if(category === "All" || category === item.category)
                return (
                    <FoodItem
                        key={index}
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                    />
                );
            })}

        </div>

      
    </div>
  )
}

export default FoodDisplay
