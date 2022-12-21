import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react";
import UserContext from '../userContext';

const Logout = () => {
  const navigate = useNavigate()
  const { Logged, HandleLoggedIn } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('token-info');
    HandleLoggedIn(0)
    navigate("/home")
  }
  useEffect(() => {
    if (!Logged) {
      navigate("/login")
    }
  })
  return (
    <div className="content-wrapper">
      <p>Click below button to logout.</p>
      <button className="loginBtn" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout