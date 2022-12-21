import { useContext } from "react"
import UserContext from "./userContext";

const Bottom = () => {
  const { handleChange, feature, pathName } = useContext(UserContext)

  return (
    <div className="bottombar">
      <div className="row">
        <textarea className="form-control textarea-bg" name={pathName} value={feature[pathName]} onChange={handleChange} />
      </div>
    </div>)
}

export default Bottom;
