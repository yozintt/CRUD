const router = require("express").Router();

const User = require("../models/User");

router.post("/", async (req, res) => {
  const { name, lastname, age } = req.body;
  if (!name) {
    res.status(422).json({ error: "missing name" });
    return;
  }
  if (!lastname) {
    res.status(422).json({ error: "missing lastname" });
    return;
  }
  if (!age) {
    res.status(422).json({ error: "missing age" });
    return;
  }
  const user = {
    name,
    lastname,
    age,
  };

  try {
    await User.create(user);

    res.status(201).json({ message: "User created with successfull" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
  router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
      const user = await User.findOne({ _id: id });

      if (!user) {
        res.status(422).json({ message: "User not found!" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, lastname, age } = req.body;

  const user = {
    name,
    lastname,
    age,
  };

  try {
    const updatedUser = await User.updateOne({ _id: id }, user);

    if (updatedUser.matchedCount === 0) {
      res.status(422).json({ message: "User not found!" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ _id: id });

  if (!user) {
    res.status(422).json({ message: "User not found!" });
    return;
  }

  try {
    await user.deleteOne({ _id: id });

    res.status(200).json({ message: "User removed with success!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
module.exports = router;
