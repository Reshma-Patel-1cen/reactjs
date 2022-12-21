import { useNavigate } from 'react-router-dom'
import { useContext } from "react";
import UserContext from '../userContext';

const Confidential = () => {
  const navigate = useNavigate();
  const { Logged } = useContext(UserContext);
  const navigateToLogin = () => {
    navigate('/login')
  }
  return (
    <>
      <div className="content-wrapper">
        {!Logged ? <div>
          <p>You don't have access to this content, please login to view</p>
          <button className="loginBtn" onClick={navigateToLogin}>Login</button>
        </div> : <p>This page shows the confidential information which cannot be shared with anyone.</p>
        }
      </div>
    </>
  )
}

export default Confidential