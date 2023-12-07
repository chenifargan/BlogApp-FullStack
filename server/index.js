const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./Models/User");
const Post = require("./Models/Post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const PORT = 4000;
const secret = "dkjgnokdjngon";
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
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

    jwt.sign(
      {
        username,
        id: userDoc._id,
      },
      secret,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      }
    );

    // res.json(userDoc);
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
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  console.log(req.body);
  if (!req.file || !req.file.originalname) {
    return res.json({
      error: "No file uploaded or uploaded file has no original name",
    });
  }
  const { originalname, path } = req.file;

  if (!originalname || !path) {
    return res.json({ error: "Need to upload an image" });
  }

  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;

  if (!title || !summary || !content) {
    return res.json({ error: "Need to provide title, summary, and content" });
  }
  try {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      if (!postDoc) {
        return res.json({ error: "Error creating post" });
      }
      return res.json({ postDoc });
    });
  } catch (err) {
    return res.json({ error: "Server error" });
  }
});

app.get("/allposts", async (req, res) => {
  const allPosts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(allPosts);
});
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postInfo = await Post.findById(id).populate("author", ["username"]);
  res.json(postInfo);
  //res.json("chen");
});
app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      res.json({ error: "you are not author" });
    }
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postDoc.id },
      {
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      },
      { new: true } // To return the updated document
    );

    res.json(updatedPost);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//mongo db user: blogpassword:blog123456
//mongodb+srv://blog:blog123456@cluster0.ky8xxmj.mongodb.net/?retryWrites=true&w=majority
