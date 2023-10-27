import React from 'react';
import './NavBar.css';

const Navbar = ({ round, period, sessionId }) => {
  return (
    <div className="topnav">
      <b className="left-content">Dynamic Pricing Strategy Game</b>
      <div className="center-content">
         Round: <span>{round}</span>, Period: <span>{period}</span>
      </div>
      <div className="right-content">Session ID: {sessionId}</div>
    </div>
  );
};

export default Navbar;