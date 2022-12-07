import { useContext } from "react";
import UserContext from "./userContext";
import ComponentD from "./ComponentD";

const ComponentC = () => {

  const { alertMethod } = useContext(UserContext);

  return (
    <>
      <ComponentD />
      <button onClick={alertMethod}>Click</button>
    </>
  )
}

export default ComponentC