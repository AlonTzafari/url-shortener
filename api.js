"use strict"
const express = require("express");
const DataBase = require("./DB")
const api = express.Router();
const DOMAIN = process.env.HOST_NAME || `http://localhost:${process.env.PORT}`;

const dataBase = new DataBase("jsonbin.io");

api.use(express.json());

api.post("/shorturl/new", (req, res) => {
    if( !req.body.hasOwnProperty("url") ) return res.status(400).send({message: "request body must have 'url' property"});
    const original_url = req.body.url;
    try {
        new URL(original_url);
    } catch (e) {
        console.log(e);
        return res.status(400).send({ message: "url must be valid"});
    }

    dataBase.getItemByProperty("original_url", original_url)
    .then(shortUrlBin => {
        const id = shortUrlBin["shorturl-id"];
        const short_url = `${DOMAIN}/${id}`;
        res.status(200).send({original_url, short_url})
    })
    .catch(() => {
        const newShortUrlBin = createShortURL(original_url);
        const id = newShortUrlBin["shorturl-id"];
        const short_url = `${DOMAIN}/${id}`;
        return dataBase.setItem(id, newShortUrlBin)
    })
    .then( () => res.status(201).send(original_url, short_url) )
    .catch( error => res.status(500).send(error) );
});


module.exports = api;