import express from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../model/Users.js';

const router = express.Router();

router.post('/register',async (req,res) => {
   const {username , password} = req.body;
 
    const user = await UserModel.findOne({username: username})

    if(user){
        return res.json({message:"User already Exists"})
    }
    const hashedpassword = await bcrypt.hash(password,10)
    const newuser = new UserModel({username : username, password:hashedpassword})
    await newuser.save()

    res.json({message:"User successfully registered"});
})


router.post('/login',async (req,res) => {
  const {username,password} = req.body;
  const user = await UserModel.findOne({username: username});

  if(!user) {
    res.json({message:"User not found"})
  }
   
   const ispasswordvalid = await bcrypt.compare(password,user?.password)
   if(!ispasswordvalid){
    res.json({message:"Password or username incorrect "})
  }

  const token = jwt.sign({id : user._id } , "secret");
  res.json({token , userID : user._id });
  
})

export {router as UserRouter} 