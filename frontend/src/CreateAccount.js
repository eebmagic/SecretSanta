import React, { useState, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';

import styles from './CreateAccount.module.css';

const ENDPOINT = "https://fishbowl.lol:5050/create";

function CreateAccount({ onSwitchToLogin, onAccountCreated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [vPassword, setVPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [contact, setContact] = useState('');

  const toast = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle account creation logic here

    if (password !== vPassword) {
      toast.current.show({
        severity: 'warn',
        summary: 'Passwords Don\'t Match',
        detail: 'Passwords do not match. Try again.',
        life: 3000
      });
      setPassword('');
      setVPassword('');
      return;
    }

    if (!username || !password || !firstname || !contact) {
      toast.current.show({
        severity: 'warn',
        summary: 'Missing Fields',
        detail: 'Missing some required fields.',
        life: 3000
      });
      return;
    }

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, firstname, contact })
      });

      if (response.ok) {
        console.log(`User ${username} created!`);
        onAccountCreated();
        onSwitchToLogin();
      } else {
        if (response.status === 409) {
          toast.current.show({
            severity: 'warn',
            summary: 'Username Already Exists',
            detail: 'That username is associated with an existing account.',
            life: 3000
          });
        } else {
          toast.current.show({
            severity: 'error',
            summary: 'API Call Failed',
            detail: `Failed with code: ${response.status}`,
            life: 3000
          });
        }
      }
    } catch {
      toast.current.show({
        severity: 'error',
        summary: 'API Call Failed',
        detail: 'Something went wrong when calling the server',
        life: 3000
      });
    }
  };

  return (
    <Panel header="Create Account" className={styles.customCreateAccountPanel}>
      <Toast ref={toast} position="top-right"/>
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
          <label htmlFor="vpassword">Verify Password</label>
          <Password
            id="vpassword"
            value={vPassword}
            onChange={(e) => setVPassword(e.target.value)}
            feedback={false}
            toggleMask={true}
          />
        </div>
        <div className={styles.spacer}/>
        <div className={styles.customField}>
          <label htmlFor="firstname">Name</label>
          <InputText
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className={styles.customField}>
          <label htmlFor="contact">Contact (phone #, insta, etc.)</label>
          <InputText
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className={styles.customField}>
          <Button
            label="Create Account"
            onClick={handleSubmit}
            severity="success"
          />
        </div>
      </form>
      <Button
        label="Back to Login"
        onClick={(event) => onSwitchToLogin()}
        severity="danger"
        outlined
      />
    </Panel>
  )
}

export default CreateAccount;
