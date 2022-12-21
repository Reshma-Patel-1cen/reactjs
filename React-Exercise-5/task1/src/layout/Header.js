import { NavLink } from 'react-router-dom'
import { useContext } from "react";
import UserContext from '../userContext';

const Header = () => {
  const { Logged } = useContext(UserContext)
  return (
    <div className="topnav">
      <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="home">Home</NavLink>
      <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="confidential">Confidential</NavLink>
      {!Logged ? <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="login">login</NavLink> :
        <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="logout">Logout</NavLink>
      }
      {Logged ? <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="help">Help</NavLink> : ""}
    </div>)
}

export default Header