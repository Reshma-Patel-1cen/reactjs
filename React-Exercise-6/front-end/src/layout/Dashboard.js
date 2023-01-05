import React, { useState } from 'react';
import Content from './Content';
import SideBar from "./SideBar";
import Header from "./Header";

const Dashboard = () => {
  const [showNav, setShowNav] = useState(true)

  return (
    <div className={`body-area${showNav ? ' body-pd' : ''}`}>
      <Header showNav={showNav} setShowNav={setShowNav} />
      <SideBar showNav={showNav} />
      <Content />
    </div>
  )
}

export default Dashboard;