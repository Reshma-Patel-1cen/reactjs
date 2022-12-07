import ComponentB from "./ComponentB";
import UserContext from './userContext'

const ComponentA = () => {
  const getAlert = () => {
    alert("getAlert from Child");
  }
  return (
    <UserContext.Provider value={{
      alertMethod: getAlert
    }}>
      <ComponentB />
    </UserContext.Provider>
  )
}

export default ComponentA