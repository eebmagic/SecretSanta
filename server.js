const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const options = {
    key: fs.readFileSync(path.join(__dirname, 'ssl/fishbowl.lol.key')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl/fishbowl_lol.crt')),
    ca: fs.readFileSync(path.join(__dirname, 'ssl/fishbowl_lol.ca-bundle')),
}

var users = JSON.parse(fs.readFileSync('users.json'));

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt for ${username}: ${password}`);
  users = JSON.parse(fs.readFileSync('users.json'));

  if (!users[username]) {
    res.status(401).send("Invalid credentials: User does not exist");
    return;
  }
  if (!username || !password) {
    res.status(401).send("Invalid credentials: Missing username or password");
    return;
  }

  const validHash = users[username].password;

  // console.log(`Login attempt for ${username}: ${password}`);
  // console.log(`Comparison: ${await bcrypt.compare(password, validHash)}`);

  if (users[username] && await bcrypt.compare(password, validHash)) {
    const body = {
      username: username,
      firstname: users[username].firstname,
      contact: users[username].contact
    };
    res.status(200).send(body);

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
https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS server running on port 5050`);
});
