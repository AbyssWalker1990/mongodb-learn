"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class Database {
    constructor() {
        this.connectDB = () => {
            const database = this.client.db();
            return database;
        };
        this.getDB = () => {
            return this.client.db();
        };
        this.URI = 'mongodb://127.0.0.1:27017/bookstore';
        this.client = new mongodb_1.MongoClient(this.URI);
    }
}
exports.default = Database;
