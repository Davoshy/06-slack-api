// Require
const Users = require("../models/users");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Routes
router.post("/signup", (req, res) => {
  Users.findOne({ email: req.body.email })
    .then(response => {
      if (response == null) {
        let encrypted = bcrypt.hashSync(req.body.password, 10);
        req.body.password = encrypted;
        Users.create(req.body).then(user => {
          let u = user.toObject();
          let token = jwt.sign(u, process.env.secret);
          res.send(token);
          localStorage.setItem("token", token);
        });
      } else {
        res.send("Email already in use");
      }
    })
    .catch(err => console.log(err));
});

router.post("/login", (req, res) => {});

// Export
module.exports = router;
