const {
    resolve
} = require("path/posix");
let database;

class Database {

    collectionName;
    collection;

    static setDatabase(db) {
        database = db;
    }

    constructor(collectionName) {
        this.collectionName = collectionName;
        this.collection = database.collection(collectionName);
    }

    find(filters) {
        return this.collection.find();
    }

    findOne(filters) {
        return this.collection.findOne(filters);
    }

    insertOne(data) {
        return new Promise((resolve, reject) => {
            this.collection.insertOne(data, function (error, response) {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            })
        })
    };

}

module.exports = Database;