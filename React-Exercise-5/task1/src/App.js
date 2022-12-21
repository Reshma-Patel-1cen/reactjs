import { BrowserRouter as Router } from 'react-router-dom'
import { useState } from 'react';
import UserContext from './userContext';
import Content from "./layout/Content";
import Header from "./layout/Header";

const App = () => {
  const getToken = localStorage.getItem('token-info')
  const [LoggedIn, setLoggedIn] = useState(getToken ? 1 : 0);
  const HandleLoggedIn = (val) => {
    setLoggedIn(val)
  }

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ Logged: LoggedIn, HandleLoggedIn: HandleLoggedIn }}>
          <Header />
          <Content />
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
