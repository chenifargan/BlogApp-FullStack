const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const PORT = 4000;
const secret = "dkjgnokdjngon";
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
); // Enable CORS
app.use(cookieParser());
mongoose.connect(
  "mongodb+srv://blog:blog123456@cluster0.ky8xxmj.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const hash = await bcrypt.hash(password, 10);
    const userDoc = await User.create({
      username,
      password: hash,
    });
    res.json(userDoc);
  } catch (e) {
    res.json({ error: "pls change user name" });
  }
});
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  try {
    const user = await User.findOne({ username });
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "Worng password" });
      }
      jwt.sign(
        {
          username,
          id: user._id,
        },
        secret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({
            id: user._id,
            username,
          });
          //res.json(token);
        }
      );
    });
  } catch (e) {
    res.json({ error: "User dont exist" });
  }
});
app.get("/profile", (req, res) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  } catch (err) {
    res.cookie("token", "").json("notok");
  }
});
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//mongo db user: blogpassword:blog123456
//mongodb+srv://blog:blog123456@cluster0.ky8xxmj.mongodb.net/?retryWrites=true&w=majority
