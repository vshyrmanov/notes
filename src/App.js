import React, {useEffect, useState, Suspense} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useAuth} from "./Hooks/Auth.hooks";
import {AuthContext} from "./Context/AuthContext";
import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Navbar";
import UseRoutes from './Components/Routes/Routes';
import {useHandleSideBar} from './Hooks/ToggleSideBar.hooks';


import './Styles/Colors.module.scss';
import classes from './Styles/App.module.scss';

function App() {
    const {login, logout, token, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const {showSidebar, toggleSidebar} = useHandleSideBar()

  return (
      <AuthContext.Provider value={{login, logout, token, userId, isAuthenticated}}>
        <Router>
            <div className={classes.app_main}>
                {isAuthenticated && <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />}
                {isAuthenticated && <Navbar toggleSidebar={toggleSidebar} />}
                <UseRoutes isAuthenticated={isAuthenticated} showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
            </div>
        </Router>
      </AuthContext.Provider>
  );
}

export default App;
