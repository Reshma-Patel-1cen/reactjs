import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeUserSession } from "../utils/common";

const Logout = () => {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();
  console.log(sessionStorage.getItem("token"))
  removeUserSession();

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate])
}

export default Logout