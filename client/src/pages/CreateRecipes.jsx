import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from 'react-cookie';



const CreateRecipes = () => {
  const userID = useGetUserID();
const [name, setName] = useState("")
const [ingredients,setIngredients] = useState("")
const [instructions,setInstructions] = useState("")
const [imageUrl,setImageUrl] = useState("")
const [cookingTime,setCookingTime] = useState("")

const [cookies,] = useCookies(["access_token"])


const navigate = useNavigate()

const submit = async(event) => {
  event.preventDefault()
 await axios.post("http://localhost:4000/recipes" , {
   name,
   ingredients,
   instructions,
   imageUrl,
   cookingTime,
   userOwner:userID
 },
 {headers:{authorization:cookies.access_token}}
 ).then((response) => {
  alert("successfully submitted")
 })
 navigate('/')

}
 
  return (
    <div>
      <h2>Create Recipe</h2>
      <form  onSubmit={submit} style={{display:"flex",flexDirection:"column",width:"250px"}}>
        <label>Name</label>
        <input onChange={(e) => setName(e.target.value)}  value={name} type="text" id="name" />

          <label htmlFor="ingredients">Ingredients</label>
         <input onChange={(e) => setIngredients(e.target.value)} value={ingredients}  type="text" id="ingredients"  />
            
         <label htmlFor="instructions">Instructions</label>
         <textarea onChange={(e) => setInstructions(e.target.value)} value={instructions} name="instructions" id="instructions" ></textarea>
 
          <label htmlFor="imageUrl">Image URL</label>
           <input  onChange={(e) => setImageUrl(e.target.value)} value={imageUrl} type="text" id='imageUrl' name='imageUrl'/> 

         <label htmlFor="cookingTime">Cooking Time(minutes)</label> 
          <input onChange={(e) => setCookingTime(e.target.value)} value={cookingTime} type="text" id='cookingTime' name='cookingTime'/>

          <button>Add Recipe</button> 
      </form>
    </div>
  )
}

export default CreateRecipes