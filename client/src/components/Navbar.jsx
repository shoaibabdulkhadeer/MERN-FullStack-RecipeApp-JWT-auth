import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useCookies } from 'react-cookie'

const Navbar = () => {
  const [cookies,setCookies] = useCookies(["access_token"])
 
  const navigate = useNavigate()

   const logout = () => {
    setCookies("access_token","");
    window.localStorage.removeItem("userID")
    navigate('/auth')
   }
  return (
    <div>
          <ul>
            <Link to='/'>  <li>Home</li>  </Link>
            <Link to='/createrecipe'> <li>Add-Recipe</li>  </Link>
            <Link to='/savedrecipes'> <li>Saved</li> </Link>
       
           {!cookies.access_token? <p>   <Link to='/auth'>  <li>Register/Login</li> </Link>  </p> 
                : <p> <button onClick={logout}>Logout</button></p>} 
        
          </ul>
   </div>
  )
}

export default Navbar