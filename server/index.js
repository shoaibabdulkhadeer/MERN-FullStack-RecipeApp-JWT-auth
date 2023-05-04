import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { UserRouter } from './routes/user.js'
import { RecipeRouter } from './routes/Recipes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', UserRouter)

app.use('/recipes', RecipeRouter)


mongoose.connect("mongodb://127.0.0.1:27017/recipeApp",{ useNewUrlParser: true,useUnifiedTopology: true})
.then(() => console.log("db connection established"))
.catch((e) => console.log(e))



app.get("/", async (req,res)=> {
   res.send("hello")
})

app.listen(4000,(req,res)=> {
    console.log("server listening on 4000")
})