import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { UserRouter } from './routes/user.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', UserRouter)

mongoose.connect("" , {
    dbName:"recipeApp"
}).then(() => console.log("Connect to db"))
.catch((e) => console.log(e) )

app.get("/", async (req,res)=> {
   res.send("hello")
})

app.listen(4000,(req,res)=> {
    console.log("server listening on 4000")
})