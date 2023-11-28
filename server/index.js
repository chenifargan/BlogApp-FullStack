const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 4000;
app.use(express.json());
app.use(cors()); // Enable CORS

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);
  console.log("chen");
  res.json("test ok");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
