import RecipeModel from "../model/Recipes.js";
import express from "express";

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

router.post('/', async(req,res) => { 
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

router.put('/',async (req,res) => {
    try{
          const recipe = await RecipeModel.findById(req.body.recipeID);
          const user = await RecipeModel.findById(req.body.userID);
          user.savedRecipes.push(recipe)
          await user.save()
         res.json({savedRecipes:user.savedRecipes})
    }catch(err){
        res.json(err)
    }
})
 
router.get("/savedRecipes/ids", async (req, res) => {
  try{
     const user = await RecipeModel.findById(req.body.userID);
     res.json({savedRecipes:user?.savedRecipes})
  }catch(err){
    res.json(err)
  }
})

router.get("/savedRecipes" , async (req,res) => {
    try {
       const user = UserModel.findById(req.body.userID);
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