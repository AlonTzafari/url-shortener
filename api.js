"use strict"
const express = require("express");
const api = express.Router();
const DOMAIN = process.env.HOST_NAME || `http://localhost:${process.env.PORT}`;

api.use(express.json());

api.post("/shorturl/new", (req, res) => {
    const original_url = req.body.url;
    const short_url = DOMAIN + 2;
    const response = {original_url, short_url};
    res.send(response);
});


module.exports = api;