import React, { useState } from 'react';
import './App.css'

import Login from './Login.js';
import CreateAccount from './CreateAccount.js';


function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userdata, setUserData] = useState({});

  return (
    <div>
      {
        showLogin ? (
          <Login
            onSwitchToCreateAccount={() => {
              setShowLogin(false);
              setShowCreateAccount(true);
            }} 
            onLoginSuccess={() => {
              setShowLogin(false);
              setShowResult(true);
            }}
            onGetUserData={(data) => {
              setUserData(data);
            }}
          />
        ) : null
      }
      {
        showCreateAccount ? (
          <CreateAccount onSwitchToLogin={() => {
            setShowLogin(true);
            setShowCreateAccount(false);
          }} />
        ) : null
      }
      {
        showResult ? (
          <div>
            <h1>Success!</h1>
            <div className="user-info">
              <p>Username: {userdata.username}</p>
              <p>First name: {userdata.firstname}</p>
              <p>Contact info: {userdata.contact}</p>
            </div>
            <div>
              <p><b>🎅🎄 Santa pairings aren't out yet, but when they are you'll be able to find them here :)</b></p>
            </div>

            <button onClick={() => {
              setShowResult(false);
              setShowLogin(true);
            }}>Back to Login</button>
          </div>
        ) : null
      }
    </div>
  );
}

export default App;