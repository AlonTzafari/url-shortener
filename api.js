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
    .catch(async () => {
        const newShortUrlBin = await createShortURL(original_url);
        const id = newShortUrlBin["shorturl-id"];
        const short_url = `${DOMAIN}/${id}`;
        return dataBase.setItem(id, newShortUrlBin)
    })
    .then( () => res.status(201).send(original_url, short_url) )
    .catch( error => res.status(500).send(error) );
});

function createShortURL(originalUrl) {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
    function convertToNum(str) {
        const base = chars.length;
        return str.reduce(value,char,index => value + chars.getIndexOf(char) * ( base ** (str.length - 1 - index)));
    }
    function convertToStr(num) {
        const base = chars.length;
        let tempNum = num;
        if (num === 0) return "0";
        const strArr = [];
        while(num > 0) {
            const index = num % base;
            strArr.unshift(chars[index]);
            num = (num - index) / base;
        }
        return strArr.join("");
    }
    dataBase.getAllItems()
    .then(allBins => {
        const creationDate = new Date().toISOString.split("z")[0];
        const redirectCount = 0;
        const shortUrlId = convertToStr(allBins.length);
        return {
            creationDate,
            redirectCount,
            originalUrl,
            "shorturl-id": shortUrlId
        };
    })
}
module.exports = api;