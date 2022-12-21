import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"
import UserContext from '../userContext';

const Login = () => {
  const { Logged, HandleLoggedIn } = useContext(UserContext);
  const navigate = useNavigate()

  const [name, setName] = useState('Reshma');
  const [email, setEmail] = useState('reshma.patel@1center.co');
  const [password, setPassword] = useState('Reshma@123');

  const handleLogin = () => {
    const userData = {
      name,
      email,
      password,
    };
    localStorage.setItem('token-info', JSON.stringify(userData));
    HandleLoggedIn(1)
    setName('');
    setEmail('');
    setPassword('');
    navigate("/home")
  }
  return (
    <>
      <div className="content-wrapper">
        {!Logged ?
          <div>
            <p>Click below button to login.</p>
            <button className="loginBtn" onClick={handleLogin}>Login</button>
          </div> :
          <p>404. Can not find the content which you requested</p>
        }
      </div>
    </>
  )
}

export default Login