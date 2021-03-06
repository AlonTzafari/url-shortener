"use strict"
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {api, dataBase} = require("./api");
const app = express();

app.use(cors());

app.use("/", express.static(`./public`));

app.use("/api", api);

app.get("/:id", (req, res) => {
    dataBase.getItem(req.params.id)
    .then(bin => {
        bin.redirectCount++;
        dataBase.setItem(req.params.id, bin);
        res.redirect(bin.originalUrl)
    })
    .catch(e => res.status(404).send({message: "url not found"}));
});

module.exports = app;
