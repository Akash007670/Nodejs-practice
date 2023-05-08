const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleNewUser = async (req, res) => {
  const { user, password } = req.body;

  if (!user && !password) {
    res.status(400).json({ message: "Username and password are required!" }); //status 400 is bad request.
  }

  //check for duplicate usernames in the db.

  const duplicate = userDB.users.find((person) => person.username === user);
  if (duplicate) {
    return res.sendStatus(409); //status code 409 indicates conflict abd can't processed further.
  }

  try {
    const hashedPwd = await bcrypt.hash(password, 10); //Here is the saltRounds.
    const newUser = { username: user, password: hashedPwd };
    userDB.setUsers([...userDB.users, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "user.json"),
      JSON.stringify(userDB.users)
    );
    console.log(userDB.users);
    res.status(200).json({ message: "New user created" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
