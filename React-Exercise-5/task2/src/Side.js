import { NavLink } from 'react-router-dom'
import { useContext } from "react"
import UserContext from "./userContext";

const Side = () => {
  const { updateUrl } = useContext(UserContext)
  const handleClick = () => {
    updateUrl(window.location.pathname)
  }
  return (
    <div className='sidebar flex border-end'>
      <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="feature1"><button className='btn btn-secondary' onClick={handleClick}>Feature_1</button></NavLink>
      <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="feature2"><button className='btn btn-secondary' onClick={handleClick}>Feature_2</button></NavLink>
      <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="feature3"><button className='btn btn-secondary' onClick={handleClick}>Feature_3</button></NavLink>
    </div>)
}

export default Side;
