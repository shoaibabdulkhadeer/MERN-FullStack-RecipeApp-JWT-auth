import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useGetUserID } from "../hooks/useGetUserID.js";
import {useCookies} from 'react-cookie'

const Home = () => {
    

  const [recipes,setRecipes] = useState([])
   const [savedRecipes, setSavedRecipes] = useState([]);
   
const [cookies, ] = useCookies(["access_token"])

  const userID = useGetUserID();
 
  useEffect(() => {

    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/recipes");
        setRecipes(response.data.recipes);
      } catch (err) {
        console.log(err);
      }
    };


    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };



 fetchRecipes()

 if(cookies.access_token) fetchSavedRecipes()

  },[userID,cookies.access_token])




const saveRecipe = async (recipeID) => {
   try{
    console.log(recipeID)
    const response = await axios.put("http://localhost:4000/recipes", { 
      recipeID,
      userID,
     },
      {headers:{authorization:cookies.access_token}}
      );
     console.log(response)
     setSavedRecipes(response.data.savedRecipes);
   }catch(err){
     console.log(err)
   } 
  }


  const isRecipeSaved = (id) => savedRecipes.includes(id);
   

  return (
    <div>
         {recipes.map((x) => {
          return (  
          <div>
               <h1>{x.name}</h1>
               <p>{x.ingredients}</p>
               <p>{x.instructions}</p>
               <p>{x.cookingTime}</p>
               <button   onClick={() => saveRecipe(x._id)}
               disabled={isRecipeSaved(x._id)} >
                 save
               </button>
               <img src={x.imageUrl} alt="" width={250}/>

          </div>
            )
         })}
 

    </div>
  )
}

export default Home