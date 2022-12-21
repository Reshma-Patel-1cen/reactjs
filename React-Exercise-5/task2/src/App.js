import { useState } from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import UserContext from "./userContext";
import Top from './Top'
import Side from './Side'
import Bottom from './Bottom'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [feature, setFeature] = useState({ feature1: "This is feature1", feature2: "This is feature2", feature3: "This is feature3" })
  const pathName = window.location.pathname.substr(1,)
  const [path, setPath] = useState(null)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeature(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const updateUrl = (val) => {
    setPath(val)
  }

  return (
    <Router>
      <div className='app'>
        <h3>Rapidops</h3>
        <UserContext.Provider value={{ handleChange: handleChange, feature: feature, pathName: pathName, updateUrl: updateUrl }}>
          <div className='row'>
            <div className='row'>
              <Top />
              <hr />
            </div>
            <div className='row'>
              <div className='col-md-3'>
                <Side />
              </div>
              <div className='col-md-9'>
                <Bottom />
              </div>
            </div>
          </div>
        </UserContext.Provider>
      </div>
    </Router>

  )
}

export default App;
