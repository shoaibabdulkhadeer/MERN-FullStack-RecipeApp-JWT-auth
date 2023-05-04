import React, { useState } from 'react'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  
const [loginuser,setLoginuser] = useState("")
const [loginpassword,setLoginpassword] = useState("")

const [registeruser ,setRegisteruser] = useState("")
const [registerpassword,setRegisterpassword] = useState("")

const [, setCookies] = useCookies(["access_token"])
const navigate = useNavigate()

const login  = async (event) => {
    event.preventDefault()
  try{ 
       const response = await axios.post("http://localhost:4000/auth/login",{
         username:loginuser,
         password:loginpassword
       })

       setCookies("access_token",response.data.token)
       window.localStorage.setItem("userID",response.data.userID)
       setLoginuser("")
       setLoginpassword("")
       navigate("/")
  }catch(err){
    console.log(err)
  }
}

const register = async (event) => {
    event.preventDefault()
    try{
        axios.post('http://localhost:4000/auth/register',{
        username:registeruser,
        password:registerpassword,
       }) 
       alert("registered successful")
       setRegisteruser("")
       setRegisterpassword("")
    }catch(err){
      console.error(err)
    }  
}

 return (
    <div style={{display:"flex",width:"100%",justifyContent:"space-around"}}>
        
       <div>
        <h1>Login</h1>
       <form action="" onSubmit={login}>
         <input  onChange={(event) => setLoginuser(event.target.value) }  value={loginuser} type="text" placeholder='username' />
         <input onChange={(event => setLoginpassword(event.target.value))} value={loginpassword} type="text" placeholder='password' />
         <button>Login</button>
        </form> 
      </div> 


        <div>
             <h1>Register</h1>
             <form action="" onSubmit={register}>
              <input  onChange={(event) => setRegisteruser(event.target.value) }  value={registeruser} type="text" placeholder='username' />
              <input onChange={(event => setRegisterpassword(event.target.value))} value={registerpassword} type="text" placeholder='password' />
              <button>Register</button>
             </form>
        </div>
  

    </div>
  )
}

export default Auth