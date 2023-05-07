const { MongoClient } = require('mongodb')

module.exports = class Database {
  constructor () {
    this.URI = 'mongodb://127.0.0.1:27017/bookstore'
    this.client = new MongoClient(this.URI)
  }
  
  getDB = () => {
    return this.client.db()
  }
}


