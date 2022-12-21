import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Confidential from '../pages/Confidential'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Help from '../pages/Help'

const Content = () => {
  return (
    <Routes>
      <Route path="home" element={<Home />}></Route>
      <Route path="confidential" element={<Confidential />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="logout" element={<Logout />}></Route>
      <Route path="help" element={<Help />}></Route>
    </Routes>
  )
}

export default Content