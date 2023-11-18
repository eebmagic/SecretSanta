import React, { useState, useRef } from 'react';
import './App.css'

import 'primereact/resources/themes/saga-blue/theme.css';  //theme
import 'primereact/resources/primereact.min.css';          //core css

import Login from './Login.js';
import CreateAccount from './CreateAccount.js';

import { Toast } from 'primereact/toast';


function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userdata, setUserData] = useState({});

  const toast = useRef(null);

  return (
    <div>
      <Toast ref={toast} />
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
          <CreateAccount
            onSwitchToLogin={() => {
              setShowLogin(true);
              setShowCreateAccount(false);
            }}
            onAccountCreated={() => {
              toast.current.show({
                severity: 'success',
                summary: 'Account Created!',
                detail: 'You should now be able to log in with your username/password',
                life: 3000
              })
            }}
          />
        ) : null
      }
      {
        showResult ? (
          <div>
            <h1>Success!</h1>
            <div className="user-info">
              <p>Username: {userdata.username}</p>
              <p>Name: {userdata.firstname}</p>
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
