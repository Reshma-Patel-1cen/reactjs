import { Routes, Route } from 'react-router-dom'
import Users from "../pages/Users"
import Roles from '../pages/Roles'
import AddEditUser from '../pages/AddEditUser'
import AddEditRole from '../pages/AddEditRole'
import PrivateRoutes from '../utils/PrivateRoutes'
import PublicRoutes from '../utils/PublicRoutes'
import Login from '../pages/Login'
import Logout from '../pages/Logout'

const Content = () => {
  return (
    <div className="bg-light pt-4 pb-4">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Users />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/roles" element={<Roles />}></Route>
          <Route path="/users/addEditUser" element={<AddEditUser />}></Route>
          <Route path="/users/:id" element={<AddEditUser />}></Route>
          <Route path="/roles/addEditRole" element={<AddEditRole />}></Route>
          <Route path="/roles/addEditRole/:id" element={<AddEditRole />}></Route>
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  )
}

export default Content