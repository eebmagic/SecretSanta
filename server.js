const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const users = {
  "admin": "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92CENW19eW8FhK2Z4a3eC" // bcrypt hash for "password"
};

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt for ${username}: ${password}`);
  console.log(`Comparison: ${bcrypt.hashSync(password, 10)} ${users[username]}`)
  if (users[username] && await bcrypt.compare(password, users[username])) {
    res.status(200).send("Login successful");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
