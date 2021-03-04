"use strict"
const express = require("express");
const api = express.Router();
const DOMAIN = "http://localhost:3000";

api.use(express.json());

api.post("/shorturl/new", (req, res) => {
    const original_url = req.body.url;
    const short_url = DOMAIN + 2;
    const response = {original_url, short_url};
    res.send(response);
});

console.log(process.env); 


module.exports = api;