import RecipeModel from "../model/Recipes.js";
import express from "express";
import { UserModel } from "../model/Users.js";
import { verifyToken } from "./user.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const recipes =  await RecipeModel.find({})
         res.json({
            status:"success",
            recipes,
         })
    }catch(err){
       res.json(err)
    }
})

router.post('/',verifyToken,  async(req,res) => { 
    try{
       const recipe = req.body
       const newRecipe = new RecipeModel(recipe)
       await newRecipe.save()
       res.json("Recipe created successfully")         
    } 
       catch(err){
        res.json(err)
    }
})

router.put('/',verifyToken, async (req,res) => {
    try{
          const recipe = await RecipeModel.findById(req.body.recipeID);
          const user = await UserModel.findById(req.body.userID);
          user.savedRecipes.push(recipe)
          await user.save()
         res.json({savedRecipes:user.savedRecipes})
    }catch(err){
        res.json(err)
    }
})
 
router.get("/savedRecipes/ids/:userID", async (req, res) => {
  try{
     const user = await UserModel.findById(req.params.userID);
     res.json({savedRecipes:user?.savedRecipes})
  }catch(err){
    res.json(err)
  }
})

router.get("/savedRecipes/:userID" , async (req,res) => {
    try {
       const user = await UserModel.findById(req.params.userID);
       const savedRecipes = await RecipeModel.find({
        _id:{$in:user?.savedRecipes}
       })
       res.json({savedRecipes});
    }
    catch(err){
        res.json(err)
    }
})

export {router as RecipeRouter}