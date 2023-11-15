import React, {useState} from "react";

const ENDPOINT = "http://localhost:5050/create";

function CreateAccount({ onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [vPassword, setVPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle account creation logic here

    // console.log(`Creating account for ${username}: ${password} - ${vPassword}\n\t${firstname}\n\t${contact}`)
    if (password !== vPassword) {
      alert("Passwords do not match");
      setPassword('');
      setVPassword('');
      return;
    }

    if (!username || !password || !firstname || !contact) {
      alert("Missing required fields");
      return;
    }

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, firstname, contact })
    });
    
    if (response.ok) {
      console.log(`User ${username} created!`);
      alert(`User ${username} created!\nYou should now be able to log in with your username/password`);
      onSwitchToLogin();
    } else {
      alert(`Account creation failed for ${username} : ${response.status} ${response.statusText}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Account</h2>
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
      <div>
        <label>Verify Password:</label>
        <input
          type="password"
          value={vPassword}
          onChange={(e) => setVPassword(e.target.value)}
        />
      </div>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div>
        <label>Contact method (phone number, insta, etc.):</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      <button type="submit">Create Account</button>
      <button type="button" onClick={onSwitchToLogin}>
        Back to Login
      </button>
    </form>
  );
}

export default CreateAccount;