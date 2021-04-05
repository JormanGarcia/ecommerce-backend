const router = require("express").Router();
const Items = require("../models/items");
const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get All Users
router.get("/", async (req, res) => {
  const results = await Users.findAll();
  res.send(results);
});

// Register User
router.post("/register", async (req, res) => {
  const { username } = req.body;

  const UsernameExist = await Users.findAll({ where: { username } });
  console.log(UsernameExist.length);

  if (UsernameExist.length === 1) {
    res.status(400).send("Username already exist");
  } else {
    const password = await bcrypt.hash(req.body.password, 10);

    await Users.create({ username, password });
    res.status(200).send("Added");
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const usernameResult = await Users.findOne({
    where: {
      username,
    },
  });

  if (!usernameResult) {
    res.status(400).json({
      error: true,
      msg: "Username doesn't exist",
    });
  } else {
    const passwordCompare = await bcrypt.compare(
      password,
      usernameResult.password
    );

    const token =
      passwordCompare === false
        ? null
        : await jwt.sign({ ...usernameResult }, process.env.SECRET);

    res.status(200).json({
      isPasswordEqual: passwordCompare,
      token,
    });
  }
});

module.exports = router;
