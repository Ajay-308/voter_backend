const express = require("express");
const router = express.Router();

const { jwtAuthTokenMiddleWare, generateToken } = require("../jwt");
const user = require("../model/user");

router.post("/signUp", async (req, res) => {
  try {
    const { name, age, mobile, username, adhercard, password } = req.body;
    const newUser = new user({
      name,
      age,
      mobile,
      username,
      adhercard,
      password,
    });
    await newUser.save();
    res.status(200).json({ msg: "user registered successfully" });

    //id bejh rahe hai payload mai
    const payload = {
      id: newUser._id,
    };

    const token = generateToken(payload);
    res.status(200).json({ Response: Response, token: token });
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { adhercard, password } = req.body;
    const user = await user.findOne({ adhercard });
    if (!user) return res.status(400).json({ error: "user not found" });
    if (user.password !== password)
      return res.status(404).json({ error: "bhai password galat hai" });
    const payload = {
      id: user._id,
    };
    const token = generateToken(payload);
    res.status(200).json({ Response: "login successfull", token: token });
  } catch (err) {
    res.status(400).json({ error: "error during login" });
  }
});

// profile
router.get("/profile", jwtAuthTokenMiddleWare, async (req, res) => {
  try {
    const user = await user.findById(req.user.id);
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ error: "during proflie fetching error occured" });
  }
});

//user password update
router.put("/updatePassword", jwtAuthTokenMiddleWare, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await user.findById(req.user.id);
    if (user.password !== oldPassword)
      return res.status(400).json({ error: "old password is incorrect" });
    user.password = newPassword;
    await user.save();
    res.status(200).json({ msg: "password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
