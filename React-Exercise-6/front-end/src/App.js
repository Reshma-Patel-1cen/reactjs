import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Content from './layout/Content';
import SideBar from "./layout/SideBar";
import Header from "./layout/Header";

const App = () => {
  const [showNav, setShowNav] = useState(true)
  
  return (
    <Router>
      <div className={`body-area${showNav ? ' body-pd' : ''}`}>
        <Header showNav={showNav} setShowNav={setShowNav} />
        <SideBar showNav={showNav} />
        <Content />
      </div>
    </Router>
  )
}

export default App;