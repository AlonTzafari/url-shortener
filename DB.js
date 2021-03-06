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
        return axios.get("https://api.jsonbin.io/v3/b/" + id);
    }

    getAllItems() {
        const options = {
            headers: {
              'Test-Header': 'test-value'
            }
          }
        return axios.get(`https://api.jsonbin.io/v3/c/${this.collection_id}/bins/0`);
    }

    getItemByProperty(propName, value) {

    }
    
    setItem(id, item) {

    }

}

module.exports = DataBase;