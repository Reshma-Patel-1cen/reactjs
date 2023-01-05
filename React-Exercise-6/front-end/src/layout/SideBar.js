import { NavLink } from 'react-router-dom'
import { getUser } from '../utils/common'

const SideBar = ({ showNav }) => {

  const getUserData = getUser()
  // console.log("userDaaaa", getUser())
  return <div className={`l-navbar${showNav ? ' show' : ''}`} id="nav-bar">
    <nav className="nav">
      <div> <a href="rapidops.com" className="nav_logo"> <i className='bi bi-alexa nav_logo-icon'></i> <span className="nav_logo-name">Rapidops</span> </a>
        <div className="nav_list">
          <NavLink className={({ isActive }) => `nav_link${isActive ? ' active' : ''}`} to="users"> <i className='bi bi-people nav_icon'></i><span className="nav_name">Users</span></NavLink>
          <NavLink className={({ isActive }) => `nav_link${isActive ? ' active' : ''}`} to="roles" > <i className='bi bi-person-check nav_icon'></i><span className="nav_name">Roles</span></NavLink>
        </div>
      </div><span className='userData'>{getUserData && getUserData.role === 1 ? "Admin" : "User"}</span> <NavLink className={({ isActive }) => `nav_link${isActive ? ' active' : ''}`} to="/logout"> <i className='bi bi-box-arrow-left nav_icon'></i> <span className="nav_name"> Logout</span></NavLink>
    </nav>
  </div>
}

export default SideBar;