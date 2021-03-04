const express = require("express");
const api = express.Router();

api.use(express.json());

api.post("/shorturl/new", (req, res) => {
    console.log(req.body);
    res.send("k");
});




module.exports = api;