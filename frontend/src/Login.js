import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';

import styles from './Login.module.css';

const ENDPOINT = "https://fishbowl.lol:5050/login";

function Login({ onSwitchToCreateAccount, onLoginSuccess, onGetUserData }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toast = useRef(null);

  const showInvalidCreds = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Login Failed',
      detail: 'Invalid username or password',
      life: 3000
    });
  }

  const showFailedCall = () => {
    toast.current.show({
      severity: 'error',
      summary: 'API Call Failed',
      detail: 'Something went wrong when calling the server',
      life: 3000
    });
  }

  const showFailedCode = (code) => {
    toast.current.show({
      severity: 'error',
      summary: 'Failed with Code',
      detail: `Failed with code: ${code}`,
      life: 3000
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle login logic here

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`User ${username} logged in!`);
        console.log(data);
        onGetUserData(data);
        onLoginSuccess();
      } else {
        if (response.status === 401) {
          showInvalidCreds();
        } else {
          showFailedCode(response.status);
        }
      }
    } catch {
      showFailedCall();
    }
  };

  return (
    <Panel header="Login" className={styles.customLoginPanel}>
      <Toast ref={toast} position="center" />
      <form onSubmit={handleSubmit}>
        <div className={styles.customField}>
          <label htmlFor="username">Username</label>
          <InputText
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.customField}>
          <label htmlFor="password">Password</label>
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            feedback={false}
            toggleMask={true}
          />
        </div>
        <div className={styles.customField}>
          <Button
            label="Login"
            severity="success"
          />
        </div>
      </form>

      <Button
        label="Create Account"
        onClick={(event) => onSwitchToCreateAccount() }
        severity="danger"
        outlined
      />
    </Panel>
  )
}

export default Login;
