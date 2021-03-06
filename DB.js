"use strict"
const axios = require("axios");
class DataBase {

    constructor(dB) {
        if (dB === "jsonbin.io") {
            this.key = "$2b$10$HQwOejfJc5AdOgPXf8yJvO9vLU7G6WvMojCjBiPXEdreVE0A7bM96";
            this.collection_id = "604264050866664b1089628c";
        }
    }

    getItem(id) {

    }

    getItemByProperty(propName, value) {

    }
    
    setItem(id, item) {

    }

}

module.exports = DataBase;