import React from 'react';
import Header from './components/header/Header'
import Navbar from './components/nav/Navbar'
import Profile from './components/profile/Profile'
import './App.css';

const App = () => {
  return ( <
    div className = "app_wrapper" >
    <
    Header / >
    <
    Navbar / >
    <
    Profile / >
    <
    /div>
  );
}

export default App;