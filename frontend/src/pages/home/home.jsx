import React, { useState } from 'react'
import "./home.css"
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownloads from '../../components/AppDownloads/AppDownloads'
const Home = () => {
  const[category , setCategory] = useState("All")
  return (
    <div>
      <Header />
      <ExploreMenu category = {category} setCategory = {setCategory} />
      <FoodDisplay category = {category} />
      <AppDownloads />
    </div>
  )
}

export default Home
