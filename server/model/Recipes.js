import mongoose from "mongoose";

const recipeschema = new mongoose.Schema({
 
    name:{
        type:String,
        required:true,
    },
    ingredients:{
        type:String,
        required:true,
    },
    instructions:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    cookingTime:{
        type:String,
        required:true,
    },
    userOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    }

})

const RecipeModel = mongoose.model("recipes", recipeschema)

export default RecipeModel