import { flatten } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getUser } from '../utils/common'

const SideBar = ({ showNav }) => {
  const getUserData = getUser()
  const [sidemenuItems, setSidemenuItems] = useState()

  const getRoleData = useCallback(async (id) => {
    return await fetch('http://localhost:8000/api/v1.1/role/' + id)
      .then((response) => response.json())
  }, [])

  const getModuleData = useCallback(async (id) => {
    return await fetch('http://localhost:8000/api/v1.1/module/' + id)
      .then((response) => response.json())
  }, [])

  useEffect(() => {

    if (getUserData.user_role) {
      Promise.all(getUserData.user_role.map(async (item, index) => {
        return await getRoleData(item.value)
      })).then(res => {
        const moduleIdArray = [];
        flatten(res.map(x => x.data)).map(x => {
          const moduleIds = x.module_data.split(',');
          return moduleIds.map(x => moduleIdArray.push(x))
        })
        Promise.all(moduleIdArray.map(async (item) => {
          return await getModuleData(item)
        })).then(res => {
          const moduleArray = [];
          flatten(res.map(x => x.data)).map(x => {
            return moduleArray.push({ "module_id": x.module_id, "module_name": x.module_name })
          })
          setSidemenuItems(moduleArray)
        })
      })
    }
  }, [])

  return <div className={`l-navbar${showNav ? ' show' : ''}`} id="nav-bar">
    <nav className="nav">
      <div> <a href="rapidops.com" className="nav_logo"> <i className='bi bi-alexa nav_logo-icon'></i> <span className="nav_logo-name">Rapidops</span> </a>
        <div className="nav_list">
          {(getUserData && getUserData.role === 1) ?
            <>
              <NavLink className={({ isActive }) => `nav_link${isActive ? ' active' : ''}`} to="users"> <i className='bi bi-people nav_icon'></i><span className="nav_name">Users</span></NavLink>
              <NavLink className={({ isActive }) => `nav_link${isActive ? ' active' : ''}`} to="roles" > <i className='bi bi-person-check nav_icon'></i><span className="nav_name">Roles</span></NavLink>
            </>
            :
            <> {sidemenuItems && sidemenuItems.map((item, index) => {
              return <NavLink key={index} className={({ isActive }) => `nav_link${isActive ? ' active' : ''}`} to={`userModule/${item.module_id}`}> <i className='bi bi-people nav_icon'></i><span className="nav_name">{item.module_name}</span></NavLink>
            })} </>
          }
        </div>
      </div>
      <div><span className='userData'>{getUserData && getUserData.name}</span> <NavLink className={({ isActive }) => `nav_link${isActive ? ' active' : ''}`} to="/logout"> <i className='bi bi-box-arrow-left nav_icon'></i> <span className="nav_name"> Logout</span></NavLink>
      </div>
    </nav>
  </div>
}

export default SideBar;