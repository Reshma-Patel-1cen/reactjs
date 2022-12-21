import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import UserContext from "./userContext";

const Top = () => {
  const navigate = useNavigate()
  const { handleChange, feature, updateUrl } = useContext(UserContext)
  const handleFocus = (e) => {
    updateUrl(window.location.pathname)
    navigate("/" + e.target.name)
  }

  return (
    <div className="topbar">
      <div className="row">
        <div className="col-md-4">
          <div className="feature">
            <p>Feature 1</p>
            <textarea className="form-control" onChange={handleChange} onFocus={handleFocus} name="feature1" value={feature.feature1} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature">
            <p>Feature 2</p>
            <textarea className="form-control" onChange={handleChange} onFocus={handleFocus} name="feature2" value={feature.feature2} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature">
            <p>Feature 3</p>
            <textarea className="form-control" onChange={handleChange} onFocus={handleFocus} name="feature3" value={feature.feature3} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Top;
