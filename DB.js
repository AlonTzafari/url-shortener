"use strict"
const axios = require("axios");
const fs = require("fs").promises;
class DataBase {;
    constructor(dB) {
        this.path = dB === "test" ? "./database/test" : "./database/bins";
        this.key = process.env.KEY;
    }

    getItem(id) {
        return fs.readdir(this.path)
        .then(binNames => {
            const bin = binNames.filter(binName => binName = id + ".json");
            if (bin.length === 0) throw "bin not found";
            return fs.readFile(`${this.path}/${id}.json`)
        })
        .then(raw => {
            return JSON.parse(raw);
        })
    }

    getAllItemIds() {
        return fs.readdir(this.path)
        .then( fileNames => 
            fileNames.filter(name => name !== ".gitkeep")
            .map(binName => binName.split(".json")[0])
        );
    }

    getAllItems() {
        
        return fs.readdir(this.path)
        .then( async binNames => {
            console.log(binNames);
            const items = [];
            for(const binName of binNames) {
                if(binName === ".gitkeep") continue;
                const raw = await fs.readFile(`${this.path}/${binName}`);
                const bin = JSON.parse(raw);
                items.push(bin);
            }
            return items;
        });
    }

    getItemByProperty(propName, value) {
        return this.getAllItems()
        .then(allBins => {
            const bin = allBins.filter(bin => bin[propName] === value);
            if (bin.length === 0) throw new Error("item not found");
            return bin[0];
        })
    }
    
    setItem(id, item) {
        return fs.writeFile(`${this.path}/${id}.json`, JSON.stringify(item));
    }

    deleteAll() {
        return fs.readdir(this.path)
        .then( async binNames => {
            for(const binName of binNames) {
                if(binName === ".gitkeep") continue;
                const raw = await fs.unlink(`${this.path}/${binName}`);
            }
        });
    }

}

module.exports = DataBase;