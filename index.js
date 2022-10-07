const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

const router = express.Router();

router.get("/home", (req, res) => {
  const filePath = path.join(__dirname, "home.html");

  res.sendFile(filePath);
});

router.get("/profile", (req, res) => {
  const filePath = path.join(__dirname, "user.json");

  let data = fs.readFileSync(filePath, { encoding: "utf8" });

  data = JSON.parse(data);

  res.json(data);
});

router.get("/login", (req, res) => {
  const { username, password } = req.query;

  const filePath = path.join(__dirname, "user.json");

  const data = fs.readFileSync(filePath, { encoding: "utf8" });

  const user = JSON.parse(data);

  let response;

  if (user.username == username) {
    if (user.password == password) {
      response = { status: true, message: "User Is valid" };
    } else {
      response = { status: false, message: "Password is invalid" };
    }
  } else {
    response = { status: false, message: "User Name is invalid" };
  }

  res.json(response);
});

router.get("/logout/:username", (req, res) => {
  const username = req.params.username;

  res.send(`<b>${username} successfully logout.<b>`);
});

app.use("/", router);

app.listen(process.env.port || 8081);

console.log("Web Server is listening at port " + (process.env.port || 8081));
