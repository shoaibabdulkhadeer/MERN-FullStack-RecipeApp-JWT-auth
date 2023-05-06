import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useGetUserID } from "../hooks/useGetUserID.js";


const SavedRecipes = () => {
  
 const [savedRecipeslist,setSavedRecipeslist] = useState([])

 const userID = useGetUserID();


  useEffect(() => {
    axios.get(`http://localhost:4000/recipes/savedRecipes/${userID}`).then((response)=> {
      setSavedRecipeslist(response.data.savedRecipes);
      console.log(response.data.savedRecipes);
    })
    
  },[])
  
  return (
    <div>
         {savedRecipeslist.map((x) => {
          return ( 
              <div>
                      <h1>{x.name}</h1>
                      <p>{x.ingredients}</p>
                    <p>{x.instructions}</p>
                    <p>{x.cookingTime}</p>
                      <img src={x.imageUrl} alt="" width={190}/>
                 
              </div>
          )
         })}

    </div>
  )
}

export default SavedRecipes