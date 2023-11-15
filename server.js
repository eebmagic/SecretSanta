const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

var users = JSON.parse(fs.readFileSync('users.json'));

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  users = JSON.parse(fs.readFileSync('users.json'));
  const validHash = users[username].password;

  console.log(`Login attempt for ${username}: ${password}`);
  console.log(`Comparison: ${await bcrypt.compare(password, validHash)}`);

  if (users[username] && await bcrypt.compare(password, validHash)) {
    res.status(200).send("Login successful");
    console.log(`User ${username} logged in`)
  } else {
    res.status(401).send("Invalid credentials");
  }
});

app.post('/create', async (req, res) => {
  users = JSON.parse(fs.readFileSync('users.json'));
  const { username, firstname, password, contact } = req.body;

  console.log(`Creating account for ${username}: ${password}`);

  if (users[username]) {
    res.status(409).send("Username already exists");
  } else {
    const hash = bcrypt.hashSync(password, 10);

    users[username] = {
      firstname: firstname,
      password: hash,
      contact: contact || ""
    };

    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    console.log(`Created user entry for ${username}`);
    res.status(201).send("Account created");
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
