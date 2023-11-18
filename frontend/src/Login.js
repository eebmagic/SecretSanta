import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';

import styles from './Login.module.css';

const ENDPOINT = "https://fishbowl.lol:5050/login";

function Login({ onSwitchToCreateAccount, onLoginSuccess, onGetUserData }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle login logic here

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
      alert(`Login failed for ${username} :\n${response.status} ${response.statusText}\n${await response.text()}`);
    }
  };

  return (
    <Panel header="Login" className={styles.customLoginPanel}>
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
          <InputText
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.customField}>
          <Button label="Login" />
        </div>
      </form>

      <Button
        label="Create Account"
        onClick={(event) => onSwitchToCreateAccount() }
      />
    </Panel>
  )
}

export default Login;
