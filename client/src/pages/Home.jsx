import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {

  const [recipes,setRecipes] = useState([])

  useEffect(() => {
    axios.get("http://localhost:4000/recipes").then((response) => {
      setRecipes(response.data.recipes)
      console.log(response.data.recipes)
    })
  },[])

  return (
    <div>
         {recipes.map((x) => {

          return (
          
          <div>
               <h1>{x.name}</h1>
               <p>{x.ingredients}</p>
               <p>{x.instructions}</p>
               <p>{x.cookingTime}</p>
               <img src={x.imageUrl} alt="" width={250}/>

          </div>
            )
         })}
 

    </div>
  )
}

export default Home