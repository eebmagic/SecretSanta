import React, { useState, useRef } from 'react';
import './App.css'

import 'primereact/resources/themes/saga-blue/theme.css';  //theme
import 'primereact/resources/primereact.min.css';          //core css
import 'primeicons/primeicons.css';                        //icons

import Login from './Login.js';
import CreateAccount from './CreateAccount.js';
import Results from './Results.js'
import Background from './Background';

import { Toast } from 'primereact/toast';

const SHOW_ASSIGNMENT = false;

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userdata, setUserData] = useState({});

  const toast = useRef(null);

  return (
    <div>
      <Background>
      <Toast ref={toast} />
      {
        showLogin ? (
          <Login
            onSwitchToCreateAccount={() => {
              setShowLogin(false);
              setShowCreateAccount(true);
            }} 
            onLoginSuccess={(data) => {
              setShowLogin(false);
              setShowResult(true);

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
          <Results
            data={userdata}
            showResults={SHOW_ASSIGNMENT}
          />
        ) : null
      }
      </Background>
    </div>
  );
}

export default App;
