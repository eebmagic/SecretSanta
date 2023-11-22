const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const path = require('path');
const Fernet = require('fernet');
const moment = require('moment-timezone');

const app = express();
app.use(cors());
app.use(express.json());

const options = {
  key: fs.readFileSync(path.join(__dirname, 'ssl/fishbowl.lol.key')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl/fishbowl_lol.crt')),
  ca: fs.readFileSync(path.join(__dirname, 'ssl/fishbowl_lol.ca-bundle')),
}

var users = JSON.parse(fs.readFileSync('users.json'));

const getAssignee = (username) => {
  var users = JSON.parse(fs.readFileSync('users.json'));
  const key = fs.readFileSync('results/key.key', { encoding: 'utf-8' });
  const encrypted = fs.readFileSync('results/map.json.enc', { encoding: 'utf-8' });

  const token = new Fernet.Token({
    secret: new Fernet.Secret(key),
    token: encrypted,
    ttl: 0
  });

  try {
    const decoded = token.decode();
    const map = JSON.parse(decoded);

    const assigneeUsername = map[username];
    const assignee = users[assigneeUsername];
    const body = {
      username: assigneeUsername,
      firstname: assignee.firstname,
      contact: assignee.contact,
      recs: assignee.recs
    }
    return body;
  } catch (error) {
    console.error('Decryption or asignee pull failed:', error);
    return null;
  }
}

// Updates the last time a user logged in
const updateLogin = (username) => {
  const logins = JSON.parse(fs.readFileSync('logins.json'));
  const estTime = moment().tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
  logins[username] = estTime;
  fs.writeFileSync('logins.json', JSON.stringify(logins, null, 2));
  console.log(`User ${username} logged in: ${estTime}`);
}

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt for ${username}`);
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

  if (users[username] && await bcrypt.compare(password, validHash)) {
    const assignee = getAssignee(username);

    const body = {
      username: username,
      firstname: users[username].firstname,
      contact: users[username].contact,
      recs: users[username].recs,
      assignee: assignee
    };
    res.status(200).send(body);

    updateLogin(username);
  } else {
    res.status(401).send("Invalid credentials");
  }
});

app.post('/create', async (req, res) => {
  users = JSON.parse(fs.readFileSync('users.json'));
  const { username, firstname, password, contact } = req.body;

  console.log(`Creating account for ${username}: ${firstname}`);

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
    console.log(`Successfully created user entry for ${username}`);
    res.status(201).send("Account created");
  }
});

app.post('/recs', async (req, res) => {
  users = JSON.parse(fs.readFileSync('users.json'));
  const { username, recs } = req.body;

  console.log(`Updating recs for ${username} : ${recs}`);
  if (users[username]) {
    users[username].recs = recs;
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.status(200).send("Recs updated!");
  } else {
    res.status(404).send("User not found");
  }
})

const PORT = process.env.PORT || 5050;
https.createServer(options, app).listen(PORT, () => {
// app.listen(PORT, () => {
  console.log(`HTTPS server running on port 5050`);
});
