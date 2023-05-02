import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
          <ul>
            <Link to='/'>  <li>Home</li>  </Link>
            <Link to='/createrecipe'> <li>Add-Recipe</li>  </Link>
            <Link to='/savedrecipes'> <li>Saved</li> </Link>
            <Link to='/auth'>  <li>Register/Login</li> </Link>          
          </ul>
   </div>
  )
}

export default Navbar