import React, { useState } from 'react';

const ENDPOINT = "https://fishbowl.lol:5050/login";

function Login({ onSwitchToCreateAccount, onLoginSuccess, onGetUserData }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle login logic here

    // console.log(`Login attempt for ${username}: ${password}`)

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
      // alert(`User ${username} logged in!`);
      console.log(data);
      onGetUserData(data);
      onLoginSuccess();
    } else {
      alert(`Login failed for ${username} :\n${response.status} ${response.statusText}\n${await response.text()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      <button type="button" onClick={onSwitchToCreateAccount}>
        Create Account
      </button>
    </form>
  );
}

export default Login;
